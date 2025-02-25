"use client"

import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion"
import Image from "next/image"
import { GraduationCap, Mail, Github, Linkedin } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"
import { ElasticRibbon } from "./elastic-ribbon"

interface IDCardProps {
  className?: string
}

export default function IDCard({ className }: IDCardProps) {
  // Motion values for dragging
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring animations for smooth movement
  const springConfig = { damping: 20, stiffness: 400, mass: 0.5 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  // Calculate rotation based on position
  const rotate = useTransform(
    [springX, springY] as MotionValue<number>[],
    (latest: number[]) => {
      const [x, y] = latest
      const distance = Math.sqrt(x * x + y * y)
      return (Math.atan2(y, x) * 180) / Math.PI + (distance * 0.1)
    }
  )

  // Container ref for positioning
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Reset position on component mount
    x.set(0)
    y.set(0)
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-[500px]">
      {/* SVG container for ribbon */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <ElasticRibbon
          startPoint={{ x: window.innerWidth - 40, y: 20 }}
          endPoint={{
            x: window.innerWidth - 200 + springX.get(),
            y: 120 + springY.get()
          }}
        />
      </svg>

      <motion.div
        drag
        dragConstraints={{
          top: -100,
          left: -200,
          right: 200,
          bottom: 200,
        }}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
        style={{
          x: springX,
          y: springY,
          rotate,
        }}
        whileDrag={{ scale: 1.02 }}
        className={cn(
          "absolute top-20 right-[200px] bg-orange-500 p-6 rounded-lg shadow-xl max-w-sm cursor-grab active:cursor-grabbing",
          "hover:shadow-2xl transition-shadow duration-200",
          className
        )}
      >
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-24 h-24 bg-white rounded-full overflow-hidden ring-4 ring-white/20">
              <div className="relative w-full h-full">
                <Image 
                  src="profile-picture.jpg"
                  alt="Anmol Kool - Profile Picture" 
                  fill
                  className="object-cover"
                  priority
                  sizes="96px"
                />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-white text-xl font-bold">Anmol Kool</h3>
              <p className="text-white/90 text-sm">Cybersecurity Student</p>
              <div className="flex gap-2 mt-2">
                <GraduationCap className="w-4 h-4 text-white/80" />
                <span className="text-white/80 text-xs">PSIT (2022-2026)</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-white/80" />
              <a 
                href="mailto:anmolkool076@gmail.com" 
                className="text-white/80 text-sm hover:text-white transition-colors"
              >
                anmolkool076@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Github className="w-4 h-4 text-white/80" />
              <a
                href="https://github.com/Recklxz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 text-sm hover:text-white transition-colors"
              >
                github.com/Recklxz
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Linkedin className="w-4 h-4 text-white/80" />
              <a
                href="https://linkedin.com/in/anmolkool"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 text-sm hover:text-white transition-colors"
              >
                linkedin.com/in/anmolkool
              </a>
            </div>
          </div>

          <div className="pt-2 border-t border-white/20">
            <p className="text-white/90 text-sm">
              Cybersecurity student with expertise in penetration testing, threat detection, and security automation.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
