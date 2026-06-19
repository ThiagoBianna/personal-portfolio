import { api } from '../api.js';
import { renderPortfolio, initPortfolio } from './pages/portfolio.js';
import { renderLogin, initLogin } from './pages/login.js';
import { renderAdmin, initAdmin } from './pages/admin.js';

const appContainerId = 'app-root';

export const router = {
  routes: {
    '/': renderPortfolio,
    '/admin': () => {
      if (api.isAuthenticated()) {
        return renderAdmin();
      } else {
        // Redirect to login if unauthorized
        window.location.hash = '/login';
        return renderLogin();
      }
    },
    '/login': () => {
      if (api.isAuthenticated()) {
        window.location.hash = '/admin';
        return renderAdmin();
      } else {
        return renderLogin();
      }
    }
  },

  getCurrentRoute: () => {
    const hash = window.location.hash || '#/';
    if (hash && hash.startsWith('#') && !hash.startsWith('#/')) {
      return '/';
    }
    let route = hash.replace('#', '');
    if (!route.startsWith('/')) {
      route = '/' + route;
    }
    return route;
  },

  navigate: (route) => {
    window.location.hash = route;
  },

  activeRoute: null,

  resolve: async () => {
    const container = document.getElementById(appContainerId);
    if (!container) return;

    // Show dynamic global loading screen
    container.innerHTML = `
      <div class="fixed inset-0 bg-slate-50 flex flex-col items-center justify-center z-50 transition-colors">
        <div class="w-10 h-10 border-4 border-slate-240 border-t-blue-600 rounded-full animate-spin"></div>
        <p class="text-xs font-mono mt-4 text-slate-500 tracking-wider">Inicializando portfólio...</p>
      </div>
    `;

    const route = router.getCurrentRoute();
    router.activeRoute = route;
    const renderFn = router.routes[route] || router.routes['/'];

    try {
      const pageHtml = await renderFn();
      
      // Update webpage container with subtle slide-up and fade entry animation
      container.innerHTML = `
        <div id="page-content" class="min-h-screen opacity-0 transform translate-y-2 transition-all duration-300 ease-out">
          ${pageHtml}
        </div>
      `;

      // Trigger page-specific interactive initializers
      if (route === '/' || route === '') {
        initPortfolio();
      } else if (route === '/login') {
        initLogin();
      } else if (route === '/admin') {
        initAdmin();
      }

      // Trigger animation entry frame
      setTimeout(() => {
        const pageContent = document.getElementById('page-content');
        if (pageContent) {
          pageContent.classList.remove('opacity-0', 'translate-y-2');
        }
      }, 50);

      // Initialize all Lucide Icons on the rendered DOM
      if (window.lucide) {
        window.lucide.createIcons();
      }

      // Re-trigger scroll reveal handlers for the portfolio landing page
      setupScrollReveal();

      // Scroll to top on navigation
      window.scrollTo({ top: 0, behavior: 'instant' });

    } catch (error) {
      console.error("Router resolution failure:", error);
      container.innerHTML = `
        <div class="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
          <div class="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm max-w-md">
            <h2 class="text-lg font-bold text-slate-900 mb-2 font-sans">Falha de Carregamento</h2>
            <p class="text-slate-500 text-sm mb-6 font-sans">Não foi possível inicializar o componente desta página.</p>
            <button onclick="window.location.reload()" class="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-5 py-2.5 rounded-lg transition-all shadow-sm">
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
      // If the hash is a section anchor (starts with '#' but not with '#/'), do not re-render the router
      if (hash && hash.startsWith('#') && !hash.startsWith('#/')) {
        if (!router.activeRoute || router.activeRoute === '/' || router.activeRoute === '') {
          // We are already on the portfolio page, just scroll smoothly
          const targetId = hash.substring(1);
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          return;
        } else {
          // We are in another page (e.g. admin or login), so resolve the main page first, then scroll
          router.resolve().then(() => {
            setTimeout(() => {
              const targetId = hash.substring(1);
              const element = document.getElementById(targetId);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 300);
          });
          return;
        }
      }
      router.resolve();
    });

    window.addEventListener('load', () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#') && !hash.startsWith('#/')) {
        router.resolve().then(() => {
          setTimeout(() => {
            const targetId = hash.substring(1);
            const element = document.getElementById(targetId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 300);
        });
        return;
      }
      router.resolve();
    });
  }
};

// Simple Scroll Reveal controller inside vanilla
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
  // Trigger initially if elements are already in viewport
  setTimeout(revealOnScroll, 100);
}
