const form = document.getElementById('resumeForm');
const fileInput = document.getElementById('resumeFile');
const fileName = document.getElementById('fileName');
const modal = document.getElementById('successModal');
const closeModalButton = document.getElementById('closeModal');
const submitButton = form.querySelector('.submit-btn');
const btnText = submitButton.querySelector('.btn-text');

const webhookUrl = 'https://azid.app.n8n.cloud/webhook/resume-screening';

// Future integration points for later phases:
// - File Upload API
// - OpenAI Resume Evaluation
// - Google Sheets
// - Gmail Automation

const fields = [
  { id: 'fullName', errorId: 'fullNameError' },
  { id: 'email', errorId: 'emailError' },
  { id: 'phone', errorId: 'phoneError' },
  { id: 'jobRole', errorId: 'jobRoleError' },
  { id: 'experience', errorId: 'experienceError' },
  { id: 'location', errorId: 'locationError' },
  { id: 'qualification', errorId: 'qualificationError' },
  { id: 'careerSummary', errorId: 'careerSummaryError' },
  { id: 'resumeFile', errorId: 'resumeFileError' },
  { id: 'privacyPolicy', errorId: 'privacyPolicyError' }
];

function clearErrors() {
  fields.forEach(({ id, errorId }) => {
    const field = document.getElementById(id);
    const error = document.getElementById(errorId);

    if (field) {
      field.classList.remove('error-input');
    }

    if (error) {
      error.textContent = '';
    }
  });
}

function showError(id, message) {
  const field = document.getElementById(id);
  const error = document.getElementById(`${id}Error`);

  if (field) {
    field.classList.add('error-input');
  }

  if (error) {
    error.textContent = message;
  }
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^\d{10}$/.test(phone);
}

fileInput.addEventListener('change', () => {
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      fileName.textContent = 'Please upload a PDF file.';
      showError('resumeFile', 'Only PDF files are allowed.');
      fileInput.value = '';
      return;
    }

    fileName.textContent = file.name;
    clearErrors();
    document.getElementById('resumeFileError').textContent = '';
  } else {
    fileName.textContent = 'No file selected';
  }
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  clearErrors();

  const formData = new FormData(form);
  const values = Object.fromEntries(formData.entries());

  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const jobRole = document.getElementById('jobRole').value;
  const experience = document.getElementById('experience').value.trim();
  const location = document.getElementById('location').value.trim();
  const qualification = document.getElementById('qualification').value.trim();
  const careerSummary = document.getElementById('careerSummary').value.trim();
  const privacyPolicy = document.getElementById('privacyPolicy').checked;

  let isValid = true;

  if (!fullName) {
    showError('fullName', 'Please enter your full name.');
    isValid = false;
  }

  if (!email) {
    showError('email', 'Please enter your email address.');
    isValid = false;
  } else if (!validateEmail(email)) {
    showError('email', 'Please enter a valid email address.');
    isValid = false;
  }

  if (!phone) {
    showError('phone', 'Please enter your phone number.');
    isValid = false;
  } else if (!validatePhone(phone)) {
    showError('phone', 'Phone number must contain exactly 10 digits.');
    isValid = false;
  }

  if (!jobRole) {
    showError('jobRole', 'Please select a job role.');
    isValid = false;
  }

  if (!experience) {
    showError('experience', 'Please enter your years of experience.');
    isValid = false;
  }

  if (!location) {
    showError('location', 'Please enter your current location.');
    isValid = false;
  }

  if (!qualification) {
    showError('qualification', 'Please enter your highest qualification.');
    isValid = false;
  }

  if (!careerSummary) {
    showError('careerSummary', 'Please share a short career summary.');
    isValid = false;
  }

  if (!fileInput.files.length) {
    showError('resumeFile', 'Please upload your resume.');
    isValid = false;
  }

  if (!privacyPolicy) {
    showError('privacyPolicy', 'You must agree to the privacy policy.');
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  submitButton.classList.add('is-loading');
  btnText.textContent = 'Submitting...';

  fetch(webhookUrl, {
    method: 'POST',
    body: formData
  })
    .then(() => {
      window.setTimeout(() => {
        submitButton.classList.remove('is-loading');
        btnText.textContent = 'Submit Application';
        form.reset();
        fileName.textContent = 'No file selected';
        clearErrors();
        modal.classList.add('is-open');
      }, 2000);
    })
    .catch(() => {
      submitButton.classList.remove('is-loading');
      btnText.textContent = 'Submit Application';
      alert('Something went wrong while sending your application. Please try again.');
    });
});

closeModalButton.addEventListener('click', () => {
  modal.classList.remove('is-open');
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.remove('is-open');
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('is-open')) {
    modal.classList.remove('is-open');
  }
});
