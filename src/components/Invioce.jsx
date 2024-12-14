import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import React, { useReducer, useRef } from 'react'

const Invioce = () => {

    const printRef = useRef()

    const handelPDFDownload = async () => {
        const element = printRef.current
        console.log(element)

        if (!element) {
            return
        }

        const canvas = await html2canvas(element, {
            scale: 2,
        })
        const imgData = canvas.toDataURL("image/png")

        const pdf = new jsPDF({
            orientation: "poatrait",
            unit: "px",
            format: "a4",

        });

        const imgProperties = pdf.getImageProperties(imgData)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
        pdf.save("Invoice.pdf")
    }

    const handleImgDownload = async () => {
        const element = printRef.current;

        if (!element) {
            return;
        }

        const canvas = await html2canvas(element, {
            scale: 2,
        });

        const imgData = canvas.toDataURL("image/png");

        // Create a temporary link element
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'Invoice.png'; 

        // Trigger a click event to initiate the download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-zinc-800 p-8 flex flex-col items-center ">
            <div
                className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl"
            >
                <div
                    className="p-8 bg-white border border-gray-200"
                    ref={printRef}
                >
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
                            <p className="text-sm text-gray-600">Invoice #INV-2024-001</p>
                        </div>
                        <div className="text-right">
                            <h2 className="font-semibold">Dru</h2>
                            <p className="text-sm text-gray-600">
                                123 online
                                <br />
                                Planet Earth
                            </p>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4">Bill To:</h3>
                        <p className="text-gray-700">
                            Joji
                            <br />
                            YT Music
                            <br />
                            Mars
                        </p>
                    </div>

                    <table className="w-full mb-8 border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2 text-left">Description</th>
                                <th className="border p-2 text-right">Quantity</th>
                                <th className="border p-2 text-right">Unit Price</th>
                                <th className="border p-2 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border p-2">Web Design Service</td>
                                <td className="border p-2 text-right">1</td>
                                <td className="border p-2 text-right">$1,500.00</td>
                                <td className="border p-2 text-right">$1,500.00</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Hosting Setup</td>
                                <td className="border p-2 text-right">1</td>
                                <td className="border p-2 text-right">$250.00</td>
                                <td className="border p-2 text-right">$250.00</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="flex justify-end">
                        <div className="w-64">
                            <div className="flex justify-between mb-2">
                                <span>Subtotal:</span>
                                <span>$1,750.00</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Tax (10%):</span>
                                <span>$175.00</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total:</span>
                                <span>$1,925.00</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-center gap-5">
                    <button
                        onClick={handelPDFDownload}
                        className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        Download PDF
                    </button>

                    <button
                        onClick={handleImgDownload}
                        className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        Download Image
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Invioce