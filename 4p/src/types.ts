export interface AdvisorDetails {
  advisorName: string;
  advisorEmail: string;
  schoolName: string;
  district: string;
  visitDate: string;
  activeProjects: {
    mco: boolean;
    backOnTrack: boolean;
    other: boolean;
    otherValue: string;
  };
  infrastructure: {
    slimLabs: boolean;
    catItEgdLabs: boolean;
    internetConnection: boolean;
    smartClassroom: boolean;
  };
}

export interface ClassroomEvidence {
  id: string;
  teacherName: string;
  subjectObserved: string;
  gradeObserved: string;
  lessonTopic: string;
  learnersCount: string;
  
  // Observed classroom tech evidence checkboxes
  smartboardObserved: boolean;
  tabletsObserved: boolean;
  labObserved: boolean;
  internetObserved: boolean;
  offlineObserved: boolean;
  artifactPhoto?: string;

  // Field evidence observations text fields
  toolsUsed: string;
  artifactVerified: string;
  teacherUpskilling: string;
  advisorSupport: string;
  teacherAction: string;
  learnerAction: string;

  // Ratings per classroom
  pedagogyDesign: number; // 1 | 2 | 3 | 4
  pedagogyAgency: number; // 1 | 2 | 3 | 4
  pedagogyInclusivity: number; // 1 | 2 | 3 | 4
  platformsScheduling: number; // 1 | 2 | 3 | 4
  platformsIntegration: number; // 1 | 2 | 3 | 4
  platformsEportal?: number; // 1 | 2 | 3 | 4

  // Classroom Evidence 5 Core Pillars & Rubrics
  teacherConfidence?: number; // 1 | 2 | 3 | 4 (People: Teacher Digital Confidence & Responsiveness)
  learnerConfidence?: number; // 1 | 2 | 3 | 4 (People: Learner Confidence, Voice & Agency)
  relationalSafety?: number; // 1 | 2 | 3 | 4 (People: Relational Safety & Help-Seeking)
  classroomCollab?: number; // 1 | 2 | 3 | 4 (Practice: Collaboration & Shared Digital Practice)
  cyberWellness?: number; // 1 | 2 | 3 | 4 (Pedagogy: Cyber Wellness Integration into Subject Learning)
}

export interface CultureAssessment {
  // Walkthrough - PEOPLE & PRACTICES
  peopleSafety: number; // 1 | 2 | 3 | 4
  peopleConfidence: number; // 1 | 2 | 3 | 4
  practicesCollab: number; // 1 | 2 | 3 | 4
  practicesPD: number; // 1 | 2 | 3 | 4
  practicesCyber: number; // 1 | 2 | 3 | 4

  // Classroom - PEDAGOGY & PLATFORMS & CLASSROOM DYNAMICS
  pedagogyDesign: number; // 1 | 2 | 3 | 4
  pedagogyAgency: number; // 1 | 2 | 3 | 4
  pedagogyInclusivity: number; // 1 | 2 | 3 | 4
  platformsScheduling: number; // 1 | 2 | 3 | 4
  platformsIntegration: number; // 1 | 2 | 3 | 4
  platformsEportal?: number; // 1 | 2 | 3 | 4

  // Classroom-specific People, Practice & Pedagogy Rubrics
  teacherConfidence?: number; // 1 | 2 | 3 | 4 (Teacher Digital Confidence & Responsiveness)
  learnerConfidence?: number; // 1 | 2 | 3 | 4 (Learner Confidence, Voice & Agency)
  relationalSafety?: number; // 1 | 2 | 3 | 4 (Relational Safety & Help-Seeking)
  classroomCollab?: number; // 1 | 2 | 3 | 4 (Collaboration & Shared Digital Practice)
  cyberWellness?: number; // 1 | 2 | 3 | 4 (Cyber Wellness Integration into Subject Learning)

  scenarioResponse: number; // Keep for retro-compatibility / interactive advisor adjustments

  // Field evidence observations text fields
  toolsUsed: string; // Active Digital Tools & Platforms Used in the Lesson
  artifactVerified: string; // Verified Learner Digital Artefact
  teacherUpskilling: string; // Active Teacher Upskilling Milestones (2026 Strategy)
  advisorSupport: string; // eAdvisor In-Classroom Suggestions & Interventions
  teacherAction: string; // Observed Teacher Action
  learnerAction: string; // Observed Learner Action
  
  // Walkthrough details
  primaryBarrier?: string;
  collaborationChannel?: string;
  
  // Classroom field evidence context
  subjectObserved?: string;
  gradeObserved?: string;
  lessonTopic?: string;
  teacherName?: string;
  learnersCount?: string;
  
  // Observed classroom tech evidence checkboxes
  smartboardObserved?: boolean;
  tabletsObserved?: boolean;
  labObserved?: boolean;
  internetObserved?: boolean;
  offlineObserved?: boolean;
  artifactPhoto?: string;

  // Multi-Classroom Support
  onlyWalkthrough?: boolean;
  onlyClassroom?: boolean;
  activeClassroomIndex?: number;
  classrooms?: ClassroomEvidence[];
}

export interface SessionData {
  advisor: AdvisorDetails;
  assessment: CultureAssessment;
  lastUpdated: string;
}

export type CultureLevel = 1 | 2 | 3 | 4;

export interface DimensionInfo {
  level: CultureLevel;
  title: string;
  description: string;
  colorClass: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
}
