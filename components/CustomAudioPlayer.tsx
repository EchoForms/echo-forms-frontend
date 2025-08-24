"use client"

import React, { useState, useEffect } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import '@/styles/audio-player.css'

interface CustomAudioPlayerProps {
  src: string
  className?: string
  defaultDuration?: number
  layout?: 'horizontal' | 'horizontal-reverse' | 'stacked' | 'stacked-reverse'
}

export const CustomAudioPlayer: React.FC<CustomAudioPlayerProps> = ({
  src,
  className = '',
  defaultDuration,
  layout = 'horizontal-reverse'
}) => {
  const [audioDuration, setAudioDuration] = useState<number>(defaultDuration || 0)

  useEffect(() => {
    if (defaultDuration) {
      setAudioDuration(defaultDuration)
    }
  }, [defaultDuration])

  if (!src) {
    return null
  }

  return (
    <div className={className}>
      <AudioPlayer
        src={src}
        autoPlay={false}
        layout={layout}
        defaultDuration={audioDuration}
        preload="metadata"
        className="custom-audio-player"
        onLoadedMetaData={(e) => {
          const audio = e.target as HTMLAudioElement
          if (audio.duration && isFinite(audio.duration)) {
            setAudioDuration(audio.duration)
          }
        }}
        showSkipControls={false}
        showJumpControls={false}
        showFilledVolume={true}
      />
    </div>
  )
}

export default CustomAudioPlayer