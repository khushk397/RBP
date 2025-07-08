// Initialize jsPDF
const { jsPDF } = window.jspdf;

// Current format selection and style
let currentFormat = 'chronological';
const templateStyles = {
  chronological: {
    bgColor: [255, 255, 255],
    headerColor: [44, 62, 80],
    sectionColor: [44, 62, 80],
    textColor: [40, 40, 40],
    accentColor: [44, 62, 80],
    font: 'Georgia',
    lineColor: [44, 62, 80]
  },
  functional: {
    bgColor: [248, 249, 250],
    headerColor: [231, 76, 60],
    sectionColor: [231, 76, 60],
    textColor: [40, 40, 40],
    accentColor: [231, 76, 60],
    font: 'Arial',
    lineColor: [231, 76, 60]
  },
  hybrid: {
    bgColor: [240, 248, 255],
    headerColor: [52, 152, 219],
    sectionColor: [52, 152, 219],
    textColor: [40, 40, 40],
    accentColor: [52, 152, 219],
    font: 'Helvetica',
    lineColor: [52, 152, 219]
  }
};

// Tab navigation
function showTab(tabName) {
  document.querySelectorAll('.form-tab').forEach(tab => {
    tab.style.display = 'none';
  });
  document.getElementById(tabName + '-tab').style.display = 'block';

  document.querySelectorAll('.form-tabs button').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
}

// Add education field
function addEducationField() {
  const container = document.getElementById('education-fields');
  const newField = document.createElement('div');
  newField.className = 'dynamic-item';
  newField.innerHTML = `
            <div class="form-group">
                <label>Institution</label>
                <input type="text" name="institution" required>
            </div>
            <div class="form-group">
                <label>Degree</label>
                <input type="text" name="degree" required>
            </div>
            <div class="form-group">
                <label>Field of Study</label>
                <input type="text" name="fieldOfStudy">
            </div>
            <div class="form-group">
                <label>Date</label>
                <input type="text" name="educationDate" placeholder="e.g. 2015-2019">
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea name="educationDescription"></textarea>
            </div>
            <button type="button" class="remove-btn" onclick="removeField(this)">×</button>
        `;
  container.appendChild(newField);
}

// Add experience field
function addExperienceField() {
  const container = document.getElementById('experience-fields');
  const newField = document.createElement('div');
  newField.className = 'dynamic-item';
  newField.innerHTML = `
            <div class="form-group">
                <label>Job Title</label>
                <input type="text" name="jobTitle" required>
            </div>
            <div class="form-group">
                <label>Company</label>
                <input type="text" name="company" required>
            </div>
            <div class="form-group">
                <label>Date</label>
                <input type="text" name="jobDate" placeholder="e.g. Jan 2018 - Present">
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea name="jobDescription"></textarea>
            </div>
            <button type="button" class="remove-btn" onclick="removeField(this)">×</button>
        `;
  container.appendChild(newField);
}

// Add skill field
function addSkillField() {
  const container = document.getElementById('skills-fields');
  const newField = document.createElement('div');
  newField.className = 'dynamic-item';
  newField.innerHTML = `
            <div class="form-group">
                <label>Skill Name</label>
                <input type="text" name="skillName" required>
            </div>
            <div class="form-group">
                <label>Skill Level</label>
                <select name="skillLevel">
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                </select>
            </div>
            <button type="button" class="remove-btn" onclick="removeField(this)">×</button>
        `;
  container.appendChild(newField);
}

// Remove field
function removeField(button) {
  button.parentElement.remove();
}

// Select format
function selectFormat(format) {
  currentFormat = format;

  document.querySelectorAll('.template-card').forEach(card => {
    card.classList.remove('selected');
  });
  document.querySelector(`.template-card[data-format="${format}"]`).classList.add('selected');

  applyFormatStyles();
}

// Generate resume preview
function generateResume() {
  const firstName = document.getElementById('firstName').value || 'Your';
  const lastName = document.getElementById('lastName').value || 'Name';
  const email = document.getElementById('email').value || 'email@example.com';
  const phone = document.getElementById('phone').value || '(123) 456-7890';
  const address = document.getElementById('address').value || 'Your Address';
  const summary = document.getElementById('summary').value || 'Experienced professional with a demonstrated history of working in the industry. Skilled in various areas with strong problem-solving abilities.';

  document.getElementById('previewName').textContent = `${firstName} ${lastName}`;
  document.getElementById('previewContact').textContent = `${email} | ${phone} | ${address}`;
  document.getElementById('previewSummary').textContent = summary;

  // Education
  const educationContainer = document.getElementById('previewEducation');
  educationContainer.innerHTML = '';

  const educationItems = document.querySelectorAll('#education-fields .dynamic-item');
  educationItems.forEach(item => {
    const institution = item.querySelector('input[name="institution"]').value || 'Institution Name';
    const degree = item.querySelector('input[name="degree"]').value || 'Degree Name';
    const date = item.querySelector('input[name="educationDate"]').value || 'Dates Attended';
    const description = item.querySelector('textarea[name="educationDescription"]').value || '';

    const educationItem = document.createElement('div');
    educationItem.className = 'resume-item';
    educationItem.innerHTML = `
                <h4>${degree} <span class="date">${date}</span></h4>
                <p>${institution}</p>
                ${description ? `<p>${description}</p>` : ''}
            `;

    educationContainer.appendChild(educationItem);
  });

  // Experience
  const experienceContainer = document.getElementById('previewExperience');
  experienceContainer.innerHTML = '';

  const experienceItems = document.querySelectorAll('#experience-fields .dynamic-item');
  experienceItems.forEach(item => {
    const jobTitle = item.querySelector('input[name="jobTitle"]').value || 'Job Title';
    const company = item.querySelector('input[name="company"]').value || 'Company Name';
    const date = item.querySelector('input[name="jobDate"]').value || 'Employment Dates';
    const description = item.querySelector('textarea[name="jobDescription"]').value || 'Job description and responsibilities';

    const experienceItem = document.createElement('div');
    experienceItem.className = 'resume-item';
    experienceItem.innerHTML = `
                <h4>${jobTitle} <span class="date">${date}</span></h4>
                <p>${company}</p>
                <p>${description}</p>
            `;

    experienceContainer.appendChild(experienceItem);
  });

  // Skills
  const skillsContainer = document.getElementById('previewSkills');
  skillsContainer.innerHTML = '';

  const skillItems = document.querySelectorAll('#skills-fields .dynamic-item');
  skillItems.forEach(item => {
    const skillName = item.querySelector('input[name="skillName"]').value || 'Skill Name';
    const skillLevel = item.querySelector('select[name="skillLevel"]').value || 'Skill Level';

    const skillItem = document.createElement('p');
    skillItem.innerHTML = `<strong>${skillName}:</strong> ${skillLevel}`;

    skillsContainer.appendChild(skillItem);
  });

  applyFormatStyles();
  document.getElementById('resumePreview').scrollIntoView({ behavior: 'smooth' });
}

// Apply format styles
function applyFormatStyles() {
  const preview = document.getElementById('resumePreview');
  preview.classList.remove('chronological-format', 'functional-format', 'hybrid-format');
  preview.classList.add(`${currentFormat}-format`);

  const educationSection = document.querySelector('#education');
  const experienceSection = document.querySelector('#experience');
  const skillsSection = document.querySelector('#skills');

  educationSection.style.order = '';
  experienceSection.style.order = '';
  skillsSection.style.order = '';

  if (currentFormat === 'chronological') {
    experienceSection.style.order = '1';
    skillsSection.style.order = '2';
  } else if (currentFormat === 'functional') {
    skillsSection.style.order = '1';
    experienceSection.style.order = '2';
  } else if (currentFormat === 'hybrid') {
    skillsSection.style.order = '1';
    experienceSection.style.order = '2';
  }
}

// Download PDF with template styling
function downloadPDF() {
  const style = templateStyles[currentFormat];
  const doc = new jsPDF();

  // Set document properties
  doc.setProperties({
    title: 'My Professional Resume',
    subject: 'Resume generated with ResumeBuilderPro',
    author: document.getElementById('firstName').value + ' ' + document.getElementById('lastName').value,
    keywords: 'resume, cv, employment',
    creator: 'ResumeBuilderPro'
  });

  // Set background color
  doc.setFillColor(style.bgColor[0], style.bgColor[1], style.bgColor[2]);
  doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

  // Set default font
  doc.setFont(style.font);

  // Add header
  doc.setFontSize(20);
  doc.setTextColor(style.headerColor[0], style.headerColor[1], style.headerColor[2]);
  doc.text(document.getElementById('previewName').textContent, 105, 20, { align: 'center' });

  doc.setFontSize(10);
  doc.setTextColor(style.textColor[0], style.textColor[1], style.textColor[2]);
  doc.text(document.getElementById('previewContact').textContent, 105, 26, { align: 'center' });

  // Add line below header
  doc.setDrawColor(style.lineColor[0], style.lineColor[1], style.lineColor[2]);
  doc.setLineWidth(0.5);
  doc.line(20, 30, 190, 30);

  // Add summary section
  doc.setFontSize(12);
  doc.setTextColor(style.sectionColor[0], style.sectionColor[1], style.sectionColor[2]);
  doc.text('Professional Summary', 20, 40);

  doc.setFontSize(10);
  doc.setTextColor(style.textColor[0], style.textColor[1], style.textColor[2]);
  const summaryText = doc.splitTextToSize(document.getElementById('previewSummary').textContent, 170);
  doc.text(summaryText, 20, 46);

  let yPosition = 46 + (summaryText.length * 5);

  // Format-specific content ordering
  if (currentFormat === 'functional' || currentFormat === 'hybrid') {
    yPosition = addSkillsToPDF(doc, yPosition, style);
    yPosition = addExperienceToPDF(doc, yPosition, style);
  } else {
    yPosition = addExperienceToPDF(doc, yPosition, style);
    yPosition = addSkillsToPDF(doc, yPosition, style);
  }

  yPosition = addEducationToPDF(doc, yPosition, style);

  // Save the PDF
  doc.save(`${document.getElementById('firstName').value}_${document.getElementById('lastName').value}_resume.pdf`);
}

function addSkillsToPDF(doc, yPosition, style) {
  const skillsContainer = document.getElementById('previewSkills');
  if (skillsContainer.children.length > 0) {
    doc.setFontSize(12);
    doc.setTextColor(style.sectionColor[0], style.sectionColor[1], style.sectionColor[2]);
    doc.text('Skills', 20, yPosition + 10);
    yPosition += 15;

    doc.setFontSize(10);
    doc.setTextColor(style.textColor[0], style.textColor[1], style.textColor[2]);

    const skillsItems = skillsContainer.querySelectorAll('p');
    skillsItems.forEach(skill => {
      if (yPosition > 270) {
        doc.addPage();
        doc.setFillColor(style.bgColor[0], style.bgColor[1], style.bgColor[2]);
        doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
        yPosition = 20;
      }
      doc.text(skill.textContent, 20, yPosition);
      yPosition += 6;
    });

    yPosition += 10;
  }
  return yPosition;
}

function addExperienceToPDF(doc, yPosition, style) {
  const experienceContainer = document.getElementById('previewExperience');
  if (experienceContainer.children.length > 0) {
    doc.setFontSize(12);
    doc.setTextColor(style.sectionColor[0], style.sectionColor[1], style.sectionColor[2]);
    doc.text('Work Experience', 20, yPosition + 10);
    yPosition += 15;

    doc.setFontSize(10);
    doc.setTextColor(style.textColor[0], style.textColor[1], style.textColor[2]);

    const experienceItems = experienceContainer.querySelectorAll('.resume-item');
    experienceItems.forEach(item => {
      if (yPosition > 270) {
        doc.addPage();
        doc.setFillColor(style.bgColor[0], style.bgColor[1], style.bgColor[2]);
        doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
        yPosition = 20;
      }

      const title = item.querySelector('h4').textContent;
      const company = item.querySelector('p:nth-of-type(1)').textContent;
      const description = item.querySelector('p:nth-of-type(2)')?.textContent || '';

      doc.setFont(style.font, 'bold');
      doc.text(title, 20, yPosition);
      yPosition += 6;

      doc.setFont(style.font, 'normal');
      doc.text(company, 20, yPosition);
      yPosition += 6;

      if (description) {
        const descLines = doc.splitTextToSize(description, 170);
        doc.text(descLines, 20, yPosition);
        yPosition += (descLines.length * 5) + 5;
      } else {
        yPosition += 5;
      }
    });

    yPosition += 5;
  }
  return yPosition;
}

function addEducationToPDF(doc, yPosition, style) {
  const educationContainer = document.getElementById('previewEducation');
  if (educationContainer.children.length > 0) {
    doc.setFontSize(12);
    doc.setTextColor(style.sectionColor[0], style.sectionColor[1], style.sectionColor[2]);
    doc.text('Education', 20, yPosition + 10);
    yPosition += 15;

    doc.setFontSize(10);
    doc.setTextColor(style.textColor[0], style.textColor[1], style.textColor[2]);

    const educationItems = educationContainer.querySelectorAll('.resume-item');
    educationItems.forEach(item => {
      if (yPosition > 270) {
        doc.addPage();
        doc.setFillColor(style.bgColor[0], style.bgColor[1], style.bgColor[2]);
        doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
        yPosition = 20;
      }

      const title = item.querySelector('h4').textContent;
      const institution = item.querySelector('p:nth-of-type(1)').textContent;
      const description = item.querySelector('p:nth-of-type(2)')?.textContent || '';

      doc.setFont(style.font, 'bold');
      doc.text(title, 20, yPosition);
      yPosition += 6;

      doc.setFont(style.font, 'normal');
      doc.text(institution, 20, yPosition);
      yPosition += 6;

      if (description) {
        const descLines = doc.splitTextToSize(description, 170);
        doc.text(descLines, 20, yPosition);
        yPosition += (descLines.length * 5) + 5;
      } else {
        yPosition += 5;
      }
    });
  }
  return yPosition;
}

// Initialize with one field in each dynamic section
window.onload = function () {
  addEducationField();
  addExperienceField();
  addSkillField();

  document.getElementById('resumeForm').addEventListener('submit', function (e) {
    e.preventDefault();
  });
};