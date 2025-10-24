import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Watch } from './Watch';

gsap.registerPlugin(ScrollTrigger);

const Scene = ({ progress }) => {
    const cameraRef = useRef(null);
    useFrame(() => {
        cameraRef.current.lookAt(0, 0, 0)
    })

    useEffect(() => {
        const updateCamPos = () => {
            const positions = [
                [3.5, 2.17, 3.7],
                [3.7, 0.6, 0.7],
                [2.3, 0.87, -4.2],
                [0, 2.5, 3.6],
            ];

            if (progress>=1) {
                 gsap.to(cameraRef.current.position, {
                    x: 0,
                    y: 2.5,
                    z: 3.6,
                    duration: 0.5,
                    ease: 'power1.out'
                })
            }
            else {
                const segmentProgress = 1 / 3;
                const segmentIndex = Math.floor(progress / segmentProgress);
                const perentage = (progress % segmentProgress) / segmentProgress;
                const [startX, startY, StartZ] = positions[segmentIndex];
                const [endX, endY, endZ] = positions[segmentIndex + 1];
                const x = startX + (endX - startX) * perentage;
                const y = startY + (endY - startY) * perentage;
                const z = StartZ + (endZ - StartZ) * perentage;

                gsap.to(cameraRef.current.position, {
                    x: x,
                    y: y,
                    z: z,
                    duration: .5,
                    ease: 'power1.out'
                })
            }
        }
        updateCamPos();
    }, [progress, cameraRef.current])

    return (
        <>
            {/* <OrbitControls /> */}
            <PerspectiveCamera
                ref={cameraRef}
                fov={45}
                near={.1}
                far={10000}
                makeDefault


            />
            <Environment preset='city' />
            <Watch scale={[30, 30, 30]} />
            {/* <axesHelper args={[500]} /> */}
        </>
    )
}

export default Scene
