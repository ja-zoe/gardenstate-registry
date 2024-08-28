import Link from "next/link"
import MobileNav from "./MobileNav"

const Navbar = () => {
    const links = [
        {
            text: 'GardenStateRegistry',
            href: '/'
        },
        {
            text: 'About',
            href: '/about'
        },
        {
            text: 'Login',
            href: '/'
        }
    ]

  return (
    <header className="fixed flex justify-center lg:justify-start mt-5 w-full px-3 z-20">
        <nav className="hidden sm:flex justify-between border-2 rounded-3xl py-3 px-4 w-[38rem] lg:w-7/12">
            {links.map(link => {
                return (
                    <Link key={link.text} className="transition-colors hover:bg-white hover:text-black rounded-3xl text-xl px-2 py-1" href={link.href}>{link.text}</Link>
                )
            })}
        </nav>

        <nav className="flex justify-between items-center border-2 rounded-3xl py-3 px-4 w-full sm:hidden">
            <Link href='/' className="text-lg font-bold">GardenStateRegistry</Link>
            <MobileNav />
        </nav>

    </header>
  )
}
export default Navbar