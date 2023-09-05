
import image from '../photos/directory_photo_neilkardan.jpg';
import Member from '../models/Member';
import { useState, useEffect } from "react";
import { getAllUsers, storage } from "../firebase";
import {ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import {v4 } from "uuid";

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
    let criteria = 'Media Marketing'
    //const users = [testUser];

    const [imageUpload, setImageUpload] = useState<File | null>(null);
    const [imageList, setImageList] = useState<string[]>([]);
    const [users, setUserList] = useState<any[]>([]);

    const imageListRef = ref(storage, "images/");
    const uploadImage = () =>{
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
        uploadBytes(imageRef, imageUpload).then(()=> {
            alert("Image Uploaded");
        });
    };
    useEffect(() => {
        const allUsers = async () => {
            const userList = await getAllUsers();
            setUserList(userList);
        }
        allUsers();
    })

    useEffect(() => {
        listAll(imageListRef).then((response) => {
            console.log(response);
            console.log(response.items);
            response.items.forEach((item) =>{
                getDownloadURL(item).then((url)=>{
                    setImageList((prev)=>[...prev,url]);
                })
            })
        });
        console.log('urls: ', imageList)
    }, []);

    const getUsersImage = (profilePicture: string) => {
        console.log(imageList)
        console.log(profilePicture)
        let userImg = imageList.filter(x => x == profilePicture)
        if (userImg) {
            console.log(userImg);
            return userImg[0];
        }

    }
    return (
        <div className="Directory">
            <input 
                type="file" 
                onChange={(event) => {
                    if (!event.target.files) return;
                    setImageUpload(event.target.files[0]);
                }}
            />
            <button onClick={uploadImage}>Upload Image</button>
          
            {users
                .filter(x => x.committee == criteria)
                .map(x => (
                    <div>
                        <h2>image below</h2>
                    <img style={{maxWidth: "250px", textAlign: 'center'}}src={getUsersImage(x.profilePicture)}></img>
                    <Member
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
    )
}

export default Directory;