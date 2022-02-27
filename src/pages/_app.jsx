import '../styles/global.scss';
import Footer from '../layout/Footer';
import { store } from '@/store';
import { Provider } from 'react-redux';
import GuestAuth from '@/components/Auth/useGuestAuth';
import { motion, AnimatePresence } from 'framer-motion';

const MyApp = ({ Component, pageProps, router }) => {

    return (
        <Provider store={store}>
            <GuestAuth>
                <AnimatePresence>
                    <motion.div key={router.route}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1] }}
                        exit={{ opacity: 0, filter: `contrast(300%)`, transition: { duration: 0.2 } }}
                    >
                        <>
                            <Component {...pageProps} />
                            <Footer />
                        </>
                    </motion.div>
                </AnimatePresence>
            </GuestAuth>
        </Provider>
    )
};

export default MyApp;
