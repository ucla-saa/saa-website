import {Button, Link} from '@mui/material'
import {markTaskAsComplete} from '../firebase.js'
import React, { useEffect, useState } from 'react';

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


function Task (props: TaskProps)  {
    const {approved, assigned, category, completion, createdBy, date, taskKey, task, username} = props;
    const [isStrikeThru, setStrikeThru] = useState((completion.indexOf(username) !== -1) ? 'line-through' : 'none');

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

    const taskCompletion = () => {
        if (completion.indexOf(username) == -1) {
            completion.push(username);
            setStrikeThru('line-through')
            console.log(completion)
        }
        else {
            console.log(completion.indexOf(username))
            completion.splice(completion.indexOf(username), 1);
            setStrikeThru('none')
            console.log(completion)
        }
        markTaskAsComplete(approved, assigned, category, completion, createdBy, date, task, taskKey)
    }

    return (
        <div className="task">
            <li>
            <text style={{textDecoration: isStrikeThru}}>{writeTask(task)} - Due by: {date}</text>
                <Button onClick={taskCompletion} style={{marginTop: '-.2rem', float: 'right'}} variant={"contained"}>
                    Complete
                </Button>
            </li>
        </div>
    )

}

export default Task;