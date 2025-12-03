import Link from 'next/link'

const Navbar = () => {
    return (
        <header className="w-full bg-blue-600 text-white">
            <div className='flex justify-between p-4'>

            <div className="font-bold text-xl">
                <Link className="hover:text-blue-200" href={"/"}>LOGO</Link>
            </div>

            <nav>
                <ul className="flex gap-4 align-items-center" >
                    <li className="hover:text-blue-200"><Link href={"/promotions"}>Promotions</Link></li>
                    <li className="hover:text-blue-200"><Link href={"/ada-projects"}>Ada projects</Link></li>
                    <li className="hover:text-blue-200"><Link href={"/projects"}>Projects</Link></li>
                </ul>
            </nav>

            </div>
        </header>

    )

}

export default Navbar
