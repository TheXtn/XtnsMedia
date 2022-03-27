import {getSession} from "next-auth/client";
import {ConnectToDb} from "../../../lib/db";
import {hashpassword, verif} from "../../../lib/auth";

export default async function handler2(req,res){
    if (req.method !== 'GET'){
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

    const client=await ConnectToDb()
    const users=client.db().collection('users')
    const user= await users.findOne({email:userEmail})
    if (!user){
        res.status(404).json({
            message:'user not found'
        })
        return
    }

    if (user.name){
        res.status(200).json({
            name:user.name
        })
    }

}