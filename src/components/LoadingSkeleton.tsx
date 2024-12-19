import { Skeleton } from "./ui/skeleton";


import React from 'react'

const LoadingSkeleton = () => {
  return (
    <div  className="space-y-6 ">

      <div className="grid gap-6">

        <Skeleton className="h-[300px] w-full  rounded-lg"/>
        <Skeleton className="h-[300px] w-full  rounded-lg"/>



      </div>


      <div className="grid  md:grid-cols-2">

      <Skeleton className="h-[300px] w-full  rounded-lg"/>
        <Skeleton className="h-[300px] w-full  rounded-lg"/>



      </div>
    </div>
  ) 
}

export default LoadingSkeleton