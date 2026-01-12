import React , {useState , useEffect} from 'react';
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";

const ImgSlider: React.FC = () => {

   
    const imgSrc = ["Demo_address.png",
        "Demo_cuisine.png",
        "Demo_location.png",
        "Demo_Restaurants.png"
    ]

    const [imgIdx , setImgIdx] = useState(0)
    const [nextImgIdx , setNextImgIdx] = useState(0)
    const [direction , setDirection] = useState('right')
    const [isSlidingOut, setIsSlidingOut] = useState(false);

    const onClickLeft = () => {
        if(imgIdx !== 0) {
            setDirection('left');
            setIsSlidingOut(true);
            if(imgIdx === 0) {
                setNextImgIdx(imgIdx)
            } else {
                setNextImgIdx(imgIdx - 1)
            }
        }
    }

    const onClickRight = () => {
        if(imgIdx < imgSrc.length - 1 ){
            setDirection('right');
            setIsSlidingOut(true);
            if(imgIdx === imgSrc.length - 1) {
                setNextImgIdx(imgIdx)
            } else {
                setNextImgIdx(imgIdx + 1)
            }
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
    /*
     useEffect(() => {
        console.log('direction is now' , direction)
        console.log('isSlidingOut is now' , isSlidingOut)
    }, [direction , isSlidingOut ])
    */

    
    return (
        <div
            className ="relative w-[225px] h-[450px] z-10 flex items-center justify-center"
        >
            <div className="absolute left-1/2 top-0 -translate-x-1/2 
                w-[260px] h-full bg-black/70 rounded-lg z-0 pointer-events-none" />
                <div className = "relative w-[225px] h-[450px] z-10 flex items-center justify-center">
                    <IoIosArrowDropleft
                        className ="absolute top-1/2 -left-10 
                            backdrop-blur text-gray-300 rounded-full text-4xl
                            cursor-pointer hover:text-gray-300/50 z-20"
                        onMouseDown={e => e.preventDefault()}
                        onClick={(e) => {
                            e.stopPropagation();
                            onClickLeft();
                        }}
                    />
                    {
                        isSlidingOut ? 
                        <div className = "relative w-full h-full overflow-hidden">
                            <img 
                                src = {imgSrc[imgIdx]}
                                alt = 'Feature'
                                className = {`
                                    absolute top-0 left-0 w-full h-full
                                    rounded-lg shadow-lg z-10 object-contain 
                                ${isSlidingOut && direction === 'left' ? 'animate-slide-out-right' : 
                                    isSlidingOut && direction === 'right' ?  'animate-slide-out-left' : ''}
                                `}
                                onAnimationEnd={handleSlide}
                            />
                            <img
                                src = {imgSrc[nextImgIdx]}
                                alt = 'Feature'
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
                                src = {imgSrc[imgIdx]}
                                alt = 'Feature'
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
                    <IoIosArrowDropright
                        className ="absolute top-1/2 -right-10 
                            backdrop-blur text-gray-300 rounded-full text-4xl
                            curosr-pointer hover:text-gray-300/50 z-20"
                        onMouseDown={e => e.preventDefault()}
                        onClick={(e) => {
                            e.stopPropagation();
                            onClickRight();
                        }}
                    />
                </div>

               
        </div>
    )
}

export default ImgSlider