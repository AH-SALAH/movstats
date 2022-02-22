import '../styles/global.scss';
import Footer from '../layout/Footer';
import { store } from '@/store';
import { Provider } from 'react-redux';
import GuestAuth from '@/components/Auth/useGuestAuth';

const MyApp = ({ Component, pageProps }) => {
    return (
        <Provider store={store}>
            <GuestAuth>
                <Component {...pageProps} />
                <Footer />
            </GuestAuth>
        </Provider>
    )
};

export default MyApp;
