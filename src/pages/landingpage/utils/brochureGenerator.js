import jsPDF from 'jspdf';

export const generateBrochure = () => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: 'a4'
  });

  // Cover Page - Enhanced Design
  doc.setFillColor(16, 185, 129); // Emerald Green
  doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
  
  // Add decorative elements
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(2);
  
  // Diagonal lines pattern
  for (let i = -100; i < doc.internal.pageSize.width + 100; i += 40) {
    doc.line(i, 0, i + 200, doc.internal.pageSize.height);
  }
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(56);
  doc.setFont('helvetica', 'bold');
  doc.text('RE-LINK', doc.internal.pageSize.width / 2, 200, { align: 'center' });
  
  doc.setFontSize(28);
  doc.setFont('helvetica', 'italic');
  doc.text('Second Chances, Real Connections', doc.internal.pageSize.width / 2, 280, { align: 'center' });
  
  doc.setFontSize(20);
  doc.setFont('helvetica', 'normal');
  doc.text('South Africa\'s Premier Reintegration Platform', doc.internal.pageSize.width / 2, 340, { align: 'center' });
  
  doc.setFontSize(16);
  doc.text('Est. 2020', doc.internal.pageSize.width / 2, 400, { align: 'center' });
  
  // Add footer line
  doc.setLineWidth(1);
  doc.line(40, 500, doc.internal.pageSize.width - 40, 500);
  
  // Page 2 - About - Enhanced
  doc.addPage();
  doc.setFillColor(245, 245, 245);
  doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
  
  // Add header line
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(3);
  doc.line(40, 80, 250, 80);
  
  doc.setTextColor(16, 185, 129);
  doc.setFontSize(42);
  doc.setFont('helvetica', 'bold');
  doc.text('About RE-LINK', 40, 70);
  
  doc.setTextColor(51, 51, 51);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  const aboutText = [
    'RE-LINK is a revolutionary South African platform dedicated to',
    'connecting rehabilitated individuals with meaningful employment',
    'opportunities, skills development, and community support.',
    '',
    'Our mission is to bridge the gap between rehabilitation and',
    'successful reintegration into society across all 9 provinces.',
    '',
    'We believe in second chances and the power of meaningful',
    'connections to transform lives and build a stronger South Africa.',
    '',
    'Since 2020, we have helped over 3,400 individuals find',
    'meaningful employment and rebuild their lives with dignity.'
  ];
  
  let yPos = 140;
  aboutText.forEach(line => {
    doc.text(line, 40, yPos);
    yPos += 28;
  });
  
  // Add decorative dots
  doc.setFillColor(16, 185, 129);
  for (let i = 0; i < 5; i++) {
    doc.circle(40 + (i * 15), 550, 3, 'F');
  }
  
  // Page 3 - Impact Stats - Enhanced
  doc.addPage();
  doc.setFillColor(16, 185, 129);
  doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
  
  // Add white circles
  doc.setFillColor(255, 255, 255, 0.1);
  doc.circle(400, 100, 80, 'F');
  doc.circle(100, 500, 120, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(42);
  doc.setFont('helvetica', 'bold');
  doc.text('Our Impact', 40, 70);
  
  const stats = [
    { label: 'Members Served', value: '3,426+' },
    { label: 'Jobs Secured', value: '1,845+' },
    { label: 'Partner Companies', value: '247+' },
    { label: 'Success Rate', value: '94%' },
    { label: 'Active Mentors', value: '234' },
    { label: 'Training Hours', value: '2,850+' },
    { label: 'Cities Covered', value: '45' },
    { label: 'Provinces', value: '9' }
  ];
  
  yPos = 140;
  stats.forEach((stat, index) => {
    if (index % 2 === 0) {
      doc.setFontSize(28);
      doc.setFont('helvetica', 'bold');
      doc.text(stat.value, 40, yPos);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'normal');
      doc.text(stat.label, 40, yPos + 30);
    } else {
      doc.setFontSize(28);
      doc.setFont('helvetica', 'bold');
      doc.text(stat.value, 280, yPos - 34);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'normal');
      doc.text(stat.label, 280, yPos - 4);
      yPos += 80;
    }
  });
  
  // Page 4 - Services - Enhanced
  doc.addPage();
  doc.setFillColor(245, 245, 245);
  doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
  
  // Add header line
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(3);
  doc.line(40, 80, 220, 80);
  
  doc.setTextColor(16, 185, 129);
  doc.setFontSize(42);
  doc.setFont('helvetica', 'bold');
  doc.text('Our Services', 40, 70);
  
  const services = [
    { title: 'Smart Job Matching', desc: 'AI-powered algorithm with 98% accuracy' },
    { title: 'Skills Development', desc: '156+ certified training courses' },
    { title: 'Secure Verification', desc: 'End-to-end encrypted verification' },
    { title: 'Mentorship Network', desc: '234 active mentors nationwide' },
    { title: 'Career Coaching', desc: 'Professional CV building & interview prep' },
    { title: 'Employer Partnerships', desc: '247+ verified employers' }
  ];
  
  doc.setTextColor(51, 51, 51);
  yPos = 140;
  services.forEach(service => {
    // Add bullet point
    doc.setFillColor(16, 185, 129);
    doc.circle(35, yPos - 8, 4, 'F');
    
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(service.title, 50, yPos);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'normal');
    doc.text(service.desc, 50, yPos + 20);
    yPos += 60;
  });
  
  // Page 5 - Contact - Enhanced
  doc.addPage();
  doc.setFillColor(16, 185, 129);
  doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
  
  // Add diagonal lines
  doc.setDrawColor(255, 255, 255, 0.2);
  doc.setLineWidth(1);
  for (let i = 0; i < 10; i++) {
    doc.line(0, i * 80, doc.internal.pageSize.width, i * 80 - 200);
  }
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(42);
  doc.setFont('helvetica', 'bold');
  doc.text('Contact Us', 40, 70);
  
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('📍 Head Office:', 40, 150);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text('123 Hope Street, Johannesburg, 2000', 40, 180);
  
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('📞 24/7 Helpline:', 40, 240);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text('0800 123 456', 40, 270);
  
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('📧 Email:', 40, 330);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text('support@re-link.co.za', 40, 360);
  
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('🌐 Website:', 40, 420);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text('www.re-link.co.za', 40, 450);
  
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('🕒 Office Hours:', 40, 510);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text('Mon-Fri: 8am - 5pm', 40, 540);
  
  doc.save('RE-LINK-Brochure.pdf');
};