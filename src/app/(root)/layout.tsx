import Navbar from "@/components/Navbar"
import React from "react"

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  console.log('yuh')
  return (
    <div className="flex flex-col">
        <Navbar />
        {children}
    </div>
  )
}
export default RootLayout