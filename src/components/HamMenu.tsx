import React, {useState} from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosClose } from "react-icons/io";

const HamMenu: React.FC = () => {
    const [isMOpen , setIsMOpen] = useState(false)

    const handleMOpen = () => {
        setIsMOpen(!isMOpen)
        console.log("i am clicked")
    }

    return (
        <div>
            <GiHamburgerMenu 
                onClick = {handleMOpen}
            />
            {isMOpen ? 
                <aside className = "fixed top-0 right-0 z-50 top-0 h-full w-3/4 bg-gray-300">
                    <IoIosClose 
                        className = "absolute top-4 right-4 text-5xl"
                        onClick = {() => setIsMOpen(false)}
                    />
                    <div className = "flex flex-col items-center justify-center gap-2 text-lg my-64 mx-6">
                        <a href = "#about" className = "nav-link" >About</a>
                        <a href = "#experience" className = "nav-link" >Experience</a>
                        <a href = "#qualification" className = "nav-link" >Qualification</a>
                        <a href = "#work" className = "nav-link" >Work</a>
                        <a href = "#contact" className = "nav-link" >Contact</a>
                    </div>
                </aside> 
            : ""}
        </div>
    )
}

export default HamMenu