'use client';

import React, { useEffect, useState } from 'react';

export const Background = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const updateMousePosition = (ev: MouseEvent) => {
        setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    useEffect(() => {
        window.addEventListener('mousemove', updateMousePosition);

        return () => window.removeEventListener('mousemove', updateMousePosition);
    }, []);

    return (
        <div
            className="fixed inset-0 -z-10"
            style={{
                background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, hsla(var(--secondary)) 0%, hsl(var(--background)) 30%)`,
            }}
        />
    );
};
