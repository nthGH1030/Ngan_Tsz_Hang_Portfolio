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
                <div className="">
                    img
                </div>
                <div className = "flex flex-col items-center">
                    <div className="text-lg md:text-2xl font-bold">  
                        {title}
                    </div>
                    <div className="text-base mt-3">  
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