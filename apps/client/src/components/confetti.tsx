import React, { useEffect } from "react";
import { confetti } from "@tsparticles/confetti";

const ConfettiEffect: React.FC = () => {
    useEffect(() => {
        const defaults = {
            spread: 360,
            ticks: 100,
            gravity: 0,
            decay: 0.94,
            startVelocity: 30,
            shapes: ["polygon"],
            colors: [
                "#FF0000", // Red
                "#FFA500", // Orange
                "#FFFF00", // Yellow
                "#008000", // Green
                "#0000FF", // Blue
                "#800080", // Purple
                "#FFC0CB", // Pink
                "#FFFFFF"  // White
            ]
            ,
        };

        confetti({
            ...defaults,
            particleCount: 100,
            scalar: 2,
        });

        confetti({
            ...defaults,
            particleCount: 50,
            scalar: 3,
        });

        confetti({
            ...defaults,
            particleCount: 25,
            scalar: 4,
        });
    }, []);

    return null;
};

export default ConfettiEffect;