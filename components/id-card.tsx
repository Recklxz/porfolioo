"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { GraduationCap, Mail, Github, Linkedin } from "lucide-react"
import { cn } from "@/lib/utils"

interface IDCardProps {
  className?: string
}

export default function IDCard({ className }: IDCardProps) {
  return (
    <motion.div
      initial={{ rotate: 12, scale: 0.9 }}
      animate={{ rotate: 12, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className={cn("bg-orange-500 p-6 rounded-lg shadow-xl max-w-sm", className)}
    >
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-24 h-24 bg-white rounded-full overflow-hidden ring-4 ring-white/20">
            <Image 
              src="/profile-picture.jpg" 
              alt="Anmol Kool - Profile Picture" 
              width={96} 
              height={96} 
              className="object-cover w-full h-full"
              priority
            />
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
  )
}
