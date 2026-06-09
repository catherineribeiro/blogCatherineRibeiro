// =============================================
// app.js — Lógica de Programação I
// Projeto Integrador — TDSV1
// =============================================

// -----------------------------------------------
// 1. MENU HAMBURGUER (mobile)
// -----------------------------------------------
function iniciarMenuMobile() {
  const toggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (!toggle || !navMenu) return;

  toggle.addEventListener('click', function () {
    navMenu.classList.toggle('aberto');
  });

  // Fecha o menu ao clicar em um link
  navMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('aberto');
    });
  });
}

// -----------------------------------------------
// 2. MARCAR LINK ATIVO NO NAV
// -----------------------------------------------
function marcarNavAtivo() {
  const paginaAtual = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('nav a');

  links.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === paginaAtual || (paginaAtual === '' && href === 'index.html')) {
      link.classList.add('ativo');
    }
  });
}

// -----------------------------------------------
// 3. VALIDAÇÃO DO FORMULÁRIO DE CONTATO
// -----------------------------------------------
function validarCampo(campo, msgErro, condicao) {
  const elementoErro = document.getElementById('erro-' + campo.id);

  if (!condicao) {
    campo.classList.add('erro');
    if (elementoErro) {
      elementoErro.textContent = msgErro;
      elementoErro.classList.add('visivel');
    }
    return false;
  } else {
    campo.classList.remove('erro');
    if (elementoErro) {
      elementoErro.classList.remove('visivel');
    }
    return true;
  }
}

function validarEmail(email) {
  // Expressão regular para validar formato de e-mail
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function iniciarFormulario() {
  var form = document.getElementById('form-contato');
  if (!form) return;

  var campoNome = document.getElementById('nome');
  var campoEmail = document.getElementById('email');
  var campoMensagem = document.getElementById('mensagem');
  var feedback = document.getElementById('form-feedback');

  // Validação em tempo real ao sair do campo
  if (campoNome) {
    campoNome.addEventListener('blur', function () {
      validarCampo(campoNome, 'Por favor, informe seu nome.', campoNome.value.trim().length >= 2);
    });
  }

  if (campoEmail) {
    campoEmail.addEventListener('blur', function () {
      validarCampo(campoEmail, 'Informe um e-mail válido.', validarEmail(campoEmail.value.trim()));
    });
  }

  if (campoMensagem) {
    campoMensagem.addEventListener('blur', function () {
      validarCampo(campoMensagem, 'A mensagem deve ter pelo menos 10 caracteres.', campoMensagem.value.trim().length >= 10);
    });
  }

  // Envio do formulário
  form.addEventListener('submit', function (evento) {
    evento.preventDefault(); // impede o envio padrão

    var nomeValido = validarCampo(campoNome, 'Por favor, informe seu nome.', campoNome.value.trim().length >= 2);
    var emailValido = validarCampo(campoEmail, 'Informe um e-mail válido.', validarEmail(campoEmail.value.trim()));
    var mensagemValida = validarCampo(campoMensagem, 'A mensagem deve ter pelo menos 10 caracteres.', campoMensagem.value.trim().length >= 10);

    if (nomeValido && emailValido && mensagemValida) {
      // Todos os campos válidos
      feedback.textContent = '✓ Mensagem enviada com sucesso! Entrarei em contato em breve.';
      feedback.className = 'form-feedback sucesso';
      form.reset();
    } else {
      feedback.textContent = '✗ Preencha todos os campos corretamente antes de enviar.';
      feedback.className = 'form-feedback falha';
    }
  });
}

// -----------------------------------------------
// 4. FILTRO DE PROJETOS POR TECNOLOGIA
// -----------------------------------------------
function iniciarFiltroProjetos() {
  var botoesFilro = document.querySelectorAll('[data-filtro]');
  var cards = document.querySelectorAll('[data-tecnologias]');

  if (botoesFilro.length === 0) return;

  botoesFilro.forEach(function (botao) {
    botao.addEventListener('click', function () {
      var filtro = botao.getAttribute('data-filtro');

      // Atualiza botão ativo
      botoesFilro.forEach(function (b) { b.classList.remove('ativo'); });
      botao.classList.add('ativo');

      // Mostra/esconde cards
      cards.forEach(function (card) {
        var tecnologias = card.getAttribute('data-tecnologias');
        if (filtro === 'todos' || tecnologias.includes(filtro)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// -----------------------------------------------
// 5. ANO DINÂMICO NO FOOTER
// -----------------------------------------------
function atualizarAnoFooter() {
  var elementos = document.querySelectorAll('.ano-atual');
  var anoAtual = new Date().getFullYear();
  elementos.forEach(function (el) {
    el.textContent = anoAtual;
  });
}

// -----------------------------------------------
// INICIALIZAÇÃO — roda quando a página carrega
// -----------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  iniciarMenuMobile();
  marcarNavAtivo();
  iniciarFormulario();
  iniciarFiltroProjetos();
  atualizarAnoFooter();
});
