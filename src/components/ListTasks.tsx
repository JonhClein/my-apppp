import { useEffect, useState } from "react";

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
                <Section key={index} status={status} />
            ))}
        </div>
    )
}

export default ListTask;

const Section = ({status }) =>{
    return (
        <div>
            <h2>{status}</h2> List
        </div>
    )
}