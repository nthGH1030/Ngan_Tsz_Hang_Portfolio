import React from 'react';
import Tag from './Tag';
import { FaGithub } from "react-icons/fa"
import ExternalLink from '../navigation/ExternalLink';


export interface CardProps{
    title : string;
    content : string;
    tagNames: string[];
    href?: string;
    gitHref?: string;
    paragraphClass?: string;
}

export interface TagData{
    name : string;
    category : string;
}

const ProjectCard: React.FC<CardProps> = ({title, content, tagNames, href, gitHref, paragraphClass = "text-gray-700"}) => {
    const allTags: TagData[] = [
        {name: "JavaScript", category: "language"},
        {name: "TypeScript", category: "language"},
        {name: "HTML", category: "language"},
        {name: "CSS", category: "language"},
        {name: "React", category: "framework"},
        {name: "Next.js", category: "framework"},
        {name: "Tailwind", category: "framework"},
        {name: "Electron", category: "framework"},
        {name: "Vercel", category: "deployment"},
        {name: "Chrome Extension", category: "deployment"},
        {name: "Azure", category: "deployment"},
        {name: "Google Map API", category: "api"},
        {name: "openAI", category: "api"},
        {name: "DATA.GOV.HK API" , category: "api"},
        {name: "Node.js" , category: "runtime"}
    ];

    function getSelectedTag(tagNames: string[]) {

        const selectedTags = allTags.map(tag => {

            if(tagNames.includes(tag.name)){
                return tag
            }
        }).filter(Boolean) as TagData[]

        return selectedTags

    }

    function getTagColor() {
        return "bg-blue-50 text-blue-700 border border-blue-200"
    }

    const selectedTags = getSelectedTag(tagNames)

    return (
        <article className="h-full p-2">
            <div className="h-full flex flex-col rounded-xl bg-white border-2 border-gray-300 
                shadow-md p-6 transition-all duration-300 hover:shadow-2xl hover:border-gray-400 hover:-translate-y-1">
                
                <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800 leading-tight pr-2">
                        {href ? (
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-700"
                            >
                                {title}
                            </a>
                        ) : (
                            title
                        )}
                    </h3>
                </div>

                    <p className={`text-sm leading-relaxed mb-4 flex-grow ${paragraphClass}`}>
                    {content}
                </p>

                <div className="flex flex-wrap gap-2 mb-4 text-xs">
                    {selectedTags.map((tag, idx) => (
                        <Tag
                            key={`${tag.name}-${idx}`}  
                            color={getTagColor()}
                            content={tag.name}
                        />
                    ))}
                </div>

                {gitHref && (
                    <div className="pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-end text-gray-600 
                            hover:text-gray-900 transition-colors">
                            <ExternalLink
                                href={gitHref}
                                ariaLabel={`View source for ${title} on GitHub`}
                                icon={(
                                    <span className="flex items-center text-gray-700 transition-colors hover:text-black">
                                        <FaGithub className="text-2xl" aria-hidden="true" />
                                        <span className="ml-2 text-sm">View Source</span>
                                    </span>
                                )}
                            />
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
}

export default ProjectCard;
