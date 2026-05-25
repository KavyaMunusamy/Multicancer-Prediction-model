import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async () => {

    try {

      await axios.post(
        'http://localhost:5000/api/auth/register',
        formData
      )

      alert('Registration Successful')

      navigate('/')

    } catch (error) {

      alert('Registration Failed')
    }
  }

  return (

    <div className='flex flex-col items-center justify-center h-screen'>

      <h1 className='text-3xl font-bold mb-5'>
        Register
      </h1>

      <input
        type='text'
        name='name'
        placeholder='Name'
        className='border p-2 m-2'
        onChange={handleChange}
      />

      <input
        type='email'
        name='email'
        placeholder='Email'
        className='border p-2 m-2'
        onChange={handleChange}
      />

      <input
        type='password'
        name='password'
        placeholder='Password'
        className='border p-2 m-2'
        onChange={handleChange}
      />

      <button
        className='bg-blue-500 text-white px-4 py-2 rounded'
        onClick={handleSubmit}
      >
        Register
      </button>

    </div>
  )
}

export default Register