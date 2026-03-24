import React from 'react';
import { useWishlist } from '../api/getWishlist';
import { UPLOADS_API_URL } from 'config';
import { AddToCartBtn } from './AddToCartBtn';
import { RemoveWishlist } from './RemoveWishlist';
import { Link } from 'react-router-dom';

import placeholder from 'assets/placeholder.png';

export const WishlistCard = () => {
	const wishlistQuery = useWishlist();

	return (
		<div className='bg-white shadow rounded-2xl mt-2'>
			{wishlistQuery?.data?.wishlistItems?.map((item, index) => {
				return (
					<div
						key={index}
						className='shadow-lg rounded-lg md:rounded-2xl my-4 w-full md:h-44 bg-white'>
						<div className='flex'>
							<div className='w-4/12 md:w-2/12 md:h-full'>
								<img
									src={
										item.product?.image === null
											? placeholder
											: UPLOADS_API_URL +
											  '/products/' +
											  item.product?.image?.location
									}
									alt='...'
									className='object-cover h-36 w-full md:h-44 rounded-tl-lg md:rounded-bl-2xl md:rounded-tl-2xl'
									loading='lazy'
								/>
							</div>
							<div className='w-8/12 md:w-10/12'>
								<div className='flex flex-col md:flex-row justify-between py-2 px-5'>
									<div className='py-4 space-y-4'>
										<Link to={`/products/${item.product?.slug}`}>
											<h1 className='font-extrabold text-lg'>
												{item.product?.name?.length > 38
													? item.product?.name.slice(0, 35) + '...'
													: item.product?.name}
											</h1>
										</Link>
										<div className='space-y-4'>
											<span className='font-extrabold uppercase text-lg text-red-700'>
												Ugx: {item.product?.amount?.toLocaleString()}
											</span>
										</div>
									</div>
									<div className='hidden md:flex md:flex-col space-x-2 md:space-x-0 md:space-y-8 py-4 items-end'>
										<div>
											<AddToCartBtn productId={item.product?.id} />
										</div>
										<div>
											<RemoveWishlist wishlistItemId={item?.id} />
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className='flex md:hidden space-x-2 py-4 items-center justify-center'>
							<div>
								<AddToCartBtn productId={item.product?.id} />
							</div>
							<div>
								<RemoveWishlist wishlistItemId={item?.id} />
							</div>
						</div>
					</div>
				);
			})}

			{/* Skeleton */}
			{wishlistQuery.isLoading &&
				[0, 1].map((index) => (
					<div
						key={index}
						className='shadow-lg rounded-md my-4 w-full bg-white flex item-center my-8'>
						<div className='skeleton h-40 w-48'></div>
						<div className='w-full'>
							<div className='skeleton h-8 w-3/4 m-8'></div>
							<div className='skeleton h-8 w-2/4 m-8'></div>
						</div>
					</div>
				))}

			<div
				className={
					wishlistQuery?.data?.message === 'No wishlist found' ||
					wishlistQuery?.data?.wishlistItems.length < 1
						? 'flex'
						: 'hidden'
				}>
				<div className='mx-auto flex flex-col justify-center text-center my-12 font-bold h-48 space-y-6'>
					<p className='text-xl md:text-2xl'>Your Wishlist is empty</p>
					<p>Check out our products to get the best deals</p>
					<Link to='/'>
						<button className='py-2 px-4 bg-green-500 text-white rounded'>
							Go to products
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
