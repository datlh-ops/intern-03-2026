const ExcelJS = require('exceljs');

class ExportService {
    createStreamingWorkbook(res, fileName, headers) {

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}.xlsx`);

        const options = {
            stream: res, // Đẩy thẳng vào response
            useStyles: true,
            useSharedStrings: true
        };

        const workbook = new ExcelJS.stream.xlsx.WorkbookWriter(options);
        const worksheet = workbook.addWorksheet('Data');

        worksheet.columns = headers.map(h => ({
            header: h.label,
            key: h.key,
            width: h.width || 20
        }));

        // Style cho header
        const headerRow = worksheet.getRow(1);
        headerRow.font = { bold: true, color: { argb: 'FFFFFF' } };
        headerRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '10b981' }
        };
        headerRow.commit(); // Quan trọng: xác nhận dòng để đẩy đi

        return { workbook, worksheet };
    }
}

module.exports = new ExportService();
