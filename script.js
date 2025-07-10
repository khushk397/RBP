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
    lineColor: [44, 62, 80],
    fontSizes: { header: 22, section: 16, body: 12 },
    margins: { top: 20, left: 20, right: 20 },
    lineHeight: 1.3
  },
  functional: {
    bgColor: [248, 249, 250],
    headerColor: [231, 76, 60],
    sectionColor: [231, 76, 60],
    textColor: [40, 40, 40],
    accentColor: [231, 76, 60],
    font: 'Arial',
    lineColor: [231, 76, 60],
    fontSizes: { header: 22, section: 16, body: 12 },
    margins: { top: 20, left: 20, right: 20 },
    lineHeight: 1.3
  },
  hybrid: {
    bgColor: [240, 248, 255],
    headerColor: [52, 152, 219],
    sectionColor: [52, 152, 219],
    textColor: [40, 40, 40],
    accentColor: [52, 152, 219],
    font: 'Helvetica',
    lineColor: [52, 152, 219],
    fontSizes: { header: 22, section: 16, body: 12 },
    margins: { top: 20, left: 20, right: 20 },
    lineHeight: 1.3
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
            <input type="text" name="institution" placeholder="e.g., University of California" required>
        </div>
        <div class="form-group">
            <label>Degree</label>
            <input type="text" name="degree" placeholder="e.g., Bachelor of Science in Computer Science" required>
        </div>
        <div class="form-group">
            <label>Field of Study</label>
            <input type="text" name="fieldOfStudy" placeholder="e.g., Computer Science">
        </div>
        <div class="form-group">
            <label>Date</label>
            <input type="text" name="educationDate" placeholder="e.g., 2015-2019 or Expected 2024">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea name="educationDescription" placeholder="Relevant coursework, honors, GPA (if above 3.5)"></textarea>
        </div>
        <button type="button" class="remove-btn" onclick="removeField(this)">×</button>
    `;
  container.appendChild(newField);
  saveToLocalStorage();
}

// Add experience field
function addExperienceField() {
  const container = document.getElementById('experience-fields');
  const newField = document.createElement('div');
  newField.className = 'dynamic-item';
  newField.innerHTML = `
        <div class="form-group">
            <label>Job Title</label>
            <input type="text" name="jobTitle" placeholder="e.g., Software Engineer" required>
        </div>
        <div class="form-group">
            <label>Company</label>
            <input type="text" name="company" placeholder="e.g., Tech Solutions Inc." required>
        </div>
        <div class="form-group">
            <label>Date</label>
            <input type="text" name="jobDate" placeholder="e.g., Jan 2020 - Present">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea name="jobDescription" placeholder="Describe your responsibilities and achievements. Use action verbs and quantify results when possible."></textarea>
        </div>
        <button type="button" class="remove-btn" onclick="removeField(this)">×</button>
    `;
  container.appendChild(newField);
  saveToLocalStorage();
}

// Add skill field
function addSkillField() {
  const container = document.getElementById('skills-fields');
  const newField = document.createElement('div');
  newField.className = 'dynamic-item';
  newField.innerHTML = `
        <div class="form-group">
            <label>Skill Name</label>
            <input type="text" name="skillName" placeholder="e.g., JavaScript, Project Management" required>
        </div>
        <div class="form-group">
            <label>Skill Level</label>
            <select name="skillLevel">
                <option value="Beginner">Beginner</option>
                <option value="Intermediate" selected>Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
            </select>
        </div>
        <button type="button" class="remove-btn" onclick="removeField(this)">×</button>
    `;
  container.appendChild(newField);
  saveToLocalStorage();
}

// Remove field
function removeField(button) {
  button.parentElement.remove();
  generateResume();
}

// Select format
function selectFormat(format) {
  currentFormat = format;

  document.querySelectorAll('.template-card').forEach(card => {
    card.classList.remove('selected');
  });
  document.querySelector(`.template-card[data-format="${format}"]`).classList.add('selected');

  applyFormatStyles();
  generateResume();
  saveToLocalStorage();
}

// Generate resume preview
function generateResume() {
  try {
    const firstName = document.getElementById('firstName').value || 'Your';
    const lastName = document.getElementById('lastName').value || 'Name';
    const email = document.getElementById('email').value || 'email@example.com';
    const phone = document.getElementById('phone').value || '(123) 456-7890';
    const linkedin = document.getElementById('linkedin').value ?
      `<a href="${document.getElementById('linkedin').value}" target="_blank">LinkedIn</a>` : '';
    const github = document.getElementById('github').value ?
      `<a href="${document.getElementById('github').value}" target="_blank">GitHub</a>` : '';
    const address = document.getElementById('address').value || '';
    const summary = document.getElementById('summary').value ||
      'Experienced professional with a demonstrated history of working in the industry. Skilled in various areas with strong problem-solving abilities.';

    document.getElementById('previewName').textContent = `${firstName} ${lastName}`;
    document.getElementById('previewContact').innerHTML = `${email} | ${phone} ${linkedin ? '| ' + linkedin : ''} ${github ? '| ' + github : ''}`;
    document.getElementById('previewAddress').textContent = address;
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
      const skillLevel = item.querySelector('select[name="skillLevel"]').value || 'Intermediate';

      const levelMap = { Beginner: '25%', Intermediate: '50%', Advanced: '75%', Expert: '100%' };

      const skillItem = document.createElement('div');
      skillItem.className = 'skill-item';
      skillItem.innerHTML = `
                <div class="skill-name">
                    <span>${skillName}</span>
                    <span>${skillLevel}</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-level" style="width: ${levelMap[skillLevel]}"></div>
                </div>
            `;

      skillsContainer.appendChild(skillItem);
    });

    applyFormatStyles();
    saveToLocalStorage();
  } catch (error) {
    console.error("Error generating resume preview:", error);
    document.getElementById('previewError').textContent = "Error generating preview. Please check your inputs.";
  }
}

// Apply format styles to preview
function applyFormatStyles() {
  try {
    const preview = document.getElementById('resumePreview');
    preview.className = `resume-preview ${currentFormat}-format`;

    // Initialize SortableJS for section reordering if available
    if (typeof Sortable !== 'undefined') {
      new Sortable(preview, {
        animation: 150,
        handle: '.resume-section h3',
        onEnd: function () {
          saveToLocalStorage();
        }
      });
    }
  } catch (error) {
    console.error("Error applying format styles:", error);
  }
}

// Save form data to localStorage
function saveToLocalStorage() {
  try {
    if (typeof (Storage) === "undefined") {
      console.warn("LocalStorage not available");
      return;
    }

    const formData = {
      personal: {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        linkedin: document.getElementById('linkedin').value,
        github: document.getElementById('github').value,
        address: document.getElementById('address').value,
        summary: document.getElementById('summary').value
      },
      education: [],
      experience: [],
      skills: [],
      format: currentFormat
    };

    // Save education
    document.querySelectorAll('#education-fields .dynamic-item').forEach(item => {
      formData.education.push({
        institution: item.querySelector('input[name="institution"]').value,
        degree: item.querySelector('input[name="degree"]').value,
        fieldOfStudy: item.querySelector('input[name="fieldOfStudy"]').value,
        date: item.querySelector('input[name="educationDate"]').value,
        description: item.querySelector('textarea[name="educationDescription"]').value
      });
    });

    // Save experience
    document.querySelectorAll('#experience-fields .dynamic-item').forEach(item => {
      formData.experience.push({
        jobTitle: item.querySelector('input[name="jobTitle"]').value,
        company: item.querySelector('input[name="company"]').value,
        date: item.querySelector('input[name="jobDate"]').value,
        description: item.querySelector('textarea[name="jobDescription"]').value
      });
    });

    // Save skills
    document.querySelectorAll('#skills-fields .dynamic-item').forEach(item => {
      formData.skills.push({
        name: item.querySelector('input[name="skillName"]').value,
        level: item.querySelector('select[name="skillLevel"]').value
      });
    });

    localStorage.setItem('resumeData', JSON.stringify(formData));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

// Load form data from localStorage
function loadFromLocalStorage() {
  try {
    const savedData = localStorage.getItem('resumeData');
    if (!savedData) return;

    const formData = JSON.parse(savedData);

    // Load personal info
    document.getElementById('firstName').value = formData.personal.firstName || '';
    document.getElementById('lastName').value = formData.personal.lastName || '';
    document.getElementById('email').value = formData.personal.email || '';
    document.getElementById('phone').value = formData.personal.phone || '';
    document.getElementById('linkedin').value = formData.personal.linkedin || '';
    document.getElementById('github').value = formData.personal.github || '';
    document.getElementById('address').value = formData.personal.address || '';
    document.getElementById('summary').value = formData.personal.summary || '';

    // Load education
    const educationContainer = document.getElementById('education-fields');
    educationContainer.innerHTML = '';
    formData.education.forEach(edu => {
      addEducationField();
      const lastItem = educationContainer.lastElementChild;
      lastItem.querySelector('input[name="institution"]').value = edu.institution || '';
      lastItem.querySelector('input[name="degree"]').value = edu.degree || '';
      lastItem.querySelector('input[name="fieldOfStudy"]').value = edu.fieldOfStudy || '';
      lastItem.querySelector('input[name="educationDate"]').value = edu.date || '';
      lastItem.querySelector('textarea[name="educationDescription"]').value = edu.description || '';
    });

    // Load experience
    const experienceContainer = document.getElementById('experience-fields');
    experienceContainer.innerHTML = '';
    formData.experience.forEach(exp => {
      addExperienceField();
      const lastItem = experienceContainer.lastElementChild;
      lastItem.querySelector('input[name="jobTitle"]').value = exp.jobTitle || '';
      lastItem.querySelector('input[name="company"]').value = exp.company || '';
      lastItem.querySelector('input[name="jobDate"]').value = exp.date || '';
      lastItem.querySelector('textarea[name="jobDescription"]').value = exp.description || '';
    });

    // Load skills
    const skillsContainer = document.getElementById('skills-fields');
    skillsContainer.innerHTML = '';
    formData.skills.forEach(skill => {
      addSkillField();
      const lastItem = skillsContainer.lastElementChild;
      lastItem.querySelector('input[name="skillName"]').value = skill.name || '';
      lastItem.querySelector('select[name="skillLevel"]').value = skill.level || 'Intermediate';
    });

    // Load format
    if (formData.format) {
      selectFormat(formData.format);
    }

    generateResume();
  } catch (error) {
    console.error("Error loading from localStorage:", error);
  }
}

// Download PDF with template styling
function downloadPDF() {
  const btn = document.getElementById('pdfButton');
  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<span class="loading-spinner"></span> Generating PDF...';

  try {
    const style = templateStyles[currentFormat];
    const doc = new jsPDF({
      unit: 'mm',
      format: 'a4'
    });

    // Set document properties
    doc.setProperties({
      title: `${document.getElementById('firstName').value || 'Resume'} ${document.getElementById('lastName').value || ''}`,
      subject: 'Professional Resume',
      author: `${document.getElementById('firstName').value || ''} ${document.getElementById('lastName').value || ''}`,
      keywords: 'resume, cv, professional',
      creator: 'Resume Builder Pro'
    });

    // Set default font and color
    doc.setFont(style.font);
    doc.setTextColor(...style.textColor);

    // Add header
    const firstName = document.getElementById('firstName').value || 'Your';
    const lastName = document.getElementById('lastName').value || 'Name';
    const email = document.getElementById('email').value || 'email@example.com';
    const phone = document.getElementById('phone').value || '(123) 456-7890';
    const address = document.getElementById('address').value || '';

    doc.setFontSize(style.fontSizes.header);
    doc.setTextColor(...style.headerColor);
    doc.text(`${firstName} ${lastName}`, style.margins.left, style.margins.top);

    // Add contact information
    doc.setFontSize(style.fontSizes.body);
    doc.setTextColor(...style.textColor);
    let contactInfo = `${email} | ${phone}`;
    if (address) contactInfo += ` | ${address}`;
    doc.text(contactInfo, style.margins.left, style.margins.top + 10);

    // Add summary section
    const summary = document.getElementById('summary').value || 'Experienced professional with a demonstrated history of working in the industry.';
    doc.setFontSize(style.fontSizes.section);
    doc.setTextColor(...style.sectionColor);
    doc.text('Professional Summary', style.margins.left, style.margins.top + 20);
    doc.setFontSize(style.fontSizes.body);
    doc.setTextColor(...style.textColor);
    doc.text(summary, style.margins.left, style.margins.top + 25, {
      maxWidth: 170,
      lineHeightFactor: style.lineHeight
    });

    // Add education section
    let yPosition = style.margins.top + 35;
    doc.setFontSize(style.fontSizes.section);
    doc.setTextColor(...style.sectionColor);
    doc.text('Education', style.margins.left, yPosition);
    yPosition += 5;

    const educationItems = document.querySelectorAll('#education-fields .dynamic-item');
    educationItems.forEach(item => {
      const institution = item.querySelector('input[name="institution"]').value || 'Institution Name';
      const degree = item.querySelector('input[name="degree"]').value || 'Degree Name';
      const date = item.querySelector('input[name="educationDate"]').value || 'Dates Attended';
      const description = item.querySelector('textarea[name="educationDescription"]').value || '';

      doc.setFontSize(style.fontSizes.body);
      doc.setTextColor(...style.textColor);
      doc.setFont(style.font, 'bold');
      doc.text(`${degree}`, style.margins.left, yPosition);
      doc.setFont(style.font, 'normal');
      doc.text(`${date}`, 180, yPosition, { align: 'right' });
      yPosition += 5;
      doc.text(`${institution}`, style.margins.left, yPosition);
      yPosition += 5;

      if (description) {
        const splitDescription = doc.splitTextToSize(description, 170);
        doc.text(splitDescription, style.margins.left, yPosition, {
          lineHeightFactor: style.lineHeight
        });
        yPosition += splitDescription.length * 5;
      }
      yPosition += 5;
    });

    // Add experience section
    doc.setFontSize(style.fontSizes.section);
    doc.setTextColor(...style.sectionColor);
    doc.text('Experience', style.margins.left, yPosition);
    yPosition += 5;

    const experienceItems = document.querySelectorAll('#experience-fields .dynamic-item');
    experienceItems.forEach(item => {
      const jobTitle = item.querySelector('input[name="jobTitle"]').value || 'Job Title';
      const company = item.querySelector('input[name="company"]').value || 'Company Name';
      const date = item.querySelector('input[name="jobDate"]').value || 'Employment Dates';
      const description = item.querySelector('textarea[name="jobDescription"]').value || 'Job description and responsibilities';

      doc.setFontSize(style.fontSizes.body);
      doc.setTextColor(...style.textColor);
      doc.setFont(style.font, 'bold');
      doc.text(`${jobTitle}`, style.margins.left, yPosition);
      doc.setFont(style.font, 'normal');
      doc.text(`${date}`, 180, yPosition, { align: 'right' });
      yPosition += 5;
      doc.text(`${company}`, style.margins.left, yPosition);
      yPosition += 5;

      if (description) {
        const splitDescription = doc.splitTextToSize(description, 170);
        doc.text(splitDescription, style.margins.left, yPosition, {
          lineHeightFactor: style.lineHeight
        });
        yPosition += splitDescription.length * 5;
      }
      yPosition += 5;
    });

    // Add skills section
    doc.setFontSize(style.fontSizes.section);
    doc.setTextColor(...style.sectionColor);
    doc.text('Skills', style.margins.left, yPosition);
    yPosition += 5;

    const skillItems = document.querySelectorAll('#skills-fields .dynamic-item');
    skillItems.forEach(item => {
      const skillName = item.querySelector('input[name="skillName"]').value || 'Skill Name';
      const skillLevel = item.querySelector('select[name="skillLevel"]').value || 'Intermediate';

      doc.setFontSize(style.fontSizes.body);
      doc.setTextColor(...style.textColor);
      doc.text(`• ${skillName}: ${skillLevel}`, style.margins.left, yPosition);
      yPosition += 5;
    });

    // Save the PDF
    doc.save(`${firstName}_${lastName}_Resume.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Error generating PDF. Please try again.");
  } finally {
    btn.disabled = false;
    btn.innerHTML = originalText;
  }
}

// Generate shareable link
function generateShareLink() {
  try {
    const modal = document.getElementById('shareModal');
    const shareLink = document.getElementById('shareLink');

    // In a real app, you would generate a unique link and store the data server-side
    // For this demo, we'll just show a placeholder
    shareLink.value = "https://resumebuilderpro.com/share/" + Math.random().toString(36).substring(2, 15);
    modal.style.display = 'flex';
  } catch (error) {
    console.error("Error generating share link:", error);
  }
}

// Copy share link to clipboard
function copyShareLink() {
  const shareLink = document.getElementById('shareLink');
  shareLink.select();
  document.execCommand('copy');
  alert('Link copied to clipboard!');
}

// Close modal
function closeModal() {
  document.getElementById('shareModal').style.display = 'none';
}

// Toggle dark/light theme
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const themeBtn = document.querySelector('.theme-toggle');
  if (document.body.classList.contains('dark-mode')) {
    themeBtn.textContent = '🌙';
    localStorage.setItem('theme', 'dark');
  } else {
    themeBtn.textContent = '☀️';
    localStorage.setItem('theme', 'light');
  }
}

// Check for saved theme preference
function checkTheme() {
  const savedTheme = localStorage.getItem('theme');
  const themeBtn = document.querySelector('.theme-toggle');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeBtn.textContent = '🌙';
  } else {
    document.body.classList.remove('dark-mode');
    themeBtn.textContent = '☀️';
  }
}

// Set up event listeners for form inputs
function setupEventListeners() {
  // Personal info inputs
  document.getElementById('firstName').addEventListener('input', generateResume);
  document.getElementById('lastName').addEventListener('input', generateResume);
  document.getElementById('email').addEventListener('input', generateResume);
  document.getElementById('phone').addEventListener('input', generateResume);
  document.getElementById('address').addEventListener('input', generateResume);
  document.getElementById('linkedin').addEventListener('input', generateResume);
  document.getElementById('github').addEventListener('input', generateResume);
  document.getElementById('summary').addEventListener('input', generateResume);

  // Dynamic fields (delegated events)
  document.getElementById('education-fields').addEventListener('input', function (e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      generateResume();
    }
  });

  document.getElementById('experience-fields').addEventListener('input', function (e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      generateResume();
    }
  });

  document.getElementById('skills-fields').addEventListener('input', function (e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') {
      generateResume();
    }
  });

  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();
}

// Initialize the app
function init() {
  checkTheme();
  loadFromLocalStorage();
  setupEventListeners();
  generateResume();
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
