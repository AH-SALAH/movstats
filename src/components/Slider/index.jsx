import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import Card from '../Card';

const Slider = ({ data: { similar }, title }) => {

    return (
        <div className='py-10'>
            {
                title &&
                <div className='w-11/12 text-center mx-auto flex place-content-center place-items-center rounded-xl mb-8 bg-zinc-100 shadow-xl border-[1px] border-indigo-600'>
                    <h2 className='text-3xl font-extrabold px-4'>{title}</h2>
                </div>
            }
            {
                similar?.results &&
                <Splide
                    Extensions={{ AutoScroll }}
                    hasAutoplayProgress
                    options={{
                        rewind: true,
                        width: '100%',
                        gap: '1rem',
                        type: 'loop',
                        perPage: 6,
                        // autoplay: true,
                        perMove: 3,
                        focus: 'center',
                        arrows: false,
                        pagination: false,
                        breakpoints: {
                            640: {
                                perPage: 2,
                            },
                            768: {
                                perPage: 3,
                            },
                        },
                        drag: 'free',
                        autoScroll: {
                            speed: 2,
                            rewind: true
                        },
                    }}
                >
                    {
                        similar?.results.map(d =>
                            <SplideSlide key={d.id}>
                                <Card data={d} w={'w-full'} />
                            </SplideSlide>
                        )
                        ||
                        ''
                    }
                </Splide>
                ||
                ''
            }
        </div>
    )
}

export default Slider;