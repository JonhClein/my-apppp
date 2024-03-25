import React, { useEffect, useState } from "react";
import "./App.css";
import CreateTask from "./components/CreateTask";
import ListTask from "./components/ListTasks";
import Prueba from "./components/Prueba";
import toast , {Toaster} from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App: React.FC = () => {
  const [tasks , setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  return (
      <DndProvider backend={HTML5Backend}>
          <div className="bg-slate-100 w-screen h-screen  flex flex-col items-center pt-10 gap-16  ">
        <Toaster/>
        <h1 className="text-center text-3xl"> Todo List </h1>
       
       <Prueba />
        
    </div>
      </DndProvider>
  )
};

export default App;
