import React, { useState } from "react";
import { 
  X, 
  Shield, 
  BookOpen, 
  Users, 
  HardDrive, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  Info, 
  Search, 
  HelpCircle, 
  Award, 
  Zap, 
  Globe, 
  Sparkles, 
  ShieldCheck, 
  Network, 
  School, 
  GraduationCap,
  Printer,
  Download,
  FileText
} from "lucide-react";

interface RubricGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RubricGuide({ isOpen, onClose }: RubricGuideProps) {
  const [activeTab, setActiveTab] = useState<"all" | "school" | "classroom" | "people" | "practices" | "pedagogy" | "platforms">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSection, setExpandedSection] = useState<string | null>("classroom-teacher-confidence");

  const handleDownloadPdf = () => {
    // Save original title and set dedicated filename for PDF download
    const prevTitle = document.title;
    document.title = "4P Transformation Rubric Guide";

    // Isolate print document so background application is not included
    document.body.classList.add("printing-rubric");
    
    const cleanup = () => {
      document.body.classList.remove("printing-rubric");
      document.title = prevTitle;
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup);
    
    window.print();
    
    setTimeout(() => {
      document.body.classList.remove("printing-rubric");
      document.title = prevTitle;
    }, 1500);
  };

  if (!isOpen) return null;

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const sections = [
    // --- CLASSROOM EVIDENCE RUBRICS ---
    {
      id: "classroom-teacher-confidence",
      scope: "classroom",
      category: "people",
      title: "Classroom: Teacher Digital Confidence & Responsiveness",
      icon: <Zap className="w-4 h-4 text-[#890C58]" />,
      objective: "How does the teacher manage digital tools and respond to unexpected technical challenges during live instruction?",
      levels: [
        { level: 1, label: "Withdraw", desc: "Teacher use of technology is highly cautious or avoided. Minor technical difficulties interrupt the lesson, and the teacher may abandon the digital activity or immediately depend on outside assistance." },
        { level: 2, label: "Stabilise", desc: "Teacher manages familiar digital tools and basic problems but relies on known routines. Unexpected issues may slow the lesson or require assistance." },
        { level: 3, label: "Explore", desc: "Teacher uses technology confidently, adapts when difficulties occur and models calm problem-solving without significantly disrupting learning." },
        { level: 4, label: "Lead", desc: "Teacher uses technology flexibly and confidently, makes informed adjustments during the lesson and models independent, reflective problem-solving for learners." }
      ],
      evidence: [
        "How the teacher handles password prompts, projector resolution mismatches, or intermittent Wi-Fi during the period.",
        "Calmness and composure in redirecting learners when an app or resource fails to load.",
        "Ability to make live pedagogical adjustments without abandoning digital outcomes."
      ],
      probes: [
        "When an unexpected screen freeze or login error occurs, how smoothly do you transition learners?",
        "Do you feel empowered to troubleshoot minor connectivity issues independently before calling technical support?"
      ]
    },
    {
      id: "classroom-learner-agency",
      scope: "classroom",
      category: "people",
      title: "Classroom: Learner Confidence, Voice & Agency",
      icon: <Sparkles className="w-4 h-4 text-[#890C58]" />,
      objective: "To what extent do learners demonstrate independence, choice, voice, and ownership when using digital tools in the lesson?",
      levels: [
        { level: 1, label: "Withdraw", desc: "Learners are mainly passive recipients of digital content and depend on the teacher for instructions, navigation and decisions. Few opportunities exist for learner choice or contribution." },
        { level: 2, label: "Stabilise", desc: "Learners participate in structured digital activities but remain strongly teacher-directed. Some learners demonstrate growing confidence in using tools independently." },
        { level: 3, label: "Explore", desc: "Learners use digital tools with increasing independence, ask questions, make choices, collaborate and contribute actively to the learning process." },
        { level: 4, label: "Lead", desc: "Learners demonstrate strong digital agency, confidently select approaches, support peers, solve routine problems and take meaningful ownership of their learning." }
      ],
      evidence: [
        "Learner hands-on time on keyboards/tablets vs. passive watching of front screen.",
        "Whether learners make creative choices about formats, apps, or visual presentations.",
        "Learners independently initiating searches, saving work, and submitting artefacts."
      ],
      probes: [
        "Can learners choose which digital tool or format best demonstrates their subject comprehension?",
        "Are learners actively driving digital manipulation or strictly clicking on predetermined buttons?"
      ]
    },
    {
      id: "classroom-relational-safety",
      scope: "classroom",
      category: "people",
      title: "Classroom: Relational Safety & Help-Seeking",
      icon: <Shield className="w-4 h-4 text-[#890C58]" />,
      objective: "How comfortable are learners with asking questions, making mistakes, seeking help, and supporting one another during digital activities?",
      levels: [
        { level: 1, label: "Withdraw", desc: "Learners hesitate to ask for help or make mistakes publicly. Digital difficulties may cause frustration, disengagement or reliance entirely on the teacher." },
        { level: 2, label: "Stabilise", desc: "Learners ask for support when needed, although assistance remains mainly teacher-led and mistakes may still interrupt participation." },
        { level: 3, label: "Explore", desc: "Learners comfortably ask questions, try again after mistakes and assist one another appropriately during digital activities." },
        { level: 4, label: "Lead", desc: "Mistakes are treated naturally as part of learning. Learners confidently troubleshoot, seek or provide support and demonstrate shared responsibility for successful participation." }
      ],
      evidence: [
        "Peer-to-peer encouragement when a classmate struggles with typing, logging in, or navigating.",
        "Absence of ridicule or anxiety around tech glitches or incorrect answers in gamified apps.",
        "Willingness of learners to raise hands or consult peer buddies without fear of penalisation."
      ],
      probes: [
        "What is the peer dynamic when a learner makes an error on the interactive screen?",
        "Are 'Digital Buddies' or informal learner monitors active in helping classmates troubleshoot?"
      ]
    },
    {
      id: "classroom-collaboration",
      scope: "classroom",
      category: "practices",
      title: "Classroom: Collaboration & Shared Digital Practice",
      icon: <Users className="w-4 h-4 text-[#D73828]" />,
      objective: "How do learners interact, collaborate, share resources, and collectively solve problems or create digital work during the lesson?",
      levels: [
        { level: 1, label: "Withdraw", desc: "Technology use is largely individual or teacher-controlled, with little evidence of learner interaction, peer support or shared digital work." },
        { level: 2, label: "Stabilise", desc: "Learners participate in structured pair or group digital activities, but collaboration is mainly directed by the teacher." },
        { level: 3, label: "Explore", desc: "Learners regularly collaborate, share resources, give feedback and support one another through purposeful digital activities." },
        { level: 4, label: "Lead", desc: "Collaboration is embedded naturally in the lesson. Learners organise shared work, contribute different strengths, provide meaningful peer support and collectively create or solve problems using technology." }
      ],
      evidence: [
        "Paired or group work on shared Google Docs, interactive whiteboards, or co-created presentations.",
        "Division of roles within learner groups (researcher, editor, presenter) using digital platforms.",
        "Peer review and feedback comments exchanged digitally between learners."
      ],
      probes: [
        "How do learners co-construct answers or projects using the classroom devices?",
        "Is digital technology facilitating teamwork or isolating learners in isolated drill exercises?"
      ]
    },
    {
      id: "classroom-cyber-wellness",
      scope: "classroom",
      category: "pedagogy",
      title: "Classroom: Cyber Wellness Integration into Subject Learning",
      icon: <ShieldCheck className="w-4 h-4 text-[#00A1A3]" />,
      objective: "How meaningfully are digital citizenship, cyber wellness, ethics, and online safety woven into subject lesson activities and learner tasks?",
      levels: [
        { level: 1, label: "Withdraw", desc: "No visible connection is made between the subject lesson and cyber wellness, responsible digital behaviour or the learner's online experience, even where the lesson creates a natural opportunity for it." },
        { level: 2, label: "Stabilise", desc: "Cyber wellness is mentioned when relevant, usually through reminders about online safety, responsible behaviour, privacy or appropriate technology use, but remains separate from the main learning activity." },
        { level: 3, label: "Explore", desc: "Cyber wellness is purposefully connected to the subject content through discussion, examples, activities or reflection, helping learners consider issues such as digital identity, online behaviour, misinformation, AI use, digital empathy or wellbeing within the learning context." },
        { level: 4, label: "Lead", desc: "Cyber wellness is naturally embedded into subject learning where relevant. Learners critically examine digital choices, behaviour, ethics and wellbeing, apply these ideas to authentic subject-based tasks, and demonstrate responsible judgement within their own digital participation and creation." }
      ],
      evidence: [
        "Explicit discussions on source credibility, copyright, citation of online images, and fact-checking.",
        "Conversations around digital footprint, AI ethics, cyber etiquette, and respectful communication in chats.",
        "Subject-aligned ethical problem-solving (e.g. evaluating fake science news or bias in online historical accounts)."
      ],
      probes: [
        "How did this lesson guide learners to verify the authenticity and copyright of online information?",
        "Were digital etiquette and respectful online interaction modelled or discussed during peer activities?"
      ]
    },
    {
      id: "classroom-platform-access",
      scope: "classroom",
      category: "platforms",
      title: "Classroom: Tool Access Mechanics & ePortal Integration",
      icon: <Network className="w-4 h-4 text-[#C8126E]" />,
      objective: "How easily can teachers and learners access and use the available digital tools during the lesson?",
      levels: [
        { level: 1, label: "Withdraw", desc: "Learners and teachers experience significant friction or complete barrier when trying to access digital devices, log in, or load ePortal resources during the lesson." },
        { level: 2, label: "Stabilise", desc: "Devices and basic tools are accessible, but setups require extensive manual intervention or only a few learners have working connectivity/accounts." },
        { level: 3, label: "Explore", desc: "Digital tools and ePortal resources are accessed smoothly by all learners, with minimal downtime and clear login routines." },
        { level: 4, label: "Lead", desc: "Seamless, equitable digital access is completely embedded in the classroom routine with zero friction, multi-device support, and self-sufficient learner access." }
      ],
      evidence: [
        "Time required from entering the room/starting the lesson to active device engagement (under 3 minutes is optimal).",
        "Functional state of learner logins, SSO credentials, and ePortal / CAPS digital material availability.",
        "Smooth multi-device management without persistent device shortage disruptions."
      ],
      probes: [
        "How many instructional minutes are lost to initial login and device setup routines?",
        "Are learners able to access and download WCED ePortal curriculum resources directly?"
      ]
    },

    // --- SCHOOL-WIDE CULTURE RUBRICS ---
    {
      id: "safety",
      scope: "school",
      category: "people",
      title: "1. School: Psychological Safety & Wellbeing",
      icon: <Shield className="w-4 h-4 text-[#890C58]" />,
      objective: "Measure the stress response and risk-tolerance of teachers when digital tools fail during live instruction.",
      levels: [
        { level: 1, label: "Withdraw", desc: "Fear, immediate stress, and operational defeat. Technical glitches trigger visible distress, causing the teacher to shut down equipment, apologise, and retreat back into static paper/chalk work." },
        { level: 2, label: "Stabilise", desc: "Technology is only used to tick management's boxes; it is avoided or feared when unexpected tech issues happen." },
        { level: 3, label: "Explore", desc: "Building a positive attitude toward tech errors and mistakes. Tech issues are normalised. Teachers feel safe to troubleshoot live or laugh off small errors in front of learners without feeling that they are being judged." },
        { level: 4, label: "Lead", desc: "Shared resilience. Teachers actively support each other through tech issues. Failures are treated strictly as data to troubleshoot together, not as a reflection of teaching ability." }
      ],
      evidence: [
        "Observations of teacher response during unexpected Wi-Fi drops, login blocks, or projector freezes.",
        "General classroom climate—whether learners tease or support the teacher during micro-failures.",
        "School Management Team (SMT) messaging: Is technology supported through high-pressure inspection or collaborative security?"
      ],
      probes: [
        "What happens in your classroom when the system logs you off unexpectedly mid-lesson?",
        "Do you feel that SMT evaluates your worth as a teacher on how neatly a presentation runs?"
      ]
    },
    {
      id: "confidence",
      scope: "school",
      category: "people",
      title: "2. School: Digital Confidence & Agency",
      icon: <Zap className="w-4 h-4 text-[#890C58]" />,
      objective: "Evaluate the teacher's capability to drive digital learning setups independently without requiring constant external handholding.",
      levels: [
        { level: 1, label: "Withdraw", desc: "Severe learned helplessness. The teacher feels totally unable to operate software and digital tool and relies completely on the physical presence of an ICT Champ or Lab Coordinator for the simplest tasks." },
        { level: 2, label: "Stabilise", desc: "Strict step-following. Teachers follow a fixed routine and panic or get completely stuck when unexpected pop-ups or password prompts appear." },
        { level: 3, label: "Explore", desc: "Basic self-troubleshooting. Teachers search for answers, check guides, try different browsers, or restart devices before requesting help." },
        { level: 4, label: "Lead", desc: "Proactive system ownership. Teachers design custom digital solutions, find apps for everyday tasks, and share local cheat sheets with staff." }
      ],
      evidence: [
        "Are teachers capable of self-loading software, logging in, and adjusting basic sound/display outputs alone?",
        "Do they show curiosity to try unmandated features on WCED platforms, or do they only execute directives?"
      ],
      probes: [
        "When an app asks you to 'Allow Permissions' or select a sound input, what is your immediate course of action?",
        "How do you share custom shortcuts with your colleagues?"
      ]
    },
    {
      id: "collab",
      scope: "school",
      category: "practices",
      title: "3. School: Collaboration & Staff Rituals",
      icon: <Users className="w-4 h-4 text-[#D73828]" />,
      objective: "Assess if ICT sharing and resources happen in organic team rituals or remain bottlenecked behind single players.",
      levels: [
        { level: 1, label: "Withdraw", desc: "Total paper reliance. All school documents and notices are physical paper only. Digital spaces are completely unused." },
        { level: 2, label: "Stabilise", desc: "Total reliance on one or two persons. All tech falls on a single, overworked ICT Lead. If they are away, all digital systems stop working." },
        { level: 3, label: "Explore", desc: "Unofficial sharing networks. Teachers use chat groups to swap lesson materials and coordinate schedules, though no formal school platform is set up." },
        { level: 4, label: "Lead", desc: "Structured online systems. Shared platforms like Google Workspace or Teams are actively maintained, and teachers co-create lesson plans using online templates." }
      ],
      evidence: [
        "Are school-wide lesson planning structures and tracking templates accessible concurrently to departments?",
        "What happens when the designated ICT Champion is on sick leave? Do digital practices continue or stop?"
      ],
      probes: [
        "Where does a new teacher at this school go to find previous lesson worksheets and assessment models?",
        "If you discover a great digital resource, how does it reach the rest of your grade?"
      ]
    },
    {
      id: "pd",
      scope: "school",
      category: "practices",
      title: "4. School: Professional Development & Learning",
      icon: <Award className="w-4 h-4 text-[#D73828]" />,
      objective: "Analyse if digital upskilling is driven by compliance quotas or genuine pedagogical absorption.",
      levels: [
        { level: 1, label: "Withdraw", desc: "Skipping development. Teachers actively avoid professional development and workshops, feeling burned out and assuming it won't be useful in the classroom." },
        { level: 2, label: "Stabilise", desc: "Compliance checkbox attendance. Teachers sit silently through mandatory training because SMT demands it. No evidence of these learnings ever shows up inside their classroom lessons." },
        { level: 3, label: "Explore", desc: "Active self-learning. Teachers register for optional webinars, courses and complete online micro-learning sessions, and actively try some of the teachings and digital tools in their lessons." },
        { level: 4, label: "Lead", desc: "Structured teacher support. Designated teachers mentor their peers through regular check-ins, meetings, classroom visits, and staff developmental sessions." }
      ],
      evidence: [
        "Logins and progress levels on WCED e-learning portals or standard training courses.",
        "Observation of actual trained techniques translated from theory into active classroom layouts."
      ],
      probes: [
        "When was the last time you attended an ICT workshop, and what is one small technique you successfully tried with your learners afterwards?",
        "Do teachers here organise informal mutual help desks for peer upskilling?"
      ]
    },
    {
      id: "cyber",
      scope: "school",
      category: "practices",
      title: "5. School: Cyber Wellness & Digital Citizenship",
      icon: <Globe className="w-4 h-4 text-[#D73828]" />,
      objective: "Determine if digital safety is managed via fearful restriction and policing or smart, preventative citizenship.",
      levels: [
        { level: 1, label: "Withdraw", desc: "Fear-based rejection. Fears about viruses, tech failure, hacking, or online safety risks keep equipment and technology locked away. Cyber wellness is ignored or treated as too complex to manage." },
        { level: 2, label: "Stabilise", desc: "Heavy-handed control. Tech is kept under lock and key, with sites blocked and tools restricted. Learners are treated as risks to manage rather than learners to trust." },
        { level: 3, label: "Explore", desc: "Teaching digital safety directly. Safe passwords, login habits, and proper online behaviour are built into regular lessons, helping learners learn and follow basic safety rules." },
        { level: 4, label: "Lead", desc: "Learner-led peer support. Learner and Teacher ambassadors assist with basic classroom tech setup, teach younger peers about their digital footprints, and lead by example in online ethics." }
      ],
      evidence: [
        "Rules posted in labs: Are they empowering guidelines or written in aggressive, threatening tones?",
        "Do lessons incorporate conversations around digital identity, copyright, and correct citation models?"
      ],
      probes: [
        "How do you address cyberbullying or digital plagiarism disputes among your learners?",
        "Are learners allowed to suggest online resources, or are they restricted strictly to a rigid list?"
      ]
    },
    {
      id: "lesson",
      scope: "school",
      category: "pedagogy",
      title: "6. School: Lesson Design & Digital Integration",
      icon: <BookOpen className="w-4 h-4 text-[#00A1A3]" />,
      objective: "Evaluate how technology changes the actual instructional delivery and learning pathways across the curriculum.",
      levels: [
        { level: 1, label: "Withdraw", desc: "Unused classroom tech. Smartboards and projectors sit powered off, while lessons stick strictly to traditional chalkboard lectures." },
        { level: 2, label: "Stabilise", desc: "One-way slide projection. Tech is used purely to display textbook PDFs or static slides, keeping learners passive as they read from the screen." },
        { level: 3, label: "Explore", desc: "Engaging digital practice. Tech provides interactive videos, simulations, or gamified quizzes where learners get instant feedback on their progress." },
        { level: 4, label: "Lead", desc: "Learner-led research, collaboration & creation. Technology acts as a launching pad for inquiry and active participation, with learners combining different digital tools to solve problems together." }
      ],
      evidence: [
        "Are lesson plans systematically noting the use of interactive apps, videos, or web databases?",
        "Are learners actively thinking through resources, or are they just looking at screens?"
      ],
      probes: [
        "How does using the smartboard or projector change how your learners take notes or answer questions?",
        "Can you plan a lesson where technology is the main tool for problem solving?"
      ]
    },
    {
      id: "agency",
      scope: "school",
      category: "pedagogy",
      title: "7. School: Learner Agency & Artefacts",
      icon: <CheckCircle className="w-4 h-4 text-[#00A1A3]" />,
      objective: "Evaluate if technology is touched exclusively by the teacher or if learners are building actual digital output across grades.",
      levels: [
        { level: 1, label: "Withdraw", desc: "Passive viewing only. Technology stays entirely in the teacher's hands, with learners do not engage with devices, or interactive tools." },
        { level: 2, label: "Stabilise", desc: "Heavy-handed guidance. Learners interact with tech in a lock-step sequence, with no room to explore, choose their own path, or create original work." },
        { level: 3, label: "Explore", desc: "Structured online practice. Learners log in to complete set tasks on learning platforms, answering questions or doing drills where the software guides their progress." },
        { level: 4, label: "Lead", desc: "Independent or collaborative creation. Learners use tech tools on their own to build, draw, code, write, or create original projects." }
      ],
      evidence: [
        "Can the school present digital portfolios of learner work (slide shows, spreadsheet experiments, typed essays)?",
        "During lab visits, who is driving the mouse or keyboard? (Is it mainly the teacher or the learners?)"
      ],
      probes: [
        "In a typical ICT lab session, what do your learners actually produce by the time the bell rings?",
        "Have your learners ever generated a digital slide show to explain a complex topic to the class?"
      ]
    },
    {
      id: "inclusivity",
      scope: "school",
      category: "pedagogy",
      title: "8. School: Cognitive Inclusivity & Differentiation",
      icon: <Users className="w-4 h-4 text-[#00A1A3]" />,
      objective: "Assess if technology accommodates the different paces and development needs of individual learners across the school.",
      levels: [
        { level: 1, label: "Withdraw", desc: "One-speed teaching. Lessons push forward at a single pace, with no adjustment or extra time for learners who struggle to keep up." },
        { level: 2, label: "Stabilise", desc: "One-click-fits-all pace. The whole class moves screen-by-screen together, causing panic for those who need extra time and boredom for those who don't." },
        { level: 3, label: "Explore", desc: "Differentiated learning paths. Digital lessons offer distinct options so quick learners can jump to challenge activities while struggling learners access guided practice." },
        { level: 4, label: "Lead", desc: "Dynamic personalised paths. AI or adaptive software automatically adjusts lesson difficulty in real time based on learner performance." }
      ],
      evidence: [
        "Do lessons incorporate alternative content formats (e.g. text-to-speech, visual diagrams, video tutorials) for different learners?",
        "Are learners permitted to work at their own pace inside curriculum software?"
      ],
      probes: [
        "How do you assist a learner who gets stuck on an earlier level while others have finished?",
        "Are you utilising digital platforms to check understanding instantly and group learners accordingly?"
      ]
    },
    {
      id: "scheduling",
      scope: "school",
      category: "platforms",
      title: "9. School: Resource Scheduling & Access Mechanics",
      icon: <HardDrive className="w-4 h-4 text-[#C8126E]" />,
      objective: "Inspect the scheduling hygiene that determines if ICT spaces and laptop trolleys are active daily or kept locked.",
      levels: [
        { level: 1, label: "Withdraw", desc: "Zero tech access. Computer rooms are kept locked, with no timetable, leaving equipment gathering dust while classes never use the space." },
        { level: 2, label: "Stabilise", desc: "Guarded scheduling. Lab access is strictly gatekept and rarely available for regular lessons, saved mostly for testing, admin, and/or specific projects only." },
        { level: 3, label: "Explore", desc: "Shared timetable access. Equipment and labs are booked on a clear schedule, giving multiple grades and classes steady, weekly access." },
        { level: 4, label: "Lead", desc: "Always-accessible learning spaces. Labs run on seamless, flexible scheduling, allowing learners and classes full access anytime for lessons, projects, or self-study." }
      ],
      evidence: [
        "The physical booking diary or calendar: Are there multiple entries per day across different subject areas?",
        "Are the physical doors open and active when you perform the walkthrough, or are they padlocked?"
      ],
      probes: [
        "How many times did your specific class use the ICT lab or tablet cart during the past month?",
        "Is booking managed on a fair, self-service platform, or are there priority barriers?"
      ]
    },
    {
      id: "integration",
      scope: "school",
      category: "platforms",
      title: "10. School: Digital Tool & Portal Integration",
      icon: <Info className="w-4 h-4 text-[#C8126E]" />,
      objective: "Analyse the school's structural adoption of official platforms (e.g., WCED ePortal, CAPS digital content, Mathematics apps).",
      levels: [
        { level: 1, label: "Withdraw", desc: "Unused platforms. WCED ePortal, and digital tools are ignored, with teaching and learning relying strictly on physical or digital textbooks and paper photocopies." },
        { level: 2, label: "Stabilise", desc: "Occasional browsing. A few teachers occasionally search the ePortal for past papers or use basic digital tools for personal lesson prep, but learners rarely interact with them." },
        { level: 3, label: "Explore", desc: "Active subject support. Teachers download ePortal revision guides and CAPS materials, while using digital tools to share interactive lessons, track practice, and collect weekly classwork or homework." },
        { level: 4, label: "Lead", desc: "Effortless learning flow. ePortal resources and interactive tools integrate seamlessly into daily lessons. Learning and teaching flow naturally through active online discussions, digital work submissions, and continuous progress tracking." }
      ],
      evidence: [
        "The active dashboard usage curves of the school's allocated software licenses.",
        "Check if teachers are comfortable logging on and utilising diagnostic analytics to identify learner gaps."
      ],
      probes: [
        "What is the average weekly login rate of your class on the maths platform?",
        "How do you use the report charts from the platform to adjust your actual classroom teaching?"
      ]
    }
  ];

  const filteredSections = sections.filter((sec) => {
    // Tab filter
    if (activeTab === "school" && sec.scope !== "school") return false;
    if (activeTab === "classroom" && sec.scope !== "classroom") return false;
    if (activeTab === "people" && sec.category !== "people") return false;
    if (activeTab === "practices" && sec.category !== "practices") return false;
    if (activeTab === "pedagogy" && sec.category !== "pedagogy") return false;
    if (activeTab === "platforms" && sec.category !== "platforms") return false;

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = sec.title.toLowerCase().includes(q);
      const matchObjective = sec.objective.toLowerCase().includes(q);
      const matchEvidence = sec.evidence.some(e => e.toLowerCase().includes(q));
      const matchLevels = sec.levels.some(l => l.desc.toLowerCase().includes(q) || l.label.toLowerCase().includes(q));
      return matchTitle || matchObjective || matchEvidence || matchLevels;
    }

    return true;
  });

  return (
    <>
      {/* Background overlay */}
      <div 
        onClick={onClose}
        className="no-print fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 transition-opacity duration-300"
      />

      {/* Drawer Container */}
      <div className="no-print fixed inset-y-0 right-0 w-full sm:w-[540px] md:w-[680px] bg-slate-50 shadow-2xl border-l border-slate-200 z-50 flex flex-col transition-all duration-300 transform animate-slide-in">
        
        {/* Upper Header Block with WCED Branding */}
        <div className="p-4 sm:p-5 border-b border-[#FFC600]/80 bg-[#001489] text-white shrink-0 shadow-md">
          <div className="flex justify-between items-start gap-2">
            <div className="space-y-1 min-w-0">
              <span className="text-[9px] uppercase tracking-wider text-[#FFC600] font-black block truncate">
                WCED eLearning Directorate / ONDERSTEUNINGSGIDS
              </span>
              <h2 className="text-sm sm:text-base font-black uppercase tracking-tight font-display leading-tight text-white">
                Digital Culture & Classroom Evidence Rubrics
              </h2>
              <p className="text-[11px] font-bold text-blue-100 flex items-center gap-1.5 font-sans">
                <BookOpen className="w-3.5 h-3.5 text-[#FFC600] inline shrink-0" />
                4P Affective Transformation Model Diagnostic Guide
              </p>
            </div>
            
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleDownloadPdf}
                title="Download / Print PDF Guide"
                className="bg-[#FFC600] hover:bg-[#e6b200] text-[#001489] px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-wider transition flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Download</span> PDF
              </button>
              
              <button 
                onClick={onClose} 
                aria-label="Close Rubric Guide"
                className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Diagnostic Paradigm Intro Banner */}
        <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border-b border-slate-200/60 px-5 py-3 text-[11px] text-slate-650 font-medium shrink-0">
          <p className="leading-relaxed">
            <Info className="w-3.5 h-3.5 text-[#001489] inline mr-1.5 shrink-0 align-text-bottom" />
            Before school technology can drive academic results, teachers and learners must develop
            <strong> psychological safety, digital confidence, and relational support</strong>. Use this guide to assess both <strong>School Culture Foundations (Step 2)</strong> and <strong>Live Classroom Observations (Step 3)</strong> across the 4P Pillars.
          </p>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-2.5 bg-white border-b border-slate-200 shrink-0">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search rubric indicators, keywords, descriptors or probes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-8 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#001489] text-slate-800 placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Tab Controls */}
        <div className="bg-slate-100/80 border-b border-slate-200 px-4 py-2 shrink-0 flex gap-1.5 overflow-x-auto scrollbar-thin">
          {[
            { id: "all", label: "Show All (16)" },
            { id: "classroom", label: "Classroom Observations (6)", icon: <GraduationCap className="w-3 h-3 inline mr-1" /> },
            { id: "school", label: "School Culture (10)", icon: <School className="w-3 h-3 inline mr-1" /> },
            { id: "people", label: "PEOPLE" },
            { id: "practices", label: "PRACTICES" },
            { id: "pedagogy", label: "PEDAGOGY" },
            { id: "platforms", label: "PLATFORMS" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-md transition duration-150 shrink-0 cursor-pointer flex items-center ${
                activeTab === tab.id
                  ? "bg-[#001489] text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-200 border border-slate-200/60"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Content Pane */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          
          {/* Level Quick Legend */}
          <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <h5 className="text-[9px] uppercase font-black text-slate-400 mb-1.5 flex items-center gap-1">
                <span>Phase 1 & 2: Reactive / Protective</span>
              </h5>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-[#890C58] shrink-0 shadow-xs" />
                  <span className="text-[10px] font-bold text-slate-700">L1: Withdraw — Fear, Anxiety, Disengagement</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-[#D73828] shrink-0 shadow-xs" />
                  <span className="text-[10px] font-bold text-slate-700">L2: Stabilise — Routine, Compliance, Basic Control</span>
                </div>
              </div>
            </div>
            <div>
              <h5 className="text-[9px] uppercase font-black text-slate-400 mb-1.5 flex items-center gap-1">
                <span>Phase 3 & 4: Generative / Transformative</span>
              </h5>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-[#00A1A3] shrink-0 shadow-xs" />
                  <span className="text-[10px] font-bold text-slate-700">L3: Explore — Independence, Experimentation, Growth</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-[#C8126E] shrink-0 shadow-xs" />
                  <span className="text-[10px] font-bold text-slate-700">L4: Lead — Systemic Agency, Mentorship, Innovation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Result Count */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium px-1">
            <span>Showing <strong>{filteredSections.length}</strong> rubric indicator{filteredSections.length === 1 ? "" : "s"}</span>
            {searchQuery && (
              <span className="text-blue-600 text-[10px]">Filtered by: &ldquo;{searchQuery}&rdquo;</span>
            )}
          </div>

          {/* Expanded List of Rubrics */}
          <div className="space-y-3">
            {filteredSections.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500">
                <Search className="w-8 h-8 text-slate-350 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-700">No matching rubrics found</p>
                <p className="text-[11px] text-slate-400 mt-1">Try clearing your search query or switching tabs.</p>
              </div>
            ) : (
              filteredSections.map((sec) => {
                const isExpanded = expandedSection === sec.id;
                
                let headerColorClass = "border-slate-300 bg-white";
                let scopeBadgeColor = sec.scope === "classroom" ? "bg-purple-100 text-purple-800 border-purple-200" : "bg-blue-100 text-blue-800 border-blue-200";

                if (sec.category === "people") {
                  headerColorClass = "border-l-4 border-l-[#890C58] bg-white";
                } else if (sec.category === "practices") {
                  headerColorClass = "border-l-4 border-l-[#D73828] bg-white";
                } else if (sec.category === "pedagogy") {
                  headerColorClass = "border-l-4 border-l-[#00A1A3] bg-white";
                } else if (sec.category === "platforms") {
                  headerColorClass = "border-l-4 border-l-[#C8126E] bg-white";
                }

                return (
                  <div 
                    key={sec.id}
                    className={`border border-slate-200 rounded-xl overflow-hidden shadow-xs transition duration-150 ${headerColorClass}`}
                  >
                    {/* Collapsible Trigger block */}
                    <button
                      onClick={() => toggleSection(sec.id)}
                      className="w-full text-left p-4 flex justify-between items-start gap-3 cursor-pointer hover:bg-slate-50/70 transition duration-150"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[8.5px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded border ${scopeBadgeColor}`}>
                            {sec.scope === "classroom" ? "Classroom Evidence" : "School Culture"}
                          </span>
                          <div className="flex items-center gap-1 text-[9px] uppercase font-black tracking-wider text-slate-500">
                            {sec.icon}
                            <span>{sec.category} Indicator</span>
                          </div>
                        </div>
                        <h4 className="text-xs sm:text-sm font-black text-slate-800 leading-tight">
                          {sec.title}
                        </h4>
                        <p className="text-[10.5px] text-slate-600 leading-snug">
                          {sec.objective}
                        </p>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                      )}
                    </button>

                    {/* Collapsible Content */}
                    {isExpanded && (
                      <div className="border-t border-slate-100 bg-[#FCFDFE] p-4 space-y-4">
                        
                        {/* Detailed level cards */}
                        <div className="space-y-2.5">
                          <span className="text-[9px] uppercase font-black text-slate-400 tracking-wider block">
                            4-Level Behavioural Progression & Descriptors
                          </span>
                          
                          <div className="grid grid-cols-1 gap-2">
                            {sec.levels.map((lvl) => {
                              let levelBadgeClass = "";
                              let borderLightHex = "";
                              if (lvl.level === 1) {
                                levelBadgeClass = "bg-[#890C58] text-white";
                                borderLightHex = "border-l-4 border-l-[#890C58]";
                              } else if (lvl.level === 2) {
                                levelBadgeClass = "bg-[#D73828] text-white";
                                borderLightHex = "border-l-4 border-l-[#D73828]";
                              } else if (lvl.level === 3) {
                                levelBadgeClass = "bg-[#00A1A3] text-white";
                                borderLightHex = "border-l-4 border-l-[#00A1A3]";
                              } else {
                                levelBadgeClass = "bg-[#C8126E] text-white";
                                borderLightHex = "border-l-4 border-l-[#C8126E]";
                              }

                              return (
                                <div key={lvl.level} className={`bg-white border border-slate-200 rounded-lg p-2.5 flex gap-3 text-[11px] shadow-xs ${borderLightHex}`}>
                                  <div className="flex flex-col items-center">
                                    <span className={`w-20 text-center text-[9px] font-black uppercase tracking-wider rounded py-0.5 shrink-0 ${levelBadgeClass}`}>
                                      L{lvl.level} {lvl.label}
                                    </span>
                                  </div>
                                  <div className="text-slate-700 leading-relaxed font-sans font-medium flex-1">
                                    {lvl.desc}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Expected field evidence */}
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-1.5">
                          <span className="text-[9px] uppercase font-black text-[#001489] tracking-wider block flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-[#001489]" />
                            Inspection Checklist & Concrete Field Evidence
                          </span>
                          <ul className="list-disc list-inside space-y-1 text-[10.5px] text-slate-650 font-sans font-medium">
                            {sec.evidence.map((ev, i) => (
                              <li key={i} className="leading-normal">
                                {ev}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Advisory Probes */}
                        <div className="bg-blue-50/40 border border-blue-200/50 rounded-lg p-3 space-y-1.5">
                          <span className="text-[9px] uppercase font-black text-indigo-700 tracking-wider block flex items-center gap-1.5">
                            <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                            Advisor Diagnostic Probes (Ask in Field Observation)
                          </span>
                          <ul className="list-decimal list-inside space-y-1 text-[10.5px] text-slate-750 font-sans italic font-medium">
                            {sec.probes.map((pr, i) => (
                              <li key={i} className="leading-normal">
                                &ldquo;{pr}&rdquo;
                              </li>
                            ))}
                          </ul>
                        </div>

                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

        </div>

        {/* Footer info brand block */}
        <div className="p-3.5 bg-white border-t border-slate-200 text-center shrink-0">
          <div className="text-[10px] text-[#001489] font-black tracking-wider uppercase">
            Western Cape Education Department — eLearning Directorate
          </div>
          <div className="text-[8.5px] text-slate-500 font-medium mt-0.5">
            4P Affective Transformation Model Rubric Reference Guide &bull; 16 Complete Indicators
          </div>
        </div>

      </div>

      {/* Dedicated High-Fidelity Printable Document (Rendered only on Print / PDF export) */}
      <div className="print-only hidden rubric-print-doc max-w-5xl mx-auto font-sans">
        
        {/* Compact Header Ribbon (Page 1 top banner) */}
        <div className="border-b-2 border-[#FFC600] bg-[#001489] text-white p-2.5 rounded-lg mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="bg-white text-[#001489] font-black text-xs px-2 py-0.5 rounded shadow-xs">4P</span>
            <div>
              <h1 className="text-xs font-black uppercase tracking-tight text-white font-display leading-tight">
                WCED eLearning Directorate &bull; 4P Affective Transformation Rubric Guide
              </h1>
              <p className="text-[8px] text-blue-200 font-medium">
                Official Diagnostic Descriptors, Classroom Evidence & Advisor Probes (2026 Reference)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[7.5px] uppercase font-bold text-white/90">
            <span className="bg-[#890C58] px-1.5 py-0.5 rounded text-white font-black">L1 Withdraw</span>
            <span className="bg-[#D73828] px-1.5 py-0.5 rounded text-white font-black">L2 Stabilise</span>
            <span className="bg-[#00A1A3] px-1.5 py-0.5 rounded text-white font-black">L3 Explore</span>
            <span className="bg-[#C8126E] px-1.5 py-0.5 rounded text-white font-black">L4 Lead</span>
          </div>
        </div>

        {/* Rubric Indicators List (2 per page with tight, crisp density) */}
        <div className="space-y-2">
          {sections.map((sec, idx) => {
            let badgeBg = "bg-slate-100 text-slate-800 border-slate-250";
            let pillarBorder = "border-l-4 border-l-[#001489]";
            if (sec.category === "people") {
              badgeBg = "bg-purple-100 text-[#890C58] border-purple-250";
              pillarBorder = "border-l-4 border-l-[#890C58]";
            } else if (sec.category === "practices") {
              badgeBg = "bg-red-100 text-[#D73828] border-red-250";
              pillarBorder = "border-l-4 border-l-[#D73828]";
            } else if (sec.category === "pedagogy") {
              badgeBg = "bg-teal-100 text-[#00A1A3] border-teal-250";
              pillarBorder = "border-l-4 border-l-[#00A1A3]";
            } else if (sec.category === "platforms") {
              badgeBg = "bg-pink-100 text-[#C8126E] border-pink-250";
              pillarBorder = "border-l-4 border-l-[#C8126E]";
            }

            return (
              <div key={sec.id} className={`rubric-card-print rounded-lg shadow-none ${pillarBorder}`}>
                {/* Card Header */}
                <div className="flex justify-between items-baseline gap-2 mb-1 pb-1 border-b border-slate-200">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[8px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded bg-[#001489] text-white">
                        #{idx + 1}
                      </span>
                      <span className="text-[8px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded bg-slate-100 text-slate-800 border border-slate-200">
                        {sec.scope === "classroom" ? "Classroom Evidence" : "School Culture"}
                      </span>
                      <span className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded border ${badgeBg}`}>
                        {sec.category} Pillar
                      </span>
                      <h3 className="text-[10.5px] font-black text-slate-900 font-display truncate">
                        {sec.title}
                      </h3>
                    </div>
                    <p className="text-[8.5px] text-slate-600 font-medium leading-snug">
                      <strong className="text-slate-800 font-bold">Diagnostic Focus:</strong> {sec.objective}
                    </p>
                  </div>
                </div>

                {/* 4-Level Descriptors in a 2x2 Grid */}
                <div className="grid grid-cols-2 gap-1.5 mb-1.5 text-[8px]">
                  {sec.levels.map((lvl) => {
                    let levelTag = "bg-slate-200 text-slate-800";
                    let borderClass = "border-l-2 border-slate-300";
                    if (lvl.level === 1) {
                      levelTag = "bg-[#890C58] text-white";
                      borderClass = "border-l-2 border-[#890C58]";
                    } else if (lvl.level === 2) {
                      levelTag = "bg-[#D73828] text-white";
                      borderClass = "border-l-2 border-[#D73828]";
                    } else if (lvl.level === 3) {
                      levelTag = "bg-[#00A1A3] text-white";
                      borderClass = "border-l-2 border-[#00A1A3]";
                    } else if (lvl.level === 4) {
                      levelTag = "bg-[#C8126E] text-white";
                      borderClass = "border-l-2 border-[#C8126E]";
                    }

                    return (
                      <div key={lvl.level} className={`flex items-start gap-1 bg-slate-50 border border-slate-200/80 p-1 rounded ${borderClass}`}>
                        <span className={`text-[7px] font-black uppercase tracking-wider px-1 py-0.2 rounded shrink-0 ${levelTag}`}>
                          L{lvl.level} {lvl.label}
                        </span>
                        <span className="text-[8px] text-slate-800 leading-tight font-normal">
                          {lvl.desc}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Evidence & Probes in a 2-Column Grid */}
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200 text-[8px]">
                  <div className="bg-slate-50/80 p-1 rounded border border-slate-150">
                    <strong className="text-[#001489] uppercase tracking-wider block mb-0.5 text-[7.5px]">
                      Field Evidence & Inspection Checklist:
                    </strong>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-700 leading-tight">
                      {sec.evidence.map((ev, i) => (
                        <li key={i}>{ev}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-50/40 p-1 rounded border border-blue-100">
                    <strong className="text-indigo-900 uppercase tracking-wider block mb-0.5 text-[7.5px]">
                      Advisor Diagnostic Probes:
                    </strong>
                    <ul className="list-decimal list-inside space-y-0.5 text-slate-800 italic leading-tight">
                      {sec.probes.map((pr, i) => (
                        <li key={i}>&ldquo;{pr}&rdquo;</li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="mt-3 pt-2 border-t border-slate-300 text-center text-[8.5px] text-slate-500">
          <p className="font-bold uppercase tracking-wider text-slate-700">
            Western Cape Education Department &bull; Directorate: eLearning &bull; 4P Affective Transformation Model
          </p>
        </div>

      </div>
    </>
  );
}

