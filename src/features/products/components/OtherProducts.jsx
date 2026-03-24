import React, { useState } from 'react';
import { Pagination } from 'components/Elements';
import { ProductItem } from 'components/ProductItem/ProductItem';
import { useProducts } from '../api/getProducts';

export const OtherProducts = ({ slug }) => {
	const allProductsQuery = useProducts();

	const productsQuery = allProductsQuery?.data?.filter((product) => {
		return product?.category?.slug === slug && product.active === 1;
	});

	const [currentPage, setCurrentPage] = useState(1);
	const [productsPerPage] = useState(16);

	// Get current Products
	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

	const currentProducts = productsQuery?.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	);

	const pageNumberLimit = 5;
	const [maxPageNumber, setMaxPageNumber] = useState(5);
	const [minPageNumber, setMinPageNumber] = useState(1);

	const paginateFront = () => {
		setCurrentPage(currentPage + 1);
		if (currentPage + 1 > maxPageNumber) {
			setMaxPageNumber(maxPageNumber + pageNumberLimit);
			setMinPageNumber(minPageNumber + pageNumberLimit);
		}
	};
	const paginateBack = () => {
		setCurrentPage(currentPage - 1);
		if ((currentPage - 1) % pageNumberLimit === 0) {
			setMaxPageNumber(maxPageNumber - pageNumberLimit);
			setMinPageNumber(minPageNumber - pageNumberLimit);
		}
	};

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<div className='bg-white rounded-md shadow p-3 h-full flex flex-col justify-between'>
			<div>
				{/* display products for other categories */}
				<div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
					{currentProducts?.map((product, index) => {
						return (
							<div key={index}>
								<ProductItem product={product} />
							</div>
						);
					})}

					{/* Skeleton  */}
					{allProductsQuery.isLoading &&
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
				{productsQuery?.length === 0 ? (
					<div className='w-full'>
						<div className='flex flex-col w-2/3 mx-auto items-center justify-center'>
							<p className='my-4 text-xl'>
								Sorry, we currently don't have any products under this category.
							</p>
						</div>
					</div>
				) : (
					<></>
				)}
			</div>
			<div className='my-8'>
				<Pagination
					postsPerPage={productsPerPage}
					totalPosts={productsQuery?.length}
					paginate={paginate}
					currentPage={currentPage}
					paginateFront={paginateFront}
					paginateBack={paginateBack}
					maxPageNumber={maxPageNumber}
					minPageNumber={minPageNumber}
				/>
			</div>
		</div>
	);
};
