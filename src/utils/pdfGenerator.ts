import { jsPDF } from 'jspdf';
import { KITE_PDF_CATALOG, PDF_SUMMARY } from '../data/kitePdfData';

export function generateAndDownloadKitePdf() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Helper for footer
  const addFooter = (pageNum: number, totalPages: number) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(
      `KITE ROBOTICS • www.kiterobotics.in • ${PDF_SUMMARY.contact.email} • +91 ${PDF_SUMMARY.contact.phone}`,
      pageWidth / 2,
      pageHeight - 8,
      { align: 'center' }
    );
    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - 16, pageHeight - 8, {
      align: 'right',
    });
  };

  // Helper for header on content pages
  const addPageHeader = (title: string, subtitle: string) => {
    // Top banner background
    doc.setFillColor(10, 15, 30);
    doc.rect(0, 0, pageWidth, 24, 'F');

    // Accent line
    doc.setFillColor(6, 182, 212);
    doc.rect(0, 24, pageWidth, 1.2, 'F');

    // Brand logo text
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text('KITE ROBOTICS', 14, 12);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(34, 211, 238);
    doc.text('KITS & COMPONENTS SPECIFICATION MANUAL', 14, 18);

    // Section title on the right
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.text(title, pageWidth - 14, 12, { align: 'right' });

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text(subtitle, pageWidth - 14, 18, { align: 'right' });
  };

  // ==========================================
  // PAGE 1: COVER PAGE
  // ==========================================
  // Dark Navy Hero background
  doc.setFillColor(7, 13, 26);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Decorative futuristic cyber grid lines / top accent bar
  doc.setFillColor(249, 115, 22); // Orange
  doc.rect(0, 0, pageWidth, 5, 'F');
  doc.setFillColor(6, 182, 212); // Cyan accent
  doc.rect(20, 5, pageWidth - 40, 2, 'F');

  // Top Tagline
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(249, 115, 22); // Orange
  doc.text('INNOVATE TODAY.', pageWidth / 2, 28, { align: 'center' });

  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text('TRANSFORM TOMORROW.', pageWidth / 2, 38, { align: 'center' });

  doc.setFontSize(16);
  doc.setTextColor(34, 211, 238); // Cyan
  doc.text('INSPIRE GENERATIONS.', pageWidth / 2, 47, { align: 'center' });

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(203, 213, 225);
  doc.text('Empowering Minds. Building Futures.', pageWidth / 2, 57, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('Through Robotics, STEM & AI.', pageWidth / 2, 63, { align: 'center' });

  // Big central emblem / brand badge box
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(35, 75, pageWidth - 70, 75, 5, 5, 'F');
  doc.setDrawColor(6, 182, 212);
  doc.setLineWidth(0.8);
  doc.roundedRect(35, 75, pageWidth - 70, 75, 5, 5, 'D');

  // Brand Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(36);
  doc.setTextColor(255, 255, 255);
  doc.text('KITE', pageWidth / 2, 102, { align: 'center' });

  doc.setFontSize(18);
  doc.setTextColor(249, 115, 22);
  doc.text('ROBOTICS', pageWidth / 2, 112, { align: 'center' });

  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');
  doc.text('— THE —', pageWidth / 2, 122, { align: 'center' });

  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('KITS AND COMPONENTS', pageWidth / 2, 131, { align: 'center' });
  doc.setTextColor(34, 211, 238);
  doc.text('WE USE', pageWidth / 2, 139, { align: 'center' });

  // 4 Core Pillars
  const pillarY = 165;
  const colWidth = (pageWidth - 28) / 4;
  PDF_SUMMARY.pillars.forEach((p, idx) => {
    const x = 14 + idx * colWidth;
    doc.setFillColor(15, 23, 42);
    doc.roundedRect(x + 1, pillarY, colWidth - 2, 45, 3, 3, 'F');
    doc.setDrawColor(51, 65, 85);
    doc.setLineWidth(0.4);
    doc.roundedRect(x + 1, pillarY, colWidth - 2, 45, 3, 3, 'D');

    // Colored accent top
    doc.setFillColor(idx % 2 === 0 ? 6 : 249, idx % 2 === 0 ? 182 : 115, idx % 2 === 0 ? 212 : 22);
    doc.rect(x + 1, pillarY, colWidth - 2, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(p.title, x + colWidth / 2, pillarY + 12, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(203, 213, 225);
    const splitDesc = doc.splitTextToSize(p.desc, colWidth - 6);
    doc.text(splitDesc, x + colWidth / 2, pillarY + 22, { align: 'center' });
  });

  // Contact Footer Box
  doc.setFillColor(10, 15, 30);
  doc.rect(0, pageHeight - 35, pageWidth, 35, 'F');
  doc.setFillColor(6, 182, 212);
  doc.rect(0, pageHeight - 35, pageWidth, 1, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(34, 211, 238);
  doc.text('OFFICIAL CONTACT & VERIFICATION', pageWidth / 2, pageHeight - 26, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text(
    `Website: ${PDF_SUMMARY.contact.website}    •    Email: ${PDF_SUMMARY.contact.email}    •    Phone: +91 ${PDF_SUMMARY.contact.phone}`,
    pageWidth / 2,
    pageHeight - 16,
    { align: 'center' }
  );

  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Atal Tinkering Labs (ATL) • STEM School Curriculums • College Robotics Labs', pageWidth / 2, pageHeight - 9, { align: 'center' });

  // ==========================================
  // PAGES 2 - 7: COMPONENT SECTIONS
  // ==========================================
  KITE_PDF_CATALOG.forEach((section, sIdx) => {
    doc.addPage();
    addPageHeader(section.title.toUpperCase(), section.part || `Section ${sIdx + 1}`);

    // Subtitle bar
    doc.setFillColor(241, 245, 249);
    doc.rect(14, 28, pageWidth - 28, 9, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`Official Hardware Inventory: ${section.items.length} Standard Components Included`, 18, 34);

    // Grid layout: 2 columns, rows of items
    const startY = 41;
    const itemWidth = (pageWidth - 28 - 6) / 2;
    const itemHeight = 17.5;
    const maxItemsPerPage = 12;

    section.items.forEach((item, idx) => {
      // If items exceed one page, paginate
      const localIdx = idx % maxItemsPerPage;
      if (idx > 0 && localIdx === 0) {
        addFooter(doc.getNumberOfPages(), 8);
        doc.addPage();
        addPageHeader(section.title.toUpperCase(), `${section.part || ''} (Cont.)`);
      }

      const col = localIdx % 2;
      const row = Math.floor(localIdx / 2);
      const x = 14 + col * (itemWidth + 6);
      const y = startY + row * (itemHeight + 3);

      // Card Box
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(x, y, itemWidth, itemHeight, 2, 2, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.3);
      doc.roundedRect(x, y, itemWidth, itemHeight, 2, 2, 'D');

      // Left Accent Strip
      doc.setFillColor(
        item.accentColor.startsWith('#')
          ? parseInt(item.accentColor.slice(1, 3), 16)
          : 6,
        item.accentColor.startsWith('#')
          ? parseInt(item.accentColor.slice(3, 5), 16)
          : 182,
        item.accentColor.startsWith('#')
          ? parseInt(item.accentColor.slice(5, 7), 16)
          : 212
      );
      doc.rect(x, y, 2.5, itemHeight, 'F');

      // Number Index
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text(`${idx + 1}.`, x + 5, y + 5);

      // Component Name
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      const nameText = item.name.length > 27 ? item.name.substring(0, 25) + '...' : item.name;
      doc.text(nameText, x + 12, y + 5);

      // Category Pill
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(71, 85, 105);
      doc.text(`[${item.category}]`, x + itemWidth - 4, y + 5, { align: 'right' });

      // Description text wrapped
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(71, 85, 105);
      const descLines = doc.splitTextToSize(item.description, itemWidth - 10);
      doc.text(descLines.slice(0, 2), x + 5, y + 10.5);
    });

    addFooter(doc.getNumberOfPages(), 8);
  });

  // Save the PDF
  doc.save('KITE-Robotics-Kits-and-Components-Specification.pdf');
}
