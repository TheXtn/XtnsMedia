import { useState,useRef } from 'react';
import classes from './auth-form.module.css';
import {signIn} from 'next-auth/client'
import {useRouter} from "next/router";
import CustomizedSnackbars from "../ui/alerts";
import LinearIndeterminate from "../ui/loading";

async function createuser(email,password,name){
  const res=await fetch('/api/auth/signup',{
    method:'POST',
    body:JSON.stringify({email,password,name}),
    headers:{
      'Content-Type':'application/json'
    }
  })

  const data=await res.json()
  return data
}
function AuthForm() {
    const [loading,setloading]=useState(false)
    const [message,setmessage]=useState('')
    const [openn,setopen]=useState(false)
    const [color,setcolor]=useState('')
    const router=useRouter()
  const emailref=useRef()
  const passref=useRef()
    const [name,setname]=useState('')

  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

 async function submith(event){
      setloading(true)
    event.preventDefault()
    const email=emailref.current.value
    const pass=passref.current.value
    if (isLogin){
    const res=await signIn('credentials',{
        redirect:false,
        email:email,
        password:pass
    })
    if (!res.error){
        router.replace('/')
    }
    else {

        setloading(false)
        setcolor('error')
    setmessage(res.error)
 setopen(true)
 setopen(false)
    }
    }else {
     const res=await createuser(email,pass,name)
        if (res.message==='User Exist'){

            setloading(false)
            setcolor('error')
    setmessage(res.message)
    setopen(true)
            setopen(false)
        }
    else {

        setloading(false)
          setcolor('success')
    setmessage(res.message)
 setopen(true)
 setopen(false)
            router.replace('/profile')
        }



    }

  }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submith}>
          {isLogin===false ? <div className={classes.control}>
          <label htmlFor='name'>Name</label>
          <input type='text' id='name' required value={name} onChange={e => setname(e.target.value)} />
        </div>:""}
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailref} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passref} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
            <p></p>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Register' : 'Login with existing account'}
          </button>
        </div>

      </form>
        <p></p>

            {loading ? <LinearIndeterminate/> :""}


        {openn ? <CustomizedSnackbars color={color} mess={message}/>:'' }

    </section>
  );
}

export default AuthForm;
