import React, { FC, ReactNode } from 'react'

export default function ViewContainer({ children }: { children: ReactNode }) {
  return (
    <div style={{ maxWidth: '960px', width: '90%', margin: '20px auto' }}>
      {children}
    </div>
  )
}
