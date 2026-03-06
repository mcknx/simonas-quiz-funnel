export type StepType =
  | "single-select"
  | "multi-select"
  | "info"
  | "water-glasses"
  | "body-area"
  | "body-shape"
  | "slider"
  | "number-input"
  | "comparison-chart"
  | "weight-chart";

export interface QuizOption {
  id: string;
  label: string;
  description?: string;
}

export interface BodyAreaConfig {
  id: string;
  label: string;
  top: string;
  left: string;
}

export interface QuizStep {
  id: string;
  type: StepType;
  question?: string;
  subtitle?: string;
  options?: QuizOption[];
  /** For info steps */
  infoHeading?: string;
  infoBody?: string;
  infoBullets?: string[];
  infoButtonLabel?: string;
  infoIcon?: "lightbulb" | "moon" | "leaf";
  pinkBg?: boolean;
  /** For slider */
  sliderLabels?: string[];
  /** For body area */
  bodyAreas?: BodyAreaConfig[];
  /** For body shape */
  shapes?: QuizOption[];
  /** Progress bar segment (0-3) */
  segment: number;
}

export const quizSteps: QuizStep[] = [
  // ─── SEGMENT 0: Getting Started ─────────────────────────
  {
    id: "familiarity",
    type: "single-select",
    question: "How familiar are you with Intermittent Fasting?",
    options: [
      { id: "none", label: "I don't know anything" },
      { id: "heard", label: "I've heard about it" },
      { id: "advanced", label: "I'm advanced in fasting" },
    ],
    segment: 0,
  },
  {
    id: "gender",
    type: "single-select",
    question: "Select your gender",
    subtitle:
      "Gender can influence various physical aspects, such as metabolism, muscle composition, or hormone levels. This is taken into account when customising your personal program.",
    options: [
      { id: "female", label: "Female" },
      { id: "male", label: "Male" },
    ],
    segment: 0,
  },
  {
    id: "benefits-info",
    type: "info",
    infoHeading: "Least of the benefits you can expect when fasting:",
    infoBody:
      "It's a dynamic approach to eating that cycles between periods of eating and fasting. This method doesn't focus on what you eat, but rather when you eat. By incorporating structured eating windows and fasting periods, intermittent fasting offers a flexible and sustainable way to manage weight, improve metabolic health, and boost overall well-being.",
    infoBullets: [
      "Longer & healthier life",
      "Efficient fat burning & weight loss",
      "Lower blood sugar",
      "Lower cholesterol levels",
    ],
    infoButtonLabel: "Got it, let's go!",
    infoIcon: "lightbulb",
    pinkBg: true,
    segment: 0,
  },
  {
    id: "bad-habits",
    type: "multi-select",
    question: "Do you have any of the following bad habits?",
    options: [
      { id: "meals-relaxing", label: "I eat meals while relaxing" },
      { id: "soft-drinks", label: "I'm constantly drinking soft drinks" },
      { id: "drinks", label: "I indulge in a drink or two" },
      { id: "cravings", label: "I get cravings late at night" },
      { id: "snack", label: "I snack too often" },
      { id: "salty", label: "I crave salty foods" },
      { id: "none", label: "None of above" },
    ],
    segment: 0,
  },
  {
    id: "weight-comparison",
    type: "comparison-chart",
    question: "DoFasting delivers sustainable weight loss and long-lasting results",
    subtitle: "The plan is personalized to fit your lifestyle",
    segment: 0,
  },
  {
    id: "sleep-info",
    type: "info",
    infoHeading: "Good night's rest is incredibly important for weight loss",
    infoBody:
      "Intermittent Fasting can play a pivotal role in promoting quality sleep. Research suggests that fasting may regulate circadian rhythms, aligning the body's internal clock and enhancing sleep patterns.",
    infoButtonLabel: "Understood, continue",
    infoIcon: "moon",
    pinkBg: true,
    segment: 0,
  },

  // ─── SEGMENT 1: Body & Lifestyle ───────────────────────
  {
    id: "water-intake",
    type: "water-glasses",
    question: "How much water do you typically drink in a day?",
    segment: 1,
  },
  {
    id: "body-areas",
    type: "body-area",
    question: "Any areas you'd like to improve?",
    subtitle: "If you're happy with your appearance, then press Continue",
    bodyAreas: [
      { id: "arms", label: "Arms", top: "28%", left: "72%" },
      { id: "chest", label: "Chest", top: "36%", left: "12%" },
      { id: "abs", label: "Abs", top: "48%", left: "72%" },
      { id: "glutes", label: "Glutes", top: "55%", left: "12%" },
    ],
    segment: 1,
  },
  {
    id: "height-weight",
    type: "number-input",
    question: "What's your height and weight?",
    subtitle:
      "Healthy fasting weight loss is 1-2 pounds weekly. Your height and weight guide our tailored plan.",
    segment: 1,
  },
  {
    id: "body-shape",
    type: "body-shape",
    question: "What is your body shape?",
    shapes: [
      { id: "rounded", label: "Rounded" },
      { id: "triangle", label: "Triangle" },
      { id: "rectangle", label: "Rectangle" },
      { id: "inverted-triangle", label: "Inverted triangle" },
      { id: "hourglass", label: "Hourglass" },
    ],
    segment: 1,
  },

  // ─── SEGMENT 2: Habits & Behavior ──────────────────────
  {
    id: "eating-distracted",
    type: "slider",
    question: "How often do you eat while working or using your phone?",
    sliderLabels: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    segment: 2,
  },
  {
    id: "aging-info",
    type: "info",
    infoHeading: "Well planned fasting program can slow down aging",
    infoBody:
      "Intermittent fasting offers more than just weight management benefits—it's a powerful tool in the quest for youthful skin and anti-aging.\n\nThrough its ability to enhance cellular repair processes and boost the production of antioxidants, fasting assists in reducing oxidative stress and inflammation, key contributors to aging skin.",
    infoButtonLabel: "Continue",
    infoIcon: "leaf",
    pinkBg: true,
    segment: 2,
  },

  // ─── SEGMENT 3: Results ────────────────────────────────
  {
    id: "results",
    type: "weight-chart",
    segment: 3,
  },
];
