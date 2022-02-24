import { useEffect, useCallback } from 'react';
import StatsHeader from './StatsHeader';
import BarChart from './Charts/Barchart';
import { fetchTop10 } from '@/store/features/movies/moviesSlice';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '@/components/Skeletons/Loading';

const Stats = () => {
    let top10Movies = useSelector((state) => state.movies.top10);
    let loading = useSelector((state) => state.movies.loading);
    let dispatch = useDispatch();


    let top10 = useCallback(async () => {
        await dispatch(fetchTop10());
    }, [dispatch]);

    useEffect(() => {
        top10();
    }, [top10]);

    return (
        <>
            <StatsHeader />
            {
                loading && <Loading />
                ||
                <>
                    <BarChart
                        data={
                            top10Movies?.map(m => { return { name: m.title, rating: m.vote_average } })
                        }
                        xLabel={' ⬅ Movies '}
                        yLabel={'Rating 📊 '}
                        header={'Top 10 Rated Movies'}
                    />
                    <BarChart
                        data={
                            top10Movies?.map(m => { return { name: m.title, rate_count: m.vote_count } })
                        }
                        shortenYnumber
                        xLabel={' ⬅ Movies '}
                        yLabel={'How Many Votes 📊 '}
                        header={'Total Times Rating'}
                    />
                </>
            }
        </>
    )
};

export default Stats;