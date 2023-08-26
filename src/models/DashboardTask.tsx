import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getUserProfile, markTaskAsApproved } from "../firebase";
import {Link} from '@mui/material';
import '../styles/DashboardTask.css'

interface DatabaseTask
{
    approved: boolean,
    assigned: String,
    category: String,
    completion: String[],
    createdBy: String,
    date: String,
    taskKey: String,
    task: string,
}
interface TaskProps
{
    task: DatabaseTask,
    uid: String,
}

const DashboardTask = (props: TaskProps) => {
    const {task, uid} = props;
    const [creator, setCreator] = useState("");


    useEffect(() => {
        const getUserName = async () => {
            const user = await getUserProfile(uid);
            setCreator(user.name);
        }
        getUserName();
    }, []);

    const taskApproved = () => {
        markTaskAsApproved(task);
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

    return (
        <div className="DashboardTask">
            <p>
                <div className="Task">Task: {writeTask(task.task)}</div>
                <div className="Category"> Category: {task.category}</div>
                <div className="Assignees"> Assignees: {task.assigned}</div>
                <div className="Category"> Creator: {creator}</div>
                {task.approved == true ? <div className="Completed"> 
                <div> Completed by: {task.completion.length-1} </div>
                        {task.completion.length !== 0
                        && task.completion.map(completion => (
                            <text>{completion}</text>
                        ))}
                    </div> :
                <div>
                    <Button onClick={taskApproved} variant={"contained"}>
                        Complete
                    </Button>
                </div>
                }
                
            </p>
        </div>
    )
}
export default DashboardTask;