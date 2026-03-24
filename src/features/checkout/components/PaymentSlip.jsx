import { Button, Drawer } from "components/Elements";
import { useDisclosure } from "hooks/useDisclosure";
import React, { useRef } from "react";
import URALogo from "assets/ura-logo.png";
import Barcode from "react-barcode";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { formatDate } from "utils/format";
import { ImDownload2 } from "react-icons/im";
import { useAuth } from "lib/auth";

export const PaymentSlip = ({ order }) => {
  const { close, open, isOpen } = useDisclosure();

  const paymentSlip = useRef();

  const { user } = useAuth();

  const handlePrint = async () => {
    const content = paymentSlip.current;

    const canvas = await html2canvas(content);
    const imgData = canvas.toDataURL("image/png");

    const date = new Date();

    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    pdf.save(`Payment Slip ${order?.id} - ${formatDate(date)}.pdf`);
  };

  const handlePreviewClick = async () => {
    open();
  };

  const date = new Date();

  console.log("order", order);

  return (
    <>
      <div className="">
        <Button
          onClick={handlePreviewClick}
          className="whitespace-nowrap"
          startIcon={<ImDownload2 />}
        >
          Click to download Payment Slip
        </Button>
      </div>
      <Drawer
        title={`Payment Slip`}
        isOpen={isOpen}
        onClose={close}
        renderFooter={() => (
          <>
            <Button onClick={handlePrint}>Download Slip</Button>
          </>
        )}
        size="full"
      >
        <div className="print-content" ref={paymentSlip}>
          <div className="text-xs lg:text-base w-5/6 mx-auto py-10">
            {/* Header */}
            <div className="grid grid-cols-3 gap-8">
              {/* Logos */}
              <div className="space-y-8">
                <img src={URALogo} className="w-32" alt="ura logo" />
                <div>
                  <p>
                    {order?.user?.name || user.name} <br />
                    {order?.user?.email || user.email} <br />
                    {order?.user?.phone_number || user.phone_number} <br />
                    {order?.tax_payer_address?.village_name}
                    <br /> {order?.tax_payer_address?.user?.sub_county_name}
                    <br /> {order?.tax_payer_address?.user?.district_name}
                    <br />
                    {order?.tax_payer_address?.county_name}
                  </p>
                </div>
              </div>
              {/* Address */}
              <div className="text-center space-y-4">
                <p className="font-black px-3 py-2 bg-gray-300 md:text-lg">
                  Payment Registration Slip
                </p>
              </div>
              {/* Contact */}
              <div className="flex flex-col items-end space-y-4">
                <div className="flex flex-col items-end">
                  <p className="font-bold md:font-black md:text-lg">
                    For General Tax Questions
                  </p>
                  <p>call our Toll Free</p>
                  <p className="font-bold md:font-black md:text-lg">
                    (256) 800117000
                  </p>
                  <p>Or log on to URA web portal</p>
                  <p className="font-bold md:font-black md:text-lg">
                    http://ura.go.ug
                  </p>
                </div>
                <p>NOTICE DT - 2074</p>
                <div className="flex flex-col items-end">
                  <p className="font-bold md:font-black md:text-lg">
                    Taxpayer TIN
                  </p>
                  <p>{order?.user?.tin || user?.tin}</p>
                  <p className="font-bold md:font-black md:text-lg">
                    Payment Registration Number
                  </p>
                  <p>{order?.payment?.prn}</p>
                </div>
                {/* Part for the barcode */}
                <Barcode
                  value={order?.payment?.prn}
                  height={50}
                  textPosition="top"
                  displayValue="false"
                />
              </div>
            </div>
            <p className="text-center font-black md:text-lg my-4">
              PAYMENT REGISTRATION DETAILS
            </p>
            <div className="space-y-4">
              <table className="table-auto w-full text-left border-collapse">
                <tbody className="text-left">
                  <tr>
                    <td colSpan="3">
                      <span className="font-black">Tax Head:</span>
                      {order?.tax_head_name}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="font-black">Amount(in UGX):</span>{" "}
                      {order?.amount?.toLocaleString()}
                    </td>
                    <td>
                      <span className="font-black">Base value in Ugx:</span>{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="font-black">Units:</span>
                    </td>
                    <td>
                      <span className="font-black">Identity Proof Type: </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="font-black">
                        Order Reference Number:{" "}
                      </span>
                      {order?.id}
                    </td>
                    <td>
                      <span className="font-black">
                        Identity Proof Number:{" "}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="font-black">
                        Country of Registration:
                      </span>
                    </td>
                    <td>
                      <span className="font-black">Reference Date:</span>{" "}
                      {date.toDateString()}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="grid grid-cols-2 gap-8">
                {/* Cheques table */}
                <div>
                  <p className="text-center bg-gray-300 py-2 px-2 font-black">
                    CHEQUES ONLY
                  </p>
                  <table className="table-auto w-full text-left border-collapse">
                    <tbody>
                      <tr>
                        <td>
                          <span className="font-black">Bank: </span>
                        </td>
                        <td>
                          <span className="font-black">Check number: </span>
                        </td>
                        <td>
                          <span className="font-black">Amount (UGX)</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="my-4"></div>
                        </td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="my-2">
                    Amount in words: _____________________________________
                    <br />
                    _____________________________________
                  </p>
                  {/* Bank Endorsement */}
                  <p className="border border-gray-500 py-8 px-10 text-center my-4">
                    BANK STAMP AND ENDORSEMENT
                  </p>
                </div>

                {/* Cash only */}
                <div>
                  <div>
                    <p className="text-center bg-gray-300 py-2 px-2">
                      CASH ONLY
                    </p>
                    <table className="table-auto w-full text-left border-collapse">
                      <thead>
                        <tr>
                          <th>Currency</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>50,000/=</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>20,000/=</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>10,000/=</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>5,000/=</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>2,000/=</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>1,000/=</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>500/=</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>200/=</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>100/=</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Total</td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="my-4">
                      Amount in words: _____________________________________
                      <br />
                      _____________________________________
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <table className="table-auto w-full text-left border-collapse">
                  <tbody>
                    <tr>
                      <td>
                        <span className="font-black">Paid in by</span>
                      </td>
                      <td>
                        <span className="font-black">Contact number</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Signature</td>
                      <td>
                        <span className="font-black">Search Code:</span>{" "}
                        {order?.payment?.prn_search_code}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="">
                <p>
                  <span className="my-4 font-bold">
                    This notice has been issued for and on behalf of the
                    National Curriculum Development Center.
                  </span>
                  <br />
                  <br />
                  After payment to the bank, you may track the status of your
                  payment either at any nearest tax office or URA web portal at
                  <span className="text-green-500">
                    {" "}
                    https://www.ura.go.ug
                  </span>{" "}
                  or NCDC eshop at
                  <span className="text-green-500">
                    {" "}
                    https://www.eshop.ncdc.go.ug/check-prn-status
                  </span>
                  , using the Payment Registration Number (PRN) above. This
                  Payment Registration Slip shall remain valid until{" "}
                  <span className="text-green-500">
                    {order?.payment?.prn_expiry_date}
                  </span>
                  . After its expiry, you will not be able to use it for
                  effecting your payment at the bank. You will be required to
                  generate another payment Slip. If this payment registration
                  slip is lost or defected, you may obtain a copy from your
                  email inbox, eshop account, or a reprint from URA web portal
                  using the PRN and search code above.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};
