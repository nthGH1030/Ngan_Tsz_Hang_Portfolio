import React from 'react';
import Tag from '../components/project/Tag';
import ProjectMediaSlider, { type MediaSlide } from './ProjectMediaSlider';
import { RxOpenInNewWindow } from "react-icons/rx";
import { FaRegPlayCircle , FaRegPauseCircle } from "react-icons/fa";

export interface CardProps{
    title : string;
    content : string;
    tagNames: string[];
    href?: string;
    gitHref?: string;
    kicker?: string;
    demoOnly?: boolean;
    videoSrc: string;
    slides: MediaSlide[];
}

export interface TagData{
    name : string;
    category : string;
}

const FeaturedProjectCard: React.FC<CardProps> = ({title, content, tagNames, href, kicker = 'Featured Project', demoOnly = false, videoSrc, slides}) => {
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
                setAnimatePlayBtn(true)
                setAnimatePauseBtn(true)
                setTimeout(() => {
                    setShowPlayBtn(false)
                    setShowPauseBtn(false)
            }, 400)
            }
            setIsPlaying(prev => !prev)
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

    function getTagColor() {
        return "chip"
    }

    const selectedTags = getSelectedTag(tagNames)

    const openProjectLink = href ? (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 hit-target px-2 hover:text-accent transition-colors group"
        >
            <span className="text-sm text-muted group-hover:text-accent transition-colors">Open Project</span>
            <RxOpenInNewWindow
                className="text-2xl text-muted group-hover:text-accent transition-colors"
                aria-hidden="true"
            />
        </a>
    ) : null;

    return (
        <div className="w-full">
            <div className="rounded-lg bg-well p-4">
                <div className="flex flex-col items-center gap-6 md:flex-row md:items-stretch md:justify-center">
                    <div className="flex w-full max-w-[225px] justify-center md:shrink-0">
                        <div className="relative w-full aspect-[1/2]">
                        <video
                            src={videoSrc}
                            loop
                            playsInline
                            preload="metadata"
                            poster={slides[0]?.src}
                            className="h-full w-full rounded-lg object-contain"
                            ref={videoRef}
                        />
                        <button
                            type="button"
                            onClick={handlePlay}
                            className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-transparent cursor-pointer"
                            aria-label={isPlaying ? 'Pause Lunch Roulette demo video' : 'Play Lunch Roulette demo video'}
                        >
                            {showPlayBtn && (
                                <FaRegPlayCircle
                                    aria-hidden="true"
                                    className={`text-4xl text-white ${animatePlayBtn ? 'animate-play-out' : ''}`}
                                />
                            )}
                            {showPauseBtn && (
                                <FaRegPauseCircle
                                    aria-hidden="true"
                                    className={`text-4xl text-white ${animatePauseBtn ? 'animate-play-out' : ''}`}
                                />
                            )}
                        </button>
                        </div>
                    </div>
                    <div className="flex w-full max-w-[225px] justify-center md:w-[225px] md:shrink-0">
                        <ProjectMediaSlider slides={slides}/>
                    </div>
                </div>
            </div>

            {!demoOnly && (
                <div className="mt-6 space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent">{kicker}</p>
                    <h3 className="text-2xl font-bold text-ink">{title}</h3>
                    <p className="text-sm leading-relaxed text-muted">{content}</p>
                    <div className="flex flex-wrap gap-4 text-xs">
                        {selectedTags.map((tag, idx) => (
                            <Tag
                                key={`${tag.name}-${idx}`}
                                color={getTagColor()}
                                content={tag.name}
                            />
                        ))}
                    </div>
                </div>
            )}

            {openProjectLink && (
                <div className="mt-4 flex items-center border-t border-line pt-4">
                    {openProjectLink}
                </div>
            )}
        </div>
    );
}

export default FeaturedProjectCard;
