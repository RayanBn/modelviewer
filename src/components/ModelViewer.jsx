import { Center, Clone, ContactShadows, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import ModelContext from "../contexts/ModelContext";
import { forwardRef, useContext, useImperativeHandle } from "react";
import { useControls } from "leva";

const Model = ({
    file,
    ...props
}) => {
    const { scene, animations } = useGLTF(file);

    return (
        <>
            <group
                {...props}
            >
                <Clone
                    castShadow
                    receiveShadow
                    rotation={[0, -Math.PI / 2, 0]}
                    object={scene}
                />
            </group>
        </>
    );
}

const Capture = forwardRef((props, ref) => {
    const { gl, scene, camera } = useThree();

    useImperativeHandle(ref, () => ({
        capture: () => {
            gl.render(scene, camera);
            const data = gl.domElement.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = data;
            a.download = 'image.png';
            a.click();
        }
    }));

    return null;
});


const ModelViewer = forwardRef((props, ref) => {
    const { lightPosition, lightColor } = useControls(
        'Light', {
            lightPosition: {
                value: [10, 10, 10],
                step: 0.1
            },
            lightColor: {
                value: '#ffffff'
            }
        }
    );
    const { backgroundColor } = useControls(
        'Background', {
            backgroundColor: {
                value: '#213e34'
            }
        }
    );
    const { contactShadows } = useControls(
        'Shadows', {
            contactShadows: {
                value: true
            }
        }
    );
    const { model: modelFile } = useContext(ModelContext);

    return (
        <>
            <Canvas
                className="w-full h-full border-2 border-red rounded-2xl"
                shadows
                camera={{
                    position: [3, 1, 3],
                    fov: 30
                }}
                {...props}
            >
                <color attach="background" args={[backgroundColor]} />
                <Capture ref={ref} />
                <OrbitControls />

                <ambientLight intensity={0.5} />

                <spotLight
                    position={lightPosition}
                    color={lightColor}
                    shadow-mapSize={[4096*2, 4096*2]}
                    shadow-blur={5}
                    castShadow
                />

                {
                    modelFile &&
                    <Center>
                        <Model
                            scale={.2}
                            file={modelFile}
                        />

                        {
                            contactShadows &&
                            <ContactShadows
                                width={1.5}
                                height={1.5}
                                far={100}
                            />
                        
                        }
                        <mesh
                            castShadow
                            receiveShadow
                            rotation={[-Math.PI / 2, 0, 0]}
                            position={[0, -0.01, 0]}
                        >
                            <planeGeometry args={[1000, 1000]} />
                            <meshStandardMaterial
                                color={backgroundColor}
                            />
                        </mesh>
                    </Center>
                }

            </Canvas>
        </>
    );
});

export default ModelViewer;
