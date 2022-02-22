import { AppConfig } from '@/utils/AppConfig';
import Moviedb from "@/public/assets/images/moviedb.svg";

const Footer = () => (
    <footer className="py-8 bg-indigo-700 text-white flex place-content-center place-items-center text-sm text-center border-t border-gray-300">
        © Copyright {new Date().getFullYear()} {AppConfig.title}. {' '}
        {/* <Image src={moviedb} width={100} height={50} alt={'moviedb'} /> */}
        <Moviedb width={100} height={50} />
    </footer>
);

export default Footer;
