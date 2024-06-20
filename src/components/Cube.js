import React, { useState, useEffect, useRef } from "react";
import "../styles/Cube.css";

const Cube = () => {
    const cubeRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [mouseInside, setMouseInside] = useState(true);

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
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                }}
            >
                <div className="face front">
                    <div className="face-content">
                        <div className="eye-holder">
                            <div className="eye"></div>
                            <div className="eye"></div>
                        </div>
                        <div
                            className="mouth"
                            style={{
                                clipPath: `circle(55% at 50% ${mouseInside ? 0 : 100}%)`,
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
