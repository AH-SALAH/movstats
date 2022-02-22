import { Popover, Transition } from '@headlessui/react';
import {useRef} from 'react';

/**
 * headless ui popover
 *
 * @param {*} { children, ReferenceEl }
 * @returns
 */
const MenuPopover = ({ children, ReferenceEl }) => {
    let referenceElement = useRef()

    return (
        <div className='max-w-sm flex w-full h-full'>
            <Popover>
                {
                    ({ open }) => (
                        <>
                            <Popover.Button as={ReferenceEl.tagName || 'span'} >{<ReferenceEl ref={(node) => referenceElement.current = node} />}</Popover.Button>
                            <div className='w-full table h-full absolute top-full right-0 left-auto'>
                                <Transition
                                    as={'span'}
                                    enter="transition ease-out duration-150"
                                    enterFrom="opacity-0 translate-y-1"
                                    enterTo="opacity-100 translate-y-0"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="opacity-100 translate-y-0"
                                    leaveTo="opacity-0 translate-y-1"
                                    className={'w-full h-full flex'}
                                >
                                    <Popover.Panel
                                        className="mt-5 bg-zinc-100 dark:bg-zinc-800 shadow-lg rounded-lg p-2 flex place-content-center place-items-start min-h-fit w-full min-w-[300px] z-10 border border-zinc-700"
                                    >
                                        <Transition
                                            as={'span'}
                                            enter="transition ease duration-200"
                                            enterFrom="opacity-50 translate-x-1/4"
                                            enterTo="opacity-100 translate-x-0"
                                            leave="transition ease duration-150"
                                            leaveFrom="opacity-100 translate-x-0"
                                            leaveTo="opacity-0 translate-x-5"
                                            className={'w-full h-full flex'}
                                        >
                                            {
                                                children
                                            }
                                        </Transition>
                                    </Popover.Panel>
                                </Transition>
                            </div>
                        </>
                    )
                }
            </Popover>
        </div>
    )
}

export default MenuPopover;