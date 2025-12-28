
import { FaGithub } from "react-icons/fa"
import { FaLinkedin } from "react-icons/fa";
import React from 'react'
import ExtLink from "./extLink";


const BottomBar: React.FC = () => {

    return (
        <section>
            <div className = "hidden md:block">
                <div className = "fixed bottom-0 left-0 ml-8">
                    <div className ="text-2xl text-gray-600 
                        flex flex-col items-center justify-center gap-8 mb-4">
                        <ExtLink
                            href = "https://github.com/nthGH1030"
                            icon = {<FaGithub/>}
                        />
                        <ExtLink
                            href = "www.linkedin.com/in/kelvin-ngan-3b098a1a3"
                            icon = {<FaLinkedin/>}
                        />
                    </div>
                    <div className = "bg-gray-300 h-24 w-px mx-2"></div>
                </div>
            </div>
            <div className ="md:hidden text-4xl text-gray-600 hover:text-black transition-colors
                flex items-center justify-center gap-8 mb-8">
                <ExtLink
                    href = "https://github.com/nthGH1030"
                    icon = {<FaGithub/>}
                />
                <ExtLink
                    href = "www.linkedin.com/in/kelvin-ngan-3b098a1a3"
                    icon = {<FaLinkedin/>}
                />
            </div>
   
        </section>
    )
}

export default BottomBar