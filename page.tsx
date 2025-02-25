"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { Github, Linkedin, Menu, X } from "lucide-react"
import IDCard from "@/components/id-card"
import CertificationCard from "@/components/certification-card"
import ProjectCarousel from "@/components/project-carousel"
import ThreeDObject from "@/components/3d-object"

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  const certifications = [
    { title: "Google Cybersecurity Specialization", year: "2024", color: "blue" },
    {
      title: "IBM Certification - Penetration Testing, Incident Response and Forensics",
      year: "2024",
      color: "indigo",
    },
    { title: "Mastercard: Cybersecurity Job Simulation", year: "2024", color: "purple" },
    { title: "JPMorgan Chase & Co.: Cybersecurity Job Simulation", year: "2024", color: "pink" },
    { title: "PwC Switzerland: Cybersecurity Job Simulation", year: "2024", color: "red" },
    { title: "Commonwealth Bank: Introduction to Cybersecurity", year: "2024", color: "orange" },
  ]

  const projects = [
    {
      title: "Real-Time Incident Response Web App",
      description:
        "Built a machine learning model combining Random Forest and Autoencoders for attack detection with 95% accuracy in identifying anomalies.",
      github: "https://github.com/Recklxz/Real-Time-IDS",
      color: "purple",
    },
    {
      title: "Pico Logger - USB HID Security Research",
      description:
        "Developed a Raspberry Pi Pico-based USB device simulating keystroke logging capabilities with Ducky Script implementation.",
      github: "https://github.com/Recklxz/pico-logger",
      color: "yellow",
    },
    {
      title: "Snowdenware - Ransomware Analysis",
      description:
        "Developed a basic ransomware simulation using Python for educational purposes and understanding defense strategies.",
      github: "https://github.com/Recklxz/snowdenware",
      color: "blue",
    },
  ]

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-600 to-pink-500 overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/placeholder.svg?height=2000&width=2000')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: backgroundY,
        }}
      />

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="p-4 sticky top-0 bg-black/30 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="relative">
              <div className="bg-yellow-400 rotate-12 absolute -top-1 -left-1 p-2 rounded-lg">
                <span className="text-xs font-bold">CYBERSECURITY SPECIALIST</span>
              </div>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
                {isMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
              </button>
            </div>

            <div
              className={`${isMenuOpen ? "flex" : "hidden"} md:flex absolute md:relative top-16 md:top-0 left-0 right-0 md:right-auto bg-black/90 md:bg-transparent flex-col md:flex-row items-center gap-4 p-4 md:p-0`}
            >
              <Link href="#about" className="text-white hover:text-pink-200 transition-colors">
                About me
              </Link>
              <Link href="#portfolio" className="text-white hover:text-pink-200 transition-colors">
                My portfolio
              </Link>
              <Link href="#certifications" className="text-white hover:text-pink-200 transition-colors">
                Certifications
              </Link>
              <Link href="#contacts" className="text-white hover:text-pink-200 transition-colors">
                Contact
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Link href="https://github.com/Recklxz" className="text-white hover:text-pink-200 transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com/in/anmolkool"
                className="text-white hover:text-pink-200 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="max-w-6xl mx-auto px-4 py-12 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-8"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                  CYBER
                </span>
                <br />
                SECURITY
                <br />
                SPECIALIST
              </h1>
              <p className="text-xl text-pink-100 max-w-lg">
                Expertise in penetration testing, threat detection, and security automation. Let's secure your digital
                assets!
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                {["Python", "C", "Bash", "Wireshark", "Metasploit", "Kali Linux"].map((skill) => (
                  <span
                    key={skill}
                    className="bg-white/10 px-4 py-2 rounded-full text-sm text-white hover:bg-white/20 transition-colors duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <a
                  href="#portfolio"
                  className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-full hover:from-pink-600 hover:to-purple-600 transition-colors duration-300"
                >
                  Explore My Work
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-500 rounded-3xl transform rotate-3"></div>
              <IDCard className="relative z-10 transform -rotate-3 hover:rotate-0 transition-transform duration-300" />
            </motion.div>
          </div>
        </main>

        {/* 3D Object Section */}
        <section className="py-16 bg-black/20 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
            >
              INTERACTIVE SECURITY
            </motion.h2>
            <div className="w-full max-w-md mx-auto">
              <ThreeDObject />
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600" id="certifications">
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
            >
              CERTIFICATIONS
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <CertificationCard key={index} {...cert} />
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="bg-black py-16" id="portfolio">
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-12 text-center"
            >
              PROJECTS
            </motion.h2>
            <ProjectCarousel projects={projects} />
          </div>
        </section>

        {/* Core Skills */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
            >
              CORE SKILLS
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Threat Detection & Response | ML-driven IDS (95% accuracy) | Wireshark/Splunk analysis",
                "Penetration Testing | Metasploit/Burp Suite | NIST compliance",
                "Security Automation | Python/Bash scripting | Kali Linux tools",
                "Collaborative Problem-Solving | Cross-team workflows",
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm p-6 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <p className="text-white/90">{skill}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-black/20 backdrop-blur-sm" id="contacts">
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
            >
              GET IN TOUCH
            </motion.h2>
            <div className="flex justify-center space-x-6">
              <Link href="mailto:anmolkool076@gmail.com" className="text-white hover:text-pink-200 transition-colors">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </motion.div>
              </Link>
              <Link href="https://github.com/Recklxz" className="text-white hover:text-pink-200 transition-colors">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Github className="h-12 w-12" />
                </motion.div>
              </Link>
              <Link
                href="https://linkedin.com/in/anmolkool"
                className="text-white hover:text-pink-200 transition-colors"
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Linkedin className="h-12 w-12" />
                </motion.div>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white py-8">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p>&copy; 2025 Anmol Kool. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

