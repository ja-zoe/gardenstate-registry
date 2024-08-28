import NJOutline from "@/components/NJOutline"
import Link from "next/link"

const HomePage = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center relative">

      <div className="flex flex-col items-center text-center lg:text-start lg:items-start lg:ps-14 flex-1">
        <p className="z-10 underline text-2xl sm:text-4xl lg:text-[3rem] lg:leading-[1.2] max-w-[35rem] lg:w-full lg:max-w-[50rem]">Search the NJ Department of Community Affairs for Property Registration Data by Municipality</p>
        <Link href='/search' className="z-10 border-2 text-3xl rounded-2xl px-4 py-2 mt-4 hover:bg-white transition-colors hover:text-black">Get Started</Link>
      </div>

      <div className="absolute w-screen lg:w-auto lg:relative flex justify-center items-center flex-1 h-screen overflow-hidden">
        <NJOutline className='w-80 lg:w-auto lg:h-full lg:rotate-6' />
      </div>

    </div>
  )
}
export default HomePage