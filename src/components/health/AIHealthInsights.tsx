
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Brain, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const healthData = [
  { date: "Jan", bloodSugar: 140, hemoglobin: 11.5, bloodPressure: 130 },
  { date: "Feb", bloodSugar: 155, hemoglobin: 11.2, bloodPressure: 135 },
  { date: "Mar", bloodSugar: 165, hemoglobin: 10.8, bloodPressure: 140 },
  { date: "Apr", bloodSugar: 150, hemoglobin: 11.0, bloodPressure: 125 },
  { date: "May", bloodSugar: 145, hemoglobin: 11.3, bloodPressure: 120 },
]

const insights = [
  {
    type: "warning",
    title: "High Blood Sugar Detected",
    description: "Your recent reports show elevated glucose levels (165 mg/dL). Consider reducing sugar intake.",
    severity: "high",
    trend: "up"
  },
  {
    type: "alert",
    title: "Low Hemoglobin Levels",
    description: "Hemoglobin at 10.8 g/dL is below normal range. Increase iron-rich foods.",
    severity: "medium",
    trend: "down"
  },
  {
    type: "success",
    title: "Blood Pressure Improving",
    description: "Great progress! Your BP has decreased to 120/80 mmHg.",
    severity: "good",
    trend: "down"
  }
]

const chartConfig = {
  bloodSugar: {
    label: "Blood Sugar",
    color: "hsl(var(--destructive))",
  },
  hemoglobin: {
    label: "Hemoglobin",
    color: "hsl(var(--primary))",
  },
  bloodPressure: {
    label: "Blood Pressure",
    color: "hsl(var(--secondary))",
  },
}

export function AIHealthInsights() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          AI Health Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Health Insights */}
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <Alert key={index} variant={insight.type === "success" ? "default" : "destructive"} className={`border-l-4 ${
              insight.severity === "high" ? "border-l-red-500 bg-red-50" :
              insight.severity === "medium" ? "border-l-yellow-500 bg-yellow-50" :
              "border-l-green-500 bg-green-50"
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  {insight.severity === "high" ? <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" /> :
                   insight.severity === "medium" ? <TrendingDown className="h-4 w-4 text-yellow-600 mt-0.5" /> :
                   <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />}
                  <div>
                    <div className="font-medium text-sm">{insight.title}</div>
                    <AlertDescription className="text-xs mt-1">
                      {insight.description}
                    </AlertDescription>
                  </div>
                </div>
                <Badge variant={insight.severity === "good" ? "secondary" : "destructive"} className="text-xs">
                  {insight.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                </Badge>
              </div>
            </Alert>
          ))}
        </div>

        {/* Health Trends Chart */}
        <div className="mt-6">
          <h4 className="text-sm font-medium mb-3">Health Trends (Last 5 Months)</h4>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={healthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="bloodSugar" stroke="var(--color-bloodSugar)" strokeWidth={2} />
                <Line type="monotone" dataKey="hemoglobin" stroke="var(--color-hemoglobin)" strokeWidth={2} />
                <Line type="monotone" dataKey="bloodPressure" stroke="var(--color-bloodPressure)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
