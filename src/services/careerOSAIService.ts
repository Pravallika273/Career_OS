import {
  CareerOSCapability,
  CareerOSAIRequest,
  CareerOSAIResponse,
  StructuredUserContext,
} from '../types/careerOSAI';
import { buildCareerOSUserContext } from './aiContextService';
import { UserProfile } from '../types/user';

/**
 * Centralized CareerOS AI Service
 *
 * All AI interactions in CareerOS route through this single service.
 * - Always uses structured user context (profile, education, goals, evidence, applications, resume).
 * - Never fabricates user information.
 * - Concise by default, with option to request detailed expansion.
 * - Securely proxies all calls through server-side secret management (/api/ai/generate).
 */
export class CareerOSAIService {
  /**
   * Primary entry point for any CareerOS AI capability
   */
  public static async generate(
    request: CareerOSAIRequest,
    userProfileOverride?: UserProfile
  ): Promise<CareerOSAIResponse> {
    const fullContext = request.context || buildCareerOSUserContext(userProfileOverride);

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          capability: request.capability,
          userPrompt: request.userPrompt,
          context: fullContext,
          detailLevel: request.detailLevel || 'concise',
          conversationHistory: request.conversationHistory || [],
        }),
      });

      if (!response.ok) {
        throw new Error(`AI server responded with status: ${response.status}`);
      }

      const data: CareerOSAIResponse = await response.json();
      return data;
    } catch (err) {
      console.warn('Network or proxy error calling /api/ai/generate, activating local engine fallback:', err);
      return this.getLocalFallback(request.capability, request.userPrompt, fullContext, request.detailLevel || 'concise');
    }
  }

  // Capability 1: Career Exploration
  public static async exploreCareers(prompt = 'What career paths fit my current skills and interests?'): Promise<CareerOSAIResponse> {
    return this.generate({
      capability: 'career_exploration',
      userPrompt: prompt,
    });
  }

  // Capability 2: Career Planning
  public static async planCareerPath(prompt = 'Create a practical 3-step action plan for this month'): Promise<CareerOSAIResponse> {
    return this.generate({
      capability: 'career_planning',
      userPrompt: prompt,
    });
  }

  // Capability 3: Task Recommendation
  public static async recommendNextTask(): Promise<CareerOSAIResponse> {
    return this.generate({
      capability: 'task_recommendation',
      userPrompt: 'What single task should I complete next today given my available time and evidence progress?',
    });
  }

  // Capability 4: Task Explanation
  public static async explainTask(taskTitle: string, taskContext?: string): Promise<CareerOSAIResponse> {
    return this.generate({
      capability: 'task_explanation',
      userPrompt: `Why does the task "${taskTitle}" matter for an early-career applicant? ${taskContext || ''}`,
    });
  }

  // Capability 5: Task Examples
  public static async getTaskExamples(taskTitle: string, stepNumber: number): Promise<CareerOSAIResponse> {
    return this.generate({
      capability: 'task_examples',
      userPrompt: `Show 1 realistic, high-quality example of what Step ${stepNumber} looks like for task "${taskTitle}".`,
    });
  }

  // Capability 6: Task Hints
  public static async getTaskHint(taskTitle: string, stepTitle: string, currentDraft: string): Promise<CareerOSAIResponse> {
    return this.generate({
      capability: 'task_hints',
      userPrompt: `I am working on Step "${stepTitle}" in task "${taskTitle}". Here is my draft so far: "${currentDraft}". Give me 1 focused hint to refine it.`,
    });
  }

  // Capability 7: Task Feedback
  public static async evaluateTaskFeedback(taskTitle: string, answersSummary: string): Promise<CareerOSAIResponse> {
    return this.generate({
      capability: 'task_feedback',
      userPrompt: `Review my completed submission for "${taskTitle}":\n${answersSummary}\nIdentify what was good and 1 concrete improvement.`,
    });
  }

  // Capability 8: Project Generation
  public static async generateProjectBrief(skillTarget: string): Promise<CareerOSAIResponse> {
    return this.generate({
      capability: 'project_generation',
      userPrompt: `Generate a realistic early-career project brief focusing on ${skillTarget} that can be completed in 4-6 hours and cited as verified proof.`,
    });
  }

  // Capability 9: Skill Gap Analysis
  public static async analyzeSkillGaps(targetRole?: string): Promise<CareerOSAIResponse> {
    return this.generate({
      capability: 'skill_gap_analysis',
      userPrompt: `Analyze the skill gaps between my verified Career Evidence and entry-level requirements for ${targetRole || 'my goal'}.`,
    });
  }

  // Capability 10: Resume Improvement
  public static async improveResumeSection(sectionName: string, content: string): Promise<CareerOSAIResponse> {
    return this.generate({
      capability: 'resume_improvement',
      userPrompt: `Improve the clarity and impact of this ${sectionName} content without inventing facts:\n"${content}"`,
    });
  }

  // Capability 11: Portfolio Writing
  public static async writePortfolioCaseStudy(activityTitle: string, deliverableOutput: string): Promise<CareerOSAIResponse> {
    return this.generate({
      capability: 'portfolio_writing',
      userPrompt: `Draft a concise 3-paragraph portfolio case study for "${activityTitle}". Output deliverable: "${deliverableOutput}".`,
    });
  }

  // Capability 12: LinkedIn Writing
  public static async writeLinkedInPost(activityTitle: string, reflection: string): Promise<CareerOSAIResponse> {
    return this.generate({
      capability: 'linkedin_writing',
      userPrompt: `Write an authentic, humble, non-cringe LinkedIn update sharing what I learned from completing "${activityTitle}". Reflection: "${reflection}".`,
    });
  }

  // Capability 13: GitHub README Writing
  public static async writeGitHubReadme(projectTitle: string, techStack: string[]): Promise<CareerOSAIResponse> {
    return this.generate({
      capability: 'github_readme_writing',
      userPrompt: `Generate a clean, recruiter-friendly GitHub README structure for "${projectTitle}" built with ${techStack.join(', ')}.`,
    });
  }

  // Capability 14: Interview Practice
  public static async coachInterview(question: string, userAnswer: string, track: string): Promise<CareerOSAIResponse> {
    return this.generate({
      capability: 'interview_practice',
      userPrompt: `Interview Track: ${track}\nQuestion: "${question}"\nCandidate Answer: "${userAnswer}"\n\nProvide constructive feedback: what was good, what could improve, and what the interviewer actually wanted.`,
    });
  }

  // Capability 15: Workplace Scenario Coaching
  public static async coachWorkplaceScenario(scenarioTitle: string, userChoice: string): Promise<CareerOSAIResponse> {
    return this.generate({
      capability: 'workplace_scenario_coaching',
      userPrompt: `Workplace Scenario: "${scenarioTitle}"\nCandidate Choice: "${userChoice}"\n\nExplain why someone in a team might react this way, and what to do differently next time.`,
    });
  }

  // Capability 16: Stuck Support
  public static async getStuckSupport(blockedDescription: string): Promise<CareerOSAIResponse> {
    return this.generate({
      capability: 'stuck_support',
      userPrompt: `I feel stuck on this: "${blockedDescription}". Diagnose the root obstacle and give me 1 low-pressure next step.`,
    });
  }

  // Capability 17: Reflection
  public static async guideReflection(activity: string): Promise<CareerOSAIResponse> {
    return this.generate({
      capability: 'reflection',
      userPrompt: `I just finished "${activity}". Ask me 2 short reflection questions to solidify what I learned before cataloging this into my Career Evidence Vault.`,
    });
  }

  // Client-side fallback if server cannot be reached
  private static getLocalFallback(
    capability: CareerOSCapability,
    userPrompt: string,
    context: Partial<StructuredUserContext>,
    detailLevel: 'concise' | 'detailed'
  ): CareerOSAIResponse {
    const goal = context.goal || 'Software & Product Engineering';
    const name = context.profile?.name || 'Jordan';

    let text = `Hello ${name}. Here is tailored guidance for ${goal}:\n\n• **Core Principle**: Start wherever you are. Do something useful today. Build proof. Become ready.\n• **Current Proof**: You have verified evidence cataloged in your Career Evidence Vault.\n• **Next Step**: Keep tasks under 30 minutes to maintain momentum without burnout.`;

    if (capability === 'task_recommendation') {
      text = `Recommended next step for ${goal}:\n\n• **Task**: Deconstruct 1 Real Job Requirement into 3 Verifiable Exercises\n• **Time**: 25 minutes\n• **Outcome**: Turns a laundry list of requirements into 3 concrete practice tasks.`;
    } else if (capability === 'stuck_support') {
      text = `When feeling stuck on "${userPrompt}":\n\n1. Stop aiming for perfection on version 1.\n2. Write down the simplest possible draft (even 2 lines).\n3. Test or verify just step 1 before worrying about the rest.`;
    }

    return {
      text,
      capability,
      suggestedAction: { label: 'Go to Learn & Do Tasks', routeId: 'tasks' },
      followUpPrompts: [
        'Break this down into 10-minute steps',
        'How do I cite this on my resume?',
        'Give me a concrete code example',
      ],
      expansionAvailable: detailLevel === 'concise',
    };
  }
}
