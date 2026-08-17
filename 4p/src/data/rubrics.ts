export interface ScoreOption {
  level: number;
  label: string;
  description: string;
  badgeText: string;
  colorClass: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
}

// 1. PEOPLE - Psychological Safety & Wellbeing
export const PEOPLE_SAFETY_RUBRIC: ScoreOption[] = [
  {
    level: 1,
    label: "Withdraw",
    description: "Fear, immediate stress, and operational defeat. Technical glitches trigger visible distress, causing the teacher to shut down equipment, apologise, and retreat back into static paper/chalk work.",
    badgeText: "Level 1: Withdraw",
    colorClass: "#890C58",
    bgClass: "bg-[#890C58]/5 hover:bg-[#890C58]/10",
    textClass: "text-[#890C58]",
    borderClass: "border-[#890C58]/20"
  },
  {
    level: 2,
    label: "Stabilise",
    description: "Technology is only used to tick management's boxes; it is avoided or feared when unexpected tech issues happen.",
    badgeText: "Level 2: Stabilise",
    colorClass: "#D73828",
    bgClass: "bg-[#D73828]/5 hover:bg-[#D73828]/10",
    textClass: "text-[#D73828]",
    borderClass: "border-[#D73828]/40"
  },
  {
    level: 3,
    label: "Explore",
    description: "Building a positive attitude toward tech errors and mistakes. Tech issues are normalised. Teachers feel safe to troubleshoot live or laugh off small errors in front of learners without feeling that they are being judged.",
    badgeText: "Level 3: Explore",
    colorClass: "#00A1A3",
    bgClass: "bg-[#00A1A3]/5 hover:bg-[#00A1A3]/10",
    textClass: "text-[#00A1A3]",
    borderClass: "border-[#00A1A3]/20"
  },
  {
    level: 4,
    label: "Lead",
    description: "Shared resilience. Teachers actively support each other through tech issues. Failures are treated strictly as data to troubleshoot together, not as a reflection of teaching ability.",
    badgeText: "Level 4: Lead",
    colorClass: "#C8126E",
    bgClass: "bg-[#C8126E]/5 hover:bg-[#C8126E]/10",
    textClass: "text-[#C8126E]",
    borderClass: "border-[#C8126E]/20"
  }
];

// 2. PEOPLE - Digital Confidence & Agency
export const PEOPLE_CONFIDENCE_RUBRIC: ScoreOption[] = [
  {
    level: 1,
    label: "Withdraw",
    description: "Severe learned helplessness. The teacher feels totally unable to operate software and digital tool and relies completely on the physical presence of an ICT Champ or Lab Coordinator for the simplest tasks.",
    badgeText: "Level 1: Withdraw",
    colorClass: "#890C58",
    bgClass: "bg-[#890C58]/5 hover:bg-[#890C58]/10",
    textClass: "text-[#890C58]",
    borderClass: "border-[#890C58]/20"
  },
  {
    level: 2,
    label: "Stabilise",
    description: "Strict step-following. Teachers follow a fixed routine and panic or get completely stuck when unexpected pop-ups or password prompts appear.",
    badgeText: "Level 2: Stabilise",
    colorClass: "#D73828",
    bgClass: "bg-[#D73828]/5 hover:bg-[#D73828]/10",
    textClass: "text-[#D73828]",
    borderClass: "border-[#D73828]/40"
  },
  {
    level: 3,
    label: "Explore",
    description: "Basic self-troubleshooting. Teachers search for answers, check guides, try different browsers, or restart devices before requesting help.",
    badgeText: "Level 3: Explore",
    colorClass: "#00A1A3",
    bgClass: "bg-[#00A1A3]/5 hover:bg-[#00A1A3]/10",
    textClass: "text-[#00A1A3]",
    borderClass: "border-[#00A1A3]/20"
  },
  {
    level: 4,
    label: "Lead",
    description: "Proactive system ownership. Teachers design custom digital solutions, find apps for everyday tasks, and share local cheat sheets with staff.",
    badgeText: "Level 4: Lead",
    colorClass: "#C8126E",
    bgClass: "bg-[#C8126E]/5 hover:bg-[#C8126E]/10",
    textClass: "text-[#C8126E]",
    borderClass: "border-[#C8126E]/20"
  }
];

// 3. PRACTICES - Collaboration & School Rituals
export const PRACTICES_COLLAB_RUBRIC: ScoreOption[] = [
  {
    level: 1,
    label: "Withdraw",
    description: "Total paper reliance. All school documents and notices are physical paper only. Digital spaces are completely unused.",
    badgeText: "Level 1: Withdraw",
    colorClass: "#890C58",
    bgClass: "bg-[#890C58]/5 hover:bg-[#890C58]/10",
    textClass: "text-[#890C58]",
    borderClass: "border-[#890C58]/20"
  },
  {
    level: 2,
    label: "Stabilise",
    description: "Total reliance on one or two persons. All tech falls on a single, overworked ICT Lead. If they are away, all digital systems stop working.",
    badgeText: "Level 2: Stabilise",
    colorClass: "#D73828",
    bgClass: "bg-[#D73828]/5 hover:bg-[#D73828]/10",
    textClass: "text-[#D73828]",
    borderClass: "border-[#D73828]/40"
  },
  {
    level: 3,
    label: "Explore",
    description: "Unofficial sharing networks. Teachers use chat groups to swap lesson materials and coordinate schedules, though no formal school platform is set up.",
    badgeText: "Level 3: Explore",
    colorClass: "#00A1A3",
    bgClass: "bg-[#00A1A3]/5 hover:bg-[#00A1A3]/10",
    textClass: "text-[#00A1A3]",
    borderClass: "border-[#00A1A3]/20"
  },
  {
    level: 4,
    label: "Lead",
    description: "Structured online systems. Shared platforms like Google Workspace or Teams are actively maintained, and teachers co-create lesson plans using online templates.",
    badgeText: "Level 4: Lead",
    colorClass: "#C8126E",
    bgClass: "bg-[#C8126E]/5 hover:bg-[#C8126E]/10",
    textClass: "text-[#C8126E]",
    borderClass: "border-[#C8126E]/20"
  }
];

// 4. PRACTICES - Professional Development & Learning Pathways
export const PRACTICES_PD_RUBRIC: ScoreOption[] = [
  {
    level: 1,
    label: "Withdraw",
    description: "Skipping development. Teachers actively avoid professional development and workshops, feeling burned out and assuming it won't be useful in the classroom.",
    badgeText: "Level 1: Withdraw",
    colorClass: "#890C58",
    bgClass: "bg-[#890C58]/5 hover:bg-[#890C58]/10",
    textClass: "text-[#890C58]",
    borderClass: "border-[#890C58]/20"
  },
  {
    level: 2,
    label: "Stabilise",
    description: "Compliance checkbox attendance. Teachers sit silently through mandatory training because SMT demands it. No evidence of these learnings ever shows up inside their classroom lessons.",
    badgeText: "Level 2: Stabilise",
    colorClass: "#D73828",
    bgClass: "bg-[#D73828]/5 hover:bg-[#D73828]/10",
    textClass: "text-[#D73828]",
    borderClass: "border-[#D73828]/40"
  },
  {
    level: 3,
    label: "Explore",
    description: "Active self-learning. Teachers register for optional webinars, courses and complete online micro-learning sessions, and actively try some of the teachings and digital tools in their lessons.",
    badgeText: "Level 3: Explore",
    colorClass: "#00A1A3",
    bgClass: "bg-[#00A1A3]/5 hover:bg-[#00A1A3]/10",
    textClass: "text-[#00A1A3]",
    borderClass: "border-[#00A1A3]/20"
  },
  {
    level: 4,
    label: "Lead",
    description: "Structured teacher support. Designated teachers mentor their peers through regular check-ins, meetings, classroom visits, and staff developmental sessions.",
    badgeText: "Level 4: Lead",
    colorClass: "#C8126E",
    bgClass: "bg-[#C8126E]/5 hover:bg-[#C8126E]/10",
    textClass: "text-[#C8126E]",
    borderClass: "border-[#C8126E]/20"
  }
];

// 5. PRACTICES - Cyber Wellness & Digital Citizenship
export const PRACTICES_CYBER_RUBRIC: ScoreOption[] = [
  {
    level: 1,
    label: "Withdraw",
    description: "Fear-based rejection. Fears about viruses, tech failure, hacking, or online safety risks keep equipment and technology locked away. Cyber wellness is ignored or treated as too complex to manage.",
    badgeText: "Level 1: Withdraw",
    colorClass: "#890C58",
    bgClass: "bg-[#890C58]/5 hover:bg-[#890C58]/10",
    textClass: "text-[#890C58]",
    borderClass: "border-[#890C58]/20"
  },
  {
    level: 2,
    label: "Stabilise",
    description: "Heavy-handed control. Tech is kept under lock and key, with sites blocked and tools restricted. Learners are treated as risks to manage rather than learners to trust.",
    badgeText: "Level 2: Stabilise",
    colorClass: "#D73828",
    bgClass: "bg-[#D73828]/5 hover:bg-[#D73828]/10",
    textClass: "text-[#D73828]",
    borderClass: "border-[#D73828]/40"
  },
  {
    level: 3,
    label: "Explore",
    description: "Teaching digital safety directly. Safe passwords, login habits, and proper online behaviour are built into regular lessons, helping learners learn and follow basic safety rules.",
    badgeText: "Level 3: Explore",
    colorClass: "#00A1A3",
    bgClass: "bg-[#00A1A3]/5 hover:bg-[#00A1A3]/10",
    textClass: "text-[#00A1A3]",
    borderClass: "border-[#00A1A3]/20"
  },
  {
    level: 4,
    label: "Lead",
    description: "Learner-led peer support. Learner and Teacher ambassadors assist with basic classroom tech setup, teach younger peers about their digital footprints, and lead by example in online ethics.",
    badgeText: "Level 4: Lead",
    colorClass: "#C8126E",
    bgClass: "bg-[#C8126E]/5 hover:bg-[#C8126E]/10",
    textClass: "text-[#C8126E]",
    borderClass: "border-[#C8126E]/20"
  }
];

// 6. PEDAGOGY - Lesson Design & Digital Integration
export const PEDAGOGY_DESIGN_RUBRIC: ScoreOption[] = [
  {
    level: 1,
    label: "Withdraw",
    description: "Unused classroom tech. Smartboards and projectors sit powered off, while lessons stick strictly to traditional chalkboard lectures.",
    badgeText: "Level 1: Withdraw",
    colorClass: "#890C58",
    bgClass: "bg-[#890C58]/5 hover:bg-[#890C58]/10",
    textClass: "text-[#890C58]",
    borderClass: "border-[#890C58]/20"
  },
  {
    level: 2,
    label: "Stabilise",
    description: "One-way slide projection. Tech is used purely to display textbook PDFs or static slides, keeping learners passive as they read from the screen.",
    badgeText: "Level 2: Stabilise",
    colorClass: "#D73828",
    bgClass: "bg-[#D73828]/5 hover:bg-[#D73828]/10",
    textClass: "text-[#D73828]",
    borderClass: "border-[#D73828]/40"
  },
  {
    level: 3,
    label: "Explore",
    description: "Engaging digital practice. Tech provides interactive videos, simulations, or gamified quizzes where learners get instant feedback on their progress.",
    badgeText: "Level 3: Explore",
    colorClass: "#00A1A3",
    bgClass: "bg-[#00A1A3]/5 hover:bg-[#00A1A3]/10",
    textClass: "text-[#00A1A3]",
    borderClass: "border-[#00A1A3]/20"
  },
  {
    level: 4,
    label: "Lead",
    description: "Learner-led research, collaboration & creation. Technology acts as a launching pad for inquiry and active participation, with learners combining different digital tools to solve problems together.",
    badgeText: "Level 4: Lead",
    colorClass: "#C8126E",
    bgClass: "bg-[#C8126E]/5 hover:bg-[#C8126E]/10",
    textClass: "text-[#C8126E]",
    borderClass: "border-[#C8126E]/20"
  }
];

// 7. PEDAGOGY - Learner Agency & Artefacts
export const PEDAGOGY_AGENCY_RUBRIC: ScoreOption[] = [
  {
    level: 1,
    label: "Withdraw",
    description: "Passive viewing only. Technology stays entirely in the teacher's hands, with learners do not engage with devices, or interactive tools.",
    badgeText: "Level 1: Withdraw",
    colorClass: "#890C58",
    bgClass: "bg-[#890C58]/5 hover:bg-[#890C58]/10",
    textClass: "text-[#890C58]",
    borderClass: "border-[#890C58]/20"
  },
  {
    level: 2,
    label: "Stabilise",
    description: "Heavy-handed guidance. Learners interact with tech in a lock-step sequence, with no room to explore, choose their own path, or create original work.",
    badgeText: "Level 2: Stabilise",
    colorClass: "#D73828",
    bgClass: "bg-[#D73828]/5 hover:bg-[#D73828]/10",
    textClass: "text-[#D73828]",
    borderClass: "border-[#D73828]/40"
  },
  {
    level: 3,
    label: "Explore",
    description: "Structured online practice. Learners log in to complete set tasks on learning platforms, answering questions or doing drills where the software guides their progress.",
    badgeText: "Level 3: Explore",
    colorClass: "#00A1A3",
    bgClass: "bg-[#00A1A3]/5 hover:bg-[#00A1A3]/10",
    textClass: "text-[#00A1A3]",
    borderClass: "border-[#00A1A3]/20"
  },
  {
    level: 4,
    label: "Lead",
    description: "Independent or collaborative creation. Learners use tech tools on their own to build, draw, code, write, or create original projects.",
    badgeText: "Level 4: Lead",
    colorClass: "#C8126E",
    bgClass: "bg-[#C8126E]/5 hover:bg-[#C8126E]/10",
    textClass: "text-[#C8126E]",
    borderClass: "border-[#C8126E]/20"
  }
];

// 8. PEDAGOGY - Cognitive Inclusivity & Differentiation
export const PEDAGOGY_INCLUSIVITY_RUBRIC: ScoreOption[] = [
  {
    level: 1,
    label: "Withdraw",
    description: "One-speed teaching. Lessons push forward at a single pace, with no adjustment or extra time for learners who struggle to keep up.",
    badgeText: "Level 1: Withdraw",
    colorClass: "#890C58",
    bgClass: "bg-[#890C58]/5 hover:bg-[#890C58]/10",
    textClass: "text-[#890C58]",
    borderClass: "border-[#890C58]/20"
  },
  {
    level: 2,
    label: "Stabilise",
    description: "One-click-fits-all pace. The whole class moves screen-by-screen together, causing panic for those who need extra time and boredom for those who don't.",
    badgeText: "Level 2: Stabilise",
    colorClass: "#D73828",
    bgClass: "bg-[#D73828]/5 hover:bg-[#D73828]/10",
    textClass: "text-[#D73828]",
    borderClass: "border-[#D73828]/40"
  },
  {
    level: 3,
    label: "Explore",
    description: "Differentiated learning paths. Digital lessons offer distinct options so quick learners can jump to challenge activities while struggling learners access guided practice.",
    badgeText: "Level 3: Explore",
    colorClass: "#00A1A3",
    bgClass: "bg-[#00A1A3]/5 hover:bg-[#00A1A3]/10",
    textClass: "text-[#00A1A3]",
    borderClass: "border-[#00A1A3]/20"
  },
  {
    level: 4,
    label: "Lead",
    description: "Dynamic personalised paths. AI or adaptive software automatically adjusts lesson difficulty in real time based on learner performance.",
    badgeText: "Level 4: Lead",
    colorClass: "#C8126E",
    bgClass: "bg-[#C8126E]/5 hover:bg-[#C8126E]/10",
    textClass: "text-[#C8126E]",
    borderClass: "border-[#C8126E]/20"
  }
];

// 9. PLATFORMS - Resource Scheduling, Rosters & Access Mechanics
export const PLATFORMS_SCHEDULING_RUBRIC: ScoreOption[] = [
  {
    level: 1,
    label: "Withdraw",
    description: "Zero tech access. Computer rooms are kept locked, with no timetable, leaving equipment gathering dust while classes never use the space.",
    badgeText: "Level 1: Withdraw",
    colorClass: "#890C58",
    bgClass: "bg-[#890C58]/5 hover:bg-[#890C58]/10",
    textClass: "text-[#890C58]",
    borderClass: "border-[#890C58]/20"
  },
  {
    level: 2,
    label: "Stabilise",
    description: "Guarded scheduling. Lab access is strictly gatekept and rarely available for regular lessons, saved mostly for testing, admin, and/or specific projects only.",
    badgeText: "Level 2: Stabilise",
    colorClass: "#D73828",
    bgClass: "bg-[#D73828]/5 hover:bg-[#D73828]/10",
    textClass: "text-[#D73828]",
    borderClass: "border-[#D73828]/40"
  },
  {
    level: 3,
    label: "Explore",
    description: "Shared timetable access. Equipment and labs are booked on a clear schedule, giving multiple grades and classes steady, weekly access.",
    badgeText: "Level 3: Explore",
    colorClass: "#00A1A3",
    bgClass: "bg-[#00A1A3]/5 hover:bg-[#00A1A3]/10",
    textClass: "text-[#00A1A3]",
    borderClass: "border-[#00A1A3]/20"
  },
  {
    level: 4,
    label: "Lead",
    description: "Always-accessible learning spaces. Labs run on seamless, flexible scheduling, allowing learners and classes full access anytime for lessons, projects, or self-study.",
    badgeText: "Level 4: Lead",
    colorClass: "#C8126E",
    bgClass: "bg-[#C8126E]/5 hover:bg-[#C8126E]/10",
    textClass: "text-[#C8126E]",
    borderClass: "border-[#C8126E]/20"
  }
];

// 10. PLATFORMS - Classroom Digital Tool Access & Usability
export const PLATFORMS_USABILITY_RUBRIC: ScoreOption[] = [
  {
    level: 1,
    label: "Withdraw",
    description: "Digital tools are unavailable, difficult to access or rarely used during the lesson. Time may be lost finding devices, logging in, resolving connectivity problems or waiting for technical support. Technology may be abandoned when difficulties arise.",
    badgeText: "Level 1: Withdraw",
    colorClass: "#890C58",
    bgClass: "bg-[#890C58]/5 hover:bg-[#890C58]/10",
    textClass: "text-[#890C58]",
    borderClass: "border-[#890C58]/20"
  },
  {
    level: 2,
    label: "Stabilise",
    description: "Digital tools are available and can support the lesson, but access still requires preparation, teacher control or technical assistance. Learners may depend heavily on the teacher to log in, navigate platforms or resolve basic problems.",
    badgeText: "Level 2: Stabilise",
    colorClass: "#D73828",
    bgClass: "bg-[#D73828]/5 hover:bg-[#D73828]/10",
    textClass: "text-[#D73828]",
    borderClass: "border-[#D73828]/40"
  },
  {
    level: 3,
    label: "Explore",
    description: "Devices and platforms are readily accessible during the lesson and learners can use them with growing independence. Transitions into digital activities are smooth, access is generally equitable and technology supports the intended learning activity without unnecessary disruption.",
    badgeText: "Level 3: Explore",
    colorClass: "#00A1A3",
    bgClass: "bg-[#00A1A3]/5 hover:bg-[#00A1A3]/10",
    textClass: "text-[#00A1A3]",
    borderClass: "border-[#00A1A3]/20"
  },
  {
    level: 4,
    label: "Lead",
    description: "Digital access is seamless and flexible. Teachers and learners move confidently between devices, platforms and non-digital learning according to the needs of the task. Learners can access resources independently, troubleshoot routine issues and use technology naturally as part of learning.",
    badgeText: "Level 4: Lead",
    colorClass: "#C8126E",
    bgClass: "bg-[#C8126E]/5 hover:bg-[#C8126E]/10",
    textClass: "text-[#C8126E]",
    borderClass: "border-[#C8126E]/20"
  }
];

// 11. PLATFORMS - Digital Tool & ePortal Integration
export const PLATFORMS_EPORTAL_RUBRIC: ScoreOption[] = [
  {
    level: 1,
    label: "Withdraw",
    description: "Unused platforms. WCED ePortal, and digital tools are ignored, with teaching and learning relying strictly on physical or digital textbooks and paper photocopies.",
    badgeText: "Level 1: Withdraw",
    colorClass: "#890C58",
    bgClass: "bg-[#890C58]/5 hover:bg-[#890C58]/10",
    textClass: "text-[#890C58]",
    borderClass: "border-[#890C58]/20"
  },
  {
    level: 2,
    label: "Stabilise",
    description: "Occasional browsing. A few teachers occasionally search the ePortal for past papers or use basic digital tools for personal lesson prep, but learners rarely interact with them.",
    badgeText: "Level 2: Stabilise",
    colorClass: "#D73828",
    bgClass: "bg-[#D73828]/5 hover:bg-[#D73828]/10",
    textClass: "text-[#D73828]",
    borderClass: "border-[#D73828]/40"
  },
  {
    level: 3,
    label: "Explore",
    description: "Active subject support. Teachers download ePortal revision guides and CAPS materials, while using digital tools to share interactive lessons, track practice, and collect weekly classwork or homework",
    badgeText: "Level 3: Explore",
    colorClass: "#00A1A3",
    bgClass: "bg-[#00A1A3]/5 hover:bg-[#00A1A3]/10",
    textClass: "text-[#00A1A3]",
    borderClass: "border-[#00A1A3]/20"
  },
  {
    level: 4,
    label: "Lead",
    description: "Effortless learning flow. ePortal resources and interactive tools integrate seamlessly into daily lessons. Learning and teaching flow naturally through active online discussions, digital work submissions, and continuous progress tracking.",
    badgeText: "Level 4: Lead",
    colorClass: "#C8126E",
    bgClass: "bg-[#C8126E]/5 hover:bg-[#C8126E]/10",
    textClass: "text-[#C8126E]",
    borderClass: "border-[#C8126E]/20"
  }
];

// 12. PEOPLE (Classroom) - Teacher Digital Confidence & Responsiveness
export const CLASSROOM_TEACHER_CONFIDENCE_RUBRIC: ScoreOption[] = [
  {
    level: 1,
    label: "Withdraw",
    description: "Teacher use of technology is highly cautious or avoided. Minor technical difficulties interrupt the lesson, and the teacher may abandon the digital activity or immediately depend on outside assistance.",
    badgeText: "Level 1: Withdraw",
    colorClass: "#890C58",
    bgClass: "bg-[#890C58]/5 hover:bg-[#890C58]/10",
    textClass: "text-[#890C58]",
    borderClass: "border-[#890C58]/20"
  },
  {
    level: 2,
    label: "Stabilise",
    description: "Teacher manages familiar digital tools and basic problems but relies on known routines. Unexpected issues may slow the lesson or require assistance.",
    badgeText: "Level 2: Stabilise",
    colorClass: "#D73828",
    bgClass: "bg-[#D73828]/5 hover:bg-[#D73828]/10",
    textClass: "text-[#D73828]",
    borderClass: "border-[#D73828]/40"
  },
  {
    level: 3,
    label: "Explore",
    description: "Teacher uses technology confidently, adapts when difficulties occur and models calm problem-solving without significantly disrupting learning.",
    badgeText: "Level 3: Explore",
    colorClass: "#00A1A3",
    bgClass: "bg-[#00A1A3]/5 hover:bg-[#00A1A3]/10",
    textClass: "text-[#00A1A3]",
    borderClass: "border-[#00A1A3]/20"
  },
  {
    level: 4,
    label: "Lead",
    description: "Teacher uses technology flexibly and confidently, makes informed adjustments during the lesson and models independent, reflective problem-solving for learners.",
    badgeText: "Level 4: Lead",
    colorClass: "#C8126E",
    bgClass: "bg-[#C8126E]/5 hover:bg-[#C8126E]/10",
    textClass: "text-[#C8126E]",
    borderClass: "border-[#C8126E]/20"
  }
];

// 13. PEOPLE (Classroom) - Learner Confidence, Voice & Agency
export const CLASSROOM_LEARNER_AGENCY_RUBRIC: ScoreOption[] = [
  {
    level: 1,
    label: "Withdraw",
    description: "Learners are mainly passive recipients of digital content and depend on the teacher for instructions, navigation and decisions. Few opportunities exist for learner choice or contribution.",
    badgeText: "Level 1: Withdraw",
    colorClass: "#890C58",
    bgClass: "bg-[#890C58]/5 hover:bg-[#890C58]/10",
    textClass: "text-[#890C58]",
    borderClass: "border-[#890C58]/20"
  },
  {
    level: 2,
    label: "Stabilise",
    description: "Learners participate in structured digital activities but remain strongly teacher-directed. Some learners demonstrate growing confidence in using tools independently.",
    badgeText: "Level 2: Stabilise",
    colorClass: "#D73828",
    bgClass: "bg-[#D73828]/5 hover:bg-[#D73828]/10",
    textClass: "text-[#D73828]",
    borderClass: "border-[#D73828]/40"
  },
  {
    level: 3,
    label: "Explore",
    description: "Learners use digital tools with increasing independence, ask questions, make choices, collaborate and contribute actively to the learning process.",
    badgeText: "Level 3: Explore",
    colorClass: "#00A1A3",
    bgClass: "bg-[#00A1A3]/5 hover:bg-[#00A1A3]/10",
    textClass: "text-[#00A1A3]",
    borderClass: "border-[#00A1A3]/20"
  },
  {
    level: 4,
    label: "Lead",
    description: "Learners demonstrate strong digital agency, confidently select approaches, support peers, solve routine problems and take meaningful ownership of their learning.",
    badgeText: "Level 4: Lead",
    colorClass: "#C8126E",
    bgClass: "bg-[#C8126E]/5 hover:bg-[#C8126E]/10",
    textClass: "text-[#C8126E]",
    borderClass: "border-[#C8126E]/20"
  }
];

// 14. PEOPLE (Classroom) - Relational Safety & Help-Seeking
export const CLASSROOM_RELATIONAL_SAFETY_RUBRIC: ScoreOption[] = [
  {
    level: 1,
    label: "Withdraw",
    description: "Learners hesitate to ask for help or make mistakes publicly. Digital difficulties may cause frustration, disengagement or reliance entirely on the teacher.",
    badgeText: "Level 1: Withdraw",
    colorClass: "#890C58",
    bgClass: "bg-[#890C58]/5 hover:bg-[#890C58]/10",
    textClass: "text-[#890C58]",
    borderClass: "border-[#890C58]/20"
  },
  {
    level: 2,
    label: "Stabilise",
    description: "Learners ask for support when needed, although assistance remains mainly teacher-led and mistakes may still interrupt participation.",
    badgeText: "Level 2: Stabilise",
    colorClass: "#D73828",
    bgClass: "bg-[#D73828]/5 hover:bg-[#D73828]/10",
    textClass: "text-[#D73828]",
    borderClass: "border-[#D73828]/40"
  },
  {
    level: 3,
    label: "Explore",
    description: "Learners comfortably ask questions, try again after mistakes and assist one another appropriately during digital activities.",
    badgeText: "Level 3: Explore",
    colorClass: "#00A1A3",
    bgClass: "bg-[#00A1A3]/5 hover:bg-[#00A1A3]/10",
    textClass: "text-[#00A1A3]",
    borderClass: "border-[#00A1A3]/20"
  },
  {
    level: 4,
    label: "Lead",
    description: "Mistakes are treated naturally as part of learning. Learners confidently troubleshoot, seek or provide support and demonstrate shared responsibility for successful participation.",
    badgeText: "Level 4: Lead",
    colorClass: "#C8126E",
    bgClass: "bg-[#C8126E]/5 hover:bg-[#C8126E]/10",
    textClass: "text-[#C8126E]",
    borderClass: "border-[#C8126E]/20"
  }
];

// 15. PRACTICE (Classroom) - Collaboration & Shared Digital Practice
export const CLASSROOM_COLLAB_RUBRIC: ScoreOption[] = [
  {
    level: 1,
    label: "Withdraw",
    description: "Technology use is largely individual or teacher-controlled, with little evidence of learner interaction, peer support or shared digital work.",
    badgeText: "Level 1: Withdraw",
    colorClass: "#890C58",
    bgClass: "bg-[#890C58]/5 hover:bg-[#890C58]/10",
    textClass: "text-[#890C58]",
    borderClass: "border-[#890C58]/20"
  },
  {
    level: 2,
    label: "Stabilise",
    description: "Learners participate in structured pair or group digital activities, but collaboration is mainly directed by the teacher.",
    badgeText: "Level 2: Stabilise",
    colorClass: "#D73828",
    bgClass: "bg-[#D73828]/5 hover:bg-[#D73828]/10",
    textClass: "text-[#D73828]",
    borderClass: "border-[#D73828]/40"
  },
  {
    level: 3,
    label: "Explore",
    description: "Learners regularly collaborate, share resources, give feedback and support one another through purposeful digital activities.",
    badgeText: "Level 3: Explore",
    colorClass: "#00A1A3",
    bgClass: "bg-[#00A1A3]/5 hover:bg-[#00A1A3]/10",
    textClass: "text-[#00A1A3]",
    borderClass: "border-[#00A1A3]/20"
  },
  {
    level: 4,
    label: "Lead",
    description: "Collaboration is embedded naturally in the lesson. Learners organise shared work, contribute different strengths, provide meaningful peer support and collectively create or solve problems using technology.",
    badgeText: "Level 4: Lead",
    colorClass: "#C8126E",
    bgClass: "bg-[#C8126E]/5 hover:bg-[#C8126E]/10",
    textClass: "text-[#C8126E]",
    borderClass: "border-[#C8126E]/20"
  }
];

// 16. PEDAGOGY (Classroom) - Cyber Wellness Integration into Subject Learning
export const PEDAGOGY_CYBER_WELLNESS_RUBRIC: ScoreOption[] = [
  {
    level: 1,
    label: "Withdraw",
    description: "No visible connection is made between the subject lesson and cyber wellness, responsible digital behaviour or the learner's online experience, even where the lesson creates a natural opportunity for it.",
    badgeText: "Level 1: Withdraw",
    colorClass: "#890C58",
    bgClass: "bg-[#890C58]/5 hover:bg-[#890C58]/10",
    textClass: "text-[#890C58]",
    borderClass: "border-[#890C58]/20"
  },
  {
    level: 2,
    label: "Stabilise",
    description: "Cyber wellness is mentioned when relevant, usually through reminders about online safety, responsible behaviour, privacy or appropriate technology use, but remains separate from the main learning activity.",
    badgeText: "Level 2: Stabilise",
    colorClass: "#D73828",
    bgClass: "bg-[#D73828]/5 hover:bg-[#D73828]/10",
    textClass: "text-[#D73828]",
    borderClass: "border-[#D73828]/40"
  },
  {
    level: 3,
    label: "Explore",
    description: "Cyber wellness is purposefully connected to the subject content through discussion, examples, activities or reflection, helping learners consider issues such as digital identity, online behaviour, misinformation, AI use, digital empathy or wellbeing within the learning context.",
    badgeText: "Level 3: Explore",
    colorClass: "#00A1A3",
    bgClass: "bg-[#00A1A3]/5 hover:bg-[#00A1A3]/10",
    textClass: "text-[#00A1A3]",
    borderClass: "border-[#00A1A3]/20"
  },
  {
    level: 4,
    label: "Lead",
    description: "Cyber wellness is naturally embedded into subject learning where relevant. Learners critically examine digital choices, behaviour, ethics and wellbeing, apply these ideas to authentic subject-based tasks, and demonstrate responsible judgement within their own digital participation and creation.",
    badgeText: "Level 4: Lead",
    colorClass: "#C8126E",
    bgClass: "bg-[#C8126E]/5 hover:bg-[#C8126E]/10",
    textClass: "text-[#C8126E]",
    borderClass: "border-[#C8126E]/20"
  }
];

// Alias for backwards compatibility
export const PLATFORMS_INTEGRATION_RUBRIC = PLATFORMS_USABILITY_RUBRIC;

// Legacies kept for retro compatibility if used partially by other modules
export const PEOPLE_RUBRIC = PEOPLE_SAFETY_RUBRIC;
export const PRACTICES_RUBRIC = PRACTICES_COLLAB_RUBRIC;
export const PEDAGOGY_RUBRIC = PEDAGOGY_DESIGN_RUBRIC;

export const SCENARIO_OPTIONS = [
  {
    value: 1,
    label: "Teacher feels defeated, turns off equipment, and reverts entirely to chalkboard. (Level 1: Withdraw)",
    shortLabel: "Abandons technology",
    level: 1
  },
  {
    value: 2,
    label: "Lesson halts or stalls; teacher submits a technical ticket and waits for IT assistance. (Level 2: Stabilise)",
    shortLabel: "Halts & waits for support",
    level: 2
  },
  {
    value: 3,
    label: "Teacher pivots dynamically to offline digital resources or runs are supported via a personal hotspot. (Level 3: Explore)",
    shortLabel: "Pivots to local/personal backup",
    level: 3
  },
  {
    value: 4,
    label: "School has systemic offline local backups (e.g. local servers, pre-cached content) deployed seamlessly. (Level 4: Lead)",
    shortLabel: "Deploys institutional offline backup",
    level: 4
  }
];
