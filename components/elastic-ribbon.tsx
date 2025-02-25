"use client"

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"

interface Point {
  x: number
  y: number
}

interface ElasticRibbonProps {
  startPoint: Point
  endPoint: Point
  tension?: number
  color?: string
  stretched: boolean
}

export function ElasticRibbon({
  startPoint,
  endPoint,
  tension = 0.3,
  color = "#FF9800",
  stretched
}: ElasticRibbonProps) {
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (!pathRef.current) return

    // Update path length for animation
    const length = pathRef.current.getTotalLength()
    pathRef.current.style.strokeDasharray = `${length} ${length}`
  }, [startPoint, endPoint])

  // Calculate control points for the bezier curve
  const controlPoint1 = {
    x: startPoint.x,
    y: startPoint.y + (endPoint.y - startPoint.y) * (stretched ? tension * 0.5 : tension)
  }
  const controlPoint2 = {
    x: endPoint.x,
    y: startPoint.y + (endPoint.y - startPoint.y) * (stretched ? 1 - tension * 0.5 : 1 - tension)
  }

  // Create the path data for the elastic curve
  const pathData = `
    M ${startPoint.x},${startPoint.y}
    C ${controlPoint1.x},${controlPoint1.y}
    ${controlPoint2.x},${controlPoint2.y}
    ${endPoint.x},${endPoint.y}
  `

  return (
    <motion.path
      ref={pathRef}
      d={pathData}
      stroke={color}
      strokeWidth={stretched ? 3 : 4}
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ 
        pathLength: 1,
        strokeWidth: stretched ? 3 : 4
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut"
      }}
      style={{
        filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))"
      }}
    />
  )
}
