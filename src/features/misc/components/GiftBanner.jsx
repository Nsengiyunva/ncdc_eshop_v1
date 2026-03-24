import { UPLOADS_API_URL } from 'config';
import React from 'react';
import { useNotices } from '../api/getNotices';

export default function GiftBanner() {
	const noticeQuery = useNotices();

	return (
		<>
			{noticeQuery.data?.active
				? !noticeQuery.isLoading && (
						<div className='w-full shadow-md h-32 md:h-60'>
							<img
								className='rounded-md object-cover h-full w-full'
								src={
									UPLOADS_API_URL + '/notices/' + noticeQuery?.data?.location
								}
								alt='advert'
								loading='lazy'
							/>
						</div>
				  )
				: null}
			{noticeQuery.isLoading && (
				<div className='w-full shadow-md h-32 md:h-60 skeleton'></div>
			)}
		</>
	);
}
