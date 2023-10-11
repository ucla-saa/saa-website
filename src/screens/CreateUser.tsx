import {Button} from "@mui/material"
import { useForm } from "react-hook-form";
import { FormInputDate } from "../form-components/FormInputDatePicker";
import { FormInputDropdown } from "../form-components/FormInputDropdown";
import { FormInputText } from "../form-components/FormInputText";
import {Option} from  '../form-components/FormInputDropdown';
import {committeeOptions, getCommitteePositions} from '../form-components/ConstantObjects';
import { FormInputPassword } from "../form-components/FormInputPassword";
import { createNewUser } from '../firebase';
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import {ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import {v4 } from "uuid";
import { storage } from "../firebase";
import '../styles/CreateUser.css';

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
    profilePicture: string,
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
    let navigate = useNavigate();
    let profilePictureUrl = 'https://firebasestorage.googleapis.com/v0/b/ucla-saa-website.appspot.com/o/images%2F'
    let hashedV4: string;
    const [imageUpload, setImageUpload] = useState<File | null>(null);
    const [imageList, setImageList] = useState<string[]>([]);

    const imageListRef = ref(storage, "images/");

    async function uploadImage (username: String) {
        if (imageUpload == null) return;
        hashedV4 = v4()
        let underLined = usernameToUnderline(username) + "_profilePicture"
        const imageRef = ref(storage, `images/${underLined + hashedV4}`)
        uploadBytes(imageRef, imageUpload).then(()=> {
            console.log("Image successfully uploaded: ", underLined);
            alert("Image successfully uploaded")
        })
        .catch(() => {
            alert("Error! Failure to upload image. Please refresh and try again.");
        });
    };

    const usernameToUnderline = (username: String) => { 
        let updated = username.split(' ').join('_')
        return updated
    }

    const { handleSubmit, reset, control, setValue, watch, getValues } = useForm<CreateUserInput>({
        defaultValues: defaultValues
      });

    const watchCommittee = watch("committee", "");

    async function onSubmit (data: CreateUserInput) {
        await createNewUser(data);
        await uploadImage(data.name) 
    }

    return(
        <div className="form">
            <div className="NameEmail">
                <div className="Name">
                    <h3> Name</h3>
                    <FormInputText
                        name="name"
                        control={control}
                        label="Your Name (Firstname Lastnames)"
                    />
                </div>
                <div className="Email">
                    <h3> Email </h3>
                    <FormInputText
                        name="email"
                        control={control}
                        label="Email"
                    />
                </div>
            </div>
            <div className="Password">
                <h3> Password </h3>
                <FormInputPassword
                    name="password"
                    control={control}
                    label="Password"
                />
            </div>
            <div className="PhoneMajor">
                <div className="Phone">
                    <h3> Phone Number </h3>
                    <FormInputText
                        name="phone"
                        control={control}
                        label="(XXX-XXX-XXXX)"
                    />
                </div>
                <div className="Major">
                    <h3> Major </h3>
                    <FormInputText
                        name="major"
                        control={control}
                        label="Major"
                    />
                </div>
            </div>
            <div className="CommitteePosition">
                <div className="Committee">
                    <h3> Committee </h3>
                    <FormInputDropdown
                        name="committee"
                        control={control}
                        label="Committee"
                        options={committeeOptions}
                    />
                </div>
                {watchCommittee && 
                <div className="Position">
                    <h3> Position </h3>
                    <FormInputDropdown 
                        name="position"
                        control={control}
                        label="Position"
                        options={getCommitteePositions(getValues("committee"))}
                    />
                </div>}
            </div>
            <div className="UploadSubmit">
                <div className="UploadImage">
                    <h3> Upload Profile Picture (250x250px)</h3>
                    <input 
                        type="file" 
                        onChange={(event) => {
                            if (!event.target.files) return;
                            setImageUpload(event.target.files[0]);
                        }}
                    />
                </div>
                <div className="Submit">
                    {imageUpload != null && <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
                        Submit
                    </Button>}
                </div>
            </div>
        </div>
    )
}

export default CreateUser;