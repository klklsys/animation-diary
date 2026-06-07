'use client'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

type Props = {
  src: string
  width?: number | string
  height?: number | string
}

export default function LottiePlayer({ src, width = '100%', height = 'auto' }: Props) {
  const [animationData, setAnimationData] = useState(null)

  useEffect(() => {
    fetch(src)
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
  }, [src])

  if (!animationData) return null

  return (
    <div style={{ width, height }}>
      <Lottie animationData={animationData} loop={true} autoplay={true} />
    </div>
  )
}