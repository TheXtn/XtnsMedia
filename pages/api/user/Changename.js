import {getSession} from "next-auth/client";
import {ConnectToDb} from "../../../lib/db";
import {hashpassword, verif} from "../../../lib/auth";

export default async function handler(req,res){
    try{
        if (req.method !== 'PATCH'){
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
    const userEmail= await session.user.email

    const newName=req.body.newName
    if (!newName|| newName===session.user.name){
        res.status(400).json({
            message:'New name musnt be the old one'
        })
            return
    }
    const client=await ConnectToDb()
    const users=client.db().collection('users')
    const user= await users.findOne({email:userEmail})
    if (!user){
        res.status(404).json({
            message:'user not found'
        })
        return
    }



    const result= await users.updateOne({
        email:userEmail
    },{
        $set:{name:newName}
    })
    if (result){
        session.user.name=newName
        res.status(200).json({
            message:'Name changed !'
        })
    }
    }
    catch(error) {
        console.log(error)
    }


}