import React from 'react';
import Tag from './Tag';
import { FaGithub } from "react-icons/fa"

export interface CardProps{
    title : string;
    content : string;
    tagNames: string[];
    href?: string;
}

export interface TagData{
    name : string;
    category : string;
}

const Card: React.FC<CardProps> = ({title, content, tagNames, href}) => {
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

    const colorMap = {
        language : {
            base : "blue",
            variants: ["bg-blue-300" , "bg-blue-400" , "bg-blue-500" , "bg-blue-600"]
        },
        framework : {
            base : "green",
            variants: ["bg-green-300" , "bg-green-400" , "bg-green-500" , "bg-green-600"]
        },
        deployment: {
            base: "purple",
            variants: ["bg-purple-300" , "bg-purple-400" , "bg-purple-500" , "bg-purple-600"]
        },
        api : {
            base: "orange",
            variants: ["bg-orange-300" , "bg-orange-400" , "bg-orange-500" , "bg-orange-600"]
        }
    }

    function getSelectedTag(tagNames: string[]) {

        const selectedTags = allTags.map(tag => {

            if(tagNames.includes(tag.name)){
                return tag
            }
        }).filter(Boolean) as TagData[]

        return selectedTags

    }

    function getTagColor(tag: TagData, idx : number){
        //handle non-valid tag
        //divide the leng of the array with the index and get the remainder.
        //assign the color array using the remainder as index.
        const categoryColors = colorMap[tag.category as keyof typeof colorMap];
        if(!categoryColors) return "gray-500"
        const variantIdx = idx % categoryColors.variants.length;
        return categoryColors.variants[variantIdx]
    }

    const handleCardClick = () => {
        if (href) {
            console.log('card is clicked');
            window.open(href, '_blank');
        }
    };

    const selectedTags = getSelectedTag(tagNames)
    //console.log('selectedTags are' , selectedTags)

    return (
        <div 
            onClick={handleCardClick}
            className="cursor-pointer hover:shadow-lg transition-shadow"
        >
            <div className="hidden md:block">
                this is for desktop version
            </div>
            <div className="md:hidden rounded-lg bg-gray-200/50 p-2 hover:bg-gray-200/70 transition-colors">
                <div className="text-red-500">
                    Featured
                </div>
                <div className="text-lg md:text-2xl font-bold">  {/* Fixed: was md:text-3xl */}
                    {title}
                </div>
                <div className="text-base mt-3">  {/* Fixed: was md:text-3xl */}
                    <p>
                        {content}
                    </p>
                </div>
                <div className="flex flex-wrap justify-start items-center gap-2 my-2">
                    {selectedTags.map((tag, idx) => (
                        <Tag
                            key={`${tag.name}-${idx}`}  
                            color={getTagColor(tag, idx)}
                            content={tag.name}
                        />
                    ))}
                </div>
                <div className="flex items-center mt-3">
                    <FaGithub className="text-3xl text-gray-600 hover:text-black transition-colors" />
                    <span className="ml-2 text-sm text-gray-600">View on GitHub</span>
                </div>
            </div>
        </div>
    );
}

export default Card;
