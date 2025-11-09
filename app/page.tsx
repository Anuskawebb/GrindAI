import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Lightbulb, CalendarCheck, NotebookPen } from 'lucide-react'
import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import { Navbar1 } from "@/components/ui/navbar-1"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 w-full overflow-x-hidden">
      {/* Header/Navbar for Landing Page */}
      <Navbar1 />

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-white">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-gray-900">
                Master Your Skills, <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                  Forge Your Future
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
                GrindGrid is your AI-powered companion for skill development. Track progress, get smart suggestions, and achieve your learning goals.
              </p>
            </>
          }
        >
          <Image
            src="/image.png"
            alt="GrindGrid - Collaborative Learning"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full w-full"
            draggable={false}
            priority
          />
        </ContainerScroll>
      </section>

      {/* Benefits Grid */}
      <section id="features" className="w-full px-4 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Why GrindGrid?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white rounded-xl shadow-sm p-6 text-center border-none hover:shadow-md transition-shadow duration-200">
              <CardHeader className="flex flex-col items-center pb-4">
                <CheckCircle className="h-12 w-12 text-orange-500 mb-4" />
                <CardTitle className="text-xl font-semibold text-gray-900">Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Visually track your skill development with intuitive charts and progress bars.
              </CardContent>
            </Card>
            <Card className="bg-white rounded-xl shadow-sm p-6 text-center border-none hover:shadow-md transition-shadow duration-200">
              <CardHeader className="flex flex-col items-center pb-4">
                <Lightbulb className="h-12 w-12 text-orange-500 mb-4" />
                <CardTitle className="text-xl font-semibold text-gray-900">AI Coach</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Get personalized learning suggestions and quiz generation from our AI assistant.
              </CardContent>
            </Card>
            <Card className="bg-white rounded-xl shadow-sm p-6 text-center border-none hover:shadow-md transition-shadow duration-200">
              <CardHeader className="flex flex-col items-center pb-4">
                <CalendarCheck className="h-12 w-12 text-orange-500 mb-4" />
                <CardTitle className="text-xl font-semibold text-gray-900">Smart Deadlines</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Set and manage deadlines effectively to stay on track with your goals.
              </CardContent>
            </Card>
            <Card className="bg-white rounded-xl shadow-sm p-6 text-center border-none hover:shadow-md transition-shadow duration-200">
              <CardHeader className="flex flex-col items-center pb-4">
                <NotebookPen className="h-12 w-12 text-orange-500 mb-4" />
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
              <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow-sm transition-all duration-200">
                <Link href="/dashboard">Explore Dashboard</Link>
              </Button>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-xl aspect-[4/3] rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_wn75j8wn75j8wn75-dD7ytWN4cYrxkwV2v6TLrzkfbgjiLV.png"
                  alt="GrindGrid Dashboard Screenshot"
                  fill
                  className="object-cover rounded-xl"
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
            <Card className="bg-white rounded-xl shadow-sm p-8 flex flex-col items-center text-center border-none hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-6">
                <CardTitle className="text-3xl font-bold mb-2 text-gray-900">Starter</CardTitle>
                <p className="text-gray-600">Perfect for individual learners</p>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="text-5xl font-extrabold mb-6">
                  $0<span className="text-lg font-normal text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 text-gray-900 mb-8 text-left w-full">
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" /> Unlimited Skill Tracking</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" /> Basic AI Suggestions</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" /> Task & Note Management</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" /> Community Access</li>
                </ul>
                <Button asChild className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow-sm transition-all duration-200">
                  <Link href="/signup">Start for Free</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-white rounded-xl shadow-sm p-8 flex flex-col items-center text-center border-2 border-orange-500 hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-6">
                <CardTitle className="text-3xl font-bold mb-2 text-gray-900">Pro</CardTitle>
                <p className="text-gray-600">For serious learners and professionals</p>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="text-5xl font-extrabold mb-6">
                  $9<span className="text-lg font-normal text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 text-gray-900 mb-8 text-left w-full">
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" /> All Starter Features</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" /> Advanced AI Coach & Quiz</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" /> Priority Support</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" /> Custom Integrations</li>
                </ul>
                <Button asChild className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow-sm transition-all duration-200">
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
            <Link href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-orange-500 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-orange-500 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
