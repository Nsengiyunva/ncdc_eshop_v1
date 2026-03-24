import React from 'react';
import { useProducts } from '../api/getProducts';
import { ProductItem } from 'components/ProductItem/ProductItem';
import { ImPriceTag } from 'react-icons/im';
import { ProductFilter } from 'utils/productFilter';

export default function TrendingItems() {
	//get data from API
	const trendsQuery = useProducts();
	var trendsProducts = ProductFilter(trendsQuery?.data);

	return (
		<div>
			<div className=''>
				<div className='flex flex-row items-center justify-between rounded-t-md p-2 px-4'>
					<div className='flex items-center justify-between gap-2 md:w-[50%]'>
						<h1 className='flex flex-row space-x-2 items-center uppercase text-md font-semibold text-gray-900'>
							<ImPriceTag />
							<span> Trending Items</span>
						</h1>
					</div>
					<div className='flex gap-1 items-center justify-end text-white'>
						<div className='py-1 px-3 bg-green-500 rounded-full'></div>
						<div className='py-1 px-1 bg-gray-500 rounded-full'></div>
						<div className='py-1 px-1 bg-gray-500 rounded-full'></div>
					</div>
				</div>
				<div className='w-full bg-white py-3 shadow rounded-md px-3'>
					<div className='grid grid-cols-1 md:grid-cols-4 gap-3'>
						{trendsProducts?.slice(0, 8)?.map((product, index) => {
							return (
								<div key={index}>
									<ProductItem product={product} />
								</div>
							);
						})}

						{/* skeleton  */}
						{trendsQuery.isLoading &&
							[0, 1, 2, 3].map((index) => {
								return (
									<div key={index}>
										<div className='flex items-center gap-y-3 h-full rounded-lg shadow-md bg-white'>
											<div className='rounded-lg space-y-2 w-full'>
												<div className='skeleton h-48 w-full'></div>
												<div className='p-4'>
													<div className='skeleton h-6 w-full'></div>
													<div className='skeleton h-6 w-3/4 my-2'></div>
												</div>
											</div>
										</div>
									</div>
								);
							})}
					</div>
					{trendsQuery.data?.length === 0 && (
						<div className=''>
							<p className='text-xl text-center font-bold my-4'>
								No Products available
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
