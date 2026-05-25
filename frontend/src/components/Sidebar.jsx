import { Link } from 'react-router-dom'

function Sidebar() {

  return (

    <div className='w-64 h-screen bg-gray-800 text-white p-5'>

      <h1 className='text-2xl font-bold mb-10'>
        Dashboard
      </h1>

      <ul>

        <li className='mb-5'>
          <Link to='/home'>
            Home
          </Link>
        </li>

        <li className='mb-5'>
          <Link to='/breast-cancer'>
            Breast Cancer
          </Link>
        </li>

        <li className='mb-5'>
          <Link to='/cervical-cancer'>
            Cervical Cancer
          </Link>
        </li>

        <li className='mb-5'>
          <Link to='/history'>
            Prediction History
          </Link>
        </li>

      </ul>

    </div>
  )
}

export default Sidebar