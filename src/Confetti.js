import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

export default function Confettii(){
  let { width, height } = useWindowSize();
  return (
    <Confetti
      width={(width*3)/4}
      height={height}
      numberOfPieces={20}
      wind={0}
      gravity={0.1}
      opacity={0.9}
    />
  )
}