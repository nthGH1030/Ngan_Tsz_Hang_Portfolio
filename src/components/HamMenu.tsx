import React, {useState} from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import {createPortal} from 'react-dom'

const HamMenu: React.FC = () => {
    const [isOpen , setisOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(false);

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

    const menuSlide = isOpen ? "animate-slide-in" : "animate-slide-out"
    const blur = isVisible ? "backdrop-blur" : ""

    return (
        <div className="w-10 h-10 flex items-center justify-center"> 
            <div>
                <GiHamburgerMenu 
                    className = {`text-3xl z-20 cursor-pointer
                        ${isOpen 
                            ? isVisible ? `opacity-0 scale-90 pointer-events-none animate-spin-fade-out` 
                            : 'opacity-0 scale-90 pointer-events-none'
                            : isVisible ? 'opacity-100 animate-spin-fade-in' : 'opacity-100'
                    }`} 
                    onClick={handleOpen}
                />
                
            </div>
            {isVisible && createPortal( 
                <div>
                    <div className="fixed top-8 right-8 w-10 h-10 z-30 flex items-center justify-center">
                        <IoClose 
                            className = {`text-3xl cursor-pointer
                            ${isOpen 
                                ? isVisible ? `opacity-100 animate-spin-fade-in ` 
                                :  'opacity-100'
                                : isVisible ? 'opacity-0 scale-90 pointer-events-none animate-spin-fade-out' : 
                                'opacity-0 scale-90 pointer-events-none'
                            }`} 
                            //Click -> !isOpen -> Trigger Animation -> setIsvisible(false)
                            onAnimationEnd = {() => {
                                if(!isOpen) setIsVisible(false)
                            }}
                            onClick={handleClose}
                        />
                    </div>
                    <div className = {`${blur} fixed top-0 left-0 z-20 h-full w-full`} onClick={handleClose}></div>
                    <aside className = {`fixed top-0 right-0 z-20 h-full w-3/4 bg-gradient-to-bl from-slate-50 via-gray-50 to-slate-100 shadow-2xl ${menuSlide}`}>
                        <div className ="flex flex-col items-center justify-center h-full gap-8 px-12">
                            <a href = "#about" 
                                className = "nav-link text-3xl font-semibold transition-colors duration-200 hover:text-blue-600 focus:outline-none" 
                                onClick = {(e) => handleNavClick(e, "#about")}>
                                About</a>
                            <a href = "#experience" 
                                className = "nav-link text-3xl font-semibold transition-colors duration-200 hover:text-blue-600 focus:outline-none" 
                                onClick = {(e) => handleNavClick(e, "#experience")}>
                                Experience</a>
                            <a href = "#qualification" 
                                className = "nav-link text-3xl font-semibold transition-colors duration-200 hover:text-blue-600 focus:outline-none" 
                                onClick = {(e) => handleNavClick(e, "#qualification")}>
                                Qualification</a>
                            <a href = "#work" 
                                className = "nav-link text-3xl font-semibold transition-colors duration-200 hover:text-blue-600 focus:outline-none" 
                                onClick = {(e) => handleNavClick(e, "#work")}>
                                Work</a>
                            <a href = "#contact" 
                                className = "nav-link inline-block px-6 py-3 rounded-lg font-semibold text-3xl bg-blue-600 text-white hover:-translate-y-1 hover:-translate-x-1 hover:bg-blue-700 hover:shadow-[4px_4px_0px_0px_rgba(37,99,235,0.4)] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 cursor-pointer transition-all duration-200 will-change-transform" 
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

export default HamMenu