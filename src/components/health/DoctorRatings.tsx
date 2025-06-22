
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Star, User } from "lucide-react"

const mockDoctors = [
  {
    id: 1,
    name: "Dr. Smith",
    specialty: "Cardiology",
    rating: 4.8,
    reviews: 125,
    lastConsultation: "2024-01-15"
  },
  {
    id: 2,
    name: "Dr. Johnson",
    specialty: "Diabetes Care",
    rating: 4.6,
    reviews: 89,
    lastConsultation: "2024-01-10"
  }
]

export function DoctorRatings() {
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null)
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")

  const handleRatingSubmit = () => {
    console.log("Rating submitted:", { doctorId: selectedDoctor, rating, feedback })
    setSelectedDoctor(null)
    setRating(0)
    setFeedback("")
  }

  const renderStars = (count: number, interactive = false, onStarClick?: (star: number) => void) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < count 
            ? "fill-yellow-400 text-yellow-400" 
            : "text-gray-300"
        } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
        onClick={() => interactive && onStarClick?.(i + 1)}
      />
    ))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5" />
          Doctor Ratings & Feedback
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedDoctor ? (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="font-medium">
                Rate {mockDoctors.find(d => d.id === selectedDoctor)?.name}
              </h3>
              <div className="flex justify-center gap-1 my-3">
                {renderStars(rating, true, setRating)}
              </div>
            </div>
            
            <Textarea
              placeholder="Share your experience with this doctor..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={3}
            />
            
            <div className="flex gap-2">
              <Button onClick={handleRatingSubmit} size="sm" className="flex-1">
                Submit Rating
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setSelectedDoctor(null)} 
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {mockDoctors.map((doctor) => (
              <div key={doctor.id} className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{doctor.name}</p>
                      <p className="text-xs text-gray-500">{doctor.specialty}</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setSelectedDoctor(doctor.id)}
                  >
                    Rate
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {renderStars(Math.floor(doctor.rating))}
                    <span className="text-sm text-gray-600 ml-1">
                      {doctor.rating} ({doctor.reviews} reviews)
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Last: {doctor.lastConsultation}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
