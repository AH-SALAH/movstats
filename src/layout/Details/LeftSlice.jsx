import Image from 'next/image';
import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';
import CalendarIcon from '@heroicons/react/outline/CalendarIcon';
import CurrencyDollarIcon from '@heroicons/react/outline/CurrencyDollarIcon';
import TranslateIcon from '@heroicons/react/outline/TranslateIcon';
import GlobeAltIcon from '@heroicons/react/outline/GlobeAltIcon';
import ArrowCircleLeftIcon from '@heroicons/react/outline/ArrowCircleLeftIcon';
import PauseIcon from '@heroicons/react/outline/PauseIcon';
import UserGroupIcon from '@heroicons/react/outline/UserGroupIcon';
import { formatedDate } from '@/utils/formatDate';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatMins } from '@/utils/formatMins';
import { useRouter } from 'next/router';
import { BulletList } from 'react-content-loader';
import { rateTheMovie } from '@/store/features/movies/moviesSlice';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const LeftSlice = ({ data }) => {
    let router = useRouter();
    let [rated, setRated] = useState(false);
    let { loading } = useSelector((state) => state.movies);
    let [ratedNow, setRatedNow] = useState(false);
    let dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('rated_movie_' + router?.query?.id)) {
            setRated(true);
        }
    }, [router?.query?.id]);

    let handleRatedNow = () => {
        setRatedNow(true);
        setTimeout(() => {
            setRatedNow(false);
        }, 3000);
    };

    let handleRate = async (value) => {
        await dispatch(rateTheMovie({ movie_id: data?.id, value }));
        setRated(true);
        handleRatedNow();
    };

    return (
        <div className="left-slice flex w-full lg:w-1/2 py-16 lg:px-20 px-10 text-white flex-col place-content-start place-items-start">
            {
                (!data || loading) && <BulletList uniqueKey="bullet-loading" foregroundColor='#575656' className={`w-10/12 h-full lg:h-[500px]`} />
                ||
                <>
                    <div className='mb-8'>
                        <button type='button' title='back' className='hover:text-zinc-500' role={'navigation'} onClick={() => router.back()}>
                            <ArrowCircleLeftIcon width={50} height={50} />
                        </button>
                    </div>
                    <div className='mb-5'>
                        <h1 className='text-2xl'>{data?.title}</h1>
                        <small>{data?.tagline}</small>
                    </div>
                    <div className='flex gap-4 place-items-center flex-wrap mb-5'>
                        <time className='flex gap-3 place-items-center'><CalendarIcon width={20} height={20} /> {formatedDate(data.release_date)}</time>
                        <span className='flex gap-3'>
                            {
                                data?.genres &&
                                data?.genres?.map(g =>
                                    <span key={g.id} className={'rounded-3xl bg-indigo-700 px-3'}>{g.name}</span>
                                )
                                ||
                                ''
                            }
                        </span>
                    </div>
                    <div className='flex place-content-between gap-3 mb-5'>
                        <span>
                            <CurrencyDollarIcon width={20} height={20} color={'gold'} />
                        </span>
                        <div className='flex place-content-between gap-4 '>
                            <div><span>Budget: </span>{formatCurrency().format(data.budget)}</div>
                            <div><span>Revenue: </span>{formatCurrency().format(data.revenue)}</div>
                        </div>
                    </div>
                    <div className='flex gap-3 mb-5'>
                        <span>
                            <TranslateIcon width={20} height={20} />
                        </span>
                        {
                            data?.spoken_languages &&
                            data?.spoken_languages?.map(l => <span key={l.english_name}>{l.english_name}</span>)
                            ||
                            ''
                        }
                    </div>
                    <div className='flex place-items-center gap-3 mb-5'>
                        <span>
                            <PauseIcon width={20} height={20} />
                        </span>
                        <span>{formatMins(data.runtime)}</span>
                    </div>
                    <div className='flex flex-wrap gap-3 mb-5'>
                        <span>
                            <GlobeAltIcon width={20} height={20} />
                        </span>
                        {
                            data?.production_countries &&
                            data?.production_countries?.map(c => <span key={c.name}>{c.name}</span>)
                            ||
                            ''
                        }
                    </div>
                    <div className='flex flex-wrap gap-3 mb-5'>
                        <span>
                            <UserGroupIcon width={20} height={20} />
                        </span>
                        {
                            data?.credits &&
                            data?.credits?.cast?.slice(0, 3)?.map(c => <span key={c.name} className={'rounded-3xl bg-zinc-600 px-3'}>{c.name}</span>)
                            ||
                            ''
                        }
                        {
                            data?.credits?.cast && '+' + data?.credits?.cast?.length
                        }
                    </div>
                    <div className='flex gap-3 place-items-center mb-5'>
                        <span className='text-lg text-white'>{data.vote_average}</span>
                        <Rate allowHalf disabled={rated} value={data.vote_average * 5 / 10} onChange={handleRate} />
                        {
                            !rated &&
                            <span className='text-white text-lg'>{'👈 Rate this movie'}</span>
                            ||
                            ''
                        }
                        {
                            ratedNow &&
                            <span className='text-white text-lg'>{'👍 thank you!'}</span>
                            ||
                            ''
                        }
                    </div>
                    <div className='flex gap-3 flex-wrap mb-5'>
                        {
                            data?.production_companies &&
                            data?.production_companies?.map(c =>
                                c.logo_path &&
                                <div key={c.id}>
                                    <Image
                                        quality={85}
                                        src={process.env.NEXT_PUBLIC_MOVIEDB_BASEIMGURL + '/w200' + c.logo_path}
                                        // className={`object-cover`}
                                        layout="intrinsic"
                                        width={200}
                                        height={45}
                                        alt={c.name}
                                    />
                                </div>
                                ||
                                ''
                            )
                            ||
                            ''
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default LeftSlice;