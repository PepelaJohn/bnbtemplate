'use client'
import Link from 'next/link'
import React, { useRef } from 'react'

type Props = {
    href:string
    className?:string
    link:string
}

const UnderlineComponent = (props: Props) => {
    const spanRef = useRef<HTMLSpanElement>(null)
    const {href, className, link} = props
    const handleMouseEnter = ()=>{
        if(spanRef.current){

           
            spanRef.current.style.scale = "1 1"
        }
    }
    const handleMouseLeave = ()=>{
        if(spanRef.current){
            
            spanRef.current.style.width = "100%"
            spanRef.current.style.scale = "0 1"
        }
    }


  return (
    <Link onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}  className={`relative flex ${className}`} href={href}>{link}
    <span ref={spanRef} className=' transition-all h-1 absolute -bottom-[2px] rounded-full bg-blue-300'></span>
    </Link>
  )
}

export default UnderlineComponent