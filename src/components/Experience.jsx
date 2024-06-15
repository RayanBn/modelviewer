import { useContext, useRef } from "react";
import ModelViewer from "./ModelViewer";
import ModelContext from "../contexts/ModelContext";

export const Experience = () => {
    const { model, setModel } = useContext(ModelContext);
    const canvaRef = useRef(null);

    const screenCurrentResult = () => {
        canvaRef.current.capture();
    }

    const handleModelUpload = (event) => {
        setModel(URL.createObjectURL(event.target.files[0]));
    }

    return (
        <>
            <div className="relative flex flex-col w-full h-full">
                <ModelViewer
                    ref={canvaRef}
                />

                {
                    !model ? (
                        <div className="absolute flex h-full w-full items-center justify-center">
                            <div className="w-[400px]">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">GLB, GLTF</p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" onChange={handleModelUpload} accept=".glb,.gltf" />
                                </label>
                            </div>
                        </div>
                    ) : (
                        <div className="absolute left-5 bottom-5">
                            <input type="file" className="block w-full text-sm text-gray-500
                                file:me-4 file:py-2 file:px-4
                                file:rounded-lg file:border-0
                                file:text-sm file:font-semibold
                                file:bg-gray-500 file:text-white
                                hover:file:bg-gray-700
                                file:disabled:opacity-50 file:disabled:pointer-events-none"
                                onChange={handleModelUpload}
                                accept=".glb,.gltf"
                            />

                            <input
                                type="button"
                                value="Enregistrer"
                                onClick={screenCurrentResult}
                                className="block w-full mt-2 text-sm bg-gray-500 text-white py-2 hover:bg-gray-700 rounded-lg font-semibold"
                            />
                        </div>
                    )
                }

            </div>
        </>
    );
};
