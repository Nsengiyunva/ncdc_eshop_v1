import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react';
import { Link } from 'react-router-dom';

export const PDFDownload = ({ rootId }) => {
	const downloadPDF = () => {
		const input = document.getElementById(rootId);

		html2canvas(input).then((canvas) => {
			const imgData = canvas.toDataURL('image/png');
			const pdf = new jsPDF('p', 'mm', 'a4', true);
			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = pdf.internal.pageSize.getHeight();

			pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
			pdf.save('paymentSlip.pdf');
		});
	};
	return (
		<div>
			<div className='px-8 py-2 bg-green-200 flex flex-col md:flex-row justify-between items-center my-12'>
				<p className='font-bold text-lg'>Payment Slip</p>
				<div className='flex space-x-4 items-center'>
					<Link to='/profile/orders'>Go back to Orders</Link>
					<button
						className='bg-green-800 text-white px-4 py-2'
						onClick={downloadPDF}>
						Print Payment Slip
					</button>
				</div>
			</div>
		</div>
	);
};
