import React, { useState, useRef, useEffect } from "react";
import { CultureAssessment } from "../types";
import {
  CLASSROOM_TEACHER_CONFIDENCE_RUBRIC,
  CLASSROOM_LEARNER_AGENCY_RUBRIC,
  CLASSROOM_RELATIONAL_SAFETY_RUBRIC,
  CLASSROOM_COLLAB_RUBRIC,
  PEDAGOGY_CYBER_WELLNESS_RUBRIC,
  PEDAGOGY_DESIGN_RUBRIC,
  PEDAGOGY_AGENCY_RUBRIC,
  PEDAGOGY_INCLUSIVITY_RUBRIC,
  PLATFORMS_SCHEDULING_RUBRIC,
  PLATFORMS_INTEGRATION_RUBRIC,
  PLATFORMS_EPORTAL_RUBRIC,
  ScoreOption
} from "../data/rubrics";
import { 
  ArrowLeft, 
  CheckCircle, 
  BookOpen, 
  Sparkles, 
  Layout, 
  Compass, 
  Network, 
  Globe,
  Calendar, 
  Terminal,
  Camera,
  Upload,
  Trash2,
  Video,
  XCircle,
  RefreshCw,
  Shield,
  ShieldCheck,
  Zap,
  Users,
  HeartHandshake
} from "lucide-react";

interface ClassroomStepProps {
  data: CultureAssessment;
  onChange: (assessment: CultureAssessment) => void;
  onBack: () => void;
  onGenerate: () => void;
}

export default function ClassroomStep({ data, onChange, onBack, onGenerate }: ClassroomStepProps) {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Initialize static fallback or existing classrooms list
  const classrooms = data.classrooms || [
    {
      id: "1",
      teacherName: data.teacherName || "",
      subjectObserved: data.subjectObserved || "",
      gradeObserved: data.gradeObserved || "",
      lessonTopic: data.lessonTopic || "",
      learnersCount: data.learnersCount || "",
      smartboardObserved: !!data.smartboardObserved,
      tabletsObserved: !!data.tabletsObserved,
      labObserved: !!data.labObserved,
      internetObserved: !!data.internetObserved,
      offlineObserved: !!data.offlineObserved,
      artifactPhoto: data.artifactPhoto || "",
      toolsUsed: data.toolsUsed || "",
      artifactVerified: data.artifactVerified || "",
      teacherUpskilling: data.teacherUpskilling || "",
      advisorSupport: data.advisorSupport || "",
      teacherAction: data.teacherAction || "",
      learnerAction: data.learnerAction || "",
      pedagogyDesign: data.pedagogyDesign || 1,
      pedagogyAgency: data.pedagogyAgency || 1,
      pedagogyInclusivity: data.pedagogyInclusivity || 1,
      platformsScheduling: data.platformsScheduling || 1,
      platformsIntegration: data.platformsIntegration || 1,
      platformsEportal: data.platformsEportal || 1,
      teacherConfidence: data.teacherConfidence || 1,
      learnerConfidence: data.learnerConfidence || 1,
      relationalSafety: data.relationalSafety || 1,
      classroomCollab: data.classroomCollab || 1,
      cyberWellness: data.cyberWellness || 1,
    }
  ];

  const activeIndex = data.activeClassroomIndex !== undefined ? data.activeClassroomIndex : 0;
  const currentClassroom = classrooms[activeIndex] || classrooms[0];

  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const activeStream = videoRef.current.srcObject as MediaStream;
        activeStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const updateField = (key: keyof CultureAssessment, value: any) => {
    const updatedClassrooms = [...classrooms];
    updatedClassrooms[activeIndex] = {
      ...currentClassroom,
      [key]: value
    };
    onChange({
      ...data,
      [key]: value,
      classrooms: updatedClassrooms
    });
  };

  const selectClassroomIndex = (idx: number) => {
    const targetClass = classrooms[idx];
    if (targetClass) {
      onChange({
        ...data,
        activeClassroomIndex: idx,
        teacherName: targetClass.teacherName,
        subjectObserved: targetClass.subjectObserved,
        gradeObserved: targetClass.gradeObserved,
        lessonTopic: targetClass.lessonTopic,
        learnersCount: targetClass.learnersCount,
        smartboardObserved: targetClass.smartboardObserved,
        tabletsObserved: targetClass.tabletsObserved,
        labObserved: targetClass.labObserved,
        internetObserved: targetClass.internetObserved,
        offlineObserved: targetClass.offlineObserved,
        artifactPhoto: targetClass.artifactPhoto,
        toolsUsed: targetClass.toolsUsed,
        artifactVerified: targetClass.artifactVerified,
        teacherUpskilling: targetClass.teacherUpskilling,
        advisorSupport: targetClass.advisorSupport,
        teacherAction: targetClass.teacherAction,
        learnerAction: targetClass.learnerAction,
        pedagogyDesign: targetClass.pedagogyDesign,
        pedagogyAgency: targetClass.pedagogyAgency,
        pedagogyInclusivity: targetClass.pedagogyInclusivity,
        platformsScheduling: targetClass.platformsScheduling,
        platformsIntegration: targetClass.platformsIntegration,
        platformsEportal: targetClass.platformsEportal || 1,
        teacherConfidence: targetClass.teacherConfidence || 1,
        learnerConfidence: targetClass.learnerConfidence || 1,
        relationalSafety: targetClass.relationalSafety || 1,
        classroomCollab: targetClass.classroomCollab || 1,
        cyberWellness: targetClass.cyberWellness || 1,
      });
    }
  };

  const addClassroom = () => {
    if (classrooms.length >= 3) return;
    const newClassroom = {
      id: String(classrooms.length + 1),
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
    };
    const updatedClassrooms = [...classrooms, newClassroom];
    const newIdx = updatedClassrooms.length - 1;
    onChange({
      ...data,
      classrooms: updatedClassrooms,
      activeClassroomIndex: newIdx,
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
    });
  };

  const removeClassroom = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (classrooms.length <= 1) return;
    const updatedClassrooms = classrooms.filter((_, i) => i !== idx);
    const newIdx = 0;
    const targetClass = updatedClassrooms[0];
    onChange({
      ...data,
      classrooms: updatedClassrooms,
      activeClassroomIndex: newIdx,
      teacherName: targetClass.teacherName,
      subjectObserved: targetClass.subjectObserved,
      gradeObserved: targetClass.gradeObserved,
      lessonTopic: targetClass.lessonTopic,
      learnersCount: targetClass.learnersCount,
      smartboardObserved: targetClass.smartboardObserved,
      tabletsObserved: targetClass.tabletsObserved,
      labObserved: targetClass.labObserved,
      internetObserved: targetClass.internetObserved,
      offlineObserved: targetClass.offlineObserved,
      artifactPhoto: targetClass.artifactPhoto,
      toolsUsed: targetClass.toolsUsed,
      artifactVerified: targetClass.artifactVerified,
      teacherUpskilling: targetClass.teacherUpskilling,
      advisorSupport: targetClass.advisorSupport,
      teacherAction: targetClass.teacherAction,
      learnerAction: targetClass.learnerAction,
      pedagogyDesign: targetClass.pedagogyDesign,
      pedagogyAgency: targetClass.pedagogyAgency,
      pedagogyInclusivity: targetClass.pedagogyInclusivity,
      platformsScheduling: targetClass.platformsScheduling,
      platformsIntegration: targetClass.platformsIntegration,
      platformsEportal: targetClass.platformsEportal || 1,
      teacherConfidence: targetClass.teacherConfidence || 1,
      learnerConfidence: targetClass.learnerConfidence || 1,
      relationalSafety: targetClass.relationalSafety || 1,
      classroomCollab: targetClass.classroomCollab || 1,
      cyberWellness: targetClass.cyberWellness || 1,
    });
  };

  const startCamera = async (mode: "environment" | "user" = "environment") => {
    setCameraError(null);
    setIsCameraActive(true);
    try {
      if (videoRef.current && videoRef.current.srcObject) {
        const oldStream = videoRef.current.srcObject as MediaStream;
        oldStream.getTracks().forEach(track => track.stop());
      }

      const constraints = {
        video: {
          facingMode: { ideal: mode },
          width: { ideal: 645 },
          height: { ideal: 485 }
        },
        audio: false
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(e => console.error("Error playing video stream:", e));
        };
      }
    } catch (err: any) {
      console.error("Error accessing camera direct:", err);
      setCameraError(
        "Direct camera access is blocked or unavailable in this window. Please select 'Take/Upload Photo' which acts as a resilient fallback and triggers your device camera."
      );
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const activeStream = videoRef.current.srcObject as MediaStream;
      activeStream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const toggleFacingMode = () => {
    const nextMode = facingMode === "environment" ? "user" : "environment";
    setFacingMode(nextMode);
    if (isCameraActive) {
      startCamera(nextMode);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        try {
          const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
          updateField("artifactPhoto", dataUrl);
          stopCamera();
        } catch (e) {
          console.error("Failed to generate base64 from canvas:", e);
          setCameraError("Failed to convert captured photo frame - try file upload fallback.");
        }
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          updateField("artifactPhoto", reader.result);
        }
      };
      reader.onerror = () => {
        setCameraError("Failed to read selection. Please try another image file.");
      };
      reader.readAsDataURL(file);
    }
  };

  const clearPhoto = () => {
    updateField("artifactPhoto", undefined);
    setCameraError(null);
  };

  const getActiveBgColor = (level: number) => {
    switch (level) {
      case 1: return "bg-[#890C58]/5 border-[#890C58] shadow-[#890C58]/5 ring-2 ring-[#890C58]/20";
      case 2: return "bg-[#D73828]/5 border-[#D73828] shadow-[#D73828]/5 ring-2 ring-[#D73828]/30";
      case 3: return "bg-[#00A1A3]/5 border-[#00A1A3] shadow-[#00A1A3]/5 ring-2 ring-[#00A1A3]/20";
      case 4: return "bg-[#C8126E]/5 border-[#C8126E] shadow-[#C8126E]/5 ring-2 ring-[#C8126E]/20";
      default: return "";
    }
  };

  const getTextColor = (level: number) => {
    switch (level) {
      case 1: return "text-[#890C58]";
      case 2: return "text-[#D73828]";
      case 3: return "text-[#00A1A3]";
      case 4: return "text-[#C8126E]";
      default: return "";
    }
  };

  const getBadgeBg = (level: number) => {
    switch (level) {
      case 1: return "bg-[#890C58] text-white";
      case 2: return "bg-[#D73828] text-white";
      case 3: return "bg-[#00A1A3] text-white";
      case 4: return "bg-[#C8126E] text-white";
      default: return "";
    }
  };

  const renderPillarGroup = (
    title: string,
    subtitle: string,
    fieldKey: keyof CultureAssessment,
    options: ScoreOption[],
    icon: React.ReactNode
  ) => {
    const currentValue = data[fieldKey] as number;
    return (
      <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-4 md:p-5">
        <div className="flex items-center gap-1.5 mb-2">
          {icon}
          <h3 className="text-xs font-black font-display text-slate-800 tracking-tight uppercase">
            {title}
          </h3>
        </div>
        <p className="text-[10px] text-slate-500 mb-3 leading-relaxed max-w-3xl">
          {subtitle}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {options.map((option) => {
            const checked = currentValue === option.level;
            return (
              <label
                key={option.level}
                className={`relative p-3 rounded-lg border transition-all duration-150 cursor-pointer flex flex-col justify-between hover:scale-[1.002] ${
                  checked
                    ? getActiveBgColor(option.level)
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <input
                  type="radio"
                  name={`${String(fieldKey)}-group`}
                  value={option.level}
                  checked={checked}
                  onChange={() => updateField(fieldKey, option.level)}
                  className="sr-only"
                />
                <div>
                  <span className={`inline-block text-[8px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded-md mb-2 ${getBadgeBg(option.level)}`}>
                    L{option.level}: {option.label}
                  </span>
                  <p className="text-[10px] text-slate-500 leading-snug font-medium">
                    {option.description}
                  </p>
                </div>
              </label>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      {/* Title Header */}
      <div className="border-b border-slate-100 pb-3 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black font-display text-slate-900 tracking-tight uppercase">
            3. Micro-Level Classroom Observation (PEDAGOGY & PLATFORMS)
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Sit in on an active lesson. Observe learner interaction, teacher pivots, scheduler mechanics, and platform tool deployment.
          </p>
        </div>
      </div>

      {/* Consideration 1: Walkthrough-Only Mode Toggle */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 mb-5 shadow-sm flex items-start gap-3">
        <input
          type="checkbox"
          id="onlyWalkthrough"
          checked={!!data.onlyWalkthrough}
          onChange={(e) => {
            onChange({
              ...data,
              onlyWalkthrough: e.target.checked,
              onlyClassroom: e.target.checked ? false : data.onlyClassroom
            });
          }}
          className="rounded mt-0.5 border-slate-300 w-4 h-4 text-[#001489] focus:ring-[#001489] cursor-pointer"
        />
        <div className="flex-1">
          <label htmlFor="onlyWalkthrough" className="text-xs font-black text-amber-950 cursor-pointer select-none uppercase tracking-wide flex items-center gap-1.5">
            No intended classroom evidence to be done today (Walkthrough Only)
          </label>
          <p className="text-[10.5px] text-amber-900 leading-relaxed mt-1 font-medium">
            Toggle this box if you are only conducting a general, school-wide cultural walkthrough today. If checked, the lesson rubrics and observation detail forms below are omitted from score computations and final report displays.
          </p>
        </div>
      </div>

      {data.onlyWalkthrough ? (
        <div className="space-y-6">
          <div className="text-center py-12 bg-slate-50 border border-dashed border-slate-300 rounded-xl max-w-2xl mx-auto my-6 shadow-xs">
            <XCircle className="w-12 h-12 text-slate-400 mx-auto mb-3 animate-pulse" />
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Walkthrough-Only Mode Active</h4>
            <p className="text-[11px] text-slate-500 mt-1.5 max-w-md mx-auto px-6 leading-relaxed">
              You selected to focus solely on the school-wide cultural walkthrough today. The micro-level classroom evidence forms are hidden, and the diagnostic report will evaluate only <strong>People & Practices</strong>.
            </p>
            <button
              onClick={() => onChange({ ...data, onlyWalkthrough: false })}
              className="mt-4 text-[10px] font-black uppercase text-[#001489] hover:text-[#000e60] px-3 py-1.5 border border-[#001489]/30 rounded-lg hover:bg-blue-50/50 transition duration-150"
            >
              Enable Classroom Evidence
            </button>
          </div>

          {/* Footer Navigation for Walkthrough Only */}
          <div className="mt-8 pt-4 border-t border-slate-200 flex justify-between items-center">
            <button
              onClick={onBack}
              className="bg-white border border-slate-250 hover:bg-slate-50 text-slate-700 font-bold text-xs px-4 py-2 rounded-lg transition duration-150 flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BACK</span>
            </button>

            <button
              onClick={onGenerate}
              className="bg-[#001489] hover:bg-[#000e60] text-white font-extrabold text-xs px-4 py-2 rounded-lg shadow-sm hover:shadow transition duration-150 flex items-center gap-1.5 cursor-pointer active:scale-95 text-center uppercase"
            >
              <CheckCircle className="w-3.5 h-3.5 text-[#FFC600]" />
              <span>Generate Report</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Consideration 2: Multiple Classrooms Selection Tabs */}
          <div className="bg-slate-100/80 p-3 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-505 bg-slate-200 px-2 py-1 rounded">
                  Classroom Observations
                </span>
                <span className="text-slate-400 text-xs font-bold">({classrooms.length} of 3)</span>
              </div>
              
              <div className="flex items-center gap-1.5 shrink-0">
                {classrooms.map((cls, idx) => (
                  <div
                    key={cls.id}
                    onClick={() => selectClassroomIndex(idx)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold cursor-pointer transition select-none flex items-center gap-2 ${
                      activeIndex === idx
                        ? "bg-[#001489] border-[#001489] text-white shadow-md font-black"
                        : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    <span>Class {idx + 1} {cls.teacherName ? `(${cls.teacherName})` : ""}</span>
                    {classrooms.length > 1 && (
                      <button
                        type="button"
                        onClick={(e) => removeClassroom(idx, e)}
                        className={`hover:scale-110 p-0.5 rounded transition ${
                          activeIndex === idx ? "text-rose-300 hover:text-white animate-pulse" : "text-slate-400 hover:text-rose-500"
                        }`}
                        title="Remove classroom observations record"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
                
                {classrooms.length < 3 && (
                  <button
                    type="button"
                    onClick={addClassroom}
                    className="px-2.5 py-1.5 border border-dashed border-[#00A1A3] text-[#00A1A3] hover:bg-teal-50/50 hover:border-teal-400 rounded-lg text-xs font-black transition cursor-pointer uppercase flex items-center gap-1 shadow-sm"
                  >
                    <span>+ Add Class</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Classroom Observation Context Metadata Fields */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 md:p-4 shadow-sm space-y-3">
          <h4 className="text-[10px] font-bold uppercase text-slate-700 tracking-wider">
            Classroom Observation Context
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            <div>
              <label className="block text-[9px] font-black uppercase text-slate-500 mb-1">
                Teacher Observed
              </label>
              <input
                type="text"
                value={data.teacherName || ""}
                onChange={(e) => updateField("teacherName", e.target.value)}
                placeholder="e.g. Mrs. S. Adams"
                className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded focus:bg-white focus:ring-1 focus:ring-[#001489] transition bg-white text-slate-800"
              />
            </div>
            
            <div>
              <label className="block text-[9px] font-black uppercase text-slate-500 mb-1">
                Subject Observed
              </label>
              <input
                type="text"
                value={data.subjectObserved || ""}
                onChange={(e) => updateField("subjectObserved", e.target.value)}
                placeholder="e.g. Mathematics"
                className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded focus:bg-white focus:ring-1 focus:ring-[#001489] transition bg-white text-slate-800"
              />
            </div>

            <div>
              <label className="block text-[9px] font-black uppercase text-slate-500 mb-1">
                Grade Observed
              </label>
              <select
                value={data.gradeObserved || ""}
                onChange={(e) => updateField("gradeObserved", e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded focus:bg-white focus:ring-1 focus:ring-[#001489] transition bg-white outline-none text-slate-800"
              >
                <option value="">-- Select Grade --</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i} value={`Grade ${i + 1}`}>Grade {i + 1}</option>
                ))}
                <option value="Grade R">Grade R</option>
                <option value="Multi-Grade">Multi-Grade</option>
              </select>
            </div>

            <div>
              <label className="block text-[9px] font-black uppercase text-slate-500 mb-1">
                Lesson Focus Topic
              </label>
              <input
                type="text"
                value={data.lessonTopic || ""}
                onChange={(e) => updateField("lessonTopic", e.target.value)}
                placeholder="e.g. Fractions / Algebra"
                className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded focus:bg-white focus:ring-1 focus:ring-[#001489] transition bg-white text-slate-800"
              />
            </div>

            <div>
              <label className="block text-[9px] font-black uppercase text-slate-500 mb-1">
                Learners in Class
              </label>
              <input
                type="number"
                value={data.learnersCount || ""}
                onChange={(e) => updateField("learnersCount", e.target.value)}
                placeholder="e.g. 35"
                className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded focus:bg-white focus:ring-1 focus:ring-[#001489] transition bg-white text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* PEOPLE Pillars */}
        <div className="border-l-4 border-[#890C58] pl-3 py-1 bg-purple-50/40 rounded-r-lg mb-4 mt-6">
          <h4 className="text-[10px] font-black text-[#890C58] uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#890C58]" /> Category: PEOPLE — Classroom Dynamics & Affective Culture
          </h4>
        </div>

        {renderPillarGroup(
          "Pillar: PEOPLE — Teacher Digital Confidence & Responsiveness",
          "How does the teacher manage digital tools and respond to unexpected technical challenges during the lesson?",
          "teacherConfidence",
          CLASSROOM_TEACHER_CONFIDENCE_RUBRIC,
          <div className="p-1 bg-purple-50 text-[#890C58] rounded-md"><Zap className="w-4 h-4" /></div>
        )}

        {renderPillarGroup(
          "Pillar: PEOPLE — Learner Confidence, Voice & Agency",
          "To what extent do learners demonstrate independence, choice, voice, and ownership when using digital tools in the lesson?",
          "learnerConfidence",
          CLASSROOM_LEARNER_AGENCY_RUBRIC,
          <div className="p-1 bg-fuchsia-50 text-[#890C58] rounded-md"><Sparkles className="w-4 h-4" /></div>
        )}

        {renderPillarGroup(
          "Pillar: PEOPLE — Relational Safety & Help-Seeking",
          "How comfortable are learners with asking questions, making mistakes, seeking help, and supporting one another during digital activities?",
          "relationalSafety",
          CLASSROOM_RELATIONAL_SAFETY_RUBRIC,
          <div className="p-1 bg-pink-50 text-[#890C58] rounded-md"><Shield className="w-4 h-4" /></div>
        )}

        {/* PRACTICE Pillars */}
        <div className="border-l-4 border-[#D73828] pl-3 py-1 bg-orange-50/40 rounded-r-lg mb-4 mt-8">
          <h4 className="text-[10px] font-black text-[#D73828] uppercase tracking-wider flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#D73828]" /> Category: PRACTICE — Classroom Collaboration & Shared Practice
          </h4>
        </div>

        {renderPillarGroup(
          "Pillar: PRACTICE — Collaboration & Shared Digital Practice",
          "How do learners interact, collaborate, share resources, and collectively solve problems or create digital work during the lesson?",
          "classroomCollab",
          CLASSROOM_COLLAB_RUBRIC,
          <div className="p-1 bg-orange-50 text-[#D73828] rounded-md"><Users className="w-4 h-4" /></div>
        )}

        {/* PEDAGOGY Pillars */}
        <div className="border-l-4 border-[#00A1A3] pl-3 py-1 bg-teal-50/40 rounded-r-lg mb-4 mt-8">
          <h4 className="text-[10px] font-black text-[#00A1A3] uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#00A1A3]" /> Category: PEDAGOGY — Active Classroom Practice & Curriculum Integration
          </h4>
        </div>

        {renderPillarGroup(
          "Pillar: PEDAGOGY — Lesson Design & Digital Integration",
          "What is the functional focus of the technology in this lesson delivery?",
          "pedagogyDesign",
          PEDAGOGY_DESIGN_RUBRIC,
          <div className="p-1 bg-sky-50 text-sky-700 rounded-md"><BookOpen className="w-4 h-4" /></div>
        )}

        {renderPillarGroup(
          "Pillar: PEDAGOGY — Learner Agency & Artefacts",
          "To what extent are learners creating knowledge rather than consuming it?",
          "pedagogyAgency",
          PEDAGOGY_AGENCY_RUBRIC,
          <div className="p-1 bg-emerald-50 text-emerald-700 rounded-md"><Layout className="w-4 h-4" /></div>
        )}

        {renderPillarGroup(
          "Pillar: PEDAGOGY — Cognitive Inclusivity & Differentiation",
          "Does the digital design accommodate multiple paces, abilities, and remediation tracks?",
          "pedagogyInclusivity",
          PEDAGOGY_INCLUSIVITY_RUBRIC,
          <div className="p-1 bg-teal-50 text-teal-600 rounded-md"><Compass className="w-4 h-4" /></div>
        )}

        {renderPillarGroup(
          "Pillar: PEDAGOGY — Cyber Wellness Integration into Subject Learning",
          "How meaningfully are digital citizenship, cyber wellness, ethics, and online safety woven into subject lesson activities and learner tasks?",
          "cyberWellness",
          PEDAGOGY_CYBER_WELLNESS_RUBRIC,
          <div className="p-1 bg-cyan-50 text-cyan-800 rounded-md"><ShieldCheck className="w-4 h-4" /></div>
        )}

        {/* PLATFORMS Pillars */}
        <div className="border-l-4 border-[#C8126E] pl-3 py-1 bg-pink-50/40 rounded-r-lg mt-8 mb-4">
          <h4 className="text-[10px] font-black text-[#C8126E] uppercase tracking-wider flex items-center gap-1.5">
            <Network className="w-3.5 h-3.5 text-[#C8126E]" /> Category: PLATFORMS — Classroom Digital Tool Access & ePortal Integration
          </h4>
        </div>

        {renderPillarGroup(
          "Pillar: PLATFORMS — Digital Tool Access & Usability in Lesson",
          "How easily can teachers and learners access and use the available digital tools during the lesson?",
          "platformsIntegration",
          PLATFORMS_INTEGRATION_RUBRIC,
          <div className="p-1 bg-pink-50 text-pink-700 rounded-md"><Network className="w-4 h-4" /></div>
        )}

        {renderPillarGroup(
          "Pillar: PLATFORMS — Digital tool and ePortal integration",
          "How effectively are WCED ePortal resources and interactive digital tools integrated into lesson routines and learning workflows?",
          "platformsEportal",
          PLATFORMS_EPORTAL_RUBRIC,
          <div className="p-1 bg-purple-50 text-purple-700 rounded-md"><Globe className="w-4 h-4" /></div>
        )}

        {/* Observable Technical Checklist */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 md:p-4 shadow-sm space-y-3">
          <h4 className="text-[10px] font-bold uppercase text-slate-700 tracking-wider">
            In-Class Technical Checklist (Observable Live Elements)
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 bg-white p-3 rounded border border-slate-150">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={!!data.smartboardObserved}
                onChange={(e) => updateField("smartboardObserved", e.target.checked)}
                className="w-3.5 h-3.5 rounded text-[#001489] border-slate-300 focus:ring-[#001489]"
              />
              <span className="text-[10px] font-bold text-slate-650 font-sans">Smart Classroom Technology Use</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={!!data.tabletsObserved}
                onChange={(e) => updateField("tabletsObserved", e.target.checked)}
                className="w-3.5 h-3.5 rounded text-[#001489] border-slate-300 focus:ring-[#001489]"
              />
              <span className="text-[10px] font-bold text-slate-650 font-sans">Learner Tablets</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={!!data.labObserved}
                onChange={(e) => updateField("labObserved", e.target.checked)}
                className="w-3.5 h-3.5 rounded text-[#001489] border-slate-300 focus:ring-[#001489]"
              />
              <span className="text-[10px] font-bold text-slate-650 font-sans">eLearning Lab in-use</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={!!data.internetObserved}
                onChange={(e) => updateField("internetObserved", e.target.checked)}
                className="w-3.5 h-3.5 rounded text-[#001489] border-slate-300 focus:ring-[#001489]"
              />
              <span className="text-[10px] font-bold text-slate-650 font-sans">Online Activities</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={!!data.offlineObserved}
                onChange={(e) => updateField("offlineObserved", e.target.checked)}
                className="w-3.5 h-3.5 rounded text-[#001489] border-slate-300 focus:ring-[#001489]"
              />
              <span className="text-[10px] font-bold text-slate-650 font-sans">Offline Digital Resources/Tool</span>
            </label>
          </div>
        </div>

        {/* Classroom Field Evidence Observations */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 md:p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2">
            <Terminal className="w-4 h-4 text-[#001489]" />
            <h4 className="text-xs font-black uppercase text-slate-800 tracking-wide">
              Classroom Field Evidence Observations
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Field 1: Active Digital Tools & Platforms Used in the Lesson */}
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-600 mb-1 leading-tight">
                Active Digital Tools & Platforms Used in the Lesson
              </label>
              <textarea
                value={data.toolsUsed}
                onChange={(e) => updateField("toolsUsed", e.target.value)}
                placeholder="e.g. MCO Fractions Module, PhET Simulations, WCED ePortal Guides"
                rows={2}
                className="w-full text-xs px-2.5 py-1.5 border border-slate-250 rounded-md focus:bg-white focus:ring-1 focus:ring-[#001489] bg-white text-slate-800"
              />
            </div>

            {/* Field 2: Verified Learner Digital Artefact */}
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-600 mb-1 leading-tight">
                Verified Learner Digital Artefact
              </label>
              <textarea
                value={data.artifactVerified}
                onChange={(e) => updateField("artifactVerified", e.target.value)}
                placeholder="e.g. Gr6 Maths Online Fractions Dashboard Summary Page (Verified on Tablet #14)"
                rows={2}
                className="w-full text-xs px-2.5 py-1.5 border border-slate-250 rounded-md focus:bg-white focus:ring-1 focus:ring-[#001489] bg-white text-slate-800"
              />
            </div>

            {/* Visual Learner Artefact Capture */}
            <div className="md:col-span-2 border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div className="flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-[#001489]" />
                  <div>
                    <h5 className="text-[11px] font-black uppercase text-slate-800 tracking-wider">
                      Learner Artefact Visual Evidence (Camera Capture)
                    </h5>
                    <p className="text-[9px] text-slate-500">
                      Snap a photo of the tablet screen, workspace, or physical workbook as verified core evidence.
                    </p>
                  </div>
                </div>

                {data.artifactPhoto && (
                  <button
                    type="button"
                    onClick={clearPhoto}
                    className="text-pink-750 hover:text-pink-850 text-[9px] font-black uppercase flex items-center gap-1 bg-pink-50 hover:bg-pink-100 border border-pink-200/50 px-2 py-1 rounded transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear Image</span>
                  </button>
                )}
              </div>

              {cameraError && (
                <div className="bg-amber-50 border border-amber-200/60 rounded-lg p-2.5 text-[10px] text-amber-800 flex items-start gap-1.5 font-medium leading-relaxed">
                  <XCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>{cameraError}</div>
                </div>
              )}

              {/* Live Web Camera View */}
              {isCameraActive && (
                <div className="relative rounded-lg overflow-hidden border border-slate-300 bg-black shadow-inner flex flex-col items-center">
                  <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5">
                    <span className="bg-[#C8126E] text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                      <span className="w-1.5 h-1.5 bg-white rounded-full" />
                      Live Camera Feed
                    </span>
                    <button
                      type="button"
                      onClick={toggleFacingMode}
                      className="bg-slate-900/80 hover:bg-slate-900 border border-slate-750 text-white text-[8px] font-black uppercase tracking-wide px-2 py-0.5 rounded-md flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-2.5 h-2.5" />
                      <span>Switch Camera ({facingMode === "environment" ? "Back" : "Front"})</span>
                    </button>
                  </div>

                  {/* Viewfinder Guideline Overlay */}
                  <div className="absolute inset-0 border-2 border-dashed border-white/20 pointer-events-none m-4 rounded flex items-center justify-center">
                    <div className="text-[9px] text-white/50 uppercase font-mono tracking-widest bg-black/40 px-2 py-0.5 rounded">
                      Place Artefact Inside Frame
                    </div>
                  </div>

                  <video
                    ref={videoRef}
                    playsInline
                    muted
                    className="w-full h-auto max-h-[340px] object-cover"
                  />

                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2.5">
                    <button
                      type="button"
                      onClick={capturePhoto}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2 rounded-full shadow-lg transition active:scale-95 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Camera className="w-4 h-4 animate-bounce" />
                      <span>SNAP PHOTO</span>
                    </button>

                    <button
                      type="button"
                      onClick={stopCamera}
                      className="bg-slate-900/90 hover:bg-slate-900 text-white font-bold text-xs px-4 py-2 rounded-full border border-slate-700 transition active:scale-95 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Captured Image Display or Controls Grid */}
              {!isCameraActive && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  {/* Photo Thumbnail */}
                  <div className="border border-slate-200 bg-white rounded-lg p-3 min-h-[160px] flex flex-col items-center justify-center relative bg-gradient-to-br from-white to-slate-50 shadow-sm">
                    {data.artifactPhoto ? (
                      <div className="w-full h-full flex flex-col items-center relative">
                        <img
                          src={data.artifactPhoto}
                          alt="Learner Artefact"
                          className="max-h-[140px] w-auto object-contain rounded border border-slate-150 shadow-sm"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute bottom-1 right-1 bg-emerald-600 text-white text-[7px] font-black uppercase px-1.5 py-0.5 rounded shadow-sm">
                          Attached Evidence
                        </span>
                      </div>
                    ) : (
                      <div className="text-center py-4 text-slate-450">
                        <Video className="w-8 h-8 mx-auto mb-1.5 text-slate-350" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wide block">
                          No Photo Evidence
                        </span>
                        <p className="text-[8px] text-slate-400 mt-0.5">Capture live to back up rating</p>
                      </div>
                    )}
                  </div>

                  {/* Photo Actions Controls */}
                  <div className="space-y-3">
                    <h6 className="text-[10px] font-black text-slate-700 uppercase tracking-wide">
                      Capture Options
                    </h6>
                    <div className="flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => startCamera(facingMode)}
                        className="w-full bg-[#001489] hover:bg-[#000e60] text-white font-extrabold text-xs py-2 px-3 rounded shadow-sm hover:shadow transition flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>USE LIVE WEB CAMERA</span>
                      </button>

                      <label className="w-full bg-slate-200 hover:bg-slate-300 text-slate-800 border border-slate-300/80 font-extrabold text-xs py-2 px-3 rounded shadow-sm transition flex items-center justify-center gap-2 cursor-pointer text-center active:scale-95">
                        <Upload className="w-3.5 h-3.5 text-slate-600" />
                        <span>TAKE/UPLOAD PHOTO</span>
                        <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="text-[9px] text-slate-500 leading-relaxed font-sans bg-slate-100 p-2.5 rounded border border-slate-200/50">
                      <strong>WCED eLearning Tip:</strong> Direct visual evidence is powerful for confirming Category 3 (Pillar: Learner Agency & Artefacts). Backing your rating with digital images guarantees a high-confidence, professional audit record.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Field 3: Active Teacher Upskilling Milestones (2026 Strategy) */}
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-600 mb-1 leading-tight">
                Active Teacher Upskilling Milestones (2026 Strategy)
              </label>
              <textarea
                value={data.teacherUpskilling}
                onChange={(e) => updateField("teacherUpskilling", e.target.value)}
                placeholder="e.g. Teacher has completed initial online diagnostic surveys and enrolled in self-paced ePortal modules, showing growing agency..."
                rows={2}
                className="w-full text-xs px-2.5 py-1.5 border border-slate-250 rounded-md focus:bg-white focus:ring-1 focus:ring-[#001489] bg-white text-slate-800"
              />
            </div>

            {/* Field 4: eAdvisor In-Classroom Suggestions & Interventions */}
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-600 mb-1 leading-tight">
                eAdvisor In-Classroom Suggestions & Interventions
              </label>
              <textarea
                value={data.advisorSupport}
                onChange={(e) => updateField("advisorSupport", e.target.value)}
                placeholder="e.g. Advised to pivot from teacher-centred projection to hands-on learner exploration. Support teacher to create zero-stakes digital games..."
                rows={2}
                className="w-full text-xs px-2.5 py-1.5 border border-slate-250 rounded-md focus:bg-white focus:ring-1 focus:ring-[#001489] bg-white text-slate-800"
              />
            </div>

            {/* Field 5: Observed Teacher Action */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-600 mb-1 leading-tight">
                  Observed Teacher Action
                </label>
                <textarea
                  value={data.teacherAction || ""}
                  onChange={(e) => updateField("teacherAction", e.target.value)}
                  placeholder="e.g. Teacher projected MCO fractions module and guided learners from step 2 to 3 after resolving local network drops..."
                  rows={2.5}
                  className="w-full text-xs px-2.5 py-1.5 border border-slate-250 rounded-md focus:bg-white focus:ring-1 focus:ring-[#001489] bg-white text-slate-800"
                />
              </div>

              {/* Field 6: Observed Learner Action */}
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-600 mb-1 leading-tight">
                  Observed Learner Action
                </label>
                <textarea
                  value={data.learnerAction || ""}
                  onChange={(e) => updateField("learnerAction", e.target.value)}
                  placeholder="e.g. Learners operated in pairs on tablets, experimenting with numerator/denominator values while entering their discoveries into physical notebooks..."
                  rows={2.5}
                  className="w-full text-xs px-2.5 py-1.5 border border-slate-250 rounded-md focus:bg-white focus:ring-1 focus:ring-[#001489] bg-white text-slate-800"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Footer Navigation */}
      <div className="mt-8 pt-4 border-t border-slate-200 flex justify-between items-center">
        <button
          onClick={onBack}
          className="bg-white border border-slate-250 hover:bg-slate-50 text-slate-700 font-bold text-xs px-4 py-2 rounded-lg transition duration-150 flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK</span>
        </button>

        <button
          onClick={onGenerate}
          className="bg-[#001489] hover:bg-[#000e60] text-white font-extrabold text-xs px-4 py-2 rounded-lg shadow-sm hover:shadow transition duration-150 flex items-center gap-1.5 cursor-pointer active:scale-95 text-center uppercase"
        >
          <CheckCircle className="w-3.5 h-3.5 text-[#FFC600]" />
          <span>Generate Report</span>
        </button>
      </div>
    </div>
  );
}
