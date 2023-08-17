import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get, child} from "firebase/database";
import '../styles/HomePage.css';
import firebase, { getTasks } from '../firebase.js';
import Task from '../models/Task';

const HomePage = () => {
    const [tasks, setTasks] = useState<Array<any>>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            setTasks(await getTasks());
        }
        fetchTasks();
    }, []);

    

    
    return(
        <div className="HomePage">
           <h1>This Week in SAA</h1>
           <div className="Social">
                <h2>
                    Social
                </h2>
                   <ul>
                   {tasks.length !== 0 && tasks
                   .filter(task => task.category == "social")
                   .map(task => (
                    <Task 
                                assigned={task.assigned}
                                category={task.category}
                                completion={task.completion}
                                date={task.date}
                                task={task.task}
                            />
                    ))}
                   </ul>
           </div>
           <div className="Committee">
                <h2>
                    Committee
                </h2>
                <ul>
                    {tasks.length !== 0 && tasks
                        .filter(task => task.category == "committee")
                        .map(task => (
                            <Task 
                                assigned={task.assigned}
                                category={task.category}
                                completion={task.completion}
                                date={task.date}
                                task={task.task}
                            />
                    ))}
                </ul>
           </div>
           <div className="SAA">
                <h2> 
                        SAA
                </h2>
                <ul>
                    {tasks.length !== 0 && tasks
                        .filter(task => task.category == "saa")
                        .map(task => (
                            <Task 
                                assigned={task.assigned}
                                category={task.category}
                                completion={task.completion}
                                date={task.date}
                                task={task.task}
                            />
                    ))}
                </ul>
           </div>
        </div>
    )
}

export default HomePage;