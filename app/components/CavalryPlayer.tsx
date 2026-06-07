'use client'
import { useEffect, useRef } from 'react'

type Props = {
  src: string
  width?: number
  height?: number
}

export default function CavalryPlayerComponent({ src, width = 800, height = 600 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let player: any

    async function init() {
      const { CavalryPlayer } = await import(/* webpackIgnore: true */ '/cavalry/CavalryPlayer.js')
      
      player = new CavalryPlayer(containerRef.current, {
        autoplay: true,
        sceneInput: false,
      })

      // 加载 .cv 文件
      const res = await fetch(src)
      const buffer = await res.arrayBuffer()
      await player.loadScene(new Uint8Array(buffer), 'scene.cv')
    }

    init()

    return () => {
      player?.stop()
    }
  }, [src])

  return (
    <div
      ref={containerRef}
      style={{ width, height }}
    />
  )
}