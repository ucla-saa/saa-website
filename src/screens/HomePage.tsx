import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import '../styles/HomePage.css';
import firebase, { getCurrentProfile, getTasks, getTasksByUser, getUserProfile, getUserUID, isUserSignedIn } from '../firebase.js';
import Task from '../models/Task';
import AssignedTask from '../models/AssignedTask';
import {useNavigate} from 'react-router-dom'
import {User} from '../models/User'
import {TaskCategory} from '../form-components/ConstantObjects';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const HomePage = () => {
    const [tasks, setTasks] = useState<Array<any>>([]);
    const [signedIn, setSignedIn] = useState<boolean>(true);
    const [user, setUser] = useState<User>()
    const [uid, setUID] = useState<any>("");
    const [category, setCategory] = useState<TaskCategory>(TaskCategory.SOCIAL)
    const [showCompleted, setShowCompleted] = useState<boolean>(true)
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

            console.log(tasks);
        }
        fetchTasks();
        getUID();
    }, [user]);
    
    return (
        <div className="HomePage">
           
                <h2> Hello! Welcome back {user?.name}</h2>
                <div className="background">
                    <div className="assignedTasks">
                        <div className="gridTaskItem">
                            <ul>
                            {((tasks.length !== 0 && tasks.filter(task => task.category === TaskCategory.SOCIAL).length !== 0) ? 
                                tasks.filter(task => task.category === TaskCategory.SOCIAL)
                                .map(task => (
                                    <AssignedTask 
                                                approved={task.approved}
                                                assigned={task.assigned}
                                                category={task.category}
                                                completion={task.completion}
                                                createdBy={task.createdBy}
                                                date={task.date}
                                                taskKey={task.key}
                                                task={task.task}
                                                username={user?.name!}
                                            />
                                    )) : <div> No Social tasks to see! </div>)
                                    }
                            </ul>
                        </div>
                        <div className="gridTaskItem">
                            <ul>
                            {((tasks.length !== 0 && tasks.filter(task => task.category === TaskCategory.COMMITTEE).length !== 0) ? 
                                tasks.filter(task => task.category === TaskCategory.COMMITTEE)
                                .map(task => (
                                    <AssignedTask 
                                                approved={task.approved}
                                                assigned={task.assigned}
                                                category={task.category}
                                                completion={task.completion}
                                                createdBy={task.createdBy}
                                                date={task.date}
                                                taskKey={task.key}
                                                task={task.task}
                                                username={user?.name!}
                                            />
                                    )) : <div> No committee tasks remaining! </div>)
                                }
                                </ul>
                        </div>
                        <div className="gridTaskItem">
                        <ul>
                            {((tasks.length !== 0 && tasks.filter(task => task.category === TaskCategory.ALL_SAA).length !== 0) ? 
                                tasks.filter(task => task.category === TaskCategory.ALL_SAA)
                                .map(task => (
                                    <AssignedTask 
                                                approved={task.approved}
                                                assigned={task.assigned}
                                                category={task.category}
                                                completion={task.completion}
                                                createdBy={task.createdBy}
                                                date={task.date}
                                                taskKey={task.key}
                                                task={task.task}
                                                username={user?.name!}
                                            />
                                    )): <div> No All SAA tasks! </div>)
                                }
                        </ul>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default HomePage;