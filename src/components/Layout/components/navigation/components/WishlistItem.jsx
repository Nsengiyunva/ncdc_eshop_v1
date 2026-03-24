import { useWishlist } from 'features/wishlist/api/getWishlist';
import React from 'react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

export const WishlistItem = () => {
	const wishList = useWishlist();

	return (
		<div>
			<div className='hover:text-geen-800 py-2 px-2 text-md flex items-center rounded-sm gap-2'>
				<MdFavoriteBorder
					className={`${
						wishList?.data?.wishlistItems?.length > 0
							? 'text-red-500'
							: 'text-green-700'
					} hover:text-green-800 text-xl font-bold cursor-pointer`}
				/>
				<h1 className='text-green-700 hover:text-green-800 cursor-pointer'>
					Wishlist
				</h1>
			</div>
		</div>
	);
};
