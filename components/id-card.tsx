"use client"

import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion"
import Image from "next/image"
import { GraduationCap, Mail, Github, Linkedin } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"
import { ElasticRibbon } from "./elastic-ribbon"

interface IDCardProps {
  className?: string;
  initialData?: {
    name: string;
    role: string;
    institution: string;
    email: string;
    github: string;
    linkedin: string;
    bio: string;
  };
  onDataChange?: (data: any) => void;
}

export default function IDCard({ className, initialData, onDataChange }: IDCardProps) {
  // Motion values for dragging and distortion
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const meshRef = useRef<any>(null)
  const [editMode, setEditMode] = useState(false)
  const [cardData, setCardData] = useState(initialData || {
    name: "Anmol Kool",
    role: "Cybersecurity Student",
    institution: "PSIT (2022-2026)",
    email: "anmolkool076@gmail.com",
    github: "https://github.com/Recklxz",
    linkedin: "https://www.linkedin.com/in/anmol-kool-1475632a3",
    bio: "Cybersecurity student with expertise in penetration testing, threat detection, and security automation."
  })

  // Enhanced spring configuration for more realistic physics
  const springConfig = { 
    damping: 12, 
    stiffness: 150, 
    mass: 1.2,
    restDelta: 0.001 
  }

  // Spring animations for smooth movement
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  // State for window dimensions
  const [windowDimensions, setWindowDimensions] = useState({ width: 1200, height: 800 })
  const [isDragging, setIsDragging] = useState(false)

  // Calculate rotation based on position
  const rotate = useTransform(
    [springX, springY] as MotionValue<number>[],
    (latest: number[]) => {
      const [x, y] = latest
      const distance = Math.sqrt(x * x + y * y)
      return (Math.atan2(y, x) * 180) / Math.PI + (distance * 0.05)
    }
  )

  // Scale based on drag state and position
  const scale = useTransform(
    [springX, springY] as MotionValue<number>[],
    (latest: number[]) => {
      const [x, y] = latest
      const distance = Math.sqrt(x * x + y * y)
      const baseScale = isDragging ? 1.02 : 1
      return baseScale - (distance * 0.0002)
    }
  )

  // Enhanced distance calculation for mesh distortion
  const getDistortionFactors = () => {
    const currentX = springX.get()
    const currentY = springY.get()
    const distance = Math.sqrt(currentX * currentX + currentY * currentY)
    const angle = Math.atan2(currentY, currentX)
    return {
      distance,
      angle,
      distortionX: Math.cos(angle) * distance * 0.002,
      distortionY: Math.sin(angle) * distance * 0.002
    }
  }

  // Apply mesh distortion effect
  useEffect(() => {
    if (!meshRef.current) return

    const updateMesh = () => {
      const { distortionX, distortionY } = getDistortionFactors()
      if (meshRef.current && meshRef.current.material) {
        meshRef.current.material.uniforms.distortionX.value = distortionX
        meshRef.current.material.uniforms.distortionY.value = distortionY
      }
    }

    const unsubscribeX = springX.onChange(updateMesh)
    const unsubscribeY = springY.onChange(updateMesh)

    return () => {
      unsubscribeX()
      unsubscribeY()
    }
  }, [springX, springY])

  // Handle data changes
  const handleDataChange = (field: string, value: string) => {
    const newData = { ...cardData, [field]: value }
    setCardData(newData)
    onDataChange?.(newData)
  }

  // Container ref for positioning
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Reset position on component mount
    x.set(0)
    y.set(0)

    // Update window dimensions
    const updateDimensions = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Initial update
    updateDimensions()

    // Listen for window resize
    window.addEventListener('resize', updateDimensions)

    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
  }, [])

  // Calculate distance from rest position
  const getDistance = () => {
    const currentX = springX.get()
    const currentY = springY.get()
    return Math.sqrt(currentX * currentX + currentY * currentY)
  }

  return (
    <div ref={containerRef} className="relative w-full h-[500px] max-w-screen-xl mx-auto">
      {/* Container for centering */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* SVG container for ribbon */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <ElasticRibbon
            startPoint={{
              x: Math.min(windowDimensions.width * 0.8, 600),
              y: 20,
            }}
            endPoint={{
              x: Math.min(windowDimensions.width * 0.5, 400) + springX.get(),
              y: 120 + springY.get(),
            }}
            tension={0.3}
            stretched={isDragging || getDistance() > 50}
          />
        </svg>

        {/* Hanging point */}
        <div className="absolute top-5 left-1/2 w-4 h-4 bg-zinc-800 rounded-full shadow-lg z-10" />
        
        <motion.div
          drag
          dragConstraints={{
            top: -100,
            left: -150,
            right: 150,
            bottom: 100,
          }}
          dragElastic={0.3}
          dragTransition={{ 
            bounceStiffness: 150, 
            bounceDamping: 12,
            power: 0.15,
            timeConstant: 200
          }}
          style={{
            x: springX,
            y: springY,
            rotate: -2,
            scale,
            transformOrigin: "top center"
          }}
          initial={{ y: 0 }}
          animate={!isDragging ? {
            y: [0, 8, 0],
            transition: {
              y: {
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
                repeatType: "reverse"
              }
            }
          } : undefined}
          className={cn(
            "relative",
            "w-[90vw] sm:w-[400px]",
            "bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-lg shadow-xl",
            "cursor-grab active:cursor-grabbing backdrop-blur-sm",
            "hover:shadow-2xl transition-all duration-200",
            "before:absolute before:inset-0 before:bg-white/10 before:rounded-lg before:opacity-50",
            className
          )}
        >
          {/* Card hole for hanging */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-3 bg-zinc-700 rounded-b-lg" />
          <div className="space-y-4 relative">
            <div className="flex items-start gap-4">
              <div className="w-24 h-24 bg-white rounded-full overflow-hidden ring-4 ring-white/20 shadow-lg">
                <div className="relative w-full h-full">
                  <Image 
                    src="profile-picture.jpg"
                    alt={`${cardData.name} - Profile Picture`}
                    fill
                    className="object-cover"
                    priority
                    sizes="96px"
                  />
                </div>
              </div>
              <div className="flex-1">
                {editMode ? (
                  <input
                    type="text"
                    value={cardData.name}
                    onChange={(e) => handleDataChange('name', e.target.value)}
                    className="bg-transparent text-white text-xl font-bold border-b border-white/20 w-full focus:outline-none focus:border-white"
                  />
                ) : (
                  <h3 className="text-white text-xl font-bold">{cardData.name}</h3>
                )}
                {editMode ? (
                  <input
                    type="text"
                    value={cardData.role}
                    onChange={(e) => handleDataChange('role', e.target.value)}
                    className="bg-transparent text-white/90 text-sm border-b border-white/20 w-full mt-1 focus:outline-none focus:border-white"
                  />
                ) : (
                  <p className="text-white/90 text-sm">{cardData.role}</p>
                )}
                <div className="flex gap-2 mt-2">
                  <GraduationCap className="w-4 h-4 text-white/80" />
                  {editMode ? (
                    <input
                      type="text"
                      value={cardData.institution}
                      onChange={(e) => handleDataChange('institution', e.target.value)}
                      className="bg-transparent text-white/80 text-xs border-b border-white/20 w-full focus:outline-none focus:border-white"
                    />
                  ) : (
                    <span className="text-white/80 text-xs">{cardData.institution}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-white/80" />
                {editMode ? (
                  <input
                    type="text"
                    value={cardData.email}
                    onChange={(e) => handleDataChange('email', e.target.value)}
                    className="bg-transparent text-white/80 text-sm border-b border-white/20 w-full focus:outline-none focus:border-white"
                  />
                ) : (
                  <a 
                    href={`mailto:${cardData.email}`} 
                    className="text-white/80 text-sm hover:text-white transition-colors"
                  >
                    {cardData.email}
                  </a>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-white/80" />
                {editMode ? (
                  <input
                    type="text"
                    value={cardData.github}
                    onChange={(e) => handleDataChange('github', e.target.value)}
                    className="bg-transparent text-white/80 text-sm border-b border-white/20 w-full focus:outline-none focus:border-white"
                  />
                ) : (
                  <a
                    href={cardData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 text-sm hover:text-white transition-colors"
                  >
                    {cardData.github}
                  </a>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-white/80" />
                {editMode ? (
                  <input
                    type="text"
                    value={cardData.linkedin}
                    onChange={(e) => handleDataChange('linkedin', e.target.value)}
                    className="bg-transparent text-white/80 text-sm border-b border-white/20 w-full focus:outline-none focus:border-white"
                  />
                ) : (
                  <a
                    href={cardData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 text-sm hover:text-white transition-colors"
                  >
                    {cardData.linkedin}
                  </a>
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-white/20">
              {editMode ? (
                <textarea
                  value={cardData.bio}
                  onChange={(e) => handleDataChange('bio', e.target.value)}
                  className="bg-transparent text-white/90 text-sm w-full focus:outline-none resize-none"
                  rows={2}
                />
              ) : (
                <p className="text-white/90 text-sm">{cardData.bio}</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
