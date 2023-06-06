function downloadExcel() {
    const table = document.getElementById('myTable');
    const workbook = XLSX.utils.table_to_book(table, { sheet: 'Sheet 1' });
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'table_data.xlsx');
  }

  function convertToPdf() {
    const table = document.getElementById('myTable');
    const workbook = XLSX.utils.table_to_book(table, { sheet: 'Sheet 1' });
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const pdfData = excelBufferToPdfData(excelBuffer);
    pdfMake.createPdf(pdfData).download('table_data.pdf');
  }

  function excelBufferToPdfData(excelBuffer) {
    const workbook = XLSX.read(excelBuffer, { type: 'array' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const pdfData = {
      content: [
        { text: 'Table Data', style: 'header' },
        {
          table: {
            body: jsonData
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        }
      }
    };
    return pdfData;
  }