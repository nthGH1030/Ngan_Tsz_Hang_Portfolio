import React , {useState} from 'react';
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";

const BASE = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;

const slides = [
    { src: `${BASE}Demo_address.png`, alt: 'Lunch Roulette address search screen' },
    { src: `${BASE}Demo_cuisine.png`, alt: 'Lunch Roulette cuisine filter screen' },
    { src: `${BASE}Demo_location.png`, alt: 'Lunch Roulette location map screen' },
    { src: `${BASE}Demo_Restaurants.png`, alt: 'Lunch Roulette restaurant results screen' },
] as const;

const ProjectMediaSlider: React.FC = () => {
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
    
    return (
        <div
            className ="relative w-[225px] h-[450px] z-10 flex items-center justify-center"
            role="region"
            aria-roledescription="carousel"
            aria-label="Lunch Roulette screenshots"
            onKeyDown={handleKeyDown}
        >
            <p className="sr-only" aria-live="polite">
                {`Slide ${ (isSlidingOut ? nextImgIdx : imgIdx) + 1 } of ${slides.length}: ${currentSlide.alt}`}
            </p>
            <div className="absolute left-1/2 top-0 -translate-x-1/2 
                w-[320px] h-full rounded-lg z-0 pointer-events-none" />
                <div className = "relative w-[225px] h-[450px] z-10 flex items-center justify-center">
                    <button
                        type="button"
                        className ="absolute top-1/2 -left-10 -translate-y-1/2
                            flex items-center justify-center w-11 h-11
                            backdrop-blur bg-white/90 text-gray-800 rounded-full
                            cursor-pointer hover:text-gray-600 z-20
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
                    {
                        isSlidingOut ? 
                        <div className = "relative w-full h-full overflow-hidden">
                            <img 
                                src = {slides[imgIdx].src}
                                alt = {slides[imgIdx].alt}
                                className = {`
                                    absolute top-0 left-0 w-full h-full
                                    rounded-lg shadow-lg z-10 object-contain 
                                ${isSlidingOut && direction === 'left' ? 'animate-slide-out-right' : 
                                    isSlidingOut && direction === 'right' ?  'animate-slide-out-left' : ''}
                                `}
                                onAnimationEnd={handleSlide}
                            />
                            <img
                                src = {slides[nextImgIdx].src}
                                alt = {slides[nextImgIdx].alt}
                                className = {`
                                    absolute top-0 left-0 w-full h-full
                                    rounded-lg shadow-lg z-10 object-contain 
                                ${isSlidingOut && direction === 'left' ? 'animate-slide-in-left' : 
                                    isSlidingOut && direction === 'right' ?  'animate-slide-in-right' : ''}
                                `}
                                onAnimationEnd={() => setIsSlidingOut(false)}
                            />
                        </div>
                        : 
                        <div className = "relative w-full h-full overflow-hidden">
                            <img 
                                src = {slides[imgIdx].src}
                                alt = {slides[imgIdx].alt}
                                className = {`
                                    absolute top-0 left-0 w-full h-full
                                    rounded-lg shadow-lg z-10 object-contain 
                                ${isSlidingOut && direction === 'left' ? 'animate-slide-out-right' : 
                                    isSlidingOut && direction === 'right' ?  'animate-slide-out-left' : ''}
                                `}
                                onAnimationEnd={handleSlide}
                            />
                        </div>
                    }
                    <button
                        type="button"
                        className ="absolute top-1/2 -right-10 -translate-y-1/2
                            flex items-center justify-center w-11 h-11
                            backdrop-blur bg-white/90 text-gray-800 rounded-full
                            cursor-pointer hover:text-gray-600 z-20
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
                    <div className = "absolute -bottom-2 z-30 w-full flex items-center justify-center gap-1" aria-hidden="true">
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

               
        </div>
    )
}

export default ProjectMediaSlider
