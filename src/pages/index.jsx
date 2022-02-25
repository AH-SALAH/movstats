import { Meta } from '@/components/Meta';
import CustomHead from '@/components/CustomHead';
import Card from '@/components/Card';
import Layout from '@/layout';
import { useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import PaginationC from '@/components/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllMovies, searchAllMovies } from '../store/features/movies/moviesSlice';
import Loading from "@/components/Skeletons/Loading";
import Sort from '@/components/Sort';
import { formatCurrency } from '@/utils/formatCurrency';

const Index = () => {
    let router = useRouter();
    let { moviesData: popular, loading, searchValue, sortValue } = useSelector((state) => state.movies);
    let dispatch = useDispatch();
    let mainDivRef = useRef(null);

    let popularMovies = useCallback(async (page, searchq) => {
        // if there is search query search by else get all movies
        if (searchq) dispatch(searchAllMovies({ searchValue: searchq, page }));
        else dispatch(fetchAllMovies(page));
        if (page && window !== undefined) window?.scrollTo({ top: (mainDivRef?.current?.offsetTop - parseInt(window?.getComputedStyle(mainDivRef?.current, null).getPropertyValue('padding-top'))), behavior: 'smooth' });
    }, [dispatch]);


    useEffect(() => {
        // if there sorting operation then ignore here as sorting 
        // already requesting it's data
        if(sortValue) return;
        // search with some sort of debounce
        let timeOut = 0;
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            popularMovies(router?.query?.page, searchValue);
        }, 1200);
        return () => clearTimeout(timeOut);
    }, [router?.query?.page, popularMovies, searchValue]);

    let formatTotals = ttl => formatCurrency().format(ttl).replace(/(^[\w$]{1}|(\..)*)/gi, '');

    return (
        <>
            <CustomHead
                meta={
                    <Meta
                        title="Movie DB"
                        description="Movie DB Analysis"
                    />
                }
            />
            <Layout>

                <section ref={mainDivRef} className='w-full flex gap-3 flex-wrap place-content-center'>
                    {
                        loading && (<Loading />)
                        ||
                        <>
                            {
                                popular?.results?.length &&
                                popular?.results?.map(m => <Card key={m.id} data={m} />)
                                ||
                                <h3 className='text-xl w-full grid place-content-center h-96'>
                                    No Results
                                    {' 🙄 '}
                                </h3>
                            }
                            {
                                popular?.total_pages &&
                                <div className='w-full flex place-content-center place-items-center gap-2 flex-wrap'>
                                    <PaginationC total={popular?.total_results} /> <span>{formatTotals(popular?.total_results)} results - {formatTotals(popular?.total_pages)} page</span>
                                </div>
                                ||
                                ''
                            }
                        </>
                    }

                    <Sort mainDivRef={mainDivRef} />

                </section>
            </Layout>
        </>
    );
};

export default Index;
