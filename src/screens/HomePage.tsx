import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import '../styles/HomePage.css';
import firebase, { getCurrentProfile, getTasks, getTasksByUser, getUserProfile, getUserUID, isUserSignedIn } from '../firebase.js';
import Task from '../models/Task';
import {useNavigate} from 'react-router-dom'
import {User} from '../models/User'

const HomePage = () => {
    const [tasks, setTasks] = useState<Array<any>>([]);
    const [signedIn, setSignedIn] = useState<boolean>(true);
    const [user, setUser] = useState<User>()
    const [uid, setUID] = useState<any>("");

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
        const getUID = async () => {
            setUID(await getUserUID());
        }
        const fetchTasks = async () => {
            setTasks(await getTasksByUser(user));
        }
        fetchTasks();
        getUID();
    }, [user]);

    
    return(
        <div className="HomePage">
           <h1>This Week in SAA {user && user.name && <text>for {user.name}:</text>}</h1>
           <div className="Social">
                
                <h2>
                    Social
                </h2>
                   <ul>
                   {(tasks.length !== 0 && tasks.filter(task => task.category == "social").length !== 0) ? tasks
                   .filter(task => task.category == "social")
                   .map(task => (
                    <Task 
                                assigned={task.assigned}
                                category={task.category}
                                completion={task.completion}
                                date={task.date}
                                task={task.task}
                                uid={uid}
                            />
                    )) : <p>Nothing to see here!</p>}
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
                                uid={uid}
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
                                uid={uid}
                            />
                    ))}
                </ul>
           </div>
        </div>
    )
}

export default HomePage;