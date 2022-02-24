import Nav from '@/components/Nav';
import Image from 'next/image';
import headerStyle from '../Header/header.module.scss';
import ChartBarIcon from '@heroicons/react/outline/ChartBarIcon';
import ShimmerPlaceholder from '@/components/Skeletons/ShimmerPlaceholder';

const StatsHeader = () => {
    return (
        <header className={`relative w-full flex flex-col place-items-center min-h-[300px] h-[300px] overflow-hidden`}>
            <div className='relative w-full z-30'>
                <Nav />
            </div>
            <span className={headerStyle.main_overlay}></span>
            <span className={headerStyle.right_overlay}></span>
            <span className={headerStyle.left_overlay}></span>
            <Image
                placeholder='blur'
                blurDataURL={`data:image/svg+xml;base64,${ShimmerPlaceholder(100, 100)}`}
                priority
                quality={90}
                src={'/assets/images/statsbg.jpg'}
                className={`object-cover`}
                layout="fill"
                alt='header-bg'
            />
            <div className='flex gap-4 w-full absolute top-3/4 md:top-1/2 -translate-y-1/2 place-content-center place-items-center z-20'>
                <ChartBarIcon width={40} height={40} color={'white'} /> <h1 className='text-3xl text-white font-bold'>Movies Statistics</h1>
            </div>
        </header>
    )
}

export default StatsHeader;