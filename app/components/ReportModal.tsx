import React, { useRef } from "react";
import { Modal, Button } from "antd";
import ReportTemplate from "./ReportTemplate";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ReportModal = ({ reportModal, setReportModal, data, selectedClass }:{
    reportModal: any;
    setReportModal: any;
    data: any;
    selectedClass: any;
}) => {
    const printRef = useRef(null);
    
    // Function to generate and download PDF
    const handlePrint = async () => {
        const input = printRef.current; // Reference to the print container
        
        const pdf = new jsPDF("p", "mm", "a4"); // Initialize jsPDF
        const elements = input.querySelectorAll(".report-page"); // Get each ReportTemplate page
        
        for (let i = 0; i < elements.length; i++) {
            const canvas = await html2canvas(elements[i], { scale: 2 }); // Render each page
            const imgData = canvas.toDataURL("image/png");
            
            if (i > 0) pdf.addPage(); // Add new page for each template
            pdf.addImage(imgData, "PNG", 0, 0, 210, 297); // Add the image (A4: 210x297 mm)
        }
        
        pdf.save("report.pdf"); // Save as PDF
    };
    
    return (
        <Modal
            width={1000}
            open={reportModal}
            onCancel={() => setReportModal(false)}
            footer={null}
        >
            <div>
                <Button color="primary" onClick={handlePrint}>
                    Download PDF
                </Button>
            </div>
            
            <div ref={printRef} id="print">
                {data.map((row, index) => (
                    <div className="report-page" key={index}>
                        {/* Each ReportTemplate is wrapped inside a page */}
                        <ReportTemplate row={row} selectedClass={selectedClass} />
                    </div>
                ))}
            </div>
        </Modal>
    );
};

export default ReportModal;
