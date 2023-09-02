import {Button} from "@mui/material"
import { useForm } from "react-hook-form";
import { FormInputDate } from "../form-components/FormInputDatePicker";
import { FormInputDropdown } from "../form-components/FormInputDropdown";
import { FormInputText } from "../form-components/FormInputText";
import {Option} from  '../form-components/FormInputDropdown';
import {assigneeOptions, committeeOptions, getAssigneeOptions, getCategoryOptions} from '../form-components/ConstantObjects';
import {User} from '../models/User'
import React, { useEffect, useState } from 'react';
import { createNewRecap, getCurrentProfile } from "../firebase";
import {useNavigate} from "react-router-dom";

interface RecapFormInput {
    meetingDate: string,
    summary: string,
    form: string,
}
const defaultValues = {
}

const AddNewRecap = () => {
    let navigate = useNavigate();
    const [user, setUser] = useState<User>()
    useEffect(() => {
        const getUser = async () => {
            const currentProfile = await getCurrentProfile();
            setUser(currentProfile);
        }
        getUser();
    }, []);
    
    const { handleSubmit, reset, control, setValue } = useForm<RecapFormInput>({
        defaultValues: defaultValues,
      });

    async function onSubmit (data: RecapFormInput) {
        await createNewRecap(data);
        return navigate('/home');
    }

    return(
        <div>
            <h2>Meeting Recaps</h2>
            <h3>Meeting Date</h3>
            <FormInputDate
                name="date"
                control={control}
                label="Meeting Date"
            />
            <h3>Meeting Summary</h3>
            <FormInputText
                name="summary"
                control={control}
                label="Meeting Summary"
            />
            <h3>Recap Form Link</h3>
            <FormInputText
                name="form"
                control={control}
                label="Recap Form Link"
            />
            <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
                Submit
            </Button>
        </div>
    )
}

export default AddNewRecap;