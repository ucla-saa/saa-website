
import image from '../photos/directory_photo_neilkardan.jpg';
import Member from '../models/Member';
import React, { useState, useEffect } from "react";
import { getAllUsers, storage } from "../firebase";
import {ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import {v4 } from "uuid";
import '../styles/Directory.css';
import { TextField, Grid, ButtonGroup, Button, Select, MenuItem } from '@mui/material'; 
import SearchIcon from '@mui/icons-material/Search';

const Directory = () => {
    interface testUser {
        bod: boolean,
        committee: string,
        email: string,
        major: string,
        makeupHours: number,
        name: string,
        position: string,
        taskList: number[],
        profilePicture: string,
    }
    let criteriaSelected = false;
    let testUser = {
        bod: false,
        committee: 'Internal Relations',
        email: 'neil@gmail.com',
        major: 'Computer Science',
        makeupHours: 0,
        name: 'Neil Kardan',
        position: 'Executive Director',
        taskList: [0],
        profilePicture: 'https://firebasestorage.googleapis.com/v0/b/ucla-saa-website.appspot.com/o/images%2FIMG_0128.jpg831f780c-d9f7-40eb-a83c-da8d8e5a752f?alt=media&token=4faa36ec-928f-44cd-84eb-0048741b3a47'
    }
    let criteria = criteriaSelected ? 'Media Marketing' : null
    //const users = [testUser];

    const [imageUpload, setImageUpload] = useState<File | null>(null);
    const [imageList, setImageList] = useState<string[]>([]);
    const [users, setUserList] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCommittee, setSelectedCommittee] = useState("All");

    const imageListRef = ref(storage, "images/");
    
    useEffect(() => {
        const allUsers = async () => {
            const userList = await getAllUsers();
            setUserList(userList);
        }
        allUsers();
    })

    useEffect(() => {
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) =>{
                getDownloadURL(item).then((url)=>{
                    setImageList((prev)=>[...prev,url]);
                })
            })
        });
    }, []);

    const getUsersImage = (user: any) => {
        let userImg = imageList.filter(x => x.includes(toUnderlined(user.name!)))
        if (userImg) {
            return userImg[0];
        }
    }

    const toUnderlined = (username: String) => {
        return username.split(' ').join('_') + "_profilePicture"
    }

    return (
        <div className="Directory">
            <div className="filters">
            <Grid container spacing={1} alignItems="center" justifyContent="center">
                <Grid item>
                    <SearchIcon/>
                </Grid>
                <Grid item>
                    <TextField
                        label="Search"
                        variant="outlined"
                        size="small"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <span className="hiddenIcon"><SearchIcon/></span>
                </Grid>
            </Grid>
            <br/>
            <Grid container spacing={1} alignItems="center" justifyContent="center">
                    <Grid item>
                        <Select
                            className="selectCommittee"
                            value={selectedCommittee}
                            onChange={(e) => setSelectedCommittee(e.target.value)}
                        >
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value="Alumni Relations">Alumni Relations</MenuItem>
                            <MenuItem value="Bruin Spirit">Bruin Spirit</MenuItem>
                            <MenuItem value="Bruin Community">Bruin Community</MenuItem>
                            <MenuItem value="External Relations">External Relations</MenuItem>
                            <MenuItem value="Internal Relations">Internal Relations</MenuItem>
                            <MenuItem value="Media Marketing">Media Marketing</MenuItem>
                            <MenuItem value="Professional Development">Professional Development</MenuItem>
                            <MenuItem value="Spring Sing">Spring Sing</MenuItem>
                        </Select>
                    </Grid>
            </Grid>
            
            </div>
            <div className="photos">
           {users
                .filter((user) => {
                    return selectedCommittee === "All"
                        ? true
                        : user.committee === selectedCommittee;
                })
                .filter((user) => {
                    if (searchQuery === "") {
                        return true;
                    } else {
                        return user.name.toLowerCase().includes(searchQuery.toLowerCase());
                    }
                })
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((x) => (
                        <div className="profile-picture">
                            <Member
                                image={getUsersImage(x)}
                                bod={x.bod}
                                committee={x.committee}
                                email={x.email}
                                major={x.major}
                                makeupHours={x.makeupHours}
                                name={x.name}
                                position={x.position}
                                taskList={x.taskList}
                                profilePicture={x.profilePicture}
                            />
                        </div>
                    ))}  
            </div>
        </div>
    )
}

export default Directory;