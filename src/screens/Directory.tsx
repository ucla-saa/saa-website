
import image from '../photos/directory_photo_neilkardan.jpg';
import Member from '../models/Member';
import { useState, useEffect } from "react";
import { storage } from "../firebase";
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
        taskList: number[]
    }

    let testUser = {
        bod: false,
        committee: 'Internal Relations',
        email: 'neil@gmail.com',
        major: 'Computer Science',
        makeupHours: 0,
        name: 'Neil Kardan',
        position: 'Executive Director',
        taskList: [0]
    }
    let criteria = 'Internal Relations'
    let urls = '../photos/directory_photo_neilkardan.jpg';
    const users = [testUser];

    const [imageUpload, setImageUpload] = useState<File | null>(null);
    const [imageList, setImageList] = useState<string[]>([]);

    const imageListRef = ref(storage, "images/");
    const uploadImage = () =>{
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
        uploadBytes(imageRef, imageUpload).then(()=> {
            alert("Image Uploaded");
        });
    };

    useEffect(() => {
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) =>{
                getDownloadURL(item).then((url)=>{
                    setImageList((prev)=>[...prev,url]);
                })
            })
        });
    }, []);

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
            {imageList.map((url) =>{
                return <img src={url}/>
            })}
            {users
                .filter(x => x.committee == criteria)
                .map(x => (
                    <Member
                        bod={x.bod}
                        committee={x.committee}
                        email={x.email}
                        major={x.major}
                        makeupHours={x.makeupHours}
                        name={x.name}
                        position={x.position}
                        taskList={x.taskList}
                    />
                ))}  
        </div>
    )
}

export default Directory;