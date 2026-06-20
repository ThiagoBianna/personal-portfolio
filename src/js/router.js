import { renderPortfolio, initPortfolio } from './pages/portfolio.js';

const appContainerId = 'app-root';

export const router = {
  routes: {
    '/': renderPortfolio
  },

  getCurrentRoute: () => {
    return '/'; // Sempre carrega o portfólio agora que o admin foi removido
  },

  navigate: (route) => {
    window.location.hash = '/';
  },

  activeRoute: '/',

  resolve: async () => {
    const container = document.getElementById(appContainerId);
    if (!container) return;

    // Tela de carregamento global sutil com suporte a dark mode
    container.innerHTML = `
      <div class="fixed inset-0 bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center z-50 transition-colors">
        <div class="w-10 h-10 border-4 border-slate-200 dark:border-slate-800 border-t-blue-600 rounded-full animate-spin"></div>
        <p class="text-xs font-mono mt-4 text-slate-500 dark:text-slate-400 tracking-wider">Inicializando portfólio...</p>
      </div>
    `;

    try {
      const pageHtml = await renderPortfolio();
      
      // Insere o HTML da página com uma suave animação de slide-up e fade-in
      container.innerHTML = `
        <div id="page-content" class="min-h-screen opacity-0 transform translate-y-2 transition-all duration-300 ease-out bg-slate-50 dark:bg-slate-950">
          ${pageHtml}
        </div>
      `;

      // Inicializa lógicas da página
      initPortfolio();

      // Ativa quadro de animação inicial sutil
      setTimeout(() => {
        const pageContent = document.getElementById('page-content');
        if (pageContent) {
          pageContent.classList.remove('opacity-0', 'translate-y-2');
        }
      }, 50);

      // Processa ícones da biblioteca Lucide
      if (window.lucide) {
        window.lucide.createIcons();
      }

      // Reinicia os gatilhos de revelação ao rolar a página
      setupScrollReveal();

      // Gerencia redirecionamento suave se a URL tiver hash de âncora
      const hash = window.location.hash;
      if (hash && hash.startsWith('#') && !hash.startsWith('#/')) {
        setTimeout(() => {
          const targetId = hash.substring(1);
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }

    } catch (error) {
      console.error("Router resolution failure:", error);
      container.innerHTML = `
        <div class="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-slate-800 dark:text-slate-200">
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-sm max-w-md">
            <h2 class="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 font-sans">Falha de Carregamento</h2>
            <p class="text-slate-500 dark:text-slate-400 text-sm mb-6 font-sans">Não foi possível inicializar seu portfólio de forma bem-sucedida.</p>
            <button onclick="window.location.reload()" class="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-5 py-2.5 rounded-lg transition-all shadow-sm cursor-pointer">
              Tentar Novamente
            </button>
          </div>
        </div>
      `;
    }
  },

  init: () => {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#') && !hash.startsWith('#/')) {
        const targetId = hash.substring(1);
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
      }
      router.resolve();
    });

    window.addEventListener('load', () => {
      router.resolve();
    });
  }
};

// Controlador de Scroll Reveal (efeito de aparição suave ao rolar)
function setupScrollReveal() {
  const reveals = document.querySelectorAll('.scroll-reveal');
  const revealOnScroll = () => {
    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      const elementVisible = 100;
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add('active');
      }
    }
  };
  window.addEventListener('scroll', revealOnScroll);
  setTimeout(revealOnScroll, 100);
}
