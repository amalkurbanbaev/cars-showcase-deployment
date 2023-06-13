import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import CustomButton from './CustomButton';

const Navbar = () => (
    <header className='absolute z-10 w-full'>
        <nav className='max-width flex items-center justify-between px-6 py-4 sm:px-16'>
            <Link href='/' className='flex items-center justify-center'>
                <Image src='/logo.svg' alt='Logo' width={118} height={18} className='object-contain' />
            </Link>
            <CustomButton title='Sign In' containerStyles='text-primary-blue rounded-full bg-white min-w-[130px]' />
        </nav>
    </header>
);

export default Navbar;
