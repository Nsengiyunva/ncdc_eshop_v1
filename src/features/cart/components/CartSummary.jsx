import React from 'react';
import { Link } from 'react-router-dom';
import { useCartItems } from '../api/getCartItems';

export const CartSummary = () => {
	//total cost
	var totalNetCost = 0;

	const cartQuery = useCartItems();

	return (
		<div className=''>
			<div className='px-4 py-4 shadow-lg rounded-t-lg md:rounded-t-md bg-white font-extrabold'>
				Summary
			</div>
			<div className='w-full h-fit py-2 pb-4 px-5 shadow-lg rounded-b-lg md:rounded-b-md bg-white'>
				{cartQuery?.data?.cartItems?.map((item, index) => {
					totalNetCost = totalNetCost + item.amount * item.quantity;
					return (
						<div
							key={index}
							className='flex justify-between border-b py-1 border-gray-300'>
							<h1 className='py-2 md:py-0'>
								{item?.product?.name?.length > 25
									? item?.product?.name.slice(0, 22) + '...'
									: item?.product?.name}
							</h1>
							<span className='font-extrabold uppercase py-2 md:py-0'>
								ugx {(item?.amount * item?.quantity)?.toLocaleString()}
							</span>
						</div>
					);
				})}
				<div>
					<div className='flex justify-between my-8'>
						<h1 className='font-extrabold'>Total Price</h1>
						<span className='font-extrabold uppercase'>
							UGX {totalNetCost?.toLocaleString()}
						</span>
					</div>
					<div className='flex mt-3 space-x-2 justify-end'>
						
						<Link to='/'>
							<div className='py-2 px-4 bg-green-100 text-green-600 font-extrabold cursor-pointer rounded-md'>
								Continue Shopping
							</div>
						</Link>
						<Link to='/order'>
							<div className='py-2 px-8 bg-green-600 text-white font-extrabold cursor-pointer rounded-md'>
								Proceed
							</div>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
