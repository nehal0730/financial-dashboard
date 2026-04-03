/**
 * Export utilities for transactions and financial data
 */

/**
 * Export transactions to CSV format
 * @param {Array} transactions - Array of transaction objects
 * @returns {void} - Triggers download of CSV file
 */
export const exportToCSV = (transactions) => {
  if (!transactions || transactions.length === 0) {
    alert('No transactions to export');
    return;
  }

  // Define CSV headers
  const headers = ['ID', 'Date', 'Category', 'Type', 'Amount', 'Note'];
  
  // Create CSV rows
  const rows = transactions.map((tx) => [
    tx.id,
    tx.date,
    tx.category,
    tx.type,
    tx.amount,
    tx.note || '',
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map((row) =>
      row
        .map((cell) => {
          // Escape quotes and wrap in quotes if contains comma
          const escaped = String(cell).replace(/"/g, '""');
          return escaped.includes(',') ? `"${escaped}"` : escaped;
        })
        .join(',')
    ),
  ].join('\n');

  // Create blob and download
  downloadFile(csvContent, `transactions-${getCurrentDate()}.csv`, 'text/csv');
};

/**
 * Export transactions to JSON format
 * @param {Array} transactions - Array of transaction objects
 * @returns {void} - Triggers download of JSON file
 */
export const exportToJSON = (transactions) => {
  if (!transactions || transactions.length === 0) {
    alert('No transactions to export');
    return;
  }

  const jsonContent = JSON.stringify(transactions, null, 2);
  downloadFile(jsonContent, `transactions-${getCurrentDate()}.json`, 'application/json');
};

/**
 * Export financial summary to JSON
 * @param {Object} summary - Summary object with totals
 * @returns {void} - Triggers download of JSON file
 */
export const exportSummaryToJSON = (summary) => {
  const content = JSON.stringify(summary, null, 2);
  downloadFile(content, `finance-summary-${getCurrentDate()}.json`, 'application/json');
};

/**
 * Helper function to trigger file download
 * @param {string} content - File content
 * @param {string} filename - File name with extension
 * @param {string} type - MIME type
 */
const downloadFile = (content, filename, type) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Get current date in YYYY-MM-DD format
 * @returns {string} - Formatted date string
 */
const getCurrentDate = () => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};
