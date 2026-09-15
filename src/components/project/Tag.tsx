import React from 'react';

interface TagProps {
    color: string;
    content: string;
}

const Tag: React.FC<TagProps> = ({ color, content }) => {
    return (
        <span className={`rounded-full px-2 py-1 whitespace-nowrap ${color}`}>
            {content}
        </span>
    );
};

export default Tag;