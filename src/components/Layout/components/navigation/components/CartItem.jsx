import React from 'react';
import { BsCart2 } from 'react-icons/bs';
import { useCartItems } from 'features/cart/api/getCartItems';

export const CartItem = (props) => {
	const cartQuery = useCartItems();

	return (
		<div>
			<div className='text-green-700 py-2 px-2 flex items-center rounded-sm gap-4'>
				<div className='relative'>
					<BsCart2 className='text-green-700 font-bold hover:text-green-800 cursor-pointer' />
					<span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
						{cartQuery.data?.cartItems?.length || 0}
					</span>
				</div>
				<h1 className='text-green-700 hover:text-green-800 cursor-pointer'>
					My Cart
				</h1>
			</div>
		</div>
	);
};

CartItem.propTypes = {};
