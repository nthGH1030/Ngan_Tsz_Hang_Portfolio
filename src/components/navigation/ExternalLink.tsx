import React from 'react'

export interface LinkProps{
    href: string
    icon: React.ReactNode
    ariaLabel?: string
}

const ExternalLink: React.FC <LinkProps> = ({href , icon, ariaLabel}) => {

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
            className = "hover:text-accent transition-colors cursor-pointer bg-transparent border-0 p-0 hit-target"
        >
            {icon}
        </a>
    )
}

export default ExternalLink
