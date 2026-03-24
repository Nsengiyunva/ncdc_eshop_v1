import React from "react";

export const PRNStatusDetails = (data) => {
  const prn_details = data?.data?.data;

  return (
    <div>
      {/* <div className='w-2/3 md:w-1/2 mx-auto px-8 py-4 md:py-12'>
				<div className='space-y-4'>
					<div className='flex space-x-4'>
						<p className='bg-gray-300 px-4 py-2 rounded'>Amount</p>
						<p className='px-4 py-2'>
							UGX {prn_details?.AmountPaid?.toLocaleString()}
						</p>
					</div>
					<div className='flex space-x-4'>
						<p className='bg-gray-300 px-4 py-2 rounded'>Status</p>
						<p className='px-4 py-2'>{prn_details?.StatusDesc}</p>
					</div>
					<div className='flex space-x-4'>
						<p className='bg-gray-300 px-4 py-2 rounded'>Expiry date</p>
						<p className='px-4 py-2'>{prn_details?.PaymentExpiryDate}</p>
					</div>
				</div>
			</div> */}
      <div className="my-3 uppercase border border-gray-200 bg-gray-100 p-6 rounded-2xl text-center font-black">{prn_details?.StatusDesc}</div>
    </div>
  );
};
