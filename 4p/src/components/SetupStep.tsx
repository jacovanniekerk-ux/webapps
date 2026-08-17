import React, { useState, useMemo, useRef, useEffect } from "react";
import { AdvisorDetails } from "../types";
import { DISTRICTS, SCHOOLS } from "../data/schools";
import { Search, Info, ArrowRight, Check, Plus } from "lucide-react";

interface SetupStepProps {
  data: AdvisorDetails;
  onChange: (details: AdvisorDetails) => void;
  onNext: () => void;
  showToast: (msg: string, type?: "success" | "error") => void;
}

export default function SetupStep({
  data,
  onChange,
  onNext,
  showToast,
}: SetupStepProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [manualSchoolMode, setManualSchoolMode] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter school based on search term
  const filteredSchools = useMemo(() => {
    if (!searchTerm.trim()) return SCHOOLS;
    const term = searchTerm.toLowerCase();
    return SCHOOLS.filter(s => s.toLowerCase().includes(term));
  }, [searchTerm]);

  const updateField = (key: keyof AdvisorDetails, value: any) => {
    onChange({
      ...data,
      [key]: value,
    });
  };

  const updateProject = (key: keyof AdvisorDetails["activeProjects"], value: any) => {
    onChange({
      ...data,
      activeProjects: {
        ...data.activeProjects,
        [key]: value,
      },
    });
  };

  const updateHardware = (key: keyof AdvisorDetails["infrastructure"], value: boolean) => {
    onChange({
      ...data,
      infrastructure: {
        ...data.infrastructure,
        [key]: value,
      },
    });
  };

  const selectSchool = (schoolName: string) => {
    updateField("schoolName", schoolName);
    setSearchTerm(schoolName);
    setIsDropdownOpen(false);
  };

  const triggerNext = () => {
    if (!data.advisorName.trim()) {
      showToast("Please enter the Advisor's name before proceeding", "error");
      return;
    }
    if (!data.schoolName.trim()) {
      showToast("Please select or type a school name", "error");
      return;
    }
    if (!data.district) {
      showToast("Please select a District / Circuit", "error");
      return;
    }
    onNext();
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      {/* Title block */}
      <div className="border-b border-slate-100 pb-3 mb-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black font-display text-slate-900 tracking-tight uppercase">
            1. Institutional & Advisor Context
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Identify the core context to begin the diagnostic evaluation.
          </p>
        </div>
        
        {/* Helper info tag */}
        <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg max-w-sm">
          <Info className="w-4 h-4 text-[#007DBA] shrink-0" />
          <span className="text-[10px] text-blue-900 font-medium leading-snug">
            These attributes configure the diagnostic signature blocks and print headers.
          </span>
        </div>
      </div>

      {/* Inputs Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Advisor name */}
        <div className="md:col-span-2">
          <label className="block text-[10px] font-bold tracking-wider uppercase text-slate-505 mb-1 bg-gradient-to-r from-slate-200 to-transparent p-0.5 pl-1 rounded">
            eLearning Advisor Full Name
          </label>
          <input
            type="text"
            value={data.advisorName}
            onChange={(e) => updateField("advisorName", e.target.value)}
            placeholder="e.g. Samuel Bouwers"
            className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white outline-none focus:ring-1 focus:ring-[#001489] transition duration-150"
          />
        </div>

        {/* School Dropdown Choice */}
        <div ref={dropdownRef} className="relative">
          <div className="flex justify-between items-center mb-1">
            <label className="block text-[10px] font-bold tracking-wider uppercase text-slate-505 bg-gradient-to-r from-slate-200 to-transparent p-0.5 pl-1 rounded flex-grow">
              School Name
            </label>
            <button
              type="button"
              onClick={() => {
                setManualSchoolMode(!manualSchoolMode);
                updateField("schoolName", "");
                setSearchTerm("");
              }}
              className="text-[10px] text-[#007DBA] hover:underline font-extrabold flex items-center gap-0.5 cursor-pointer ml-2"
            >
              {manualSchoolMode ? "Use Official List" : "Type manually"}
            </button>
          </div>

          {!manualSchoolMode ? (
            <div className="relative">
              <div className="relative flex items-center">
                <Search className="absolute left-3 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search Western Cape School..."
                  value={data.schoolName ? data.schoolName : searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    updateField("schoolName", e.target.value);
                    setIsDropdownOpen(true);
                  }}
                  onFocus={() => setIsDropdownOpen(true)}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs focus:bg-white outline-none focus:ring-1 focus:ring-[#001489] transition duration-150 bg-slate-50"
                />
              </div>

              {/* Selection Dropdown List */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white border border-slate-200 rounded-lg shadow-lg z-50 py-1 text-[11px]">
                  {filteredSchools.length > 0 ? (
                    filteredSchools.map((school, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => selectSchool(school)}
                        className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 font-medium transition-colors duration-150 flex items-center justify-between ${
                          data.schoolName === school ? "bg-blue-50 text-[#001489] font-bold" : "text-slate-700"
                        }`}
                      >
                        <span>{school}</span>
                        {data.schoolName === school && <Check className="w-3 h-3 text-[#001489]" />}
                      </button>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-slate-400 text-center font-medium">
                      {"No schools match search. "}
                      <button
                        type="button"
                        onClick={() => setManualSchoolMode(true)}
                        className="text-[#001489] font-bold underline cursor-pointer"
                      >
                        Type manually
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <input
              type="text"
              value={data.schoolName}
              onChange={(e) => updateField("schoolName", e.target.value)}
              placeholder="e.g. Diaz Primary School"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#001489] transition duration-150 bg-slate-50 focus:bg-white"
            />
          )}
        </div>

        {/* District Choice */}
        <div>
          <label className="block text-[10px] font-bold tracking-wider uppercase text-slate-505 mb-1 bg-gradient-to-r from-slate-200 to-transparent p-0.5 pl-1 rounded">
            District / Circuit
          </label>
          <select
            value={data.district}
            onChange={(e) => updateField("district", e.target.value)}
            className="w-full text-xs px-3 py-2 border border-slate-205 rounded-lg bg-slate-50 focus:bg-white outline-none focus:ring-1 focus:ring-[#001489] cursor-pointer transition duration-150"
          >
            <option value="">-- Select District --</option>
            {DISTRICTS.map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Date field */}
        <div>
          <label className="block text-[10px] font-bold tracking-wider uppercase text-slate-505 mb-1 bg-gradient-to-r from-slate-200 to-transparent p-0.5 pl-1 rounded">
            Date of Visit
          </label>
          <input
            type="date"
            value={data.visitDate}
            onChange={(e) => updateField("visitDate", e.target.value)}
            className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white outline-none focus:ring-1 focus:ring-[#001489] transition duration-150"
          />
        </div>

        {/* Active projects checkboxes */}
        <div>
          <label className="block text-[10px] font-bold tracking-wider uppercase text-slate-505 mb-1 bg-gradient-to-r from-slate-200 to-transparent p-0.5 pl-1 rounded">
            Active Digital Intervention Models
          </label>
          <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-150">
            <label className="flex items-center space-x-2 text-[11px] text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={data.activeProjects.mco}
                onChange={(e) => updateProject("mco", e.target.checked)}
                className="rounded border-slate-300 w-3.5 h-3.5 text-[#001489] focus:ring-[#001489]"
              />
              <span className="font-semibold truncate">MCO (Maths)</span>
            </label>

            <label className="flex items-center space-x-2 text-[11px] text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={data.activeProjects.backOnTrack}
                onChange={(e) => updateProject("backOnTrack", e.target.checked)}
                className="rounded border-slate-300 w-3.5 h-3.5 text-[#001489] focus:ring-[#001489]"
              />
              <span className="font-semibold truncate">Back-on-Track</span>
            </label>

            <label className="flex items-center space-x-2 text-[11px] text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={data.activeProjects.other}
                onChange={(e) => updateProject("other", e.target.checked)}
                className="rounded border-slate-300 w-3.5 h-3.5 text-[#001489] focus:ring-[#001489]"
              />
              <span className="font-semibold truncate">Other Project</span>
            </label>
          </div>

          {data.activeProjects.other && (
            <div className="mt-1.5">
              <input
                type="text"
                placeholder="Specify other intervention..."
                value={data.activeProjects.otherValue}
                onChange={(e) => updateProject("otherValue", e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 border border-slate-200 bg-white rounded-md focus:ring-1 focus:ring-[#001489] outline-none"
              />
            </div>
          )}
        </div>

        {/* Infrastructure support options */}
        <div className="md:col-span-2">
          <label className="block text-[10px] font-bold tracking-wider uppercase text-slate-505 mb-1.5 bg-gradient-to-r from-slate-200 to-transparent p-0.5 pl-1 rounded">
            Infrastructure Context Configurations
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: "slimLabs" as const, label: "SLIM Labs" },
              { id: "catItEgdLabs" as const, label: "CAT/IT/EGD Labs" },
              { id: "internetConnection" as const, label: "Internet Connection" },
              { id: "smartClassroom" as const, label: "Smart Classroom" },
            ].map((infra) => (
              <label
                key={infra.id}
                className={`flex flex-col p-2.5 rounded-lg border text-center transition-all duration-150 cursor-pointer select-none ${
                  data.infrastructure[infra.id]
                    ? "border-[#001489] bg-blue-50 text-[#001489] font-bold"
                    : "border-slate-200 hover:bg-slate-50 text-slate-600 bg-slate-50/20"
                }`}
              >
                <input
                  type="checkbox"
                  checked={data.infrastructure[infra.id]}
                  onChange={(e) => updateHardware(infra.id, e.target.checked)}
                  className="sr-only"
                />
                <span className="text-xs">{infra.label}</span>
                <span className="text-[9px] text-slate-400 font-normal mt-0.5">
                  {data.infrastructure[infra.id] ? "CONNECTED" : "ABSENT"}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Primary Buttons Layout */}
      <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
        {/* Main Progression Button */}
        <button
          onClick={triggerNext}
          className="w-full sm:w-auto bg-[#001489] hover:bg-[#000e60] text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition duration-150 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 text-center uppercase"
        >
          <span>Begin Walkthrough</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
