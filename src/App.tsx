import React, { useEffect, useState } from "react";
import "./App.css";
import CreateTask from "./components/CreateTask";
import ListTask from "./components/ListTasks";
import toast , {Toaster} from "react-hot-toast";


const App: React.FC = () => {
  const [tasks , setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  return (
    <div className="bg-slate-100 w-screen h-screen  flex flex-col items-center pt-3 gap-16 pt-32 ">
        <Toaster/>
        <h1 className="text-center text-3xl">Todo List</h1>
        <CreateTask tasks={tasks} setTasks={setTasks} /> 
        <ListTask  tasks={tasks} setTasks={setTasks} />
        
    </div>
  )
};

export default App;
