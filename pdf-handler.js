async function generateReportPDF() {
    // 1. Collect data from your HTML IDs
    const formData = {
        customer: document.getElementById('cust-name').value || "N/A",
        ticket: document.getElementById('call-no').value || "N/A",
        model: document.getElementById('model-no').value || "N/A",
        serial: document.getElementById('serial-no').value || "N/A",
        description: document.getElementById('activity-desc').value || "No diagnostic details provided.",
        date: document.getElementById('service-date').value || new Date().toLocaleDateString(),
        engineer: document.getElementById('eng-name').value
    };

    try {
        // 2. Fetch the 'template.docx' you uploaded to GitHub
        const response = await fetch('template.docx');
        const content = await response.arrayBuffer();
        
        const zip = new PizZip(content);
        const doc = new window.docxtemplater(zip, { 
            paragraphLoop: true, 
            linebreaks: true 
        });

        // 3. Inject the data into the {brackets} in your template
        doc.render(formData);

        // 4. Generate the final file
        const out = doc.getZip().generate({
            type: "blob",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });

        // 5. Save the finished report
        saveAs(out, `KATS_Report_${formData.customer.replace(/\s+/g, '_')}.docx`);
        
    } catch (error) {
        console.error("Template Error:", error);
        alert("Error: Ensure template.docx is in your GitHub folder and matches the tags.");
    }
}
