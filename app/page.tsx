import { CarCard, CustomFilter, Hero, Searchbar, ShowMore } from '@/components';
import { fuels, yearsOfProduction } from '@/constants';
import { FilterProps } from '@/types';
import { fetchCars } from '@/utils';

export default async function Home({ searchParams }: { searchParams: FilterProps }) {
    const allCars = await fetchCars({
        manufacturer: searchParams.manufacturer || '',
        fuel: searchParams.fuel || '',
        limit: searchParams.limit || 12,
        model: searchParams.model || '',
        year: searchParams.year || new Date().getFullYear(),
    });

    const isDataEmpty = allCars.length < 1 || !allCars;

    return (
        <main className='overflow-hidden'>
            <Hero />

            <div className='padding-x padding-y max-width mt-12' id='discover'>
                <div className='home__text-container'>
                    <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
                    <p>Explore the cars you might like</p>
                </div>

                <div className='home__filters'>
                    <Searchbar />
                    <div className='home__filter-container'>
                        <CustomFilter title='fuel' options={fuels} />
                        <CustomFilter title='year' options={yearsOfProduction} />
                    </div>
                </div>

                {!isDataEmpty ? (
                    <section>
                        <div className='home__cars-wrapper'>
                            {allCars.map((car) => (
                                <CarCard
                                    key={`${car.make}-${car.model}-${car.year}-${car.combination_mpg}-${car.cylinders}`}
                                    car={car}
                                />
                            ))}
                        </div>
                        <ShowMore
                            pageNumber={(searchParams.limit || 10) / 10}
                            isNext={(searchParams.limit || 10) > allCars.length}
                        />
                    </section>
                ) : (
                    <div className='home__error-container'>
                        <h2 className='text-xl font-bold text-black'>Ooops, no results</h2>
                    </div>
                )}
            </div>
        </main>
    );
}
