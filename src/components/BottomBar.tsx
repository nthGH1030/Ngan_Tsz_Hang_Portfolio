
import { FaGithub } from "react-icons/fa"
import { FaLinkedin } from "react-icons/fa";
import React from 'react'
import ExtLink from "./extLink";


const BottomBar: React.FC = () => {

    return (
        <section className = "text-3xl text-gray-600 hover:text-black transition-colors">
            <ExtLink
                href = ""
                icon = {<FaGithub/>}
            />
            <ExtLink
                href = ""
                icon = {<FaLinkedin/>}
            />
        </section>
    )
}

