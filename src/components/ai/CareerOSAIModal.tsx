import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  X,
  Compass,
  ArrowRight,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  ShieldAlert,
  Loader2,
  Maximize2,
  RotateCcw,
  WifiOff,
} from 'lucide-react';
import { UserProfile } from '../../types/user';
import { Button } from '../ui/Button';
import { CareerOSAIService } from '../../services/careerOSAIService';
import { CareerOSCapability } from '../../types/careerOSAI';
import { useNetworkStatus } from '../../lib/useNetworkStatus';
import { ContentFeedbackBar } from '../trust/ContentFeedbackBar';

export interface CareerOSAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile?: UserProfile;
  onStartSuggestedTask?: (taskTitle: string) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  capability?: CareerOSCapability;
  suggestedAction?: {
    label: string;
    taskTitle: string;
  };
  followUpPrompts?: string[];
  expansionAvailable?: boolean;
  originalPrompt?: string;
  isError?: boolean;
  failedPrompt?: string;
}

function inferCapability(text: string): CareerOSCapability {
  const lower = text.toLowerCase();
  if (lower.includes('stuck') || lower.includes("can't solve") || lower.includes('confused') || lower.includes('blocked')) {
    return 'stuck_support';
  }
  if (lower.includes('interview') || lower.includes('question') || lower.includes('star method') || lower.includes('behavioral')) {
    return 'interview_practice';
  }
  if (lower.includes('resume') || lower.includes('bullet') || lower.includes('cv') || lower.includes('ats')) {
    return 'resume_improvement';
  }
  if (lower.includes('task') || lower.includes('what should i do') || lower.includes('focus on next') || lower.includes('today')) {
    return 'task_recommendation';
  }
  if (lower.includes('gap') || lower.includes('missing skill') || lower.includes('requirements')) {
    return 'skill_gap_analysis';
  }
  if (lower.includes('linkedin')) {
    return 'linkedin_writing';
  }
  if (lower.includes('readme') || lower.includes('github')) {
    return 'github_readme_writing';
  }
  if (lower.includes('portfolio') || lower.includes('case study')) {
    return 'portfolio_writing';
  }
  if (lower.includes('workplace') || lower.includes('manager') || lower.includes('delay') || lower.includes('pr review') || lower.includes('conflict')) {
    return 'workplace_scenario_coaching';
  }
  if (lower.includes('explore') || lower.includes('career path') || lower.includes('roles')) {
    return 'career_exploration';
  }
  if (lower.includes('plan') || lower.includes('roadmap') || lower.includes('schedule')) {
    return 'career_planning';
  }
  if (lower.includes('reflect') || lower.includes('takeaway') || lower.includes('learned')) {
    return 'reflection';
  }
  return 'general_assistant';
}

export const CareerOSAIModal: React.FC<CareerOSAIModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onStartSuggestedTask,
}) => {
  const { isOnline } = useNetworkStatus();
  const userName = userProfile?.name || 'friend';
  const worry = userProfile?.primaryWorry || "I don't have experience.";
  const goal = userProfile?.careerGoal || 'Software & Product Engineering';

  const defaultGreeting: Message = {
    id: 'msg-init',
    sender: 'assistant',
    text: `Hello ${userName}. I'm here to help you take one useful step today without overwhelm. We know your primary worry is "${worry}", and that is completely normal. What would you like guidance on?`,
    timestamp: 'Just now',
    suggestedAction: {
      label: 'Focus on today\'s micro-task',
      taskTitle: 'Deconstruct 1 Real Job Requirement into Proof',
    },
  };

  const [messages, setMessages] = useState<Message[]>([defaultGreeting]);
  const [inputVal, setInputVal] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [expandingMsgId, setExpandingMsgId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const defaultQuickPrompts = [
    'What should I focus on next today?',
    'Why does deconstructing a job post matter?',
    'How do I build proof if I have zero work history?',
    'I feel anxious about interview expectations',
  ];

  // Derive dynamic quick prompts from last message if available
  const lastBotMessage = [...messages].reverse().find((m) => m.sender === 'assistant');
  const activeQuickPrompts =
    lastBotMessage?.followUpPrompts && lastBotMessage.followUpPrompts.length > 0
      ? lastBotMessage.followUpPrompts
      : defaultQuickPrompts;

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputVal.trim();
    if (!text) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsThinking(true);

    const capability = inferCapability(text);

    try {
      const history = messages.slice(-4).map((m) => ({
        sender: m.sender,
        text: m.text,
      }));

      const response = await CareerOSAIService.generate(
        {
          capability,
          userPrompt: text,
          detailLevel: 'concise',
          conversationHistory: history,
        },
        userProfile
      );

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: 'Just now',
        capability: response.capability,
        suggestedAction: response.suggestedAction
          ? {
              label: response.suggestedAction.label,
              taskTitle: response.suggestedAction.targetPayload || 'Deconstruct 1 Real Job Requirement into Proof',
            }
          : undefined,
        followUpPrompts: response.followUpPrompts,
        expansionAvailable: response.expansionAvailable,
        originalPrompt: text,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Failed to generate response:', err);
      const fallbackMsg: Message = {
        id: `bot-fallback-${Date.now()}`,
        sender: 'assistant',
        text: `Remember CareerOS's guiding rule: "Start wherever you are. Do something useful. Learn from it. Build proof. Become ready."\n\nFocus on one small 20-minute task today rather than trying to master everything at once.`,
        timestamp: 'Just now',
        isError: true,
        failedPrompt: text,
        suggestedAction: {
          label: 'Launch recommended step',
          taskTitle: 'Deconstruct 1 Real Job Requirement into Proof',
        },
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleExpandMessage = async (msg: Message) => {
    if (!msg.originalPrompt || expandingMsgId) return;

    setExpandingMsgId(msg.id);
    try {
      const response = await CareerOSAIService.generate(
        {
          capability: msg.capability || 'general_assistant',
          userPrompt: `Provide an expanded, detailed step-by-step breakdown for: ${msg.originalPrompt}`,
          detailLevel: 'detailed',
        },
        userProfile
      );

      const expandedMsg: Message = {
        id: `bot-expanded-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: 'Just now',
        capability: msg.capability,
        expansionAvailable: false,
      };

      setMessages((prev) => [...prev, expandedMsg]);
    } catch (err) {
      console.error('Failed to expand message:', err);
    } finally {
      setExpandingMsgId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#101828]/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Drawer/Modal Card - Full width & height on mobile phones */}
      <div className="relative w-full max-w-xl bg-white rounded-t-2xl sm:rounded-2xl border-t sm:border border-[#E8E6DF] shadow-2xl flex flex-col h-[90vh] sm:h-[600px] max-h-screen sm:max-h-[90vh] z-10 overflow-hidden text-left animate-in slide-in-from-bottom-6 sm:slide-in-from-bottom-2 duration-200">
        {/* Offline indicator bar inside chat if disconnected */}
        {!isOnline && (
          <div className="bg-[#FFF4ED] border-b border-[#FDDCAB] px-3.5 py-1.5 text-xs text-[#B54708] flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-1.5 min-w-0">
              <WifiOff className="w-3.5 h-3.5 text-[#F79009] shrink-0" />
              <span className="font-semibold truncate">Offline Mode: Using local guidance models</span>
            </div>
            <span className="text-[10px] text-[#B54708] underline shrink-0">Drafts cached</span>
          </div>
        )}
        {/* Top Header */}
        <div className="p-4 sm:px-6 border-b border-[#E8E6DF] flex items-center justify-between bg-[#F8F8F5]/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#5B5BD6] text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-[#101828]">CareerOS AI</h3>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F0EEFF] text-[#5B5BD6] font-medium">
                  Calm Assistant
                </span>
              </div>
              <p className="text-[11px] text-[#667085]">
                Practical, pressure-free guidance for students & beginners
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#98A2B3] hover:text-[#101828] hover:bg-[#E8E6DF] transition-colors"
            aria-label="Close CareerOS AI"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History Canvas */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#F8F8F5]/30">
          {messages.map((msg) => {
            const isBot = msg.sender === 'assistant';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                    isBot
                      ? 'bg-white border border-[#E8E6DF] text-[#101828] shadow-xs'
                      : 'bg-[#5B5BD6] text-white'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Expand button if concise response has more detail available */}
                  {isBot && msg.expansionAvailable && msg.originalPrompt && (
                    <div className="mt-2 pt-2 border-t border-[#F2F0E8] flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleExpandMessage(msg)}
                        disabled={expandingMsgId === msg.id}
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-[#5B5BD6] hover:text-[#4B4BC2] transition-colors cursor-pointer"
                      >
                        {expandingMsgId === msg.id ? (
                          <>
                            <Loader2 className="w-3 h-3 animate-spin" />
                            <span>Expanding details...</span>
                          </>
                        ) : (
                          <>
                            <Maximize2 className="w-3 h-3" />
                            <span>Expand detailed breakdown</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {isBot && msg.suggestedAction && onStartSuggestedTask && (
                    <div className="mt-3 pt-2.5 border-t border-[#E8E6DF]">
                      <button
                        type="button"
                        onClick={() => {
                          onStartSuggestedTask(msg.suggestedAction!.taskTitle);
                          onClose();
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5B5BD6] hover:text-[#4B4BC2] transition-colors"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                        <span>{msg.suggestedAction.label}</span>
                      </button>
                    </div>
                  )}

                  {/* Retry action on failed request or connection interruption */}
                  {isBot && msg.failedPrompt && (
                    <div className="mt-2.5 pt-2 border-t border-[#FCD8D4]">
                      <button
                        type="button"
                        onClick={() => handleSend(msg.failedPrompt)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FFF2F0] text-[#C93B2B] hover:bg-[#FFE5E2] font-semibold text-[11px] transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Retry question</span>
                      </button>
                    </div>
                  )}

                  {/* AI Transparency & Trust Feedback / Reporting */}
                  {isBot && !msg.failedPrompt && (
                    <ContentFeedbackBar
                      messageId={msg.id}
                      contextSnippet={msg.text}
                      showDisclaimer={true}
                    />
                  )}
                </div>
                <span className="text-[10px] text-[#98A2B3] mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            );
          })}

          {isThinking && (
            <div className="flex items-center gap-2 p-3 bg-white border border-[#E8E6DF] rounded-xl text-xs text-[#667085] w-fit shadow-xs animate-pulse">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#5B5BD6]" />
              <span>Thinking with your Career Evidence...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Carousel - Touch-friendly scrolling */}
        <div className="p-2.5 sm:px-4 border-t border-[#E8E6DF] bg-white overflow-x-auto whitespace-nowrap flex gap-2">
          {activeQuickPrompts.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(p)}
              className="text-xs px-3 py-1.5 rounded-lg bg-[#F8F8F5] text-[#344054] hover:text-[#101828] hover:bg-[#F0EEFF] transition-colors border border-[#E8E6DF] shrink-0 cursor-pointer min-h-[36px]"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-[#E8E6DF] bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask anything about your tasks, doubts, or next step..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 bg-[#F8F8F5] border border-[#E8E6DF] rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-[#101828] placeholder:text-[#98A2B3] focus:outline-hidden focus:ring-2 focus:ring-[#5B5BD6] transition-all min-h-[44px]"
            />
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={!inputVal.trim() || isThinking}
              leftIcon={<Send className="w-4 h-4" />}
            >
              Ask
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
