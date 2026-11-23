document.addEventListener('DOMContentLoaded', () => {

  // 1. ANO NO RODAPÉ
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // 2. TEMA CLARO / ESCURO
  const themeBtn = document.getElementById('theme-toggle');
  const html = document.documentElement;
  let temaSalvo = null;
  try { temaSalvo = localStorage.getItem('portfolio-theme'); } catch (e) {}
  const sistemaEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;

  function aplicarTema(escuro) {
    html.classList.toggle('dark', escuro);
    themeBtn.textContent = escuro ? '☀️' : '🌙';
  }
  aplicarTema(temaSalvo === 'dark' || (!temaSalvo && sistemaEscuro));

  themeBtn.addEventListener('click', () => {
    const escuro = !html.classList.contains('dark');
    aplicarTema(escuro);
    try { localStorage.setItem('portfolio-theme', escuro ? 'dark' : 'light'); } catch (e) {}
  });

  // 3. MENU MOBILE
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menuMobile = document.getElementById('mobile-menu');
  menuBtn.addEventListener('click', () => {
    const aberto = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!aberto));
    menuBtn.textContent = aberto ? '☰' : '✕';
    menuMobile.hidden = aberto;
  });
  menuMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuMobile.hidden = true;
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.textContent = '☰';
    });
  });

  // 4. FORMULÁRIO DE CONTATO
  const form = document.getElementById('contact-form');
  const campoNome = document.getElementById('name');
  const campoEmail = document.getElementById('email');
  const campoMsg = document.getElementById('message');
  const feedback = document.getElementById('form-feedback');

  function validar(campo, valido) {
    document.getElementById(campo.id + '-error').hidden = valido;
    campo.classList.toggle('campo-invalido', !valido);
    return valido;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const okNome = validar(campoNome, campoNome.value.trim().length >= 2);
    const okEmail = validar(campoEmail, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campoEmail.value.trim()));
    const okMsg = validar(campoMsg, campoMsg.value.trim().length >= 10);

    if (!(okNome && okEmail && okMsg)) {
      feedback.className = 'feedback erro';
      feedback.textContent = 'Por favor, corrija os campos destacados antes de enviar.';
      feedback.hidden = false;
      return;
    }

    feedback.className = 'feedback sucesso';
    feedback.textContent = `Obrigado, ${campoNome.value.trim()}! Sua mensagem foi enviada com sucesso. Retornarei em breve.`;
    feedback.hidden = false;
    form.reset();
    setTimeout(() => { feedback.hidden = true; }, 6000);
  });
});
