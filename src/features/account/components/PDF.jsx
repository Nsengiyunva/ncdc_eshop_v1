import { Document, Page, Text } from '@react-pdf/renderer';

const table = () => {
	return (
		<div>
			<table>
				<thead>
					<td>Name</td>
					<td>Amount</td>
				</thead>
				<tbody>
					<tr>
						<td>Ntwali</td>
						<td>12000</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export const PDFDownload = () => {
	return (
		<Document>
			<Page>
				<Text>some content here</Text>
			</Page>
		</Document>
	);
};
