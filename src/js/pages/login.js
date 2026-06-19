import { api } from '../../api.js';

export async function renderLogin() {
  return `
    <div class="min-h-screen bg-slate-50 bg-dot-pattern flex items-center justify-center p-4">
      <div class="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden relative">
        
        <!-- Glowing Accent bar -->
        <div class="h-1.5 w-full bg-gradient-to-r from-blue-500 via-blue-650 to-indigo-600"></div>

        <div class="p-8">
          
          <!-- Brand Logo and Identifier -->
          <div class="flex flex-col items-center text-center mb-8">
            <div class="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-105 flex items-center justify-center text-blue-650 mb-3 shadow-3xs">
              <i data-lucide="key-round" class="w-5 h-5"></i>
            </div>
            <h2 class="text-lg font-bold font-sans text-slate-900">Portal do Administrador</h2>
            <p class="text-xs font-sans text-slate-400 mt-1 uppercase tracking-wider font-semibold">Spring Security JWT Validator</p>
          </div>

          <!-- Alert for error messages -->
          <div id="login-error-alert" class="hidden bg-red-50 border border-red-100 text-red-650 p-4 rounded-xl text-xs font-sans mb-5 flex items-start space-x-2.5 animate-fade-in">
            <i data-lucide="shield-alert" class="w-4 h-4 mt-0.5 shrink-0 text-red-500"></i>
            <div>
              <strong class="block text-red-950 font-sans">Acesso Negado</strong>
              <span id="login-error-msg">Credenciais inválidas no servidor Spring Security.</span>
            </div>
          </div>

          <!-- Authenticate Form -->
          <form id="login-sub-form" class="space-y-5 text-sm">
            
            <div class="flex flex-col">
              <label for="login-username" class="font-sans text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1.5">Usuário (Username)</label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <i data-lucide="user" class="w-4 h-4"></i>
                </span>
                <input type="text" id="login-username" required placeholder="Digite 'admin'" class="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-all font-sans">
              </div>
            </div>

            <div class="flex flex-col">
              <label for="login-password" class="font-sans text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1.5">Senha (Password)</label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <i data-lucide="lock" class="w-4 h-4"></i>
                </span>
                <input type="password" id="login-password" required placeholder="Digite 'admin123'" class="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-all font-sans">
              </div>
            </div>

            <button type="submit" id="login-submit-btn" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm shadow-blue-200">
              <i data-lucide="log-in" class="w-4 h-4"></i>
              <span>Autenticar Usuário</span>
            </button>
          </form>

          <!-- Return links -->
          <div class="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <a href="#/" class="hover:text-blue-650 flex items-center space-x-1 transition-colors font-medium">
              <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
              <span>Retornar ao site</span>
            </a>
            <span class="text-[10px] font-mono">v1.1.0-JWT</span>
          </div>

        </div>

        <div class="bg-slate-550/5 px-6 py-4 border-t border-slate-100 font-sans text-[10px] text-slate-400 flex justify-between select-none">
          <span>Endpoint: POST /api/auth/login</span>
          <span>Basic Auth/JWT payload</span>
        </div>

      </div>
    </div>
  `;
}

export function initLogin() {
  const form = document.getElementById('login-sub-form');
  const submitBtn = document.getElementById('login-submit-btn');
  const errorAlert = document.getElementById('login-error-alert');
  const errorMsg = document.getElementById('login-error-msg');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const user = document.getElementById('login-username').value.trim();
      const pass = document.getElementById('login-password').value;

      // Hide previous errors
      errorAlert.classList.add('hidden');

      // Set Loading Spinner
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        <span>Consultando Spring Security...</span>
      `;

      try {
        // Run simulated post request
        await api.login(user, pass);
        
        // Log clean transition success
        window.location.hash = '/admin';

      } catch (err) {
        // Show validation errors cleanly
        errorMsg.textContent = err.message || "Erro de conexão ao servidor Spring Boot.";
        errorAlert.classList.remove('hidden');
        
        // Restore CTA Button
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <i data-lucide="log-in" class="w-4 h-4"></i>
          <span>Autenticar Usuário</span>
        `;
        if (window.lucide) window.lucide.createIcons();
      }
    });
  }
}
