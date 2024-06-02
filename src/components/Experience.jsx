import ModelViewer from "./ModelViewer";

const Card = ({ title, description }) => {
    return (
        <div className="p-4 rounded-lg shadow-lg flex cursor-pointer">
            <div className="bg-black h-[150px] w-[220px]"></div>
            <div className="pl-2">
                <h2 className="text-xl font-bold">{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
}

export const Experience = () => {
    return (
        <>
            <div className="flex">
                <div className="flex flex-col w-full lg:w-[70%] h-full">
                    <ModelViewer
                        className="h-[70vh]"
                        modelName="elephant.gltf"
                    />
                    <div className="">
                        <h2 className="text-xl font-bold">Title</h2>
                        <p>Description</p>
                    </div>
                </div>
                <div className="hidden flex-col lg:flex w-full lg:w-[30%] h-full">
                    <Card title="Title" description="Description" />
                    <Card title="Title" description="Description" />
                    <Card title="Title" description="Description" />
                </div>
            </div>
        </>
    );
};
