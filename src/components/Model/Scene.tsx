'use client'

import Model from './Model'
import { Canvas } from '@react-three/fiber'

export default function Scene() {
  return (
    <Canvas
      style={{
        width: 'clamp(16.25rem, -0.568rem + 84.09vw, 62.5rem)',
        height: 'clamp(16.25rem, -0.568rem + 84.09vw, 62.5rem)',
      }}
    >
      <directionalLight intensity={4.5} position={[0, 0, 1]} />
      <Model />
    </Canvas>
  )
}
