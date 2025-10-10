// Caminho do arquivo: src/lib/exportService.ts

import { mcCheyneReadingPlan } from './mccheyneReadingPlan';
import { toast } from 'sonner';

export const exportReadingPlanToPDF = async () => {
  try {
    // Importação dinâmica das bibliotecas
    const { default: jsPDF } = await import('jspdf');
    const { default: autoTable } = await import('jspdf-autotable');

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
    toast.success("Plano de leitura exportado para PDF!");

  } catch (error) {
    console.error("Erro ao exportar para PDF:", error);
    toast.error("Ocorreu um erro ao exportar para PDF.");
  }
};

export const exportReadingPlanToExcel = async () => {
  try {
    // Importação dinâmica da biblioteca
    const XLSX = await import('xlsx');
    const { mcCheyneReadingPlan } = await import('./mccheyneReadingPlan');

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
    toast.success("Plano de leitura exportado para Excel!");

  } catch (error) {
    console.error("Erro ao exportar para Excel:", error);
    toast.error("Ocorreu um erro ao exportar para Excel.");
  }
};