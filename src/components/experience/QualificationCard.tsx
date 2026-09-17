import React, { useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { HiOutlineZoomIn } from 'react-icons/hi';
import type { OptimizedImg } from '../../types/image';

export interface QualifcationProps{
    title : string;
    date: string;
    img: OptimizedImg;
}

const QualificationCard: React.FC<QualifcationProps> = ({title, date, img}) => {
    const [isImgOpen , setIsImgOpen] = useState(false)
    const triggerRef = useRef<HTMLButtonElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    const handleImgClick = () => {
        setIsImgOpen(!isImgOpen)
    }

    useEffect(() => {
        if (!isImgOpen) {
            return;
        }

        closeRef.current?.focus();

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                setIsImgOpen(false);
                return;
            }

            if (event.key === 'Tab') {
                event.preventDefault();
                closeRef.current?.focus();
            }
        };

        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            triggerRef.current?.focus();
        };
    }, [isImgOpen]);

    return (
        <div>
            <button
                type="button"
                ref={triggerRef}
                className="group relative rounded-lg border border-line bg-accent-soft/40
                p-4 transition-colors duration-300 cursor-pointer flex items-center gap-3 w-full text-left min-h-11"
                onClick={handleImgClick}
                aria-expanded={isImgOpen}
                aria-haspopup="dialog"
                aria-label={`View ${title} certificate`}
            >
                <div className="relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 
                    rounded overflow-hidden bg-surface border border-line">
                    <img
                        src={img.src}
                        srcSet={img.srcSet}
                        sizes="56px"
                        width={img.width}
                        height={img.height}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain p-1.5"
                    />
                    <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20
                        transition-all duration-300 flex items-center justify-center">
                        <HiOutlineZoomIn className="text-white text-xl opacity-0 
                            group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-ink leading-tight">
                            {title}
                        </span>
                        <span className="chip px-2 py-1 text-[11px] uppercase tracking-wide">
                            Certification
                        </span>
                    </div>
                    <p className="text-sm text-muted mt-1">{date}</p>
                </div>
            </button>

            {isImgOpen && (
                <div
                    className="fixed inset-0 z-50 p-4 flex items-center justify-center"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${title} certificate`}
                >
                    <div
                        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                        onClick={() => setIsImgOpen(false)}
                    />
                    <button
                        type="button"
                        ref={closeRef}
                        className="absolute top-4 right-4 sm:top-8 sm:right-8 z-10 text-white 
                        hover:text-accent-fg transition-colors p-2 rounded-full hover:bg-white/10
                        hit-target"
                        onClick={() => setIsImgOpen(false)}
                        aria-label="Close certificate preview"
                    >
                        <IoClose className="text-3xl sm:text-4xl" aria-hidden="true" />
                    </button>
                    <div className="relative z-10 max-w-4xl max-h-[90vh] overflow-auto">
                        <img
                            src={img.src}
                            srcSet={img.srcSet}
                            sizes="(max-width: 896px) 92vw, 896px"
                            width={img.width}
                            height={img.height}
                            alt={`${title} certificate`}
                            className="w-full h-auto object-contain rounded-lg"
                            style={{ aspectRatio: `${img.width} / ${img.height}` }}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default QualificationCard
