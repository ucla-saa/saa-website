import {Button, Link} from '@mui/material'
import {markTaskAsComplete} from '../firebase.js'
import React, { useEffect, useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import '../styles/AssignedTask.css'
import {getMonthByNumber} from '../form-components/ConstantObjects';



interface TaskProps
{
    approved: boolean,
    assigned: String,
    category: String,
    completion: String[],
    createdBy: String,
    date: String,
    taskKey: String,
    task: string,
    username: String,
}


function AssignedTask (props: TaskProps)  {
    const {approved, assigned, category, completion, createdBy, date, taskKey, task, username} = props;
    const [open, setOpen] = useState<HTMLDivElement | null>(null)
    const [refresh, setRefresh] = useState<boolean>(false)
    
    const handleOpen = (event : React.MouseEvent<HTMLDivElement>) => {
        open ? setOpen(null) : setOpen(event.currentTarget ?? null)
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

    function formatDate(date: String) {
        const text = date
        let regex = new RegExp("([A-Za-z0-9]+(-[A-Za-z0-9]+)+)")
        const newDate = date.split(regex)
        
        const month = getMonthByNumber(newDate[1].substr(5,2))
        

        const finalDate = month + ' ' + newDate[1].substr(8, 2) + ', ' + newDate[1].substr(0,4)
        
        
        return (
            <text>{finalDate}</text>
        )
    }

    async function taskCompletion () {
        if (completion.indexOf(username) == -1) {
            completion.push(username);
        }
        else {
            completion.splice(completion.indexOf(username), 1);
        }
        await markTaskAsComplete(approved, assigned, category, completion, createdBy, date, task, taskKey)
        setRefresh(!refresh)
    }

    return (
        <div className="wrapper">
            <div className="DashboardTask">
                <p className="paragraph">
                    <div className="Category"> {category} 
                        <div className="OpenClose"> 
                            {completion.includes(username) ? <CheckCircleIcon /> :<PendingIcon style={{color: '#C73E1D'}}/>}
                        </div>
                    </div>
                    <div className="Task">{writeTask(task)}</div>
                    <div className="dueDate">Due by: {formatDate(date)}</div>
                    <Button onClick={taskCompletion} variant={"contained"}>
                        Complete
                    </Button>
                </p>
            </div>
        </div>
    )

}

export default AssignedTask;