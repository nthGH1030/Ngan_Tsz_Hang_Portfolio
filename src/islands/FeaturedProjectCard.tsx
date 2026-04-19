import React from 'react';
import Tag from '../components/project/Tag';
import { FaGithub } from "react-icons/fa"
import ProjectMediaSlider from './ProjectMediaSlider';
import { RxOpenInNewWindow } from "react-icons/rx";
import { FaRegPlayCircle , FaRegPauseCircle } from "react-icons/fa";
import ExternalLink from '../components/navigation/ExternalLink';



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

const FeaturedProjectCard: React.FC<CardProps> = ({title, content, tagNames, href, gitHref}) => {
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
    const [showPauseBtn , setShowPauseBtn] = React.useState(false);
    const [animatePauseBtn , setAnimatePauseBtn] = React.useState(false);

    const handlePlay = () => {
        if(videoRef.current){
            if(isPlaying){
                videoRef.current.pause()
                setAnimatePauseBtn(false)
                setShowPauseBtn(true)
            } else {
                videoRef.current.play()
                //play animation first
                setAnimatePlayBtn(true)
                setAnimatePauseBtn(true)
                //remove button after handling animation
                setTimeout(() => {
                    setShowPlayBtn(false)
                    setShowPauseBtn(false)

            }, 400)
            }
            setIsPlaying(prev => !prev)
        } 
    }

    // Uniform tag styling - no color categorization

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
        window.open(href, '_blank', 'noopener,noreferrer');
    };

    const selectedTags = getSelectedTag(tagNames)

    return (
        <div
            className="hover:shadow-lg transition-shadow flex flex-col md:flex-row 
                items-center md:items-stretch justify-center gap-6"
            >
            <div className="w-full max-w-4xl mx-auto  rounded-lg shadow-2xl p-4 md:p-8">
            {/* Mobile: Single centered media */}
            <div className="sm:hidden md:hidden ">
                <div className="relative mb-4 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                     <div className="flex-1 relative">
                        {showPlayBtn && (
                            <button
                                type="button"
                                onClick = {handlePlay}
                                className ={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10
                                    rounded-full text-white bg-transparent text-4xl cursor-pointer
                                    ${animatePlayBtn ? 'animate-play-out' : ''}`}
                                aria-label="Play project video"
                            >
                                <FaRegPlayCircle/>
                            </button>
                        )}
                        {showPauseBtn && (
                            <button
                                type="button"
                                onClick = {handlePlay}
                                className ={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10
                                    rounded-full text-white bg-transparent text-4xl cursor-pointer
                                    ${animatePauseBtn ? 'animate-play-out' : ''}`}
                                aria-label="Pause project video"
                            >
                                <FaRegPauseCircle/>
                            </button>
                        )}
                        <button
                            type="button"
                            onClick = {handlePlay}
                            className="block w-full bg-transparent border-0 p-0"
                            aria-label="Toggle project video playback"
                        >
                            <video
                                src="lunch_demo.mp4"
                                loop
                                className="rounded-lg w-full h-[450px] object-contain"
                                ref = {videoRef}
                            />
                        </button>
                        
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white pointer-events-none">
                        <div className="text-xs font-semibold uppercase tracking-wider mb-1">Featured Project</div>
                        <div className="text-2xl font-bold">{title}</div>
                    </div>
                </div>

                {/* Description card */}
                <div className="mb-4 rounded-lg bg-white/90 border border-gray-100/60 backdrop-blur-md shadow-lg py-4 px-4">
                    <p className="text-sm leading-relaxed text-gray-700">{content}</p>
                </div>

                {/* Tags section */}
                <div className="mb-4">
                    <div className="flex flex-wrap gap-2 text-xs">
                        {selectedTags.map((tag, idx) => (
                            <Tag
                                key={`${tag.name}-${idx}`}
                                color={getTagColor()}
                                content={tag.name}
                            />
                        ))}
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center justify-between gap-4 pt-4 border-t border-gray-200">
                    <button
                        type="button"
                        className="flex items-center gap-2 hover:text-black transition-colors group bg-transparent border-0 p-0"
                        onClick={handleCardClick}
                    >
                        <span className="text-sm text-gray-600 group-hover:text-black transition-colors">Open Project</span>
                        <RxOpenInNewWindow 
                            className="text-2xl text-gray-600 group-hover:text-black transition-colors"
                            title="Open Project"
                        />
                    </button>
                </div>
            </div>

               {/* Desktop: Side-by-side media */}
                <div className="hidden sm:block md:block relative mb-8">
                    {/* Background stops before the extra padding */}
                    <div className="rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 p-4">
                        <div className="flex gap-4 pb-10">
                            <div className="flex-1 relative">
                                {showPlayBtn && (
                                    <button
                                        type="button"
                                        onClick = {handlePlay}
                                        className ={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10
                                            rounded-full text-white bg-transparent text-4xl cursor-pointer
                                            ${animatePlayBtn ? 'animate-play-out' : ''}`}
                                        aria-label="Play project video"
                                    >
                                        <FaRegPlayCircle/>
                                    </button>
                                )}
                                 {showPauseBtn && (
                                    <button
                                        type="button"
                                        onClick = {handlePlay}
                                        className ={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10
                                            rounded-full text-white bg-transparent text-4xl cursor-pointer
                                            ${animatePauseBtn ? 'animate-play-out' : ''}`}
                                        aria-label="Pause project video"
                                    >
                                        <FaRegPauseCircle/>
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick = {handlePlay}
                                    className="block w-full bg-transparent border-0 p-0"
                                    aria-label="Toggle project video playback"
                                >
                                    <video
                                        src="lunch_demo.mp4"
                                        loop
                                        className="rounded-lg w-full h-[450px] object-contain"
                                        ref = {videoRef}
                                    />
                                </button>
    
                            </div>
                            <div className="w-[300px] flex items-center justify-center">
                                <ProjectMediaSlider/>
                            </div>
                        </div>
                        
                        {/* Title and gradient within media container */}
                        <div className="absolute inset-0 rounded-lg
                            bg-gradient-to-t from-gray-900/70 via-black/20 to-transparent pointer-events-none"></div>
                        <div className="absolute bottom-12 left-6 right-6 text-white pointer-events-none">
                            <div className="text-xs font-semibold uppercase tracking-wider mb-1 opacity-80">Featured Project</div>
                            <div className="text-2xl font-bold">{title}</div>
                        </div>
                    </div>
                    
                    {/* Description card - overlaps bottom of media */}
                    <div className="absolute -bottom-2 left-24 right-0 translate-y-1/2 z-20 rounded-lg 
                        bg-white/90 border border-gray-100/60 backdrop-blur-md shadow-xl py-4 px-6">
                        <p className="text-sm leading-relaxed text-gray-700">{content}</p>
                    </div>
                </div>
                

                {/* Tags and action buttons - completely separate below */}
                <div className="hidden sm:block md:block mt-16 ">
                    {/* Tags section */}
                    <div className="mb-4">
                        <div className="flex flex-wrap gap-2 text-xs justify-end">
                            {selectedTags.map((tag, idx) => (
                                <Tag
                                    key={`${tag.name}-${idx}`}
                                    color={getTagColor()}
                                    content={tag.name}
                                />
                            ))}
                        </div>
                    </div>
                    
                    {/* Action buttons with divider */}
                    <div className="flex items-center justify-end gap-6 ">
                        <button
                            type="button"
                            className="flex items-center gap-2 hover:text-black transition-colors group bg-transparent border-0 p-0"
                            onClick={handleCardClick}
                        >
                            <span className="text-sm text-gray-600 group-hover:text-black transition-colors">Open Project</span>
                            <RxOpenInNewWindow 
                                className="text-2xl text-gray-600 group-hover:text-black transition-colors"
                                title="Open Project"
                            />
                        </button>
                    </div>
                </div>

        </div>
        </div>
    );
}

export default FeaturedProjectCard;
