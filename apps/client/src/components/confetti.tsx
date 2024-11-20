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
            shapes: ["square"],
            colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
        };

        confetti({
            ...defaults,
            particleCount: 50,
            scalar: 2,
        });

        confetti({
            ...defaults,
            particleCount: 25,
            scalar: 3,
        });

        confetti({
            ...defaults,
            particleCount: 10,
            scalar: 4,
        });
    }, []);

    return null;
};

export default ConfettiEffect;