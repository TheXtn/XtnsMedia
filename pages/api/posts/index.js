import {ConnectToDb} from "../../../lib/db";
export default async function handler23(req,res){
     const client=await ConnectToDb()

    const posts= await client.db().collection('posts').find({}).limit(5).sort({_id:-1}).toArray()
    if (posts){
        res.status(200).json({
        data:posts
    })
    }
    else {
        res.status(400).json({
        data: [{
            message:'error'
        }]
    })
    }




}