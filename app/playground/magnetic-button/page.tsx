'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const shapes = [
  { color: '#3B4FE0', type: 'circle', size: 180, x: '15%', y: '35%' },
  { color: '#4B3FBF', type: 'clover', size: 160, x: '28%', y: '10%' },
  { color: '#F5A800', type: 'hexagon', size: 150, x: '52%', y: '5%' },
  { color: '#9B3FC0', type: 'star', size: 180, x: '72%', y: '18%' },
  { color: '#F57200', type: 'square', size: 150, x: '70%', y: '60%' },
  { color: '#2A8C2A', type: 'triangle', size: 100, x: '25%', y: '80%' },
]

function Shape({ color, type, size }: { color: string; type: string; size: number }) {
  if (type === 'circle') {
    return (
      <div style={{
        width: size, height: size,
        borderRadius: '50%',
        backgroundColor: color,
      }} />
    )
  }
  if (type === 'square') {
    return (
      <div style={{
        width: size, height: size,
        backgroundColor: color,
      }} />
    )
  }
  if (type === 'triangle') {
    return (
      <div style={{
        width: 0, height: 0,
        borderLeft: `${size / 2}px solid transparent`,
        borderRight: `${size / 2}px solid transparent`,
        borderBottom: `${size}px solid ${color}`,
      }} />
    )
  }
  if (type === 'hexagon') {
    return (
      <div style={{
        width: size, height: size,
        backgroundColor: color,
        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
      }} />
    )
  }
  if (type === 'star') {
    return (
      <div style={{
        width: size, height: size,
        backgroundColor: color,
        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
      }} />
    )
  }
  if (type === 'clover') {
    return (
      <div style={{
        width: size, height: size,
        backgroundColor: color,
        borderRadius: '50% 50% 0 50% / 50% 50% 50% 0',
        boxShadow: `${size * 0.5}px 0 0 ${color}, 0 ${size * 0.5}px 0 ${color}, ${size * 0.5}px ${size * 0.5}px 0 ${color}`,
      }} />
    )
  }
  return null
}

export default function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const els = containerRef.current?.querySelectorAll('.shape')
    if (!els) return

    els.forEach((el) => {
      // 随机旋转，无限循环
      gsap.to(el, {
        rotation: gsap.utils.random(-360, 360),
        duration: gsap.utils.random(8, 20),
        repeat: -1,
        yoyo: true,
        ease: 'none',
      })

      // 随机漂浮上下
      gsap.to(el, {
        y: gsap.utils.random(-30, 30),
        duration: gsap.utils.random(2, 5),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        overflow: 'hidden',
      }}
    >
      {shapes.map((shape, i) => (
        <div
          key={i}
          className="shape"
          style={{
            position: 'absolute',
            left: shape.x,
            top: shape.y,
          }}
        >
          <Shape color={shape.color} type={shape.type} size={shape.size} />
        </div>
      ))}
    </div>
  )
}