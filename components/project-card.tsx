"use client"

import { motion } from "framer-motion"
import { Github } from "lucide-react"
import Link from "next/link"

interface ProjectCardProps {
  title: string
  description: string
  github: string
  color: string
}

export default function ProjectCard({ title, description, github, color }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`bg-${color}-500 p-6 rounded-lg transform transition-transform`}
    >
      <div className="space-y-4">
        <h3 className="text-white font-bold text-xl">{title}</h3>
        <p className="text-white/80 text-sm">{description}</p>
        <Link
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm"
        >
          <Github className="w-4 h-4" />
          View on GitHub
        </Link>
      </div>
    </motion.div>
  )
}

