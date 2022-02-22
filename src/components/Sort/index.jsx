import SortDescendingIcon from '@heroicons/react/outline/SortDescendingIcon';
import CheckCircleIcon from '@heroicons/react/outline/CheckCircleIcon';
import RefreshIcon from '@heroicons/react/outline/RefreshIcon';
import MenuPopover from '@/components/Popover';
import { RadioGroup } from '@headlessui/react';
import { useEffect, useCallback, forwardRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortAllMovies, fetchAllMovies, searchAllMovies } from '@/store/features/movies/moviesSlice';
import { useRouter } from 'next/router';


let sortOptions = [
    { "Sort by rate": "vote_average.desc" },
    { "Sort by release date": "release_date.desc" },
    { "Sort by popularity": "popularity.desc" }
];

const Sort = ({ mainDivRef }) => {
    let [selected, setSelected] = useState(null);
    let { searchValue } = useSelector((state) => state.movies);
    let dispatch = useDispatch();
    let router = useRouter();

    let handleSort = useCallback(async (page) => {
        dispatch(sortAllMovies({ sort_by: selected, page }));
        if (page && window !== undefined) window?.scrollTo({ top: (mainDivRef?.current?.offsetTop - parseInt(window?.getComputedStyle(mainDivRef?.current, null).getPropertyValue('padding-top'))), behavior: 'smooth' });
    }, [dispatch, mainDivRef, selected]);

    useEffect(() => {
        if (selected) handleSort(router?.query?.page);
    }, [selected, handleSort, router?.query?.page]);

    let handleReset = () => {
        setSelected(null);
        // respect search value
        if (searchValue) dispatch(searchAllMovies({ searchValue, page: router?.query?.page }));
        else dispatch(fetchAllMovies(router?.query?.page));
    };

    return (
        <div className='sort z-30 text-center fixed right-10 top-1/4 transform -translate-y-1/2 place-content-center place-items-center rounded-full w-10 h-10'>
            <MenuPopover ReferenceEl={forwardRef(function RefElComp(props, ref) {
                return (
                    <div className={`flex gap-2 relative ${selected && 'right-10' || ''}`}>
                        <button title='Sort' ref={ref} className='order-2 rounded-full flex place-content-center place-items-center w-10 h-10 border-0 text-white bg-indigo-400 shadow-lg hover:bg-indigo-500'>
                            <SortDescendingIcon width={20} height={20} />
                        </button>
                        {
                            selected &&
                            <button title='reset' onClick={handleReset} className='order-1 rounded-full flex place-content-center place-items-center w-10 h-10 border-0 bg-zinc-400 shadow-md hover:bg-zinc-500'>
                                <RefreshIcon width={20} height={20} />
                            </button>
                            ||
                            ''
                        }
                    </div>
                )
            })
            }
            >
                <div className="w-full px-4 py-10">
                    <div className="w-full max-w-md mx-auto">
                        <RadioGroup value={selected} onChange={setSelected}>
                            <RadioGroup.Label className="sr-only">Sort</RadioGroup.Label>
                            <div className="space-y-2">
                                {
                                    sortOptions.map(op =>
                                        <div key={Object.keys(op)[0]}>
                                            <RadioGroup.Option
                                                key={Object.keys(op)[0]}
                                                value={Object.values(op)[0]}
                                                className={({ active, checked }) =>
                                                    `${active
                                                        ? 'ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60'
                                                        : ''
                                                    }
                                                       ${checked ? 'bg-indigo-400 bg-opacity-75 text-white' : 'bg-zinc-300'
                                                    }
                                                        hover:bg-indigo-300 relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
                                                }
                                            >
                                                {({ active, checked }) => (
                                                    <>
                                                        <div className="flex items-center justify-between w-full">
                                                            <div className="flex items-center">
                                                                <div className="text-sm">
                                                                    <RadioGroup.Label
                                                                        as="p"
                                                                        className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'
                                                                            }`}
                                                                    >
                                                                        {Object.keys(op)[0]}
                                                                    </RadioGroup.Label>
                                                                </div>
                                                            </div>
                                                            {checked && (
                                                                <div className="flex-shrink-0 text-white">
                                                                    <CheckCircleIcon className="w-6 h-6" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </>
                                                )}
                                            </RadioGroup.Option>
                                        </div>
                                    )
                                }
                            </div>
                        </RadioGroup>
                    </div>
                </div>
            </MenuPopover>
        </div>
    )
}

export default Sort;