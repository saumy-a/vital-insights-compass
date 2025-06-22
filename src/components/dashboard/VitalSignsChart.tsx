
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const vitalData = [
  { time: '06:00', heartRate: 72, bloodPressure: 120, temperature: 98.6 },
  { time: '09:00', heartRate: 78, bloodPressure: 125, temperature: 98.8 },
  { time: '12:00', heartRate: 85, bloodPressure: 130, temperature: 99.1 },
  { time: '15:00', heartRate: 80, bloodPressure: 128, temperature: 98.9 },
  { time: '18:00', heartRate: 75, bloodPressure: 122, temperature: 98.7 },
  { time: '21:00', heartRate: 70, bloodPressure: 118, temperature: 98.5 },
]

export function VitalSignsChart() {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Vital Signs Monitoring
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={vitalData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="time" 
                className="text-xs"
                tick={{ fill: '#6B7280' }}
              />
              <YAxis 
                className="text-xs"
                tick={{ fill: '#6B7280' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="heartRate" 
                stroke="#EF4444" 
                strokeWidth={2}
                name="Heart Rate (bpm)"
                dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="bloodPressure" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Blood Pressure (mmHg)"
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="temperature" 
                stroke="#10B981" 
                strokeWidth={2}
                name="Temperature (°F)"
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Heart Rate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Blood Pressure</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Temperature</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
