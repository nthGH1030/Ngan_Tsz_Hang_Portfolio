import React from 'react';
import Tag from './Tag';
import { FaGithub } from "react-icons/fa"
import ImgSlider from './ImgSlider';
import { RxOpenInNewWindow } from "react-icons/rx";
import { FaRegPlayCircle } from "react-icons/fa";


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

const FeaturedCard: React.FC<CardProps> = ({title, content, tagNames, href, gitHref}) => {
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

    const videoRef = React.useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [showPlayBtn , setShowPlayBtn] = React.useState(true);
    const [animatePlayBtn , setAnimatePlayBtn] = React.useState(false);

    const handlePlay = () => {
        if(videoRef.current){
            if(isPlaying){
                videoRef.current.pause()
                setShowPlayBtn(true)
                setAnimatePlayBtn(false)
            } else {
                videoRef.current.play()
                setAnimatePlayBtn(true)
                //reset
                setTimeout(() => {
                    setShowPlayBtn(false)
                    setAnimatePlayBtn(false)
            }, 400)
            }
            setIsPlaying(prev => !prev)
        } 
    }

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
            window.open(href, '_blank');
        }
    };

    const selectedTags = getSelectedTag(tagNames)

    return (
        <div
            
            className="hover:shadow-lg transition-shadow flex flex-col md:flex-row items-center md:items-stretch justify-center gap-6"
            >
            <div className="w-full max-w-4xl mx-auto bg-white/80 rounded-lg shadow-2xl p-4 md:p-8">
               
            {/* Mobile: Single centered media */}
               <div className="relative mb-4 sm:hidden md:hidden rounded-lg overflow-hidden">
                    <video
                        src="lunch_demo.mp4"
                        controls
                        loop
                        className="w-full h-[400px] object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white pointer-events-none">
                        <div className="text-xs font-semibold uppercase tracking-wider mb-1">Featured Project</div>
                        <div className="text-2xl font-bold">{title}</div>
                    </div>
                </div>

                {/* Desktop: Side-by-side media */}
                <div className="hidden sm:block md:block relative rounded-lg overflow-hidden bg-gray-900 mb-6">
                    <div className="flex gap-4 p-4">
                        <div className="flex-1 relative">
                            {showPlayBtn && (
                                <div
                                    onClick = {handlePlay}
                                    className ={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10
                                        rounded-full text-white bg-black/75 backdrop-blur-sm text-4xl cursor-pointer
                                        ${animatePlayBtn ? 'animate-play-out' : ''}`}
                                >
                                    <FaRegPlayCircle/>
                                </div>
                            )}
                            <video
                                src="lunch_demo.mp4"
                                loop
                                className="rounded-lg w-full h-[450px] object-contain"
                                ref = {videoRef}
                            />
                        </div>
                        <div className="w-[300px] flex items-center justify-center">
                            <ImgSlider/>
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white pointer-events-none">
                        <div className="text-sm font-semibold uppercase tracking-wider mb-1 opacity-90">Featured</div>
                        <div className="text-3xl font-bold">{title}</div>
                    </div>
                </div>
                
                <div className=" rounded-lg bg-gray-200/70 py-6 px-4 flex flex-col">
                    <div className="w-full text-xs font-semibold text-gray-500 uppercase tracking-wider sm:hidden md:hidden mb-1">Featured Project</div>
                    <div className="w-full text-xl font-bold sm:hidden md:hidden mb-3">{title}</div>
                    
                    <div className="text-sm leading-relaxed text-gray-700 mb-3">
                        {content}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                        {selectedTags.map((tag, idx) => (
                            <Tag
                                key={`${tag.name}-${idx}`}
                                color={getTagColor(tag, idx)}
                                content={tag.name}
                            />
                        ))}
                    </div>
                    
                    <div className="flex items-center pt-4 border-t border-gray-300">
                        <a href={gitHref} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-black transition-colors">
                            <FaGithub className="text-2xl text-gray-600" />
                            <span className="ml-2 text-sm text-gray-600">View Source</span>
                        </a>
                        <div className="ml-auto text-2xl">
                            <RxOpenInNewWindow 
                                className="cursor-pointer text-gray-600 hover:text-black transition-colors"
                                onClick={handleCardClick}
                                title="Open Project"
                            />
                        </div>
                    </div>
                </div>
        </div>
        </div>
    );
}

export default FeaturedCard;
