import React from 'react';

export const Content = ({ children }) => {
	return (
		<div>
			<p className='font-bold text-lg'>{children}</p>
		</div>
	);
};
