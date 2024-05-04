import axios from 'axios'
import React, { Fragment, useState } from 'react'
import { signUpUrl } from '../utils/url'
import Alert from '@mui/material/Alert';


const SignUp = () => {
    const [email,setEmail]=useState("")
    const [passwordMatchError,setPasswordMatchError] = useState(false)
    const emailChangeHandler = (e)=>{
        setEmail(e.target.value)
    }
    const [password,setPassword]=useState("")
    const passwordChangeHandler = (e)=>{
        setPassword(e.target.value)
    }
    const [confirmPassword,setConfirmPassword]=useState("")
    const confirmPasswordChangeHandler = (e)=>{
        setConfirmPassword(e.target.value)
    }
    const onSubmitHandler = async(e)=>{
        e.preventDefault()
            if(password === confirmPassword){
                try{
                const response = await axios.post(signUpUrl,{
                    email:email,
                    password:password,
                    returnSecureToken:true
                })

                console.log("Signed Up successfully" , response.data)
            }
            catch(err){
                console.log(err)
            }}else{
               setPasswordMatchError(true)
               setTimeout(() => {
                setPasswordMatchError(false)
               }, 2000);
            }
            setEmail(""),
            setPassword(""),
            setConfirmPassword("")
    }

   
  return (
    <div className='flex flex-col'>
        {passwordMatchError&&<Alert variant='filled' severity='error' className='mt-2 w-96 m-auto' >Password's Do Not Match !!!</Alert>}
    <div className='h-[380px] pt-8 m-auto mt-40 w-[428px] bg-gray-300 rounded-lg'>
        <h1 className='text-2xl font-bold flex justify-center items-center'>Sign Up</h1>
        <form className='flex flex-col justify-center items-center pt-8' onSubmit={onSubmitHandler}   >
            <input type='email' placeholder='Email'  className='p-2 mt-2 w-96 border border-solid border-black rounded-md' onChange={emailChangeHandler} value={email} required />
            <input type='password' placeholder='password'  className='p-2 mt-2 w-96 border border-solid border-black rounded-md'onChange={passwordChangeHandler} value={password} required/>
            <input type='password' placeholder='confirm password'className='p-2 mt-2 w-96 border border-solid border-black  rounded-md'onChange={confirmPasswordChangeHandler} value={confirmPassword} required />
            <button type='submit' className='flex items-center justify-center  w-40 p-2 mt-4 bg-white border border-solid border-black  rounded-md hover:bg-black hover:text-white'>Sign Up</button>
        </form>
    </div>
    <button  className='p-4 m-auto mt-4  w-[428px] bg-gray-300 border border-solid border-black  rounded-md  hover:bg-black hover:text-white'>Have an Account? Login</button>
    </div>
  )
}

export default SignUp