import React from 'react';
import Tag from '../components/project/Tag';
import ProjectMediaSlider, { type MediaSlide } from './ProjectMediaSlider';
import { RxOpenInNewWindow } from "react-icons/rx";
import { FaRegPlayCircle } from "react-icons/fa";

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
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);

    React.useEffect(() => {
        const video = videoRef.current;
        if (!video) {
            return;
        }

        const syncTime = () => {
            const nextDuration = Number.isFinite(video.duration) ? video.duration : 0;
            setDuration(nextDuration);
            setCurrentTime(video.currentTime);
        };

        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);

        video.addEventListener('timeupdate', syncTime);
        video.addEventListener('loadedmetadata', syncTime);
        video.addEventListener('play', onPlay);
        video.addEventListener('pause', onPause);
        syncTime();

        return () => {
            video.removeEventListener('timeupdate', syncTime);
            video.removeEventListener('loadedmetadata', syncTime);
            video.removeEventListener('play', onPlay);
            video.removeEventListener('pause', onPause);
        };
    }, []);

    const handlePlay = () => {
        const video = videoRef.current;
        if (!video) {
            return;
        }
        if (video.paused) {
            void video.play();
        } else {
            video.pause();
        }
    };

    const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
        const video = videoRef.current;
        if (!video) {
            return;
        }
        video.currentTime = Number(event.target.value);
        setCurrentTime(video.currentTime);
    };

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
                <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-center">
                    <div className="relative w-[225px] max-w-full shrink-0 aspect-[1/2] overflow-hidden rounded-lg">
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
                            {!isPlaying && (
                                <FaRegPlayCircle
                                    aria-hidden="true"
                                    className="text-4xl text-slate-600 drop-shadow-lg"
                                />
                            )}
                        </button>
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex h-16 items-end bg-gradient-to-t from-black/70 to-transparent px-4 pb-4">
                            <label className="sr-only" htmlFor="lunch-demo-progress">
                                Lunch Roulette demo playback
                            </label>
                            <input
                                id="lunch-demo-progress"
                                type="range"
                                min={0}
                                max={duration || 0}
                                step={0.1}
                                value={currentTime}
                                disabled={duration === 0}
                                onChange={handleSeek}
                                onClick={(event) => event.stopPropagation()}
                                className="pointer-events-auto mx-auto h-1 w-32 cursor-pointer accent-slate-700 disabled:cursor-not-allowed"
                            />
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
