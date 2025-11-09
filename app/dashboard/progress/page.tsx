"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const monthlyData = [
  { name: 'Jan', progress: 65 },
  { name: 'Feb', progress: 70 },
  { name: 'Mar', progress: 72 },
  { name: 'Apr', progress: 78 },
  { name: 'May', progress: 85 },
  { name: 'Jun', progress: 88 },
];

const skillProgressData = [
  { name: 'Web Dev', progress: 75 },
  { name: 'Data Science', progress: 40 },
  { name: 'AI Fundamentals', progress: 20 },
];

export default function ProgressTrackerPage() {
  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-bold text-grindgrid-text-primary">Progress Tracker</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-grindgrid-card shadow-neumorphic rounded-lg">
          <CardHeader>
            <CardTitle>Monthly Progress Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--grindgrid-shadow-dark))" />
                <XAxis dataKey="name" stroke="hsl(var(--grindgrid-text-secondary))" />
                <YAxis stroke="hsl(var(--grindgrid-text-secondary))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--grindgrid-card))', border: '1px solid hsl(var(--grindgrid-shadow-dark))', borderRadius: '0.5rem' }} />
                <Line type="monotone" dataKey="progress" stroke="hsl(var(--grindgrid-accent))" strokeWidth={2} dot={{ r: 6, fill: 'hsl(var(--grindgrid-accent))' }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-grindgrid-card shadow-neumorphic rounded-lg">
          <CardHeader>
            <CardTitle>Skill Progress Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillProgressData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--grindgrid-shadow-dark))" />
                <XAxis dataKey="name" stroke="hsl(var(--grindgrid-text-secondary))" />
                <YAxis stroke="hsl(var(--grindgrid-text-secondary))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--grindgrid-card))', border: '1px solid hsl(var(--grindgrid-shadow-dark))', borderRadius: '0.5rem' }} />
                <Bar dataKey="progress" fill="hsl(var(--grindgrid-accent))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-grindgrid-card shadow-neumorphic rounded-lg text-center p-6">
          <CardTitle className="text-xl font-semibold mb-4">Web Dev</CardTitle>
          <Progress value={75} className="w-full h-3 bg-grindgrid-shadow-dark" indicatorClassName="bg-grindgrid-accent" />
          <p className="text-sm text-grindgrid-text-secondary mt-2">75%</p>
        </Card>
        <Card className="bg-grindgrid-card shadow-neumorphic rounded-lg text-center p-6">
          <CardTitle className="text-xl font-semibold mb-4">Data Science</CardTitle>
          <Progress value={40} className="w-full h-3 bg-grindgrid-shadow-dark" indicatorClassName="bg-grindgrid-accent" />
          <p className="text-sm text-grindgrid-text-secondary mt-2">40%</p>
        </Card>
        <Card className="bg-grindgrid-card shadow-neumorphic rounded-lg text-center p-6">
          <CardTitle className="text-xl font-semibold mb-4">AI Fundamentals</CardTitle>
          <Progress value={20} className="w-full h-3 bg-grindgrid-shadow-dark" indicatorClassName="bg-grindgrid-accent" />
          <p className="text-sm text-grindgrid-text-secondary mt-2">20%</p>
        </Card>
      </div>
    </div>
  )
}
