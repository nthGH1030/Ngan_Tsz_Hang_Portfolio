import React, { useState } from 'react';
import { IoIosArrowForward } from "react-icons/io";

interface ExperienceData {
    id: number;
    role: string;
    company: string;
    companyUrl?: string;
    period: string;
    responsibilities: string[];
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
            isCurrentCareer: true,
            responsibilities: [
                `Analyzed team workflows to identify inefficiencies in project expenditure tracking; 
                proposed and developed a desktop application to automate data extraction and payment 
                form generation from Excel files, designed user workflows, gathered user feedback, 
                and iteratively improved the tool to centralize tracking and enhance team efficiency.`,
                
                `Collaborated with internal IT teams and end users to identify and suggest use cases 
                for adopting automation and AI agents to enhance workflow efficiency; drafted 
                presentations and architecture diagrams, developed technical demos, and utilized 
                concepts such as user journeys and happy paths to illustrate how the software could 
                be integrated into existing workflow.`,
                
                `Managed multiple properties as a project manager, overseeing technical aspects 
                and coordinating with leasing and property management teams to deliver construction 
                projects on schedule and within budget, while ensuring full compliance with relevant 
                regulations and standards.`
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
                        className={`text-left px-4 py-3 text-sm font-medium border-l-2 transition-all
                            ${activeTab === exp.id
                                ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                                : 'border-gray-300 text-gray-600 hover:bg-blue-50/50 hover:text-blue-600'
                            }`}
                    >
                        <div className="flex flex-col">
                            <span className="font-semibold">Assistant Project Manager</span>
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
                                className={`text-left px-4 py-3 text-sm font-medium border-l-2 transition-all
                                    ${activeTab === exp.id
                                        ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                                        : 'border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-700'
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
            <div className="flex-1 min-w-0">
                {experiences.map((exp) => (
                    <div
                        key={exp.id}
                        id={`panel-${exp.id}`}
                        role="tabpanel"
                        aria-labelledby={`tab-${exp.id}`}
                        className={activeTab === exp.id ? '' : 'hidden'}
                    >
                        <h3 className="flex flex-wrap items-baseline gap-1">
                            <span className="font-semibold text-gray-900">{exp.role}</span>
                            <span className="text-gray-500">&nbsp;@&nbsp;</span>
                            {exp.companyUrl ? (
                                <a
                                    href={exp.companyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 font-medium hover:underline"
                                >
                                    {exp.company}
                                </a>
                            ) : (
                                <span className="text-gray-600 font-medium">{exp.company}</span>
                            )}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">{exp.period}</p>
                        <div className="max-w-xl mt-4 flex flex-col gap-4">
                            {exp.responsibilities.map((responsibility, idx) => (
                                <div key={idx} className="flex items-start gap-4">
                                    <div className="mt-1">
                                        <IoIosArrowForward />
                                    </div>
                                    <div>
                                        <p className="text-[clamp(0.9rem,2.5vw,1rem)]">
                                            {responsibility}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExperienceTabs;
