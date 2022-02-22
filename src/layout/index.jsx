import Header from './Header';
// import Footer from './Footer';
import Main from './Main';

const Layout = ({ children }) => {
    return (
        <div className="w-full antialiased text-gray-700">
            <Header />
            <Main>
                {children}
            </Main>
            {/* <Footer /> */}
        </div>
    )
}

export default Layout