import React, { useState } from 'react';
import {createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from './firebase';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Signup(props) {
    
    const navigate = useNavigate();
    const [text, setText] = useState({email:"", password:""});
    const handleOnChange = (e)=>{
        setText({...text, [e.target.name]:e.target.value});
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        const {email, password} = text;
        createUserWithEmailAndPassword(
            auth, 
            email, 
            password
        ).then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem('token', user.accessToken)
            localStorage.setItem('uid', user.uid)
            navigate('/');
        }).catch((error) => {
            toast.success("something went to be wrong")
        });
        setText({email:"", password:""})
    }
   
  return (
    <div className='container my-5'>  
        <h1>Create a new account for getting more benefits of this web app</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" value={text.email} name="email" onChange={handleOnChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" value={text.password} name="password" onChange={handleOnChange} className="form-control" id="exampleInputPassword1" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form> 
    </div>
  )
}