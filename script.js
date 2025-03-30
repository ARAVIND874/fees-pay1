// Function to save bill to history
function saveBillToHistory(registerNo, studentName, department, billType, billAmount, billDate) {
    let billHistory = JSON.parse(localStorage.getItem("billHistory")) || [];

    const newBill = {
        registerNo,
        studentName,
        department,
        billType,
        billAmount,
        billDate
    };

    billHistory.push(newBill);
    localStorage.setItem("billHistory", JSON.stringify(billHistory));

    displayBillHistory();
}

// Function to display bill history
function displayBillHistory() {
    const billHistoryDiv = document.getElementById("billHistory");
    billHistoryDiv.innerHTML = `
        <h3>📜 Billing History</h3>
        <button id="printHistory">🖨️ Print History</button>
        <button id="clearHistory">🗑️ Clear History</button>
        <div id="historyList"></div>
    `;

    let billHistory = JSON.parse(localStorage.getItem("billHistory")) || [];
    const historyList = document.getElementById("historyList");

    if (billHistory.length === 0) {
        historyList.innerHTML = "<p>No billing records found.</p>";
        return;
    }

    billHistory.forEach((bill, index) => {
        historyList.innerHTML += `
            <div class="history-item">
                <span class="history-count">${index + 1}.</span> 
                <span class="history-name">${bill.studentName} (${bill.registerNo})</span> 
                <span class="history-amount">₹${bill.billAmount}</span>
                <span class="history-type">${bill.billType} - ${bill.billDate}</span>
            </div>
        `;
    });

    // Attach event listeners
    document.getElementById("printHistory").addEventListener("click", printBillHistory);
    document.getElementById("clearHistory").addEventListener("click", clearBillHistory);
}

// Function to print bill history
function printBillHistory() {
    let billHistory = JSON.parse(localStorage.getItem("billHistory")) || [];

    if (billHistory.length === 0) {
        alert("No billing records to print.");
        return;
    }

    let printContent = `
        <html>
        <head>
            <title>Bill History</title>
            <style>
                body { font-family: 'Poppins', sans-serif; text-align: center; background: #f4f7fc; }
                .history-container { width: 90%; max-width: 600px; margin: auto; padding: 20px; background: white; border-radius: 12px; box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2); }
                h2 { color: #6a11cb; font-size: 22px; margin-bottom: 15px; }
                .history-item { background: #f8f9fa; padding: 8px; margin: 5px 0; border-radius: 5px; text-align: left; }
                .footer { margin-top: 15px; font-size: 14px; color: #555; font-style: italic; }
            </style>
        </head>
        <body>
            <div class="history-container">
                <h2>📜 Bill Payment History</h2>
    `;

    billHistory.forEach((bill, index) => {
        printContent += `
            <div class="history-item">
                <strong>${index + 1}.</strong> ${bill.studentName} (${bill.registerNo}) - ₹${bill.billAmount} 
                (${bill.billType}) on ${bill.billDate}
            </div>
        `;
    });

    printContent += `
                <div class="footer">A.V.V.M. Sri Pushpam College - Thank you!</div>
            </div>
            <script>
                window.print();
                window.close();
            </script>
        </body>
        </html>
    `;

    let printWindow = window.open("", "", "width=600,height=600");
    printWindow.document.write(printContent);
    printWindow.document.close();
}

// Function to clear bill history
function clearBillHistory() {
    if (confirm("Are you sure you want to clear all billing history?")) {
        localStorage.removeItem("billHistory");
        displayBillHistory();
    }
}

// Modify bill form submission to save history
document.getElementById("billForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const registerNo = document.getElementById("registerNo").value;
    const studentName = document.getElementById("studentName").value;
    const department = document.getElementById("department").value;
    const billType = document.getElementById("billType").value;
    const billAmount = document.getElementById("billAmount").value;
    const billDate = document.getElementById("billDate").value;

    // Save bill to history
    saveBillToHistory(registerNo, studentName, department, billType, billAmount, billDate);

    // Generate receipt
    const receipt = document.getElementById("receipt");
    receipt.innerHTML = `<img src='college_logo.png' alt='College Logo'>
        <h3>A.V.V.M. Sri Pushpam College</h3>
        <p><strong>Register No:</strong> ${registerNo}</p>
        <p><strong>Student Name:</strong> ${studentName}</p>
        <p><strong>Department:</strong> ${department}</p>
        <p><strong>Bill Type:</strong> ${billType}</p>
        <p><strong>Amount:</strong> ₹${billAmount}</p>
        <p><strong>Date:</strong> ${billDate}</p>`;
    receipt.classList.remove("hidden");
    document.getElementById("printBill").classList.remove("hidden");
});

// Load bill history on page load
window.onload = displayBillHistory;
document.getElementById("printBill").addEventListener("click", function() {
    const receiptContent = document.getElementById("receipt").innerHTML;
    const printWindow = window.open("", "", "width=600,height=600");

    printWindow.document.write(`
        <html>
        <head>
            <title>Bill Receipt</title>
            <style>
                body { 
                    font-family: 'Poppins', sans-serif; 
                    text-align: center;
                    background: #f4f7fc;
                    margin: 0;
                    padding: 0;
                }
                .receipt-container {
                    width: 90%;
                    max-width: 400px;
                    margin: auto;
                    padding: 20px;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
                    border: 3px solid #6a11cb;
                    text-align: left;
                }
                .receipt-header {
                    text-align: center;
                    border-bottom: 2px solid #6a11cb;
                    padding-bottom: 10px;
                    margin-bottom: 15px;
                }
                .receipt-header img {
                    width: 70px;
                }
                .receipt-header h2 {
                    color: #6a11cb;
                    font-size: 22px;
                    margin-top: 5px;
                }
                .receipt-details p {
                    font-size: 16px;
                    margin: 8px 0;
                    padding: 8px;
                    background: #f8f9fa;
                    border-radius: 6px;
                    font-weight: 500;
                }
                .receipt-footer {
                    text-align: center;
                    margin-top: 15px;
                    font-size: 14px;
                    color: #555;
                    font-style: italic;
                }
            </style>
        </head>
        <body>
            <div class="receipt-container">
                <div class="receipt-header">
                    <img src='college_logo.png' alt='College Logo'>
                    <h2>A.V.V.M. Sri Pushpam College</h2>
                </div>
                ${receiptContent}
                <div class="receipt-footer">
                    Thank you for your payment! <br>
                    A.V.V.M. Sri Pushpam College
                </div>
            </div>
            <script>
                window.print();
                window.close();
            </script>
        </body>
        </html>
    `);

    printWindow.document.close();
});