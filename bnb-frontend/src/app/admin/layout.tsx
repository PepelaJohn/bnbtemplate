import ProtectedRoute from '@/components/ProtectedRoute'
import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <>
        <ProtectedRoute adminOnly={true} >
            {children}
        </ProtectedRoute>
    </>
  )
}

export default layout