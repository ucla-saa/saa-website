import {Button} from "@mui/material"
import { useForm } from "react-hook-form";
import { FormInputDate } from "../form-components/FormInputDatePicker";
import { FormInputDropdown } from "../form-components/FormInputDropdown";
import { FormInputText } from "../form-components/FormInputText";
import {Option} from  '../form-components/FormInputDropdown';
import {assigneeOptions} from '../form-components/ConstantObjects';

interface TaskFormInput {
    textValue: string,
    taskDueDate: string,
    assignees: string,
}
const defaultValues = {
    textValue: "",
}

const AddNewTask = () => {
    const { handleSubmit, reset, control, setValue } = useForm<TaskFormInput>({
        defaultValues: defaultValues,
      });

    const onSubmit = (data: TaskFormInput) => console.log(data);

    return(
        <div>
            <h3> What do we need to do?</h3>
            <p> If you need to add a link, write it as: <br/> (link: https://www.hello.com) Fill out this form (/link) </p>
            <FormInputText
                name="Task Description"
                control={control}
                label="Task Description"
            />
            <h3> When is this due by?</h3>
            <FormInputDate
                name="Task Due Date"
                control={control}
                label="Task Due Date"
            />
            <h3> Who is it for? </h3>
            <FormInputDropdown
                name="Assigned to"
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