import { Center, ContactShadows, OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import OptionInterface from "./OptionInterface";

const Model = ({
    scene,
    animations,
    currentAnimation,
}) => {
    const modelRef = useRef();
    const { actions } = useAnimations(animations, modelRef);

    useEffect(() => {
        if (currentAnimation) {
            actions[currentAnimation].reset().fadeIn(0.5).play();
            return () => {
                actions[currentAnimation].reset().fadeOut(0.5).stop();
            };
        }
    }, [currentAnimation]);

    return (
        <>
            <primitive
                castShadow
                receiveShadow
                ref={modelRef}
                scale={[0.3, 0.3, 0.3]}
                object={scene}
                rotation={[0, Math.PI, 0]}
            />
        </>
    );
}

const ModelViewer = ({
    modelName,
    ...props
}) => {
    const { scene, animations } = useGLTF('/' + modelName);
    const [currentAnimation, setCurrentAnimation] = useState(null);

    return (
        <>
            <div {...props}>
                <div className="relative w-full h-full">
                    <Canvas
                        className="w-full h-full border-2 border-red rounded-2xl"
                        shadows
                        camera={{
                            position: [3, 1, 3],
                            fov: 30
                        }}
                    >
                        <color attach="background" args={['#93ada4']} />
                        <OrbitControls />

                        <ambientLight intensity={0.5} />

                        <spotLight
                            position={[10, 10, 10]}
                            angle={0.15}
                            penumbra={1}
                        />
                        <Center>
                            <Model
                                scene={scene}
                                animations={animations}
                                currentAnimation={currentAnimation}
                            />
                            <ContactShadows
                                width={1.5}
                                height={1.5}
                                far={100}
                            />
                        </Center>
                    </Canvas>
                    <OptionInterface
                        className="absolute bottom-2 right-2"
                        options={animations.map((animation) => animation.name)}
                        onSelectOption={setCurrentAnimation}
                    />
                </div>
            </div>
        </>
    );
};

export default ModelViewer;
