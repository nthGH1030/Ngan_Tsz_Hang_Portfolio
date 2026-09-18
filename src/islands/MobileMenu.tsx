import React, { useEffect, useId, useRef, useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import {createPortal} from 'react-dom'

const MobileMenu: React.FC = () => {
    const [isOpen , setisOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLElement>(null);
    const menuId = useId();

    const handleOpen = () => {
        setIsVisible(true);
        setisOpen(true)
    }

    const handleClose = () => {
        setisOpen(false)
    }

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement> , target: string) => {
        e.preventDefault();
        setIsVisible(false)
        setisOpen(false);
        setTimeout(() => {
            const el = document.querySelector(target);
            if(el){
                el.scrollIntoView({behavior: 'smooth'})
            }
        },150)
    }

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const focusableSelector = 'a[href], button:not([disabled])';
        closeRef.current?.focus();

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                handleClose();
                return;
            }

            if (event.key !== 'Tab' || !panelRef.current) {
                return;
            }

            const focusable = Array.from(
                panelRef.current.querySelectorAll<HTMLElement>(focusableSelector)
            );
            if (focusable.length === 0) {
                return;
            }

            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            const active = document.activeElement;

            if (event.shiftKey && active === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && active === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            triggerRef.current?.focus();
        };
    }, [isOpen]);

    const menuSlide = isOpen ? "animate-slide-in" : "animate-slide-out"
    const blur = isVisible ? "backdrop-blur" : ""

    return (
        <div className="w-11 h-11 flex items-center justify-center">
            <button
                type="button"
                ref={triggerRef}
                className="hit-target bg-transparent border-0 p-0 text-ink"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls={menuId}
                tabIndex={isOpen ? -1 : 0}
                onClick={handleOpen}
            >
                <GiHamburgerMenu
                    aria-hidden="true"
                    className={`text-3xl z-20
                        ${isOpen
                            ? isVisible ? `opacity-0 scale-90 pointer-events-none animate-spin-fade-out`
                            : 'opacity-0 scale-90 pointer-events-none'
                            : isVisible ? 'opacity-100 animate-spin-fade-in' : 'opacity-100'
                    }`}
                />
            </button>
            {isVisible && createPortal(
                <div ref={panelRef}>
                    <div className="fixed top-6 right-6 sm:right-8 w-11 h-11 z-30 flex items-center justify-center">
                        <button
                            type="button"
                            ref={closeRef}
                            className={`hit-target bg-transparent border-0 p-0 text-ink
                            ${isOpen
                                ? isVisible ? `opacity-100 animate-spin-fade-in `
                                :  'opacity-100'
                                : isVisible ? 'opacity-0 scale-90 pointer-events-none animate-spin-fade-out' :
                                'opacity-0 scale-90 pointer-events-none'
                            }`}
                            aria-label="Close menu"
                            onAnimationEnd={() => {
                                if(!isOpen) setIsVisible(false)
                            }}
                            onClick={handleClose}
                        >
                            <IoClose className="text-3xl" aria-hidden="true" />
                        </button>
                    </div>
                    <div
                        className={`${blur} fixed top-0 left-0 z-20 h-full w-full bg-transparent`}
                        onClick={handleClose}
                        aria-hidden="true"
                    ></div>
                    <aside
                        id={menuId}
                        className={`fixed top-0 right-0 z-20 h-full w-3/4
                        bg-surface text-ink
                        shadow-[-20px_0_60px_rgba(15,23,42,0.18)]
                        border-l border-line ${menuSlide}`}
                        aria-label="Site"
                    >
                        <div className ="flex flex-col items-center justify-center h-full gap-8 px-12 font-semibold text-xl">
                            <a href = "#about"
                                className = "nav-link hit-target px-3 transition-colors duration-200 hover:text-accent"
                                onClick = {(e) => handleNavClick(e, "#about")}>
                                About</a>
                            <a href = "#self-initiatives"
                                className = "nav-link hit-target px-3 transition-colors duration-200 hover:text-accent"
                                onClick = {(e) => handleNavClick(e, "#self-initiatives")}>
                                Self-initiatives</a>
                            <a href = "#other-projects"
                                className = "nav-link hit-target px-3 transition-colors duration-200 hover:text-accent"
                                onClick = {(e) => handleNavClick(e, "#other-projects")}>
                                Projects</a>
                            <a href = "#background"
                                className = "nav-link hit-target px-3 transition-colors duration-200 hover:text-accent"
                                onClick = {(e) => handleNavClick(e, "#background")}>
                                Background</a>
                            <a href = "#contact"
                                className ="nav-link btn-secondary"
                                onClick = {(e) => handleNavClick(e, "#contact")}>
                                Contact</a>
                        </div>
                    </aside>
                </div>
                , document.body
            )}
        </div>
    )
}

export default MobileMenu
