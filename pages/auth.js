import AuthForm from "../Components/auth/auth-form";
import {getSession, useSession} from "next-auth/client";

function AuthPage(props ) {
   // -----Client side verification
  //  const [session,loading]=useSession()
 // const router=useRouter()
    //  if (loading){
     //  return (
       //     <LinearIndeterminate/>
    //    )
   //   }
 // if (!session){
   // return <AuthForm />;
 // }
  //else{
   // window.location.href='/profile'
  //}
  return <AuthForm />;
}

export default AuthPage;

export async function getServerSideProps(context){
  const session=await getSession({req:context.req})
  if (session){
    return {
      redirect:{
        destination:'/profile',
        permanent:false
      }
    }
  }
  return {
    props:{
      session
    }
  }
}