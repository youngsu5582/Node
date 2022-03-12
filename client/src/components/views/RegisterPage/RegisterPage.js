import React, { useState } from 'react'
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {registerUser} from '../../../_actions/user_action';

function RegisterPage() {
  const initialState = ""
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [Email,setEmail] =useState(initialState)
  const [Password,setPassword] = useState(initialState)
  const [Name,setName] = useState(initialState)
  const [ConfirmPassword,setConfirmPassword] = useState(initialState)

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)}
  const onPasswordHandler = (event) =>{
    setPassword(event.currentTarget.value)  }
  const onNameHandler = (event) =>{
    setName(event.currentTarget.value)}
  const onConfirmPasswordHandler = (event) =>{
    setConfirmPassword(event.currentTarget.value)}

  
  
    const onSubmitHandler = (event)=>{
    event.preventDefault();
    if(Password!==ConfirmPassword)return alert('Password Not Coincide!')
    let json ={
      email : Email,
      password : Password,
      name : Name
    }
    
    dispatch(registerUser(json)).then(response=>{
      if(response.payload.success){
        navigate('/login');
        }
      else{
        alert('Error');
      }
    });
  }

  return (
    <div style={{ 
      display : 'flex',justifyContent : 'center',alignItems : 'center',
      width:'100%',height : '100vh'
    }}>
      <form style ={{display:'flex' , flexDirection:'column'}}
      onSubmit = {onSubmitHandler}
      >
        <label>Name</label>
        <input type = "text" value = {Name} onChange = {onNameHandler}></input>
        <label>Email</label>
        <input type = "email" value = {Email} onChange = {onEmailHandler}></input>
        <label>Password</label>
        <input type = "password"value = {Password} onChange = {onPasswordHandler}></input>
        <label>Confirm Password</label>
        <input type = "password"value = {ConfirmPassword} onChange = {onConfirmPasswordHandler}></input>

        <button type="submit">Register</button>
      </form>
      
    </div>
  ) 

}

export default RegisterPage
