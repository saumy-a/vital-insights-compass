
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FileText, Pill } from "lucide-react"
import jsPDF from "jspdf"

interface PDFExportProps {
  patientName?: string
  patientId?: string
}

export function PDFExport({ patientName = "John Doe", patientId = "PT12345" }: PDFExportProps) {
  const generateHealthSummary = () => {
    const doc = new jsPDF()
    
    // Header
    doc.setFontSize(20)
    doc.text("Health Summary Report", 20, 30)
    
    doc.setFontSize(12)
    doc.text(`Patient: ${patientName}`, 20, 45)
    doc.text(`Patient ID: ${patientId}`, 20, 55)
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 65)
    
    // Recent Reports
    doc.setFontSize(16)
    doc.text("Recent Reports", 20, 85)
    doc.setFontSize(10)
    doc.text("• Blood Test Report - January 20, 2024", 25, 100)
    doc.text("• X-Ray Scan - January 10, 2024", 25, 110)
    doc.text("• MRI Report - January 5, 2024", 25, 120)
    
    // Current Medications
    doc.setFontSize(16)
    doc.text("Current Medications", 20, 140)
    doc.setFontSize(10)
    doc.text("• Metformin 500mg - Twice daily", 25, 155)
    doc.text("• Lisinopril 10mg - Once daily", 25, 165)
    
    // Health Insights
    doc.setFontSize(16)
    doc.text("AI Health Insights", 20, 185)
    doc.setFontSize(10)
    doc.text("• Blood sugar levels elevated - Consider dietary changes", 25, 200)
    doc.text("• Blood pressure improving - Continue current medication", 25, 210)
    doc.text("• Hemoglobin slightly low - Increase iron-rich foods", 25, 220)
    
    // Save the PDF
    doc.save(`${patientName}_Health_Summary_${new Date().toISOString().split('T')[0]}.pdf`)
  }

  const generatePrescriptionReport = () => {
    const doc = new jsPDF()
    
    doc.setFontSize(20)
    doc.text("Prescription Report", 20, 30)
    
    doc.setFontSize(12)
    doc.text(`Patient: ${patientName}`, 20, 45)
    doc.text(`Patient ID: ${patientId}`, 20, 55)
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 65)
    
    doc.setFontSize(16)
    doc.text("Active Prescriptions", 20, 85)
    doc.setFontSize(10)
    doc.text("1. Metformin 500mg", 25, 100)
    doc.text("   Prescribed by: Dr. Smith", 30, 110)
    doc.text("   Dosage: Twice daily with meals", 30, 120)
    doc.text("   Duration: 3 months", 30, 130)
    
    doc.text("2. Lisinopril 10mg", 25, 150)
    doc.text("   Prescribed by: Dr. Johnson", 30, 160)
    doc.text("   Dosage: Once daily in morning", 30, 170)
    doc.text("   Duration: Ongoing", 30, 180)
    
    doc.save(`${patientName}_Prescriptions_${new Date().toISOString().split('T')[0]}.pdf`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Export Health Data
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button onClick={generateHealthSummary} className="w-full" variant="outline">
          <FileText className="h-4 w-4 mr-2" />
          Download Health Summary
        </Button>
        <Button onClick={generatePrescriptionReport} className="w-full" variant="outline">
          <Pill className="h-4 w-4 mr-2" />
          Download Prescription Report
        </Button>
      </CardContent>
    </Card>
  )
}
