import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Lightbulb, CalendarCheck, NotebookPen } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header/Navbar for Landing Page */}
      <header className="w-full px-4 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Image src="/placeholder.svg?height=32&width=32" alt="GrindGrid Logo" width={32} height={32} />
          <span className="text-xl font-bold text-gray-900">GrindGrid</span>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</Link>
          <Link href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Pricing</Link>
          <Link href="/login" className="text-gray-700 hover:text-blue-600 transition-colors">Login</Link>
          <Button asChild className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-lg transition-all duration-200">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </nav>
        <div className="md:hidden">
          {/* Mobile menu icon placeholder */}
          <Button variant="ghost" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full px-4 py-20 text-center flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="max-w-6xl mx-auto">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 relative z-10 text-gray-900">
          Master Your Skills, <br className="hidden md:block" /> Forge Your Future
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto relative z-10">
          GrindGrid is your AI-powered companion for skill development. Track progress, get smart suggestions, and achieve your learning goals.
        </p>
        <Button asChild className="bg-blue-600 text-white text-lg px-8 py-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200 relative z-10">
          <Link href="/signup">Get Started</Link>
        </Button>
        </div>
      </section>

      {/* Benefits Grid */}
      <section id="features" className="w-full px-4 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Why GrindGrid?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="bg-white rounded-lg shadow-lg p-6 text-center border border-gray-200 hover:shadow-xl transition-shadow duration-200">
            <CardHeader className="flex flex-col items-center pb-4">
              <CheckCircle className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle className="text-xl font-semibold text-gray-900">Progress Tracking</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              Visually track your skill development with intuitive charts and progress bars.
            </CardContent>
          </Card>
          <Card className="bg-white rounded-lg shadow-lg p-6 text-center border border-gray-200 hover:shadow-xl transition-shadow duration-200">
            <CardHeader className="flex flex-col items-center pb-4">
              <Lightbulb className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle className="text-xl font-semibold text-gray-900">AI Coach</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              Get personalized learning suggestions and quiz generation from our AI assistant.
            </CardContent>
          </Card>
          <Card className="bg-white rounded-lg shadow-lg p-6 text-center border border-gray-200 hover:shadow-xl transition-shadow duration-200">
            <CardHeader className="flex flex-col items-center pb-4">
              <CalendarCheck className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle className="text-xl font-semibold text-gray-900">Smart Deadlines</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              Set and manage deadlines effectively to stay on track with your goals.
            </CardContent>
          </Card>
          <Card className="bg-white rounded-lg shadow-lg p-6 text-center border border-gray-200 hover:shadow-xl transition-shadow duration-200">
            <CardHeader className="flex flex-col items-center pb-4">
              <NotebookPen className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle className="text-xl font-semibold text-gray-900">Integrated Notes</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              Keep all your learning notes organized with a powerful rich-text editor.
            </CardContent>
          </Card>
        </div>
        </div>
      </section>

      {/* Feature Showcase Area */}
      <section className="w-full px-4 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Visualize Your Growth</h2>
            <p className="text-lg text-gray-600 mb-8">
              See your progress come to life with interactive charts and detailed skill breakdowns. Understand where you stand and what to focus on next.
            </p>
            <Button asChild className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200">
              <Link href="/dashboard">Explore Dashboard</Link>
            </Button>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-xl aspect-[4/3] rounded-lg shadow-xl overflow-hidden border border-gray-200">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_wn75j8wn75j8wn75-dD7ytWN4cYrxkwV2v6TLrzkfbgjiLV.png"
                alt="GrindGrid Dashboard Screenshot"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section id="pricing" className="w-full px-4 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Simple & Transparent Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center border border-gray-200 hover:shadow-xl transition-shadow duration-200">
            <CardHeader className="pb-6">
              <CardTitle className="text-3xl font-bold mb-2 text-gray-900">Starter</CardTitle>
              <p className="text-gray-600">Perfect for individual learners</p>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="text-5xl font-extrabold mb-6">
                $0<span className="text-lg font-normal text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 text-gray-900 mb-8 text-left">
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Unlimited Skill Tracking</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Basic AI Suggestions</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Task & Note Management</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Community Access</li>
              </ul>
              <Button asChild className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200">
                <Link href="/signup">Start for Free</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center border-2 border-blue-600 hover:shadow-xl transition-shadow duration-200">
            <CardHeader className="pb-6">
              <CardTitle className="text-3xl font-bold mb-2 text-gray-900">Pro</CardTitle>
              <p className="text-gray-600">For serious learners and professionals</p>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="text-5xl font-extrabold mb-6">
                $9<span className="text-lg font-normal text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 text-gray-900 mb-8 text-left">
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> All Starter Features</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Advanced AI Coach & Quiz</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Priority Support</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Custom Integrations</li>
              </ul>
              <Button asChild className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200">
                <Link href="/signup">Go Pro</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-10 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Image src="/placeholder.svg?height=24&width=24" alt="GrindGrid Logo" width={24} height={24} />
            <span className="text-lg font-bold text-gray-900">GrindGrid</span>
          </div>
          <p>&copy; {new Date().getFullYear()} GrindGrid. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <Link href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
