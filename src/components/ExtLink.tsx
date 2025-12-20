import React from 'react'

export interface LinkProps{
    href: string
    icon: React.ReactNode
}

const ExtLink: React.FC <LinkProps> = ({href , icon}) => {
    const handleClick = () => {
        window.open(href)
    }
    return (
        <div
            onClick = {handleClick}
        >
            {icon}
        </div>
    )
}

export default ExtLink