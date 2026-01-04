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
    const [direction , setDirection] = useState('right')
    const [isSlidingOut, setIsSlidingOut] = useState(false);

    const onClickLeft = () => {
        if(imgIdx !== 0) setImgIdx((prev) => prev - 1)
        setDirection('left');
    }

    const onClickRight = () => {
        if(imgIdx < imgSrc.length - 1 ){
            //setImgIdx((prev) => prev + 1)
            setDirection('right');
            setIsSlidingOut(true);
        } 
    }

    const handleAnimationEnd = () => {
    if (isSlidingOut) {
        setImgIdx((prev) => prev + 1);
        setIsSlidingOut(false);
    }
    };
    
    return (
        <div
            className = "relative px-10 bg-black rounded-lg shadow z-10"
        >
            <IoIosArrowDropleft
                className ="absolute top-1/2 left-1 
                    backdrop-blur text-gray-300 rounded-full text-4xl
                    curosr-pointer hover:text-gray-300/50"
                onMouseDown={e => e.preventDefault()}
                onClick={(e) => {
                    e.stopPropagation();
                    onClickLeft();
                }}
                
            />
            <img 
                src = {imgSrc[imgIdx]}
                alt = 'Feature'
                className = {`rounded-lg shadow-lg w-[225px] h-[450px] object-contain 
                 ${isSlidingOut ? 'animate-slide-out-left' : ''}
                `}
                onAnimationEnd={handleAnimationEnd}
            />
            
            <IoIosArrowDropright
                className ="absolute top-1/2 right-1 
                    backdrop-blur text-gray-300 rounded-full text-4xl
                    curosr-pointer hover:text-gray-300/50"
                onMouseDown={e => e.preventDefault()}
                onClick={(e) => {
                    e.stopPropagation();
                    onClickRight();
                }}
                
            />
        </div>
    )
}

export default ImgSlider