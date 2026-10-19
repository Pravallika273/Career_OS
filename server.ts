import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '2mb' }));

// Initialize Gemini SDK with server-side environment secret
const geminiApiKey = process.env.GEMINI_API_KEY;
let genAI: GoogleGenAI | null = null;
if (geminiApiKey) {
  try {
    genAI = new GoogleGenAI({ apiKey: geminiApiKey });
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI with provided key:', err);
  }
} else {
  try {
    genAI = new GoogleGenAI();
  } catch {
    // Will use intelligent contextual fallback
  }
}

// Health check endpoint
app.get('/api/ai/health', (_req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(geminiApiKey),
    model: 'gemini-3.8-flash',
    mode: isProduction ? 'production' : 'development',
  });
});

// Centralized AI Generation Endpoint
app.post('/api/ai/generate', async (req, res) => {
  const {
    capability = 'general_assistant',
    userPrompt = '',
    context = {},
    detailLevel = 'concise',
    conversationHistory = [],
  } = req.body;

  if (!userPrompt && !capability) {
    return res.status(400).json({ error: 'userPrompt or capability required' });
  }

  // System instructions strictly enforcing the CareerOS charter and Trust & Safety mandates
  const systemInstruction = `You are CareerOS AI, a pragmatic, authentic, high-empathy career architect for students, career switchers, and early-career builders.
STRICT TRUST & SAFETY RULES (ZERO-TOLERANCE COMPLIANCE):
1. NEVER FABRICATE ACHIEVEMENTS: Ground all statements in the student's actual Career Evidence Vault. Never invent test scores, honors, metrics, or credentials.
2. NEVER FABRICATE EMPLOYERS OR INTERNSHIPS: Never cite fictional companies or nonexistent positions. Only refer to verified opportunities or explicitly designated educational simulations.
3. NEVER GUARANTEE EMPLOYMENT: Never promise a job offer, hiring outcome, interview guarantee, or salary figure. Always frame advice as coaching and skill preparation.
4. NEVER IMPERSONATE MENTORS: Clarify that you are CareerOS AI guidance, not a human mentor or specific individual.
5. NEVER CLAIM SIMULATED TASKS ARE REAL INTERNSHIPS: Always distinguish clearly between "CareerOS simulation" / "Practice Drill" and real employment. Simulated tasks produce portfolio artifacts, not corporate employment history.
6. NEVER EXPOSE PRIVATE USER INFORMATION: Never display, leak, or share sensitive private data (such as emails, phone numbers, or credentials) in public outputs.
7. NEVER AUTOMATICALLY PUBLISH CONTENT: All portfolio entries, resume exports, or application submissions require explicit student review and confirmation.
8. NEVER COMPLETE MEANINGFUL STUDENT WORK IN PLACE OF THE STUDENT: Do not write the student's assignments, deliverables, code solutions, or essay answers for them. Act as a diagnostic coach who provides hints, frameworks, checklists, and feedback so the student does the real thinking.
9. CONCISE BY DEFAULT: Keep responses tight, actionable, and digestible (2–4 bullet points or max 2 short paragraphs).
10. PHILOSOPHY: "Start wherever you are. Do something useful. Learn from it. Build proof. Become ready."`;

  // Build the structured user context summary
  const studentProfile = context.profile || {};
  const studentGoal = context.goal || 'Software & Product Engineering';
  const studentLevel = studentProfile.currentLevel || 'Early Career / Beginner';
  const studentSkills = Array.isArray(context.skills) ? context.skills.join(', ') : 'React, TypeScript';
  const completedTasks = Array.isArray(context.completedTasks)
    ? context.completedTasks.map((t: any) => t.title).join('; ')
    : 'None yet';
  const verifiedEvidence = Array.isArray(context.careerEvidence)
    ? context.careerEvidence.map((e: any) => `${e.activity} (${e.output})`).join('; ')
    : 'None yet';
  const resumeSummary = context.resume?.summary || 'Not yet generated';
  const targetRoles = context.applications?.recentTargetRoles?.join(', ') || studentGoal;
  const workplaceAreas = context.workplaceSkillDevelopment?.focusAreas?.join(', ') || 'EQ, Self-Management';

  const contextPrompt = `STUDENT CONTEXT:
- Name: ${studentProfile.name || 'Student'}
- Level: ${studentLevel}
- Target Career Goal: ${studentGoal}
- Primary Concern/Worry: ${studentProfile.primaryWorry || 'Zero formal experience'}
- Active Skills: ${studentSkills}
- Available Time: ${context.availableTime || '10 hours/week'}
- Urgency: ${context.urgency || 'Active'}
- Completed Tasks: ${completedTasks}
- Verified Career Evidence: ${verifiedEvidence}
- Active Resume Target: ${context.resume?.targetRole || studentGoal} (Summary: ${resumeSummary})
- Active Applications & Targets: ${targetRoles}
- Workplace Skills: ${workplaceAreas}

REQUEST:
- Capability: ${capability}
- Format: ${detailLevel === 'detailed' ? 'Detailed step-by-step breakdown' : 'Concise (2-4 bullets or 2 short paragraphs)'}
- User Prompt: "${userPrompt}"`;

  try {
    if (genAI) {
      const response = await genAI.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: contextPrompt,
        config: {
          systemInstruction,
          temperature: 0.4,
        },
      });

      const responseText = response.text || '';
      if (responseText.trim()) {
        const suggestedAction = deriveSuggestedAction(capability, studentGoal);
        const followUps = deriveFollowUps(capability, userPrompt);

        return res.json({
          text: responseText.trim(),
          capability,
          suggestedAction,
          followUpPrompts: followUps,
          expansionAvailable: detailLevel === 'concise',
        });
      }
    }
  } catch (geminiError) {
    console.warn('Gemini API call encountered error, using intelligent contextual fallback:', geminiError);
  }

  // Fallback engine: deterministic, high-fidelity contextual response matching capability
  const fallback = generateContextualFallback(capability, userPrompt, context, detailLevel);
  return res.json(fallback);
});

// Helper: Determine suggested action link based on capability
function deriveSuggestedAction(capability: string, goal: string) {
  switch (capability) {
    case 'task_recommendation':
    case 'task_hints':
      return { label: 'Go to Learn & Do Tasks', routeId: 'tasks' };
    case 'resume_improvement':
      return { label: 'Open Resume Builder', routeId: 'resume' };
    case 'interview_practice':
      return { label: 'Start Interview Drill', routeId: 'interview' };
    case 'portfolio_writing':
    case 'reflection':
      return { label: 'View Career Evidence', routeId: 'evidence' };
    case 'career_exploration':
    case 'career_planning':
      return { label: 'Explore Opportunities', routeId: 'opportunities' };
    case 'workplace_scenario_coaching':
      return { label: 'Open Work-Ready Scenarios', routeId: 'work-ready' };
    default:
      return { label: 'Take Today’s Action', routeId: 'tasks' };
  }
}

// Helper: Suggest relevant follow-ups
function deriveFollowUps(capability: string, prompt: string): string[] {
  switch (capability) {
    case 'task_recommendation':
      return [
        'How does this task translate into a resume bullet?',
        'Give me an example of what good output looks like',
        'I only have 30 minutes today—what can I finish?',
      ];
    case 'interview_practice':
      return [
        'How should I structure a STAR story for this?',
        'What is the interviewer secretly looking for?',
        'Give me a model answer without tech jargon',
      ];
    case 'resume_improvement':
      return [
        'Make this more concise',
        'How do I prove this skill without claiming a job title?',
        'Check ATS alignment for early-career roles',
      ];
    case 'stuck_support':
      return [
        'Break this down into three 10-minute steps',
        'What should I write if I don’t know the answer?',
        'Show me a beginner-friendly code example',
      ];
    default:
      return [
        'Explain this in more detail',
        'What should my next 15-minute action be?',
        'How do I turn this into verified proof?',
      ];
  }
}

// Fallback generator: Contextual and authentic
function generateContextualFallback(
  capability: string,
  userPrompt: string,
  context: any,
  detailLevel: string
) {
  const name = context.profile?.name || 'Jordan';
  const goal = context.goal || 'Software & Product Engineering';
  const skills = Array.isArray(context.skills) ? context.skills.slice(0, 3).join(', ') : 'React, TypeScript';
  const evidenceCount = Array.isArray(context.careerEvidence) ? context.careerEvidence.length : 2;

  let text = '';
  let action = deriveSuggestedAction(capability, goal);

  switch (capability) {
    case 'task_recommendation':
      text = `Based on your goal of ${goal} and your ${evidenceCount} verified evidence items:\n\n• **Recommended Task**: "Deconstruct 1 Real Job Requirement into 3 Verifiable Exercises"\n• **Why it fits**: It takes an intimidating job description and turns it into small practice exercises you can finish in under 30 minutes.\n• **Output**: A documented skill mapping you can immediately add to your Career Evidence Vault.`;
      break;

    case 'resume_improvement':
      text = `Here is how to strengthen your resume bullet without inventing metrics:\n\n• **Lead with the action & scope**: "Engineered interactive state management in React using custom hooks and TypeScript."\n• **Anchor in verified proof**: "Conducted accessibility compliance audit (WCAG 2.1 AA) verifying color contrast ratios and keyboard focus rings."\n• **Result**: Demonstrates direct operational competence over empty buzzwords.`;
      break;

    case 'interview_practice':
      text = `When answering technical or behavioral interview questions for ${goal}:\n\n1. **State the core constraint first**: "In my pricing calculator project, the priority was reliable state synchronization across billing toggles."\n2. **Highlight the deliberate choice**: "I separated calculation logic into a pure utility function so edge-case currencies could be tested in isolation."\n3. **Close with verification**: "Then I verified keyboard navigation using VoiceOver."`;
      break;

    case 'stuck_support':
      text = `Feeling stuck is a natural part of doing real work. Let's unblock you:\n\n1. **Stop trying to write the final version**: Put down an ugly, rough 2-sentence draft of what you think the solution is.\n2. **Break it into 3 parts**: What input comes in? What transformation happens? What gets returned?\n3. **Inspect one small piece**: Don't solve the entire problem at once. Just log or verify step 1 first.`;
      break;

    case 'skill_gap_analysis':
      text = `For early-career roles in ${goal}:\n\n• **What you already have**: Demonstrated foundational competence in ${skills} with verified evidence.\n• **Primary gap**: Demonstrating asynchronous team collaboration (e.g. PR reviews, handling feedback on code).\n• **Next action**: Complete the "Simulate a PR Code Review Disagreement" scenario in Work-Ready.`;
      break;

    default:
      text = `Hello ${name}. Focusing on ${goal} without overwhelm comes down to one principle: start wherever you are, build proof, and become ready.\n\n• You currently have ${evidenceCount} verified proofs in your vault.\n• Pick one focused 20-minute task today rather than trying to master the entire field.\n• Would you like a task recommendation, interview practice, or resume review?`;
      break;
  }

  return {
    text,
    capability,
    suggestedAction: action,
    followUpPrompts: deriveFollowUps(capability, userPrompt),
    expansionAvailable: detailLevel === 'concise',
  };
}

// Development mode with Vite middleware vs Production static serving
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      configFile: path.resolve(__dirname, 'vite.config.ts'),
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    // Development SPA handler
    app.use('*', async (req, res, next) => {
      if (req.originalUrl.startsWith('/api')) {
        return next();
      }
      try {
        const url = req.originalUrl;
        const indexHtmlPath = path.resolve(__dirname, 'index.html');
        let template = fs.readFileSync(indexHtmlPath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        if (vite && (vite as any).ssrFixStacktrace) {
          (vite as any).ssrFixStacktrace(e as Error);
        }
        next(e);
      }
    });
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CareerOS Full-Stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
