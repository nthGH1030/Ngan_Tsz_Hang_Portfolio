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
                    lol
                    <IoIosClose 
                        onClick = {() => setIsMOpen(false)}
                    />
                </aside> 
            : ""}
        </div>
    )
}

export default HamMenu