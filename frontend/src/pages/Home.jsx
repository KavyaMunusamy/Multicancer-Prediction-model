import { useNavigate } from 'react-router-dom'

function Home() {

  const navigate = useNavigate()

  return (
    <div className='p-10'>

      <h1 className='text-4xl font-bold mb-10'>
        Multi Cancer Prediction System
      </h1>

      <div className='flex gap-10'>

        <div
          className='border p-10 cursor-pointer rounded shadow'
          onClick={() => navigate('/breast-cancer')}
        >
          Breast Cancer Prediction
        </div>

        <div
          className='border p-10 cursor-pointer rounded shadow'
          onClick={() => navigate('/cervical-cancer')}
        >
          Cervical Cancer Prediction
        </div>

      </div>

    </div>
  )
}

export default Home