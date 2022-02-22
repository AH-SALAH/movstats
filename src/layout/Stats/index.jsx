import { useState, useEffect, useCallback } from 'react';
import { getTopRated } from '@/data/movies';
import StatsHeader from './StatsHeader';
import BarChart from './Charts/Barchart';

const Stats = () => {
    let [top10Movies, setTop10Movies] = useState([]);


    let top10 = useCallback(async () => {
        let { data } = await getTopRated();
        setTop10Movies(data);
    }, []);

    useEffect(() => {
        top10();
    }, [top10]);

    return (
        <>
            <StatsHeader />
            <BarChart
                data={
                    top10Movies?.results?.slice(0,10)?.map(m => { return { name: m.title, rating: m.vote_average } })
                }
                xLabel={' ⬅ Movies '}
                yLabel={'Rating 📉 '}
                header={'Top 10 Rated Movies'}
            />
            <BarChart
                data={
                    top10Movies?.results?.slice(0,10)?.map(m => { return { name: m.title, rate_count: m.vote_count } })
                }
                shortenYnumber
                xLabel={' ⬅ Movies '}
                yLabel={'How Many Votes 📉 '}
                header={'Total Times Rating'}
            />
        </>
    )
};

export default Stats;