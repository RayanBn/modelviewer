import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";

export const Experience = () => {
    const modelRef = useRef();

    const { scene, animations } = useGLTF("/elephant.gltf");
    const { actions, names } = useAnimations(animations, modelRef);

    useEffect(() => {
        actions[names[0]].reset().fadeIn(0.5).play();
        return () => {
            actions[names[0]].reset().fadeOut(0.5).stop();
        };
    }, [actions]);

    return (
        <>
            <OrbitControls />

            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />

            <primitive
                ref={modelRef}
                scale={[0.3, 0.3, 0.3]}
                object={scene}
            />
        </>
    );
};
