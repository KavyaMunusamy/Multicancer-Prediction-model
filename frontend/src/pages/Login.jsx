import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleLogin = async () => {

    try {

      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          email,
          password
        }
      )

      localStorage.setItem('token', res.data.token)

      navigate('/home')

    } catch (err) {
      alert('Invalid Credentials')
    }
  }
 return (
    <div className='flex flex-col items-center justify-center h-screen'>

      <h1 className='text-3xl font-bold mb-4'>Login</h1>

      <input
        type='email'
        placeholder='Email'
        className='border p-2 m-2'
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type='password'
        placeholder='Password'
        className='border p-2 m-2'
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className='bg-blue-500 text-white px-4 py-2 rounded'
        onClick={handleLogin}
      >
        Login
      </button>

    </div>
  )
}

export default Login