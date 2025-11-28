"use client"

import Button from "./Button"
import { usePathname } from "next/navigation"

export default function Header() {
    const pathname = usePathname()
    if (pathname === '/') {
        return (
            <Button onClick={() => console.log("click")}> submit project </Button>
        )
    } else {
        return null
    }
}

