"use client"
import { usePathname } from "next/navigation"

type Props = {
    
    children?: React.ReactNode;
}

export default function FloatingButton({children}:Props) {
    const pathname = usePathname()
    if (pathname === '/') {
        return (
            <button className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10 flex justify-center items-center w-40 h-12 rounded-xl bg-white text-blue-900 hover:bg-transparent hover:border-amber-50 hover:border-2 hover:text-white" onClick={() => console.log("clicked")}> {children} </button>
        )
    } else {
        return null
    }
}

