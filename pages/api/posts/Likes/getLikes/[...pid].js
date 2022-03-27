import {getSession} from "next-auth/client";
import {ConnectToDb} from "../../../../../lib/db";
var ObjectId = require('mongodb').ObjectID;
export default async function handler255(req, res) {
  const pid  = req.query.pid[0]
    const session=await getSession({req:req})
    if (!session){
        res.status(401).json({
            data:[]
        })
        return
    }
    const client=await ConnectToDb()
    const posts=client.db().collection('posts')
    const table="likes."+session.user.name
   if (req.method !== 'GET'){
       res.status(401).json({
           message:'method is not allowed'
       })


    }
   const find=await posts.find({
            _id:new ObjectId(pid),
        },{likes:1}).toArray()
          if (find){
       res.status(200).json({
        data:find
    })
   }
   else {
       res.status(400).json({
        message:'Not found'
    })
   }



}