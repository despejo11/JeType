'use client'

import * as THREE from 'three'
import { useMotionValue, useSpring } from 'framer-motion'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { motion } from 'framer-motion-3d'

export default function Model() {
  const { nodes, materials } = useGLTF('/images/other/torus.glb')
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
        scale={[1, 1, 1.5]}
      />
    </group>
  )
}
