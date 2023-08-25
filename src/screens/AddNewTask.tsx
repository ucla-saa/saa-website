import {Button} from "@mui/material"
import { useForm } from "react-hook-form";
import { FormInputDate } from "../form-components/FormInputDatePicker";
import { FormInputDropdown } from "../form-components/FormInputDropdown";
import { FormInputText } from "../form-components/FormInputText";
import {Option} from  '../form-components/FormInputDropdown';
import {assigneeOptions, committeeOptions, getAssigneeOptions, getCategoryOptions} from '../form-components/ConstantObjects';
import {User} from '../models/User'
import React, { useEffect, useState } from 'react';
import { createNewTask, getCurrentProfile } from "../firebase";
import {useNavigate} from "react-router-dom";

interface TaskFormInput {
    taskDueDate: string,
    category: string,
    assignees: string,
}
const defaultValues = {
}

const AddNewTask = () => {
    let navigate = useNavigate();
    const [user, setUser] = useState<User>()
    useEffect(() => {
        const getUser = async () => {
            const currentProfile = await getCurrentProfile();
            setUser(currentProfile);
        }
        getUser();
    }, []);
    
    const { handleSubmit, reset, control, setValue } = useForm<TaskFormInput>({
        defaultValues: defaultValues,
      });

    async function onSubmit (data: TaskFormInput) {
        await createNewTask(data);
        return navigate('/home');
    }

    const assigneeOptions = user?.committee ? getAssigneeOptions(user.committee) : committeeOptions;

    return(
        <div>
            <h3> What do we need to do?</h3>
            <p> If you need to add a link, write it as: <br/> (link: https://www.hello.com) Fill out this form (/link) </p>
            <FormInputText
                name="task"
                control={control}
                label="Task Description"
            />
            <h3> When is this due by?</h3>
            <FormInputDate
                name="date"
                control={control}
                label="Task Due Date"
            />
            <h3> What kind of task is it? </h3>
            <FormInputDropdown
                name="category"
                control={control}
                label="Category"
                options={getCategoryOptions()}
            />
            <h3> Who is it for? </h3>
            <FormInputDropdown
                name="assigned"
                control={control}
                label="Assigned to"
                options={assigneeOptions}
            />
            <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
                Submit
            </Button>
        </div>
    )
}

export default AddNewTask;