import {getSession} from "next-auth/client";
import {ConnectToDb} from "../../../../lib/db";

var ObjectId = require('mongodb').ObjectID;
export default async function handler269(req,res){
    if (req.method !== 'POST'){
        res.status(301).json({
            message:'Method Not Allowed'
        })
        return
    }
    const postid=req.body.postid
    const type=req.body.type
    const session=await getSession({req:req})
    if (!session){
        res.status(401).json({
            message:'Not Authentificated !'
        })
        return
    }
    const client=await ConnectToDb()
    const posts=client.db().collection('posts')
    const table='likes.'+session.user.name
    if (type==='like'){
        const update=await posts.updateOne(  { _id:new ObjectId(postid)} , {
        $set: {
            [table]:session.user.email
        }

    })
    }
    if (type==='dislike'){
        const update=await posts.updateOne(  { _id:new ObjectId(postid)} , {
        $unset: {
            [table]:''
        }

    })
    }

    res.status(200).json({
        message:'Updated'
    })
}