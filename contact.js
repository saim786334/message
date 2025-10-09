// File: contact.js
// Handles Formspree submission and nav toggle
document.addEventListener('DOMContentLoaded', function () {
  // Nav toggle for small screens
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.gap = '12px';
    });
  }

  // Form handler
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      statusEl.innerHTML = ''; // clear previous

      const data = new FormData(form);

      try {
        const res = await fetch(form.action, {
          method: form.method,
          body: data,
          headers: { "Accept": "application/json" }
        });

        if (res.ok) {
          statusEl.innerHTML = `<div class="success" style="padding:10px;border-radius:8px;background:#ecfdf5;color:#065f46;border:1px solid #bbf7d0">✅ ধন্যবাদ! আপনার বার্তা সফলভাবে পাঠানো হয়েছে।</div>`;
          form.reset();
        } else {
          const err = await res.json().catch(()=>({}));
          throw new Error(err?.error || 'Form submission failed');
        }
      } catch (err) {
        statusEl.innerHTML = `<div class="error" style="padding:10px;border-radius:8px;background:#fff0f0;color:#7f1d1d;border:1px solid #fecaca">❌ দুঃখিত! বার্তা পাঠানো যায়নি। পরে আবার চেষ্টা করুন।</div>`;
        console.error('Form error:', err);
      }
    });
  }
});
