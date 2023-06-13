'use client';

import React, { useState } from 'react';

import Image from 'next/image';

import { calculateCarRent, generateCarImageUrl } from '@/utils';

import CarDetails from './CarDetails';
import CustomButton from './CustomButton';
import { CarProps } from '../types/index';

interface CarCardProps {
    car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
    const { city_mpg, drive, make, model, transmission, year } = car;

    const [isOpen, setIsOpen] = useState(false);

    const carRent = calculateCarRent(city_mpg, year);
    return (
        <div className='car-card group relative'>
            <div className='car-card__content'>
                <h2 className='car-card__content-title'>
                    {make} {model}
                </h2>
            </div>
            <p className='mt-6 flex text-[32px] font-extrabold'>
                <span className='self-start text-[14px] font-semibold'>$</span>
                {carRent}
                <span className='self-end text-[14px] font-medium'>/day</span>
            </p>

            <div className='relative my-3 h-40 w-full object-contain'>
                <Image
                    src={generateCarImageUrl(car)}
                    alt='Car model'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    fill
                    priority
                    className='object-contain'
                />
            </div>

            <div className='relative mt-2 flex w-full'>
                <div className='text-gray flex w-full justify-between group-hover:invisible'>
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <Image src='/steering-wheel.svg' width={20} height={20} alt='steering wheel' />
                        <p className='text-[14px]'>{transmission === 'a' ? 'Authomatic' : 'Manual'}</p>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <Image src='/tire.svg' width={20} height={20} alt='tire' />
                        <p className='text-[14px]'>{drive.toUpperCase()}</p>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <Image
                            src='/gas.svg'
                            width={20}
                            height={20}
                            style={{ width: '20px', height: '20px' }}
                            alt='gas MPG'
                        />
                        <p className='text-[14px]'>{city_mpg} MPG</p>
                    </div>
                </div>

                <div className='car-card__btn-container'>
                    <CustomButton
                        title='View More'
                        containerStyles='w-full py-4 rounded-full bg-primary-blue'
                        textStyles='text-white text-[14px] leading-[17px] font-bold'
                        rightIcon='/right-arrow.svg'
                        handleClick={() => setIsOpen(true)}
                    />
                </div>

                <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />
            </div>
        </div>
    );
};

export default CarCard;
