import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export async function exportToPDF(elementId, filename = 'AIGC复盘报告.pdf') {
  const element = document.getElementById(elementId)
  if (!element) {
    alert('未找到导出内容')
    return
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#1a1a2e'
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const imgWidth = 190
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight)
    pdf.save(filename)
  } catch (error) {
    console.error('导出失败:', error)
    alert('导出失败，请重试')
  }
}