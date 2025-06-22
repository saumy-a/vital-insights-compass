
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, Type, Contrast, Volume2, Globe } from "lucide-react"

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "gu", name: "ગુજરાતી", flag: "🇮🇳" }
]

const translations = {
  en: {
    welcome: "Welcome back",
    reports: "Medical Reports",
    medications: "Medications",
    appointments: "Appointments"
  },
  hi: {
    welcome: "वापसी पर स्वागत है",
    reports: "मेडिकल रिपोर्ट",
    medications: "दवाएं",
    appointments: "अपॉइंटमेंट"
  },
  gu: {
    welcome: "પાછા આવવા બદલ સ્વાગત છે",
    reports: "મેડિકલ રિપોર્ટ",
    medications: "દવાઓ",
    appointments: "એપોઇન્ટમેન્ટ"
  }
}

export function AccessibilityPanel() {
  const [darkMode, setDarkMode] = useState(false)
  const [elderMode, setElderMode] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState("en")
  const [speechEnabled, setSpeechEnabled] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    if (elderMode) {
      document.documentElement.style.fontSize = '18px'
      document.body.classList.add('elder-mode')
    } else {
      document.documentElement.style.fontSize = '16px'
      document.body.classList.remove('elder-mode')
    }
  }, [elderMode])

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast')
    } else {
      document.body.classList.remove('high-contrast')
    }
  }, [highContrast])

  const speakText = (text: string) => {
    if (speechEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8
      utterance.volume = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Contrast className="h-5 w-5" />
          Accessibility & Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Theme Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            <span className="text-sm font-medium">Dark Mode</span>
          </div>
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        </div>

        {/* Elder-Friendly Mode */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            <span className="text-sm font-medium">Elder-Friendly Mode</span>
          </div>
          <Switch checked={elderMode} onCheckedChange={setElderMode} />
        </div>

        {/* High Contrast */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Contrast className="h-4 w-4" />
            <span className="text-sm font-medium">High Contrast</span>
          </div>
          <Switch checked={highContrast} onCheckedChange={setHighContrast} />
        </div>

        {/* Text-to-Speech */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4" />
            <span className="text-sm font-medium">Text-to-Speech</span>
          </div>
          <Switch checked={speechEnabled} onCheckedChange={setSpeechEnabled} />
        </div>

        {/* Language Selection */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="text-sm font-medium">Language</span>
          </div>
          <div className="flex gap-2">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={currentLanguage === lang.code ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentLanguage(lang.code)}
                className="text-xs"
              >
                {lang.flag} {lang.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Demo Speech Button */}
        {speechEnabled && (
          <Button 
            onClick={() => speakText(translations[currentLanguage as keyof typeof translations].welcome)}
            variant="outline" 
            size="sm" 
            className="w-full"
          >
            <Volume2 className="h-4 w-4 mr-2" />
            Test Speech
          </Button>
        )}

        {/* Current Language Preview */}
        <div className="p-3 bg-gray-50 rounded-lg space-y-1">
          <div className="text-xs text-gray-600">Preview in {languages.find(l => l.code === currentLanguage)?.name}:</div>
          <div className="text-sm font-medium">{translations[currentLanguage as keyof typeof translations].welcome}</div>
        </div>
      </CardContent>
    </Card>
  )
}
