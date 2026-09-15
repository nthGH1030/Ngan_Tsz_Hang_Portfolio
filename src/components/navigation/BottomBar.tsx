import { FaGithub } from "react-icons/fa"
import { FaLinkedin } from "react-icons/fa";
import React from 'react'
import ExternalLink from "./ExternalLink";


const BottomBar: React.FC = () => {

    return (
        <aside aria-label="Social links">
            <div className = "hidden md:block">
                <div className = "fixed bottom-0 left-0 ml-8">
                    <div className ="text-2xl text-gray-700 
                        flex flex-col items-center justify-center gap-8 mb-4">
                        <ExternalLink
                            href = "https://github.com/nthGH1030"
                            ariaLabel="GitHub profile"
                            icon = {<FaGithub aria-hidden="true" />}
                        />
                        <ExternalLink
                            href = "https://www.linkedin.com/in/kelvin-ngan-3b098a1a3"
                            ariaLabel="LinkedIn profile"
                            icon = {<FaLinkedin aria-hidden="true" />}
                        />
                    </div>
                    <div className = "bg-gray-300 h-24 w-px mx-2" aria-hidden="true"></div>
                </div>
            </div>
            <div className ="md:hidden text-4xl text-gray-700 hover:text-black transition-colors
                flex items-center justify-center gap-8 mb-8">
                <ExternalLink
                    href = "https://github.com/nthGH1030"
                    ariaLabel="GitHub profile"
                    icon = {<FaGithub aria-hidden="true" />}
                />
                <ExternalLink
                    href = "https://www.linkedin.com/in/kelvin-ngan-3b098a1a3"
                    ariaLabel="LinkedIn profile"
                    icon = {<FaLinkedin aria-hidden="true" />}
                />
            </div>
   
        </aside>
    )
}

export default BottomBar
