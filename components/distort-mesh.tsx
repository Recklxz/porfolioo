"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"

interface Point {
  x: number
  y: number
}

interface DistortMeshProps {
  children: React.ReactNode
  isInteracting: boolean
}

export function DistortMesh({ children, isInteracting }: DistortMeshProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Spring configuration for smooth movement
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [2, -2]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-2, 2]), springConfig)
  const scale = useSpring(isInteracting ? 1.02 : 1, springConfig)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }

    container.addEventListener("mousemove", handleMouseMove)
    return () => container.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <motion.div
      ref={containerRef}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
        }}
        transition={{
          type: "spring",
          ...springConfig,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
