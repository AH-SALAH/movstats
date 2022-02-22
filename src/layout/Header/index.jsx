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
        if (!searchValue || searchValue.length === 1) return;

        dispatch(searchAllMovies({ searchValue }));

    };

    let handleBlur = () => {
        if (searchValue) setOpenSearch(true);
        else setOpenSearch(false);
    };

    let handleChange = e => {
        if (e.target.value.length > 1) {
            // search with some sort of debounce
            let stt = 0;
            clearTimeout(stt);
            stt = setTimeout(() => {
                dispatch(setSearchValue(e.target.value));
                clearTimeout(stt);
            }, 700);

        }
        else {
            dispatch(setSearchValue(''));
        }
    };


    return (
        <header className={`relative w-full flex flex-col place-items-center min-h-[600px] h-[700px] overflow-hidden`}>
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
                className={`object-cover ${headerStyle.transform_img}`}
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
                        width={100}
                        height={100}
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
        </header>
    )
}

export default Header;