import { useEffect, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
const ListTask = ({ tasks , setTasks}) =>{
    const [todos , setTodos] = useState([]);
    const [inProgress , setInProgress] = useState([]);
    const [closed , setClosed] = useState([]);
    
    useEffect(()=>{
        const fTodos = tasks.filter(task => task.status == "todos");  
        const fInProgress = tasks.filter(task => task.status == "inprogress");  
        const fClosed = tasks.filter(task => task.status == "closed");  

        setTodos(fTodos);
        setInProgress(fInProgress);
        setClosed(fClosed);
    }
    , [tasks])

    const statuses = ["todo" , "inprogress" , "closed"]
    return (
        <div className="flex gap-16">
            {statuses.map((status , index)=>(
                <Section key={index} status={status} 
                tasks={tasks}
                setTasks={setTasks}
                todos={todos}
                inProgress={inProgress}
                closed={closed}
                />
            ))}
        </div>
    )
}

export default ListTask;

const Section = ({status , tasks  , setTasks , todos, inProgress , closed}) =>{
    let text = "Todo";
    let bg = "bg-slate-500";
    let tasksToMap = todos;

    if(status === "inprogress"){
            text = "In Progress"
            bg ="bg-purple-500"
            tasksToMap = inProgress
    }

    if(status === "closed"){
        text = "In Progress"
        bg ="bg-purple-500"
        tasksToMap = inProgress
}


        
    return (
        <div className={`w-64 h-64`}>
           <Header text={text} bg={bg} count={tasksToMap.length} /> 
           {tasksToMap.length > 0 && tasksToMap.map(task => (
            <Tasks key={task.id}
            tasks={tasks}
            setTasks={setTasks}
            task={task}
            />
           ))}
        </div>
    )
}

const Header = ({text , bg , count}) =>{
 return (
    <div className={`${bg} flex items-center h-12 pl-4  uppercase text-sm text-white `}>
    {text} 
    <div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center"> {count} </div>
    </div>
 )
}


const Tasks = ({task , tasks , setTasks}) =>{

    const handleRemove = (id)=>{
        console.log(id);
        const fTask = tasks.filter(t => t.id!== id)
    }
    return (
       <div className="relative p-4 mt-8 shadow-md rounded-md cursor-grab">
            <p>{task.name}</p>
            <MdOutlineDeleteOutline  className=" absolute button-1 right-1 text-slate-400" 
             onClick={()=>handleRemove(task.id)}
            />
       </div>
    )
   }