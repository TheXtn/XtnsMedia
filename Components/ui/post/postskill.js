import React, {createElement, useEffect, useState} from 'react';
import {Comment, Tooltip, Avatar, Spin} from 'antd';
import { Feed, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import 'antd/dist/antd.css';
import {useSession} from "next-auth/client";
import { Modal } from 'antd';
import { Tag, Divider } from 'antd';
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
const Demo = (props) => {
    const sess=props.sess
   const change=props.change

    const peoplelikes=[]
    const [pLike,setpLike]=useState([])
  const post=props.post
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [pload,setpload]=useState(true)
  const [spen,setspen]=useState(false)
  const [likes, setLikes] = useState(Object.keys(post.likes).length);
   const [Liked,setLiked]=useState()
    const handleOk = () => {
    setIsModalVisible(false);
  };
const showModal = () => {

     checkAlllikes()

    setIsModalVisible(true);
     setpload(true)

  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  async function checkforlikes(){

    const res=await fetch('/api/posts/Likes/'+post._id)
    const data=await res.json()
    if (data.data.length!==0){
      setLiked(true)
    }
    else {
      setLiked(false)
    }
     setspen(false)
  }
  async function checkAlllikes(){
    if (sess){
         const res=await fetch('/api/posts/Likes/getLikes/'+post._id)
    const data=await res.json()
    for ( const key in data.data[0].likes){
        peoplelikes.push(key)
    }
    setpLike(peoplelikes)
         setpload(false)

    }

  }
  async function like () {
    if (Liked===false){
        setspen(true)
      const res= await fetch('/api/posts/Likes',{
        method:'POST',
        body:JSON.stringify({
          postid:post._id,
          type:'like'
        }),
        headers:{'Content-Type':'application/json'}
      })
      setLikes(likes+1)

    }
    else{
        setspen(true)
     const res= await fetch('/api/posts/Likes',{
        method:'POST',
        body:JSON.stringify({
          postid:post._id,
          type:'dislike'
        }),
        headers:{'Content-Type':'application/json'}
      })

       setLikes(likes-1)
    }


  };
  useEffect(()=>{
setspen(true)

  checkforlikes()


      }
      ,[likes])



    if (sess){
         return (
             <div >
                 <Modal title="Likes" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                     <Spin spinning={pload}>
                     {isModalVisible? pLike.map(res=>(<ul><li key={res}>{res}</li></ul>)) :''}
                     </Spin>
    </Modal>

      <Feed>



    <Feed.Event>
      <Feed.Label image='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
      <Feed.Content>
        <Feed.Summary>

          <a>{post.author_name } </a>  Posted on his page

          <Feed.Date>{post.date}</Feed.Date>
             <p><Tag color="geekblue">Web Developer</Tag> </p>

        </Feed.Summary>
        <Feed.Extra text>

          {post.desc}
        </Feed.Extra>
        <Feed.Meta>

            <Spin spinning={spen}>
          <Tooltip key="comment-basic-like" title="Like">

      <span onClick={like}>
        {createElement(Liked ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes} </span>
      </span>



    </Tooltip>
          <span onClick={showModal}>See all likes</span>
                 </Spin>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>


  </Feed>

                 <br></br>
      </div>
  );
    }
    else {
         return (
             <div>
             <Feed>



    <Feed.Event>
      <Feed.Label image='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
      <Feed.Content>
        <Feed.Summary>

          <a>{post.author_name } </a>  Posted on his page

          <Feed.Date>{post.date}</Feed.Date>
             <p><Tag color="geekblue">Web Developer</Tag> </p>

        </Feed.Summary>
        <Feed.Extra text>

          {post.desc}
        </Feed.Extra>
        <Feed.Meta>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>


  </Feed>
                 <br></br>


    </div>
  );
    }

};
export default Demo
