async function generateReportPDF() {
    // 1. Collect the data from your form
    const data = {
        customer: document.getElementById('cust-name').value || "N/A",
        ticket: document.getElementById('call-no').value || "N/A",
        model: document.getElementById('model-no').value || "N/A",
        serial: document.getElementById('serial-no').value || "N/A",
        description: document.getElementById('activity-desc').value || "No description provided.",
        date: document.getElementById('service-date').value || new Date().toLocaleDateString(),
        engineer: document.getElementById('eng-name').value
    };

    // 2. Create the "Professional Sheet" Template
    const reportTemplate = document.createElement('div');
    reportTemplate.style.padding = "40px";
    reportTemplate.style.color = "#000";
    reportTemplate.style.background = "#fff";
    reportTemplate.style.fontFamily = "Arial, sans-serif";

    reportTemplate.innerHTML = `
        <div style="border: 2px solid #000; padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #000; padding-bottom: 10px;">
                <div style="font-weight: bold; font-size: 24px;">FIELD ACTIVITY REPORT</div>
                <div style="text-align: right;">
                    <div style="font-weight: bold;">K. ALLEN TECH SERVICES</div>
                    <div style="font-size: 12px;">Kingston, Jamaica</div>
                </div>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr>
                    <td style="border: 1px solid #000; padding: 10px; width: 50%;"><strong>CUSTOMER:</strong> ${data.customer}</td>
                    <td style="border: 1px solid #000; padding: 10px;"><strong>TICKET NO:</strong> ${data.ticket}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #000; padding: 10px;"><strong>EQUIPMENT:</strong> ${data.model}</td>
                    <td style="border: 1px solid #000; padding: 10px;"><strong>SERIAL S/N:</strong> ${data.serial}</td>
                </tr>
            </table>

            <div style="margin-top: 20px; border: 1px solid #000; min-height: 400px; padding: 15px;">
                <div style="border-bottom: 1px solid #000; font-weight: bold; padding-bottom: 5px; margin-bottom: 10px;">WORK PERFORMED / DIAGNOSTICS:</div>
                <div style="white-space: pre-wrap; line-height: 1.6;">${data.description}</div>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr>
                    <td style="border: 1px solid #000; padding: 10px; width: 50%;"><strong>DATE:</strong> ${data.date}</td>
                    <td style="border: 1px solid #000; padding: 10px;"><strong>ENGINEER:</strong> ${data.engineer}</td>
                </tr>
            </table>
            
            <div style="margin-top: 30px; font-size: 10px; text-align: center; color: #666;">
                Official Technical Document - KATS Father & Son Engineering
            </div>
        </div>
    `;

    // 3. PDF Settings
    const opt = {
        margin: [10, 10],
        filename: `KATS_Report_${data.customer.replace(/\s+/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // 4. Generate the PDF from the template
    await html2pdf().set(opt).from(reportTemplate).save();
}
