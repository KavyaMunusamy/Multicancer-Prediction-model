import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function BreastCancer() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    radius_mean: '',
    texture_mean: '',
    perimeter_mean: '',
    area_mean: ''
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
      'http://localhost:5000/api/predict/breast',
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

      <h1 className='text-3xl mb-5'>Breast Cancer Prediction</h1>

      <input
        type='number'
        name='radius_mean'
        placeholder='Radius Mean'
        className='border p-2 block m-2'
        onChange={handleChange}
      />
         <input
        type='number'
        name='texture_mean'
        placeholder='Texture Mean'
        className='border p-2 block m-2'
        onChange={handleChange}
      />

      <input
        type='number'
        name='perimeter_mean'
        placeholder='Perimeter Mean'
        className='border p-2 block m-2'
        onChange={handleChange}
      />

      <input
        type='number'
        name='area_mean'
        placeholder='Area Mean'
        className='border p-2 block m-2'
        onChange={handleChange}
      />

      <button
        className='bg-green-500 text-white px-4 py-2 rounded mt-4'
        onClick={handleSubmit}
      >
        Predict
      </button>
    </div>
  )
}

export default BreastCancer