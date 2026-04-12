import React from 'react'

export interface LinkProps{
    href: string
    icon: React.ReactNode
}

const ExternalLink: React.FC <LinkProps> = ({href , icon}) => {
    const handleClick = () => {
        window.open(href)
    }
    return (
        <button
            type="button"
            className = "hover:text-black transition-colors cursor-pointer bg-transparent border-0 p-0"
            onClick = {handleClick}
        >
            {icon}
        </button>
    )
}

export default ExternalLink