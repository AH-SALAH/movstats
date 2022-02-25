import Link from "next/link";
import Image from "next/image";
import { AppConfig } from '@/utils/AppConfig';
import HomeIcon from '@heroicons/react/outline/HomeIcon';
import ChartBarIcon from '@heroicons/react/outline/ChartBarIcon';
import navStyle from './menu.module.scss';
import { useRouter } from "next/router";


let navLinks = [
    {
        title: 'Home',
        href: '/',
        icon: <HomeIcon width={25} height={25} />
    },
    {
        title: 'Stats',
        href: '/stats',
        icon: <ChartBarIcon width={25} height={25} />
    },
];

const Nav = () => {
    let router = useRouter();

    return (
        <div className="w-full flex place-content-center md:place-content-start place-items-center px-6 md:px-14 py-5 flex-wrap">
            <div className="text-2xl font-bold text-zinc-100 text-center w-full md:w-auto md:mr-10 flex place-content-center md:place-content-start place-items-center gap-2">
                <Link href="/">
                    <a className="gap-2 text-zinc-100 border-none flex place-items-center">
                        <Image src={'/android-chrome-192x192.png'} width={50} height={50} alt={'logo'} layout={'fixed'} /> {AppConfig.title}
                    </a>
                </Link>
            </div>
            <ul className={`${navStyle.menu} flex flex-wrap gap-4 text-lg place-content-center place-items-center md:place-items-end pt-6 md:pt-0 text-center`}>
                {
                    navLinks?.map(l => (
                            <li key={l.title} className="text-center flex place-content-center md:place-content-start">
                                <Link href={`${l.href}`}>
                                    <a className={`${router.asPath === l.href && navStyle.activeLink || ''} bg-zinc-800 md:bg-transparent px-2 py-1 rounded-xl mb-4 md:mb-0 text-zinc-100 hover:text-indigo-600 border-none flex place-items-center gap-1`}>
                                        {l.icon} <span>{l.title}</span>
                                    </a>
                                </Link>
                            </li>
                        )
                    )
                }
            </ul>
        </div>
    )
}

export default Nav;