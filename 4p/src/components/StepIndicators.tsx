import { Check } from "lucide-react";

interface StepIndicatorsProps {
  currentStep: number;
  onNavigateToStep: (step: number) => void;
  isValidStep1: boolean;
}

export default function StepIndicators({ currentStep, onNavigateToStep, isValidStep1 }: StepIndicatorsProps) {
  const steps = [
    { num: 1, label: "Setup", desc: "School & Advisor" },
    { num: 2, label: "Walkthrough", desc: "People & Practices" },
    { num: 3, label: "Classroom", desc: "Pedagogy & Support" },
    { num: 4, label: "Report", desc: "Bilingual Summary" },
  ];

  const handleStepClick = (stepNum: number) => {
    // Prevent navigating to later steps if step 1 metadata is incomplete
    if (stepNum > 1 && !isValidStep1) {
      return;
    }
    onNavigateToStep(stepNum);
  };

  return (
    <div className="no-print mb-8 mx-auto max-w-3xl">
      <div className="relative flex justify-between items-center px-4">
        {/* Background Track Lines */}
        <div className="absolute top-5 left-12 right-12 h-0.5 bg-slate-200 z-0">
          <div
            className="h-full bg-[#001489] transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          />
        </div>

        {steps.map((s) => {
          const isActive = currentStep === s.num;
          const isCompleted = currentStep > s.num;
          const isClickable = s.num === 1 || isValidStep1;

          return (
            <button
              key={s.num}
              onClick={() => handleStepClick(s.num)}
              disabled={!isClickable}
              className={`relative z-10 flex flex-col items-center focus:outline-none transition group cursor-pointer ${
                !isClickable ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {/* Badge Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-sm border-2 transition-all duration-300 ${
                  isCompleted
                    ? "bg-[#00A1A3] border-[#00A1A3] text-white shadow-md transform hover:scale-105"
                    : isActive
                    ? "bg-[#001489] border-[#001489] text-white ring-4 ring-blue-100 shadow-lg transform scale-110"
                    : "bg-white border-slate-300 text-slate-500 hover:border-slate-400"
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5 text-white" /> : s.num}
              </div>

              {/* Text Label */}
              <span
                className={`text-xs font-bold mt-2 transition-colors duration-200 ${
                  isActive ? "text-[#001489]" : isCompleted ? "text-[#00A1A3]" : "text-slate-500"
                }`}
              >
                {s.label}
              </span>
              
              {/* Hidden descriptive subtitle on mobile, visible on tablet+ */}
              <span className="hidden sm:inline text-[9px] text-slate-400 font-medium">
                {s.desc}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
