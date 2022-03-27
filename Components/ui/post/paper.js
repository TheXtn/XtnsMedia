import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Demo from "./postskill";
import classes from './post.module.css';
import Container from '@material-ui/core/Container';
import { Card } from 'antd';
import 'antd/dist/antd.css';
import Postarea from "./addpost";


export default function SimplePaper(props) {

    const posts=props.data
    const load=props.load
  return (

    <Container>
        <br></br>

            <Card loading={load} style={{ width: '80%',margin: 'auto'}}>
                <Postarea/>
        {posts.map(post=>(
            <Demo post={post}/>
        ))}

       </Card>



    </Container>



  );
}