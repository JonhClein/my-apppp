import { useEffect, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast"; 
import { useDrag, useDrop } from "react-dnd";
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
    const [{isOver} , drop] = useDrop(()=>({
        accept : "task" , 
        drop : (item) =>addItemToSection(item.id),
        collect : (monitor) => ({
            isOver : !!monitor.isOver() , 
        })
    }))

  const addItemToSection = (id) =>{
    console.log("droped" , id);
    setTasks((prev) =>{
        const mTask = prev.map((t) =>{
            if(t.id === id){
                return {...t , status:status}
            }

            return t ;
        })

        localStorage.setItem("tasks" , JSON.stringify(mTask));
        toast.success("Se Movio")
        return mTask;
    })
  }


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
        <div 
         ref={drop}
        className={`w-64 h-64 rounded-md p-2 ${isOver ? "bg-slate-200" : ""}`}>
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
    const [{isDragging} , drag] = useDrag(()=>({
        type : "task" , 
        item: {id : task.id} ,
        collect : (monitor) => ({
            isDragging : !!monitor.isDragging() 
        })
    }))

    console.log(isDragging)
    const handleRemove = (id)=>{
        console.log(id);
        const fTask = tasks.filter(t => t.id!== id);
        localStorage.setItem("tasks" , JSON.stringify(fTask))
        setTasks(fTask);
        toast("Task Removed")
    }
    return (
       <div 
        ref={drag}
       className="
        ${isDragging ? 'opacity-25' : 'opacity-100'}
       relative p-4 mt-8 shadow-md rounded-md cursor-grab">
            <p>{task?.name}</p>
            <MdOutlineDeleteOutline  className=" absolute button-1 right-1 text-slate-400" 
             onClick={()=>handleRemove(task.id)}
            />
       </div>
    )
   }