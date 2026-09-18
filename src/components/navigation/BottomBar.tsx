import { FaGithub } from "react-icons/fa"
import { FaLinkedin } from "react-icons/fa";
import React from 'react'
import ExternalLink from "./ExternalLink";


const BottomBar: React.FC = () => {

    return (
        <aside aria-label="Social links">
            <div className = "hidden md:block">
                <div className = "pointer-events-auto fixed bottom-0 left-8 z-10">
                    <div className ="text-2xl text-muted
                        flex flex-col items-center justify-center gap-2 mb-4">
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
                    <div className = "bg-line h-24 w-px mx-2" aria-hidden="true"></div>
                </div>
            </div>
            <div className ="md:hidden text-4xl text-muted
                flex items-center justify-center gap-2 mb-8">
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
