import LeftSlice from './LeftSlice';
import RightSlice from './RightSlice';
import Nav from '@/components/Nav';
import Image from 'next/image';
import headerStyle from '@/layout/Header/header.module.scss';
import Slider from '@/components/Slider';
import { useRouter } from 'next/router';
import { useEffect, useCallback } from 'react';
import ShimmerPlaceholder from '@/components/Skeletons/ShimmerPlaceholder';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovieDetails } from '@/store/features/movies/moviesSlice';


const Details = () => {
    let router = useRouter();
    let { movieDetails: movie, loading } = useSelector((state) => state.movies);
    let dispatch = useDispatch();

    let movieDetails = useCallback(async (id) => {
        dispatch(fetchMovieDetails(id));
    }, [dispatch]);

    useEffect(() => {
        if (router?.query?.id) movieDetails(router?.query?.id);
    }, [movieDetails, router?.query?.id]);

    return (
        <>
            <header className='relative w-full flex flex-col place-items-center lg:min-h-[700] h-full overflow-hidden'>
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
                    src={'/assets/images/mwp.jpg'}
                    className={`object-cover lg:aspect-video aspect-auto transition-all duration-1000 ${!movie?.backdrop_path || loading && 'blur-sm sepia-[20%] opacity-100' || 'opacity-0'}`}
                    layout="fill"
                    alt='header-bg'
                />
                <Image
                    placeholder='blur'
                    blurDataURL={`data:image/svg+xml;base64,${ShimmerPlaceholder(100, 100)}`}
                    priority
                    quality={90}
                    src={process.env.NEXT_PUBLIC_MOVIEDB_BASEIMGURL + '/w1280' + movie?.backdrop_path}
                    className={`object-cover lg:aspect-video aspect-auto transition-all duration-1000 ${!movie?.backdrop_path && 'opacity-0' || 'opacity-100'}`}
                    layout="fill"
                    alt='header-bg'
                />
                <div className='w-full h-full z-30 flex flex-wrap'>
                    <LeftSlice data={movie} />
                    <RightSlice data={movie} />
                </div>
                <div className={'bg-zinc-900 opacity-30 absolute bottom-0 h-1/4 w-full lg:top-0 lg:left-auto right-0 left-0 rounded-3xl lg:w-1/2 lg:h-full'} ></div>
                <div className={'opacity-30 absolute top-0 left-0 bg-gradient-to-r from-black via-black rounded-3xl w-1/3 h-full'} ></div>
            </header>
            <Slider data={movie} title={'Similar Movies'} />
        </>
    )
}

export default Details;