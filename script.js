document.getElementById('year').textContent = new Date().getFullYear();
const sections = ['work', 'about', 'contact'].map(id => document.getElementById(id));
const links = [...document.querySelectorAll('nav a[href^="#"]')];
let scheduled = false;
function updateNavigation() {
  let current = '';
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= window.innerHeight * 0.4) current = section.id;
  }
  if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 3) current = 'contact';
  for (const link of links) {
    if (link.hash === '#' + current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
  scheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scheduled) { scheduled = true; requestAnimationFrame(updateNavigation); }
}, {passive:true});
window.addEventListener('resize', updateNavigation);
updateNavigation();

const copyButton = document.getElementById('copy-email');
const copyFeedback = document.getElementById('contact-feedback');
let feedbackTimer;
copyButton.addEventListener('click', async () => {
  const email = 'Davidswrld007@gmail.com';
  clearTimeout(feedbackTimer);
  let copied = false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(email);
      copied = true;
    } else {
      const source = document.createElement('textarea');
      source.value = email;
      source.className = 'copy-source';
      source.setAttribute('readonly', '');
      document.body.appendChild(source);
      try {
        source.select();
        copied = document.execCommand('copy');
      } finally {
        source.remove();
        copyButton.focus({preventScroll:true});
      }
    }
  } catch { copied = false; }
  copyFeedback.textContent = copied ? 'Email copied. Thanks for reaching out.' : 'Select the email address above to copy it.';
  feedbackTimer = setTimeout(() => { copyFeedback.textContent = ''; }, 6000);
});
