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

    // Get the CSS variables as strings
    const foregroundHsl = getComputedStyle(document.documentElement).getPropertyValue('--foreground');
    const backgroundHsl = getComputedStyle(document.documentElement).getPropertyValue('--background');

    // Remove the 'hsl(' and ')' parts to get just the hue, saturation, and lightness values
    const foregroundValues = foregroundHsl.slice(4, -1);
    const backgroundValues = backgroundHsl.slice(4, -1);

    // Add the alpha value to create hsla strings
    const foregroundHsla = `hsla(${foregroundValues}, 0.5)`;
    const backgroundHsla = `hsla(${backgroundValues}, 0.5)`;

    return (
        <div
            className="fixed inset-0 -z-10"
            style={{
                background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, hsla(var(--secondary)) 0%, hsl(var(--background)) 30%)`,
            }}
        />
    );
};
