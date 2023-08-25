import {Button} from '@mui/material'
import {markTaskAsComplete} from '../firebase.js'
import React, { useEffect, useState } from 'react';

interface TaskProps
{
    assigned: String,
    category: String,
    completion: String[],
    date: String,
    taskKey: String,
    task: String,
    uid: String,
}


function Task (props: TaskProps)  {
    const {assigned, category, completion, date, taskKey, task, uid} = props;
    const [isStrikeThru, setStrikeThru] = useState((completion.indexOf(uid) !== -1) ? 'line-through' : 'none');
    const urlToDirectoryImage = '../photos/directory_photo_neilkardan.png'

    const taskCompletion = () => {
        if (completion.indexOf(uid) == -1) {
            completion.push(uid);
            setStrikeThru('line-through')
        }
        markTaskAsComplete(assigned, category, completion, date, task, taskKey)
    }

    return (
        <div className="task">
            <li>
            <text style={{textDecoration: isStrikeThru}}>{task} - Due by: {date}</text>
                <Button onClick={taskCompletion} style={{marginTop: '-.2rem', float: 'right'}} variant={"contained"}>
                    Complete
                </Button>
            </li>
        </div>
    )

}

export default Task;