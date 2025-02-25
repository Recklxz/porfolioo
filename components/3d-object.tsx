"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls as OrbitControlsImpl } from 'three/examples/jsm/controls/OrbitControls.js'

interface ThreeDObjectProps {
  className?: string
}

export default function ThreeDObject({ className }: ThreeDObjectProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    })

    renderer.setSize(300, 300)
    mountRef.current.appendChild(renderer.domElement)

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Add point light
    const pointLight = new THREE.PointLight(0xffffff, 1)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    // Create torus knot
    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16)
    const material = new THREE.MeshPhongMaterial({
      color: 0xff6b6b,
      shininess: 60,
      specular: 0x004080
    })
    const torusKnot = new THREE.Mesh(geometry, material)
    scene.add(torusKnot)

    // Add controls
    const controls = new OrbitControlsImpl(camera, renderer.domElement)
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 2.0

    camera.position.z = 30

    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      if (!mountRef.current) return
      const width = mountRef.current.clientWidth
      const height = mountRef.current.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
      mountRef.current?.removeChild(renderer.domElement)
      controls.dispose()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div 
      ref={mountRef} 
      className={className} 
      style={{ width: '300px', height: '300px' }}
      aria-label="Interactive 3D Torus Knot"
    />
  )
}
