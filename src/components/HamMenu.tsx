import React, {useState} from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosClose } from "react-icons/io";

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
            <GiHamburgerMenu 
                onClick = {handleMOpen}
            />
            {isMOpen ? 
                <div>
                    <div className = "backdrop-blur fixed top-0 left-0 z-45 top-0 h-full w-full"></div>
                    <aside className = "fixed top-0 right-0 z-50 top-0 h-full w-3/4 bg-gray-300">
                        <IoIosClose 
                            className = "absolute top-4 right-4 text-5xl"
                            onClick = {() => setIsMOpen(false)}
                        />
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
            : ""}
        </div>
    )
}

export default HamMenu