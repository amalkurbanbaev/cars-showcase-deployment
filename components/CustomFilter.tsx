'use client';

import { Fragment, useState } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { CustomFilterProps } from '@/types';
import { updateSearchParams } from '@/utils';

const CustomFilter = ({ title, options }: CustomFilterProps) => {
    const router = useRouter();

    const [selected, setSelected] = useState(options[0]);

    const handleUpdateParams = (e: { title: string; value: string }) => {
        const newPathname = updateSearchParams(title, e.value.toLowerCase());
        router.push(newPathname);
    };

    return (
        <div className='w-fit'>
            <Listbox
                value={selected}
                onChange={(e) => {
                    setSelected(e);
                    handleUpdateParams(e);
                }}
            >
                <div className='w-fite relative '>
                    <Listbox.Button className='custom-filter__btn'>
                        <span className='block truncate'>{selected.title}</span>
                        <Image
                            src='/chevron-up-down.svg'
                            width={20}
                            height={20}
                            className='ml-4 object-contain'
                            alt='chevron up down'
                        />
                    </Listbox.Button>

                    <Transition
                        as={Fragment}
                        leave='transition ease-in duration-300'
                        leaveTo='opacity-0'
                        leaveFrom='opacity-100'
                    >
                        <Listbox.Options className='custom-filter__options z-10'>
                            {options.map((option) => (
                                <Listbox.Option
                                    key={option.title}
                                    value={option}
                                    className={({ active }) =>
                                        `relative cursor-default select-none px-4 py-2 ${
                                            active ? 'bg-primary-blue text-white' : 'text-gray-900'
                                        }`
                                    }
                                >
                                    {({ selected: selectedOption }) => (
                                        <span
                                            className={`block truncate ${selectedOption ? 'font-bold' : 'font-normal'}`}
                                        >
                                            {option.title}
                                        </span>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
};

export default CustomFilter;
