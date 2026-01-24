import React from 'react';
import Tag from './Tag';
import { FaGithub } from "react-icons/fa"


export interface CardProps{
    title : string;
    content : string;
    tagNames: string[];
    href?: string;
    gitHref?: string;
}

export interface TagData{
    name : string;
    category : string;
}

const Card: React.FC<CardProps> = ({title, content, tagNames, href, gitHref}) => {
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
    ];

    // Uniform tag styling - blue theme

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

    const handleCardClick = () => {
        if (href) {
            window.open(href, '_blank');
        }
    };

    const selectedTags = getSelectedTag(tagNames)

    return (
        <div 
            onClick={handleCardClick}
            className="group cursor-pointer h-full p-2"
        >   
            <div className="h-full flex flex-col rounded-xl bg-white border-2 border-gray-300 
                shadow-md p-6 transition-all duration-300 hover:shadow-2xl hover:border-gray-400 hover:-translate-y-1">
                
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight pr-2">  
                        {title}
                    </h3>
                    <span className="px-2 py-1 rounded-md bg-red-50 text-red-600 text-[10px] 
                        font-semibold uppercase tracking-wide whitespace-nowrap">
                        Featured
                    </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-grow">
                    {content}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4 text-xs">
                    {selectedTags.map((tag, idx) => (
                        <Tag
                            key={`${tag.name}-${idx}`}  
                            color={getTagColor()}
                            content={tag.name}
                        />
                    ))}
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-end text-gray-500 
                        group-hover:text-gray-900 transition-colors">
                        <span className="text-xs font-medium mr-2">View Source</span>
                        <FaGithub className="text-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
