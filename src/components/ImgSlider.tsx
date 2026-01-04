import React , {useState} from 'react';

const ImgSlider: React.FC = () => {

    const imgSrc = ["Demo_address.png",
        "Demo_cuisine.png",
        "Demo_location.png",
        "Demo_Restaurants.png"
    ]

    const [img , setImg] = useState(imgSrc[0])
    
    return (
        <div
            className = "px-8 bg-black rounded-lg shadow"
        >
            <img 
                src = {img}
                alt = 'Feature'
                className = "max-h-[450px]"
            />
        </div>
    )
}

export default ImgSlider