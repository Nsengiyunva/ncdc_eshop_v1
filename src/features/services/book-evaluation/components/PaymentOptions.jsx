import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'components/Elements';
import { MobileMoney, Visa } from 'features/checkout';

export const PaymentOptions = ({ orderId }) => {
	const [openTab, setOpenTab] = React.useState('Mobile money');
	const navigate = useNavigate();

	return (
		<>
			<div>
				<ul className='flex space-x-2 justify-start mb-2 list-none flex-row'>
					<li className=''>
						<button
							className={`text-md rounded-md px-4 py-2 ${
								openTab === 'Mobile money'
									? ' bg-green-100  text-green-500'
									: 'text-gray-500 border border-gray-200'
							}`}
							onClick={(e) => {
								e.preventDefault();
								setOpenTab(`Mobile money`);
							}}>
							Mobile Money
						</button>
					</li>
					<li className=''>
						<button
							className={`text-md rounded-md px-4 py-2 ${
								openTab === 'Visa'
									? ' bg-green-100  text-green-500'
									: 'text-gray-500 border border-gray-200'
							}`}
							onClick={(e) => {
								e.preventDefault();
								setOpenTab(`Visa`);
							}}>
							Visa
						</button>
					</li>
				</ul>
			</div>
			<div className='flex flex-col min-w-0 break-words bg-white w-full mb-6  rounded '>
				<div className='py-5 flex-auto'>
					{openTab === 'Visa' ? (
						<Visa orderId={orderId} />
					) : openTab === 'Mobile money' ? (
						<MobileMoney />
					) : (
						' '
					)}
				</div>
			</div>
			{/* <div className='mt-5 mb-5 flex justify-end items-center'>
				<Button
					onClick={() => navigate('/receipt')}
					className='bg-green-500 mx-4 text-white px-5 py-2 font-extrabold rounded'>
					Preview Invoice
				</Button>
			</div> */}
		</>
	);
};
