
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { QrCode, Timer, RefreshCw } from "lucide-react"
import QRCode from "qrcode"

interface QRCodeAccessProps {
  patientId?: string
}

export function QRCodeAccess({ patientId = "PT12345" }: QRCodeAccessProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [isActive, setIsActive] = useState<boolean>(false)

  const generateQRCode = async () => {
    const accessToken = `${patientId}-${Date.now()}`
    const accessUrl = `https://healthcare-dashboard.com/access/${accessToken}`
    
    try {
      const qrUrl = await QRCode.toDataURL(accessUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: '#1f2937',
          light: '#ffffff'
        }
      })
      setQrCodeUrl(qrUrl)
      setTimeLeft(300) // 5 minutes
      setIsActive(true)
    } catch (error) {
      console.error('Error generating QR code:', error)
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            setIsActive(false)
            setQrCodeUrl("")
            return 0
          }
          return time - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          Share Access via QR Code
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        {qrCodeUrl && isActive ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <img src={qrCodeUrl} alt="Access QR Code" className="border rounded-lg" />
            </div>
            <div className="flex items-center justify-center gap-2">
              <Timer className="h-4 w-4 text-orange-600" />
              <Badge variant="outline" className="text-orange-600 border-orange-600">
                Expires in {formatTime(timeLeft)}
              </Badge>
            </div>
            <p className="text-sm text-gray-600">
              Scan this QR code to grant temporary access to your health records
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-32 h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg mx-auto flex items-center justify-center">
              <QrCode className="h-12 w-12 text-gray-400" />
            </div>
            <p className="text-sm text-gray-600">
              Generate a secure QR code for temporary access sharing
            </p>
          </div>
        )}
        
        <Button 
          onClick={generateQRCode} 
          className="w-full"
          disabled={isActive}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          {isActive ? "QR Code Active" : "Generate QR Code"}
        </Button>
      </CardContent>
    </Card>
  )
}
