import { List } from 'react-content-loader';
import { useSelector } from 'react-redux';

const RightSlice = ({ data }) => {
    let { loading } = useSelector((state) => state.movies);

    return (
        <div className="relative right-slice flex w-full lg:w-1/2 py-16 lg:px-20 px-10 place-content-center place-items-center text-white">
            <p className='z-10 text-lg flex w-full h-full place-content-center place-items-center'>
                {
                    (!data || loading) && <List uniqueKey="list-loading" width={'100%'} height={'100%'} foregroundColor='#575656' style={{ width: '100%', height: '100%' }} />
                    ||
                    data?.overview
                }
            </p>
        </div>
    )
}

export default RightSlice;