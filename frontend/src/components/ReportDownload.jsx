import jsPDF from 'jspdf'

function ReportDownload({ prediction, risk_score }) {

  const downloadPDF = () => {

    const doc = new jsPDF()

    doc.setFontSize(20)

    doc.text('Cancer Prediction Report', 20, 20)

    doc.setFontSize(14)

    doc.text(
      `Prediction: ${prediction}`,
      20,
      50
    )

    doc.text(
      `Risk Score: ${risk_score}`,
      20,
      70
    )

    doc.save('prediction_report.pdf')
  }

  return (
    <button
      onClick={downloadPDF}
      className='bg-green-600 text-white px-4 py-2 rounded mt-5'
    >
      Download Report
    </button>
  )
}

export default ReportDownload