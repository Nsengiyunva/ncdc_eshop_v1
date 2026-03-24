import { Button } from 'components/Elements';
import { Form, InputField } from 'components/Form';
import { useAuth } from 'lib/auth';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { z } from 'zod';

export const RegisterTinForm = ({ onSuccess, details }) => {
	const { register, isRegistering } = useAuth();
	const [phone_number, setPhone_number] = useState('');

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const schema = z.object({
		name: z.string().min(2, 'Name must be at least 2 characters').max(50),
		email: z.string().email('Invalid email format'),
		password: z
			.string()
			.refine(
				(val) =>
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/.test(val),
				{
					message:
						'Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*())',
					path: ['password'],
				}
			),
	});

	return (
		<div>
			<Form
				onSubmit={async (values) => {
					values.tin = details?.TIN;
					values.role = 'USER';
					values.phone_number = phone_number;
					await register(values);
					// console.log(values);
					onSuccess();
				}}
				schema={schema}
				options={{
					shouldUnregister: true,
					defaultValues: {
						name: details?.GetClientRegistrationResponse?.GetClientRegistrationResult?.TaxPayerName,
						email: details?.GetClientRegistrationResponse?.GetClientRegistrationResult?.TaxPayerEmail,
					},
				}}>
				{({ register, formState }) => (
					<>
						<InputField
							type='text'
							label='Name'
							registration={register('name')}
							error={formState.errors['name']}
							required={true}
						/>

						<InputField
							type='email'
							label='Email Address'
							registration={register('email')}
							error={formState.errors['email']}
							required={true}
						/>

						<div>
							<label className='block text-sm font-medium text-gray-700 mb-4'>
								<span className='text-gray-400'>Phone Number</span>
							</label>
							<PhoneInput
								international
								countryCallingCodeEditable={false}
								defaultCountry='UG'
								onChange={(e) => {
									if (e === null || e === undefined) {
										setPhone_number('');
									} else setPhone_number(e);
								}}
								className='border-0'
							/>
							{phone_number && !isValidPhoneNumber(phone_number) && (
								<span className='text-sm font-semibold text-red-500'>
									Enter valid phone number
								</span>
							)}
						</div>
						<InputField
							type='password'
							label='Password'
							error={formState.errors['password']}
							registration={register('password')}
							required={true}
							caption='Password must include at least one lowercase letter, one uppercase
              letter, one digit, and one special character (!@#$%^&*())'
						/>
						<div>
							<Button
								isLoading={isRegistering}
								type='submit'
								className={`w-full ${
									isRegistering ? ' bg-gray-400' : ' bg-green-600'
								}`}>
								{isRegistering ? 'Registering...' : 'Register'}
							</Button>
						</div>
					</>
				)}
			</Form>
		</div>
	);
};

RegisterTinForm.propTypes = {
	onSuccess: PropTypes.func.isRequired,
};
