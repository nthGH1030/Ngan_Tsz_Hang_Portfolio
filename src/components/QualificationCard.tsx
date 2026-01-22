import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { HiOutlineZoomIn } from 'react-icons/hi';

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
                className="group relative rounded-xl bg-white border-2 border-gray-300 shadow-md 
                p-4 hover:shadow-xl hover:border-gray-400 hover:-translate-y-1 transition-all 
                duration-300 cursor-pointer flex gap-4"
                onClick={handleImgClick}
            >
                {/* Image Container */}
                <div className="relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 
                    rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
                    <img 
                        src={img} 
                        alt={title}
                        className="w-full h-full object-contain p-2"
                    />
                    {/* Zoom icon overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 
                        transition-all duration-300 flex items-center justify-center">
                        <HiOutlineZoomIn className="text-white text-2xl opacity-0 
                            group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex-grow flex items-center ">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 
                            leading-tight truncate">  
                            {title}
                        </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium truncate">  
                        {date}
                    </p>
                </div>
            </div>

            {/* Modal */}
            {isImgOpen && (
                <div 
                    className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center 
                    justify-center z-50 p-4"
                    onClick={() => setIsImgOpen(false)}
                >
                    <button
                        className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white 
                        hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white/10"
                        onClick={() => setIsImgOpen(false)}
                        aria-label="Close"
                    >
                        <IoClose className="text-3xl sm:text-4xl" />
                    </button>
                    <div className="max-w-4xl max-h-[90vh] overflow-auto">
                        <img 
                            src={img} 
                            alt={title}
                            className="w-full h-full object-contain rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default QualificationCard