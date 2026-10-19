import { TaskWorkspaceData, TaskWorkspaceStep } from '../types/taskWorkspace';

export interface TaskAIContext {
  task: TaskWorkspaceData;
  studentLevel: string;
  selectedSkills: string[];
  currentStep: TaskWorkspaceStep;
  stepNumber: number;
  totalSteps: number;
  stepResponses: Record<number, string>;
  currentStepDraft: string;
}

export interface TaskAIMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  clarifyingChoices?: string[];
  actionSuggestion?: {
    label: string;
    textToInsert?: string;
  };
}

/**
 * Intelligent contextual response generator for in-task learning.
 * Follows the rules:
 * - Patient, intelligent friend
 * - Diagnoses first when user is stuck, rather than huge text dump
 * - Short clarifying questions
 * - Friendly, clear, student-friendly, encouraging, precise
 * - Avoids corporate jargon, robotic language, cheesy hype
 */
export function generateContextualAIResponse(
  userText: string,
  context: TaskAIContext
): {
  replyText: string;
  choices?: string[];
  actionSuggestion?: { label: string; textToInsert?: string };
} {
  const query = userText.trim().toLowerCase();
  const step = context.currentStep;
  const stepNum = context.stepNumber;
  const draft = context.currentStepDraft.trim();
  const taskTitle = context.task.title;
  const career = context.task.career;

  // 1. "I'm stuck" / "Help" / "I don't know what to do"
  if (
    query === "i'm stuck" ||
    query === "im stuck" ||
    query === 'stuck' ||
    query.includes('i am stuck') ||
    query.includes("i'm stuck.") ||
    query === 'help' ||
    query.includes("i don't know what to do") ||
    query.includes('where do i start')
  ) {
    if (stepNum === 1) {
      return {
        replyText:
          "No worries at all. Feeling stuck is just part of doing real work. For Step 1, which part feels unclear?",
        choices: [
          'Where do I find a good job posting?',
          'How do I choose which 3 bullets to pick?',
          'What counts as a "requirement"?',
          'Could you give me an example posting to use?',
        ],
      };
    }

    if (stepNum === 2) {
      return {
        replyText:
          "Totally normal—corporate job postings are full of buzzwords meant to sound fancy. Which part is tripping you up?",
        choices: [
          'How do I translate buzzwords into normal words?',
          'What does "daily behavior" mean here?',
          'Could you help me translate my first bullet?',
          'Can you show me an example translation?',
        ],
      };
    }

    if (stepNum === 3) {
      return {
        replyText:
          "We're almost at the fun part. The goal is small experiments, not big side projects. What feels hard right now?",
        choices: [
          'How do I make the exercise fit in 15 minutes?',
          'What counts as a "verifiable deliverable"?',
          'Can you suggest a micro-exercise for my requirement?',
          'How simple is too simple?',
        ],
      };
    }

    // Step 4 or general
    return {
      replyText:
        "You've already done the hard thinking. For Step 4, we're just summarizing what you found. What feels in the way?",
      choices: [
        'How should I structure the final proof summary?',
        'What should I write for the personal takeaway?',
        'Can you review what I have so far?',
      ],
    };
  }

  // 2. "I don't understand this part"
  if (
    query.includes("don't understand this") ||
    query.includes('dont understand') ||
    query.includes('confused') ||
    query.includes('unclear')
  ) {
    return {
      replyText: `No worries at all! On ${step.title}, which specific part feels unclear?`,
      choices: [
        'The objective of this step',
        'The template terms and brackets',
        'How this connects to the real job',
        'Explain this to me like I am 15',
      ],
    };
  }

  // 3. "Check my approach" / "Is this right?" / "Review my work"
  if (
    query.includes('check my') ||
    query.includes('is this right') ||
    query.includes('is this good') ||
    query.includes('look at my') ||
    query.includes('review')
  ) {
    if (!draft || draft.length < 15) {
      return {
        replyText:
          "You haven't written anything in this step's box yet, and that is completely fine! Would you like to bounce an idea off me first, or should we draft the opening line together?",
        choices: [
          "Let's draft the first line together",
          'Give me a starter idea for this step',
          'I want to try writing it myself first',
        ],
      };
    }

    // User actually has content written!
    return {
      replyText: `I took a look at what you wrote in Step ${stepNum}. Here is what I notice:

1. **What is working well:** Your notes are grounded in a real situation rather than abstract theory.
2. **One small tweak:** Make sure the output you mention is something you could actually show someone (like a snippet, a screenshot, or 3 written bullets).

Does that feel doable?`,
      choices: [
        'How do I make the output more concrete?',
        'Looks good, what is next?',
        'Could you give me an example of the tweak?',
      ],
    };
  }

  // 4. "Explain in simpler words" / "ELI5"
  if (
    query.includes('simpler') ||
    query.includes('explain') ||
    query.includes('eli5') ||
    query.includes('what does this mean')
  ) {
    if (stepNum === 1) {
      return {
        replyText:
          "In simple words: imagine you're shopping for your first car, but the brochure uses 50 mechanical acronyms. All Step 1 asks you to do is pick 3 terms that sounded scary, so we can figure out what they actually mean.",
        choices: [
          'How do I find a junior job post?',
          'What if the posting asks for 3 years experience?',
          'Ready to continue',
        ],
      };
    }
    if (stepNum === 2) {
      return {
        replyText:
          'In simple words: companies use jargon like "asynchronous lifecycle orchestration" when they simply mean "fetch data from the internet without freezing the screen." We are translating their fancy words into what you actually do with your hands.',
        choices: [
          'Help me translate one of my bullets',
          'Why do companies write like that?',
          'Understood, take me to Step 3',
        ],
      };
    }
    return {
      replyText: `In simple terms: this step is asking you to ${step.objective.toLowerCase()} Keep it as short and direct as you can.`,
      choices: ['Can you show me an example?', 'Got it, let me write it down'],
    };
  }

  // 5. "Where do I find a job posting?" (Step 1 specific)
  if (query.includes('where do i find') || query.includes('job posting')) {
    return {
      replyText:
        'Try typing into Google: `"Junior ' +
        career +
        ' jobs" site:linkedin.com` or look at Wellfound (formerly AngelList) or GitHub Jobs. Even if it says "1-2 years experience," you can still use it for this exercise!',
      choices: [
        'Can you give me a sample job posting right now?',
        'What if I am not sure about my career track yet?',
        'Found one, what next?',
      ],
      actionSuggestion: {
        label: 'Use sample FinTech role',
        textToInsert: `Job Title: Junior Frontend Engineer\nCompany / Track: FinTech Startup\nRequirement 1: "Experience managing asynchronous client state"\nRequirement 2: "Optimistic UI mutations"\nRequirement 3: "Component error boundaries"`,
      },
    };
  }

  // 6. "What if the posting asks for 3 years of experience?"
  if (query.includes('years') || query.includes('experience') || query.includes('entry level')) {
    return {
      replyText:
        'Ignore the "years of experience" line completely for this exercise! Most job postings are wish lists written by HR teams. We only care about the daily tasks listed in the bullets.',
      choices: ['That makes me feel so much better', 'Which 3 bullets should I pick?'],
    };
  }

  // 7. "How do I make the exercise 15 minutes?" (Step 3 specific)
  if (query.includes('15 minutes') || query.includes('too big') || query.includes('how simple')) {
    return {
      replyText:
        'The trick is testing ONE tiny case. Don’t build a full weather app—just build a single button that fetches the temperature. Don’t build a whole blog—just write one SQL query that groups sales by date.',
      choices: [
        'Give me an example for my track',
        'How do I know when a micro-task is finished?',
      ],
    };
  }

  // 8. "Can you give me an example?"
  if (query.includes('example') || query.includes('sample') || query.includes('show me')) {
    return {
      replyText: `Here is a real example for ${step.title}:

Instead of trying to build something massive, a student wrote:
"Action: Write 1 React hook with a loading spinner.
Time: 15 mins.
Proof: A 20-line CodeSandbox link."

Notice how small and realistic that is?`,
      choices: [
        'Can you insert a template like this into my box?',
        'How do I adapt this for my own skill?',
      ],
      actionSuggestion: {
        label: 'Insert small exercise template',
        textToInsert: `Micro-Exercise:\n- Action: Write 1 small isolated function or test\n- Time: ~15 mins\n- Proof Output: A screenshot or clean code snippet demonstrating it works`,
      },
    };
  }

  // 9. "What should I write for personal takeaway?" (Step 4)
  if (query.includes('takeaway') || query.includes('step 4') || query.includes('reflection')) {
    return {
      replyText:
        'Just be honest! Write 1 sentence answering: "Did breaking this requirement down make the job feel more doable?" and 1 sentence on which micro-exercise you will try first.',
      choices: ['Can you draft an example reflection?', 'Got it, let me finish it up'],
    };
  }

  // 10. Default contextual intelligent reply
  return {
    replyText: `I hear you. On Step ${stepNum} ("${step.title}"), the core goal is: ${step.objective} 

What feels like the biggest roadblock right now?`,
    choices: [
      'I don’t know what words to use',
      'Can you show me a simple example?',
      'Check what I wrote so far',
      'Explain this step in 1 sentence',
    ],
  };
}

/**
 * Async server-connected version that utilizes CareerOSAIService
 * with automatic fallback to local contextual intelligence.
 */
export async function generateTaskAIServerResponse(
  userText: string,
  context: TaskAIContext
): Promise<{
  replyText: string;
  choices?: string[];
  actionSuggestion?: { label: string; textToInsert?: string };
}> {
  try {
    const { CareerOSAIService } = await import('./careerOSAIService');
    const res = await CareerOSAIService.generate({
      capability: 'task_hints',
      userPrompt: `In task "${context.task.title}", Step ${context.stepNumber} ("${context.currentStep.title}"). Objective: "${context.currentStep.objective}". User draft: "${context.currentStepDraft}". User question: "${userText}".`,
      detailLevel: 'concise',
    });

    return {
      replyText: res.text,
      choices: res.followUpPrompts,
      actionSuggestion: res.suggestedAction ? { label: res.suggestedAction.label } : undefined,
    };
  } catch {
    return generateContextualAIResponse(userText, context);
  }
}
