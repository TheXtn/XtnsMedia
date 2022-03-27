import React, {useEffect, useState} from "react";
import classes from './post.module.css'

import {Card, Spin,Input} from "antd";
import Postarea from "./addpost";
import Demo from "./postskill";
import Container from "@material-ui/core/Container";
import {useSession} from "next-auth/client";
import CustomizedSnackbars from "../alerts";


export default function Showposts(){
    const [posts,setposts]=useState([])
    const [loading,setloading]=useState()
    const [change,setchange]=useState(false)
    const [session,load]=useSession()
    async function getall(){
        setloading(true)
        const res=await fetch("/api/posts")
        const data=await res.json()
        setposts(data.data)
        setloading(false)
    }
    function hchange(newValue){
        setchange(newValue)
    }

    function showal(){
        console.log('Asbaa')
    }

    useEffect(()=>{

           getall()



    },[change])
    return(
        <div>


                    <Container>
        <br></br>

            <Card loading={loading || load} style={{ width: '80%',margin: 'auto'}}>
                <Postarea change={change} onUpdate={hchange}/>

        {posts.map(post=>(
            <Demo post={post} onUpdate={hchange} sess={session}/>
        ))}

       </Card>



    </Container>



        </div>
    )
}