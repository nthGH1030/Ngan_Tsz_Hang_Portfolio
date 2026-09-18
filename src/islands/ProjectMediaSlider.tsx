import React , {useState} from 'react';
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import type { OptimizedImg } from '../types/image';

export type MediaSlide = OptimizedImg & { alt: string };

type ProjectMediaSliderProps = {
    slides: MediaSlide[];
};

const ProjectMediaSlider: React.FC<ProjectMediaSliderProps> = ({ slides }) => {
    const [imgIdx , setImgIdx] = useState(0)
    const [nextImgIdx , setNextImgIdx] = useState(0)
    const [direction , setDirection] = useState('right')
    const [isSlidingOut, setIsSlidingOut] = useState(false);

    const canGoLeft = imgIdx > 0;
    const canGoRight = imgIdx < slides.length - 1;
    const currentSlide = isSlidingOut ? slides[nextImgIdx] : slides[imgIdx];

    const onClickLeft = () => {
        if(imgIdx !== 0) {
            setDirection('left');
            setIsSlidingOut(true);
            setNextImgIdx(imgIdx - 1)
        }
    }

    const onClickRight = () => {
        if(imgIdx < slides.length - 1 ){
            setDirection('right');
            setIsSlidingOut(true);
            setNextImgIdx(imgIdx + 1)
        }
    }

    const handleSlide = () => {
        if (direction === 'right') {
            setImgIdx((prev) => prev + 1);
            setIsSlidingOut(false);
        } else if ( direction === 'left'){
            setImgIdx((prev) => prev - 1);
            setIsSlidingOut(false);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            onClickLeft();
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            onClickRight();
        }
    };

    const renderSlide = (slide: MediaSlide, className: string, onAnimationEnd?: () => void) => (
        <img
            src={slide.src}
            srcSet={slide.srcSet}
            sizes="225px"
            width={slide.width}
            height={slide.height}
            alt={slide.alt}
            loading="lazy"
            decoding="async"
            className={`absolute top-0 left-0 w-full h-full rounded-lg shadow-lg z-10 object-contain ${className}`}
            style={{ aspectRatio: `${slide.width} / ${slide.height}` }}
            onAnimationEnd={onAnimationEnd}
        />
    );
    
    return (
        <div
            className="relative z-10 w-[225px] max-w-full shrink-0 aspect-[1/2]"
            role="region"
            aria-roledescription="carousel"
            aria-label="Lunch Roulette screenshots"
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            <p className="sr-only" aria-live="polite">
                {`Slide ${ (isSlidingOut ? nextImgIdx : imgIdx) + 1 } of ${slides.length}: ${currentSlide.alt}`}
            </p>
            <div className="absolute inset-0 overflow-hidden rounded-lg">
                    {
                        isSlidingOut ? 
                        <>
                            {renderSlide(
                                slides[imgIdx],
                                `absolute top-0 left-0 w-full h-full rounded-lg shadow-lg z-10 object-contain ${
                                    direction === 'left' ? 'animate-slide-out-right' : 'animate-slide-out-left'
                                }`,
                                handleSlide,
                            )}
                            {renderSlide(
                                slides[nextImgIdx],
                                `absolute top-0 left-0 w-full h-full rounded-lg shadow-lg z-10 object-contain ${
                                    direction === 'left' ? 'animate-slide-in-left' : 'animate-slide-in-right'
                                }`,
                                () => setIsSlidingOut(false),
                            )}
                        </>
                        : 
                            renderSlide(
                                slides[imgIdx],
                                `absolute top-0 left-0 w-full h-full rounded-lg shadow-lg z-10 object-contain`,
                                handleSlide,
                            )
                    }
            </div>
                    <button
                        type="button"
                        className ="absolute top-1/2 left-0 z-20 -translate-y-1/2
                            hit-target
                            backdrop-blur bg-surface/90 text-ink rounded-full
                            cursor-pointer hover:text-accent
                            disabled:opacity-40 disabled:cursor-not-allowed"
                        onMouseDown={e => e.preventDefault()}
                        onClick={(e) => {
                            e.stopPropagation();
                            onClickLeft();
                        }}
                        aria-label="Previous screenshot"
                        disabled={!canGoLeft}
                    >
                        <IoIosArrowDropleft className="text-3xl" aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        className ="absolute top-1/2 right-0 z-20 -translate-y-1/2
                            hit-target
                            backdrop-blur bg-surface/90 text-ink rounded-full
                            cursor-pointer hover:text-accent
                            disabled:opacity-40 disabled:cursor-not-allowed"
                        onMouseDown={e => e.preventDefault()}
                        onClick={(e) => {
                            e.stopPropagation();
                            onClickRight();
                        }}
                        aria-label="Next screenshot"
                        disabled={!canGoRight}
                    >
                        <IoIosArrowDropright className="text-3xl" aria-hidden="true" />
                    </button>
                    <div className = "absolute bottom-0 z-30 w-full flex items-center justify-center gap-1 pb-4" aria-hidden="true">
                    {
                        slides.map((_bar , idx) => (
                            idx === (isSlidingOut ? nextImgIdx : imgIdx) ?
                                <div key={idx} className ="w-12 bg-white h-1 rounded-lg"></div>
                                :
                                <div key={idx} className ="w-12 bg-white/50 h-1 rounded-lg  "></div>
                        ))
                    }
                    </div>
        </div>
    )
}

export default ProjectMediaSlider
