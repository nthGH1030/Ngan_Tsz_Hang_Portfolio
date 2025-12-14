import React from 'react';

interface TagProps {
    color: string;
    content: string;
}

const Tag: React.FC<TagProps> = ({ color, content }) => {
    return (
        <div className={`rounded-full px-2 py-1 ${color}`}>
            {content}
        </div>
    );
};

export default Tag;