import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Lightbulb, CalendarCheck, NotebookPen } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-grindgrid-bg text-grindgrid-text-primary">
      {/* Header/Navbar for Landing Page */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Image src="/placeholder.svg?height=32&width=32" alt="GrindGrid Logo" width={32} height={32} />
          <span className="text-xl font-bold">GrindGrid</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link href="#features" className="hover:text-grindgrid-accent">Features</Link>
          <Link href="#pricing" className="hover:text-grindgrid-accent">Pricing</Link>
          <Link href="/login" className="hover:text-grindgrid-accent">Login</Link>
          <Button asChild className="bg-grindgrid-accent text-white hover:bg-grindgrid-accent/90 rounded-lg shadow-neumorphic-sm">
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
      </header>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-20 text-center flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 relative z-10 text-grindgrid-text-primary">
          Master Your Skills, <br className="hidden md:block" /> Forge Your Future
        </h1>
        <p className="text-lg md:text-xl text-grindgrid-text-secondary mb-10 max-w-3xl relative z-10">
          GrindGrid is your AI-powered companion for skill development. Track progress, get smart suggestions, and achieve your learning goals.
        </p>
        <Button asChild className="bg-grindgrid-accent text-white text-lg px-8 py-6 rounded-lg shadow-neumorphic hover:bg-grindgrid-accent/90 relative z-10">
          <Link href="/signup">Get Started</Link>
        </Button>
      </section>

      {/* Benefits Grid */}
      <section id="features" className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-grindgrid-text-primary">Why GrindGrid?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="bg-grindgrid-card rounded-lg shadow-neumorphic p-6 text-center">
            <CardHeader className="flex flex-col items-center pb-4">
              <CheckCircle className="h-12 w-12 text-grindgrid-accent mb-4" />
              <CardTitle className="text-xl font-semibold">Progress Tracking</CardTitle>
            </CardHeader>
            <CardContent className="text-grindgrid-text-secondary">
              Visually track your skill development with intuitive charts and progress bars.
            </CardContent>
          </Card>
          <Card className="bg-grindgrid-card rounded-lg shadow-neumorphic p-6 text-center">
            <CardHeader className="flex flex-col items-center pb-4">
              <Lightbulb className="h-12 w-12 text-grindgrid-accent mb-4" />
              <CardTitle className="text-xl font-semibold">AI Coach</CardTitle>
            </CardHeader>
            <CardContent className="text-grindgrid-text-secondary">
              Get personalized learning suggestions and quiz generation from our AI assistant.
            </CardContent>
          </Card>
          <Card className="bg-grindgrid-card rounded-lg shadow-neumorphic p-6 text-center">
            <CardHeader className="flex flex-col items-center pb-4">
              <CalendarCheck className="h-12 w-12 text-grindgrid-accent mb-4" />
              <CardTitle className="text-xl font-semibold">Smart Deadlines</CardTitle>
            </CardHeader>
            <CardContent className="text-grindgrid-text-secondary">
              Set and manage deadlines effectively to stay on track with your goals.
            </CardContent>
          </Card>
          <Card className="bg-grindgrid-card rounded-lg shadow-neumorphic p-6 text-center">
            <CardHeader className="flex flex-col items-center pb-4">
              <NotebookPen className="h-12 w-12 text-grindgrid-accent mb-4" />
              <CardTitle className="text-xl font-semibold">Integrated Notes</CardTitle>
            </CardHeader>
            <CardContent className="text-grindgrid-text-secondary">
              Keep all your learning notes organized with a powerful rich-text editor.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Feature Showcase Area */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold mb-6 text-grindgrid-text-primary">Visualize Your Growth</h2>
            <p className="text-lg text-grindgrid-text-secondary mb-8">
              See your progress come to life with interactive charts and detailed skill breakdowns. Understand where you stand and what to focus on next.
            </p>
            <Button asChild className="bg-grindgrid-accent text-white px-6 py-3 rounded-lg shadow-neumorphic-sm hover:bg-grindgrid-accent/90">
              <Link href="/dashboard">Explore Dashboard</Link>
            </Button>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-xl aspect-[4/3] rounded-lg shadow-neumorphic overflow-hidden">
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
      </section>

      {/* Pricing Cards Section */}
      <section id="pricing" className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-grindgrid-text-primary">Simple & Transparent Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-grindgrid-card rounded-lg shadow-neumorphic p-8 flex flex-col items-center text-center">
            <CardHeader className="pb-6">
              <CardTitle className="text-3xl font-bold mb-2">Starter</CardTitle>
              <p className="text-grindgrid-text-secondary">Perfect for individual learners</p>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="text-5xl font-extrabold mb-6">
                $0<span className="text-lg font-normal text-grindgrid-text-secondary">/month</span>
              </div>
              <ul className="space-y-3 text-grindgrid-text-primary mb-8 text-left">
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Unlimited Skill Tracking</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Basic AI Suggestions</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Task & Note Management</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Community Access</li>
              </ul>
              <Button asChild className="w-full bg-grindgrid-accent text-white px-6 py-3 rounded-lg shadow-neumorphic-sm hover:bg-grindgrid-accent/90">
                <Link href="/signup">Start for Free</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-grindgrid-card rounded-lg shadow-neumorphic p-8 flex flex-col items-center text-center border-2 border-grindgrid-accent">
            <CardHeader className="pb-6">
              <CardTitle className="text-3xl font-bold mb-2">Pro</CardTitle>
              <p className="text-grindgrid-text-secondary">For serious learners and professionals</p>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="text-5xl font-extrabold mb-6">
                $9<span className="text-lg font-normal text-grindgrid-text-secondary">/month</span>
              </div>
              <ul className="space-y-3 text-grindgrid-text-primary mb-8 text-left">
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> All Starter Features</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Advanced AI Coach & Quiz</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Priority Support</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Custom Integrations</li>
              </ul>
              <Button asChild className="w-full bg-grindgrid-accent text-white px-6 py-3 rounded-lg shadow-neumorphic-sm hover:bg-grindgrid-accent/90">
                <Link href="/signup">Go Pro</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-grindgrid-bg py-10 border-t border-grindgrid-shadow-dark">
        <div className="container mx-auto px-4 text-center text-grindgrid-text-secondary">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Image src="/placeholder.svg?height=24&width=24" alt="GrindGrid Logo" width={24} height={24} />
            <span className="text-lg font-bold">GrindGrid</span>
          </div>
          <p>&copy; {new Date().getFullYear()} GrindGrid. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <Link href="#" className="hover:text-grindgrid-accent">Privacy Policy</Link>
            <Link href="#" className="hover:text-grindgrid-accent">Terms of Service</Link>
            <Link href="#" className="hover:text-grindgrid-accent">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
