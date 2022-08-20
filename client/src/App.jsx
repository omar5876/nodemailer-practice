import { useState } from 'react'
import axios from 'axios'

function App() {
  const [input, setInput] = useState({username:'', email:'', password:''})

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/register', input)
    .then(res => console.log(res))
    .catch(error => console.log(error))
  }

  return (
    <div style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>

   <form style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
    <label htmlFor="username">Username</label>
    <input type="text" name='username' onChange={handleChange} value={input.username}/>
    <label htmlFor="email">Email</label>
    <input type="email" name='email' onChange={handleChange} value={input.email}/>
    <label htmlFor="password">Password</label>
    <input type="password" name='password' onChange={handleChange} value={input.password} autoComplete='false'/>
    <input type={'submit'} onClick={handleSubmit}/>
   </form>
    </div>
  )
}

export default App
