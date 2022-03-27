import { Input,Spin } from 'antd';
import classes from './post.module.css'
import React, {useRef, useState} from "react";
import {useSession} from "next-auth/client";
import CustomizedSnackbars from "../alerts";

export default function Postarea(props){
    const [message,setmessage]=useState()
    const [spin,setspin]=useState(false)
    const change=props.change
     const [session,loadsess]=useSession()
    const [alert,setalert]=useState()
    const { TextArea } = Input;
    async function check(){
         setspin(true)
            const res=await fetch('/api/posts/addpost',{
                method:'POST',
                body:JSON.stringify({
                    pst:message
                }),
                headers:{'Content-Type':'application/json'}
            })

        const data=res.json()
        if (res.status===200){
            setalert(true)
            props.onUpdate(!change)
        }
        setspin(false)
         }
    function hsubmit(e){

          e.preventDefault()
            setspin(true)
            check()

    }
    return(
        <div className={classes.header}>
            {session ?     <form onSubmit={hsubmit}>
            <Spin spinning={spin}>
             <TextArea  placeholder="What's New ?" rows={4} value={message} onChange={(e)=>setmessage(e.target.value)} required/>

             <p></p>
            <button>Add post</button>
                 </Spin>

        </form>
:<h1>Login to add a post</h1>}


    <br></br>
            {alert?<CustomizedSnackbars color="success" mess="Post Added" />:''}
        </div>

    )
}