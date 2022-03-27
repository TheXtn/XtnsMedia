import UserProfile from "../Components/profile/user-profile";
import {getSession,useSession} from "next-auth/client";
import {useRouter} from "next/router";

function ProfilePage(props) {
      // -----Client side verification
  //  const [session,loading]=useSession()
 // const router=useRouter()
    //  if (loading){
     //  return (
       //     <LinearIndeterminate/>
    //    )
   //   }
 // if (session){
   // return <UserProfile />;
 // }
  //else{
   // window.location.href='/auth'
  //}


   const data=props.session

    return (<div>

      <UserProfile name={data.user.name} />
    </div>

        )


}

export default ProfilePage;
export async function getServerSideProps(context){
  const session=await getSession({req:context.req})
  if (!session){
    return {
      redirect:{
        destination:'/auth',
        permanent:false
      }
    }
  }

  return {
    props:{
      session,


    }
  }
}