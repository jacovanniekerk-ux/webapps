import { GraduationCap } from "lucide-react";

interface HeaderProps {
  onToggleRubric: () => void;
  showRubricBtn?: boolean;
}

export default function Header({ onToggleRubric, showRubricBtn = true }: HeaderProps) {
  return (
    <header className="no-print h-16 sm:h-20 bg-[#001489] text-white flex items-center justify-between px-4 sm:px-6 shrink-0 border-b-4 border-[#FFC600] shadow-md z-40 relative">
      <div className="flex items-center gap-2 sm:gap-3.5 min-w-0">
        <div className="bg-white rounded-md px-2.5 py-1.5 flex items-center justify-center shrink-0 shadow-sm border border-slate-100">
          <span className="text-[#001489] font-extrabold text-sm sm:text-lg leading-none tracking-tight">4P</span>
        </div>
        <div className="min-w-0">
          <h1 className="text-xs sm:text-base font-extrabold uppercase tracking-wider leading-tight font-display truncate">
            WCED eLearning Directorate
          </h1>
          <p className="text-[8px] sm:text-[10px] text-blue-200 uppercase font-semibold tracking-widest leading-none mt-1 truncate">
            4P Affective Transformation Model Diagnostic
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <div className="text-right hidden md:block">
          <p className="text-[10px] font-bold text-blue-100 uppercase">Digital Culture & Confidence Foundations</p>
          <p className="text-[9px] text-blue-300 font-mono">Diagnostic ID: #29384-26</p>
        </div>
        
        {showRubricBtn && (
          <button
            onClick={onToggleRubric}
            className="bg-white/10 hover:bg-white/20 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-md text-[10px] sm:text-xs font-extrabold font-display transition border border-white/20 uppercase tracking-wider cursor-pointer active:scale-95 shadow-sm shrink-0"
          >
            Rubric Guide
          </button>
        )}
      </div>
    </header>
  );
}
