import React from 'react'

export default function VenueSkeleton() {
  return (
    <>
    <div className="flex flex-col gap-4 w-full max-w-[800px]">
    <div className="skeleton  h-52 w-full"></div>
    <div className="skeleton  h-4 w-28"></div>
    <div className="skeleton  h-4 w-full"></div>
    <div className="skeleton  h-4 w-full"></div>
    </div>
      
    </>
  )
}
