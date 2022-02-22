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

const Index = () => {
    let router = useRouter();
    let { moviesData: popular, loading, searchValue } = useSelector((state) => state.movies);
    let dispatch = useDispatch();
    let mainDivRef = useRef(null);

    let popularMovies = useCallback(async (page, searchq) => {
        // search with some sort of debounce
        let stt = 0;
        clearTimeout(stt);
        stt = setTimeout(() => {
            // if there is search query search by else get all movies
            if (searchq) dispatch(searchAllMovies({ searchValue: searchq, page }));
            else dispatch(fetchAllMovies(page));
            if (page && window !== undefined) window?.scrollTo({ top: (mainDivRef?.current?.offsetTop - parseInt(window?.getComputedStyle(mainDivRef?.current, null).getPropertyValue('padding-top'))), behavior: 'smooth' });
            clearTimeout(stt);
        }, 850);
    }, [dispatch]);


    useEffect(() => {
        popularMovies(router?.query?.page, searchValue);
    }, [router?.query?.page, popularMovies, searchValue]);



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
                                popular?.results?.map(m => <Card key={m.id} data={m} />)
                            }
                            {
                                popular?.total_pages &&
                                <div className='w-full flex place-content-center place-items-center'>
                                    <PaginationC total={popular?.total_pages} size={null} />
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
