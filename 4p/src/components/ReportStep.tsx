import { useState } from "react";
import { AdvisorDetails, CultureAssessment } from "../types";
import {
  PEOPLE_SAFETY_RUBRIC,
  PEOPLE_CONFIDENCE_RUBRIC,
  PRACTICES_COLLAB_RUBRIC,
  PRACTICES_PD_RUBRIC,
  PRACTICES_CYBER_RUBRIC,
  PEDAGOGY_DESIGN_RUBRIC,
  PEDAGOGY_AGENCY_RUBRIC,
  PEDAGOGY_INCLUSIVITY_RUBRIC,
  PLATFORMS_SCHEDULING_RUBRIC,
  PLATFORMS_INTEGRATION_RUBRIC,
  SCENARIO_OPTIONS
} from "../data/rubrics";
import {
  Printer,
  Copy,
  RotateCcw,
  Sparkles,
  Award,
  BookOpen,
  ArrowLeft,
  Users,
  Building,
  Calendar,
  Layers,
  Sliders,
  Terminal,
  Clock,
  Compass,
  CheckCircle,
} from "lucide-react";

interface ReportStepProps {
  advisor: AdvisorDetails;
  assessment: CultureAssessment;
  onChangeAssessment: (assessment: CultureAssessment) => void;
  onBack: () => void;
  onReset: () => void;
  showToast: (msg: string, type?: "success" | "error") => void;
}

export default function ReportStep({
  advisor,
  assessment,
  onChangeAssessment,
  onBack,
  onReset,
  showToast,
}: ReportStepProps) {
  // Destructure all 10+ pillars
  const {
    peopleSafety,
    peopleConfidence,
    practicesCollab,
    practicesPD,
    practicesCyber,
    pedagogyDesign,
    pedagogyAgency,
    pedagogyInclusivity,
    platformsScheduling,
    platformsIntegration,
    platformsEportal = assessment.platformsIntegration || 1,
    scenarioResponse
  } = assessment;

  const classroomsList = assessment.classrooms || [];

  // Calculate average rating across all observed classrooms for pedagogy and platforms
  let pedagogyDesignAvg = pedagogyDesign;
  let pedagogyAgencyAvg = pedagogyAgency;
  let pedagogyInclusivityAvg = pedagogyInclusivity;
  let platformsSchedulingAvg = platformsScheduling;
  let platformsIntegrationAvg = platformsIntegration;
  let platformsEportalAvg = platformsEportal;

  if (classroomsList.length > 0 && !assessment.onlyWalkthrough) {
    const count = classroomsList.length;
    let designSum = 0;
    let agencySum = 0;
    let inclusivitySum = 0;
    let schedulingSum = 0;
    let integrationSum = 0;
    let eportalSum = 0;

    classroomsList.forEach(cls => {
      designSum += cls.pedagogyDesign || 1;
      agencySum += cls.pedagogyAgency || 1;
      inclusivitySum += cls.pedagogyInclusivity || 1;
      schedulingSum += cls.platformsScheduling || 1;
      integrationSum += cls.platformsIntegration || 1;
      eportalSum += cls.platformsEportal || cls.platformsIntegration || 1;
    });

    pedagogyDesignAvg = designSum / count;
    pedagogyAgencyAvg = agencySum / count;
    pedagogyInclusivityAvg = inclusivitySum / count;
    platformsSchedulingAvg = schedulingSum / count;
    platformsIntegrationAvg = integrationSum / count;
    platformsEportalAvg = eportalSum / count;
  }

  // Calculate scores per Category (each of the 4 Pillars)
  const peopleRating = assessment.onlyClassroom ? 0 : (peopleSafety + peopleConfidence) / 2;
  const practicesRating = assessment.onlyClassroom ? 0 : (practicesCollab + practicesPD + practicesCyber) / 3;
  const pedagogyRating = assessment.onlyWalkthrough ? 0 : (pedagogyDesignAvg + pedagogyAgencyAvg + pedagogyInclusivityAvg) / 3;
  const platformsRating = assessment.onlyWalkthrough 
    ? platformsScheduling 
    : assessment.onlyClassroom 
      ? (platformsIntegrationAvg + platformsEportalAvg) / 2 
      : (platformsSchedulingAvg + platformsIntegrationAvg + platformsEportalAvg) / 3;
  
  // Calculate final balanced composite score average
  let scoreAverage = 0;
  if (assessment.onlyWalkthrough) {
    scoreAverage = (peopleRating + practicesRating + platformsRating) / 3;
  } else if (assessment.onlyClassroom) {
    scoreAverage = (pedagogyRating + platformsRating) / 2;
  } else {
    scoreAverage = (peopleRating + practicesRating + pedagogyRating + platformsRating) / 4;
  }
  
  const buildDynamicContext = (avg: number, isEnglish: boolean) => {
    let levelMeaning = "";
    let levelMeaningAfr = "";
    
    if (avg <= 1.5) {
      levelMeaning = "The school is operating within the 'Withdraw' digital culture level. Digital change may currently be experienced as pressure rather than opportunity, with low confidence, fatigue, uncertainty or resistance among some staff members. Technology may be available, but its use is limited, inconsistent or mainly focused on administration, presentations and basic teacher-led activities. Leadership may recognise the importance of digital transformation but may not yet have clear structures, roles or routines to support it. Teachers may work largely on their own, with little peer or leadership support or sharing of digital practices, while learners have limited opportunities to use technology actively for learning, collaboration or creation. Existing platforms and devices may also be underused because of access challenges, technical difficulties, low confidence or uncertainty about how they support teaching. Cyber wellness, responsible digital behaviour and online safety may be addressed only when problems arise rather than as part of everyday school culture.\n\nThe priority at this level is to rebuild confidence, trust and readiness for digital change. Teachers need patient, practical support, simple entry points, reliable access to basic digital tools and opportunities to experience small successes that reduce anxiety and encourage participation.";
      levelMeaningAfr = "Die skool funksioneer binne die 'Withdraw' (Onttrek) digitale kultuurvlak. Digitale verandering word tans moontlik as druk eerder as 'n geleentheid ervaar, met lae selfvertroue, moegheid, onsekerheid of weerstand onder sommige personeellede. Tegnologie mag beskikbaar wees, maar die gebruik daarvan is beperk, inkonsekwent of hoofsaaklik gefokus op administrasie, aanbiedings en basiese onderwyser-geleide aktiwiteite. Skoolleierskap mag die belangrikheid van digitale transformasie erken, maar beskik moontlik nog nie oor duidelike strukture, rolle of roetines om dit te ondersteun nie. Onderwysers werk grootliks op hul eie, met min portuur- of leierskapsondersteuning of deling van digitale praktyke, terwyl leerders beperkte geleenthede het om tegnologie aktief vir leer, samewerking of skepping te gebruik. Bestaande platforms en toestelle word moontlik ook onderbenut weens toegangsuitdagings, tegniese probleme, lae selfvertroue of onsekerheid oor hoe dit onderrig ondersteun. Kuberwelstand, verantwoordelike digitale gedrag en aanlynveiligheid word dikwels slegs aangespreek wanneer probleme opduik, eerder as deel van die alledaagse skoolkultuur.\n\nDie prioriteit op hierdie vlak is om selfvertroue, vertroue en gereedheid vir digitale verandering te herbou. Onderwysers benodig geduldige, praktiese ondersteuning, eenvoudige toetreedrempels, betroubare toegang tot basiese digitale gereedskap en geleenthede om klein suksesse te beleef wat angs verminder en deelname aanmoedig.";
    } else if (avg <= 2.5) {
      levelMeaning = "The school is operating within the 'Stabilise' digital culture level. There is growing acceptance of technology and greater willingness among staff to use digital tools, although confidence and practice remain uneven across the school. Some teachers are beginning to use technology more regularly for teaching, assessment, communication and administration, while others remain dependent on familiar or traditional approaches. Leadership structures are beginning to support digital practice, but expectations, responsibilities and routines may not yet be consistently understood or applied. Available devices and platforms are being used more often, although their use may still focus on improving existing practices rather than changing how learners engage with learning. Collegial support may be emerging, but digital knowledge often remains concentrated among a small number of confident teachers or ICT champions. Cyber wellness and responsible technology use are increasingly recognised, although these practices may still sit alongside the curriculum rather than being embedded within school culture.\n\nThe priority at this level is to build consistency and strengthen everyday practice. Teachers need practical support, shared routines, guidance and learning opportunities to use digital tools confidently as part of normal teaching, assessment, communication and administration.";
      levelMeaningAfr = "Die skool funksioneer binne die 'Stabilise' (Stabiliseer) digitale kultuurvlak. Daar is 'n toenemende aanvaarding van tegnologie en 'n groter bereidwilligheid onder personeel om digitale gereedskap te gebruik, alhoewel selfvertroue en praktyk steeds ongelykmatig oor die skool versprei is. Sommige onderwysers begin tegnologie meer gereeld gebruik vir onderrig, assessering, kommunikasie en administrasie, terwyl ander afhanklik bly van bekende of tradisionele benaderings. Leierskapstrukture begin digitale praktyk ondersteun, maar verwagtinge, verantwoordelikhede en roetines word moontlik nog nie konsekwent verstaan of toegepas nie. Beskikbare toestelle en platforms word meer dikwels gebruik, alhoewel die fokus steeds kan wees op die verbetering van bestaande praktyke eerder as om te verander hoe leerders met leer omgaan. Kollegiale ondersteuning begin na vore kom, maar digitale kennis bly dikwels gekonsentreer by 'n klein aantal selfversekerde onderwysers of IKT-kampioene. Kuberwelstand en verantwoordelike tegnologiegebruik word toenemend erken, alhoewel hierdie praktyke moontlik nog langs die kurrikulum staan eerder as om in die skoolkultuur ingebed te wees.\n\nDie prioriteit op hierdie vlak is om konsekwentheid te bou en alledaagse praktyk te versterk. Onderwysers benodig praktiese ondersteuning, gedeelde roetines, leiding en leergeleenthede om digitale gereedskap met selfvertroue te gebruik as deel van normale onderrig, assessering, kommunikasie en administrasie.";
    } else if (avg <= 3.5) {
      levelMeaning = "The school is operating within the 'Explore' digital culture level. There is visible confidence, curiosity and willingness to experiment with different digital approaches, and examples of strong practice are emerging across classrooms, departments or phases. Teachers are beginning to move beyond basic technology use towards collaboration, learner participation, digital assessment, differentiated learning, research and content creation. Learners have more opportunities to use technology actively rather than simply receive information from a screen. Leadership is increasingly involved in shaping digital priorities and encouraging professional learning, while teachers are beginning to share resources, ideas and experiences with one another. However, strong practice may still depend on particular teachers, champions or departments, and approaches may not yet be consistent across the whole school. Platforms and infrastructure are generally used more purposefully, but the school may still need stronger systems for coordination, monitoring and sharing. Cyber wellness, digital citizenship, AI awareness and responsible online behaviour are beginning to form part of broader teaching and school conversations.\n\nThe priority at this level is to deepen practice and connect emerging areas of strength. Teachers need opportunities to collaborate, share successful approaches, experiment with more learner-centred digital practices and build greater consistency across subjects, phases and departments.";
      levelMeaningAfr = "Die skool funksioneer binne die 'Explore' (Verken) digitale kultuurvlak. Daar is sigbare selfvertroue, nuuskierigheid en bereidwilligheid om met verskillende digitale benaderings te eksperimenteer, en voorbeelde van sterk praktyk kom na vore oor klaskamers, departemente of fases heen. Onderwysers begin verby basiese tegnologiegebruik beweeg na samewerking, leerderdeelname, digitale assessering, gedifferensieerde leer, navorsing en inhoudskepping. Leerders kry meer geleenthede om tegnologie aktief te gebruik eerder as om net passief inligting vanaf 'n skerm te ontvang. Leierskap is toenemend betrokke by die vorming van digitale prioriteite en die aanmoediging van professionele ontwikkeling, terwyl onderwysers hulpbronne, idees en ervarings met mekaar begin deel. Sterk praktyk kan egter steeds van spesifieke onderwysers, kampioene of departemente afhang, en benaderings is moontlik nog nie konsekwent regoor die hele skool nie. Platforms en infrastruktuur word oor die algemeen meer doelgerig gebruik, maar die skool benodig moontlik steeds sterker stelsels vir koördinering, monitering en deling. Kuberwelstand, digitale burgerskap, KI-bewustheid en verantwoordelike aanlyngedrag begin deel vorm van breër onderrig- en skoolgesprekke.\n\nDie prioriteit op hierdie vlak is om praktyk te verdiep en opkomende areas van sterkte te verbind. Onderwysers benodig geleenthede om saam te werk, suksesvolle benaderings te deel, te eksperimenteer met meer leerdergesentreerde digitale praktyke en groter konsekwentheid oor vakke, fases en departemente heen te bou.";
    } else {
      levelMeaning = "The school is operating within the 'Lead' digital culture level. Digital practice is embedded across the institution and forms part of the normal way the school teaches, learns, communicates, manages information and improves its practice. Leadership provides clear direction while responsibility for digital transformation is distributed across teachers, departments and school structures. Teachers confidently select technology according to learning needs and use it to support collaboration, creativity, assessment, differentiation, inquiry and problem solving. Learners are active digital participants who create, investigate, communicate and take increasing responsibility for their learning. Teachers regularly learn from one another, mentor colleagues and adapt their practice based on evidence and reflection. Platforms, devices and digital systems are managed purposefully and support both learning and school operations rather than operating as separate technology initiatives. Cyber wellness, responsible digital citizenship, ethical AI use, professional boundaries and online behaviour form part of the school's wider culture and expectations. The school is also able to document its practice, measure impact and share successful approaches with other schools.\n\nThe priority at this level is to sustain strong practice, deepen impact and extend digital leadership. Teachers and school leaders need opportunities to refine innovative practice, strengthen learner agency, use evidence to guide improvement, mentor others and share successful approaches across the wider school community and beyond.";
      levelMeaningAfr = "Die skool funksioneer binne die 'Lead' (Lei) digitale kultuurvlak. Digitale praktyk is ingebed regoor die instelling en vorm deel van die normale manier waarop die skool onderrig, leer, kommunikeer, inligting bestuur en sy praktyk verbeter. Leierskap bied duidelike rigting terwyl verantwoordelikheid vir digitale transformasie versprei is oor onderwysers, departemente en skoolstrukture heen. Onderwysers kies tegnologie met selfvertroue volgens leerbehoeftes en gebruik dit om samewerking, kreatiwiteit, assessering, differensiasie, ondersoekende leer en probleemoplossing te ondersteun. Leerders is aktiewe digitale deelnemers wat skep, ondersoek, kommunikeer en toenemende verantwoordelikheid vir hul eie leer aanvaar. Onderwysers leer gereeld van mekaar, tree op as mentors vir kollegas en pas hul praktyk aan op grond van bewyse en refleksie. Platforms, toestelle en digitale stelsels word doelgerig bestuur en ondersteun beide leer en skoolbedrywighede eerder as om as afsonderlike tegnologie-inisiatiewe te funksioneer. Kuberwelstand, verantwoordelike digitale burgerskap, etiese KI-gebruik, professionele grense en aanlyngedrag vorm deel van die skool se breër kultuur en verwagtinge. Die skool is ook in staat om sy praktyk te dokumenteer, impak te meet en suksesvolle benaderings met ander skole te deel.\n\nDie prioriteit op hierdie vlak is om sterk praktyk te handhaaf, impak te verdiep en digitale leierskap uit te brei. Onderwysers en skoolleiers benodig geleenthede om innoverende praktyk te verfyn, leerder-agentskap te versterk, bewyse te gebruik om verbetering te rig, ander te mentor en suksesvolle benaderings met die breër skoolgemeenskap en verder te deel.";
    }

    const hwList: string[] = [];
    const hwListAfr: string[] = [];
    if (advisor.infrastructure.slimLabs) { hwList.push("SLIM Smart Labs"); hwListAfr.push("SLIM Smart Rekenaarlokale"); }
    if (advisor.infrastructure.catItEgdLabs) { hwList.push("CAT/IT/EGD Computer Labs"); hwListAfr.push("RTT/IT/IGO rekenaarlokale"); }
    if (advisor.infrastructure.internetConnection) { hwList.push("functional Internet connectivity"); hwListAfr.push("werkende internetverbinding"); }
    if (advisor.infrastructure.smartClassroom) { hwList.push("Smart Classroom setups"); hwListAfr.push("Slimklaskamer-hulpbronne"); }

    let hwContext = "";
    let hwContextAfr = "";
    if (hwList.length > 0) {
      hwContext = `With physical access to ${hwList.join(", ")}, the hardware foundation is robust; however, converting physical infrastructure into active pedagogical flow requires lowering academic performance anxieties.`;
      hwContextAfr = `Met toegang tot ${hwListAfr.join(", ")}, is die fisiese hulpbronne gevestig; die oorgang na aktiewe pedagogiese integrasie vereis egter dat akademiese angs verlaag word.`;
    } else {
      hwContext = "The lack of established, high-capacity hardware assets indicates that digital integration must focus on offline-first resources, high-impact administrative shortcuts, and teacher-centric mobile workflows.";
      hwContextAfr = "Die gebrek aan hoë-kapasiteit hardeware bates beteken dat digitale rypwording moet fokus op vanlyn-eerste platforms en onderwyser-sentriese selfoon-werkstrome.";
    }

    let obsDetails = "";
    let obsDetailsAfr = "";
    const nameStr = assessment.teacherName ? (isEnglish ? `teacher ${assessment.teacherName}` : `onderwyser ${assessment.teacherName}`) : "";
    const subStr = assessment.subjectObserved ? (isEnglish ? ` in ${assessment.subjectObserved}` : ` in ${assessment.subjectObserved}`) : "";
    const grStr = assessment.gradeObserved ? (isEnglish ? ` (Grade ${assessment.gradeObserved})` : ` (Graad ${assessment.gradeObserved})`) : "";
    const topStr = assessment.lessonTopic ? (isEnglish ? `, delivering a lesson on '${assessment.lessonTopic}',` : `, wat 'n les oor '${assessment.lessonTopic}' aanbied,`) : "";

    if (nameStr || subStr || topStr) {
      obsDetails = `During the walkthrough with ${nameStr || "the teacher"}${subStr}${grStr}${topStr} we captured valuable field highlights: `;
      obsDetailsAfr = `Tydens die klaskamerbesoek met ${nameStr || "die onderwyser"}${subStr}${grStr}${topStr} is waardevolle veldinligting vasgevang: `;
    }

    let toolsAndArts = "";
    let toolsAndArtsAfr = "";
    const activeTools = assessment.toolsUsed && assessment.toolsUsed !== "N/A" && assessment.toolsUsed.trim() !== "";
    const activeArtifact = assessment.artifactVerified && assessment.artifactVerified !== "N/A" && assessment.artifactVerified.trim() !== "";

    if (activeTools) {
      toolsAndArts += `The current implementation of "${assessment.toolsUsed}" `;
      toolsAndArtsAfr += `Die huidige gebruik van "${assessment.toolsUsed}" `;
    } else {
      toolsAndArts += `The absence of active digital tools during current lessons `;
      toolsAndArtsAfr += `Die gebrek aan aktiewe digitale hulpmiddels in huidige lesse `;
    }

    if (activeArtifact) {
      toolsAndArts += `is coupled with a verified Learner Digital Artefact ("${assessment.artifactVerified}"). This serves as undeniable, high-quality proof of active learner agency and hands-on digital creation rather than passive observation. `;
      toolsAndArtsAfr += `is gekoppel aan 'n geverifieerde digitale werkstuk deur leerders ("${assessment.artifactVerified}"). Dit dien as onweerlegbare bewys van leerder-agentskap en skeppende tegnologieverbruik deur die leerders self. `;
    } else {
      toolsAndArts += `indicates that lesson engagement remains centred on teacher-delivery. Shifting from whiteboards to requiring learners to compile their own digital artefacts is the key strategic recommendation to bridge this gap. `;
      toolsAndArtsAfr += `dui daarop dat lesbetrokkenheid onderwysersentries bly. Die oorgang van projeksieborde na praktiese leerder-skeppings is die belangrikste aanbeveling om hierdie gaping te oorbrug. `;
    }

    let projectsPart = "";
    let projectsPartAfr = "";
    const projNames: string[] = [];
    if (advisor.activeProjects.mco) projNames.push("MCO (Maths)");
    if (advisor.activeProjects.backOnTrack) projNames.push("Back-on-Track");
    if (advisor.activeProjects.other && advisor.activeProjects.otherValue) projNames.push(advisor.activeProjects.otherValue);

    if (projNames.length > 0) {
      projectsPart += `As part of the active WCED ${projNames.join(" and ")} intervention, `;
      projectsPartAfr += `As deel van die aktiewe NKOD behoeftes van ${projNames.join(" en ")}, `;
    }

    if (assessment.teacherUpskilling && assessment.teacherUpskilling !== "N/A" && assessment.teacherUpskilling.trim() !== "") {
      projectsPart += `the teacher upskilling milestone ("${assessment.teacherUpskilling}") is highly strategic. `;
      projectsPartAfr += `is die onderwyser se professionalisering-doelwit ("${assessment.teacherUpskilling}") strategies hoogs belyn. `;
    }

    if (assessment.advisorSupport && assessment.advisorSupport !== "N/A" && assessment.advisorSupport.trim() !== "") {
      projectsPart += `To execute the in-class suggestions ("${assessment.advisorSupport}"), focus must shift entirely from compliance oversight to high-reward technical wins that protect teacher wellness.`;
      projectsPartAfr += `Om die inklas-ondersteuning ("${assessment.advisorSupport}") suksesvol uit te voer, moet die fokus verskuif na lae-risiko sielkundige suksesse wat onderwyser-welstand beskerm.`;
    } else {
      projectsPart += `Nurturing this ecosystem demands continuous, low-pressure support rather than administrative audits.`;
      projectsPartAfr += `Om hierdie ekosisteem te koester, vereis dit deurlopende ondersteuning met lae druk in plaas van administratiewe oudits.`;
    }

    const obsContext = [obsDetails, toolsAndArts, projectsPart].filter(Boolean).join("").trim();
    const obsContextAfr = [obsDetailsAfr, toolsAndArtsAfr, projectsPartAfr].filter(Boolean).join("").trim();

    const enResult = obsContext ? `${levelMeaning}\n\n${hwContext} ${obsContext}` : levelMeaning;
    const afrResult = obsContextAfr ? `${levelMeaningAfr}\n\n${hwContextAfr} ${obsContextAfr}` : levelMeaningAfr;

    return isEnglish ? enResult : afrResult;
  };

  const [reportLang, setReportLang] = useState<"en" | "afr">("en");

  // Archetype mapper based on overall score average
  const getArchetypeInfo = (avg: number) => {
    if (avg <= 1.5) {
      return {
        levelNum: 1,
        name: "Withdraw",
        nameAfr: "Onttrek",
        tagline: "Low trust, uncertainty, fatigue and limited digital readiness",
        taglineAfr: "Lae vertroue, onsekerheid, moegheid en beperkte digitale gereedheid",
        levelKey: "Withdraw" as const,
        color: "#890C58",
        headerColor: "text-[#890C58]",
        bannerBg: "bg-[#890C58]",
        bannerText: "text-white",
        pillBg: "bg-[#890C58]/10 text-[#890C58] border-[#890C58]/30",
        cardBg: "bg-[#890C58]/5 border-[#890C58]/20",
        cardBorder: "border-[#890C58]/30",
        badgeBg: "bg-[#890C58]/10 text-[#890C58] border-[#890C58]/30",
        lightBg: "bg-fuchsia-50/50",
        accentBorder: "border-l-4 border-l-[#890C58]",
        ruleNumBg: "bg-[#890C58] text-white",
        ruleTitleColor: "text-[#890C58]",
        bgClass: "bg-[#890C58]/10 text-[#890C58] border-[#890C58]/20",
        description: "Prioritise psychological safety and basic user confidence. SMT should foster trust and support staff on emotional levels before mandating compliance targets.",
        descriptionAfr: "Prioritiseer sielkundige veiligheid en basiese gebruikervertroue. Die bestuurspan (SMT) moet eers emosionele ondersteuning bied voordat harde doelwitte afgedwing word.",
        affectiveDiagnosisContext: buildDynamicContext(avg, true),
        affectiveDiagnosisContextAfr: buildDynamicContext(avg, false),
        strategicMatrix: {
          title: "Strategic Matrix: Operational Evidence to Affective & Cultural Insight : Withdrawal",
          titleAfr: "Strategiese Matriks: Operasionele Bewyse na Affektiewe & Kulturele Insig : Onttrekking",
          operationalSignals: "Low or irregular use of available technology; limited transfer from training into classroom practice; learner digital participation is minimal; digital expertise may depend on one or two people; equipment or platforms may remain underused.",
          operationalSignalsAfr: "Lae of onreëlmatige gebruik van beskikbare tegnologie; beperkte oordrag van opleiding na klaskamerpraktyk; minimale leerder digitale deelname; digitale kundigheid hang af van een of twee persone; toerusting of platforms bly onderbenut.",
          affectiveInsight: "The pattern may indicate low confidence, fatigue, uncertainty, poor previous experiences, weak support or a sense that digital change is being imposed rather than owned.",
          affectiveInsightAfr: "Die patroon dui moontlik op lae selfvertroue, moegheid, onsekerheid, swak vorige ervarings, beperkte ondersteuning of 'n gevoel dat digitale verandering afgedwing word eerder as eienaarskap geneem word.",
          affectiveReading: "Low trust, uncertainty, fatigue, anxiety, dependency and limited readiness.",
          affectiveReadingAfr: "Lae vertroue, onsekerheid, moegheid, angs, afhanklikheid en beperkte gereedheid."
        },
        advisoryCheck: {
          question: "What is driving the low participation?",
          questionAfr: "Wat dryf die lae deelname?",
          detail: "Check whether the barrier is confidence, workload, access, technical difficulty, previous negative experiences, unclear expectations or lack of support.",
          detailAfr: "Kyk of die hindernis selfvertroue, werkslading, toegang, tegniese probleme, vorige negatiewe ervarings, onduidelike verwagtinge of gebrek aan ondersteuning is."
        },
        criticalAdvisoryLens: "Operational data may show low device use, limited participation, poor platform activity or little evidence of digital integration, but these figures do not explain why staff are disengaging. Low participation may be linked to fatigue, fear of failure, previous negative experiences, limited confidence, weak support or a sense that technology creates more work.\n\nThe advisor should therefore avoid interpreting low activity as simple resistance or non-compliance. Support should first rebuild trust, reduce pressure and create manageable opportunities for teachers to experience success. At this level, understanding the human barrier is as important as addressing the technical one.",
        criticalAdvisoryLensAfr: "Operasionele data toon moontlik lae toestelgebruik, beperkte deelname, minimale platformaktiwiteit of min bewyse van digitale integrasie, maar hierdie syfers verduidelik nie waarom personeel ontkoppel nie. Lae deelname kan gekoppel wees aan moegheid, vrees vir mislukking, vorige negatiewe ervarings, beperkte selfvertroue, swak ondersteuning of 'n gevoel dat tegnologie ekstra werkslading skep.\n\nDie adviseur moet dus vermy om lae aktiwiteit as blote weerstand of nienakoming te interpreteer. Ondersteuning moet eers vertroue herbou, druk verminder en hanteerbare geleenthede skep vir onderwysers om sukses te ervaar. Op hierdie vlak is begrip vir die menslike hindernis net so belangrik as die hantering van die tegniese hindernis.",
        strategicActionRules: [
          {
            num: "1",
            rule: "Support Before Scrutiny",
            ruleAfr: "Ondersteuning Voor Ondersoek",
            text: "Keep the walk low-pressure and supportive. Look for barriers, uncertainty and small signs of participation rather than focusing first on what is missing.",
            textAfr: "Hou die besoek lae-druk en ondersteunend. Soek na hindernisse, onsekerheid en klein tekens van deelname eerder as om dadelik te fokus op wat ontbreek."
          },
          {
            num: "2",
            rule: "Simplify Before Expanding",
            ruleAfr: "Vereenvoudig Voor Uitbreiding",
            text: "Focus on one or two practical digital practices that teachers can use confidently before introducing additional tools, platforms or expectations.",
            textAfr: "Fokus op een of twee praktiese digitale praktyke wat onderwysers met selfvertroue kan gebruik voordat bykomende gereedskap, platforms of verwagtinge ingestel word."
          },
          {
            num: "3",
            rule: "Notice the Small Wins",
            ruleAfr: "Erken die Klein Sukseste",
            text: "Identify and affirm small examples of progress, even where they appear basic. Use these successes to rebuild confidence and willingness to try again.",
            textAfr: "Identifiseer en bevestig klein voorbeelde van vordering, selfs al lyk dit basies. Gebruik hierdie suksesse om selfvertroue en bereidwilligheid om weer te probeer, te herbou."
          }
        ],
        measuresOfSupport: [
          {
            title: "Strategic Direction and Practice",
            titleAfr: "Strategiese Rigting en Praktyk",
            text: "Reduce pressure and simplify expectations. Leadership should focus on a small number of achievable digital priorities, remove unnecessary compliance demands and create safe opportunities for teachers to begin using technology in ways that respond to immediate classroom and administrative needs.",
            textAfr: "Verminder druk en vereenvoudig verwagtinge. Leierskap moet fokus op 'n klein aantal haalbare digitale prioriteite, onnodige nakomingsvereistes verwyder en veilige geleenthede skep vir onderwysers om tegnologie te begin gebruik op maniere wat reageer op onmiddellike klaskamer- en administratiewe behoeftes."
          },
          {
            title: "Peer Learning and Collaboration",
            titleAfr: "Portuurleer en Samewerking",
            text: "Create safe opportunities for teachers to learn from others without judgement. Pair staff with supportive peers, Transformation Agents or suitable neighbouring schools where they can observe simple, achievable digital practices and discuss challenges openly.",
            textAfr: "Skep veilige geleenthede vir onderwysers om sonder veroordeling van ander te leer. Koppel personeel aan ondersteunende porture, Transformasie-agente of geskikte buurskole waar hulle eenvoudige, haalbare digitale praktyke kan waarneem en uitdagings openlik kan bespreek."
          },
          {
            title: "Building Confidence and Capability",
            titleAfr: "Bou van Selfvertroue en Vaardigheid",
            text: "Rebuild trust and confidence through low-risk experiences. Teachers need patient support, simple tools, practical demonstrations and opportunities to experience small successes without fear of failure, comparison or excessive monitoring.",
            textAfr: "Herbou vertroue en selfvertroue deur laerisiko-ervarings. Onderwysers benodig geduldige ondersteuning, eenvoudige gereedskap, praktiese demonstrasies en geleenthede om klein suksesse te beleef sonder vrees vir mislukking, vergelyking of oormatige monitering."
          },
          {
            title: "Platform and Digital Enablement",
            titleAfr: "Platform- en Digitale Bemagtiging",
            text: "Address the basic barriers that prevent participation. The school should establish what devices, connectivity, platforms and technical support are available, resolve critical access problems and focus teachers on a small number of reliable tools rather than introducing additional platforms.",
            textAfr: "Spreek die basiese hindernisse aan wat deelname verhoed. Die skool moet vasstel watter toestelle, konnektiwiteit, platforms en tegniese ondersteuning beskikbaar is, kritieke toegangsprobleme oplos en onderwysers fokus op 'n klein aantal betroubare gereedskap eerder as om bykomende platforms bekend te stel."
          },
          {
            title: "Cyber Wellness and Digital Citizenship",
            titleAfr: "Kuberwelstand en Digitale Burgerskap",
            text: "Establish basic safety, trust and responsible-use foundations. Teachers and learners need clear guidance on online safety, privacy, digital behaviour and appropriate technology use, while support should address anxiety, harmful experiences and uncertainty around digital participation.",
            textAfr: "Vestig basiese fondamente van veiligheid, vertroue en verantwoordelike gebruik. Onderwysers en leerders benodig duidelike leiding oor aanlynveiligheid, privaatheid, digitale gedrag en toepaslike tegnologiegebruik, terwyl ondersteuning angs, skadelike ervarings en onsekerheid rondom digitale deelname moet aanspreek."
          }
        ]
      };
    } else if (avg <= 2.5) {
      return {
        levelNum: 2,
        name: "Stabilise",
        nameAfr: "Stabiliseer",
        tagline: "Growing confidence, cautious participation, increasing trust and emerging collective responsibility",
        taglineAfr: "Groeiende selfvertroue, versigtige deelname, toenemende vertroue en ontluikende kollektiewe verantwoordelikheid",
        levelKey: "Stabilise" as const,
        color: "#D73828",
        headerColor: "text-[#D73828]",
        bannerBg: "bg-[#D73828]",
        bannerText: "text-white",
        pillBg: "bg-red-50 text-red-900 border-red-200",
        cardBg: "bg-red-50/40 border-red-200",
        cardBorder: "border-red-200",
        badgeBg: "bg-red-100 text-red-900 border-red-300",
        lightBg: "bg-red-50/40",
        accentBorder: "border-l-4 border-l-[#D73828]",
        ruleNumBg: "bg-[#D73828] text-white",
        ruleTitleColor: "text-[#D73828]",
        bgClass: "bg-red-50 text-red-900 border-red-200",
        description: "Incorporate organic teacher groups. Move lessons away from static, teacher-focused projection routines and towards active, learner-facing engagement.",
        descriptionAfr: "Motiveer informele portuurgroepe. Verskuif lesse van passiewe, onderwyser-sentriese projeksies na aktiewe en interaktiewe leerder-deelname.",
        affectiveDiagnosisContext: buildDynamicContext(avg, true),
        affectiveDiagnosisContextAfr: buildDynamicContext(avg, false),
        strategicMatrix: {
          title: "Strategic Matrix: Operational Evidence to Affective & Cultural Insight : Stabilise",
          titleAfr: "Strategiese Matriks: Operasionele Bewyse na Affektiewe & Kulturele Insig : Stabiliseer",
          operationalSignals: "Technology use is increasing but remains uneven; common routines are beginning to emerge; professional development participation is improving; teachers still depend on confident colleagues for support; learner use remains inconsistent.",
          operationalSignalsAfr: "Tegnologiegebruik neem toe maar bly ongelyk; algemene roetines begin posvat; deelname aan professionele ontwikkeling verbeter; onderwysers steun steeds op selfversekerde kollegas vir ondersteuning; leerdergebruik bly wisselvallig.",
          affectiveInsight: "The school may be developing trust and confidence but still needs predictability, reassurance and repeated opportunities to practise before digital use feels normal.",
          affectiveInsightAfr: "Die skool ontwikkel moontlik vertroue en selfvertroue, maar benodig steeds voorspelbaarheid, gerusstelling en herhaalde oefengeleenthede voordat digitale gebruik normaal voel.",
          affectiveReading: "Growing confidence, cautious participation, increasing trust, need for reassurance and emerging collective responsibility.",
          affectiveReadingAfr: "Groeiende selfvertroue, versigtige deelname, toenemende vertroue, behoefte aan gerusstelling en ontluikende kollektiewe verantwoordelikheid."
        },
        advisoryCheck: {
          question: "What is becoming stable, and where does confidence still depend on support?",
          questionAfr: "Wat word stabiel, en waar hang selfvertroue steeds af van ondersteuning?",
          detail: "Check which routines teachers can manage independently and where they still need reassurance, coaching or peer assistance.",
          detailAfr: "Kyk watter roetines onderwysers onafhanklik kan bestuur en waar hulle steeds gerusstelling, afrigting of portuurhulp benodig."
        },
        criticalAdvisoryLens: "Operational data may begin to show increased use of devices, platforms and digital tools, but participation is likely to remain uneven. Some teachers may be progressing confidently while others continue to depend on familiar routines or more experienced colleagues.\n\nThe advisor should look beyond whether technology is being used and consider how secure and sustainable that use has become. Teachers may still need reassurance, clear routines, practical support and repeated opportunities to practise before digital use feels normal rather than additional.\n\nSupport should therefore strengthen consistency without creating unnecessary pressure or introducing too much complexity too quickly.",
        criticalAdvisoryLensAfr: "Operasionele data kan begin wys dat die gebruik van toestelle, platforms en digitale gereedskap toeneem, maar deelname bly waarskynlik ongelyk. Sommige onderwysers vorder met selfvertroue terwyl ander steeds afhanklik is van bekende roetines of meer ervare kollegas.\n\nDie adviseur moet verder kyk as bloot of tegnologie gebruik word en oorweeg hoe veilig en volhoubaar daardie gebruik geword het. Onderwysers benodig moontlik steeds gerusstelling, duidelike roetines, praktiese ondersteuning en herhaalde oefengeleenthede voordat digitale gebruik normaal eerder as addisioneel voel.\n\nOndersteuning moet dus konsekwentheid versterk sonder om onnodige druk te skep of te veel kompleksiteit te vinnig in te stel.",
        strategicActionRules: [
          {
            num: "1",
            rule: "Consistency Before Complexity",
            ruleAfr: "Konsekwentheid Voor Kompleksiteit",
            text: "Look for digital practices that are beginning to work and help teachers repeat them consistently across lessons, departments or school routines.",
            textAfr: "Soek na digitale praktyke wat begin werk en help onderwysers om dit konsekwent oor lesse, departemente of skoolroetines heen te herhaal."
          },
          {
            num: "2",
            rule: "Coach Within Everyday Practice",
            ruleAfr: "Afrigting Binne Alledaagse Praktyk",
            text: "Support teachers inside the work they are already doing, including planning, assessment, communication and classroom teaching, rather than adding separate digital tasks.",
            textAfr: "Ondersteun onderwysers binne die werk wat hulle reeds doen, insluitend beplanning, assessering, kommunikasie en klaskameronderrig, eerder as om aparte digitale take by te voeg."
          },
          {
            num: "3",
            rule: "Build Peer Confidence",
            ruleAfr: "Bou Portuur-selfvertroue",
            text: "Identify teachers who can support colleagues and encourage simple peer demonstrations, shared planning and practical exchange of ideas.",
            textAfr: "Identifiseer onderwysers wat kollegas kan ondersteun en moedig eenvoudige portuur-demonstrasies, gedeelde beplanning en praktiese uitruil van idees aan."
          }
        ],
        measuresOfSupport: [
          {
            title: "Strategic Direction and Practice",
            titleAfr: "Strategiese Rigting en Praktyk",
            text: "Establish clear expectations and consistent everyday routines. Leadership should identify common digital practices for teaching, assessment, communication and administration, while ensuring that teachers understand what is expected and have the support required to participate confidently.",
            textAfr: "Vestig duidelike verwagtinge en konsekwente alledaagse roetines. Leierskap moet algemene digitale praktyke vir onderrig, assessering, kommunikasie en administrasie identifiseer, terwyl verseker word dat onderwysers verstaan wat verwag word en die nodige ondersteuning het om met selfvertroue deel te neem."
          },
          {
            title: "Peer Learning and Collaboration",
            titleAfr: "Portuurleer en Samewerking",
            text: "Develop regular internal peer support. Establish buddy systems, informal demonstrations and shared planning opportunities that allow more confident teachers to support colleagues and reduce dependence on external assistance.",
            textAfr: "Ontwikkel gereelde interne portuur-ondersteuning. Vestig 'buddy'-stelsels, informele demonstrasies en gedeelde beplanningsgeleenthede wat meer selfversekerde onderwysers toelaat om kollegas te ondersteun en afhanklikheid van eksterne hulp te verminder."
          },
          {
            title: "Building Confidence and Capability",
            titleAfr: "Bou van Selfvertroue en Vaardigheid",
            text: "Strengthen practical digital capability through regular use. Professional development should focus on the tools and practices teachers need for everyday teaching, assessment, communication and administration, supported by coaching and opportunities to practise.",
            textAfr: "Versterk praktiese digitale vaardighede deur gereelde gebruik. Professionele ontwikkeling moet fokus op die gereedskap en praktyke wat onderwysers benodig vir alledaagse onderrig, assessering, kommunikasie en administrasie, ondersteun deur afrigting en oefengeleenthede."
          },
          {
            title: "Platform and Digital Enablement",
            titleAfr: "Platform- en Digitale Bemagtiging",
            text: "Create consistency in how available platforms and devices are used. Teachers need clear guidance on which tools support teaching, assessment, communication and administration, together with reliable access, simple procedures and appropriate technical support.",
            textAfr: "Skep konsekwentheid in hoe beskikbare platforms en toestelle gebruik word. Onderwysers benodig duidelike leiding oor watter gereedskap onderrig, assessering, kommunikasie en administrasie ondersteun, tesame met betroubare toegang, eenvoudige prosedures en toepaslike tegniese ondersteuning."
          },
          {
            title: "Cyber Wellness and Digital Citizenship",
            titleAfr: "Kuberwelstand en Digitale Burgerskap",
            text: "Develop consistent expectations and everyday cyber wellness practices. Digital boundaries, responsible behaviour, professional conduct and learner safety should become visible in classroom routines, school communication and the responsible use of devices and platforms.",
            textAfr: "Ontwikkel konsekwente verwagtinge en alledaagse kuberwelstandspraktyke. Digitale grense, verantwoordelike gedrag, professionele optrede en leerderveiligheid moet sigbaar word in klaskamerroetines, skoolkommunikasie en die verantwoordelike gebruik van toestelle en platforms."
          }
        ]
      };
    } else if (avg <= 3.5) {
      return {
        levelNum: 3,
        name: "Explore",
        nameAfr: "Verken",
        tagline: "Curiosity, agency, confidence, experimentation and growing digital ownership",
        taglineAfr: "Nuuskierigheid, agentskap, selfvertroue, eksperimentering en groeiende digitale eienaarskap",
        levelKey: "Explore" as const,
        color: "#00A1A3",
        headerColor: "text-[#00A1A3]",
        bannerBg: "bg-[#00A1A3]",
        bannerText: "text-white",
        pillBg: "bg-teal-50 text-teal-800 border-teal-300",
        cardBg: "bg-teal-50/40 border-teal-200",
        cardBorder: "border-teal-300",
        badgeBg: "bg-teal-50 text-teal-800 border-teal-300",
        lightBg: "bg-teal-50/40",
        accentBorder: "border-l-4 border-l-[#00A1A3]",
        ruleNumBg: "bg-[#00A1A3] text-white",
        ruleTitleColor: "text-[#00A1A3]",
        bgClass: "bg-teal-50 text-teal-800 border-teal-300",
        description: "Embed systemic structures. Solidify enthusiastic digital practices by introducing structured files and common G-Suite/Teams workflows into standard planning.",
        descriptionAfr: "Vestig stelselmatige werkstrome. Konsolideer entoesiastiese digitale praktyke deur G-Suite of Teams formeel in weeklikse vakbeplannings te integreer.",
        affectiveDiagnosisContext: buildDynamicContext(avg, true),
        affectiveDiagnosisContextAfr: buildDynamicContext(avg, false),
        strategicMatrix: {
          title: "Strategic Matrix: Operational Evidence to Affective & Cultural Insight : Explore",
          titleAfr: "Strategiese Matriks: Operasionele Bewyse na Affektiewe & Kulturele Insig : Verken",
          operationalSignals: "Strong digital practice is visible in several classrooms or departments; teachers are experimenting; learners increasingly create and collaborate digitally; peer sharing is growing; some areas of the school remain stronger than others.",
          operationalSignalsAfr: "Sterk digitale praktyk is sigbaar in verskeie klaskamers of departemente; onderwysers eksperimenteer; leerders skep en werk toenemend digitaal saam; portuurdeling groei; sommige areas van die skool bly sterker as ander.",
          affectiveInsight: "The school is showing confidence, curiosity and agency, but progress may still depend on particular champions. The need now is connection, recognition and greater shared ownership.",
          affectiveInsightAfr: "Die skool toon selfvertroue, nuuskierigheid en agentskap, maar vordering hang moontlik steeds af van individuele kampioene. Die behoefte nou is konneksie, erkenning en groter gedeelde eienaarskap.",
          affectiveReading: "Curiosity, agency, confidence, experimentation, professional pride, collaboration and growing ownership.",
          affectiveReadingAfr: "Nuuskierigheid, agentskap, selfvertroue, eksperimentering, professionele trots, samewerking en groeiende eienaarskap."
        },
        advisoryCheck: {
          question: "How widely is strong practice actually shared?",
          questionAfr: "Hoe wyd word sterk praktyk werklik gedeel?",
          detail: "Check whether progress is becoming part of the school culture or remains dependent on particular teachers, departments or champions.",
          detailAfr: "Kyk of vordering deel word van die skoolkultuur of afhanklik bly van spesifieke onderwysers, departemente of kampioene."
        },
        criticalAdvisoryLens: "Operational evidence may show growing platform use, stronger learner participation and more examples of digital teaching and learning. However, the data may hide the fact that much of this progress is being driven by a small number of confident teachers, departments or champions.\n\nThe advisor should identify where energy and innovation already exist and how these strengths can be shared across the school. At this stage, support should move away from basic tool training and towards collaboration, pedagogical experimentation, teacher agency and opportunities for staff to learn from one another.\n\nThe key risk is no longer resistance, but good practice remaining isolated.",
        criticalAdvisoryLensAfr: "Operasionele bewyse toon moontlik toenemende platformgebruik, sterker leerderdeelname en meer voorbeelde van digitale onderrig en leer. Die data kan egter verswyg dat baie van hierdie vordering gedryf word deur 'n klein groepie selfversekerde onderwysers, departemente of kampioene.\n\nDie adviseur moet identifiseer waar energie en innovasie reeds bestaan en hoe hierdie sterktes oor die hele skool gedeel kan word. Op hierdie stadium moet ondersteuning wegbeweeg van basiese gereedskapopleiding na samewerking, pedagogiese eksperimentering, onderwyser-agentskap en geleenthede vir personeel om van mekaar te leer.\n\nDie primêre risiko is nie meer weerstand nie, maar dat goeie praktyk geïsoleer bly.",
        strategicActionRules: [
          {
            num: "1",
            rule: "Connect Before Scaling",
            ruleAfr: "Verbind Voor Skalering",
            text: "Identify strong practice already happening in classrooms or departments and create opportunities for it to be shared across the school.",
            textAfr: "Identifiseer sterk praktyk wat reeds in klaskamers of departemente plaasvind en skep geleenthede om dit oor die hele skool te deel."
          },
          {
            num: "2",
            rule: "Deepen Learner Agency",
            ruleAfr: "Verdiep Leerder-agentskap",
            text: "Look beyond teacher use of technology and focus increasingly on what learners are doing, creating, questioning, collaborating and solving through digital learning.",
            textAfr: "Kyk verder as onderwysergebruik van tegnologie en fokus toenemend op wat leerders doen, skep, bevraagteken, saamwerk en oplos deur digitale leer."
          },
          {
            num: "3",
            rule: "Turn Pockets into Practice",
            ruleAfr: "Omskep Enklawes in Praktyk",
            text: "Help the school move successful digital approaches from individual teachers into shared planning, routines and departmental or whole-school practice.",
            textAfr: "Help die skool om suksesvolle digitale benaderings van individuele onderwysers oor te dra na gedeelde beplanning, roetines en departementele of skoolwye praktyk."
          }
        ],
        measuresOfSupport: [
          {
            title: "Strategic Direction and Practice",
            titleAfr: "Strategiese Rigting en Praktyk",
            text: "Strengthen and connect successful practice across the school. Leadership should identify what is already working, build it into departmental and subject planning, and create greater consistency so that effective digital practice is no longer dependent on individual teachers.",
            textAfr: "Versterk en verbind suksesvolle praktyke oor die hele skool. Leierskap moet identifiseer wat reeds werk, dit in departementele en vakbeplanning inbou, en groter konsekwentheid skep sodat doeltreffende digitale praktyk nie meer afhanklik is van individuele onderwysers nie."
          },
          {
            title: "Peer Learning and Collaboration",
            titleAfr: "Portuurleer en Samewerking",
            text: "Build structured professional collaboration within and beyond the school. Teachers should share resources, demonstrate effective practice, co-design learning activities and participate in subject, circuit or district communities where digital practice can be exchanged and strengthened.",
            textAfr: "Bou gestruktureerde professionele samewerking binne en buite die skool. Onderwysers moet hulpbronne deel, doeltreffende praktyk demonstreer, gesamentlike leeraktiwiteite ontwerp en deelneem aan vak-, kring- of distriksgemeenskappe waar digitale praktyk uitgeruil en versterk kan word."
          },
          {
            title: "Building Confidence and Capability",
            titleAfr: "Bou van Selfvertroue en Vaardigheid",
            text: "Develop teacher agency, experimentation and professional judgement. Teachers should be encouraged to test new approaches, adapt technology to learner needs, reflect on what works and increasingly share their knowledge with colleagues.",
            textAfr: "Ontwikkel onderwyser-agentskap, eksperimentering en professionele oordeel. Onderwysers moet aangemoedig word om nuwe benaderings te toets, tegnologie by leerderbehoeftes aan te pas, te reflekteer oor wat werk en toenemend hul kennis met kollegas te deel."
          },
          {
            title: "Platform and Digital Enablement",
            titleAfr: "Platform- en Digitale Bemagtiging",
            text: "Move from access towards purposeful and integrated use. Platforms should increasingly support collaboration, learner creation, assessment, differentiated learning and resource sharing, while the school reviews where infrastructure or access gaps still limit effective practice.",
            textAfr: "Beweeg vanaf toegang na doelgerigte en geïntegreerde gebruik. Platforms moet toenemend samewerking, leerderskepping, assessering, gedifferensieerde leer en hulpbrondeling ondersteun, terwyl die skool hersien waar infrastruktuur- of toegangsgapings steeds doeltreffende praktyk beperk."
          },
          {
            title: "Cyber Wellness and Digital Citizenship",
            titleAfr: "Kuberwelstand en Digitale Burgerskap",
            text: "Embed cyber wellness into learning and wider school culture. Teachers should integrate digital citizenship, online behaviour, AI awareness, digital empathy and responsible decision-making into relevant curriculum areas, while learners begin taking more active roles in awareness and peer support.",
            textAfr: "Bed kuberwelstand in by leer en die breër skoolkultuur. Onderwysers moet digitale burgerskap, aanlyngedrag, KI-bewustheid, digitale empatie en verantwoordelike besluitneming in relevante kurrikulumareas integreer, terwyl leerders meer aktiewe rolle in bewusmaking en portuur-ondersteuning begin inneem."
          }
        ]
      };
    } else {
      return {
        levelNum: 4,
        name: "Lead",
        nameAfr: "Lei",
        tagline: "Ownership, autonomy, distributed leadership and systemic digital transformation",
        taglineAfr: "Eienaarskap, outonomie, verspreide leierskap en stelselmatige digitale transformasie",
        levelKey: "Lead" as const,
        color: "#C8126E",
        headerColor: "text-[#C8126E]",
        bannerBg: "bg-[#C8126E]",
        bannerText: "text-white",
        pillBg: "bg-pink-50 text-pink-800 border-pink-300",
        cardBg: "bg-pink-50/40 border-pink-200",
        cardBorder: "border-pink-300",
        badgeBg: "bg-pink-50 text-pink-800 border-pink-300",
        lightBg: "bg-pink-50/40",
        accentBorder: "border-l-4 border-l-[#C8126E]",
        ruleNumBg: "bg-[#C8126E] text-white",
        ruleTitleColor: "text-[#C8126E]",
        bgClass: "bg-pink-50 text-pink-800 border-pink-300",
        description: "Lighthouse standard. Empower teachers as school-wide mentors. Shares custom learner-created artefacts and supports neighbouring schools in surrounding circuits.",
        descriptionAfr: "Baken-instelling. Bemagtig onderwysers as skool-wye mentors. Deel eie skeppende digitale werksmetodes en fasiliteer groter streeks-ondersteuning.",
        affectiveDiagnosisContext: buildDynamicContext(avg, true),
        affectiveDiagnosisContextAfr: buildDynamicContext(avg, false),
        strategicMatrix: {
          title: "Strategic Matrix: Operational Evidence to Affective & Cultural Insight : Lead",
          titleAfr: "Strategiese Matriks: Operasionele Bewyse na Affektiewe & Kulturele Insig : Lei",
          operationalSignals: "Digital practice is consistent across the school; expertise is distributed; learners participate actively and independently; teachers mentor one another; systems support teaching, learning and administration; the school can share practice with others.",
          operationalSignalsAfr: "Digitale praktyk is konsekwent regoor die skool; kundigheid is versprei; leerders neem aktief en onafhanklik deel; onderwysers mentor mekaar; stelsels ondersteun onderrig, leer en administrasie; die skool kan praktyk met ander deel.",
          affectiveInsight: "The school demonstrates collective confidence, ownership and professional autonomy. Support should recognise this maturity rather than return the school to compliance-driven intervention.",
          affectiveInsightAfr: "Die skool demonstreer kollektiewe selfvertroue, eienaarskap en professionele outonomie. Ondersteuning moet hierdie volwassenheid erken eerder as om terug te keer na nakomingsgedrewe intervensies.",
          affectiveReading: "Ownership, autonomy, collective confidence, distributed leadership, reflective practice and responsibility for others.",
          affectiveReadingAfr: "Eienaarskap, outonomie, kollektiewe selfvertroue, verspreide leierskap, reflektiewe praktyk en verantwoordelikheid vir ander."
        },
        advisoryCheck: {
          question: "What evidence shows meaningful impact rather than simply high activity?",
          questionAfr: "Watter bewyse toon betekenisvolle impak eerder as bloot hoë aktiwiteit?",
          detail: "Check learner experience, quality of teaching, sustainability, staff ownership, equity and whether the school can maintain and share its practice independently.",
          detailAfr: "Kyk na leerderervaring, kwaliteit van onderrig, volhoubaarheid, personeeleienaarskap, billikheid en of die skool sy praktyk onafhanklik kan handhaaf en deel."
        },
        criticalAdvisoryLens: "Operational data may show strong and consistent technology use, high levels of digital participation and embedded practice across the institution. At this level, however, high activity alone should not be treated as proof of meaningful transformation.\n\nThe advisor should look for quality, learner agency, sustainability, reflective practice and evidence of impact. A Lead school should not require the same level of directive support as a developing school. Excessive monitoring or compliance requirements may actually limit the professional ownership that has enabled the school to progress.\n\nSupport should therefore create space for innovation, mentoring, reflection and contribution to the wider system.",
        criticalAdvisoryLensAfr: "Operasionele data kan sterk en konsekwente tegnologiegebruik, hoë vlakke van digitale deelname en ingebedde praktyk regoor die instelling toon. Op hierdie vlak moet hoë aktiwiteit alleen egter nie as bewys van betekenisvolle transformasie beskou word nie.\n\nDie adviseur moet soek na gehalte, leerder-agentskap, volhoubaarheid, reflektiewe praktyk en bewyse van impak. 'n Leier-skool behoort nie dieselfde vlak van voorskriftelike ondersteuning as 'n ontwikkelende skool te benodig nie. Oormatige monitering of voldoeningsvereistes kan juis die professionele eienaarskap beperk wat die skool in staat gestel het om te vorder.\n\nOndersteuning moet dus ruimte skep vir innovasie, mentorskap, refleksie en bydrae tot die breër stelsel.",
        strategicActionRules: [
          {
            num: "1",
            rule: "Enable Rather Than Direct",
            ruleAfr: "Bemagtig Eerder As Voorskryf",
            text: "Give the school greater space to lead its own digital development, with the advisor acting as a critical partner rather than directing everyday practice.",
            textAfr: "Gee die skool groter ruimte om sy eie digitale ontwikkeling te lei, terwyl die adviseur as 'n kritiese vennoot optree eerder as om alledaagse praktyk voor te skryf."
          },
          {
            num: "2",
            rule: "Look for Impact, Not Activity",
            ruleAfr: "Soek na Impak, Nie Bloot Aktiwiteit Nie",
            text: "Move beyond counting device use or platform activity and examine whether digital practice is improving learner participation, teaching quality, assessment and school effectiveness.",
            textAfr: "Beweeg verby die tel van toestelgebruik of platformaktiwiteit en ondersoek of digitale praktyk leerderdeelname, onderrigkwaliteit, assessering en skool-effektiwiteit verbeter."
          },
          {
            num: "3",
            rule: "Extend Leadership Outwards",
            ruleAfr: "Brei Leierskap Na Buite Uit",
            text: "Encourage teachers and school leaders to mentor others, share models of practice, host learning opportunities and contribute to district or provincial digital development.",
            textAfr: "Moedig onderwysers en skoolleiers aan om ander te mentor, modelle van goeie praktyk te deel, leergeleenthede aan te bied en by te dra tot distriks- of provinsiale digitale ontwikkeling."
          }
        ],
        measuresOfSupport: [
          {
            title: "Strategic Direction and Practice",
            titleAfr: "Strategiese Rigting en Praktyk",
            text: "Sustain embedded practice and extend institutional influence. Leadership should use evidence to refine digital strategy, encourage innovation, document successful approaches and position the school to contribute to wider district and provincial digital transformation.",
            textAfr: "Handhaaf ingebedde praktyk en brei institusionele invloed uit. Leierskap moet bewyse gebruik om digitale strategie te verfyn, innovasie aan te moedig, suksesvolle benaderings te dokumenteer en die skool te posisioneer om by te dra tot wyer distriks- en provinsiale digitale transformasie."
          },
          {
            title: "Peer Learning and Collaboration",
            titleAfr: "Portuurleer en Samewerking",
            text: "Shift from receiving support to providing it. Teachers and school leaders should mentor other schools, host demonstration lessons or professional learning sessions, contribute resources and help grow wider communities of digital practice.",
            textAfr: "Beweeg vanaf die ontvangs van ondersteuning na die verskaffing daarvan. Onderwysers en skoolleiers moet ander skole mentor, demonstrasielesse of professionele leersessies aanbied, hulpbronne bydra en help om breër gemeenskappe van digitale praktyk te laat groei."
          },
          {
            title: "Building Confidence and Capability",
            titleAfr: "Bou van Selfvertroue en Vaardigheid",
            text: "Grow advanced capability and distributed digital leadership. Experienced teachers should deepen their pedagogical practice, mentor others, lead professional learning and develop the confidence to innovate, evaluate and influence practice beyond their own classrooms.",
            textAfr: "Kweek gevorderde vaardigheid en verspreide digitale leierskap. Ervare onderwysers moet hul pedagogiese praktyk verdiep, ander mentor, professionele leer lei en die selfvertroue ontwikkel om te innoveer, te evalueer en praktyk buite hul eie klaskamers te beïnvloed."
          },
          {
            title: "Platform and Digital Enablement",
            titleAfr: "Platform- en Digitale Bemagtiging",
            text: "Optimise platforms as part of a connected institutional ecosystem. The school should use digital systems strategically across teaching, learning and management, regularly review effectiveness and accessibility, and explore emerging technologies where they add meaningful educational value.",
            textAfr: "Optimeer platforms as deel van 'n gekoppelde institusionele ekosisteem. Die skool moet digitale stelsels strategies oor onderrig, leer en bestuur gebruik, gereeld doeltreffendheid en toeganklikheid hersien, en ontluikende tegnologieë verken waar dit betekenisvolle opvoedkundige waarde toevoeg."
          },
          {
            title: "Cyber Wellness and Digital Citizenship",
            titleAfr: "Kuberwelstand en Digitale Burgerskap",
            text: "Develop learner and teacher leadership in cyber wellness. Digital citizenship and wellbeing should be embedded across school culture, with learners and staff leading initiatives, mentoring peers, contributing resources and sharing effective cyber wellness practices with the wider school community.",
            textAfr: "Ontwikkel leerder- en onderwyserleierskap in kuberwelstand. Digitale burgerskap en welstand moet oor die skoolkultuur ingebed wees, met leerders en personeel wat inisiatiewe lei, porture mentor, hulpbronne bydra en doeltreffende kuberwelstandspraktyke met die breër skoolgemeenskap deel."
          }
        ]
      };
    }
  };

  const archetype = getArchetypeInfo(scoreAverage);

  // SVG Geometric coordinates for Diamond SVG chart based on computed category scores
  const center = 100;
  const radius = 72; // Max distance for score 4 is 72px away from center

  const getCoord = (score: number, angle: number) => {
    const factor = score / 4; // Normalized (0 to 1)
    const rad = (angle * Math.PI) / 180;
    const x = center + radius * factor * Math.cos(rad);
    const y = center + radius * factor * Math.sin(rad);
    return `${x},${y}`;
  };

  // Top: People (270 deg), Right: Practices (0 deg), Bottom: Pedagogy (90 deg), Left: Platforms (180 deg)
  const peopleCoord = getCoord(peopleRating, 270);
  const practicesCoord = getCoord(practicesRating, 0);
  const pedagogyCoord = getCoord(pedagogyRating, 90);
  const platformsCoord = getCoord(platformsRating, 180);

  let pointsPath = `${peopleCoord} ${practicesCoord} ${pedagogyCoord} ${platformsCoord}`;
  if (assessment.onlyWalkthrough) {
    pointsPath = `${peopleCoord} ${practicesCoord}`;
  } else if (assessment.onlyClassroom) {
    pointsPath = `${pedagogyCoord} ${platformsCoord}`;
  }

  // Sliders list
  const slidersList = [
    { key: "peopleSafety" as const, label: "PEOPLE: Psychological Safety", curVal: peopleSafety, max: 4 },
    { key: "peopleConfidence" as const, label: "PEOPLE: Digital Confidence", curVal: peopleConfidence, max: 4 },
    { key: "practicesCollab" as const, label: "PRACTICES: Collaboration", curVal: practicesCollab, max: 4 },
    { key: "practicesPD" as const, label: "PRACTICES: Prof Development", curVal: practicesPD, max: 4 },
    { key: "practicesCyber" as const, label: "PRACTICES: Cyber Wellness", curVal: practicesCyber, max: 4 },
    { key: "pedagogyDesign" as const, label: "PEDAGOGY: Lesson Design", curVal: pedagogyDesign, max: 4 },
    { key: "pedagogyAgency" as const, label: "PEDAGOGY: Learner Agency", curVal: pedagogyAgency, max: 4 },
    { key: "pedagogyInclusivity" as const, label: "PEDAGOGY: Inclusivity", curVal: pedagogyInclusivity, max: 4 },
    { key: "platformsScheduling" as const, label: "PLATFORMS: Scheduling", curVal: platformsScheduling, max: 4 },
    { key: "platformsIntegration" as const, label: "PLATFORMS: Tool Integration", curVal: platformsIntegration, max: 4 },
    { key: "scenarioResponse" as const, label: "PLATFORMS: Resilience", curVal: scenarioResponse, max: 4 },
  ];

  const handleOverride = (key: keyof CultureAssessment, val: number) => {
    onChangeAssessment({
      ...assessment,
      [key]: val
    });
    showToast(`Level updated dynamically!`, "success");
  };

  // Helper functions for ASCII alignment
  const padRight = (str: string, length: number, padChar: string = " "): string => {
    if (str.length >= length) return str.substring(0, length);
    return str + padChar.repeat(length - str.length);
  };

  const centerText = (str: string, length: number, padChar: string = " "): string => {
    if (str.length >= length) return str.substring(0, length);
    const leftPad = Math.floor((length - str.length) / 2);
    const rightPad = length - str.length - leftPad;
    return padChar.repeat(leftPad) + str + padChar.repeat(rightPad);
  };

  const handlePrint = () => {
    const originalTitle = document.title;
    
    // Format school name and visit date to clean filename characters
    const cleanSchool = (advisor.schoolName || "School")
      .trim()
      .replace(/[^a-zA-Z0-9]/g, "_")
      .replace(/__+/g, "_");
      
    const cleanDate = (advisor.visitDate || new Date().toISOString().split("T")[0])
      .trim()
      .replace(/[^a-zA-Z0-9]/g, "_")
      .replace(/__+/g, "_");
      
    // Set dynamic document title for browser save-to-pdf prompt suggestion
    document.title = `WCED_4P_Diagnostic_Report_${cleanSchool}_${cleanDate}_${reportLang.toUpperCase()}`;
    
    // Trigger standard browser print process
    window.print();
    
    // Restore the screen tab document title
    document.title = originalTitle;
  };

  const copyForOutlook = async () => {
    const isAfr = reportLang === "afr";
    const reportText = isAfr ? `
=============================================
Wes-Kaap Onderwysdepartement — Direktoraat e-Leer
4P Affektiewe Transformasiemodel Diagnostiese Verslag 2026
=============================================

1. INSTITUSIONELE DIAGNOSTIESE VLAK:
---------------------------------------------
Skoolnaam: ${advisor.schoolName || "N/V"}
Distrik/Kring: ${advisor.district || "N/V"}
Besoekdatum: ${advisor.visitDate || "N/V"}
e-Leer Adviseur: ${advisor.advisorName || "N/V"}

Diagnostiese Vlak: ${archetype.nameAfr} (${archetype.name})
Saamgestelde Profielgemiddeld: ${scoreAverage.toFixed(2)} / 4.00

4P Dimensie Tellings:
- MENSE (PEOPLE): ${assessment.onlyClassroom ? "N/V" : "Vlak " + peopleRating.toFixed(2) + " / 4"}
- PRAKTYKE (PRACTICES): ${assessment.onlyClassroom ? "N/V" : "Vlak " + practicesRating.toFixed(2) + " / 4"}
- PEDAGOGIE (PEDAGOGY): ${assessment.onlyWalkthrough ? "N/V" : "Vlak " + pedagogyRating.toFixed(2) + " / 4"}
- PLATFORMS (PLATFORMS): ${assessment.onlyWalkthrough ? "N/V" : "Vlak " + platformsRating.toFixed(2) + " / 4"}

Affektiewe Diagnose & Konteks:
${archetype.affectiveDiagnosisContextAfr}

2. OPERASIONELE NA AFFEKTIEWE INSIG & ADVIESKONTROLES:
---------------------------------------------
${archetype.strategicMatrix.titleAfr}

* Operasionele Bewyse:
  ${archetype.strategicMatrix.operationalSignalsAfr}

* Affektiewe & Kulturele Insig:
  ${archetype.strategicMatrix.affectiveInsightAfr}

* Affektiewe Lees:
  ${archetype.strategicMatrix.affectiveReadingAfr}

* Advieskontrole Vraag:
  ${archetype.advisoryCheck.questionAfr}
  --> ${archetype.advisoryCheck.detailAfr}

3. KRITIESE ADVIESLENS (${archetype.nameAfr}):
---------------------------------------------
${archetype.criticalAdvisoryLensAfr}

4. MAATREËLS VIR ONDERSTEUNINGSPLAN:
---------------------------------------------
${archetype.measuresOfSupport.map((srv, i) => `${i + 1}. ${srv.titleAfr.toUpperCase()}:
   ${srv.textAfr}`).join("\n\n")}

5. STRATEGIESE AKSIE-REËLS VIR ADVIESBESOEKE:
---------------------------------------------
${archetype.strategicActionRules.map((rule) => `${rule.num}. ${rule.ruleAfr.toUpperCase()}:
   ${rule.textAfr}`).join("\n\n")}

6. VELDWAARNEMINGS & BEWYSE:
---------------------------------------------
Klaskamerwaarneming:
- Onderwyser Waargeneem: ${assessment.teacherName || "Nie gedokumenteer nie"}
- Vak Waargeneem: ${assessment.subjectObserved || "Nie gedokumenteer nie"}
- Graad Waargeneem: ${assessment.gradeObserved || "Nie gedokumenteer nie"}
- Lesfokus / Onderwerp: ${assessment.lessonTopic || "Nie gedokumenteer nie"}
- Leerders Teenwoordig: ${assessment.learnersCount || "Nie gedokumenteer nie"}

Veldwaarnemings en bewyse:
* Aktiewe Digitale Gereedskap & Platforms: ${assessment.toolsUsed || "Nie gedokumenteer nie"}
* Geverifieerde Leerder Digitale Artefak: ${assessment.artifactVerified || "Nie geverifieer nie"}
* Onderwyser Bemagtiging / Opleiding: ${assessment.teacherUpskilling || "Nie gedokumenteer nie"}
* Adviseur Klaskamer-aanbevelings: ${assessment.advisorSupport || "Geen aanbevelings gedokumenteer nie"}
* Waargenome Onderwyseraksie: ${assessment.teacherAction || "Nie gedokumenteer nie"}
* Waargenome Leerderaksie: ${assessment.learnerAction || "Nie gedokumenteer nie"}

=============================================
Gemagtigde Elektroniese Handtekeningblokke
Uitgereik via WKOD e-Leer Diagnostiese Suite 2026.
` : `
=============================================
WCED eLearning Directorate 4P Affective Transformation Model Diagnostic
Digital Culture & Confidence Foundations Assessment Report 2026
=============================================

1. INSTITUTIONAL DIAGNOSTIC LEVEL:
---------------------------------------------
School Name: ${advisor.schoolName || "N/A"}
District/Circuit: ${advisor.district || "N/A"}
Date of Visit: ${advisor.visitDate || "N/A"}
eLearning Advisor: ${advisor.advisorName || "N/A"}

Diagnostic Level: ${archetype.name}
Composite Profile Average: ${scoreAverage.toFixed(2)} / 4.00

4P Dimension Scores:
- PEOPLE: ${assessment.onlyClassroom ? "N/A (Omitted)" : "Level " + peopleRating.toFixed(2) + " / 4"}
- PRACTICES: ${assessment.onlyClassroom ? "N/A (Omitted)" : "Level " + practicesRating.toFixed(2) + " / 4"}
- PEDAGOGY: ${assessment.onlyWalkthrough ? "N/A (Omitted)" : "Level " + pedagogyRating.toFixed(2) + " / 4"}
- PLATFORMS: ${assessment.onlyWalkthrough ? "N/A (Omitted)" : "Level " + platformsRating.toFixed(2) + " / 4"}

Affective Diagnosis & Context:
${archetype.affectiveDiagnosisContext}

2. OPERATIONAL TO AFFECTIVE INSIGHT & ADVISORY CHECKS:
---------------------------------------------
${archetype.strategicMatrix.title}

* Operational Signals:
  ${archetype.strategicMatrix.operationalSignals}

* Affective & Cultural Insight:
  ${archetype.strategicMatrix.affectiveInsight}

* Affective Reading:
  ${archetype.strategicMatrix.affectiveReading}

* Advisory Check Question:
  ${archetype.advisoryCheck.question}
  --> ${archetype.advisoryCheck.detail}

3. CRITICAL ADVISORY LENS (${archetype.name}):
---------------------------------------------
${archetype.criticalAdvisoryLens}

4. MEASURES OF SUPPORT:
---------------------------------------------
${archetype.measuresOfSupport.map((srv, i) => `${i + 1}. ${srv.title.toUpperCase()}:
   ${srv.text}`).join("\n\n")}

5. STRATEGIC ACTION RULES FOR ADVISORY WALKS:
---------------------------------------------
${archetype.strategicActionRules.map((rule) => `${rule.num}. ${rule.rule.toUpperCase()}:
   ${rule.text}`).join("\n\n")}

6. FIELD OBSERVATION FINDINGS & EVIDENCE:
---------------------------------------------
Classroom Context Metadata:
- Teacher Observed: ${assessment.teacherName || "Not documented"}
- Subject Observed: ${assessment.subjectObserved || "Not documented"}
- Grade Observed: ${assessment.gradeObserved || "Not documented"}
- Lesson Focus Topic: ${assessment.lessonTopic || "Not documented"}
- Learners Present: ${assessment.learnersCount || "Not documented"}

Walkthrough Details:
- Primary Identified Barrier: ${assessment.primaryBarrier || "Not documented"}
- Staff Peer-Sharing Mindset & Trust: ${assessment.collaborationChannel || "Not documented"}

Observable Live Evidence Milestones:
- Smart Classroom Technology Use: ${assessment.smartboardObserved ? "[YES]" : "[NO]"}
- Learner Tablets: ${assessment.tabletsObserved ? "[YES]" : "[NO]"}
- eLearning Lab in-use: ${assessment.labObserved ? "[YES]" : "[NO]"}
- Online Activities: ${assessment.internetObserved ? "[YES]" : "[NO]"}
- Offline Digital Resources/Tool: ${assessment.offlineObserved ? "[YES]" : "[NO]"}

Classroom Field Evidence Observations:
* Active Digital Tools & Platforms Used in the Lesson:
  ${assessment.toolsUsed || "Not documented"}
* Verified Learner Digital Artefact:
  ${assessment.artifactVerified || "Not documented"}
* Active Teacher Upskilling Milestones (2026 Strategy):
  ${assessment.teacherUpskilling || "Not documented"}
* eAdvisor In-Classroom Suggestions & Interventions:
  ${assessment.advisorSupport || "Not documented"}
* Observed Teacher Action:
  ${assessment.teacherAction || "Not documented"}
* Observed Learner Action:
  ${assessment.learnerAction || "Not documented"}

=============================================
Authorized Electronic Signature Blocks
Issued via WCED eLearning Diagnostic Suite 2026.
`;

    try {
      await navigator.clipboard.writeText(reportText.trim());
      showToast(isAfr ? "Verslag geformateer en gekopieer na knipbord!" : "Report formatted & copied for Outlook email clipboard!", "success");
    } catch (err) {
      showToast(isAfr ? "Kon nie knipbord bereik nie. Druk asseblief verslag." : "Could not access Clipboard. Please print report to save.", "error");
    }
  };

  const isAfr = reportLang === "afr";

  return (
    <div className="space-y-4">
      {/* Dynamic override interactive sidebar inside the card (Dashboard utility for eLearning Advisors) */}
      <div className="no-print bg-slate-50 border border-slate-200 rounded-lg p-3.5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-[#001489]" />
            <h3 className="font-extrabold font-display text-xs uppercase text-slate-800 tracking-wide">
              {isAfr ? "e-Leer Adviseur Interaktiewe Punt-aanpassing" : "eLearning Advisor Interactive Score Adjustment"}
            </h3>
          </div>

          {/* Language Switcher Button in interactive control bar */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-600 uppercase">
              {isAfr ? "Taalkeuse:" : "Report Language:"}
            </span>
            <div className="inline-flex rounded-lg border border-slate-300 bg-white p-0.5 shadow-xs">
              <button
                type="button"
                onClick={() => setReportLang("en")}
                className={`px-2.5 py-1 text-[10px] font-extrabold rounded-md transition ${
                  reportLang === "en"
                    ? "bg-[#001489] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setReportLang("afr")}
                className={`px-2.5 py-1 text-[10px] font-extrabold rounded-md transition ${
                  reportLang === "afr"
                    ? "bg-[#001489] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Afrikaans
              </button>
            </div>
          </div>
        </div>

        <p className="text-[10px] text-slate-650 mb-3 max-w-3xl leading-relaxed">
          {isAfr 
            ? "Verstel enige van die 11 parameters hieronder om die model-transformasie te toets. Die radar-vektordiagram, berekende argetipe en riglyne pas intyds aan." 
            : "Need to test model transformations? Drag below to adjust any of the 11 granular parameters. The radar vector chart, computed archetype, and guidelines will align instantly."}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {slidersList.map((dim) => (
            <div key={dim.key} className="bg-white p-2 md:p-2.5 rounded-lg border border-slate-205 shadow-sm flex flex-col justify-between">
              <span className="text-[8px] font-black uppercase tracking-wider text-slate-550 block mb-1">{dim.label}</span>
              <div className="flex items-center justify-between gap-1.5">
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="1"
                  value={dim.curVal}
                  onChange={(e) => handleOverride(dim.key, parseInt(e.target.value))}
                  className="w-full h-1.5 rounded-lg bg-slate-200 accent-[#001489] cursor-pointer"
                />
                <span className="text-[9px] font-black bg-slate-100 text-slate-800 px-1 py-0.5 rounded border border-slate-200 shrink-0">
                  L{dim.curVal}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main printable report layout wrapper */}
      <div 
        id="printable-report" 
        className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 relative overflow-hidden shadow-sm print:shadow-none print:border-none print:p-0"
      >
        {/* Visual ribbon indicator matching level color */}
        <div 
          className="no-print absolute top-0 left-0 right-0 h-1.5"
          style={{ backgroundColor: archetype.color }}
        />

        {/* Head branding header inside the report card */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="flex items-start gap-3">
            <div 
              className="text-white font-extrabold text-lg w-10 h-10 rounded-md flex items-center justify-center shadow-sm shrink-0"
              style={{ backgroundColor: archetype.color }}
            >
              4P
            </div>
            <div>
              <h2 className="text-base font-black font-display text-[#001489] tracking-tight uppercase leading-none">
                {isAfr ? "Wes-Kaap Onderwysdepartement" : "Western Cape Education Department"}
              </h2>
              <p className="text-[9px] font-bold text-slate-500 tracking-wider mt-1 uppercase">
                {isAfr 
                  ? "E-LEER DIREKTORAAT — 4P AFFEKTIEWE TRANSFORMASIE-OPSOMMING 2026" 
                  : "ELEARNING DIRECTORATE — 4P AFFECTIVE TRANSFORMATION SUMMARY 2026"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Language Toggle Inside Header (visible in UI, hidden during paper print) */}
            <div className="no-print hidden sm:flex items-center bg-slate-100 p-1 rounded-lg border border-slate-250">
              <button
                type="button"
                onClick={() => setReportLang("en")}
                className={`px-2.5 py-1 text-[10px] font-black rounded transition ${
                  reportLang === "en"
                    ? "bg-[#001489] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setReportLang("afr")}
                className={`px-2.5 py-1 text-[10px] font-black rounded transition ${
                  reportLang === "afr"
                    ? "bg-[#001489] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Afrikaans
              </button>
            </div>

            <div className="text-right flex flex-col items-start md:items-end bg-slate-50 border border-slate-200 p-2 rounded-lg shrink-0">
              <span className="text-[8px] font-black tracking-wider text-slate-400 block uppercase">
                {isAfr ? "Verslagverwysingsnommer:" : "Report Ref Number:"}
              </span>
              <span className="font-mono text-[10px] font-bold text-slate-700">WCED-4P-{advisor.visitDate.replace(/-/g, "") || "2026"}</span>
            </div>
          </div>
        </div>

        {/* SECTION 1: Institutional Diagnostic Level */}
        <div className="py-4 border-b border-slate-200 space-y-4">
          <div 
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 sm:p-3.5 rounded-xl border shadow-xs"
            style={{ 
              backgroundColor: `${archetype.color}14`, 
              borderColor: `${archetype.color}45`,
              borderLeftWidth: "6px",
              borderLeftColor: archetype.color
            }}
          >
            <div className="flex items-center gap-2.5">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 shadow-xs"
                style={{ backgroundColor: archetype.color }}
              >
                <Award className="w-4 h-4" />
              </div>
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider font-display text-[#001489]">
                {isAfr ? "1. Institusionele Diagnostiese Vlak" : "1. Institutional Diagnostic Level"}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span 
                className="text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border shadow-xs"
                style={{ backgroundColor: `${archetype.color}25`, color: "#001489", borderColor: `${archetype.color}60` }}
              >
                {isAfr ? `VLAK ${archetype.levelNum}: ${archetype.nameAfr.toUpperCase()}` : `LEVEL ${archetype.levelNum}: ${archetype.name.toUpperCase()}`}
              </span>
            </div>
          </div>

          {/* Prominent Diagnostic Level Banner */}
          <div 
            className="p-4 sm:p-5 rounded-2xl border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
            style={{ 
              backgroundColor: `${archetype.color}12`, 
              borderColor: `${archetype.color}40`,
              borderLeftWidth: "8px",
              borderLeftColor: archetype.color
            }}
          >
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span 
                  className="text-[11px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-md text-white shadow-xs"
                  style={{ backgroundColor: archetype.color }}
                >
                  {isAfr ? `VLAK ${archetype.levelNum}` : `LEVEL ${archetype.levelNum}`}
                </span>
                <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight text-[#001489]">
                  {isAfr ? archetype.nameAfr.toUpperCase() : archetype.name.toUpperCase()}
                </h2>
                <span className="text-xs font-bold text-slate-500 uppercase">
                  ({archetype.levelKey})
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-snug">
                {isAfr ? archetype.taglineAfr : archetype.tagline}
              </p>
            </div>

            <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 md:border-l border-slate-200/80 pt-3 md:pt-0 md:pl-5 shrink-0">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-500">
                {isAfr ? "Profielgemiddeld" : "Composite Score"}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black font-mono text-[#001489]">
                  {scoreAverage.toFixed(2)}
                </span>
                <span className="text-xs font-bold text-slate-500 font-mono">/ 4.00</span>
              </div>
              <span 
                className="text-[9px] font-black uppercase px-2 py-0.5 rounded mt-1"
                style={{ backgroundColor: `${archetype.color}25`, color: "#001489" }}
              >
                {isAfr ? `Vlak ${archetype.levelNum} van 4` : `Level ${archetype.levelNum} of 4`}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 print:grid-cols-1">
            {/* Metadata information & infrastructure */}
            <div className="lg:col-span-8 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium text-slate-650 bg-slate-50/60 p-3 rounded-lg border border-slate-200/80">
                <div className="flex items-center gap-2">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    <strong>{isAfr ? "Skoolnaam:" : "School Name:"}</strong> {advisor.schoolName || "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    <strong>{isAfr ? "Distriksnaam:" : "District Name:"}</strong> {advisor.district || "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    <strong>{isAfr ? "Besoekdatum:" : "Date of Visit:"}</strong> {advisor.visitDate || "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    <strong>{isAfr ? "e-Leer Adviseur:" : "eLearning Advisor:"}</strong> {advisor.advisorName || "N/A"}
                  </span>
                </div>
              </div>

              {/* Configured Infrastructure Indicators */}
              <div>
                <h4 className="text-[9px] font-black tracking-wider text-slate-400 uppercase mb-1.5">
                  {isAfr ? "Geëvalueerde Infrastruktuurbesonderhede:" : "Evaluated Infrastructure Details:"}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { key: "slimLabs" as const, label: isAfr ? "SLIM Labs" : "SLIM Labs" },
                    { key: "catItEgdLabs" as const, label: isAfr ? "RTT/IT/EGD Labs" : "CAT/IT/EGD Labs" },
                    { key: "internetConnection" as const, label: isAfr ? "Internetverbinding" : "Internet Connection" },
                    { key: "smartClassroom" as const, label: isAfr ? "Slimklaskamer" : "Smart Classroom" },
                  ].map((infra) => (
                    <span
                      key={infra.key}
                      className={`text-[9.5px] font-semibold px-2 py-0.5 rounded border ${
                        advisor.infrastructure[infra.key]
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-slate-50 text-slate-400 border-slate-200/50"
                      }`}
                    >
                      {infra.label}: {advisor.infrastructure[infra.key] ? (isAfr ? "✓ Gekonfigureer" : "✓ Configured") : (isAfr ? "✕ Afwesig" : "✕ Absent")}
                    </span>
                  ))}
                </div>
              </div>

              {/* Active Projects models */}
              <div>
                <h4 className="text-[9px] font-black tracking-wider text-slate-400 uppercase mb-1.5">
                  {isAfr ? "Aktiewe Strategiese Intervensies:" : "Active Strategic Interventions:"}
                </h4>
                <div className="flex flex-wrap gap-1.5 text-[9.5px] font-bold">
                  {advisor.activeProjects.mco && (
                    <span className="bg-blue-50 text-blue-800 border-blue-150 border px-2 py-0.5 rounded">
                      {isAfr ? "Wiskunde (MCO)" : "Mathematics (MCO)"}
                    </span>
                  )}
                  {advisor.activeProjects.backOnTrack && (
                    <span className="bg-purple-50 text-purple-800 border-purple-150 border px-2 py-0.5 rounded">
                      Back-on-Track
                    </span>
                  )}
                  {advisor.activeProjects.other && (
                    <span className="bg-slate-50 text-slate-800 border-slate-200 border px-2 py-0.5 rounded">
                      {isAfr ? "Ander: " : "Other: "}{advisor.activeProjects.otherValue}
                    </span>
                  )}
                  {!advisor.activeProjects.mco &&
                    !advisor.activeProjects.backOnTrack &&
                    !advisor.activeProjects.other && (
                      <span className="text-slate-400 font-medium text-[9.5px]">
                        {isAfr ? "Geen aangetekende projekte nie." : "No recorded projects."}
                      </span>
                    )}
                </div>
              </div>

              {/* Score breakdown pillars */}
              <div className="pt-1">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className={`p-2 rounded-lg border text-center ${assessment.onlyClassroom ? "opacity-40" : ""}`} style={{ backgroundColor: "#890C5808", borderColor: "#890C5825" }}>
                    <span className="text-[8px] font-bold text-slate-500 block tracking-wider uppercase">
                      {isAfr ? "MENSE" : "PEOPLE"}
                    </span>
                    <span className="text-sm font-black text-[#890C58]">{assessment.onlyClassroom ? "N/A" : `L${peopleRating.toFixed(1)}`}</span>
                  </div>
                  <div className={`p-2 rounded-lg border text-center ${assessment.onlyClassroom ? "opacity-40" : ""}`} style={{ backgroundColor: "#D7382808", borderColor: "#D7382825" }}>
                    <span className="text-[8px] font-bold text-slate-500 block tracking-wider uppercase">
                      {isAfr ? "PRAKTYKE" : "PRACTICES"}
                    </span>
                    <span className="text-sm font-black text-[#D73828]">{assessment.onlyClassroom ? "N/A" : `L${practicesRating.toFixed(1)}`}</span>
                  </div>
                  <div className={`p-2 rounded-lg border text-center ${assessment.onlyWalkthrough ? "opacity-40" : ""}`} style={{ backgroundColor: "#00A1A308", borderColor: "#00A1A325" }}>
                    <span className="text-[8px] font-bold text-slate-500 block tracking-wider uppercase">
                      {isAfr ? "PEDAGOGIE" : "PEDAGOGY"}
                    </span>
                    <span className="text-sm font-black text-[#00A1A3]">{assessment.onlyWalkthrough ? "N/A" : `L${pedagogyRating.toFixed(1)}`}</span>
                  </div>
                  <div className="p-2 rounded-lg border text-center" style={{ backgroundColor: "#C8126E08", borderColor: "#C8126E25" }}>
                    <span className="text-[8px] font-bold text-slate-500 block tracking-wider uppercase">
                      {isAfr ? "PLATFORMS" : "PLATFORMS"}
                    </span>
                    <span className="text-sm font-black text-[#C8126E]">{`L${platformsRating.toFixed(1)}`}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Radar Profile Strength Diamond Vector Chart */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 border border-slate-205 rounded-lg bg-slate-50/80 shadow-inner">
              <div className="flex items-center justify-between w-full mb-2">
                <span className="text-[9px] font-extrabold uppercase text-slate-500 tracking-wider">
                  {isAfr ? "4P Dimensie Vektor" : "4P Dimension Vector"}
                </span>
                <span className="font-mono text-[9.5px] font-bold text-slate-700">
                  Avg: <strong style={{ color: archetype.color }}>{scoreAverage.toFixed(2)}</strong> / 4.00
                </span>
              </div>
              
              {/* SVG Radar */}
              <svg viewBox="-80 0 360 205" className="w-full max-w-[280px] h-auto drop-shadow-sm">
                {/* Concentric grid circles representing levels 1-4 */}
                <circle cx="100" cy="100" r="18" fill="none" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2,2" />
                <circle cx="100" cy="100" r="36" fill="none" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2,2" />
                <circle cx="100" cy="100" r="54" fill="none" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2,2" />
                <circle cx="100" cy="100" r="72" fill="none" stroke="#94a3b8" strokeWidth="0.75" />
                
                {/* Axes lines */}
                <line x1="100" y1="28" x2="100" y2="172" stroke="#94a3b8" strokeWidth="0.5" />
                <line x1="28" y1="100" x2="172" y2="100" stroke="#94a3b8" strokeWidth="0.5" />

                {/* Dimension Labels positioned outside the max level-4 circle */}
                <text x="100" y="16" fontSize="8" fontWeight="black" textAnchor="middle" fill="#890C58" className="tracking-tight">
                  {isAfr ? `MENSE (L${peopleRating.toFixed(1)})` : `PEOPLE (L${peopleRating.toFixed(1)})`}
                </text>
                <text x="178" y="103" fontSize="8" fontWeight="black" textAnchor="start" fill="#D73828" className="tracking-tight">
                  {isAfr ? `PRAKTYKE (L${practicesRating.toFixed(1)})` : `PRACTICES (L${practicesRating.toFixed(1)})`}
                </text>
                <text x="100" y="192" fontSize="8" fontWeight="black" textAnchor="middle" fill="#00A1A3" className="tracking-tight">
                  {isAfr ? `PEDAGOGIE (L${pedagogyRating.toFixed(1)})` : `PEDAGOGY (L${pedagogyRating.toFixed(1)})`}
                </text>
                <text x="22" y="103" fontSize="8" fontWeight="black" textAnchor="end" fill="#C8126E" className="tracking-tight">
                  {isAfr ? `PLATFORMS (L${platformsRating.toFixed(1)})` : `PLATFORMS (L${platformsRating.toFixed(1)})`}
                </text>

                {/* Polygon strength vectors path */}
                <polygon
                  points={pointsPath}
                  fill={`${archetype.color}25`}
                  stroke={archetype.color}
                  strokeWidth="2"
                  className="transition-all duration-300"
                />

                {/* Dot Markers */}
                <circle cx={getCoord(peopleRating, 270).split(",")[0]} cy={getCoord(peopleRating, 270).split(",")[1]} r="4" fill="#890C58" stroke="#ffffff" strokeWidth="1" />
                <circle cx={getCoord(practicesRating, 0).split(",")[0]} cy={getCoord(practicesRating, 0).split(",")[1]} r="4" fill="#D73828" stroke="#ffffff" strokeWidth="1" />
                <circle cx={getCoord(pedagogyRating, 90).split(",")[0]} cy={getCoord(pedagogyRating, 90).split(",")[1]} r="4" fill="#00A1A3" stroke="#ffffff" strokeWidth="1" />
                <circle cx={getCoord(platformsRating, 180).split(",")[0]} cy={getCoord(platformsRating, 180).split(",")[1]} r="4" fill="#C8126E" stroke="#ffffff" strokeWidth="1" />
              </svg>
            </div>
          </div>

          {/* Affective Diagnosis & Context (Single Language based on toggle) */}
          <div 
            className="rounded-xl p-4 border shadow-xs"
            style={{ 
              backgroundColor: `${archetype.color}0a`, 
              borderColor: `${archetype.color}35`,
              borderLeftWidth: "4px",
              borderLeftColor: archetype.color
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: archetype.color }} />
              <h4 className="text-[11px] font-black uppercase tracking-wider text-[#001489] font-display">
                {isAfr ? "Affektiewe Diagnose & Konteks" : "Affective Diagnosis & Context"}
              </h4>
            </div>
            <p className="text-[11px] text-slate-700 font-medium leading-relaxed font-sans whitespace-pre-line">
              {isAfr ? archetype.affectiveDiagnosisContextAfr : archetype.affectiveDiagnosisContext}
            </p>
          </div>
        </div>

        {/* SECTION 2: Operational to Affective Insight & Advisory Checks */}
        <div className="py-4 border-b border-slate-200 space-y-4">
          <div 
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 sm:p-3.5 rounded-xl border shadow-xs"
            style={{ 
              backgroundColor: `${archetype.color}14`, 
              borderColor: `${archetype.color}45`,
              borderLeftWidth: "6px",
              borderLeftColor: archetype.color
            }}
          >
            <div className="flex items-center gap-2.5">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 shadow-xs"
                style={{ backgroundColor: archetype.color }}
              >
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider font-display text-[#001489]">
                {isAfr ? "2. Operasionele na Affektiewe Insig & Advieskontroles" : "2. Operational to Affective Insight & Advisory Checks"}
              </h3>
            </div>
            <span 
              className="text-[9px] sm:text-[10px] font-black uppercase px-2.5 py-1 rounded-md border"
              style={{ backgroundColor: `${archetype.color}25`, color: "#001489", borderColor: `${archetype.color}50` }}
            >
              {isAfr ? archetype.strategicMatrix.titleAfr : archetype.strategicMatrix.title}
            </span>
          </div>

          {/* Strategic Matrix Table/Card for Current Level */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Operational Signals */}
            <div 
              className="bg-white rounded-xl p-4 border shadow-xs flex flex-col justify-between"
              style={{ borderColor: `${archetype.color}35` }}
            >
              <div>
                <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-slate-100">
                  <span 
                    className="text-[8.5px] font-black uppercase tracking-widest px-2 py-0.5 rounded"
                    style={{ backgroundColor: `${archetype.color}15`, color: "#001489" }}
                  >
                    {isAfr ? "Operasionele Bewyse" : "Operational Signals"}
                  </span>
                </div>
                <p className="text-[11px] text-slate-700 font-medium leading-relaxed font-sans">
                  {isAfr ? archetype.strategicMatrix.operationalSignalsAfr : archetype.strategicMatrix.operationalSignals}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 text-[9px] text-slate-400 font-bold uppercase">
                {isAfr ? "Wat gemonitor & gesien word" : "What is monitored & visible"}
              </div>
            </div>

            {/* Affective & Cultural Insight */}
            <div 
              className="bg-white rounded-xl p-4 border shadow-xs flex flex-col justify-between"
              style={{ borderColor: `${archetype.color}35` }}
            >
              <div>
                <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-slate-100">
                  <span 
                    className="text-[8.5px] font-black uppercase tracking-widest px-2 py-0.5 rounded"
                    style={{ backgroundColor: `${archetype.color}20`, color: "#001489" }}
                  >
                    {isAfr ? "Affektiewe & Kulturele Insig" : "Affective & Cultural Insight"}
                  </span>
                </div>
                <p className="text-[11px] text-slate-700 font-medium leading-relaxed font-sans">
                  {isAfr ? archetype.strategicMatrix.affectiveInsightAfr : archetype.strategicMatrix.affectiveInsight}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 text-[9px] text-slate-400 font-bold uppercase">
                {isAfr ? "Die menslike betekenis agter die data" : "Human meaning behind the data"}
              </div>
            </div>

            {/* Affective Reading */}
            <div 
              className="rounded-xl p-4 border shadow-xs flex flex-col justify-between"
              style={{ backgroundColor: `${archetype.color}10`, borderColor: `${archetype.color}45` }}
            >
              <div>
                <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b" style={{ borderColor: `${archetype.color}25` }}>
                  <span 
                    className="text-[8.5px] font-black uppercase tracking-widest px-2 py-0.5 rounded text-white shadow-xs"
                    style={{ backgroundColor: archetype.color }}
                  >
                    {isAfr ? "Affektiewe Lees" : "Affective Reading"}
                  </span>
                </div>
                <p className="text-[11px] font-black leading-relaxed font-sans text-[#001489]">
                  {isAfr ? archetype.strategicMatrix.affectiveReadingAfr : archetype.strategicMatrix.affectiveReading}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/50 text-[9px] font-black uppercase text-slate-500">
                {isAfr ? "Kulturele ingesteldheid opsomming" : "Cultural mindset summary"}
              </div>
            </div>
          </div>

          {/* Advisory Check Section */}
          <div 
            className="rounded-xl p-4 border shadow-xs"
            style={{ 
              backgroundColor: `${archetype.color}10`, 
              borderColor: `${archetype.color}40`,
              borderLeftWidth: "4px",
              borderLeftColor: archetype.color
            }}
          >
            <div className="flex items-start gap-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs"
                style={{ backgroundColor: archetype.color }}
              >
                <CheckCircle className="w-4 h-4" />
              </div>
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span 
                    className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border"
                    style={{ backgroundColor: `${archetype.color}25`, color: "#001489", borderColor: `${archetype.color}50` }}
                  >
                    {isAfr ? "Advieskontrole" : "Advisory Check"}
                  </span>
                  <h4 className="text-xs sm:text-sm font-black text-[#001489] font-display">
                    {isAfr ? archetype.advisoryCheck.questionAfr : archetype.advisoryCheck.question}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-750 font-medium leading-relaxed font-sans">
                  {isAfr ? archetype.advisoryCheck.detailAfr : archetype.advisoryCheck.detail}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: Critical Advisory Lens */}
        <div className="py-4 border-b border-slate-200 space-y-3">
          <div 
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 sm:p-3.5 rounded-xl border shadow-xs"
            style={{ 
              backgroundColor: `${archetype.color}14`, 
              borderColor: `${archetype.color}45`,
              borderLeftWidth: "6px",
              borderLeftColor: archetype.color
            }}
          >
            <div className="flex items-center gap-2.5">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 shadow-xs"
                style={{ backgroundColor: archetype.color }}
              >
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider font-display text-[#001489]">
                {isAfr 
                  ? `3. Kritiese Advieslens vir Affektiewe Transformasie - ${archetype.nameAfr}` 
                  : `3. Critical Advisory Lens for Affective Transformation - ${archetype.name}`}
              </h3>
            </div>
            <span 
              className="text-[9px] font-black uppercase px-2.5 py-1 rounded border"
              style={{ backgroundColor: `${archetype.color}25`, color: "#001489", borderColor: `${archetype.color}50` }}
            >
              {isAfr ? "Kulturele Fokus" : "Cultural Lens"}
            </span>
          </div>

          <div 
            className="rounded-xl p-4 border shadow-xs"
            style={{ 
              backgroundColor: `${archetype.color}08`, 
              borderColor: `${archetype.color}35`,
              borderLeftWidth: "4px",
              borderLeftColor: archetype.color
            }}
          >
            <p className="text-[11px] text-slate-700 font-medium leading-relaxed font-sans whitespace-pre-line">
              {isAfr ? archetype.criticalAdvisoryLensAfr : archetype.criticalAdvisoryLens}
            </p>
          </div>
        </div>

        {/* SECTION 4: Measures of Support */}
        <div className="py-4 border-b border-slate-200 space-y-3">
          <div 
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 sm:p-3.5 rounded-xl border shadow-xs"
            style={{ 
              backgroundColor: `${archetype.color}14`, 
              borderColor: `${archetype.color}45`,
              borderLeftWidth: "6px",
              borderLeftColor: archetype.color
            }}
          >
            <div className="flex items-center gap-2.5">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 shadow-xs"
                style={{ backgroundColor: archetype.color }}
              >
                <CheckCircle className="w-4 h-4" />
              </div>
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider font-display text-[#001489]">
                {isAfr ? "4. Maatreëls vir Ondersteuningsplan" : "4. Measures of Support"}
              </h3>
            </div>
            <span 
              className="text-[9px] font-black uppercase px-2.5 py-1 rounded border"
              style={{ backgroundColor: `${archetype.color}25`, color: "#001489", borderColor: `${archetype.color}50` }}
            >
              {isAfr ? "5 Sleutelareas van Ondersteuning" : "5 Key Pillars of Support"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
            {archetype.measuresOfSupport.map((srv, i: number) => (
              <div 
                key={i} 
                className="bg-white border rounded-xl p-3.5 shadow-xs flex flex-col justify-between hover:shadow-sm transition-all duration-200"
                style={{ borderColor: `${archetype.color}35` }}
              >
                <div>
                  <span 
                    className="inline-flex items-center justify-center text-[9.5px] font-black rounded px-2 py-1 mb-2.5 uppercase tracking-wide border w-full text-center"
                    style={{ 
                      backgroundColor: `${archetype.color}18`, 
                      color: "#001489",
                      borderColor: `${archetype.color}45` 
                    }}
                  >
                    {isAfr ? srv.titleAfr : srv.title}
                  </span>
                  <p className="text-[10.5px] text-slate-650 leading-relaxed font-sans font-medium">
                    {isAfr ? srv.textAfr : srv.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5: Strategic Action Rules for Advisory Walks */}
        <div className="py-4 border-b border-slate-200 space-y-3">
          <div 
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 sm:p-3.5 rounded-xl border shadow-xs"
            style={{ 
              backgroundColor: `${archetype.color}14`, 
              borderColor: `${archetype.color}45`,
              borderLeftWidth: "6px",
              borderLeftColor: archetype.color
            }}
          >
            <div className="flex items-center gap-2.5">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 shadow-xs"
                style={{ backgroundColor: archetype.color }}
              >
                <Sliders className="w-4 h-4" />
              </div>
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider font-display text-[#001489]">
                {isAfr 
                  ? "5. Strategiese Aksie-reëls vir Adviesbesoeke" 
                  : "5. Strategic Action Rules for Advisory Walks"}
              </h3>
            </div>
            <span 
              className="text-[9px] font-black uppercase px-2.5 py-1 rounded border"
              style={{ backgroundColor: `${archetype.color}25`, color: "#001489", borderColor: `${archetype.color}50` }}
            >
              {isAfr ? `${archetype.nameAfr} Aksieprotokol` : `${archetype.name} Action Protocol`}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {archetype.strategicActionRules.map((rule) => (
              <div 
                key={rule.num} 
                className="bg-white p-3.5 rounded-xl border shadow-xs flex flex-col justify-start"
                style={{ borderColor: `${archetype.color}35` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span 
                    className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-black shrink-0 shadow-xs"
                    style={{ backgroundColor: archetype.color }}
                  >
                    {rule.num}
                  </span>
                  <span 
                    className="text-[10.5px] font-black uppercase font-display text-[#001489]"
                  >
                    {isAfr ? rule.ruleAfr : rule.rule}
                  </span>
                </div>
                <p className="text-[10.5px] text-slate-650 leading-relaxed font-sans font-medium">
                  {isAfr ? rule.textAfr : rule.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 6: Field Observation Findings & Evidence */}
        <div className="py-4 border-b border-slate-200 space-y-4">
          <div 
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 sm:p-3.5 rounded-xl border shadow-xs"
            style={{ 
              backgroundColor: `${archetype.color}14`, 
              borderColor: `${archetype.color}45`,
              borderLeftWidth: "6px",
              borderLeftColor: archetype.color
            }}
          >
            <div className="flex items-center gap-2.5">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 shadow-xs"
                style={{ backgroundColor: archetype.color }}
              >
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider font-display text-[#001489]">
                {isAfr ? "6. Veldwaarnemings & Bewyse" : "6. Field Observation Findings & Evidence"}
              </h3>
            </div>
            <span 
              className="text-[9px] font-black uppercase px-2.5 py-1 rounded border"
              style={{ backgroundColor: `${archetype.color}25`, color: "#001489", borderColor: `${archetype.color}50` }}
            >
              {isAfr ? "Veldrekords" : "Field Logs"}
            </span>
          </div>

          {/* Walkthrough Details (School-wide) */}
          {(assessment.primaryBarrier || assessment.collaborationChannel) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-4">
              {assessment.primaryBarrier && (
                <div className="bg-slate-50 p-2.5 text-[10.5px] rounded border border-slate-200">
                  <span className="text-[8px] font-black text-slate-400 block uppercase mb-0.5">
                    {isAfr ? "Primêr Geïdentifiseerde Hindernis" : "Primary Identified Barrier"}
                  </span>
                  <span className="text-slate-700 font-semibold font-sans">{assessment.primaryBarrier}</span>
                </div>
              )}
              {assessment.collaborationChannel && (
                <div className="bg-slate-50 p-2.5 text-[10.5px] rounded border border-slate-200">
                  <span className="text-[8px] font-black text-slate-400 block uppercase mb-0.5">
                    {isAfr ? "Personeel Portuur-vertroue & Deel-ingesteldheid" : "Staff Peer-Sharing Mindset & Trust"}
                  </span>
                  <span className="text-slate-700 font-semibold font-sans">{assessment.collaborationChannel}</span>
                </div>
              )}
            </div>
          )}

          {assessment.onlyWalkthrough ? (
            <div className="bg-amber-50/60 border border-amber-200 p-4 rounded-xl text-xs flex items-center gap-3">
              <span className="text-lg">ℹ️</span>
              <div>
                <span className="block text-[10px] font-black uppercase text-[#001489] tracking-wider font-extrabold">
                  {isAfr ? "Slegs-Deurloop Evaluasie-protokol:" : "Walkthrough-Only Assessment Protocol:"}
                </span>
                <p className="text-slate-750 font-medium leading-relaxed mt-0.5">
                  {isAfr
                    ? "Die e-Leer Adviseur het hierdie besoek slegs as 'n skoolwye digitale kultuur-deurloop aangemerk. Aangesien geen formele klaskamerlesse waargeneem is nie, evalueer die saamgestelde punt slegs die Mense- en Praktyke-pilare."
                    : "The eLearning Advisor has designated this school visit as a school-wide digital culture walkthrough only. Since no formal in-classroom lesson sessions were assessed today, the composite score evaluates only the People and Practices pillars. Lesson-level rubrics are omitted."}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {assessment.onlyClassroom && (
                <div className="bg-sky-50/60 border border-sky-200 p-4 rounded-xl text-xs flex items-center gap-3 shadow-xs">
                  <span className="text-lg">ℹ️</span>
                  <div>
                    <span className="block text-[10px] font-black uppercase text-[#001489] tracking-wider">
                      {isAfr ? "Slegs-Klaskamer Evaluasie-protokol:" : "Classroom-Only Assessment Protocol:"}
                    </span>
                    <p className="text-slate-750 font-medium leading-relaxed mt-0.5">
                      {isAfr
                        ? "Die e-Leer Adviseur het hierdie besoek slegs op klaskamerlesse gefokus. Die skoolwye makro-deurlooppunte onder Mense & Praktyke is weggelaat uit die puntberekening."
                        : "The eLearning Advisor has designated this school visit as focusing solely on active classroom lesson sessions. The school-wide macro walkthrough scores under People & Practices are excluded from score averages and profile representation."}
                    </p>
                  </div>
                </div>
              )}
              {(assessment.classrooms || [assessment]).map((cls: any, idx: number) => {
                const classLabel = assessment.classrooms && assessment.classrooms.length > 1 
                  ? (isAfr ? `Waargenome Klaskamer ${idx + 1}: ${cls.teacherName || "Naamloos"}` : `Observed Classroom ${idx + 1}: ${cls.teacherName || "Unnamed"}`)
                  : (isAfr ? `Klaskamerwaarneming Konteks` : `Classroom Observation Context`);

                return (
                  <div key={idx} className="bg-slate-50/50 border border-slate-200/80 rounded-xl p-4 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-[11px] font-black uppercase text-[#001489] tracking-wider font-display">
                        {classLabel}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs bg-white p-3 rounded-lg border border-slate-200">
                      <div>
                        <span className="text-[8px] font-black text-slate-400 block uppercase">
                          {isAfr ? "ONDERWYSER" : "TEACHER OBSERVED"}
                        </span>
                        <span className="text-slate-800 font-sans">{cls.teacherName || "N/A"}</span>
                      </div>
                      <div>
                        <span className="text-[8px] font-black text-slate-400 block uppercase">
                          {isAfr ? "VAK" : "SUBJECT"}
                        </span>
                        <span className="text-slate-800 font-sans">{cls.subjectObserved || "N/A"}</span>
                      </div>
                      <div>
                        <span className="text-[8px] font-black text-slate-400 block uppercase">
                          {isAfr ? "GRAADKLAS" : "GRADE CLASS"}
                        </span>
                        <span className="text-slate-800 font-sans">{cls.gradeObserved || "N/A"}</span>
                      </div>
                      <div>
                        <span className="text-[8px] font-black text-slate-400 block uppercase">
                          {isAfr ? "LESFOKUS / TEMA" : "LESSON FOCUS TOPIC"}
                        </span>
                        <span className="text-slate-800 font-sans">{cls.lessonTopic || "N/A"}</span>
                      </div>
                      <div>
                        <span className="text-[8px] font-black text-slate-400 block uppercase">
                          {isAfr ? "AANTAL LEERDERS" : "LEARNERS IN CLASS"}
                        </span>
                        <span className="text-slate-800 font-sans">{cls.learnersCount || "N/A"}</span>
                      </div>
                    </div>

                    {/* Technical Checklist */}
                    {(cls.smartboardObserved || cls.tabletsObserved || cls.labObserved || cls.internetObserved || cls.offlineObserved) && (
                      <div className="bg-white p-2.5 text-xs rounded border border-slate-200 animate-fade-in">
                        <span className="text-[8px] font-black text-slate-400 block uppercase mb-1.5">
                          {isAfr ? "Waargenome Tegniese Bewyse:" : "Observed Live Technical Evidence:"}
                        </span>
                        <div className="flex flex-wrap gap-2 text-[9px] font-extrabold uppercase">
                          {cls.smartboardObserved && (
                            <span className="bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded">
                              {isAfr ? "✓ Slimklaskamer-tegnologiegebruik" : "✓ Smart Classroom Technology Use"}
                            </span>
                          )}
                          {cls.tabletsObserved && (
                            <span className="bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded">
                              {isAfr ? "✓ Leerder-tablette" : "✓ Learner Tablets"}
                            </span>
                          )}
                          {cls.labObserved && (
                            <span className="bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded">
                              {isAfr ? "✓ e-Leer Laboratorium Gebruik" : "✓ eLearning Lab Utilised"}
                            </span>
                          )}
                          {cls.internetObserved && (
                            <span className="bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded">
                              {isAfr ? "✓ Aanlyn Aktiwiteite" : "✓ Online Activities"}
                            </span>
                          )}
                          {cls.offlineObserved && (
                            <span className="bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded">
                              {isAfr ? "✓ Vanlyn Digitale Hulpbronne" : "✓ Offline Digital Resources/Tool"}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Deep Granular Field Evidence Table */}
                    <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3.5 shadow-xs">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div>
                          <dt className="text-[8px] font-black uppercase text-slate-400 tracking-wider">
                            {isAfr ? "Aktiewe Digitale Gereedskap & Platforms in die Les" : "Active Digital Tools & Platforms Used in the Lesson"}
                          </dt>
                          <dd className="text-slate-800 font-medium font-sans mt-0.5 bg-slate-50 border border-slate-150 rounded p-2 whitespace-pre-line min-h-[46px]">
                            {cls.toolsUsed || (isAfr ? "Nie gedokumenteer tydens besoek nie" : "Not documented during classroom visit")}
                          </dd>
                        </div>

                        <div>
                          <dt className="text-[8px] font-black uppercase text-slate-400 tracking-wider">
                            {isAfr ? "Geverifieerde Leerder Digitale Artefak" : "Verified Learner Digital Artefact"}
                          </dt>
                          <div className="space-y-2 mt-0.5">
                            <dd className="text-slate-800 font-medium font-sans bg-slate-50 border border-slate-150 rounded p-2 whitespace-pre-line min-h-[46px]">
                              {cls.artifactVerified || (isAfr ? "Nie geverifieer of geen gedokumenteer nie" : "Not verified or none documented")}
                            </dd>
                            {cls.artifactPhoto && (
                              <div className="p-1 bg-slate-50 border border-slate-200 rounded max-w-[240px]">
                                <div className="text-[7px] font-black text-slate-400 uppercase tracking-widest px-1 mb-1 bg-white/60 rounded border border-slate-100 py-0.5 text-center">
                                  {isAfr ? "Geverifieerde Foto-aanhegsel" : "Verified Photo Attachment"}
                                </div>
                                <img 
                                  src={cls.artifactPhoto} 
                                  alt="Verified Learner Digital Artefact Evidence" 
                                  className="w-full h-auto max-h-40 object-contain rounded border border-slate-150"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <dt className="text-[8px] font-black uppercase text-slate-400 tracking-wider">
                            {isAfr ? "Aktiewe Onderwyser Opleidingsmylpale (2026 Strategie)" : "Active Teacher Upskilling Milestones (2026 Strategy)"}
                          </dt>
                          <dd className="text-slate-800 font-medium font-sans mt-0.5 bg-slate-50 border border-slate-150 rounded p-2 whitespace-pre-line min-h-[46px]">
                            {cls.teacherUpskilling || (isAfr ? "Nie gedokumenteer nie" : "Not documented")}
                          </dd>
                        </div>

                        <div>
                          <dt className="text-[8px] font-black uppercase text-slate-400 tracking-wider">
                            {isAfr ? "e-Adviseur Klaskamer-voorstelle & Intervensies" : "eAdvisor In-Classroom Suggestions & Interventions"}
                          </dt>
                          <dd className="text-slate-800 font-medium font-sans mt-0.5 bg-slate-50 border border-slate-150 rounded p-2 whitespace-pre-line min-h-[46px]">
                            {cls.advisorSupport || (isAfr ? "Geen aanbevelings gedokumenteer nie" : "No recommendations or interventions documented")}
                          </dd>
                        </div>

                        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <dt className="text-[8px] font-black uppercase text-slate-400 tracking-wider">
                              {isAfr ? "Waargenome Onderwyseraksie" : "Observed Teacher Action"}
                            </dt>
                            <dd className="text-slate-800 font-medium font-sans mt-0.5 bg-slate-50 border border-slate-150 rounded p-2 whitespace-pre-line min-h-[46px]">
                              {cls.teacherAction || (isAfr ? "Nie gedokumenteer nie" : "Not documented")}
                            </dd>
                          </div>

                          <div>
                            <dt className="text-[8px] font-black uppercase text-slate-400 tracking-wider">
                              {isAfr ? "Waargenome Leerderaksie" : "Observed Learner Action"}
                            </dt>
                            <dd className="text-slate-800 font-medium font-sans mt-0.5 bg-slate-50 border border-slate-150 rounded p-2 whitespace-pre-line min-h-[46px]">
                              {cls.learnerAction || (isAfr ? "Nie gedokumenteer nie" : "Not documented")}
                            </dd>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Signature Blocks */}
        <div className="pt-8 grid grid-cols-2 gap-8">
          <div className="text-center space-y-8">
            <div className="h-px bg-slate-300 w-full" />
            <div className="text-[9px] text-slate-400 font-black uppercase tracking-widest leading-none">
              {isAfr ? "e-Leer Adviseur Handtekening" : "eLearning Advisor Signature"}
              <span className="block font-semibold lowercase text-slate-500 mt-1">{advisor.advisorName || (isAfr ? "Volle naam" : "Full name")}</span>
            </div>
          </div>

          <div className="text-center space-y-8 border-slate-200">
            <div className="h-px bg-slate-300 w-full" />
            <div className="text-[9px] text-slate-400 font-black uppercase tracking-widest leading-none">
              {isAfr ? "Skoolhoof Handtekening" : "School Principal Signature"}
              <span className="block font-semibold lowercase text-slate-500 mt-1">
                {isAfr ? "Gemagtigde Seël & Handtekening" : "Authorized Seal & Sign"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Report control buttons, completely hidden on paper print */}
      <div className="no-print mt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
        <button
          onClick={onBack}
          className="w-full sm:w-auto bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs px-4 py-2 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-95 uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isAfr ? "WYSIG WAARNEMINGS" : "EDIT OBSERVATIONS"}</span>
        </button>

        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={onReset}
            className="w-full sm:w-auto border border-red-200 bg-red-50/50 hover:bg-red-50 text-red-650 font-bold text-xs px-4 py-2 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 uppercase"
          >
            <RotateCcw className="w-3.5 h-3.5 text-red-550" />
            <span>{isAfr ? "HERSTEL" : "RESET"}</span>
          </button>
          
          <button
            onClick={copyForOutlook}
            className="w-full sm:w-auto bg-[#007DBA] hover:bg-[#006090] text-white font-bold text-xs px-4 py-2 rounded-lg shadow-sm hover:shadow transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 uppercase"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{isAfr ? "KOPIEER KNIPBORD" : "Copy Clipboard"}</span>
          </button>

          <button
            onClick={handlePrint}
            className="w-full sm:w-auto bg-[#001489] hover:bg-[#000e60] text-white font-black text-xs px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 uppercase tracking-wide border border-blue-900"
          >
            <Printer className="w-4 h-4" />
            <span>{isAfr ? "DRUK / STOOR AS PDF" : "PRINT / SAVE AS PDF"}</span>
          </button>
        </div>
      </div>

      <div className="no-print mt-2 text-center text-[10px] text-slate-500 font-sans leading-normal bg-slate-100 p-3 rounded-lg border border-slate-200 shadow-sm max-w-2xl mx-auto">
        <strong>{isAfr ? "Wenk vir Adviseurs:" : "Advisor Tip:"}</strong>{" "}
        {isAfr 
          ? 'Om \'n perfekte, hoë-kwaliteit PDF-verslag af te laai, klik op die bogenoemde knoppie en kies "Stoor as PDF" as die bestemming in jou stelsel-dialoog.' 
          : 'To download a pixel-perfect, high-quality PDF report, click the button above and select "Save as PDF" as the printer destination in your system dialog.'}
      </div>
    </div>
  );
}
