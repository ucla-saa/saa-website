import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import '../styles/LandingPage.css';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'
import { useForm } from "react-hook-form";
import { FormInputText } from "../form-components/FormInputText";
import { FormInputPassword } from '../form-components/FormInputPassword';
import { signInUser, getUserProfile } from '../firebase';
import {getAuth} from 'firebase/auth';
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [signedIn, setSignedIn] = useState<boolean>(false);
  let navigate = useNavigate();
  
  useEffect(() => {
     if (signedIn){
        return navigate("/home");
     }
  }, [signedIn]);

  interface LoginFormInput {
      Email: string,
      Password: string,
  }

  const defaultValues = {
      Email: "",
      Password: "",
  }

  const { handleSubmit, reset, control, setValue } = useForm<LoginFormInput>({
      defaultValues: defaultValues,
  });

  const onSubmit = (data: LoginFormInput) => {
    signInUser(data.Email, data.Password)
    const user = getAuth();
    if (user != null && user.currentUser != null) {
      setSignedIn(true);
      console.log(getUserProfile(user.currentUser.uid))
    }
  }

  return (
    <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100%"}}>
      <div className="Landing">
        <h2> UCLA Student Alumni Association </h2>
          <Stack className="Login">
            <FormInputText
                  name="Email"
                  control={control}
                  label="Email"
              />
              <br/>
            <FormInputPassword
                  name="Password"
                  control={control}
                  label="Password"
              />
          </Stack>
        <Button style={{margin: '2rem'}}variant="contained" onClick={handleSubmit(onSubmit)}>Login</Button>
      </div>
    </div>
  );
}

export default LandingPage;
