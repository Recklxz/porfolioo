"use client"

import { motion } from "framer-motion"
import { Award } from "lucide-react"

interface CertificationCardProps {
  title: string
  year: string
  color: string
}

export default function CertificationCard({ title, year, color }: CertificationCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-${color}-500/20 backdrop-blur-sm p-6 rounded-lg border border-${color}-500/30`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-full bg-${color}-500/20`}>
          <Award className={`w-6 h-6 text-${color}-500`} />
        </div>
        <div>
          <h3 className="text-white font-semibold">{title}</h3>
          <p className="text-white/60 text-sm">{year}</p>
        </div>
      </div>
    </motion.div>
  )
}

