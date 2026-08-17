import React from "react";
import { CultureAssessment } from "../types";
import {
  PEOPLE_SAFETY_RUBRIC,
  PEOPLE_CONFIDENCE_RUBRIC,
  PRACTICES_COLLAB_RUBRIC,
  PRACTICES_PD_RUBRIC,
  PRACTICES_CYBER_RUBRIC,
  PLATFORMS_SCHEDULING_RUBRIC,
  SCENARIO_OPTIONS,
  ScoreOption
} from "../data/rubrics";
import { ArrowLeft, ArrowRight, ShieldCheck, Users, SignalZero, Brain, Award, ShieldAlert, CheckCircle, XCircle, Calendar } from "lucide-react";

interface WalkthroughStepProps {
  data: CultureAssessment;
  onChange: (assessment: CultureAssessment) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function WalkthroughStep({ data, onChange, onBack, onNext }: WalkthroughStepProps) {
  const updateField = (key: keyof CultureAssessment, value: any) => {
    onChange({
      ...data,
      [key]: value,
    });
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
                className={`relative p-3 rounded-lg border transition-all duration-150 cursor-pointer flex flex-col justify-between hover:scale-[1.005] ${
                  checked
                    ? getActiveBgColor(option.level)
                    : "border-slate-205 bg-white hover:bg-slate-50"
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
      <div className="border-b border-slate-100 pb-3 mb-4">
        <h2 className="text-base font-black font-display text-slate-900 tracking-tight uppercase">
          2. Macro-Level Cultural Walkthrough (PEOPLE, PRACTICES & PLATFORMS)
        </h2>
        <p className="text-[11px] text-slate-500 mt-0.5">
          Evaluate the emotional infrastructure, psychological safety, cultural routines, and school-wide access mechanics.
        </p>
      </div>

      {/* Consideration 3: Classroom-Only Mode Toggle */}
      <div className="bg-sky-50/70 border border-sky-200/80 rounded-xl p-4 mb-5 shadow-sm flex items-start gap-3">
        <input
          type="checkbox"
          id="onlyClassroom"
          checked={!!data.onlyClassroom}
          onChange={(e) => {
            onChange({
              ...data,
              onlyClassroom: e.target.checked,
              onlyWalkthrough: e.target.checked ? false : data.onlyWalkthrough
            });
          }}
          className="rounded mt-0.5 border-slate-300 w-4 h-4 text-[#001489] focus:ring-[#001489] cursor-pointer"
        />
        <div className="flex-1">
          <label htmlFor="onlyClassroom" className="text-xs font-black text-sky-950 cursor-pointer select-none uppercase tracking-wide flex items-center gap-1.5">
            No intended school-wide walkthrough to be done today (Classroom Observations Only)
          </label>
          <p className="text-[10.5px] text-sky-900 leading-relaxed mt-1 font-medium">
            Toggle this box if you are only assessing active classroom lesson delivery sessions today. If checked, the school-wide cultural rubrics below are omitted from score computations and final report displays.
          </p>
        </div>
      </div>

      {data.onlyClassroom ? (
        <div className="space-y-6">
          <div className="text-center py-12 bg-slate-50 border border-dashed border-slate-300 rounded-xl max-w-2xl mx-auto my-6 shadow-xs">
            <XCircle className="w-12 h-12 text-slate-400 mx-auto mb-3 animate-pulse" />
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Classroom-Only Mode Active</h4>
            <p className="text-[11px] text-slate-500 mt-1.5 max-w-md mx-auto px-6 leading-relaxed">
              You selected to focus solely on micro-level classroom evidence observations today. The school-wide macro walkthrough forms representing <strong>People, Practices & Resource Scheduling</strong> are hidden, and the diagnostic report will evaluate active classroom pedagogy.
            </p>
            <button
              onClick={() => onChange({ ...data, onlyClassroom: false })}
              className="mt-4 text-[10px] font-black uppercase text-[#001489] hover:text-[#000e60] px-3 py-1.5 border border-[#001489]/30 rounded-lg hover:bg-blue-50/50 transition duration-150"
            >
              Enable Walkthrough Rubrics
            </button>
          </div>

          {/* Footer Navigation for Classroom Only */}
          <div className="mt-8 pt-4 border-t border-slate-200 flex justify-between items-center">
            <button
              onClick={onBack}
              className="bg-white border border-slate-250 hover:bg-slate-50 text-slate-700 font-bold text-xs px-4 py-2 rounded-lg transition duration-150 flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BACK</span>
            </button>

            <button
              onClick={onNext}
              className="bg-[#001489] hover:bg-[#000e60] text-white font-extrabold text-xs px-4 py-2 rounded-lg shadow-sm hover:shadow transition duration-150 flex items-center gap-1.5 cursor-pointer active:scale-95 text-center uppercase"
            >
              <span>Classroom Observation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* PEOPLE Pillars */}
          <div className="border-l-2 border-[#890C58] pl-3 py-1 bg-slate-50/30 rounded-r-lg mb-4">
            <h4 className="text-[10px] font-black text-[#890C58] uppercase tracking-wider">
              Category: PEOPLE — Soft Capability & Mindset
            </h4>
          </div>

          {renderPillarGroup(
            "Pillar: PEOPLE — Psychological Safety & Wellbeing",
            "How safe do teachers feel when running into technical errors or trying new methodologies?",
            "peopleSafety",
            PEOPLE_SAFETY_RUBRIC,
            <div className="p-1 bg-rose-50 text-[#890C58] rounded-md"><ShieldCheck className="w-4 h-4" /></div>
          )}

          {renderPillarGroup(
            "Pillar: PEOPLE — Digital Confidence & Agency",
            "Rate the underlying capacity and motivation for self-directed growth in technology.",
            "peopleConfidence",
            PEOPLE_CONFIDENCE_RUBRIC,
            <div className="p-1 bg-rose-50 text-[#D73828] rounded-md"><Brain className="w-4 h-4" /></div>
          )}

          {/* PRACTICES Pillars */}
          <div className="border-l-2 border-[#00A1A3] pl-3 py-1 bg-slate-50/30 rounded-r-lg mt-8 mb-4">
            <h4 className="text-[10px] font-black text-[#00A1A3] uppercase tracking-wider">
              Category: PRACTICES — Shared Routines & Integration
            </h4>
          </div>

          {renderPillarGroup(
            "Pillar: PRACTICES — Collaboration & School Rituals",
            "How does the school manage internal communication, file-sharing, and administrative routines?",
            "practicesCollab",
            PRACTICES_COLLAB_RUBRIC,
            <div className="p-1 bg-teal-50 text-teal-700 rounded-md"><Users className="w-4 h-4" /></div>
          )}

          {renderPillarGroup(
            "Pillar: PRACTICES — Professional Development & Learning Pathways",
            "How does the school engage with WCED eLearning courses and self-paced modules?",
            "practicesPD",
            PRACTICES_PD_RUBRIC,
            <div className="p-1 bg-indigo-50 text-indigo-700 rounded-md"><Award className="w-4 h-4" /></div>
          )}

          {renderPillarGroup(
            "Pillar: PRACTICES — Cyber Wellness & Digital Citizenship",
            "How does the school address online safety and the Cyber Effect Ambassador program?",
            "practicesCyber",
            PRACTICES_CYBER_RUBRIC,
            <div className="p-1 bg-teal-50 text-teal-600 rounded-md"><ShieldAlert className="w-4 h-4" /></div>
          )}

          {/* PLATFORMS Pillar (School-Wide Scheduling & Access) */}
          <div className="border-l-2 border-[#D73828] pl-3 py-1 bg-slate-50/30 rounded-r-lg mt-8 mb-4">
            <h4 className="text-[10px] font-black text-[#D73828] uppercase tracking-wider">
              Category: PLATFORMS — Resource Scheduling, Rosters & Access Mechanics
            </h4>
          </div>

          {renderPillarGroup(
            "Pillar: PLATFORMS — Resource Scheduling, Rosters & Access Mechanics",
            "How are computer labs and mobile devices timetabled to support classrooms?",
            "platformsScheduling",
            PLATFORMS_SCHEDULING_RUBRIC,
            <div className="p-1 bg-rose-50 text-[#D73828] rounded-md"><Calendar className="w-4 h-4" /></div>
          )}

          {/* Walkthrough Detail Context Questions */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 md:p-4 shadow-sm space-y-4">
            <div className="flex items-center gap-1.5">
              <h4 className="text-[10px] font-bold uppercase text-slate-700 tracking-wider">
                Walkthrough Environmental Details
              </h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1.5 bg-gradient-to-r from-slate-200/55 to-transparent p-0.5 pl-1 rounded">
                  Primary Identified Barrier / Fear Factor
                </label>
                <select
                  value={data.primaryBarrier || ""}
                  onChange={(e) => updateField("primaryBarrier", e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-md focus:bg-white focus:ring-1 focus:ring-[#001489] transition bg-white outline-none cursor-pointer text-slate-700 font-medium"
                >
                  <option value="">-- Select Barrier --</option>
                  <option value="High anxiety / Fear of damaging hardware equipment">High anxiety / Fear of damaging hardware equipment</option>
                  <option value="Mock or actual physical assistance lack">Lack of immediate physical on-site technical assistance</option>
                  <option value="Overwhelming administrative and compliance workloads">Overwhelming administrative and compliance workloads</option>
                  <option value="Resistance to changing familiar paper-centric routines">Resistance to changing familiar paper-centric routines</option>
                  <option value="Leadership Vacuum: Passive SMT guidance or lack of active dashboard support">Leadership Vacuum: Passive SMT guidance or lack of active dashboard support</option>
                  <option value="Confidence Deficit: Self-doubt on personal digital fluency and lack of individual agency">Confidence Deficit: Self-doubt on personal digital fluency and lack of individual agency</option>
                  <option value="Pedagogical Rigidity: High scheduling constraints and pressure to stick only to traditional exams">Pedagogical Rigidity: High scheduling constraints and pressure to stick only to traditional exams</option>
                  <option value="Stagnation Culture: Complete absence of peer support or appetite for digital innovation">Stagnation Culture: Complete absence of peer support or appetite for digital innovation</option>
                  <option value="None - Staff highly confident and receptive to digital changes">None - Staff highly confident and receptive to digital changes</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1.5 bg-gradient-to-r from-slate-200/55 to-transparent p-0.5 pl-1 rounded">
                  Staff Collaboration Mindset & Trust (Kameraderie & Vertrouensgesindheid)
                </label>
                <select
                  value={data.collaborationChannel || ""}
                  onChange={(e) => updateField("collaborationChannel", e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-md focus:bg-white focus:ring-1 focus:ring-[#001489] transition bg-white outline-none cursor-pointer text-slate-700 font-medium"
                >
                  <option value="">-- Select Collaboration & Trust Level --</option>
                  <option value="Silos & Fear: Protectionism of materials, isolation, fear of judgements or SMT surveillance">Silos & Fear: Protectionism of materials, isolation, and fear of peer judgment</option>
                  <option value="Compliance-only Sharing: Materials are shared rigidly only under explicit top-down SMT directives">Compliance-only Sharing: Materials are shared rigidly only under explicit top-down SMT directives</option>
                  <option value="Organic Trust Circles: Informal peer networks comfortably co-planning, sharing lessons, and troubleshooting together">Organic Trust Circles: Informal peer networks comfortably co-planning, sharing lessons, and troubleshooting together</option>
                  <option value="Generative Open Culture: High professional trust with active peer-mentoring, open classrooms, and shared lesson design">Generative Open Culture: High professional trust with active peer-mentoring, open classrooms, and shared lesson design</option>
                </select>
              </div>
            </div>
          </div>

          {/* Resilience Scenario Option (Operational Resilience) */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 md:p-4 shadow-sm">
            <div className="flex items-center gap-1.5 mb-2">
              <SignalZero className="w-4 h-4 text-amber-500" />
              <h4 className="text-[10px] font-bold uppercase text-slate-700 tracking-wider">
                Diagnostic Scenario: Operational Resilience
              </h4>
            </div>
            <p className="text-[11px] text-slate-600 mb-2 leading-relaxed">
              <strong>"If the internet drops during a digital lesson delivery, how do teachers react?"</strong>
              <br />
              Select the choice that best matches the typical institutional response observed.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {SCENARIO_OPTIONS.map((opt) => {
                const checked = data.scenarioResponse === opt.value;
                return (
                  <label
                    key={opt.value}
                    className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-all duration-200 hover:scale-[1.005] flex flex-col justify-between ${
                      checked
                        ? getActiveBgColor(opt.level) + " font-semibold text-slate-900 shadow-sm"
                        : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="scenario-response"
                      value={opt.value}
                      checked={checked}
                      onChange={() => updateField("scenarioResponse", opt.value)}
                      className="sr-only"
                    />
                    <div>
                      <span className={`inline-block text-[8px] font-black px-1.5 py-0.5 rounded-md mb-1.5 ${getBadgeBg(opt.level)}`}>
                        Level {opt.level}
                      </span>
                      <p className="leading-snug text-[10px] font-medium text-slate-650">
                        {opt.label}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="mt-8 pt-4 border-t border-slate-200 flex justify-between items-center">
            <button
              onClick={onBack}
              className="bg-white border border-slate-250 hover:bg-slate-50 text-slate-700 font-bold text-xs px-4 py-2 rounded-lg transition flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BACK</span>
            </button>

            <button
              onClick={onNext}
              className="bg-[#001489] hover:bg-[#000e60] text-white font-bold text-xs px-4 py-2 rounded-lg shadow-sm hover:shadow transition flex items-center gap-1.5 cursor-pointer active:scale-95 uppercase text-center"
            >
              <span>Classroom Observation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
