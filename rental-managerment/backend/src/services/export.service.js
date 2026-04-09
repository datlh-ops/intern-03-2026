const ExcelJS = require('exceljs');

class ExportService {
    async exportToExcel(res, { fileName, headers, data }) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(fileName);

        // 1. Setup Headers
        worksheet.columns = headers.map(h => ({
            header: h.label,
            key: h.key,
            width: h.width || 20
        }));

        // 2. Style Header
        worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFF' } };
        worksheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '10b981' } // Màu emerald-600 (giống UI của bạn)
        };
        worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };

        // 3. Add Data
        worksheet.addRows(data);

        // 4. Style Rows
        worksheet.eachRow((row, rowNumber) => {
            row.alignment = { vertical: 'middle', horizontal: 'left' };
            row.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });

        // 5. Send to response
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            `attachment; filename=${fileName}.xlsx`
        );

        return await workbook.xlsx.write(res);
    }
}

module.exports = new ExportService();
