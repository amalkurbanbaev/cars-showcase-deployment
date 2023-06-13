'use client';

import Image from 'next/image';

import { CustomButtonProps } from '@/types';

const CustomButton = (props: CustomButtonProps) => {
    const { title, containerStyles, handleClick, btnType = 'button', disabled, rightIcon, textStyles } = props;
    return (
        <button
            disabled={disabled}
            type={btnType === 'button' ? 'button' : 'submit'}
            className={`custom-btn ${containerStyles}`}
            onClick={handleClick}
        >
            <span className={`flex-1 ${textStyles}`}>{title}</span>
            {rightIcon && (
                <div className='relative h-6 w-6'>
                    <Image src={rightIcon} alt='right icon' fill className='object-contain' />
                </div>
            )}
        </button>
    );
};

export default CustomButton;
