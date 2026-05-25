import { useLocation } from 'react-router-dom'
import jsPDF from 'jspdf'

function Result() {

  const location = useLocation()

  const data = location.state

  const downloadPDF = () => {

    const doc = new jsPDF()

    doc.text('Cancer Prediction Report', 20, 20)

    doc.text(`Prediction: ${data.prediction}`, 20, 40)

    doc.text(`Risk Score: ${data.risk_score}`, 20, 60)

    doc.save('report.pdf')
  }

  return (
    <div className='p-10'>

      <h1 className='text-3xl'>Prediction Result</h1>

      <h2 className='mt-5'>
        Prediction: {data.prediction}
      </h2>
      <h2>
        Risk Score: {data.risk_score}
      </h2>

      <button
        className='bg-red-500 text-white px-4 py-2 rounded mt-5'
        onClick={downloadPDF}
      >
        Download Report
      </button>

    </div>
  )
}

export default Result