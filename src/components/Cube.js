import React, { useState, useEffect, useRef } from "react";
import "../styles/Cube.css";

const Cube = () => {
    const cubeRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    const handleMouseMove = (event) => {
        const { clientX, clientY } = event;
        setMousePosition({ x: clientX, y: clientY });
    };

    const handleMouseLeave = (event) => {
        if (!event.relatedTarget || event.relatedTarget.nodeName === "HTML") {
            console.log("Mouse is out of view");
        }
    };

    useEffect(() => {
        if (cubeRef.current) {
            const rect = cubeRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const MAX_ROTATION = 90; // in degrees

            const deltaX = mousePosition.x - centerX;
            const deltaY = mousePosition.y - centerY;

            const rotateY = (deltaX / window.innerWidth) * MAX_ROTATION;
            const rotateX = -(deltaY / window.innerHeight) * MAX_ROTATION;
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
                    <div className="face-content">Front</div>
                </div>
                <div className="face back">
                    <div className="face-content">Back</div>
                </div>
                <div className="face right">
                    <div className="face-content">Right</div>
                </div>
                <div className="face left">
                    <div className="face-content">Left</div>
                </div>
                <div className="face top">
                    <div className="face-content">Top</div>
                </div>
                <div className="face bottom">
                    <div className="face-content">Bottom</div>
                </div>
            </div>
        </div>
    );
};

export default Cube;
