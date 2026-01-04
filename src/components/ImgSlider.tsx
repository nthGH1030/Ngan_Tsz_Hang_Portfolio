import React , {useState} from 'react';
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";

const ImgSlider: React.FC = () => {

    const imgSrc = ["Demo_address.png",
        "Demo_cuisine.png",
        "Demo_location.png",
        "Demo_Restaurants.png"
    ]

    const [img , setImg] = useState(imgSrc[0])


    
    return (
        <div
            className = "relative px-10 bg-black rounded-lg shadow"
        >
            <IoIosArrowDropleft
                className ="absolute top-1/2 left-1 
                    backdrop-blur text-gray-300 rounded-full text-4xl"
            />
            <img 
                src = {img}
                alt = 'Feature'
                className = "rounded-lg shadow-lg w-full max-h-[450px] object-contain"
            />
            <IoIosArrowDropright
                className ="absolute top-1/2 right-1 
                    backdrop-blur text-gray-300 rounded-full text-4xl"
            />
        </div>
    )
}

export default ImgSlider