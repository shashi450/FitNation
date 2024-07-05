import React from 'react'

const ChatBot = () => {
    return (
        <iframe
            style={{ borderRadius: '12px' }}
            src="https://embedai.thesamur.ai/embedai/embed/jitesh-fit-bot?simple=true"
            width="100%"
            height="600px"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy">
        </iframe>
    );
};

export default ChatBot