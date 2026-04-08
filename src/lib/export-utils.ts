import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  AlignmentType, 
  HeadingLevel, 
  Table, 
  TableRow, 
  TableCell, 
  WidthType, 
  ImageRun,
  BorderStyle,
  VerticalAlign
} from 'docx';

/**
 * Institutional Excel Export Engine
 */
export function exportToExcel(data: any[], fileName: string) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Ledger");
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
  saveAs(blob, `${fileName}_2026.xlsx`);
}

/**
 * Official Transcript Generation (Sovereign Hub Format)
 * Designed for High-Fidelity NECTA Alignment
 */
export async function exportReportCardToWord(student: any, schoolName: string) {
  const logoBase64 = localStorage.getItem("shule_logo");
  const children: any[] = [];

  // 1. Professional Header Node
  if (logoBase64) {
    try {
      const base64Data = logoBase64.split(',')[1];
      const buffer = Buffer.from(base64Data, 'base64');
      children.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new ImageRun({ data: buffer, transformation: { width: 100, height: 100 } })],
        })
      );
    } catch (e) { console.error("Logo processing node failed", e); }
  }

  children.push(
    new Paragraph({
      text: schoolName.toUpperCase(),
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 100 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: "THE UNITED REPUBLIC OF TANZANIA", bold: true, size: 24 }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
      children: [
        new TextRun({ text: "OFFICIAL ACADEMIC TRANSCRIPT • 2026 SEASON", size: 20, color: "1F5BA6", bold: true }),
      ],
    })
  );

  // 2. Student Metadata Matrix
  children.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top: { style: BorderStyle.NONE },
        bottom: { style: BorderStyle.NONE },
        left: { style: BorderStyle.NONE },
        right: { style: BorderStyle.NONE },
        insideHorizontal: { style: BorderStyle.NONE },
        insideVertical: { style: BorderStyle.NONE },
      },
      rows: [
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "STUDENT NAME:", bold: true, size: 18 }), new TextRun({ text: ` ${student.name.toUpperCase()}`, size: 18 })] })] }),
            new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "ID NODE:", bold: true, size: 18 }), new TextRun({ text: ` ${student.id}`, size: 18 })] })] }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "ACADEMIC TIER:", bold: true, size: 18 }), new TextRun({ text: ` ${student.class}`, size: 18 })] })] }),
            new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "RESIDENCE:", bold: true, size: 18 }), new TextRun({ text: ` ${student.type.toUpperCase()}`, size: 18 })] })] }),
          ],
        }),
      ],
    }),
    new Paragraph({ text: "", spacing: { before: 400 } })
  );

  // 3. Official Subject Matrix
  children.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          tableHeader: true,
          children: [
            new TableCell({ shading: { fill: "F1F5F9" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "SUBJECT NODE", bold: true, size: 18 })] })] }),
            new TableCell({ shading: { fill: "F1F5F9" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "GRADE", bold: true, size: 18 })] })] }),
            new TableCell({ shading: { fill: "F1F5F9" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "REMARKS", bold: true, size: 18 })] })] }),
          ],
        }),
        // Mock entries for demo
        ...["Kiswa-hili", "English Language", "Mathematics", "Science & Tech", "Social Studies"].map(sub => (
          new TableRow({
            children: [
              new TableCell({ verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ text: sub, size: 18 })] }),
              new TableCell({ verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, text: "A", size: 18 })] }),
              new TableCell({ verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, text: "EXCELLENT", size: 18 })] }),
            ],
          })
        ))
      ],
    })
  );

  // 4. Institutional Certification Footer
  children.push(
    new Paragraph({ text: "", spacing: { before: 1000 } }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: "THIS DOCUMENT IS A CERTIFIED ACADEMIC OUTPUT OF THE 2026 SOVEREIGN HUB.", italics: true, size: 16, color: "64748B" }),
      ],
    }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top: { style: BorderStyle.NONE },
        bottom: { style: BorderStyle.NONE },
        left: { style: BorderStyle.NONE },
        right: { style: BorderStyle.NONE },
        insideHorizontal: { style: BorderStyle.NONE },
        insideVertical: { style: BorderStyle.NONE },
      },
      rows: [
        new TableRow({
          children: [
            new TableCell({ children: [
              new Paragraph({ text: "DATE: " + new Date().toLocaleDateString(), size: 18 }),
              new Paragraph({ text: "STAMP NODE:", size: 18 })
            ] }),
            new TableCell({ children: [
              new Paragraph({ alignment: AlignmentType.RIGHT, text: "__________________________", spacing: { before: 400 } }),
              new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "PRINCIPAL / HUB HEAD", bold: true, size: 18 })] })
            ] }),
          ],
        }),
      ],
    })
  );

  const doc = new Document({
    sections: [{ children: children }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${student.name.replace(/\s/g, '_')}_Transcript_2026.docx`);
}
