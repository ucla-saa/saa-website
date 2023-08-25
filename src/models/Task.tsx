import {Button} from '@mui/material'
import {markTaskAsComplete} from '../firebase.js'
interface TaskProps
{
    assigned: String,
    category: String,
    completion: String[],
    date: String,
    task: String,
    uid: String,
}


function Task (props: TaskProps)  {
    const {assigned, category, completion, date, task, uid} = props;
    const isStrikeThru = (completion.indexOf(uid) !== -1) ? 'line-through' : 'none';
    const urlToDirectoryImage = '../photos/directory_photo_neilkardan.png'

    const taskCompletion = () => {
        console.log(task);
        markTaskAsComplete(assigned, category, completion.push(uid), date, task)
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