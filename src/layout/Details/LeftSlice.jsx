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
import { motion } from 'framer-motion';


const TitleSection = ({ data }) => (
    <div className='mb-5'>
        <h1 className='text-2xl'>{data?.title || '🤷‍♀️'}</h1>
        <small>{data?.tagline}</small>
    </div>
);

const GenreSection = ({ data }) => (
    <div className='flex gap-4 place-items-center flex-wrap mb-5'>
        <time className='flex gap-3 place-items-center'><CalendarIcon width={20} height={20} /> {formatedDate(data?.release_date) || '🤷‍♀️'}</time>
        <span className='flex gap-3'>
            {
                data?.genres?.length &&
                data?.genres?.map(g =>
                    <span key={g.id} className={'rounded-3xl bg-indigo-700 px-3 max-w-[10em] overflow-hidden text-ellipsis whitespace-nowrap'}>{g.name}</span>
                )
                ||
                '🤷'
            }
        </span>
    </div>
);

const BudgetSection = ({ data }) => (
    <div className='flex place-content-start gap-3 mb-5'>
        <span>
            <CurrencyDollarIcon width={20} height={20} color={'gold'} />
        </span>
        <div className='flex place-content-between gap-4 '>
            <div><span>Budget: </span>{data?.budget && formatCurrency().format(data?.budget) || '🤷'}</div>
            <div><span>Revenue: </span>{data?.revenue && formatCurrency().format(data?.revenue) || '🤷'}</div>
        </div>
    </div>
);

const LanguageSection = ({ data }) => (
    <div className='flex gap-3 mb-5'>
        <span>
            <TranslateIcon width={20} height={20} />
        </span>
        {
            data?.spoken_languages?.length &&
            data?.spoken_languages?.map(l => <span key={l.english_name}>{l.english_name}</span>)
            ||
            '🤷'
        }
    </div>
);

const RunTimeSection = ({ data }) => (
    <div className='flex place-items-center gap-3 mb-5'>
        <span>
            <PauseIcon width={20} height={20} />
        </span>
        <span>{data?.runtime && formatMins(data?.runtime) || '🤷'}</span>
    </div>
);

const CountriesSection = ({ data }) => (
    <div className='flex flex-wrap place-items-center gap-3 mb-5'>
        <span>
            <GlobeAltIcon width={20} height={20} />
        </span>
        {
            data?.production_countries?.length &&
            data?.production_countries?.map(c => <span key={c.name}>{c.name}</span>)
            ||
            '🤷'
        }
    </div>
);

const CreditsSection = ({ data }) => (
    <div className='flex flex-wrap gap-3 mb-5'>
        <span>
            <UserGroupIcon width={20} height={20} />
        </span>
        {
            data?.credits?.cast?.length &&
            data?.credits?.cast?.slice(0, 3)?.map(c => <span key={c.name} className={'rounded-3xl bg-zinc-600 px-3'}>{c.name}</span>)
            ||
            '🤷'
        }
        {
            data?.credits?.cast && '+' + data?.credits?.cast?.length
        }
    </div>
);

const RateSection = ({ data }) => {
    let router = useRouter();
    let [rated, setRated] = useState(false);
    let [ratedNow, setRatedNow] = useState(false);
    let dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('rated_movie_' + router?.query?.id)) {
            setRated(true);
        }
    }, [router?.query?.id]);

    let handleRatedNow = () => {
        setRatedNow(true);
        let timeOut = setTimeout(() => {
            setRatedNow(false);
            clearTimeout(timeOut);
        }, 3000);
    };

    let handleRate = async (value) => {
        await dispatch(rateTheMovie({ movie_id: data?.id, value }));
        setRated(true);
        handleRatedNow();
    };

    return (
        <div className='flex gap-3 place-items-center mb-5'>
            <span className='text-lg text-white'>{data?.vote_average}</span>
            <Rate allowHalf disabled={rated} value={data?.vote_average * 5 / 10} style={{ fontSize: '1.45rem' }} onChange={handleRate} />
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
    )
};

const CompaniesSection = ({ data }) => (
    <div className='flex gap-3 flex-wrap mb-5'>
        {
            data?.production_companies.length &&
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
);

const BackBtn = () => {
    let router = useRouter();
    return (
        <div className='mb-8'>
            <button type='button' title='back' className='hover:text-zinc-500' role={'navigation'} onClick={() => router.back()}>
                <ArrowCircleLeftIcon width={50} height={50} />
            </button>
        </div>
    )
};


const LeftSlice = ({ data }) => {
    let loading = useSelector((state) => state.movies.loading);

    let dataList = ({ data: dta }) => [
        { id: 'TitleSection', c: <TitleSection data={dta} /> },
        { id: 'GenreSection', c: <GenreSection data={dta} /> },
        { id: 'BudgetSection', c: <BudgetSection data={dta} /> },
        { id: 'LanguageSection', c: <LanguageSection data={dta} /> },
        { id: 'RunTimeSection', c: <RunTimeSection data={dta} /> },
        { id: 'CountriesSection', c: <CountriesSection data={dta} /> },
        { id: 'CreditsSection', c: <CreditsSection data={dta} /> },
        { id: 'RateSection', c: <RateSection data={dta} /> },
        { id: 'CompaniesSection', c: <CompaniesSection data={dta} /> },
    ];

    let parentVariants = {
        start: { opacity: 0 },
        end: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 2.5
            }
        }
    };

    let chldVariants = {
        start: { x: -20, opacity: 0 },
        end: { x: 0, opacity: 1 }
    };

    return (
        <div className={`left-slice flex w-full h-full lg:min-h-[600px] lg:w-1/2 py-16 lg:px-20 px-10 text-white flex-col ${loading && 'place-content-center' || 'place-content-start'} place-items-start`}>
            {
                (!data || loading) && <BulletList uniqueKey="bullet-loading" viewBox='0 0 360 225' foregroundColor='#575656' className={`w-10/12 h-full lg:pt-14`} />
                ||
                <>
                    <BackBtn />
                    <motion.ul
                        initial={"start"}
                        animate={"end"}
                        variants={parentVariants}
                    >
                        {
                            dataList({ data }).map((d, i) =>
                                <motion.li
                                    key={d.id}
                                    variants={chldVariants}
                                >
                                    {d.c}
                                </motion.li>
                            )
                        }
                    </motion.ul>
                </>
            }
        </div >
    )
}

export default LeftSlice;