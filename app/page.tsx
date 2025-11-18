import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Lightbulb, CalendarCheck, NotebookPen } from 'lucide-react'
import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import { Navbar1 } from "@/components/ui/navbar-1"
import { Features } from "@/components/ui/features-9"
import { Footer } from "@/components/ui/footer-1"
import { TypewriterEffectSmoothDemo } from "@/components/ui/typewriter-effect-demo"
import { FeatureSteps } from "@/components/ui/feature-section"

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
                GrindApp is your AI-powered companion for skill development. Track progress, get smart suggestions, and achieve your learning goals.
              </p>
            </>
          }
        >
          <Image
            src="/image.png"
            alt="GrindApp - Collaborative Learning"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full w-full"
            draggable={false}
            priority
          />
        </ContainerScroll>
      </section>

      {/* Features Section */}
      <Features />

      {/* Feature Steps Section */}
      <FeatureSteps
        features={[
          {
            step: "Step 1",
            title: "Create Your Profile",
            content: "Sign up and set up your profile to start tracking your learning journey. Add your skills and set your goals.",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop"
          },
          {
            step: "Step 2",
            title: "Track Your Progress",
            content: "Monitor your skill development with interactive charts and detailed progress breakdowns. See where you stand and what to focus on next.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
          },
          {
            step: "Step 3",
            title: "Achieve Your Goals",
            content: "Get personalized AI suggestions and build projects to master your skills. Graduate with hands-on experience and real achievements.",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
          },
        ]}
        title="Your Journey Starts Here"
        autoPlayInterval={4000}
        imageHeight="h-[500px]"
      />

      {/* Typewriter Effect Section */}
      <section className="w-full bg-white">
        <TypewriterEffectSmoothDemo />
      </section>

      {/* Footer */}
      <Footer
        logoSrc="/placeholder-logo.svg"
        logoAlt="GrindApp Logo"
        description="Empowering learners to achieve success through AI-powered skill development and seamless progress tracking."
        socialLinks={[
          { iconName: "instagram", href: "https://instagram.com", label: "Instagram" },
          { iconName: "twitter", href: "https://twitter.com", label: "Twitter" },
          { iconName: "linkedin", href: "https://linkedin.com", label: "LinkedIn" },
        ]}
        columns={[
          {
            title: "FEATURES",
            links: [
              { label: "Skill Tracking", href: "/dashboard/skills" },
              { label: "AI Coach", href: "/dashboard/ai", badge: "Pro" },
              { label: "Task Management", href: "/dashboard/tasks" },
              { label: "Progress Analytics", href: "/dashboard/progress" },
              { label: "Notes", href: "/dashboard/notes" },
            ],
          },
          {
            title: "RESOURCES",
            links: [
              { label: "Blog", href: "#" },
              { label: "Tutorials", href: "#", badge: "New" },
              { label: "Documentation", href: "#" },
              { label: "Help Center", href: "#" },
              { label: "Community", href: "#" },
            ],
          },
          {
            title: "COMPANY",
            links: [
              { label: "About Us", href: "#" },
              { label: "Careers", href: "#", badge: "Hiring" },
              { label: "Partners", href: "#" },
              { label: "Contact", href: "#" },
              { label: "Press", href: "#" },
            ],
          },
          {
            title: "LEGAL",
            links: [
              { label: "Privacy Policy", href: "#" },
              { label: "Terms of Service", href: "#" },
              { label: "Cookie Settings", href: "#" },
              { label: "Security", href: "#" },
            ],
          },
        ]}
      />
    </div>
  )
}
