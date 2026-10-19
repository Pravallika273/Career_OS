import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  X,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  Copy,
  ChevronRight,
  Bot,
  User,
  RotateCcw,
  Minimize2,
  Maximize2,
  MessageSquare,
} from 'lucide-react';
import {
  TaskAIContext,
  TaskAIMessage,
  generateContextualAIResponse,
} from '../../services/taskAIEngine';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useToast } from '../ui/Toast';
import { ContentFeedbackBar } from '../trust/ContentFeedbackBar';

export interface TaskAICompanionProps {
  isOpen: boolean;
  onClose: () => void;
  context: TaskAIContext;
  onInsertTextIntoStep?: (text: string) => void;
  initialQuery?: string;
}

export const TaskAICompanion: React.FC<TaskAICompanionProps> = ({
  isOpen,
  onClose,
  context,
  onInsertTextIntoStep,
  initialQuery,
}) => {
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial greeting tailored to current step and task
  const initialGreeting: TaskAIMessage = {
    id: 'msg-init',
    sender: 'assistant',
    text: `Hey! I'm right here with you on Step ${context.stepNumber}: "${context.currentStep.title.replace(/^Step \d+: /, '')}". 

You can ask me literally anything here without feeling stupid. What would you like to explore?`,
    timestamp: 'Just now',
    clarifyingChoices: [
      "I'm stuck.",
      "I don't understand this part.",
      "Can you explain this in simpler words?",
      "Can you check what I've written so far?",
      "Show me a quick example of this step",
    ],
  };

  const [messages, setMessages] = useState<TaskAIMessage[]>([initialGreeting]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // If opened with initial query (e.g. "I'm stuck")
  useEffect(() => {
    if (isOpen && initialQuery) {
      handleSendMessage(initialQuery);
    }
  }, [isOpen, initialQuery]);

  // When step changes, update context awareness with a gentle note if thread is active
  useEffect(() => {
    if (messages.length > 1) {
      const stepUpdateNotice: TaskAIMessage = {
        id: `step-shift-${Date.now()}`,
        sender: 'assistant',
        text: `I noticed you navigated to Step ${context.stepNumber}: "${context.currentStep.title.replace(/^Step \d+: /, '')}". I've updated my notes. Let me know if you need any hints here!`,
        timestamp: 'Just now',
        clarifyingChoices: [
          'What is the goal of this step?',
          'Give me a starter idea',
          'I am doing okay for now',
        ],
      };
      setMessages((prev) => [...prev, stepUpdateNotice]);
    }
  }, [context.stepNumber]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg: TaskAIMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Realistic patient response delay
    setTimeout(() => {
      const response = generateContextualAIResponse(text, context);
      const aiMsg: TaskAIMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: response.replyText,
        timestamp: 'Just now',
        clarifyingChoices: response.choices,
        actionSuggestion: response.actionSuggestion,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleInsertSuggestion = (textToInsert?: string) => {
    if (!textToInsert) return;
    if (onInsertTextIntoStep) {
      onInsertTextIntoStep(textToInsert);
      toast.success('Inserted into Step!', 'Snippet added to your current work canvas.');
    }
  };

  const handleResetChat = () => {
    setMessages([initialGreeting]);
    toast.info('Chat Cleared', 'Conversation reset for Step ' + context.stepNumber);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-white border-l border-[#E8E6DF] shadow-2xl flex flex-col animate-in slide-in-from-right duration-200 text-left">
      {/* 1. Header with Context Metadata */}
      <div className="p-4 border-b border-[#E8E6DF] bg-[#F8F8F5]/80 flex items-start justify-between gap-3">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#21B47A] animate-pulse" />
            <span className="text-xs font-bold text-[#5B5BD6] uppercase tracking-wider">
              CareerOS Companion
            </span>
            <Badge variant="mint" size="sm">
              Step {context.stepNumber}
            </Badge>
          </div>
          <h3 className="text-sm font-bold text-[#101828] truncate">
            {context.currentStep.title}
          </h3>
          <p className="text-[11px] text-[#667085] truncate">
            {context.task.title} · {context.studentLevel}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleResetChat}
            title="Reset conversation"
            className="p-1.5 rounded-lg text-[#667085] hover:bg-[#E8E6DF] transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#667085] hover:bg-[#E8E6DF] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Reassurance Banner */}
      <div className="px-4 py-2 bg-[#F0EEFF]/60 border-b border-[#E4E0FD] text-[11px] text-[#475467] flex items-center justify-between">
        <span>“I can ask anything here without feeling stupid.”</span>
        <span className="text-[#5B5BD6] font-medium text-[10px]">Context Aware</span>
      </div>

      {/* 3. Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5`}
            >
              <div
                className={`max-w-[90%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                  isUser
                    ? 'bg-[#5B5BD6] text-white rounded-tr-xs shadow-xs'
                    : 'bg-[#F8F8F5] text-[#101828] border border-[#E8E6DF] rounded-tl-xs shadow-xs'
                }`}
              >
                {msg.text}

                {/* Optional 1-click action suggestion */}
                {msg.actionSuggestion && (
                  <div className="mt-3 pt-2.5 border-t border-[#E8E6DF] flex items-center justify-between gap-2">
                    <span className="text-[11px] text-[#5B5BD6] font-semibold truncate">
                      {msg.actionSuggestion.label}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleInsertSuggestion(msg.actionSuggestion?.textToInsert)}
                      className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#5B5BD6] text-white hover:bg-[#4B4BC2] transition-colors shrink-0"
                    >
                      Insert into Step
                    </button>
                  </div>
                )}

                {/* AI Coaching Transparency & Feedback */}
                {!isUser && (
                  <ContentFeedbackBar
                    messageId={msg.id}
                    contextSnippet={msg.text}
                    showDisclaimer={true}
                  />
                )}
              </div>

              {/* Clarifying Diagnostic Choices */}
              {!isUser && msg.clarifyingChoices && msg.clarifyingChoices.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1 max-w-[95%]">
                  {msg.clarifyingChoices.map((choice, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSendMessage(choice)}
                      className="text-left px-2.5 py-1.5 rounded-lg text-xs bg-white hover:bg-[#F0EEFF] text-[#344054] hover:text-[#5B5BD6] border border-[#E8E6DF] hover:border-[#5B5BD6]/40 transition-all shadow-xs"
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              )}

              <span className="text-[10px] text-[#98A2B3] px-1">
                {msg.timestamp}
              </span>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-[#F8F8F5] border border-[#E8E6DF] text-xs text-[#667085] w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5B5BD6] animate-bounce" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#5B5BD6] animate-bounce [animation-delay:0.2s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#5B5BD6] animate-bounce [animation-delay:0.4s]" />
            <span className="text-[11px] ml-1">Thinking with you...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 4. Interactive Input Footer */}
      <div className="p-3 sm:p-4 border-t border-[#E8E6DF] bg-white space-y-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask anything about this step..."
            className="flex-1 p-2.5 rounded-xl border border-[#E8E6DF] text-xs sm:text-sm text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#5B5BD6]"
          />
          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={!inputText.trim()}
            leftIcon={<Send className="w-3.5 h-3.5" />}
          >
            Send
          </Button>
        </form>
        <div className="flex items-center justify-between text-[10px] text-[#98A2B3]">
          <span>Tip: Ask &ldquo;Check my approach&rdquo; to get fast feedback</span>
          <span>Zero judgment zone</span>
        </div>
      </div>
    </div>
  );
};
