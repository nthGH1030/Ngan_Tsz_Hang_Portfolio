
import { FaGithub } from "react-icons/fa"
import { FaLinkedin } from "react-icons/fa";
import React from 'react'
import ExtLink from "./extLink";


const BottomBar: React.FC = () => {

    return (
        <section className = "text-3xl text-gray-600 hover:text-black transition-colors">
            <ExtLink
                href = "https://github.com/nthGH1030"
                icon = {<FaGithub/>}
            />
            <ExtLink
                href = "www.linkedin.com/in/kelvin-ngan-3b098a1a3"
                icon = {<FaLinkedin/>}
            />
        </section>
    )
}

export default BottomBar