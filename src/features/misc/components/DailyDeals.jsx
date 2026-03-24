import React, { useEffect, useState } from 'react';
import { useDailyDeals } from '../api/getDailyDeals';
import { UPLOADS_API_URL } from 'config';
import { Swiper, SwiperSlide } from 'swiper/react';
import UnavailableBookCover from 'assets/unavailable-book-cover.png';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Pagination } from 'swiper';
import { Link } from 'react-router-dom';
import { ImPriceTag } from 'react-icons/im';

export const DailyDeals = () => {
	//choose the screen size to determine number of slides displayed in carousel
	const [slides, setSlides] = useState(3);

	const handleResize = () => {
		if (window.innerWidth < 770) {
			return setSlides(1);
		}
		if (window.innerWidth < 1280) {
			return setSlides(3);
		} else {
			return setSlides(3);
		}
	};

	// create an event listener
	useEffect(() => {
		handleResize();
		window.addEventListener('resize', handleResize);
	});

	const dailyDealsQuery = useDailyDeals();

	if(dailyDealsQuery.data < 1) return null;

	return (
		<>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4 bg-green-600 rounded-md p-2 px-4 mb-4'>
				<div className='flex items-center justify-between gap-2 md:w-[50%]'>
					<h1 className='flex flex-row space-x-2 items-center uppercase text-md font-black text-white'>
						<ImPriceTag />
						<span> Daily Sales</span>
					</h1>
				</div>
				<div className='flex gap-1 items-center justify-end text-white'>
					<div className='py-1 px-3 bg-white rounded-full'></div>
					<div className='py-1 px-1 bg-gray-200 rounded-full'></div>
					<div className='py-1 px-1 bg-gray-200 rounded-full'></div>
				</div>
			</div>
			<div className='md:w-4/5 lg:w-full mx-auto'>
				<Swiper
					slidesPerView={slides}
					spaceBetween={20}
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
					pagination={{
						clickable: true,
					}}
					modules={[Pagination, Autoplay]}
					className='mySwiper'>
					{dailyDealsQuery.data?.map((item, index) => {
						return (
							<SwiperSlide key={index}>
								<div className='pb-10 md:pb-8 lg:pb-0'>
									<Link
										to={`/products/${item.product?.slug}`}
										key={index}
										className='rounded-lg shadow-md bg-white flex items-center hover:bg-green-50'>
										<div className='w-5/12'>
											<img
												src={
													UPLOADS_API_URL +
													'/products/' +
													item.product?.images[0]?.location
												}
												onError={(e) => {
													e.target.src = UnavailableBookCover;
												}}
												alt={item.alt}
												className='h-40 lg:h-42 rounded-l-lg object-cover'
												loading='lazy'
											/>{' '}
										</div>
										<div className='px-2 py-2 w-7/12 space-y-4'>
											<div className='space-y-4'>
												<h1 className='font-extrabold'>
													{item.product?.name?.length > 15
														? item.product?.name.slice(0, 12) + '...'
														: item.product?.name}
												</h1>
												<p className='text-[#9B9191] font-extrabold text-sm uppercase line-through'>
													ugx {item.product?.amount?.toLocaleString()}
												</p>
												<p className='text-red-700 font-extrabold'>
													UGX {item?.amount?.toLocaleString()}
												</p>
											</div>
										</div>
									</Link>
								</div>
							</SwiperSlide>
						);
					})}
					{/* Skeleton */}
					{dailyDealsQuery.isLoading &&
						[0, 1, 2].map((index) => {
							return (
								<SwiperSlide key={index}>
									<div className='pb-14 lg:pb-0'>
										<div
											key={index}
											className='rounded-lg shadow-md bg-white flex items-center'>
											<div className='w-6/12'>
												<div className='skeleton w-full h-36'></div>
											</div>
											<div className='px-2 py-2 w-6/12 space-y-4'>
												<div className='skeleton w-full h-8'></div>
												<div className='skeleton w-full h-8'></div>
											</div>
										</div>
									</div>
								</SwiperSlide>
							);
						})}
				</Swiper>
			</div>
		</>
	);
};
