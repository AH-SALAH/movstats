import { List } from 'react-content-loader';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';


const RightSlice = ({ data }) => {
    let router = useRouter();
    let { loading } = useSelector((state) => state.movies);

    return (
        <div className="relative right-slice flex w-full lg:w-1/2 py-16 lg:px-20 px-10 place-content-center place-items-center text-white">
            <p className='z-10 text-lg flex w-full h-full place-content-center place-items-center'>
                {
                    (!data || loading) && <List uniqueKey="list-loading" width={'100%'} height={'100%'} foregroundColor='#575656' style={{ width: '100%', height: '100%' }} />
                    ||
                    <AnimatePresence>
                        <motion.span
                            key={router?.asPath}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1, transition: { delay: 1 } }}
                            exit={{ x: 20, opacity: 0 }}
                        >
                            {
                                data?.overview
                            }
                        </motion.span>
                    </AnimatePresence>
                }
            </p>
        </div>
    )
}

export default RightSlice;