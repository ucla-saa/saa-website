import {Button} from "@mui/material"
import { useForm } from "react-hook-form";
import { FormInputDate } from "../form-components/FormInputDatePicker";
import { FormInputDropdown } from "../form-components/FormInputDropdown";
import { FormInputText } from "../form-components/FormInputText";
import {Option} from  '../form-components/FormInputDropdown';
import {committeeOptions} from '../form-components/ConstantObjects';
import { FormInputPassword } from "../form-components/FormInputPassword";
import { createNewUser } from '../firebase';

interface CreateUserInput {
    name: string,
    email: string,
    password: string,
    phone: string,
    major: string,
    makeupHours: number,
    position: string,
    committee: string,
    bod: boolean,
}
const defaultValues = {
    name: "",
    email: "",
    password: "",
    phone: "",
    major: "",
    makeupHours: 0,
    position: "",
    committee: "",
    bod: false,

}

const CreateUser = () => {
    const { handleSubmit, reset, control, setValue } = useForm<CreateUserInput>({
        defaultValues: defaultValues,
      });

    const onSubmit = (data: CreateUserInput) => {
        console.log(data)
        createNewUser(data);
    }

    return(
        <div>
            <h3> Name</h3>
            <FormInputText
                name="name"
                control={control}
                label="Your Name (Firstname Lastnames)"
            />
            <h3> Email </h3>
            <FormInputText
                name="email"
                control={control}
                label="Email"
            />
            <h3> Password </h3>
            <FormInputPassword
                name="password"
                control={control}
                label="Password"
            />
            <h3> Phone Number </h3>
            <FormInputText
                name="phone"
                control={control}
                label="Phone Number"
            />
            <h3> Major </h3>
            <FormInputText
                name="major"
                control={control}
                label="Major"
            />
            <h3> Committee </h3>
            <FormInputDropdown
                name="committee"
                control={control}
                label="Committee"
                options={committeeOptions}
            />
            <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
                Submit
            </Button>
        </div>
    )
}

export default CreateUser;