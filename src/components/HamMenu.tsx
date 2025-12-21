import React, {useState} from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const HamMenu: React.FC = () => {
    const [isMOpen , setIsMOpen] = useState(false)

    const handleMOpen = () => {
        setIsMOpen(!isMOpen)
        console.log("i am clicked")
    }

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement> , target: string) => {
        e.preventDefault();
        setIsMOpen(false);
        setTimeout(() => {
            const el = document.querySelector(target);
            if(el){
                el.scrollIntoView({behavior: 'smooth'})
            }
        },150)
    }

    return (
        <div> 
            <div>
                <GiHamburgerMenu 
                    className = {`fixed top-12 right-12 text-5xl z-50
                        ${isMOpen ? `opacity-0 scale-90 pointer-events-none` 
                            : `opocity-100`
                    }`} 
                    onClick = {() => setIsMOpen(true)}
                />
                <IoClose 
                    className = {`fixed top-12 right-12 text-5xl z-51
                        ${isMOpen ? `opocity-100` : `opacity-0 scale-90 pointer-events-none`
                    }`} 
                    onClick = {() => setIsMOpen(false)}
                />
            </div>
            {isMOpen ? 
                <div>
                    <div className = "backdrop-blur fixed top-0 left-0 z-45 top-0 h-full w-full"></div>
                    <aside className = "fixed top-0 right-0 z-50 top-0 h-full w-3/4 bg-gray-300 animate-slide-in ">
                        <div className ="flex flex-col items-center justify-center gap-8 
                            text-4xl my-64 mx-6 scrool-smooth">
                            <a href = "#about" 
                                className = "nav-link" 
                                onClick = {(e) => handleNavClick(e, "#about")}>
                                About</a>
                            <a href = "#experience" 
                                className = "nav-link" 
                                onClick = {(e) => handleNavClick(e, "#experience")}>
                                Experience</a>
                            <a href = "#qualification" 
                                className = "nav-link" 
                                onClick = {(e) => handleNavClick(e, "#qualification")}>
                                Qualification</a>
                            <a href = "#work" 
                                className = "nav-link" 
                                onClick = {(e) => handleNavClick(e, "#work")}>
                                Work</a>
                            <a href = "#contact" 
                                className = "nav-link" 
                                onClick = {(e) => handleNavClick(e, "#contact")}>
                                Contact</a>
                        </div>
                    </aside> 
                </div>
            : 
            ""}
        </div>
    )
}

export default HamMenu