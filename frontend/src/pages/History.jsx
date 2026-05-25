import { useEffect, useState } from 'react'
import axios from 'axios'

function History() {

  const [history, setHistory] = useState([])

  useEffect(() => {

    fetchHistory()

  }, [])

  const fetchHistory = async () => {

    try {

      const token = localStorage.getItem('token')

      const res = await axios.get(
        'http://localhost:5000/api/history',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setHistory(res.data)

    } catch (error) {

      console.log(error)
    }
  }

  return (

    <div className='p-10'>

      <h1 className='text-3xl font-bold mb-10'>
        Prediction History
      </h1>

      <table className='table-auto border-collapse border border-gray-400 w-full'>

        <thead>

          <tr className='bg-gray-200'>

            <th className='border p-3'>Cancer Type</th>

            <th className='border p-3'>Prediction</th>

            <th className='border p-3'>Risk Score</th>

            <th className='border p-3'>Date</th>

          </tr>

        </thead>

        <tbody>

          {
            history.map((item) => (

              <tr key={item.id}>

                <td className='border p-3'>
                  {item.cancer_type}
                </td>

                <td className='border p-3'>
                  {item.prediction}
                </td>

                <td className='border p-3'>
                  {item.risk_score}
                </td>

                <td className='border p-3'>
                  {
                    new Date(item.created_at)
                      .toLocaleString()
                  }
                </td>

              </tr>
            ))
          }

        </tbody>

      </table>

    </div>
  )
}

export default History