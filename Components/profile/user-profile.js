import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
import {useSession,getSession} from "next-auth/client";
import {useState,useEffect} from 'react';
import {useRouter} from "next/router";
import LinearIndeterminate from "../ui/loading";
import NameChange from "./changename";
import {Card} from "antd";

function UserProfile(props) {
    const name=props.name

        return (
    <section className={classes.profile}>
        <Card style={{ width: '80%',margin: 'auto'}} type="inner" title={'User Profile'}>
      <h1>Welcome {name}</h1>

        <ProfileForm />
      <NameChange/>

    </Card>

    </section>
  );



}

export default UserProfile;



