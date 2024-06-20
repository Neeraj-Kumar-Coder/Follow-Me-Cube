import React, { useState, useEffect, useRef } from "react";
import "../styles/Cube.css";

const Cube = () => {
    const cubeRef = useRef(null);
    const eyeRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [mouseInside, setMouseInside] = useState(true);
    const [previousTimeoutKey, setPreviousTimeoutKey] = useState(-1);

    const randomNumberBetween = (low, high) => {
        return Math.random() * (high - low) + low;
    };

    const handleMouseMove = (event) => {
        const { clientX, clientY } = event;
        setMousePosition({ x: clientX, y: clientY });
        setMouseInside(true);
    };

    const handleMouseLeave = (event) => {
        if (!event.relatedTarget || event.relatedTarget.nodeName === "HTML") {
            setMouseInside(false);
        }
    };

    useEffect(() => {
        if (cubeRef.current) {
            const rect = cubeRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const MAX_ROTATION_DEGREE = 90;

            const deltaX = mousePosition.x - centerX;
            const deltaY = mousePosition.y - centerY;

            const rotateY = (deltaX / window.innerWidth) * MAX_ROTATION_DEGREE;
            const rotateX = -(deltaY / window.innerHeight) * MAX_ROTATION_DEGREE;
            setRotation({ x: rotateX, y: rotateY });
        }
    }, [mousePosition]);

    useEffect(() => {
        if (mouseInside) {
            cubeRef.current.style.transition = "none";
            clearTimeout(previousTimeoutKey);
            return;
        }

        cubeRef.current.style.transition = "all 150ms ease-out";

        const lookAtX = Math.random() * window.innerWidth;
        const lookAtY = Math.random() * window.innerHeight;

        const key = setTimeout(() => {
            setMousePosition({ x: lookAtX, y: lookAtY });
        }, randomNumberBetween(700, 1400));

        setPreviousTimeoutKey(key);
    }, [mouseInside, mousePosition]);

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseout", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseout", handleMouseLeave);
        };
    }, []);

    return (
        <div className="scene">
            <div
                className="cube"
                ref={cubeRef}
                style={{
                    "--initial-rotateX": `${rotation.x}deg`,
                    "--initial-rotateY": `${rotation.y}deg`,
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    animation: mouseInside ? "confusedIn 500ms linear 0s 1" : "confusedOut 500ms linear 0s 1",
                }}
            >
                <div className="face front">
                    <div className="face-content">
                        <div ref={eyeRef} className="eye-holder">
                            <div className="eye"></div>
                            <div className="eye"></div>
                        </div>
                        <div
                            className="mouth"
                            style={{
                                clipPath: `circle(50% at 50% ${mouseInside ? 10 : 90}%)`,
                                marginBottom: mouseInside ? "0.3rem" : "1rem",
                            }}
                        ></div>
                    </div>
                </div>
                <div className="face back"></div>
                <div className="face right"></div>
                <div className="face left"></div>
                <div className="face top"></div>
                <div className="face bottom"></div>
            </div>
        </div>
    );
};

export default Cube;
