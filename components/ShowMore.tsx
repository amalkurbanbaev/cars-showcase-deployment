'use client';

import { useRouter } from 'next/navigation';

import { ShowMoreProps } from '@/types';
import { updateSearchParams } from '@/utils';

import CustomButton from './CustomButton';

const ShowMore = ({ isNext, pageNumber }: ShowMoreProps) => {
    const router = useRouter();

    const handleNavigation = () => {
        const newLimit = (pageNumber + 1) * 10;
        const newPathname = updateSearchParams('limit', String(newLimit));

        router.push(newPathname);
    };
    return (
        <div className='flex-center mt-10 flex w-full gap-5'>
            {!isNext && (
                <CustomButton
                    title='Show More'
                    btnType='button'
                    containerStyles='bg-primary-blue rounded-full text-white'
                    handleClick={handleNavigation}
                />
            )}
        </div>
    );
};

export default ShowMore;
