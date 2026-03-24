import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React from "react";

export const PrintReceipt = ({ rootId }) => {
  const downloadPDF = () => {
    const input = document.getElementById(rootId);

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("receipt.pdf");
    });
  };
  return (
    <div>
      <button
        className="bg-green-500 text-white px-5 py-2 font-extrabold"
        onClick={downloadPDF}
      >
        Print Receipt
      </button>
    </div>
  );
};
