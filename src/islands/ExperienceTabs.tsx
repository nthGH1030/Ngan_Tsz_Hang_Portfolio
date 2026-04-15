import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BsFillCircleFill } from "react-icons/bs";

interface SubExperience {
    id: string;
    title: string;
    period: string;
    scope: string;
    publicOverview?: string;
    exampleOfWork?: string[];
    highlights: string[];
    ctaLabel?: string;
    ctaTargetId?: string;
    ctaSectionId?: string;
}

interface ExperienceData {
    id: number;
    role: string;
    company: string;
    companyUrl?: string;
    period: string;
    summary?: string;
    roleContext?: string;
    primaryTrackLabel?: string;
    secondaryTrackLabel?: string;
    responsibilities: string[];
    subExperiences?: SubExperience[];
    isCurrentCareer: boolean;
}

const ExperienceTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [activeSoftwareIndex, setActiveSoftwareIndex] = useState(0);

    const experiences: ExperienceData[] = [
        {
            id: 0,
            role: "Assistant Project Manager",
            company: "Gaw Capital Asset Management Limited",
            companyUrl: "https://www.gawcapital.com/",
            period: "2018 - Present",
            summary: "Primary role in building and surveying project delivery, with a separate internal software initiative stream developed alongside that work.",
            roleContext: "This role should be read as project management in the built-environment domain first. The software work below is a parallel initiative introduced within that role, not eight years of software project management.",
            primaryTrackLabel: "Primary role: Building and surveying project delivery",
            secondaryTrackLabel: "Self-initiatives",
            isCurrentCareer: true,
            responsibilities: [
                "Managed multiple properties as a project manager, coordinating leasing and property-management teams to deliver construction projects on schedule and within budget while maintaining compliance.",
                "Led technical planning and vendor coordination for project execution, balancing operational constraints with delivery quality and cost control.",
                "Acted as a bridge between operations and IT to identify practical opportunities where software could remove recurring friction in day-to-day work."
            ],
            subExperiences: [
                {
                    id: "internal-tools",
                    title: "Internal Tooling and Workflow Automation",
                    period: "2022 - Present",
                    scope: "Software Development Initiative",
                    highlights: [
                        "Designed and built a desktop workflow tool to automate Excel data extraction and payment-form generation, reducing repetitive manual steps for the team.",
                        "Mapped user journeys with stakeholders, translated bottlenecks into product requirements, and iterated the tool from user feedback.",
                        "Created reusable process logic that centralized tracking and made project-expenditure status easier to audit and communicate."
                    ],
                    ctaLabel: "View Payment Form filler",
                    ctaTargetId: "payment-form-filler",
                    ctaSectionId: "other-projects"
                },
                {
                    id: "ai-solutioning",
                    title: "AI and Automation Solution Prototyping",
                    period: "2025",
                    scope: "Internal Initiative (Confidential)",
                    publicOverview: "Built and tested practical AI/automation concepts for internal workflows, focusing on high-friction operational tasks and clear business value.",
                    exampleOfWork: [
                        "Built a custom chatbot demo to automate team inquiries. Mapped out a guided FAQ logic and converted legacy 'hard copy' data into callable function tools, allowing the assistant to provide data-driven answers from internal domain knowledge"
                    ],
                    highlights: [],
                }
            ]
        },
        {
            id: 1,
            role: "Assistant Building Surveyor",
            company: "United Consultancy Limited",
            period: "2017 - 2018",
            primaryTrackLabel: "Role focus",
            isCurrentCareer: false,
            responsibilities: [
                "Add your surveying experience and responsibilities here...",
                "Additional responsibility details...",
                "More accomplishments and duties..."
            ]
        },
        {
            id: 2,
            role: "Assistant Building Surveyor",
            company: "ISS Building Consultancy",
            period: "2015 - 2017",
            primaryTrackLabel: "Role focus",
            isCurrentCareer: false,
            responsibilities: [
                "Add your surveying experience and responsibilities here...",
                "Additional responsibility details...",
                "More accomplishments and duties..."
            ]
        }
    ];

    const currentCareerExperiences = experiences.filter(exp => exp.isCurrentCareer);
    const previousCareerExperiences = experiences.filter(exp => !exp.isCurrentCareer);
    const activeExperience = experiences.find(exp => exp.id === activeTab);

    const handleExperienceTabChange = (experienceId: number) => {
        setActiveTab(experienceId);
        setActiveSoftwareIndex(0);
    };

    const handleCtaClick = (targetId: string) => {
        const target = document.getElementById(targetId);

        if (!(target instanceof HTMLElement)) {
            return;
        }

        target.scrollIntoView({ behavior: 'auto', block: 'start' });
    };

    return (
        <div className="flex flex-col gap-6 md:grid md:grid-cols-[16rem_minmax(0,1fr)] md:gap-6">
            {/* Vertical Tab List */}
            <div role="tablist" aria-label="Job tabs" className="flex flex-col relative min-w-0">
                {currentCareerExperiences.map((exp) => (
                    <button
                        key={exp.id}
                        id={`tab-${exp.id}`}
                        role="tab"
                        aria-selected={activeTab === exp.id}
                        aria-controls={`panel-${exp.id}`}
                        onClick={() => handleExperienceTabChange(exp.id)}
                        className={`text-left px-4 py-3 text-sm font-medium border-l-2 transition-all cursor-pointer
                            ${activeTab === exp.id
                                ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                                : 'border-gray-300 text-gray-600 hover:bg-blue-50/50 hover:text-blue-600'
                            }`}
                        style={{ fontFamily: "'Barlow', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
                    >
                        <div className="flex flex-col">
                            <span className="font-semibold">{exp.role}</span>
                            <span className="text-xs opacity-70">{exp.company}</span>
                        </div>
                    </button>
                ))}

                {previousCareerExperiences.length > 0 && (
                    <>
                        {/* Divider */}
                        <div className="my-2 flex items-center gap-2 px-4">
                            <div className="h-px bg-gray-300 flex-1"></div>
                            <span className="text-xs text-gray-400 font-medium">Previous</span>
                            <div className="h-px bg-gray-300 flex-1"></div>
                        </div>

                        {previousCareerExperiences.map((exp) => (
                            <button
                                key={exp.id}
                                id={`tab-${exp.id}`}
                                role="tab"
                                aria-selected={activeTab === exp.id}
                                aria-controls={`panel-${exp.id}`}
                                onClick={() => handleExperienceTabChange(exp.id)}
                                className={`text-left px-4 py-3 text-sm font-medium border-l-2 transition-all cursor-pointer
                                    ${activeTab === exp.id
                                        ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                                        : 'border-gray-300 text-gray-500 hover:bg-gray-50/50 hover:text-gray-700'
                                    }`}
                                style={{ fontFamily: "'Barlow', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
                            >
                                <div className="flex flex-col">
                                    <span className="font-semibold">{exp.role}</span>
                                    <span className="text-xs opacity-70">{exp.company}</span>
                                </div>
                            </button>
                        ))}
                    </>
                )}
            </div>

            {/* Tab Panels */}
            <div className="flex-1 min-w-0 min-h-[500px]">
                {activeExperience && (
                    <div
                        id={`panel-${activeExperience.id}`}
                        role="tabpanel"
                        aria-labelledby={`tab-${activeExperience.id}`}
                    >
                        <h3
                            className="flex flex-wrap items-baseline gap-1"
                            style={{ fontFamily: "'Barlow', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
                        >
                            <span className="font-semibold text-gray-900">{activeExperience.role}</span>
                            <span className="text-gray-500">&nbsp;@&nbsp;</span>
                            {activeExperience.companyUrl ? (
                                <a
                                    href={activeExperience.companyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 font-medium hover:underline"
                                >
                                    {activeExperience.company}
                                </a>
                            ) : (
                                <span className="text-gray-600 font-medium">{activeExperience.company}</span>
                            )}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">{activeExperience.period}</p>

                        {activeExperience.summary && (
                            <p className="mt-3 text-sm text-gray-600 max-w-3xl">{activeExperience.summary}</p>
                        )}

                        {activeExperience.subExperiences && activeExperience.subExperiences.length > 0 ? (
                            <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                                <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                    <div className="flex items-center gap-3">
                                        <span
                                            className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white"
                                            style={{ fontFamily: "'Barlow', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
                                        >
                                            Core
                                        </span>
                                        <p className="text-sm font-medium text-slate-500">Primary responsibility</p>
                                    </div>
                                    <div className="mt-5 space-y-4">
                                        {activeExperience.responsibilities.map((responsibility, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <span className="mt-2 h-2 w-2 rounded-full bg-slate-400"></span>
                                                <p className="text-[clamp(0.9rem,2.5vw,1rem)] leading-7 text-slate-700">
                                                    {responsibility}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section className="rounded-2xl border border-blue-100 bg-blue-50/50 p-5">
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <span
                                                className="inline-flex rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white"
                                                style={{ fontFamily: "'Barlow', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
                                            >
                                                Software
                                            </span>
                                            <p className="text-sm font-medium text-blue-700">Self-initiatives</p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setActiveSoftwareIndex((prev) => Math.max(prev - 1, 0))}
                                                disabled={activeSoftwareIndex === 0}
                                                className="rounded-full border border-blue-200 bg-white px-3 py-1.5 text-sm text-blue-700 transition disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                Prev
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setActiveSoftwareIndex((prev) => Math.min(prev + 1, activeExperience.subExperiences!.length - 1))}
                                                disabled={activeSoftwareIndex === activeExperience.subExperiences.length - 1}
                                                className="rounded-full border border-blue-200 bg-white px-3 py-1.5 text-sm text-blue-700 transition disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-5 overflow-hidden pb-2">
                                        <div
                                            className="flex gap-4 transition-transform duration-300 ease-out"
                                            style={{ transform: `translateX(calc(${activeSoftwareIndex * -100}% - ${activeSoftwareIndex}rem))` }}
                                        >
                                            {activeExperience.subExperiences.map((subExp, idx) => (
                                                <article
                                                    key={subExp.id}
                                                    className={`min-w-full rounded-xl border p-4 transition-all ${
                                                        activeSoftwareIndex === idx
                                                            ? 'border-blue-200 bg-white shadow-sm'
                                                            : 'border-blue-100 bg-white/80'
                                                    }`}
                                                >
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <h5
                                                            className="font-semibold text-gray-900"
                                                            style={{ fontFamily: "'Barlow', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
                                                        >{subExp.title}</h5>
                                                        <span
                                                            className="text-[11px] uppercase tracking-wide text-blue-700 bg-blue-100 px-2 py-1 rounded-full"
                                                            style={{ fontFamily: "'Barlow', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
                                                        >
                                                            {subExp.scope}
                                                        </span>
                                                    </div>
                                                    <p className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-500">{subExp.period}</p>
                                                    {subExp.publicOverview && (
                                                        <p className="mt-3 text-sm leading-6 text-slate-700">{subExp.publicOverview}</p>
                                                    )}
                                                    {subExp.highlights.length > 0 && (
                                                        <ul className="mt-4 space-y-2">
                                                            {subExp.highlights.map((highlight, idx) => (
                                                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                                                    <BsFillCircleFill className="mt-[5px] shrink-0 text-[6px] text-blue-400" />
                                                                    <span>{highlight}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}

                                                    {subExp.exampleOfWork && subExp.exampleOfWork.length > 0 && (
                                                        <details className="mt-4 rounded-lg border border-blue-100 bg-blue-50/40 p-3">
                                                            <summary className="cursor-pointer text-sm font-medium text-blue-700 list-none">
                                                                <span className="flex w-full items-center justify-between gap-3">
                                                                    <span className="inline-block">Domain FAQ tool with chat interface</span>
                                                                    <IoIosArrowDown className="shrink-0" />
                                                                </span>
                                                            </summary>
                                                            <ul className="mt-3 space-y-2">
                                                                {subExp.exampleOfWork.map((example, idx) => (
                                                                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                                                                        <BsFillCircleFill className="mt-[5px] shrink-0 text-[6px] text-blue-400" />
                                                                        <span>{example}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </details>
                                                    )}

                                                    {subExp.ctaTargetId && subExp.ctaLabel && (
                                                        <div className="mt-4">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleCtaClick(subExp.ctaTargetId!)}
                                                                className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-700 transition-colors hover:border-blue-300 hover:bg-blue-100/70"
                                                            >
                                                                {subExp.ctaLabel}
                                                            </button>
                                                        </div>
                                                    )}
                                                </article>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {activeExperience.subExperiences.map((subExp, idx) => (
                                            <button
                                                key={subExp.id}
                                                type="button"
                                                onClick={() => setActiveSoftwareIndex(idx)}
                                                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                                                    activeSoftwareIndex === idx
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-white text-blue-700 border border-blue-200 hover:bg-blue-100/70'
                                                }`}
                                            >
                                                {idx + 1}. {subExp.title}
                                            </button>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        ) : (
                            <div className="max-w-2xl mt-5">
                                <h4
                                    className="text-xs font-semibold tracking-wider text-gray-500 uppercase"
                                    style={{ fontFamily: "'Barlow', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
                                >{activeExperience.primaryTrackLabel ?? 'Role focus'}</h4>
                                <div className="mt-3 flex flex-col gap-4">
                                    {activeExperience.responsibilities.map((responsibility, idx) => (
                                        <div key={idx} className="flex items-start gap-4">
                                            <div className="mt-1 text-gray-600">
                                                <IoIosArrowForward />
                                            </div>
                                            <p className="text-[clamp(0.9rem,2.5vw,1rem)] text-gray-700">
                                                {responsibility}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExperienceTabs;
