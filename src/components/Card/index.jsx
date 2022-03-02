import Image from 'next/image';
import cardStyle from './card.module.scss';
import ShimmerPlaceholder from '@/components/Skeletons/ShimmerPlaceholder';
import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';
import Link from 'next/link';
import CalendarIcon from '@heroicons/react/outline/CalendarIcon';
import { slugify } from '@/utils/slugify';
import { formatedDate } from '@/utils/formatDate';
import { motion } from 'framer-motion';


const Card = ({ data, w, h = 'h-auto' }) => {
    let { id, title, poster_path, release_date, vote_average } = data;

    return (
        <motion.div key={id} className={`relative ${w || 'w-1/2 md:w-1/3 lg:w-1/6'} ${h}`}
            whileTap={{
                transition: { duration: 0.2 },
                filter: [
                    `contrast(100%)`,
                    `contrast(200%)`,
                    `contrast(300%)`,
                    `contrast(100%)`,
                ]
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1] }}
        >
            <div id={id}>
                <Link as={`/details/${slugify(title)}/${id}`} href={'/details/[slug]/[id]'}>
                    <a className={`card cursor-pointer group border-0 hover:border-0 flex-col w-full relative h-96 rounded-xl overflow-hidden flex`} title={title} aria-label={'movie-card'} tabIndex={1}>
                        <div className={`${cardStyle.layover_light} z-10 rounded-b-2xl after:bottom-0 after:absolute shadow-lg after:left-0 after:right-0 after:w-full after:h-14 after:bg-gradient-to-t after:from-zinc-800 after:via-zinc-800 after:opacity-70 relative w-full h-full flex flex-grow group bg-cover overflow-hidden`}>
                            <span className="absolute left-3 bottom-3 z-10">
                                <p className="font-bold dark:text-zinc-200 text-zinc-100 line-clamp-2">{title}</p>
                            </span>
                            <Image
                                placeholder='blur'
                                blurDataURL={`data:image/svg+xml;base64,${ShimmerPlaceholder(100, 100)}`}
                                src={poster_path && process.env.NEXT_PUBLIC_MOVIEDB_BASEIMGURL + '/w200' + poster_path || '/assets/images/na.jpg'}
                                layout="fill"
                                quality={85}
                                className="w-full h-full transition-transform duration-300 group-hover:scale-[1.02] aspect-[inherit] object-fill"
                                alt={'movie'}
                            />
                        </div>

                        <div className='px-4 shrink lg:group-hover:animate-slidedown lg:animate-slideup transition-transform z-0 md:-translate-y-full mb-4'>
                            <div className='bg-indigo-400 rounded-b-2xl shadow-xl px-2 py-1 text-white'>
                                <time className="date flex place-items-start gap-2">
                                    <CalendarIcon width={15} height={15} />
                                    <small>{formatedDate(release_date) || <span>{' 🤷‍♀️'}</span>}</small>
                                </time>
                                <div className="rating flex place-items-center gap-2">
                                    <span className='text-black text-lg font-bold'>{'' + (vote_average).toFixed(1)}</span>
                                    <Rate allowHalf disabled value={vote_average * 5 / 10} className={cardStyle.rc_style} />
                                </div>
                            </div>
                        </div>
                    </a>
                </Link>
            </div>
        </motion.div>
    )
}

export default Card;