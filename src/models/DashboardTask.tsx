import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getUserProfile, markTaskAsApproved, deleteTask } from "../firebase";
import {Link} from '@mui/material';
import Popover from '@mui/material/Popover';
import '../styles/DashboardTask.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

interface DatabaseTask
{
    approved: boolean,
    assigned: String,
    category: String,
    completion: String[],
    createdBy: String,
    date: String,
    key: String,
    task: string,
}
interface TaskProps
{
    task: DatabaseTask,
    uid: String,
    updateParent: () => void, 
}

const DashboardTask = (props: TaskProps) => {
    const {task, uid, updateParent} = props;
    const [creator, setCreator] = useState("");
    const [open, setOpen] = useState<HTMLDivElement | null>(null)
    const [showApprovalButton, setShowApprovalButton] = useState<boolean>(false);
    const handleOpen = (event : React.MouseEvent<HTMLDivElement>) => {
        open ? setOpen(null) : setOpen(event.currentTarget ?? null)
    }

    useEffect(() => {
        const getUserName = async () => {
            const user = await getUserProfile(task.createdBy);
            setCreator(user.name);
        }
        getUserName();
    }, []);

    const taskApproved = () => {
        setShowApprovalButton(true);
        markTaskAsApproved(task);
        updateParent();
    }

    function writeTask(task: String) {
        const text = task;
        let regex = new RegExp("(\\(link: )([^\)]*)([^\(]*)(\\(link\\))")
        const newText = task.split(regex)
        if (newText.length >= 3) {
        return (
                <div>
                    <text>{newText[0]}</text>
                    <Link target="_blank" rel="noopener" href={newText[2]}>{newText[3].substr(1)}</Link>
                </div>
            )
        }
        else {
            return (
                 <text>{task}</text>
            )
        }
    }

    const removeTask = () => {
        console.log(task);
        deleteTask(task.key)
        updateParent();
    }

    return (
        <div className="wrapper">
            <div className="DashboardTask" onClick={handleOpen}>
                <p className="paragraph">
                    <div className="Category"> {task.category} 
                        <div className="OpenClose"> 
                            {open !== null ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
                        </div>
                    </div>
                    <div className="Task">{writeTask(task.task)}</div>
                    <div className="Assignees">{task.approved && <text className="CompletedNumber">Completed by: {task.completion.length-1}</text>}{task.assigned}</div>
                    {open && <div className="additionalDetails">
                        {task.approved == true && <div className="deleteTask">
                            <Button variant="contained" onClick={removeTask}>
                                Delete Task
                            </Button>
                        </div>}
                        <div className="Creator"> created by {creator}</div>
                            {task.approved == true ? <div className="Completed"> 
                            <div> completed by </div>
                                    {task.completion.length !== 0
                                    && task.completion.map(completion => (
                                        <text>{completion} </text>
                                    ))}
                                </div> : <div hidden={showApprovalButton}>
                            <Button size="small" style={{margin: '.5rem'}}onClick={taskApproved} variant={"contained"}>
                                Approve
                            </Button>
                        </div>}
                        
                    </div>}
                </p>
            </div>
        </div>
    )
}
export default DashboardTask;