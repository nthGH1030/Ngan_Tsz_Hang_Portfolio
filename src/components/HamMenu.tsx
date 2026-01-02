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
        <div> 
            <div>
                <GiHamburgerMenu 
                    className = {`text-3xl z-20
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
                    <IoClose 
                        className = {`fixed top-12 right-12 text-5xl z-30
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
                    <div className = {`${blur} fixed top-0 left-0 z-20 top-0 h-full w-full`}></div>
                    <aside className = {`fixed top-0 right-0 z-20 top-0 h-full w-3/4 bg-gray-300 ${menuSlide}`}>
                        <div className ="flex flex-col items-center justify-center gap-8 
                            text-4xl my-64 mx-6 scrool-smooth">
                            <a href = "#about" 
                                className = "nav-link" 
                                onClick = {(e) => handleNavClick(e, "#about")}>
                                <span>1. </span>
                                About</a>
                            <a href = "#experience" 
                                className = "nav-link" 
                                onClick = {(e) => handleNavClick(e, "#experience")}>
                                <span>2. </span>
                                Experience</a>
                            <a href = "#qualification" 
                                className = "nav-link" 
                                onClick = {(e) => handleNavClick(e, "#qualification")}>
                                <span>3. </span>
                                Qualification</a>
                            <a href = "#work" 
                                className = "nav-link" 
                                onClick = {(e) => handleNavClick(e, "#work")}>
                                <span>4. </span>
                                Work</a>
                            <a href = "#contact" 
                                className = "nav-link" 
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