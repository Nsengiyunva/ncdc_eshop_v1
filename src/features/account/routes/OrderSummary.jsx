import { MainLayout } from 'components/Layout';
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useOrder } from '../api/getOrder';
import { BiArrowBack } from 'react-icons/bi';
import { Button, CoolSpinner } from 'components/Elements';
import { PaymentMethods, useGeneratePRN } from 'features/checkout';
import { useAuth } from 'lib/auth';
import { PaymentSlip } from 'features/checkout/components/PaymentSlip';

export const OrderSummary = () => {
	const { id } = useParams();
	const orderQuery = useOrder({ id });
	const navigate = useNavigate();

	const generatePRNMutation = useGeneratePRN();

	const { user } = useAuth();

	const generateResult =
		generatePRNMutation?.data?.GetPRNResponse?.GetPRNResult?.ErrorCode;
	const generatedPRN =
		generatePRNMutation?.data?.GetPRNResponse?.GetPRNResult?.PRN;

	if (orderQuery.isLoading) {
		return (
			<div className='fixed w-full h-full bg-white flex justify-center items-center'>
				<CoolSpinner />
			</div>
		);
	}

	if (!orderQuery.data) return null;

	const order = orderQuery.data;
	

	return (
		<MainLayout>
			<div className='shadow-md rounded-lg rounded-2xl bg-white px-8 py-4 md:mt-8 mb-4'>
				<div className='flex flex-col md:flex-row justify-between'>
					<div className='flex flex-row items-center space-x-2 mb-3 md:mb-0'>
						<Link to='/profile/orders'>
							<div className='text-green-600 font-bold h-8 w-8 items-center flex justify-center rounded-full bg-green-100'>
								<BiArrowBack />
							</div>
						</Link>
						<span className='font-bold text-md md:text-lg'>
							ORDER <span className='text-gray-400'>#{order?.id}</span>
						</span>
					</div>
					{order.payment?.prn_status === 'A' && (
						<PaymentSlip order={order} />
					)}
				</div>
			</div>
			<div className='rounded-lg rounded-2xl bg-white px-8 py-4 mb-4'>
				<div className='p-2 md:p-8'>
					<div className='space-y-2'>
						<p className='font-normal text-base'>
							Ordered on:{' '}
							<span className='font-semibold text-md'>
								{' '}
								{!orderQuery.isLoading &&
									new Date(order?.created_at)?.toLocaleDateString()}
							</span>
						</p>
						<p className='font-normal text-base'>
							Total Amount:{' '}
							<span className='font-semibold text-md'>
								{!orderQuery.isLoading &&
									order?.amount?.toLocaleString('en-US', {
										style: 'currency',
										currency: 'UGX',
									})}
							</span>
						</p>
					</div>

					<div className='grid md:grid-cols-12 gap-4'>
						<div className='md:col-span-7'>
							{/* List of books ordered */}
							{order?.type_of_service === 'BOOKS' && (
								<div className='my-2 grid grid-cols-1 md:grid-cols-12 gap-4'>
									{/* List of items */}
									<div className='col-span-7'>
										<h4 className='my-4 font-normal'>
											List of items (
											{!orderQuery.isLoading && order?.orderItems?.length})
										</h4>
										{order?.orderItems?.map((item, index) => (
											<div
												key={index}
												className='border border-gray-200 my-2 rounded-md px-3 py-2 text-sm
								space-y-2'>
												<p className='font-normal'>
													Book name:{' '}
													<span className='font-semibold text-md'>
														{item?.name}
													</span>
												</p>
												<p className='font-normal'>
													Quantity:{' '}
													<span className='font-semibold text-md'>
														{item?.quantity} items
													</span>
												</p>
												<p className='font-normal'>
													Amount:{' '}
													<span className='font-semibold text-md'>
														ugsh. {item?.amount?.toLocaleString()}
													</span>
												</p>
											</div>
										))}

										{/* Skeleton for loading options */}
										{orderQuery.isLoading && (
											<div className='space-y-2'>
												<div className='h-8 skeleton w-full'></div>
												<div className='h-8 skeleton w-3/4'></div>
											</div>
										)}
									</div>
								</div>
							)}

							{/* Evaluation details */}
							{order?.type_of_service === 'BOOK_EVALUATION' && (
								<div className='my-2 space-y-2'>
									<h4 className='my-4 text-lg font-medium'>Book to Evaluate</h4>
									<p>
										Book Title:{' '}
										<span className='font-bold text-md'>
											{orderQuery?.data?.evaluationDetails?.book_title}
										</span>
									</p>
									<p>
										Period of delivery:{' '}
										<span className='font-bold text-md'>
											{orderQuery?.data?.evaluationDetails?.period_of_delivery}{' '}
											days
										</span>
									</p>
								</div>
							)}

							{/* Bid details */}
							{order?.type_of_service === 'BID_DOCUMENTS' && (
								<div className='my-2 space-y-2'>
									<h4 className='my-4 text-lg font-medium'>Bid documents</h4>
									<p>
										Bid Title:{' '}
										<span className='font-bold text-md'>
											{orderQuery?.data?.bidDetails?.name}
										</span>
									</p>
									<p>
										Opening Date:{' '}
										<span className='font-bold text-md'>
											{orderQuery?.data?.bidDetails?.bid_opening_date}
										</span>
									</p>
									<p>
										Closing Date:{' '}
										<span className='font-bold text-md'>
											{orderQuery?.data?.bidDetails?.bid_closing_date}
										</span>
									</p>
								</div>
							)}
						</div>

						{/* Payment section */}
						{!generateResult && (
							<div className='md:col-span-5'>
								<div className='my-4'>
									<h4 className='text-lg font-medium'>Payment Information</h4>

									{!orderQuery.isLoading && (
										<div className='my-2 text-sm space-y-2'>
											{order?.payment?.prn ? (
												<>
													{order?.payment_method && (
														<div className='font-normal mb-1'>
															Payment Method:{' '}
															<span className='font-semibold text-lg'>
																{order?.payment_method}
															</span>
														</div>
													)}
													<div className='font-normal'>
														PRN:{' '}
														<span className='font-semibold'>
															{order?.payment?.prn}
														</span>
													</div>
													<div className='font-normal'>
														PRN Status:{' '}
														<span className='font-semibold'>
															{order?.payment?.prn_status_desc}
														</span>
													</div>
													<div className='font-normal'>
														PRN Search Code:{' '}
														<span className='font-semibold'>
															{order?.payment?.prn_search_code}
														</span>
													</div>
													<div className='font-normal'>
														PRN Expiry Date:{' '}
														<span className='font-semibold'>
															{order?.payment?.prn_expiry_date}
														</span>
													</div>
												</>
											) : (
												<>
													<div className=''>
														You've not yet generated a Payment Reference Number.
													</div>
													<Button
														onClick={async () =>
															await generatePRNMutation.mutateAsync({
																data: {
																	Amount: localStorage.getItem('totalCost'),
																	TaxPayerName: user?.name,
																	order_id: order.id,
																},
															})
														}
														isLoading={generatePRNMutation?.isLoading}>
														<span>Generate PRN Now</span>
													</Button>
												</>
											)}
										</div>
									)}
								</div>
							</div>
						)}
					</div>

					{order.payment?.prn_status === 'A' && (
						<div className=''>
							<div className='mb-5 bg-orange-100 text-orange-500 p-3 rounded-2xl'>
								Your payment for this order is pending. Complete payment by
								selecting your preferred method below.
							</div>
							<PaymentMethods orderId={id} />
						</div>
					)}
					{order.payment?.prn_status === ('X' || 'C') && (
						<div className=''>
							{generateResult === undefined && (
								<>
									<div className='mb-3'>
										PRN is expired. Please generate another PRN if you still
										want to complete this order.
									</div>
									<Button
										onClick={async () =>
											await generatePRNMutation.mutateAsync({
												data: {
													Amount: localStorage.getItem('totalCost'),
													TaxPayerName: user?.name,
													order_id: order.id,
												},
											})
										}
										isLoading={generatePRNMutation?.isLoading}>
										<span>Generate New PRN</span>
									</Button>
								</>
							)}
						</div>
					)}
				</div>
			</div>
		</MainLayout>
	);
};
