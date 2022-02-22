import Link from "next/link";
import Image from "next/image";
import { AppConfig } from '@/utils/AppConfig';
import HomeIcon from '@heroicons/react/outline/HomeIcon';
import ChartBarIcon from '@heroicons/react/outline/ChartBarIcon';

const Nav = () => {
    return (
        <div className="w-full flex place-content-start place-items-center px-14 py-5">
            <div className="text-2xl font-bold text-zinc-100 mr-10 flex place-content-start place-items-center gap-2">
                <Link href="/">
                    <a className="gap-2 text-zinc-100 border-none flex place-items-center">
                        <Image src={'/android-chrome-192x192.png'} width={50} height={50} alt={'logo'} layout={'fixed'} /> {AppConfig.title}
                    </a>
                </Link>
            </div>
            <ul className="flex flex-wrap text-lg place-content-center place-items-end">
                <li className="mr-6">
                    <Link href="/">
                        <a className="text-zinc-100 hover:text-indigo-600 border-none flex place-items-center gap-1">
                            <HomeIcon width={25} height={25} />
                        </a>
                    </Link>
                </li>
                <li className="mr-6">
                    <Link href="/stats">
                        <a className="text-zinc-100 hover:text-indigo-600 border-none flex place-items-center gap-1">
                            <ChartBarIcon width={25} height={25} /> <span>Stats</span>
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Nav;