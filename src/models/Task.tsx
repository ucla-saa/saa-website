
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
    return (
        <div className="task">
            <li>
                <p style={{textDecoration: isStrikeThru}}>{task}</p>{category} {assigned} {completion} <br/>{date}
                <button>
                Mark as complete
                </button>
            </li>
            
        </div>
    )

}

export default Task;