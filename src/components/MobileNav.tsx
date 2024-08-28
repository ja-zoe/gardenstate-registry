"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose
  } from "@/components/ui/sheet"
import { GiHamburger } from "react-icons/gi";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const MobileNav = () => {
    const links = [
        {
            href: '/',
            text: 'Home'
        },
        {
            href: '/about',
            text: 'About'
        },
        {
            href: '/login',
            text: 'Login'
        },
    ]

    const pathname = usePathname()
    return (
    <Sheet>
        <SheetTrigger><GiHamburger size={30}/></SheetTrigger>
        <SheetContent side='top' className="h-[30rem] pt-20 bg-black">
            <SheetHeader>
                <SheetTitle className="text-white text-2xl text-center"><Link href='/'>GardenStateRegistry</Link></SheetTitle>
            </SheetHeader>
            <div className="flex flex-col mt-20 gap-5">
                {links.map(link => (
                    <SheetClose key={link.text} asChild>
                        <Link className={cn('text-3xl p-2 rounded-lg', {'bg-white text-black': pathname === link.href})} href={link.href}>
                            {link.text}
                        </Link>
                    </SheetClose>
                ))}
            </div>
        </SheetContent>
    </Sheet>
  )
}
export default MobileNav