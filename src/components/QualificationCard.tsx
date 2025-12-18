import React from 'react';

export interface QualifcationProps{
    title : string;
    date: string;
    img: string;
}
const QualificationCard: React.FC<QualifcationProps> = ({title, date, img}) => {
    return (
        <div>
            <div className = "hidden md:block">
                this is the desktop version
            </div>
             <div className="md:hidden rounded-lg bg-gray-200/50 p-2 hover:bg-gray-200/70 transition-colors
             flex justify-between">
                <div className="w-24 max-w-xs h-auto">
                    <img src = {img}/>
                </div>
                <div className = "mx-5 w-full flex flex-col items-center justify-center">
                    <div className="text-base md:text-2xl font-medium self-start">  
                        {title}
                    </div>
                    <div className="text-xs mt-3 font-light self-end">  
                        <p>
                            {date}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        
    )
}

export default QualificationCard