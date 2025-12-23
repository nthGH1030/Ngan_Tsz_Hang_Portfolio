import React, { useState } from 'react';

export interface QualifcationProps{
    title : string;
    date: string;
    img: string;
}



const QualificationCard: React.FC<QualifcationProps> = ({title, date, img}) => {
    const [isImgOpen , setIsImgOpen] = useState(false)

    const handleImgClick = () => {

        setIsImgOpen(!isImgOpen)
        
    }

    return (
        <div>
            <div 
                className="rounded-lg bg-gray-200/50 p-2 hover:bg-gray-200/70 transition-colors
                flex justify-between"
                onClick = {handleImgClick}
            >
                <div className="w-24 min-w-16 h-auto">
                    <img src = {img}/>
                </div>
                <div className = "mx-5 w-full flex flex-col items-center justify-center">
                    <div className="text-base md:text-xl font-medium self-start">  
                        {title}
                    </div>
                    <div className="text-xs mt-3 font-light self-end">  
                        <p>
                            {date}
                        </p>
                    </div>
                </div>
            </div>
            {isImgOpen ? 
            <div className = "fixed inset-0 bg-gray-900/80 flex itesm-center justify-center">
                <button
                    className = "fixed top-8 right-8 text-4xl text-white"
                    onClick = {() =>
                        setIsImgOpen(false)
                    }    
                >
                    X
                </button>
                <img src = {img}/>
            </div> : ''}
            
        </div>
    )
}

export default QualificationCard