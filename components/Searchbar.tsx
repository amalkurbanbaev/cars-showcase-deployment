/* eslint-disable no-alert */

'use client';

import { FormEvent, useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { manufacturers } from '@/constants';

import SearchManufacturer from './SearchManufacturer';

const SearchButton = ({ otherClasses }: { otherClasses?: string }) => (
    <button type='submit' className={`z-10 -ml-3 ${otherClasses}`}>
        <Image src='/magnifying-glass.svg' alt='magnifying glass' width={40} height={40} className='object-contain' />
    </button>
);

const Searchbar = () => {
    const router = useRouter();

    const [manufacturer, setManufacturer] = useState('');
    const [model, setModel] = useState('');

    const updateSearchParams = (modelUpdate: string, manufacturerUpdate: string) => {
        const searchParams = new URLSearchParams(window.location.search);

        if (modelUpdate) {
            searchParams.set('model', modelUpdate);
        } else {
            searchParams.delete('model');
        }

        if (manufacturerUpdate) {
            searchParams.set('manufacturer', manufacturerUpdate);
        } else {
            searchParams.delete('manufacturer');
        }

        const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

        router.push(newPathname);
    };

    const handleSearch = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (manufacturer === '' && model === '') {
            alert('Please fill in the search bar');
        }

        updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);

        setManufacturer(manufacturers.find((man) => man.toLowerCase() === searchParams.get('manufacturer')) || '');
        setModel(searchParams.get('model') || '');
    }, []);

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
