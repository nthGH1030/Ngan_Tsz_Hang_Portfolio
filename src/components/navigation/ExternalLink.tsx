import React from 'react'

export interface LinkProps{
    href: string
    icon: React.ReactNode
}

const ExternalLink: React.FC <LinkProps> = ({href , icon}) => {

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className = "hover:text-black transition-colors cursor-pointer bg-transparent border-0 p-0"
        >
            {icon}
        </a>
    )
}

export default ExternalLink