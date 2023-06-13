import { ReactNode } from 'react';

import { Footer, Navbar } from '@/components';

import './globals.css';

export const metadata = {
    title: 'Car Hub',
    description: 'Discover the best cars in the world',
};

const RootLayout = ({ children }: { children: ReactNode }) => (
    <html lang='en'>
        <body className='relative'>
            <Navbar />
            {children}
            <Footer />
        </body>
    </html>
);

export default RootLayout;
