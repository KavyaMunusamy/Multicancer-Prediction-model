import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CervicalCancer() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    Age: '',
    Number_of_sexual_partners: '',
    First_sexual_intercourse: '',
    Num_of_pregnancies: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async () => {

    const token = localStorage.getItem('token')
    const res = await axios.post(
      'http://localhost:5000/api/predict/cervical',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    navigate('/result', {
      state: res.data
    })
  }

  return (
    <div className='p-10'>

      <h1 className='text-3xl mb-5'>Cervical Cancer Prediction</h1>

      <input
        type='number'
        name='Age'
        placeholder='Age'
        className='border p-2 block m-2'
        onChange={handleChange}
      />
      <input
        type='number'
        name='Number_of_sexual_partners'
        placeholder='Number of Sexual Partners'
        className='border p-2 block m-2'
        onChange={handleChange}
      />

      <button
        className='bg-purple-500 text-white px-4 py-2 rounded mt-4'
        onClick={handleSubmit}
      >
        Predict
      </button>

    </div>
  )
}

export default CervicalCancer