import { useState } from "react";
import toast from "react-hot-toast";
import {v4 as uuidv4} from "uuid";

const CreateTask = ({ tasks , setTasks}) =>{

    const [task , setTask] = useState({
        id : "" , 
        name : "", 
        status : "todos"
    });


    const handleSubmit = (e) =>{
        e.preventDefault();


        if(task.name.length < 3) return toast.error("Atask big little")

        setTasks((prev) => {
          const list = [...prev , task]
          localStorage.setItem("tasks" , JSON.stringify(list));
          return list
        })

        toast.success("Very Good");
        setTask({
            id: "" , 
            name : "" , 
            status: "todo"
        })
      }


    console.log(task);
    return (
       <form onSubmit={handleSubmit}>
          <input type="text" className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1" 
            value = {task.name}
            onChange={(e) => setTask({...task , id : uuidv4() , name : e.target.value})}
          />
        <button
            className="bg-cyan-500 rounded-md px-6  text-white text-2xl h-12"
        > Create</button>
       </form>

    )
}

export default CreateTask;