import React, { useState } from 'react';
import { IoIosArrowForward } from "react-icons/io";

interface SubExperience {
    id: string;
    title: string;
    period: string;
    scope: string;
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
    responsibilities: string[];
    subExperiences?: SubExperience[];
    isCurrentCareer: boolean;
}

const ExperienceTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);

    const experiences: ExperienceData[] = [
        {
            id: 0,
            role: "Assistant Project Manager",
            company: "Gaw Capital Asset Management Limited",
            companyUrl: "https://www.gawcapital.com/",
            period: "2018 - Present",
            summary: "Cross-functional project delivery with an internal software-innovation track.",
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
                    period: "2025 - Present",
                    scope: "Software Development Initiative",
                    highlights: [
                        "Worked with end users and internal IT to identify high-value use cases for AI agents and automation in existing workflows.",
                        "Independently developed architecture diagrams and lightweight demos to help stakeholders visualize and compare practical implementation options.",
                        "Proactively introduced software ideas beyond my formal remit, translating them into business-focused proposals so non-technical stakeholders could assess value, feasibility, and next steps."
                    ]
                }
            ]
        },
        {
            id: 1,
            role: "Assistant Building Surveyor",
            company: "United Consultancy Limited",
            period: "2017 - 2018",
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

    const handleCtaClick = (targetId: string, sectionId?: string) => {
        const target = document.getElementById(targetId);

        if (!target) {
            return;
        }

        const section = sectionId ? document.getElementById(sectionId) : target.closest('section');
        const snapContainer = document.getElementById('snapContainer');

        if (snapContainer && section) {
            snapContainer.scrollTo({
                top: section.offsetTop,
                behavior: 'smooth'
            });

            window.setTimeout(() => {
                const overflowContainer = target.closest('.overflow-y-auto');

                if (overflowContainer instanceof HTMLElement) {
                    const targetTop = target.offsetTop - overflowContainer.offsetTop;
                    overflowContainer.scrollTo({
                        top: Math.max(targetTop - 16, 0),
                        behavior: 'smooth'
                    });
                    return;
                }

                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 450);

            return;
        }

        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="flex flex-col md:flex-row gap-6">
            {/* Vertical Tab List */}
            <div role="tablist" aria-label="Job tabs" className="flex flex-col relative min-w-max">
                {currentCareerExperiences.map((exp) => (
                    <button
                        key={exp.id}
                        id={`tab-${exp.id}`}
                        role="tab"
                        aria-selected={activeTab === exp.id}
                        aria-controls={`panel-${exp.id}`}
                        onClick={() => setActiveTab(exp.id)}
                        className={`text-left px-4 py-3 text-sm font-medium border-l-2 transition-all cursor-pointer
                            ${activeTab === exp.id
                                ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                                : 'border-gray-300 text-gray-600 hover:bg-blue-50/50 hover:text-blue-600'
                            }`}
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
                                onClick={() => setActiveTab(exp.id)}
                                className={`text-left px-4 py-3 text-sm font-medium border-l-2 transition-all cursor-pointer
                                    ${activeTab === exp.id
                                        ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                                        : 'border-gray-300 text-gray-500 hover:bg-gray-50/50 hover:text-gray-700'
                                    }`}
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
                        <h3 className="flex flex-wrap items-baseline gap-1">
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
                            <p className="mt-3 text-sm text-gray-600 max-w-2xl">{activeExperience.summary}</p>
                        )}

                        <div className="max-w-2xl mt-5">
                            <h4 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Core Role</h4>
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

                        {activeExperience.subExperiences && activeExperience.subExperiences.length > 0 && (
                            <div className="mt-8 max-w-3xl">
                                <h4 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Software Engineering Contributions</h4>
                                <div className="mt-3 border-l-2 border-blue-200 pl-4 md:pl-6 space-y-4">
                                    {activeExperience.subExperiences.map((subExp) => (
                                        <article key={subExp.id} className="rounded-lg border border-blue-100 bg-blue-50/40 p-4">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h5 className="font-semibold text-gray-900">{subExp.title}</h5>
                                                <span className="text-[11px] uppercase tracking-wide text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
                                                    {subExp.scope}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">{subExp.period}</p>
                                            <ul className="mt-3 space-y-2">
                                                {subExp.highlights.map((highlight, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                                                        <span>{highlight}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            {subExp.ctaTargetId && subExp.ctaLabel && (
                                                <div className="mt-4">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleCtaClick(subExp.ctaTargetId!, subExp.ctaSectionId)}
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
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExperienceTabs;
