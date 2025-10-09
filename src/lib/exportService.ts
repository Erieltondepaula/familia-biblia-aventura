import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { mcCheyneReadingPlan } from './mccheyneReadingPlan';

export const exportReadingPlanToPDF = () => {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Plano de Leitura Bíblica M\'Cheyne - 365 Dias', 14, 20);
  
  // Subtitle
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Leia toda a Bíblia em um ano com este plano estruturado', 14, 28);
  
  // Table data
  const tableData = mcCheyneReadingPlan.map(day => [
    day.day.toString(),
    day.familyOT,
    day.familyNT,
    day.personalOT,
    day.personalNT
  ]);
  
  // Generate table
  autoTable(doc, {
    head: [['Dia', 'Leitura Familiar AT', 'Leitura Familiar NT', 'Leitura Pessoal AT', 'Leitura Pessoal NT']],
    body: tableData,
    startY: 35,
    theme: 'grid',
    headStyles: {
      fillColor: [99, 102, 241], // Indigo color
      textColor: 255,
      fontSize: 9,
      fontStyle: 'bold'
    },
    bodyStyles: {
      fontSize: 8
    },
    columnStyles: {
      0: { cellWidth: 15, halign: 'center' },
      1: { cellWidth: 40 },
      2: { cellWidth: 40 },
      3: { cellWidth: 40 },
      4: { cellWidth: 40 }
    },
    margin: { top: 35, left: 14, right: 14 }
  });
  
  // Save PDF
  doc.save('plano-leitura-biblia-mccheyne.pdf');
};

export const exportReadingPlanToExcel = () => {
  // Prepare data for Excel
  const excelData = mcCheyneReadingPlan.map(day => ({
    'Dia': day.day,
    'Leitura Familiar - Antigo Testamento': day.familyOT,
    'Leitura Familiar - Novo Testamento': day.familyNT,
    'Leitura Pessoal - Antigo Testamento': day.personalOT,
    'Leitura Pessoal - Novo Testamento': day.personalNT
  }));
  
  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(excelData);
  
  // Set column widths
  worksheet['!cols'] = [
    { wch: 8 },  // Dia
    { wch: 30 }, // Leitura Familiar AT
    { wch: 30 }, // Leitura Familiar NT
    { wch: 30 }, // Leitura Pessoal AT
    { wch: 30 }  // Leitura Pessoal NT
  ];
  
  // Create workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Plano M\'Cheyne');
  
  // Save file
  XLSX.writeFile(workbook, 'plano-leitura-biblia-mccheyne.xlsx');
};
