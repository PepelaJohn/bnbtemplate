import React from 'react'

const Container = ({children, className}:{children:React.ReactNode, className?:string}) => {
  return (
    <div className={`max-md:px-10 max-sm:px-5 mx-auto max-[400px]:px-2 w-full max-[1520px]:px-20 max-w-[1520px] ${className}`}>{children}</div>
  )
}

export default Container