import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SetupStep from "./components/SetupStep";
import WalkthroughStep from "./components/WalkthroughStep";
import ClassroomStep from "./components/ClassroomStep";
import ReportStep from "./components/ReportStep";
import RubricGuide from "./components/RubricGuide";
import { AdvisorDetails, CultureAssessment, SessionData } from "./types";

const INITIAL_ADVISOR_DATA: AdvisorDetails = {
  advisorName: "",
  advisorEmail: "",
  schoolName: "",
  district: "",
  visitDate: new Date().toISOString().substring(0, 10), // Default to today's date
  activeProjects: {
    mco: false,
    backOnTrack: false,
    other: false,
    otherValue: "",
  },
  infrastructure: {
    slimLabs: false,
    catItEgdLabs: false,
    internetConnection: false,
    smartClassroom: false,
  },
};

const INITIAL_ASSESSMENT_DATA: CultureAssessment = {
  peopleSafety: 1,
  peopleConfidence: 1,
  practicesCollab: 1,
  practicesPD: 1,
  practicesCyber: 1,
  pedagogyDesign: 1,
  pedagogyAgency: 1,
  pedagogyInclusivity: 1,
  platformsScheduling: 1,
  platformsIntegration: 1,
  platformsEportal: 1,
  teacherConfidence: 1,
  learnerConfidence: 1,
  relationalSafety: 1,
  classroomCollab: 1,
  cyberWellness: 1,
  scenarioResponse: 1,
  toolsUsed: "",
  artifactVerified: "",
  teacherUpskilling: "",
  advisorSupport: "",
  teacherAction: "",
  learnerAction: "",
  primaryBarrier: "",
  collaborationChannel: "",
  subjectObserved: "",
  gradeObserved: "",
  lessonTopic: "",
  teacherName: "",
  learnersCount: "",
  smartboardObserved: false,
  tabletsObserved: false,
  labObserved: false,
  internetObserved: false,
  offlineObserved: false,
  onlyWalkthrough: false,
  onlyClassroom: false,
  activeClassroomIndex: 0,
  classrooms: [
    {
      id: "1",
      teacherName: "",
      subjectObserved: "",
      gradeObserved: "",
      lessonTopic: "",
      learnersCount: "",
      smartboardObserved: false,
      tabletsObserved: false,
      labObserved: false,
      internetObserved: false,
      offlineObserved: false,
      artifactPhoto: "",
      toolsUsed: "",
      artifactVerified: "",
      teacherUpskilling: "",
      advisorSupport: "",
      teacherAction: "",
      learnerAction: "",
      pedagogyDesign: 1,
      pedagogyAgency: 1,
      pedagogyInclusivity: 1,
      platformsScheduling: 1,
      platformsIntegration: 1,
      platformsEportal: 1,
      teacherConfidence: 1,
      learnerConfidence: 1,
      relationalSafety: 1,
      classroomCollab: 1,
      cyberWellness: 1,
    }
  ]
};

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [advisor, setAdvisor] = useState<AdvisorDetails>(INITIAL_ADVISOR_DATA);
  const [assessment, setAssessment] = useState<CultureAssessment>(INITIAL_ASSESSMENT_DATA);
  const [isOpenRubric, setIsOpenRubric] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Auto-restore a previous session from localStorage on load
  useEffect(() => {
    try {
      const saved = localStorage.getItem("wced_diagnostic_session");
      if (saved) {
        const parsed = JSON.parse(saved) as SessionData;
        if (parsed.advisor && parsed.assessment) {
          setAdvisor(parsed.advisor);
          
          let updatedAssessment = { ...parsed.assessment };
          if (!updatedAssessment.classrooms || updatedAssessment.classrooms.length === 0) {
            updatedAssessment.classrooms = [
              {
                id: "1",
                teacherName: updatedAssessment.teacherName || "",
                subjectObserved: updatedAssessment.subjectObserved || "",
                gradeObserved: updatedAssessment.gradeObserved || "",
                lessonTopic: updatedAssessment.lessonTopic || "",
                learnersCount: updatedAssessment.learnersCount || "",
                smartboardObserved: !!updatedAssessment.smartboardObserved,
                tabletsObserved: !!updatedAssessment.tabletsObserved,
                labObserved: !!updatedAssessment.labObserved,
                internetObserved: !!updatedAssessment.internetObserved,
                offlineObserved: !!updatedAssessment.offlineObserved,
                artifactPhoto: updatedAssessment.artifactPhoto || "",
                toolsUsed: updatedAssessment.toolsUsed || "",
                artifactVerified: updatedAssessment.artifactVerified || "",
                teacherUpskilling: updatedAssessment.teacherUpskilling || "",
                advisorSupport: updatedAssessment.advisorSupport || "",
                teacherAction: updatedAssessment.teacherAction || "",
                learnerAction: updatedAssessment.learnerAction || "",
                pedagogyDesign: updatedAssessment.pedagogyDesign || 1,
                pedagogyAgency: updatedAssessment.pedagogyAgency || 1,
                pedagogyInclusivity: updatedAssessment.pedagogyInclusivity || 1,
                platformsScheduling: updatedAssessment.platformsScheduling || 1,
                platformsIntegration: updatedAssessment.platformsIntegration || 1,
              }
            ];
            updatedAssessment.activeClassroomIndex = 0;
            updatedAssessment.onlyWalkthrough = !!updatedAssessment.onlyWalkthrough;
            updatedAssessment.onlyClassroom = !!updatedAssessment.onlyClassroom;
          } else {
            updatedAssessment.onlyWalkthrough = !!updatedAssessment.onlyWalkthrough;
            updatedAssessment.onlyClassroom = !!updatedAssessment.onlyClassroom;
          }
          setAssessment(updatedAssessment);
          showToast("Previous evaluation session auto-restored", "success");
        }
      }
    } catch (e) {
      console.warn("Could not restore session from localStorage", e);
    }
  }, []);

  // Sync state to localStorage of current progress
  useEffect(() => {
    try {
      const sessionObj: SessionData = {
        advisor,
        assessment,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem("wced_diagnostic_session", JSON.stringify(sessionObj));
    } catch (e) {
      console.warn("Could not sync session to localStorage", e);
    }
  }, [advisor, assessment]);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
  };

  // Close toast after 3.5s
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Validation boundary checks
  const isValidStep1 = advisor.advisorName.trim() !== "" && advisor.schoolName.trim() !== "" && advisor.district !== "";

  // Reset entire application
  const handleReset = () => {
    if (window.confirm("Are you sure you want to clear this audit? This will erase all diagnostic fields.")) {
      setAdvisor(INITIAL_ADVISOR_DATA);
      setAssessment(INITIAL_ASSESSMENT_DATA);
      setCurrentStep(1);
      localStorage.removeItem("wced_diagnostic_session");
      showToast("Diagnostic session cleared successfully", "success");
    }
  };

  // Export current configuration into standard JSON download
  const handleExport = () => {
    try {
      const sessionObj: SessionData = {
        advisor,
        assessment,
        lastUpdated: new Date().toISOString(),
      };
      const blob = new Blob([JSON.stringify(sessionObj, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `WCED_4P_Diagnostic_${advisor.schoolName.replace(/\s+/g, "_") || "Report"}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast("Diagnostic data file downloaded", "success");
    } catch (e) {
      showToast("Failed to export diagnostic session", "error");
    }
  };

  // Import local session JSON
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const data = JSON.parse(content) as SessionData;
        if (data && data.advisor && data.assessment) {
          setAdvisor(data.advisor);
          setAssessment(data.assessment);
          setCurrentStep(1);
          showToast("Session file successfully imported!", "success");
        } else {
          showToast("Invalid config formatting", "error");
        }
      } catch (err) {
        showToast("Failed to parse JSON session file", "error");
      }
    };
    reader.readAsText(file);
    // Reset file input target
    e.target.value = "";
  };

  const navigateToStepBoundary = (stepNum: number) => {
    if (stepNum > 1 && !isValidStep1) {
      showToast("Please complete Advisor name, School, and District to unlock other tabs", "error");
      return;
    }
    setCurrentStep(stepNum);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-[#f8fafc] text-slate-800 min-h-screen flex flex-col font-sans overflow-x-hidden md:h-screen md:overflow-hidden">
      {/* Dynamic Floating Toast Notifications */}
      {toast && (
        <div
          id="toast"
          className={`fixed bottom-12 right-6 px-5 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-3 border transition-all duration-300 transform scale-100 ${
            toast.type === "error"
              ? "bg-rose-50 border-rose-250 text-rose-900"
              : "bg-slate-900 border-slate-800 text-white"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full shrink-0 ${
              toast.type === "error" ? "bg-rose-600 animate-pulse" : "bg-teal-400 animate-ping"
            }`}
          />
          <span className="text-xs font-bold leading-none tracking-wide">{toast.message}</span>
        </div>
      )}

      {/* Primary Header Component */}
      <Header onToggleRubric={() => setIsOpenRubric(!isOpenRubric)} />

      {/* Main Content Area: High Density Responsive Grid/Split */}
      <div id="app-workspace" className="flex flex-col md:flex-row flex-1 overflow-y-auto md:overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="no-print w-full md:w-64 bg-slate-100 border-b md:border-b-0 md:border-r border-slate-300 flex flex-col shrink-0">
          <nav className="p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible shrink-0">
            {/* Step 1 */}
            <button
              onClick={() => navigateToStepBoundary(1)}
              className={`w-full text-left min-w-[170px] md:min-w-0 ${
                currentStep === 1
                  ? "bg-white border-2 border-[#001489] rounded-lg p-3 shadow-md transition-all duration-150"
                  : "bg-white/40 border border-slate-200 rounded-lg p-3 hover:bg-slate-200/50 transition duration-150 cursor-pointer"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                  currentStep === 1 ? "bg-[#001489] text-white" : "bg-[#007DBA] text-white"
                }`}>1</div>
                <div className="flex flex-col min-w-0">
                  <span className={`text-xs font-bold leading-none truncate ${currentStep === 1 ? "text-slate-950 font-black" : "text-slate-705"}`}>Institutional Setup</span>
                  <span className="text-[9px] text-slate-400 font-bold mt-0.5">Step 1</span>
                </div>
              </div>
            </button>

            {/* Step 2 */}
            <button
              onClick={() => navigateToStepBoundary(2)}
              disabled={!isValidStep1}
              className={`w-full text-left min-w-[170px] md:min-w-0 ${
                !isValidStep1
                  ? "bg-slate-200/50 border border-transparent rounded-lg p-3 opacity-60 cursor-not-allowed"
                  : currentStep === 2
                  ? "bg-white border-2 border-[#001489] rounded-lg p-3 shadow-md transition-all duration-150"
                  : "bg-white/40 border border-slate-200 rounded-lg p-3 hover:bg-slate-200/50 transition duration-150 cursor-pointer"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                  !isValidStep1 ? "bg-slate-450 text-slate-200" : currentStep === 2 ? "bg-[#001489] text-white" : "bg-[#007DBA] text-white"
                }`}>2</div>
                <div className="flex flex-col min-w-0">
                  <span className={`text-xs font-bold leading-none truncate ${currentStep === 2 ? "text-slate-950 font-black" : !isValidStep1 ? "text-slate-500" : "text-slate-705"}`}>Culture Walkthrough</span>
                  <span className="text-[9px] text-slate-400 font-bold mt-0.5">Step 2</span>
                </div>
              </div>
            </button>

            {/* Step 3 */}
            <button
              onClick={() => navigateToStepBoundary(3)}
              disabled={!isValidStep1}
              className={`w-full text-left min-w-[170px] md:min-w-0 ${
                !isValidStep1
                  ? "bg-slate-200/50 border border-transparent rounded-lg p-3 opacity-60 cursor-not-allowed"
                  : currentStep === 3
                  ? "bg-white border-2 border-[#001489] rounded-lg p-3 shadow-md transition-all duration-150"
                  : "bg-white/40 border border-slate-200 rounded-lg p-3 hover:bg-slate-200/50 transition duration-150 cursor-pointer"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                  !isValidStep1 ? "bg-slate-450 text-slate-200" : currentStep === 3 ? "bg-[#001489] text-white" : "bg-[#007DBA] text-white"
                }`}>3</div>
                <div className="flex flex-col min-w-0">
                  <span className={`text-xs font-bold leading-none truncate ${currentStep === 3 ? "text-slate-950 font-black" : !isValidStep1 ? "text-slate-500" : "text-slate-705"}`}>Classroom Evidence</span>
                  <span className="text-[9px] text-slate-400 font-bold mt-0.5">Step 3</span>
                </div>
              </div>
            </button>

            {/* Step 4 */}
            <button
              onClick={() => navigateToStepBoundary(4)}
              disabled={!isValidStep1}
              className={`w-full text-left min-w-[170px] md:min-w-0 ${
                !isValidStep1
                  ? "bg-slate-200/50 border border-transparent rounded-lg p-3 opacity-60 cursor-not-allowed"
                  : currentStep === 4
                  ? "bg-white border-2 border-[#001489] rounded-lg p-3 shadow-md transition-all duration-150"
                  : "bg-white/40 border border-slate-200 rounded-lg p-3 hover:bg-slate-200/50 transition duration-150 cursor-pointer"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                  !isValidStep1 ? "bg-slate-450 text-slate-200" : currentStep === 4 ? "bg-[#001489] text-white" : "bg-[#007DBA] text-white"
                }`}>4</div>
                <div className="flex flex-col min-w-0">
                  <span className={`text-xs font-bold leading-none truncate ${currentStep === 4 ? "text-slate-950 font-black" : !isValidStep1 ? "text-slate-500" : "text-slate-705"}`}>Diagnostic Report</span>
                  <span className="text-[9px] text-slate-400 font-bold mt-0.5">Step 4</span>
                </div>
              </div>
            </button>
          </nav>
        </aside>

        {/* Working Pane (Scrollable Content Container) */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto flex flex-col bg-[#f8fafc]">
          <div className="flex-1 max-w-5xl w-full mx-auto">
            {/* Dynamic steps rendering */}
            <div className="animate-fade-in duration-200">
              {currentStep === 1 && (
                <SetupStep
                  data={advisor}
                  onChange={setAdvisor}
                  onNext={() => navigateToStepBoundary(2)}
                  showToast={showToast}
                />
              )}

              {currentStep === 2 && (
                <WalkthroughStep
                  data={assessment}
                  onChange={setAssessment}
                  onBack={() => navigateToStepBoundary(1)}
                  onNext={() => navigateToStepBoundary(3)}
                />
              )}

              {currentStep === 3 && (
                <ClassroomStep
                  data={assessment}
                  onChange={setAssessment}
                  onBack={() => navigateToStepBoundary(2)}
                  onGenerate={() => navigateToStepBoundary(4)}
                />
              )}

              {currentStep === 4 && (
                <ReportStep
                  advisor={advisor}
                  assessment={assessment}
                  onChangeAssessment={setAssessment}
                  onBack={() => navigateToStepBoundary(3)}
                  onReset={handleReset}
                  showToast={showToast}
                />
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Bottom Status Bar (Footer info layout from Design HTML) */}
      <footer className="h-8 bg-[#1e293b] text-slate-400 px-6 flex items-center justify-between shrink-0 text-[10px] font-medium tracking-wide border-t border-slate-700 z-10 select-none no-print">
        <div className="flex gap-4 md:gap-6 items-center overflow-hidden">
          <span className="flex items-center gap-1.5 shrink-0 text-slate-300">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            Session: <span className="text-[#00A1A3] font-black uppercase">LIVE AUTOSAVE ENABLED</span>
          </span>
          <span className="hidden sm:inline shrink-0">Advisor: <span className="text-slate-200 font-bold">{advisor.advisorName || "Not set yet"}</span></span>
          <span className="hidden md:inline truncate">School: <span className="text-slate-200 font-bold">{advisor.schoolName || "Not set yet"}</span></span>
        </div>
        <div className="flex gap-4 shrink-0">
          <span>Western Cape Government &copy; 2026</span>
        </div>
      </footer>

      {/* Slide-out Rubric guide drawer */}
      <RubricGuide isOpen={isOpenRubric} onClose={() => setIsOpenRubric(false)} />
    </div>
  );
}
