import { useNavigate } from 'react-router-dom'

function Navbar() {

  const navigate = useNavigate()

  const logout = () => {

    localStorage.removeItem('token')

    navigate('/')
  }

  return (
    <nav className='bg-blue-600 text-white p-4 flex justify-between'>

      <h1 className='text-2xl font-bold'>
        Multi Cancer Prediction
      </h1>

      <button
        onClick={logout}
        className='bg-red-500 px-4 py-2 rounded'
      >
        Logout
      </button>

    </nav>
  )
}

export default Navbar