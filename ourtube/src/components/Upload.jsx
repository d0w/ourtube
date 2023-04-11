import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//import fetch from "node-fetch"

//import theme from '../utils/Theme'

const Container = styled.div`
    width:100%;
    height: 100%;
    position: absolute;
    top:0;
    left: 0;
    background-color: #000000a8;
    align-items: center;
    justify-content: center;
    display: flex;
`;
const Wrapper = styled.div`
    width: 600px;
    height: 600px;
    background-color: ${({theme}) => theme.bgLighter};
    color: ${({theme}) => theme.text};
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
`
const Close = styled.div`
    position: absolute;
    top: 10px;
    flex: 1;
    right: 10px;
    cursor: pointer;
`
const Title = styled.h1`
    text-align: center;
`

const Input = styled.input`
    border: 1px solid ${({ theme }) => theme.soft};
    color:${({ theme }) => theme.text};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
`

const Desc = styled.textarea`
    border: 1px solid ${({ theme }) => theme.soft};
    color:${({ theme }) => theme.text};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
`
const Button = styled.button`
    border-radius: 3px;
    border: none;
    padding: 10px 20px;
    font-weight: 500;
    cursor: pointer;
    background-color: ${({theme}) => theme.soft};
    color: ${({theme}) => theme.textSoft};
`
const Label = styled.label`
   font-size: 14px;
`
const Upload = ({setOpen}) => {

    const [img, setImg] = useState(undefined);
    const [video, setVideo] = useState(undefined);
    const [videoPerc, setVideoPerc] = useState(0);
    const [imgPerc, setImgPerc] = useState(0);
    // const [description, setDescription] = useState("");
    // const [title, setTitle] = useState("");
    const [inputs, setInputs] = useState({});
    const [tags, setTags] = useState([]);

    const navigate = useNavigate();

    const handleTags = (e) => {
        setTags(e.target.value.split(","));
    }

    const handleChange = (e) => {
        setInputs(prev=>{
            return {...prev, [e.target.name]:e.target.value}
        })
    }

    const uploadFile = (file, urlType) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log('Upload is ' + progress + '% done');
                urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                }
            }, 
            (error) => {},
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs((prev)=>{
                        return {...prev, [urlType]: downloadURL};
                    })
                });
              }
            
            );
        }

    const handleUpload = async(e) => {
        e.preventDefault();
        console.log({...inputs, tags})
        const res = await axios.post("/videos", {...inputs, tags});
        setOpen(false);
        res.status===200 && navigate(`/video/${res.data._id}`)
    }
    useEffect(() => {
        video&&uploadFile(video, "videoUrl");
    }, [video]);
    useEffect(() => {
        img&&uploadFile(img, "imgUrl");
    }, [img]);


  return (
    <Container>
        <Wrapper>
            <Close onClick={()=>setOpen(false)}>X</Close>
            <Title>Upload New Video</Title>
            <Label>Video:</Label>
            {videoPerc > 0 ? ("Uploading: " + videoPerc + "%") :
                 (<Input type="file" accept="video/*" onChange={e=>setVideo(e.target.files[0])}/>
            )}
            <Input type="text" placeholder="Title" name="title" onChange={handleChange}></Input>
            <Desc placeholder="Description" name="description" rows={8} onChange={handleChange}></Desc>
            <Input type="text" placeholder='Tags separated by commas.' onChange={handleTags}></Input>
            <Label>Image:</Label>
            {imgPerc > 0 ? ("Uploading: " + imgPerc + "%") :
                (<Input type="file" accept="image/*" onChange={e=>setImg(e.target.files[0])} />)
            }
            <Button onClick={handleUpload}>Upload</Button>
        </Wrapper>
    </Container>
  )
}

export default Upload