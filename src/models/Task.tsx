import {Button} from '@mui/material'
interface TaskProps
{
    
    assigned: String,
    category: String,
    completion: String,
    date: String,
    task: String,
}

function Task (props: TaskProps)  {
    const {assigned, category, completion, date, task} = props;
    const isStrikeThru = completion ? 'line-through' : 'none';
    const urlToDirectoryImage = '../photos/directory_photo_neilkardan.png'
    return (
        <div className="task">
            <li>
            <text style={{textDecoration: isStrikeThru}}>{task} - Due by: {date}</text>
                <Button style={{marginTop: '-.2rem', float: 'right'}} variant={"contained"}>
                    COMPLETE
                </Button>
            </li>
        </div>
    )

}

export default Task;