import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import '../styles/HomePage.css';
import firebase, { getCurrentProfile, getRecaps, getTasksByUser, getUserProfile, getUserUID, isUserSignedIn } from '../firebase.js';
import Recap from '../models/Recap';
import {useNavigate} from 'react-router-dom'

const MeetingRecaps = () => {
    const [signedIn, setSignedIn] = useState<boolean>(true);
    const [recap, setRecaps] = useState<Array<any>>([]);

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
        const fetchRecaps = async () => {
            setRecaps(await getRecaps());

            console.log(recap);
        }
        fetchRecaps();
    }, []);

    
    return(
        <div className="MeetingRecaps">
           <h1>General Meeting Recaps</h1>
           <ul>
               {(recap.length !== 0) ? recap
               .map(recap => (
                    <Recap 
                                date={recap.date}
                                summary={recap.summary}
                                form={recap.form}
                            />
                    )) : <p>Nothing to see here!</p>}
           </ul>
        </div>
    )
}

export default MeetingRecaps;