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
    
    return(
        <div className="HomePage">
            <div className="buttonSpacer">
            </div>
            <ul>
            <div className="background">
                <div className="assignedTasks">
                    {(tasks.length !== 0 && tasks.filter(task => task.category == category).length !== 0) ? 
                        tasks.filter(task => task)
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
                            )) : <p>Nothing to see here!</p>}
                    </div>
                </div>
            </ul>
        </div>
    )
}

export default HomePage;