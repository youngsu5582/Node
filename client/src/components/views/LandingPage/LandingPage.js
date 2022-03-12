import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
  // useEffect(()=>{
    //   axios.get('/api/hello')
    // },[])
    
  const navigate = useNavigate()
  
  const onClickHandler = (event) =>{
    axios.get('/api/users/logout')
      .then(response=>{
        if(response.data.success)
          navigate('/login')
        else
          alert("Logout Failed!")
      })
  }

  return (
    <div>
      Lading Page
      <button onClick = {onClickHandler}>Logout</button>
    </div>
  )
}

export default LandingPage
