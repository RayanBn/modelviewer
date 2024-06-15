import { useState } from "react";
import { Experience } from "./components/Experience";
import ModelContext from "./contexts/ModelContext";
import { Leva } from "leva";

const App = () => {
    const [ model, setModel ] = useState(null);
    
    return (
        <>
            <ModelContext.Provider value={{ model, setModel }}>
                <Experience />
                <Leva
                    collapsed={false}
                />
            </ModelContext.Provider>
        </>
    );
}

export default App;
