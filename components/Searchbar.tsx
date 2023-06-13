/* eslint-disable no-alert */

'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { manufacturers } from '@/constants';

import SearchManufacturer from './SearchManufacturer';

const SearchButton = ({ otherClasses }: { otherClasses?: string }) => (
    <button type='submit' className={`z-10 -ml-3 ${otherClasses}`}>
        <Image src='/magnifying-glass.svg' alt='magnifying glass' width={40} height={40} className='object-contain' />
    </button>
);

const Searchbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [manufacturer, setManufacturer] = useState('');
    const [model, setModel] = useState('');

    useEffect(() => {
        const currentParams = searchParams.toString();
        const params = new URLSearchParams(currentParams);

        setManufacturer(manufacturers.find((man) => man.toLowerCase() === params.get('manufacturer')) || '');
        setModel(params.get('model') || '');
    }, [searchParams]);

    useEffect(() => {
        // Retrieve scrollY value from localStorage after routing
        const persistentScroll = localStorage.getItem('persistentScroll');
        if (persistentScroll === null) return;

        // Restore the window's scroll position
        window.scrollTo({ top: Number(persistentScroll) });

        // Remove scrollY from localStorage after restoring the scroll position
        // This hook will run before and after routing happens so this check is
        // here to make we don't delete scrollY before routing
        if (Number(persistentScroll) === window.scrollY) {
            localStorage.removeItem('persistentScroll');
        }
    }, [searchParams]);

    const updateSearchParams = useCallback(
        (modelUpdate: string, manufacturerUpdate: string) => {
            const currentParams = searchParams.toString();
            const params = new URLSearchParams(currentParams);

            if (modelUpdate) {
                params.set('model', modelUpdate);
            } else {
                params.delete('model');
            }

            if (manufacturerUpdate) {
                params.set('manufacturer', manufacturerUpdate);
            } else {
                params.delete('manufacturer');
            }

            // Save current scrollY value to localStorage before pushing the new route
            localStorage.setItem('persistentScroll', window.scrollY.toString());

            // const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
            router.push(`${pathname}?${params.toString()}`);
        },
        [pathname, router, searchParams],
    );

    const handleSearch = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (manufacturer === '' && model === '') {
            alert('Please fill in the search bar');
        }

        updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
    };

    return (
        <form className='searchbar' onSubmit={handleSearch}>
            <div className='searchbar__item'>
                <SearchManufacturer manufacturer={manufacturer} setManufacturer={setManufacturer} />
                <SearchButton otherClasses='sm:hidden' />
            </div>
            <div className='searchbar__item'>
                <Image
                    src='/model-icon.png'
                    alt=''
                    width={25}
                    height={25}
                    className='absolute ml-4 h-[20px] w-[20px]'
                />
                <input
                    type='text'
                    name='model'
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder='Tiguan'
                    className='searchbar__input'
                />
                <SearchButton otherClasses='sm:hidden' />
            </div>
            <SearchButton otherClasses='max-sm:hidden' />
        </form>
    );
};

export default Searchbar;
