'use client'

import * as THREE from 'three'
import { useMotionValue, useSpring } from 'framer-motion'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { motion } from 'framer-motion-3d'

export default function Model() {
  const { nodes, materials } = useGLTF('/torus.glb')
  const { viewport } = useThree()
  const mesh = useRef<THREE.Mesh>(null)

  const options = { damping: 20 }

  const mouse = {
    x: useSpring(useMotionValue(0.6), options),
    y: useSpring(useMotionValue(0.4), options),
  }

  const manageMouseMove = (e: MouseEvent) => {
    const { innerWidth, innerHeight } = window
    const { clientX, clientY } = e
    const multiplier = 1.4

    const x = (-0.7 + clientX / innerWidth) * multiplier
    const y = (-0.5 + clientY / innerHeight) * multiplier

    mouse.x.set(x)
    mouse.y.set(y)
  }

  useEffect(() => {
    window.addEventListener('mousemove', manageMouseMove)
    return () => window.removeEventListener('mousemove', manageMouseMove)
  }, [])

  const [scale, setScale] = useState(0)

  useEffect(() => {
    let id: NodeJS.Timeout
    const startScale = 0
    const endScale = 1
    const duration = 1.4
    const fps = 60
    const totalFrames = duration * fps

    let currentFrame = 0

    const ease = (t: number) => {
      return t === 0
        ? 0
        : t === 1
        ? 1
        : t < 0.5
        ? Math.pow(2, 20 * t - 10) / 2
        : (2 - Math.pow(2, -20 * t + 10)) / 2
    }

    const animate = () => {
      currentFrame++
      const progress = currentFrame / totalFrames
      const easedProgress = ease(progress)
      const newScale = THREE.MathUtils.lerp(startScale, endScale, easedProgress)
      setScale(newScale)

      if (currentFrame < totalFrames) {
        id = setTimeout(animate, 1000 / fps)
      }
    }

    animate()

    return () => clearTimeout(id)
  }, [])

  useFrame((state, delta) => {
    if (mesh.current && window.innerWidth > 1000) {
      mesh.current.rotation.x = mouse.y.get()
      mesh.current.rotation.y = mouse.x.get()
      mesh.current.rotation.z += delta * 0.88
    } else if (mesh.current && window.innerWidth <= 1000) {
      mesh.current.rotation.x += delta * 0.58
      mesh.current.rotation.y += delta * 0.38
      mesh.current.rotation.z += delta * 0.78
    }
  })

  return (
    <group scale={viewport.width / 6}>
      <motion.mesh
        ref={mesh as any}
        geometry={(nodes.Torus as THREE.Mesh).geometry}
        material={materials['Material.001']}
        scale={[scale, scale, scale * 1.5]}
      />
    </group>
  )
}
