import {getSession} from "next-auth/client";
import {ConnectToDb} from "../../../lib/db";
import {hashpassword, verif} from "../../../lib/auth";

export default async function handler2(req,res){
    const post=req.body.pst
    if (req.method !== 'POST'){
        res.status(301).json({
            message:'Method Not Allowed'
        })
        return
    }
    const session=await getSession({req:req})
    if (!session){
        res.status(401).json({
            message:'Not Authentificated !'
        })
        return
    }

    const client=await ConnectToDb()
    const posts=client.db().collection('posts')
    const resss=posts.insertOne({
        desc: post,
        likes: {

        },
        author_name: session.user.name,
        author_email: session.user.email,
        date:Date().toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  })
    })
    if (resss){
        res.status(200).json({
            message:'Post Added!'
        })
    }
    if (!resss){
        res.status(400).json({
            message:'Error !'
        })
    }

}
