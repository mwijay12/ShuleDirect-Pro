
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
  ImageRun
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
 */
export async function exportReportCardToWord(student: any, schoolName: string) {
  const logoBase64 = localStorage.getItem("shule_logo");
  const children: any[] = [];

  // 1. Institutional Header
  if (logoBase64) {
    try {
      const base64Data = logoBase64.split(',')[1];
      const buffer = Buffer.from(base64Data, 'base64');
      children.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new ImageRun({ data: buffer, transformation: { width: 80, height: 80 } })],
        })
      );
    } catch (e) { console.error("Logo processing node failed", e); }
  }

  children.push(
    new Paragraph({
      text: schoolName.toUpperCase(),
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { before: 200 },
    }),
    new Paragraph({
      text: "THE UNITED REPUBLIC OF TANZANIA",
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      text: "OFFICIAL ACADEMIC TRANSCRIPT • 2026 SEASON",
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    })
  );

  // 2. Student Metadata Node
  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: "Student Name: ", bold: true }),
        new TextRun(student.name),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "Institutional ID: ", bold: true }),
        new TextRun(student.id),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "Level / Class: ", bold: true }),
        new TextRun(student.class),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "Type: ", bold: true }),
        new TextRun(student.type),
      ],
      spacing: { after: 400 },
    })
  );

  // 3. Subject Matrix
  children.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ text: "SUBJECT NODE", bold: true })] }),
            new TableCell({ children: [new Paragraph({ text: "GRADE", bold: true })] }),
            new TableCell({ children: [new Paragraph({ text: "REMARKS", bold: true })] }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph("Civics / Kiswahili")] }),
            new TableCell({ children: [new Paragraph("A")] }),
            new TableCell({ children: [new Paragraph("Distinction")] }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph("Mathematics")] }),
            new TableCell({ children: [new Paragraph("A")] }),
            new TableCell({ children: [new Paragraph("Distinction")] }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph("English Node")] }),
            new TableCell({ children: [new Paragraph("B")] }),
            new TableCell({ children: [new Paragraph("Very Good")] }),
          ],
        }),
      ],
    })
  );

  // 4. Institutional Certification Footer
  children.push(
    new Paragraph({ text: "\n\n" }),
    new Paragraph({
      children: [
        new TextRun({ text: "This document is a certified academic output of the 2026 Sovereign Hub.", italics: true, size: 16 }),
      ],
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      text: "__________________________",
      alignment: AlignmentType.RIGHT,
      spacing: { before: 800 },
    }),
    new Paragraph({
      text: "Principal / Academic Node Head",
      alignment: AlignmentType.RIGHT,
    })
  );

  const doc = new Document({
    sections: [{ children: children }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${student.name.replace(/\s/g, '_')}_Transcript_2026.docx`);
}
