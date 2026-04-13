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
            <button
                type="button"
                className="group relative rounded-lg border border-blue-100 bg-blue-50/40
                p-4 transition-colors duration-300 cursor-pointer flex items-center gap-3 w-full text-left"
                onClick={handleImgClick}
            >
                {/* Image Container */}
                <div className="relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 
                    rounded overflow-hidden bg-white border border-blue-100">
                    <img 
                        src={img} 
                        alt={title}
                        className="w-full h-full object-contain p-1.5"
                    />
                    {/* Zoom icon overlay on hover */}
                    <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/15
                        transition-all duration-300 flex items-center justify-center">
                        <HiOutlineZoomIn className="text-white text-xl opacity-0 
                            group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3
                            className="font-semibold text-gray-900 leading-tight"
                            style={{ fontFamily: "'Barlow', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
                        >
                            {title}
                        </h3>
                        <span
                            className="text-[11px] uppercase tracking-wide text-blue-700 bg-blue-100 px-2 py-1 rounded-full"
                            style={{ fontFamily: "'Barlow', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
                        >
                            Certification
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{date}</p>
                </div>
            </button>

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