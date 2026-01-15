// form.js - Google Sheets integration + confetti

const form = document.getElementById('join-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Launching...';

    const formData = new FormData(form);
    const data = {
      timestamp: new Date().toISOString(),
      name: formData.get('name'),
      email: formData.get('email'),
      country: formData.get('country'),
      track: formData.get('track'),
      linkedin: formData.get('linkedin') || '',
      motivation: formData.get('motivation') || ''
    };

    try {
      await fetch('YOUR_GOOGLE_SCRIPT_URL', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
      form.innerHTML = '<div class="text-center py-20"><h3 class="text-4xl gradient-text">Thank you! 🚀</h3><p class="text-xl mt-4">Your application has been launched into space!</p></div>';
    } catch (err) {
      alert('Error - please try again or contact us on LinkedIn');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Launch Application 🚀';
    }
  });
}
