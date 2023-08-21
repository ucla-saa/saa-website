import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import '../styles/HomePage.css';
import firebase, { getCurrentProfile, getTasks, getTasksByUser, getUserProfile, isUserSignedIn } from '../firebase.js';
import Task from '../models/Task';
import {useNavigate} from 'react-router-dom'
import {User} from '../models/User'

const HomePage = () => {
    const [tasks, setTasks] = useState<Array<any>>([]);
    const [signedIn, setSignedIn] = useState<boolean>(true);

    const [user, setUser] = useState<User>()
    let navigate = useNavigate();

    useEffect(() => {
        const isSignedIn = async () => {
            const signedIn = await isUserSignedIn();
            setSignedIn(signedIn);
        }
        isSignedIn();
    }, []);

    useEffect(() => {
        if (!signedIn) {
            return navigate("/")
        }
    }, [signedIn]);

    useEffect(() => {
        const getUser = async () => {
            const currentProfile = await getCurrentProfile();
            setUser(currentProfile);
        }
        getUser();
    }, []);

    useEffect(() => {
        const fetchTasks = async () => {
            setTasks(await getTasksByUser(user));
        }
        fetchTasks();
    }, [user]);

    
    return(
        <div className="HomePage">
           <h1>This Week in SAA</h1>
           <div className="Social">
                {user && user.name && <h2>Welcome {user.name}!</h2>}
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
                        .filter(task => task.category == user?.committee)
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