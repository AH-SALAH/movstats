import Nav from '@/components/Nav';
import Image from 'next/image';
import headerStyle from './header.module.scss';
import SearchIcon from '@heroicons/react/outline/SearchIcon'
import { useState } from 'react';
import { LoadingIcon } from '@/components/Skeletons/Loading';
import ShimmerPlaceholder from '@/components/Skeletons/ShimmerPlaceholder';
import { useSelector, useDispatch } from 'react-redux';
import { searchAllMovies, setSearchValue } from '@/store/features/movies/moviesSlice';

const Header = ({ img = '', hasSearch = true, title = '' }) => {
    let [openSearch, setOpenSearch] = useState(false);
    let loading = useSelector((state) => state.movies.loading);
    let searchValue = useSelector((state) => state.movies.searchValue);
    let dispatch = useDispatch();


    let handleSubmit = async e => {
        e.preventDefault();
        // if there is no value return
        if (!searchValue || searchValue.length === 1) return;

        dispatch(searchAllMovies({ searchValue }));

    };

    let handleBlur = () => {
        if (searchValue) setOpenSearch(true);
        else setOpenSearch(false);
    };

    let handleChange = e => {
        // update store with empty value if there is no value or less than 2 char
        if (!e.target.value || e.target.value.length < 2) {
            dispatch(setSearchValue(''));
            return;
        }
        // search with some sort of debounce
        let timeOut = 0;
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            dispatch(setSearchValue(e.target.value));
            clearTimeout(timeOut);
        }, 1200);

    };


    return (
        <header className={`relative w-full flex flex-col place-items-center min-h-[600px] h-[700px] overflow-hidden`}>
            <div className={`z-10 transition-all absolute top-0 bottom-0 left-0 right-0 w-full h-full opacity-0 ${headerStyle.animate_inifinte_scroll_with_op}`}></div>
            <div className='relative w-full z-30'>
                <Nav />
            </div>
            <span className={`${headerStyle.main_overlay} ${headerStyle.animate_scaleClipOuter}`}></span>
            <span className={headerStyle.right_overlay}></span>
            <span className={headerStyle.left_overlay}></span>
            <Image
                placeholder='blur'
                blurDataURL={`data:image/svg+xml;base64,${ShimmerPlaceholder(100, 100)}`}
                priority
                quality={90}
                src={img || '/assets/images/mwp.jpg'}
                className={`z-0 transition-all object-cover`}
                layout="fill"
                alt='header-bg'
            />
            {
                title && <h1>{title}</h1> || ''
            }
            {
                <div className={`w-40 h-40 top-1/3 -translate-y-1/3 relative z-30 flex place-content-center place-items-center`}>
                    <Image
                        priority
                        quality={90}
                        src={img || '/android-chrome-192x192.png'}
                        className={`object-cover opacity-80 ${headerStyle.animate_scaleClipInner}`}
                        layout="fill"
                        alt='header-logo'
                    />
                </div>
            }
            {
                hasSearch &&
                <form onSubmit={handleSubmit} className={`search flex place-self-center place-content-center place-items-center z-30 relative px-4 top-1/3 -translate-y-1/3 w-full lg:w-1/2`}>
                    <label htmlFor="search-movies" className={`rounded-3xl w-full relative flex place-content-center place-items-center`}>
                        <input disabled={loading} onFocus={() => setOpenSearch(true)} onBlur={handleBlur} onChange={handleChange} type="text" name="search-movies" placeholder='Search movies...' className={`${loading ? 'h-0 py-[1px]' : ' py-3'} px-4 rounded-3xl border-0 outline-none transition-all ${searchValue || openSearch ? 'w-full' : 'w-1/2'} placeholder:text-zinc-800 disabled:bg-zinc-300 ${headerStyle.inner_shadow} shadow-2xl`} />
                        {
                            loading &&
                            <LoadingIcon classes={'absolute right-3 w-8 h-8'} />
                            ||
                            <SearchIcon width={30} height={30} onClick={handleSubmit} className={`cursor-pointer absolute right-3 ${openSearch ? 'visible' : 'invisible'} `} />
                        }
                    </label>
                </form>
                ||
                ''
            }
            {
                <div style={{ background: `url(${'/assets/images/wave.svg'}) no-repeat scroll center center/cover` }} className={`object-cover w-screen h-20 -bottom-3 left-0 right-0 absolute z-30 flex place-content-center place-items-center`}>
                </div>
            }
        </header>
    )
}

export default Header;