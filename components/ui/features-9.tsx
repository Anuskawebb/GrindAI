'use client'

import { Activity, Map as MapIcon, MessageCircle } from 'lucide-react'
import { useState } from 'react'

import { Area, AreaChart, CartesianGrid } from 'recharts'

import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

export function Features() {
    return (
        <section className="px-4 py-16 md:py-32 bg-white">
            <div className="mx-auto grid max-w-5xl border border-gray-200 rounded-xl overflow-hidden md:grid-cols-2 bg-white shadow-sm">
                <div className="bg-white">
                    <div className="p-6 sm:p-12">
                        <span className="text-gray-600 flex items-center gap-2">
                            <MapIcon className="size-4 text-orange-500" />
                            Real time location tracking
                        </span>

                        <p className="mt-8 text-2xl font-semibold text-gray-900">Advanced tracking system, Instantly locate all your assets.</p>
                    </div>

                    <div aria-hidden className="relative">
                        <div className="absolute inset-0 z-10 m-auto size-fit">
                            <div className="rounded-lg bg-white z-[1] relative flex size-fit w-fit items-center gap-2 border border-orange-200 px-3 py-1 text-xs font-medium shadow-md shadow-orange-100">
                                <span className="text-lg">🇨🇩</span> Last connection from DR Congo
                            </div>
                            <div className="rounded-lg bg-white absolute inset-2 -bottom-2 mx-auto border border-pink-200 px-3 py-4 text-xs font-medium shadow-md shadow-pink-100"></div>
                        </div>

                        <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-pink-50">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white z-1"></div>
                            <Map />
                        </div>
                    </div>
                </div>
                <div className="overflow-hidden border-t bg-gradient-to-br from-pink-50 to-orange-50 p-6 sm:p-12 md:border-0 md:border-l border-gray-200">
                    <div className="relative z-10">
                        <span className="text-gray-600 flex items-center gap-2">
                            <MessageCircle className="size-4 text-pink-500" />
                            Email and web support
                        </span>

                        <p className="my-8 text-2xl font-semibold text-gray-900">Reach out via email or web for any assistance you need.</p>
                    </div>
                    <div aria-hidden className="flex flex-col gap-8">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="flex justify-center items-center size-5 rounded-full border border-orange-200">
                                    <span className="size-3 rounded-full bg-orange-500"/>
                                </span>
                                <span className="text-gray-600 text-xs">Sat 22 Feb</span>
                            </div>
                            <div className="rounded-lg bg-white mt-1.5 w-3/5 border border-gray-200 p-3 text-xs text-gray-900 shadow-sm">Hey, I'm having trouble with my account.</div>
                        </div>

                        <div>
                            <div className="rounded-lg mb-1 ml-auto w-3/5 bg-gradient-to-r from-orange-500 to-pink-500 p-3 text-xs text-white shadow-md">Molestiae numquam debitis et ullam distinctio provident nobis repudiandae deleniti necessitatibus.</div>
                            <span className="text-gray-600 block text-right text-xs">Now</span>
                        </div>
                    </div>
                </div>
                <div className="col-span-full border-y border-gray-200 p-12 bg-gradient-to-r from-orange-50 via-white to-pink-50">
                    <p className="text-center text-4xl font-semibold lg:text-7xl bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">99.99% Uptime</p>
                </div>
                <div className="relative col-span-full bg-white">
                    <div className="absolute z-10 max-w-lg px-6 pr-12 pt-6 md:px-12 md:pt-12">
                        <span className="text-gray-600 flex items-center gap-2">
                            <Activity className="size-4 text-orange-500" />
                            Activity feed
                        </span>

                        <p className="my-8 text-2xl font-semibold text-gray-900">
                            Monitor your application's activity in real-time. <span className="text-gray-600"> Instantly identify and resolve issues.</span>
                        </p>
                    </div>
                    <MonitoringChart />
                </div>
            </div>
        </section>
    )
}

const Map = () => {
    // Generate a world map-like dotted pattern without external dependencies
    const generateMapPoints = (): Array<{ x: number; y: number }> => {
        const points: Array<{ x: number; y: number }> = []
        const gridSize = 1.2
        
        for (let y = 0; y < 55; y += gridSize) {
            for (let x = 0; x < 120; x += gridSize) {
                // Create continent-like patterns using mathematical functions
                const lat = (y / 55) * Math.PI - Math.PI / 2
                const lon = (x / 120) * Math.PI * 2 - Math.PI
                
                // Simulate continents with noise functions
                const continent1 = Math.sin(lon * 2) * Math.cos(lat * 1.5) * 0.3 + 0.5
                const continent2 = Math.sin(lon * 1.5 + 1) * Math.cos(lat * 2 + 0.5) * 0.25 + 0.5
                const continent3 = Math.sin(lon * 3 - 0.5) * Math.cos(lat * 1.2 - 0.3) * 0.2 + 0.5
                
                const combined = (continent1 + continent2 + continent3) / 3
                
                // Add some randomness for natural look
                const random = (Math.sin(x * 7.3) + Math.cos(y * 5.7)) * 0.1
                const value = combined + random
                
                // Create landmasses (values between 0.35 and 0.65)
                if (value > 0.35 && value < 0.65) {
                    points.push({ x, y })
                }
            }
        }
        
        return points
    }

    const [points] = useState(() => generateMapPoints())

    const svgOptions = {
        backgroundColor: 'transparent',
        color: '#fb923c', // orange-400
        radius: 0.15,
    }

    const viewBox = `0 0 120 60`
    return (
        <svg viewBox={viewBox} style={{ background: svgOptions.backgroundColor }}>
            {points.map((point, index) => (
                <circle key={index} cx={point.x} cy={point.y} r={svgOptions.radius} fill={svgOptions.color} />
            ))}
        </svg>
    )
}

const chartConfig = {
    desktop: {
        label: 'Desktop',
        color: '#f97316', // orange-500
    },
    mobile: {
        label: 'Mobile',
        color: '#ec4899', // pink-500
    },
} satisfies ChartConfig

const chartData = [
    { month: 'May', desktop: 56, mobile: 224 },
    { month: 'June', desktop: 56, mobile: 224 },
    { month: 'January', desktop: 126, mobile: 252 },
    { month: 'February', desktop: 205, mobile: 410 },
    { month: 'March', desktop: 200, mobile: 126 },
    { month: 'April', desktop: 400, mobile: 800 },
]

const MonitoringChart = () => {
    return (
        <ChartContainer className="h-120 aspect-auto md:h-96" config={chartConfig}>
            <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                    left: 0,
                    right: 0,
                }}>
                <defs>
                    <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
                        <stop offset="55%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
                        <stop offset="55%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
                    </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <ChartTooltip active cursor={false} content={<ChartTooltipContent />} />
                <Area strokeWidth={2} dataKey="mobile" type="stepBefore" fill="url(#fillMobile)" fillOpacity={0.1} stroke="var(--color-mobile)" stackId="a" />
                <Area strokeWidth={2} dataKey="desktop" type="stepBefore" fill="url(#fillDesktop)" fillOpacity={0.1} stroke="var(--color-desktop)" stackId="a" />
            </AreaChart>
        </ChartContainer>
    )
}

