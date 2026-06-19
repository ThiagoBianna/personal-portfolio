import { api, getSeedsTechLogo, convertFileToBase64 } from '../../api.js';

let activeTab = 'projects'; // Tracks selected active tab: projects, certificates, about, settings
let projectsList = [];
let certificatesList = [];
let profileData = {};
let statsData = {};

let editingProjectId = null;
let editingCertId = null;
let academicsList = [];
let editingAcademicId = null;

export async function renderAdmin() {
  profileData = await api.getProfile();
  statsData = await api.getStats();

  return `
    <div class="min-h-screen bg-slate-50 flex flex-col bg-dot-pattern">
      <!-- Admin Top Navbar Header -->
      <nav class="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-3xs select-none">
        <div class="flex items-center space-x-3">
          <div class="bg-blue-50 border border-blue-200 w-9 h-9 rounded-xl flex items-center justify-center text-blue-600 shadow-3xs animate-fade-in-slow">
            <i data-lucide="layout-dashboard" class="w-5 h-5"></i>
          </div>
          <div>
            <h1 class="text-sm font-bold text-slate-900 font-sans flex items-center space-x-2">
              <span>Admin Console</span>
              <span class="bg-blue-50 text-blue-600 text-[9px] font-semibold border border-blue-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">Connected</span>
            </h1>
            <p class="text-[9px] font-sans font-semibold text-slate-400 mt-1 leading-none">Spring Security context active (JWT Token authorized)</p>
          </div>
        </div>

        <div class="flex items-center space-x-3">
          <a href="#/" class="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-sans text-xs px-3.5 py-2 rounded-xl flex items-center space-x-1.5 transition-all shadow-3xs hover:border-slate-300">
            <i data-lucide="arrow-left" class="w-4 h-4 text-slate-500"></i>
            <span class="font-semibold">Ir para o Portfólio</span>
          </a>
          <button id="admin-logout-btn" class="bg-red-50 hover:bg-red-100/80 text-red-650 border border-red-200 font-sans text-xs px-3.5 py-2 rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer shadow-3xs">
            <i data-lucide="log-out" class="w-4 h-4 text-red-500"></i>
            <span class="font-semibold">Sair</span>
          </button>
        </div>
      </nav>

      <!-- Main Dashboard Grid layout -->
      <div class="flex-1 max-w-6xl w-full mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-12 gap-8 z-10">
        
        <!-- Sidebar Menu Option list -->
        <aside class="md:col-span-3 flex flex-col space-y-2 select-none">
          <button data-tab="projects" class="admin-tab-btn flex items-center space-x-2.5 px-4 py-3 rounded-xl text-left text-xs font-sans font-semibold transition-all border outline-none cursor-pointer">
            <i data-lucide="terminal" class="w-4 h-4"></i>
            <span class="flex-1">Projetos</span>
          </button>

          <button data-tab="certificates" class="admin-tab-btn flex items-center space-x-2.5 px-4 py-3 rounded-xl text-left text-xs font-sans font-semibold transition-all border outline-none cursor-pointer">
            <i data-lucide="award" class="w-4 h-4"></i>
            <span class="flex-1">Certificados</span>
          </button>

          <button data-tab="academics" class="admin-tab-btn flex items-center space-x-2.5 px-4 py-3 rounded-xl text-left text-xs font-sans font-semibold transition-all border outline-none cursor-pointer">
            <i data-lucide="graduation-cap" class="w-4 h-4"></i>
            <span class="flex-1">Formação Acadêmica</span>
          </button>

          <button data-tab="about" class="admin-tab-btn flex items-center space-x-2.5 px-4 py-3 rounded-xl text-left text-xs font-sans font-semibold transition-all border outline-none cursor-pointer">
            <i data-lucide="user" class="w-4 h-4"></i>
            <span class="flex-1">Sobre Mim</span>
          </button>

          <button data-tab="settings" class="admin-tab-btn flex items-center space-x-2.5 px-4 py-3 rounded-xl text-left text-xs font-sans font-semibold transition-all border outline-none cursor-pointer">
            <i data-lucide="settings" class="w-4 h-4"></i>
            <span class="flex-1">Configurações</span>
          </button>

          <div class="border-t border-slate-200 mt-6 pt-6 px-1">
            <h4 class="text-[9px] font-bold font-sans text-slate-400 uppercase tracking-widest leading-none mb-2.5">Logs da Aplicação</h4>
            <div class="bg-white border border-slate-200 p-3 rounded-2xl font-mono text-[9px] text-slate-500 space-y-1.5 overflow-hidden select-none shadow-3xs">
              <p class="text-blue-600 font-bold leading-none">• SEC_JWT_AUTHENTICATED</p>
              <p class="leading-none mt-1">• REST controller active</p>
              <p class="leading-none">• JPA auto flush state</p>
            </div>
          </div>
        </aside>

        <!-- Dynamic Management Area -->
        <main class="md:col-span-9 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 min-h-[500px] flex flex-col justify-between shadow-xs relative overflow-hidden">
          
          <div id="admin-tab-content-container" class="flex-1">
            <!-- Dynamic Tab markup will load here -->
          </div>

        </main>

      </div>
    </div>

    <!-- MODAL 1: ADD/EDIT PROJECT DIALOG (LIGHT MODERN) -->
    <div id="project-modal" class="hidden fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto select-none">
      <div class="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full relative shadow-2xl animate-fade-in my-8">
        <div class="flex items-center justify-between p-5 border-b border-slate-100">
          <h3 id="project-modal-title" class="text-sm font-bold text-slate-900 flex items-center space-x-2 font-sans">
            <i data-lucide="folder-plus" class="w-4 h-4 text-blue-600"></i>
            <span>Adicionar Projeto</span>
          </h3>
          <button id="close-proj-modal" class="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-xl transition-all">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        <form id="project-form-payload" class="p-6 space-y-4 text-xs font-sans">
          <div class="flex flex-col">
            <label class="font-sans text-[10px] text-slate-500 uppercase tracking-wide font-bold mb-1.5">Nome do Projeto *</label>
            <input type="text" id="proj-nome" required placeholder="Ex: API de Agendamento Vacinas" class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none transition-all">
          </div>

          <div class="flex flex-col">
            <label class="font-sans text-[10px] text-slate-500 uppercase tracking-wide font-bold mb-1.5">Descrição Detalhada *</label>
            <textarea id="proj-descricao" rows="3" required placeholder="Descreva os problemas de negócios resolvidos e arquitetura utilizada..." class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-slate-805 placeholder-slate-450 focus:outline-none transition-all resize-none"></textarea>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="flex flex-col">
              <label class="font-sans text-[10px] text-slate-500 uppercase tracking-wide font-bold mb-1.5">Tecnologias * (Separadas por vírgula)</label>
              <input type="text" id="proj-tecnologias" required placeholder="Ex: Java 21, Spring Boot, Eureka" class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none transition-all">
            </div>
            <div class="flex flex-col">
              <label class="font-sans text-[10px] text-slate-500 uppercase tracking-wide font-bold mb-1.5">Data de Criação (Opcional)</label>
              <input type="date" id="proj-datacriacao" class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-slate-850 focus:outline-none transition-all font-sans">
            </div>
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div class="flex flex-col">
              <label class="font-sans text-[10px] text-slate-500 uppercase tracking-wide font-bold mb-1.5">Link GitHub *</label>
              <input type="url" id="proj-linkgithub" required placeholder="https://..." class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-3.5 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none transition-all font-sans">
            </div>
            <div class="flex flex-col">
              <label class="font-sans text-[10px] text-slate-500 uppercase tracking-wide font-bold mb-1.5">Link do Site (Ver site)</label>
              <input type="url" id="proj-linkdemo" placeholder="https://..." class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-3.5 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none transition-all font-sans">
            </div>
            <div class="flex flex-col">
              <label class="font-sans text-[10px] text-slate-500 uppercase tracking-wide font-bold mb-1.5">Vídeo YouTube</label>
              <input type="url" id="proj-linkvideo" placeholder="https://..." class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-3.5 py-2.5 text-slate-805 placeholder-slate-400 focus:outline-none transition-all font-sans">
            </div>
          </div>

          <!-- Dual Form image upload handling (Up to 5 images structured in interactive tabs) -->
          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col space-y-3">
            <span class="font-sans text-[10px] text-slate-600 uppercase tracking-wide font-extrabold block">Fotos do Projeto (Limite de até 5 fotos)</span>
            <div class="flex space-x-1.5 bg-slate-200/60 p-1 rounded-xl">
              <button type="button" class="proj-img-tab flex-1 py-1 px-1.5 rounded-lg text-center font-bold text-[10px] transition-all bg-white text-slate-800 shadow-2xs" data-tab="1">Foto 1 *</button>
              <button type="button" class="proj-img-tab flex-1 py-1 px-1.5 rounded-lg text-center font-bold text-[10px] transition-all text-slate-500 hover:text-slate-700" data-tab="2">Foto 2</button>
              <button type="button" class="proj-img-tab flex-1 py-1 px-1.5 rounded-lg text-center font-bold text-[10px] transition-all text-slate-500 hover:text-slate-700" data-tab="3">Foto 3</button>
              <button type="button" class="proj-img-tab flex-1 py-1 px-1.5 rounded-lg text-center font-bold text-[10px] transition-all text-slate-500 hover:text-slate-700" data-tab="4">Foto 4</button>
              <button type="button" class="proj-img-tab flex-1 py-1 px-1.5 rounded-lg text-center font-bold text-[10px] transition-all text-slate-500 hover:text-slate-700" data-tab="5">Foto 5</button>
            </div>
            
            <!-- Tab Contents -->
            <div id="proj-img-tab-contents" class="space-y-3 pt-1">
              <!-- Slot 1 -->
              <div id="proj-img-slot-1" class="proj-img-slot-pane space-y-2">
                <div class="flex flex-col">
                  <label class="font-sans text-[10px] text-slate-500 uppercase tracking-wide font-bold mb-1">Upload de Arquivo (Foto 1 - Principal)</label>
                  <input type="file" id="proj-file-input-1" accept="image/*" class="text-xs text-slate-600 file:bg-white file:border file:border-slate-200 file:hover:bg-slate-50 file:text-slate-800 file:px-3 file:py-1 file:rounded-lg file:mr-2 cursor-pointer font-sans w-full">
                </div>
                <div class="relative flex items-center justify-center">
                  <span class="text-[9px] font-sans font-bold text-slate-400 uppercase select-none">Ou URL direta</span>
                </div>
                <input type="text" id="proj-imagem-url-1" placeholder="https://images.unsplash.com/..." class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-3.5 py-2 text-slate-800 placeholder-slate-400 focus:outline-none transition-all font-sans text-xs w-full">
              </div>
              
              <!-- Slot 2 -->
              <div id="proj-img-slot-2" class="proj-img-slot-pane hidden space-y-2">
                <div class="flex flex-col">
                  <label class="font-sans text-[10px] text-slate-500 uppercase tracking-wide font-bold mb-1">Upload de Arquivo (Foto 2)</label>
                  <input type="file" id="proj-file-input-2" accept="image/*" class="text-xs text-slate-600 file:bg-white file:border file:border-slate-200 file:hover:bg-slate-50 file:text-slate-800 file:px-3 file:py-1 file:rounded-lg file:mr-2 cursor-pointer font-sans w-full">
                </div>
                <div class="relative flex items-center justify-center">
                  <span class="text-[9px] font-sans font-bold text-slate-400 uppercase select-none">Ou URL direta</span>
                </div>
                <input type="text" id="proj-imagem-url-2" placeholder="https://images.unsplash.com/..." class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-3.5 py-2 text-slate-800 placeholder-slate-400 focus:outline-none transition-all font-sans text-xs w-full">
              </div>

              <!-- Slot 3 -->
              <div id="proj-img-slot-3" class="proj-img-slot-pane hidden space-y-2">
                <div class="flex flex-col">
                  <label class="font-sans text-[10px] text-slate-500 uppercase tracking-wide font-bold mb-1">Upload de Arquivo (Foto 3)</label>
                  <input type="file" id="proj-file-input-3" accept="image/*" class="text-xs text-slate-600 file:bg-white file:border file:border-slate-200 file:hover:bg-slate-50 file:text-slate-800 file:px-3 file:py-1 file:rounded-lg file:mr-2 cursor-pointer font-sans w-full">
                </div>
                <div class="relative flex items-center justify-center">
                  <span class="text-[9px] font-sans font-bold text-slate-400 uppercase select-none">Ou URL direta</span>
                </div>
                <input type="text" id="proj-imagem-url-3" placeholder="https://images.unsplash.com/..." class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-3.5 py-2 text-slate-800 placeholder-slate-400 focus:outline-none transition-all font-sans text-xs w-full">
              </div>

              <!-- Slot 4 -->
              <div id="proj-img-slot-4" class="proj-img-slot-pane hidden space-y-2">
                <div class="flex flex-col">
                  <label class="font-sans text-[10px] text-slate-500 uppercase tracking-wide font-bold mb-1">Upload de Arquivo (Foto 4)</label>
                  <input type="file" id="proj-file-input-4" accept="image/*" class="text-xs text-slate-600 file:bg-white file:border file:border-slate-200 file:hover:bg-slate-50 file:text-slate-800 file:px-3 file:py-1 file:rounded-lg file:mr-2 cursor-pointer font-sans w-full">
                </div>
                <div class="relative flex items-center justify-center">
                  <span class="text-[9px] font-sans font-bold text-slate-400 uppercase select-none">Ou URL direta</span>
                </div>
                <input type="text" id="proj-imagem-url-4" placeholder="https://images.unsplash.com/..." class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-3.5 py-2 text-slate-800 placeholder-slate-400 focus:outline-none transition-all font-sans text-xs w-full">
              </div>

              <!-- Slot 5 -->
              <div id="proj-img-slot-5" class="proj-img-slot-pane hidden space-y-2">
                <div class="flex flex-col">
                  <label class="font-sans text-[10px] text-slate-500 uppercase tracking-wide font-bold mb-1">Upload de Arquivo (Foto 5)</label>
                  <input type="file" id="proj-file-input-5" accept="image/*" class="text-xs text-slate-600 file:bg-white file:border file:border-slate-200 file:hover:bg-slate-50 file:text-slate-800 file:px-3 file:py-1 file:rounded-lg file:mr-2 cursor-pointer font-sans w-full">
                </div>
                <div class="relative flex items-center justify-center">
                  <span class="text-[9px] font-sans font-bold text-slate-400 uppercase select-none">Ou URL direta</span>
                </div>
                <input type="text" id="proj-imagem-url-5" placeholder="https://images.unsplash.com/..." class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-3.5 py-2 text-slate-800 placeholder-slate-400 focus:outline-none transition-all font-sans text-xs w-full">
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="flex flex-col">
              <label class="font-sans text-[10px] text-slate-500 uppercase tracking-wide font-bold mb-1.5">Status do Projeto</label>
              <select id="proj-status" class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-slate-850 focus:outline-none transition-all font-sans text-xs">
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>
            <div class="flex flex-col">
              <label class="font-sans text-[10px] text-slate-500 uppercase tracking-wide font-bold mb-1.5">URL do Vídeo de Prévia (Ex: link direto .mp4)</label>
              <input type="url" id="proj-videopreview" placeholder="Ex: https://assets.mixkit.co/videos/preview/...mp4" class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-slate-800 placeholder-slate-450 focus:outline-none transition-all font-sans text-xs animate-none">
            </div>
          </div>

          <div class="flex items-center justify-end space-x-2 pt-4 border-t border-slate-100">
            <button type="button" id="cancel-proj-modal" class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-sans font-semibold text-xs cursor-pointer">Fechar</button>
            <button type="submit" id="save-proj-btn" class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl flex items-center space-x-1.5 cursor-pointer shadow-sm shadow-blue-100">
              <i data-lucide="check" class="w-4 h-4"></i>
              <span>Confirmar Registro</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL 2: ADD/EDIT CERTIFICATE DIALOG -->
    <div id="cert-modal" class="hidden fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 select-none">
      <div class="bg-white border border-slate-200 rounded-3xl max-w-md w-full relative shadow-2xl animate-fade-in">
        <div class="flex items-center justify-between p-5 border-b border-slate-100">
          <h3 id="cert-modal-title" class="text-sm font-bold text-slate-900 flex items-center space-x-2 font-sans">
            <i data-lucide="award" class="w-4 h-4 text-blue-600"></i>
            <span>Adicionar Certificado</span>
          </h3>
          <button id="close-cert-modal" class="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-xl transition-all">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        <form id="cert-form-payload" class="p-6 space-y-4 text-xs font-sans">
          <div class="flex flex-col">
            <label class="font-sans text-[10px] text-slate-500 uppercase tracking-wide font-bold mb-1.5">Título do Certificado *</label>
            <input type="text" id="cert-nome" required placeholder="Ex: Especialista Spring Security" class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none transition-all">
          </div>

          <div class="flex flex-col">
            <label class="font-sans text-[10px] text-slate-500 uppercase tracking-wide font-bold mb-1.5">Instituição de Ensino *</label>
            <input type="text" id="cert-instituicao" required placeholder="Ex: Alura, Udemy, Oracle Corp" class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none transition-all">
          </div>

          <!-- Dual Form school logo upload handling -->
          <div class="p-4 bg-slate-50/70 rounded-2xl border border-slate-200 space-y-3 flex flex-col">
            <div class="flex flex-col">
              <label class="font-sans text-[10px] text-slate-500 uppercase tracking-wide font-bold mb-1.5">Logotipo da Instituição (Upload ou URL)</label>
              <input type="file" id="cert-logo-file-input" accept="image/*" class="text-xs text-slate-500 file:bg-white file:border file:border-slate-200 file:hover:bg-slate-50 file:text-slate-800 file:px-3 file:py-1.5 file:rounded-xl file:mr-2 cursor-pointer font-sans">
            </div>
            <div class="relative flex items-center justify-center">
              <span class="text-[9px] font-sans font-bold text-slate-400 uppercase select-none">Ou URL direta do logotipo</span>
            </div>
            <div class="flex flex-col">
              <input type="text" id="cert-logo-url" placeholder="https://logos..." class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-3.5 py-2 text-slate-800 placeholder-slate-400 focus:outline-none transition-all font-sans text-xs">
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="flex flex-col">
              <label class="font-sans text-[10px] text-slate-500 uppercase tracking-wide font-bold mb-1.5">Mês/Ano de Emissão *</label>
              <input type="month" id="cert-data" required class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none transition-all font-sans">
            </div>
            <div class="flex flex-col">
              <label class="font-sans text-[10px] text-slate-500 uppercase tracking-wide font-bold mb-1.5">Link de Validação (URL)</label>
              <input type="url" id="cert-link" placeholder="https://..." class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none transition-all font-sans">
            </div>
          </div>

          <!-- Dual Form image upload handling -->
          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3.5 flex flex-col">
            <div class="flex flex-col">
              <label class="font-sans text-[10px] text-slate-500 uppercase tracking-wide font-bold mb-1.5">Escolher Nova Imagem (Foto / Credencial)</label>
              <input type="file" id="cert-file-input" accept="image/*" class="text-xs text-slate-500 file:bg-white file:border file:border-slate-200 file:hover:bg-slate-50 file:text-slate-800 file:px-3 file:py-1.5 file:rounded-xl file:mr-2 cursor-pointer font-sans">
            </div>
            <div class="relative flex items-center justify-center">
              <span class="text-[9px] font-sans font-bold text-slate-400 uppercase select-none">Ou URL direta</span>
            </div>
            <div class="flex flex-col">
              <input type="text" id="cert-imagem-url" placeholder="https://images.unsplash.com/..." class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-3.5 py-2 text-slate-800 placeholder-slate-400 focus:outline-none transition-all font-sans text-xs">
            </div>
          </div>

          <div class="flex items-center justify-end space-x-2 pt-4 border-t border-slate-100">
            <button type="button" id="cancel-cert-modal" class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-sans font-semibold text-xs cursor-pointer">Fechar</button>
            <button type="submit" id="save-cert-btn" class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl flex items-center space-x-1.5 cursor-pointer shadow-sm shadow-blue-100">
              <i data-lucide="check" class="w-4 h-4"></i>
              <span>Confirmar Registro</span>
            </button>
          </div>
        </form>
      </div>
    </div>


    <!-- MODAL 3: ADD/EDIT ACADEMIC DIALOG -->
    <div id="acad-modal" class="hidden fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 select-none">
      <div class="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full relative shadow-2xl animate-fade-in">
        <div class="flex items-center justify-between p-5 border-b border-slate-101">
          <h3 id="acad-modal-title" class="text-sm font-bold text-slate-900 flex items-center space-x-2 font-sans">
            <i data-lucide="graduation-cap" class="w-4 h-4 text-blue-600"></i>
            <span>Adicionar Educação Acadêmica</span>
          </h3>
          <button id="close-acad-modal" class="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-xl transition-all">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        <form id="acad-form-payload" class="p-6 space-y-4 text-xs font-sans">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <!-- Left inputs column -->
            <div class="space-y-4">
              <div class="flex flex-col">
                <label class="font-sans text-[10px] text-slate-500 uppercase tracking-wide font-bold mb-1.5">Curso / Título *</label>
                <input type="text" id="acad-curso" required placeholder="Ex: Bacharelado em Engenharia de Software" class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none transition-all">
              </div>

              <div class="flex flex-col">
                <label class="font-sans text-[10px] text-slate-500 uppercase tracking-wide font-bold mb-1.5">Instituição de Ensino *</label>
                <input type="text" id="acad-instituicao" required placeholder="Ex: FIAP, USP, UNICAMP" class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none transition-all">
              </div>

              <div class="flex flex-col">
                <label class="font-sans text-[10px] text-slate-500 uppercase tracking-wide mb-1 font-bold">Período *</label>
                <input type="text" id="acad-periodo" required placeholder="Ex: 2024 - 2028 (Em andamento)" class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none transition-all font-sans">
              </div>

              <div class="flex flex-col">
                <label class="font-sans text-[10px] text-slate-500 uppercase tracking-wide font-bold mb-1.5">Descrição Curta *</label>
                <textarea id="acad-descricao" rows="3" required placeholder="Descreva os focos acadêmicos principais..." class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-slate-805 placeholder-slate-400 focus:outline-none transition-all resize-none"></textarea>
              </div>
            </div>

            <!-- Right uploads column -->
            <div class="space-y-4">
              <!-- Dual Form image upload handling -->
              <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3.5 flex flex-col">
                <div class="flex flex-col">
                  <label class="font-sans text-[10px] text-slate-500 uppercase tracking-wide font-bold mb-1.5">Logotipo da Instituição (Upload File - FormData)</label>
                  <input type="file" id="acad-file-input" accept="image/*" class="text-xs text-slate-500 file:bg-white file:border file:border-slate-200 file:hover:bg-slate-50 file:text-slate-800 file:px-3 file:py-1.5 file:rounded-xl file:mr-2 cursor-pointer font-sans">
                </div>
                <div class="relative flex items-center justify-center">
                  <span class="text-[9px] font-sans font-bold text-slate-400 uppercase select-none">Ou URL direta</span>
                </div>
                <div class="flex flex-col">
                  <input type="text" id="acad-imagem-url" placeholder="https://logos..." class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-3.5 py-2 text-slate-800 placeholder-slate-400 focus:outline-none transition-all font-sans text-xs">
                </div>
              </div>

              <!-- Dual Form diploma upload handling -->
              <div class="p-4 bg-amber-50/40 rounded-2xl border border-amber-200/60 space-y-3.5 flex flex-col">
                <div class="flex flex-col">
                  <label class="font-sans text-[10px] text-amber-800 uppercase tracking-wide font-bold mb-1.5">Diploma Acadêmico (Upload PDF ou Imagem - FormData)</label>
                  <input type="file" id="acad-diploma-file-input" accept="application/pdf,image/*" class="text-xs text-amber-700 file:bg-white file:border file:border-amber-200 file:hover:bg-amber-50 file:text-amber-800 file:px-3 file:py-1.5 file:rounded-xl file:mr-2 cursor-pointer font-sans">
                </div>
                <div class="relative flex items-center justify-center font-bold">
                  <span class="text-[9px] font-sans text-amber-500 uppercase select-none">Ou URL direta do diploma</span>
                </div>
                <div class="flex flex-col">
                  <input type="text" id="acad-diploma-url" placeholder="https://drive.google.com/file/... ou base64" class="bg-white border border-amber-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl px-3.5 py-2 text-slate-800 placeholder-amber-400 focus:outline-none transition-all font-sans text-xs">
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-end space-x-2 pt-4 border-t border-slate-100">
            <button type="button" id="cancel-acad-modal" class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-sans font-semibold text-xs cursor-pointer">Fechar</button>
            <button type="submit" id="save-acad-btn" class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl flex items-center space-x-1.5 cursor-pointer shadow-sm shadow-blue-100">
              <i data-lucide="check" class="w-4 h-4"></i>
              <span>Confirmar Registro</span>
            </button>
          </div>
        </form>
      </div>
    </div>


    <!-- GLOBAL SAVED SUCCESS TOAST -->
    <div id="admin-toast" class="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 transform translate-y-12 opacity-0 bg-white border border-slate-200 text-slate-850 p-5 rounded-2xl shadow-2xl transition-all duration-300 z-50 max-w-sm flex items-start space-x-3.5 select-none animate-slide-up">
      <div class="bg-blue-50 border border-blue-105 text-blue-600 p-2 rounded-xl shrink-0">
        <i data-lucide="database" class="w-5 h-5"></i>
      </div>
      <div>
        <h4 class="text-xs font-bold font-sans text-slate-900">JPA Status - 200 SUCCESS</h4>
        <p class="text-xs text-slate-550 mt-1 lines-clamp-2 leading-relaxed" id="admin-toast-body">Dados flushed com sucesso no banco de dados.</p>
      </div>
    </div>
  `;
}

// FORMAT LOCAL DATES FOR LIST
function formatLocalShortDate(dateStr) {
  if (!dateStr) return "";
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[1]}/${parts[0]}`; // MM/YYYY
    }
    if (parts.length === 2) {
      return `${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  } catch (e) {
    return dateStr;
  }
}

// BIND Lifecycles
export function initAdmin() {
  // Bind Logout
  const mLogout = document.getElementById('admin-logout-btn');
  if (mLogout) {
    mLogout.addEventListener('click', () => {
      api.logout();
      window.location.hash = '/login';
    });
  }

  // Bind Sidebar Tab button clicks
  const tabButtons = document.querySelectorAll('.admin-tab-btn');
  tabButtons.forEach(btn => {
    const tabName = btn.getAttribute('data-tab');
    
    // Style active tab initially
    if (tabName === activeTab) {
      styleActiveTabButton(btn);
    } else {
      styleInactiveTabButton(btn);
    }

    btn.addEventListener('click', () => {
      activeTab = tabName;
      tabButtons.forEach(b => styleInactiveTabButton(b));
      styleActiveTabButton(btn);
      switchAdminTab(tabName);
    });
  });

  // Load default projects view initially
  switchAdminTab(activeTab);

  // Bind project modal closing triggers
  const closeProjBtn = document.getElementById('close-proj-modal');
  const cancelProjBtn = document.getElementById('cancel-proj-modal');
  const projModal = document.getElementById('project-modal');

  const hideProjModal = () => { if (projModal) projModal.classList.add('hidden'); };
  if (closeProjBtn) closeProjBtn.addEventListener('click', hideProjModal);
  if (cancelProjBtn) cancelProjBtn.addEventListener('click', hideProjModal);

  // Bind certificate modal closing triggers
  const closeCertBtn = document.getElementById('close-cert-modal');
  const cancelCertBtn = document.getElementById('cancel-cert-modal');
  const certModal = document.getElementById('cert-modal');

  const hideCertModal = () => { if (certModal) certModal.classList.add('hidden'); };
  if (closeCertBtn) closeCertBtn.addEventListener('click', hideCertModal);
  if (cancelCertBtn) cancelCertBtn.addEventListener('click', hideCertModal);

  // Bind Project submit
  const projForm = document.getElementById('project-form-payload');
  const saveProjBtn = document.getElementById('save-proj-btn');
  if (projForm) {
    projForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      saveProjBtn.disabled = true;
      saveProjBtn.innerHTML = `
        <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        <span>Salvando...</span>
      `;

      // Construct native simulation MultiPart Form data object
      const formData = new FormData();
      formData.append("nome", document.getElementById('proj-nome').value.trim());
      formData.append("descricao", document.getElementById('proj-descricao').value.trim());
      formData.append("tecnologias", document.getElementById('proj-tecnologias').value.trim());
      formData.append("dataCriacao", document.getElementById('proj-datacriacao').value);
      formData.append("linkGithub", document.getElementById('proj-linkgithub').value.trim());
      formData.append("linkDemo", document.getElementById('proj-linkdemo').value.trim());
      formData.append("linkVideo", document.getElementById('proj-linkvideo').value.trim());
      formData.append("videoPreview", document.getElementById('proj-videopreview').value.trim());
      formData.append("status", document.getElementById('proj-status').value);

      // Save/add up to 5 project photos
      for (let i = 1; i <= 5; i++) {
        formData.append(`imagem_${i}`, document.getElementById(`proj-imagem-url-${i}`).value.trim());
        const fileInput = document.getElementById(`proj-file-input-${i}`);
        if (fileInput && fileInput.files[0]) {
          formData.append(`imagemFile_${i}`, fileInput.files[0]);
        }
      }

      try {
        if (editingProjectId) {
          await api.updateProject(editingProjectId, formData);
          showToast(`Projeto ID ${editingProjectId} atualizado com sucesso via Spring API!`);
        } else {
          const res = await api.createProject(formData);
          showToast(`Projeto "${res.nome}" criado com sucesso e indexado no banco de dados!`);
        }
        
        // Refresh dynamic metrics
        if (window.updateStats) await window.updateStats();
        
        hideProjModal();
        switchAdminTab('projects'); // Reload grid
      } catch (err) {
        console.error(err);
        alert("Falha ao salvar projeto.");
      } finally {
        saveProjBtn.disabled = false;
        saveProjBtn.innerHTML = `
          <i data-lucide="check" class="w-3.5 h-3.5"></i>
          <span>Confirmar Registro</span>
        `;
        if (window.lucide) window.lucide.createIcons();
      }
    });

    // Bind Project Image Tabs switching in Project Modal
    const projImgTabs = document.querySelectorAll('.proj-img-tab');
    projImgTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');
        // Highlight current tab, reset details
        projImgTabs.forEach(t => {
          t.classList.remove('bg-white', 'text-slate-800', 'shadow-2xs');
          t.classList.add('text-slate-500', 'hover:text-slate-700');
        });
        tab.classList.add('bg-white', 'text-slate-800', 'shadow-2xs');
        tab.classList.remove('text-slate-500', 'hover:text-slate-705');

        // Hide all panes
        document.querySelectorAll('.proj-img-slot-pane').forEach(imgPane => {
          imgPane.classList.add('hidden');
        });
        // Show selected pane
        const selectedPane = document.getElementById(`proj-img-slot-${targetTab}`);
        if (selectedPane) selectedPane.classList.remove('hidden');
      });
    });
  }

  // Bind Certificate submit
  const certForm = document.getElementById('cert-form-payload');
  const saveCertBtn = document.getElementById('save-cert-btn');
  if (certForm) {
    certForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      saveCertBtn.disabled = true;
      saveCertBtn.innerHTML = `
        <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        <span>Salvando...</span>
      `;

      const formData = new FormData();
      formData.append("nome", document.getElementById('cert-nome').value.trim());
      formData.append("instituicao", document.getElementById('cert-instituicao').value.trim());
      formData.append("data", document.getElementById('cert-data').value);
      formData.append("link", document.getElementById('cert-link').value.trim());
      formData.append("imagem", document.getElementById('cert-imagem-url').value.trim());
      formData.append("logoInstituicao", document.getElementById('cert-logo-url').value.trim());

      const fileInput = document.getElementById('cert-file-input');
      if (fileInput && fileInput.files[0]) {
        formData.append("imagemFile", fileInput.files[0]);
      }

      const logoFileInput = document.getElementById('cert-logo-file-input');
      if (logoFileInput && logoFileInput.files[0]) {
        formData.append("logoInstituicaoFile", logoFileInput.files[0]);
      }

      try {
        if (editingCertId) {
          await api.updateCertificate(editingCertId, formData);
          showToast(`Certificado atualizado com sucesso!`);
        } else {
          const res = await api.createCertificate(formData);
          showToast(`Certificado "${res.nome}" cadastrado com sucesso!`);
        }
        
        // Refresh dynamic metrics
        if (window.updateStats) await window.updateStats();
        
        hideCertModal();
        switchAdminTab('certificates');
      } catch (err) {
        console.error(err);
        alert("Falha ao salvar certificado.");
      } finally {
        saveCertBtn.disabled = false;
        saveCertBtn.innerHTML = `
          <i data-lucide="check" class="w-3.5 h-3.5"></i>
          <span>Confirmar Registro</span>
        `;
        if (window.lucide) window.lucide.createIcons();
      }
    });
  }

  // Bind Academic submit
  const acadForm = document.getElementById('acad-form-payload');
  const saveAcadBtn = document.getElementById('save-acad-btn');
  const acadModal = document.getElementById('acad-modal');
  const hideAcadModal = () => { if (acadModal) acadModal.classList.add('hidden'); };

  const closeAcadBtn = document.getElementById('close-acad-modal');
  const cancelAcadBtn = document.getElementById('cancel-acad-modal');
  if (closeAcadBtn) closeAcadBtn.addEventListener('click', hideAcadModal);
  if (cancelAcadBtn) cancelAcadBtn.addEventListener('click', hideAcadModal);

  if (acadForm) {
    acadForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      saveAcadBtn.disabled = true;
      saveAcadBtn.innerHTML = `
        <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        <span>Salvando...</span>
      `;

      const formData = new FormData();
      formData.append("curso", document.getElementById('acad-curso').value.trim());
      formData.append("instituicao", document.getElementById('acad-instituicao').value.trim());
      formData.append("periodo", document.getElementById('acad-periodo').value.trim());
      formData.append("descricao", document.getElementById('acad-descricao').value.trim());
      formData.append("imagem", document.getElementById('acad-imagem-url').value.trim());
      formData.append("diploma", document.getElementById('acad-diploma-url').value.trim());

      const fileInput = document.getElementById('acad-file-input');
      if (fileInput && fileInput.files[0]) {
        formData.append("imagemFile", fileInput.files[0]);
      }

      const diplomaFileInput = document.getElementById('acad-diploma-file-input');
      if (diplomaFileInput && diplomaFileInput.files[0]) {
        formData.append("diplomaFile", diplomaFileInput.files[0]);
      }

      try {
        if (editingAcademicId) {
          await api.updateAcademic(editingAcademicId, formData);
          showToast(`Formação acadêmica atualizada com sucesso!`);
        } else {
          const res = await api.createAcademic(formData);
          showToast(`Formação "${res.curso}" criada com sucesso!`);
        }
        
        // Refresh dynamic metrics
        if (window.updateStats) await window.updateStats();
        
        hideAcadModal();
        switchAdminTab('academics');
      } catch (err) {
        console.error(err);
        alert("Falha ao salvar educação acadêmica.");
      } finally {
        saveAcadBtn.disabled = false;
        saveAcadBtn.innerHTML = `
          <i data-lucide="check" class="w-3.5 h-3.5"></i>
          <span>Confirmar Registro</span>
        `;
        if (window.lucide) window.lucide.createIcons();
      }
    });
  }
}

// Trigger Toast Helper
function showToast(message) {
  const toast = document.getElementById('admin-toast');
  const body = document.getElementById('admin-toast-body');
  if (toast && body) {
    body.textContent = message;
    toast.classList.remove('translate-y-12', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-12', 'opacity-0');
    }, 4500);
  }
}

// Styling Helper functions for tab selections
function styleActiveTabButton(btn) {
  btn.classList.add('bg-blue-50', 'border-blue-200', 'text-blue-600');
  btn.classList.remove('bg-transparent', 'border-transparent', 'text-slate-500', 'hover:bg-slate-100', 'hover:text-slate-800');
}

function styleInactiveTabButton(btn) {
  btn.classList.add('bg-transparent', 'border-transparent', 'text-slate-500', 'hover:bg-slate-100', 'hover:text-slate-800');
  btn.classList.remove('bg-blue-50', 'border-blue-200', 'text-blue-600');
}

// SWITCH ACTIVE TAB VIEWS DYNAMIC MARKUP BUILDER
async function switchAdminTab(tabName) {
  const container = document.getElementById('admin-tab-content-container');
  if (!container) return;

  // Show inline panel loader in Light Mode style
  container.innerHTML = `
    <div class="flex flex-col items-center justify-center py-24 select-none">
      <div class="w-8 h-8 border-3 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
      <p class="text-[10px] font-sans font-bold text-slate-400 mt-3.5 uppercase tracking-widest">Lendo Hibernate Cache...</p>
    </div>
  `;

  if (tabName === 'projects') {
    projectsList = await api.getProjects();
    
    const tableRows = projectsList.length > 0
      ? projectsList.map(proj => `
          <tr class="border-b border-slate-100 hover:bg-slate-50/50 transition-all text-xs font-sans">
            <td class="py-3.5 pl-3">
              <img src="${proj.imagem}" alt="${proj.nome}" class="w-10 h-7 object-cover rounded border border-slate-200 shadow-2xs" referrerPolicy="no-referrer">
            </td>
            <td class="py-3.5 font-bold text-slate-900 max-w-[155px] truncate" title="${proj.nome}">${proj.nome}</td>
            <td class="py-3.5 text-slate-550 max-w-[210px] truncate" title="${proj.descricao}">${proj.descricao}</td>
            <td class="py-3.5 text-[10px] text-slate-500 font-semibold">${proj.tecnologias.slice(0, 3).join(', ')}${proj.tecnologias.length > 3 ? '...' : ''}</td>
            <td class="py-3.5 text-[10px] text-slate-500 font-semibold">${formatLocalShortDate(proj.dataCriacao)}</td>
            <td class="py-3.5 text-right pr-3 space-x-1.5 whitespace-nowrap">
              <!-- Reorder controls -->
              <button data-id="${proj.id}" data-dir="up" class="reorder-proj-btn text-slate-400 hover:text-blue-600 hover:bg-blue-50 border border-slate-150 p-1.5 rounded-lg cursor-pointer transition-all inline-flex items-center justify-center align-middle" title="Subir Posição">
                <i data-lucide="chevron-up" class="w-3.5 h-3.5"></i>
              </button>
              <button data-id="${proj.id}" data-dir="down" class="reorder-proj-btn text-slate-400 hover:text-blue-600 hover:bg-blue-50 border border-slate-150 p-1.5 rounded-lg cursor-pointer transition-all inline-flex items-center justify-center align-middle" title="Descer Posição">
                <i data-lucide="chevron-down" class="w-3.5 h-3.5"></i>
              </button>
              
              <button data-edit-id="${proj.id}" class="edit-proj-btn text-[10px] font-sans font-bold text-blue-600 bg-blue-50 hover:bg-blue-100/80 border border-blue-105 px-2.5 py-1.5 rounded-lg cursor-pointer transition-all inline-flex items-center align-middle">Editar</button>
              <button data-del-id="${proj.id}" class="del-proj-btn text-[10px] font-sans font-bold text-red-650 bg-red-50 hover:bg-red-100/80 border border-red-200 px-2.5 py-1.5 rounded-lg cursor-pointer transition-all inline-flex items-center align-middle">Excluir</button>
            </td>
          </tr>
        `).join('')
      : `<tr><td colspan="6" class="py-12 text-center text-slate-400 font-sans text-[11px] uppercase tracking-wide">Nenhum projeto cadastrado.</td></tr>`;

    container.innerHTML = `
      <div class="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div>
          <h2 class="text-sm font-bold text-slate-900 font-sans">Gerenciar Projetos</h2>
          <p class="text-[10px] font-sans font-semibold text-slate-400 mt-1 uppercase tracking-wide">Mapeamento Spring: /api/projects</p>
        </div>
        <button id="add-proj-btn-modal" class="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm shadow-blue-100">
          <i data-lucide="plus" class="w-4 h-4"></i>
          <span>Novo Projeto</span>
        </button>
      </div>

      <div class="overflow-x-auto border border-slate-250 rounded-2xl bg-white shadow-2xs">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200 text-[10px] font-semibold text-slate-500 uppercase tracking-widest select-none">
              <th class="py-3.5 pl-3 w-16">Foto</th>
              <th class="py-3.5">Nome</th>
              <th class="py-3.5">Descrição</th>
              <th class="py-3.5">Tecnologias</th>
              <th class="py-3.5">Data</th>
              <th class="py-3.5 text-right pr-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </div>
    `;

    // Bind additions + edit + deletes inside tab
    const addBtn = document.getElementById('add-proj-btn-modal');
    if (addBtn) addBtn.addEventListener('click', () => openProjectModal(null));

    const editBtns = document.querySelectorAll('.edit-proj-btn');
    editBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-edit-id');
        openProjectModal(id);
      });
    });

    const delBtns = document.querySelectorAll('.del-proj-btn');
    delBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-del-id');
        confirmDeleteProject(id);
      });
    });

    // Reorder projects listeners
    const reorderProjBtns = document.querySelectorAll('.reorder-proj-btn');
    reorderProjBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        const dir = btn.getAttribute('data-dir');
        try {
          await api.reorderProject(id, dir);
          await switchAdminTab('projects');
          showToast("Ordem do projeto atualizada com sucesso!");
        } catch (err) {
          console.error(err);
          alert("Falha ao reordenar o projeto");
        }
      });
    });

  } else if (tabName === 'certificates') {
    certificatesList = await api.getCertificates();

    const tableRows = certificatesList.length > 0
      ? certificatesList.map(cert => `
          <tr class="border-b border-slate-100 hover:bg-slate-55/50 transition-all text-xs font-sans">
            <td class="py-3.5 pl-3">
              <img src="${cert.imagem}" alt="${cert.nome}" class="w-10 h-7 object-cover rounded border border-slate-200 shadow-2xs" referrerPolicy="no-referrer">
            </td>
            <td class="py-3.5 font-bold text-slate-900" title="${cert.nome}">${cert.nome}</td>
            <td class="py-3.5 text-slate-550 flex items-center space-x-1.5">
              ${cert.logoInstituicao ? `<img src="${cert.logoInstituicao}" alt="Logo" class="w-4 h-4 object-contain rounded-xs border border-slate-200 p-0.5 bg-white shrink-0" referrerPolicy="no-referrer">` : ''}
              <span>${cert.instituicao}</span>
            </td>
            <td class="py-3.5 text-[10px] text-slate-500 font-semibold">${formatLocalShortDate(cert.data)}</td>
            <td class="py-3.5 text-right pr-3 space-x-1.5 whitespace-nowrap">
              <!-- Reorder controls -->
              <button data-id="${cert.id}" data-dir="up" class="reorder-cert-btn text-slate-400 hover:text-blue-600 hover:bg-blue-50 border border-slate-150 p-1.5 rounded-lg cursor-pointer transition-all inline-flex items-center justify-center align-middle" title="Subir Posição">
                <i data-lucide="chevron-up" class="w-3.5 h-3.5"></i>
              </button>
              <button data-id="${cert.id}" data-dir="down" class="reorder-cert-btn text-slate-400 hover:text-blue-600 hover:bg-blue-50 border border-slate-150 p-1.5 rounded-lg cursor-pointer transition-all inline-flex items-center justify-center align-middle" title="Descer Posição">
                <i data-lucide="chevron-down" class="w-3.5 h-3.5"></i>
              </button>

              <button data-edit-id="${cert.id}" class="edit-cert-btn text-[10px] font-sans font-bold text-blue-600 bg-blue-50 hover:bg-blue-101/80 border border-blue-105 px-2.5 py-1.5 rounded-lg cursor-pointer transition-all inline-flex items-center align-middle">Editar</button>
              <button data-del-id="${cert.id}" class="del-cert-btn text-[10px] font-sans font-bold text-red-650 bg-red-50 hover:bg-red-101/80 border border-red-200 px-2.5 py-1.5 rounded-lg cursor-pointer transition-all inline-flex items-center align-middle">Excluir</button>
            </td>
          </tr>
        `).join('')
      : `<tr><td colspan="5" class="py-12 text-center text-slate-400 font-sans text-[11px] uppercase tracking-wide">Nenhum certificado cadastrado.</td></tr>`;

    container.innerHTML = `
      <div class="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div>
          <h2 class="text-sm font-bold text-slate-900 font-sans">Gerenciar Certificados</h2>
          <p class="text-[10px] font-sans font-semibold text-slate-400 mt-1 uppercase tracking-wide">Mapeamento API: /api/certificates</p>
        </div>
        <button id="add-cert-btn-modal" class="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm shadow-blue-100">
          <i data-lucide="plus" class="w-4 h-4"></i>
          <span>Novo Certificado</span>
        </button>
      </div>

      <div class="overflow-x-auto border border-slate-250 rounded-2xl bg-white shadow-2xs">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200 text-[10px] font-semibold text-slate-500 uppercase tracking-widest select-none">
              <th class="py-3.5 pl-3 w-16">Foto</th>
              <th class="py-3.5">Título</th>
              <th class="py-3.5">Instituição</th>
              <th class="py-3.5">Data Emissão</th>
              <th class="py-3.5 text-right pr-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </div>
    `;

    const addBtn = document.getElementById('add-cert-btn-modal');
    if (addBtn) addBtn.addEventListener('click', () => openCertificateModal(null));

    const editBtns = document.querySelectorAll('.edit-cert-btn');
    editBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-edit-id');
        openCertificateModal(id);
      });
    });

    const delBtns = document.querySelectorAll('.del-cert-btn');
    delBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-del-id');
        confirmDeleteCertificate(id);
      });
    });

    // Reorder certificates listeners
    const reorderCertBtns = document.querySelectorAll('.reorder-cert-btn');
    reorderCertBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        const dir = btn.getAttribute('data-dir');
        try {
          await api.reorderCertificate(id, dir);
          await switchAdminTab('certificates');
          showToast("Ordem do certificado atualizada com sucesso!");
        } catch (err) {
          console.error(err);
          alert("Falha ao reordenar o certificado");
        }
      });
    });

  } else if (tabName === 'about') {
    const dominadasStr = (profileData.tecnologiasDominadas || []).map(t => typeof t === 'string' ? t : (t.nome || '')).join(', ');

    container.innerHTML = `
      <div class="flex items-center justify-between mb-6 pb-4 border-b border-slate-101">
        <div>
          <h2 class="text-sm font-bold text-slate-900 font-sans">Atualizar Perfil (Sobre Mim)</h2>
          <p class="text-[10px] font-sans font-semibold text-slate-400 mt-1 uppercase tracking-wide">Mapeamento API: PUT /api/profile</p>
        </div>
      </div>

      <form id="profile-payload-form" class="space-y-4 text-xs font-sans">
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col">
            <label class="font-sans text-[10px] text-slate-500 uppercase tracking-wide font-bold mb-1.5">Nome Completo</label>
            <input type="text" id="prof-nome" required value="${profileData.nome}" class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-slate-800 transition-all font-sans">
          </div>
          <div class="flex flex-col">
            <label class="font-sans text-[10px] text-slate-500 uppercase tracking-wide font-bold mb-1.5">Cargo / Título Profissional</label>
            <input type="text" id="prof-cargo" required value="${profileData.cargo}" class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-slate-800 transition-all font-sans">
          </div>
        </div>

        <div class="flex flex-col">
          <label class="font-sans text-[10px] text-slate-500 uppercase tracking-wide font-bold mb-1.5">Frase de Apresentação (Hero Area)</label>
          <textarea id="prof-apresentacao" rows="2" required class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-slate-800 transition-all font-sans resize-none">${profileData.apresentacao}</textarea>
        </div>

        <div class="flex flex-col">
          <label class="font-sans text-[10px] text-slate-500 uppercase tracking-wide font-bold mb-1.5">Biografia Completa (Sobre Mim Section)</label>
          <textarea id="prof-bio" rows="4" required class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-slate-800 transition-all font-sans resize-none">${profileData.bio}</textarea>
        </div>

        <div class="flex flex-col">
          <label class="font-sans text-[10px] text-slate-500 uppercase tracking-wide font-bold mb-1.5">Tecnologias Dominadas (Separadas por vírgula)</label>
          <input type="text" id="prof-dominadas" required value="${dominadasStr}" class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-slate-800 transition-all font-sans" placeholder="Java 21, Spring Boot, PostgreSQL, Docker">
        </div>

        <!-- CV Button config in form -->
        <div class="p-4 bg-blue-50/30 rounded-2xl border border-blue-100 gap-3.5 flex flex-col">
          <h4 class="text-[10px] font-sans font-bold text-blue-600 uppercase tracking-wide">Currículo PDF (Baixar Currículo)</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div class="flex flex-col">
              <label class="font-sans text-[9px] text-slate-550 uppercase tracking-wide mb-1 font-bold">Upload de PDF Atualizado (FormData)</label>
              <input type="file" id="prof-curriculo-file" accept="application/pdf,image/*" class="text-xs text-slate-550 file:bg-white file:border file:border-slate-200 file:hover:bg-slate-50 file:text-slate-800 file:px-3 file:py-1.5 file:rounded-xl file:mr-2 cursor-pointer font-sans">
            </div>
            <div class="flex flex-col">
              <label class="font-sans text-[9px] text-slate-550 uppercase tracking-wide mb-1 font-bold">Ou link/URL do Currículo PDF</label>
              <input type="text" id="prof-curriculo" value="${profileData.links && profileData.links.curriculoPdf ? profileData.links.curriculoPdf : ''}" placeholder="Ex: https://drive.google.com/..." class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2 text-slate-805 font-sans text-xs">
            </div>
          </div>
        </div>

        <!-- Tecnologias com Logos Editáveis -->
        <div class="border-t border-slate-100 pt-5 mt-5">
          <h3 class="text-xs font-bold text-slate-800 font-sans mb-3 flex items-center space-x-1.5 uppercase tracking-wide">
            <i data-lucide="cpu" class="w-4 h-4 text-blue-600 animate-pulse"></i>
            <span>Logotipos das Tecnologias Dominadas</span>
          </h3>
          <p class="text-[10px] text-slate-400 mb-4">Insira o logotipo para cada tecnologia ou faça upload de imagem se preferir.</p>
          
          <div class="space-y-3" id="tech-logos-edit-list">
            ${(profileData.tecnologiasDominadas || []).map((tech, idx) => {
              const name = typeof tech === 'string' ? tech : (tech.nome || '');
              const icon = typeof tech === 'object' && tech.icone ? tech.icone : getSeedsTechLogo(name);
              return `
                <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 p-3.5 bg-slate-50 border border-slate-205 rounded-xl tech-logo-item" data-tech-idx="${idx}">
                  <!-- Preview -->
                  <div class="w-8 h-8 rounded-lg bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0 shadow-3xs">
                    <img src="${icon}" class="w-full h-full object-contain" referrerPolicy="no-referrer" alt="${name}">
                  </div>
                  <!-- Nome -->
                  <div class="w-full sm:w-1/4">
                    <span class="font-bold text-slate-705 block text-xs truncate tech-name-label">${name}</span>
                  </div>
                  <!-- URL input -->
                  <div class="flex-1">
                    <input type="text" value="${icon}" class="w-full bg-white border border-slate-200 focus:border-blue-600 rounded-lg px-3 py-1.5 text-xs text-slate-850 font-sans tech-logo-input" placeholder="URL do logotipo de ${name}">
                  </div>
                  <!-- File Upload input -->
                  <div class="w-full sm:w-1/4">
                    <input type="file" accept="image/*" class="text-[10px] text-slate-500 file:bg-white file:border file:border-slate-200 file:hover:bg-slate-50 file:text-slate-800 file:px-2.5 file:py-1 file:rounded-lg cursor-pointer font-sans tech-logo-file">
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="flex items-center justify-end pt-5 border-t border-slate-105">
          <button type="submit" id="save-profile-btn" class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm shadow-blue-105">
            <i data-lucide="check" class="w-4 h-4"></i>
            <span>Salvar Informações</span>
          </button>
        </div>
      </form>
    `;

    // Bind Submit profile
    const pForm = document.getElementById('profile-payload-form');
    const savePBtn = document.getElementById('save-profile-btn');
    if (pForm) {
      pForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        savePBtn.disabled = true;
        savePBtn.innerHTML = `
          <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          <span>Salvando...</span>
        `;

        // Parse list names
        const names = document.getElementById('prof-dominadas').value.split(',').map(t => t.trim()).filter(Boolean);
        
        // Analyze current logos list
        const techLogoItems = document.querySelectorAll('.tech-logo-item');
        const customLogosMap = {};
        
        for (let item of techLogoItems) {
          const nameLabel = item.querySelector('.tech-name-label');
          const name = nameLabel ? nameLabel.textContent.trim() : "";
          const urlInput = item.querySelector('.tech-logo-input').value.trim();
          const fileInput = item.querySelector('.tech-logo-file');
          
          let logoSrc = urlInput;
          if (fileInput && fileInput.files[0]) {
            try {
              logoSrc = await convertFileToBase64(fileInput.files[0]);
            } catch (err) {
              console.error("Tech logo upload failed", err);
            }
          }
          if (name) {
            customLogosMap[name.toLowerCase()] = logoSrc;
          }
        }

        // Link everything
        const updatedDominadas = names.map(name => {
          const customLogo = customLogosMap[name.toLowerCase()];
          if (customLogo) {
            return { nome: name, icone: customLogo };
          }
          const existing = profileData.tecnologiasDominadas && profileData.tecnologiasDominadas.find(t => typeof t === 'object' && t.nome && t.nome.toLowerCase() === name.toLowerCase());
          return {
            nome: name,
            icone: existing ? existing.icone : getSeedsTechLogo(name)
          };
        });

        const updatedProfile = {
          ...profileData,
          nome: document.getElementById('prof-nome').value.trim(),
          cargo: document.getElementById('prof-cargo').value.trim(),
          apresentacao: document.getElementById('prof-apresentacao').value.trim(),
          bio: document.getElementById('prof-bio').value.trim(),
          tecnologiasDominadas: updatedDominadas,
          tecnologiasEstudando: []
        };

        const cvFileInput = document.getElementById('prof-curriculo-file');
        if (cvFileInput && cvFileInput.files[0]) {
          try {
            updatedProfile.links = {
              ...updatedProfile.links,
              curriculoPdf: await convertFileToBase64(cvFileInput.files[0])
            };
          } catch (err) {
            console.error(err);
          }
        } else if (document.getElementById('prof-curriculo')) {
          updatedProfile.links = {
            ...updatedProfile.links,
            curriculoPdf: document.getElementById('prof-curriculo').value.trim()
          };
        }

        try {
          profileData = await api.updateProfile(updatedProfile);
          showToast("Perfil, currículo e logos flushing concluído!");
          
          // Refresh dynamic metrics
          if (window.updateStats) await window.updateStats();
          
          switchAdminTab('about');
        } catch (err) {
          console.error(err);
          alert("Erro ao salvar.");
        } finally {
          savePBtn.disabled = false;
          savePBtn.innerHTML = `
            <i data-lucide="check" class="w-4 h-4"></i>
            <span>Salvar Informações</span>
          `;
          if (window.lucide) window.lucide.createIcons();
        }
      });
    }

  } else if (tabName === 'settings') {
    container.innerHTML = `
      <div class="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div>
          <h2 class="text-sm font-bold text-slate-900 font-sans">Configurações e Links Sociais</h2>
          <p class="text-[10px] font-sans font-semibold text-slate-400 mt-1 uppercase tracking-wide">Mapeamento API: /api/stats & /api/profile/photo</p>
        </div>
      </div>

      <form id="settings-payload-form" class="space-y-6 text-xs font-sans">
        
        <!-- Social Networks Links Grid -->
        <div class="space-y-3">
          <h3 class="font-sans text-[10px] uppercase tracking-widest text-blue-600 font-bold flex items-center space-x-1.5 select-none">
            <i data-lucide="network" class="w-3.5 h-3.5"></i>
            <span>Redes Sociais & Links</span>
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col">
              <label class="font-sans text-[10px] text-slate-550 tracking-wide font-bold mb-1.5">GitHub URL</label>
              <input type="url" id="link-github" required value="${profileData.links.github}" class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-slate-800 transition-all font-sans">
            </div>
            <div class="flex flex-col">
              <label class="font-sans text-[10px] text-slate-550 tracking-wide font-bold mb-1.5">LinkedIn URL</label>
              <input type="url" id="link-linkedin" required value="${profileData.links.linkedin}" class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-slate-800 transition-all font-sans">
            </div>
            <div class="flex flex-col">
              <label class="font-sans text-[10px] text-slate-550 tracking-wide font-bold mb-1.5">WhatsApp Link (Ex: https://wa.me/...)</label>
              <input type="url" id="link-whatsapp" required value="${profileData.links.whatsapp}" class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-slate-800 transition-all font-sans">
            </div>
            <div class="flex flex-col">
              <label class="font-sans text-[10px] text-slate-550 tracking-wide font-bold mb-1.5">Email de Contato</label>
              <input type="email" id="link-email" required value="${profileData.links.email}" class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-slate-800 transition-all font-sans">
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1.5">
            <div class="flex flex-col">
              <label class="font-sans text-[10px] text-slate-550 tracking-wide font-bold mb-1.5">Foto de Perfil (Cabeçalho / Headline / Hero)</label>
              <input type="text" id="prof-photo-url" required value="${profileData.fotoPerfil}" class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-slate-800 transition-all font-sans">
            </div>
            <div class="flex flex-col">
              <label class="font-sans text-[10px] text-slate-550 tracking-wide font-bold mb-1.5">Foto de Perfil (Seção "Sobre Mim")</label>
              <input type="text" id="prof-photo-sobre-url" required value="${profileData.fotoSobre || profileData.fotoPerfil}" class="bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-slate-800 transition-all font-sans">
            </div>
          </div>
        </div>

        <!-- Dynamic Metrics (Calculated on the fly) -->
        <div class="space-y-3 pt-2">
          <h3 class="font-sans text-[10px] uppercase tracking-widest text-indigo-600 font-bold flex items-center space-x-1.5 select-none">
            <i data-lucide="bar-chart-3" class="w-3.5 h-3.5"></i>
            <span>Métricas Dinâmicas do Portfólio (Cálculo Automático)</span>
          </h3>
          <p class="text-[10px] text-slate-450 mt-1 mb-3">Estes valores são calculados em tempo de execução com base nos dados do banco e na API do GitHub do usuário.</p>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div class="flex flex-col bg-slate-50 border border-slate-200 rounded-xl p-3.5">
              <span class="text-[9px] text-slate-400 uppercase font-bold tracking-wide">Projetos Ativos</span>
              <span class="text-sm font-extrabold text-slate-900 mt-1 font-mono">${statsData.projects || 0}</span>
            </div>
            <div class="flex flex-col bg-slate-50 border border-slate-200 rounded-xl p-3.5">
              <span class="text-[9px] text-slate-400 uppercase font-bold tracking-wide">Certificados TI</span>
              <span class="text-sm font-extrabold text-slate-900 mt-1 font-mono">${statsData.certificates || 0}</span>
            </div>
            <div class="flex flex-col bg-slate-50 border border-slate-200 rounded-xl p-3.5">
              <span class="text-[9px] text-slate-400 uppercase font-bold tracking-wide">Techs Dominadas</span>
              <span class="text-sm font-extrabold text-slate-900 mt-1 font-mono">${statsData.technologies || 0}</span>
            </div>
            <div class="flex flex-col bg-slate-50 border border-slate-200 rounded-xl p-3.5">
              <span class="text-[9px] text-slate-400 uppercase font-bold tracking-wide">Commits no GitHub</span>
              <span class="text-sm font-extrabold text-slate-900 mt-1 font-mono">${statsData.githubCommits || 1450}</span>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-end pt-5 border-t border-slate-100 gap-2">
          <button type="submit" id="save-settings-btn" class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm shadow-blue-105">
            <i data-lucide="check" class="w-4 h-4"></i>
            <span>Salvar Configurações</span>
          </button>
        </div>

      </form>
    `;

    // Bind Submit config
    const sConfig = document.getElementById('settings-payload-form');
    const saveSBtn = document.getElementById('save-settings-btn');
    if (sConfig) {
      sConfig.addEventListener('submit', async (e) => {
        e.preventDefault();

        saveSBtn.disabled = true;
        saveSBtn.innerHTML = `
          <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          <span>Salvando...</span>
        `;

        const updatedProfileLinks = {
          ...profileData,
          fotoPerfil: document.getElementById('prof-photo-url').value.trim(),
          fotoSobre: document.getElementById('prof-photo-sobre-url').value.trim(),
          links: {
            github: document.getElementById('link-github').value.trim(),
            linkedin: document.getElementById('link-linkedin').value.trim(),
            whatsapp: document.getElementById('link-whatsapp').value.trim(),
            email: document.getElementById('link-email').value.trim()
          }
        };

        try {
          profileData = await api.updateProfile(updatedProfileLinks);
          showToast("Configurações sociais e links atualizados com segurança!");
        } catch (err) {
          console.error(err);
          alert("Falha ao salvar dados.");
        } finally {
          saveSBtn.disabled = false;
          saveSBtn.innerHTML = `
            <i data-lucide="check" class="w-4 h-4"></i>
            <span>Salvar Configurações</span>
          `;
          if (window.lucide) window.lucide.createIcons();
        }
      });
    }

  } else if (tabName === 'academics') {
    academicsList = await api.getAcademics();

    const tableRows = academicsList.length > 0
      ? academicsList.map(acad => `
          <tr class="border-b border-slate-100 hover:bg-slate-50/50 transition-all text-xs font-sans">
            <td class="py-3.5 pl-3">
              <img src="${acad.imagem}" alt="${acad.instituicao}" class="w-10 h-10 object-contain rounded border border-slate-205 shadow-3xs p-0.5 bg-white shrink-0 font-sans" referrerPolicy="no-referrer">
            </td>
            <td class="py-3.5 font-bold text-slate-900" title="${acad.curso}">${acad.curso}</td>
            <td class="py-3.5 text-slate-500 font-semibold">${acad.instituicao}</td>
            <td class="py-3.5 text-[10px] text-slate-550 font-mono font-bold">${acad.periodo}</td>
            <td class="py-3.5 text-right pr-3 space-x-1.5 whitespace-nowrap">
              ${acad.diploma ? `
                <a href="${acad.diploma}" target="_blank" class="inline-flex items-center gap-1.5 text-[9px] font-sans font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100/90 border border-emerald-150 px-2.5 py-1.5 rounded-lg cursor-pointer transition-all">
                  <i data-lucide="award" class="w-3.5 h-3.5"></i>
                  <span>Ver Diploma</span>
                </a>
              ` : ''}
              <button data-edit-id="${acad.id}" class="edit-acad-btn text-[10px] font-sans font-bold text-blue-600 bg-blue-50 hover:bg-blue-100/85 border border-blue-105 px-2.5 py-1.5 rounded-lg cursor-pointer transition-all">Editar</button>
              <button data-del-id="${acad.id}" class="del-acad-btn text-[10px] font-sans font-bold text-red-650 bg-red-50 hover:bg-red-101/85 border border-red-200 px-2.5 py-1.5 rounded-lg cursor-pointer transition-all">Excluir</button>
            </td>
          </tr>
        `).join('')
      : `<tr><td colspan="5" class="py-12 text-center text-slate-400 font-sans text-[11px] uppercase tracking-wide">Nenhuma formação acadêmica cadastrada.</td></tr>`;

    container.innerHTML = `
      <div class="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div>
          <h2 class="text-sm font-bold text-slate-900 font-sans">Formação Acadêmica</h2>
          <p class="text-[10px] font-sans font-semibold text-slate-400 mt-1 uppercase tracking-wide">Mapeamento API: /api/academics</p>
        </div>
        <button id="add-acad-btn-modal" class="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm shadow-blue-100">
          <i data-lucide="plus" class="w-4 h-4"></i>
          <span>Adicionar Formação</span>
        </button>
      </div>

      <div class="overflow-x-auto border border-slate-250 rounded-2xl bg-white shadow-2xs">
        <table class="w-full text-left border-collapse font-sans">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200 text-[10px] font-semibold text-slate-500 uppercase tracking-widest select-none">
              <th class="py-3.5 pl-3 w-16">Logo</th>
              <th class="py-3.5">Curso / Título</th>
              <th class="py-3.5">Instituição</th>
              <th class="py-3.5">Período</th>
              <th class="py-3.5 text-right pr-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </div>
    `;

    const addBtn = document.getElementById('add-acad-btn-modal');
    if (addBtn) addBtn.addEventListener('click', () => openAcademicModal(null));

    const editBtns = document.querySelectorAll('.edit-acad-btn');
    editBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-edit-id');
        openAcademicModal(id);
      });
    });

    const delBtns = document.querySelectorAll('.del-acad-btn');
    delBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-del-id');
        confirmDeleteAcademic(id);
      });
    });
  }

  // Reload icons in workspace
  if (window.lucide) window.lucide.createIcons();
}

// OPEN PROJECT MODAL
function openProjectModal(id) {
  editingProjectId = id;
  const modal = document.getElementById('project-modal');
  const title = document.getElementById('project-modal-title');
  const form = document.getElementById('project-form-payload');

  if (!modal) return;

  // Reset inputs
  form.reset();

  // Reset all 5 file and URL inputs
  for (let i = 1; i <= 5; i++) {
    const fileIn = document.getElementById(`proj-file-input-${i}`);
    if (fileIn) fileIn.value = "";
    const urlIn = document.getElementById(`proj-imagem-url-${i}`);
    if (urlIn) urlIn.value = "";
  }

  // Ensure Tab 1 is visual default active
  const tabs = document.querySelectorAll('.proj-img-tab');
  tabs.forEach((tab, idx) => {
    if (idx === 0) {
      tab.classList.add('bg-white', 'text-slate-800', 'shadow-2xs');
      tab.classList.remove('text-slate-500', 'hover:text-slate-700');
    } else {
      tab.classList.remove('bg-white', 'text-slate-800', 'shadow-2xs');
      tab.classList.add('text-slate-500', 'hover:text-slate-700');
    }
  });

  // Ensure Slot 1 pane is visible and the rest hidden
  document.querySelectorAll('.proj-img-slot-pane').forEach((pane, idx) => {
    if (idx === 0) pane.classList.remove('hidden');
    else pane.classList.add('hidden');
  });

  if (id) {
    // Edit existing project
    title.innerHTML = `<i data-lucide="edit-3" class="w-4 h-4 text-blue-600 animate-pulse"></i><span>Editar Projeto #${id}</span>`;
    const proj = projectsList.find(p => p.id === Number(id));
    if (proj) {
      document.getElementById('proj-nome').value = proj.nome;
      document.getElementById('proj-descricao').value = proj.descricao;
      document.getElementById('proj-tecnologias').value = proj.tecnologias.join(', ');
      document.getElementById('proj-datacriacao').value = proj.dataCriacao || "";
      document.getElementById('proj-linkgithub').value = proj.linkGithub;
      document.getElementById('proj-linkdemo').value = proj.linkDemo;
      document.getElementById('proj-linkvideo').value = proj.linkVideo;
      document.getElementById('proj-videopreview').value = proj.videoPreview || "";
      document.getElementById('proj-status').value = proj.status || "online";

      // Load up to 5 URLs
      if (proj.imagens && Array.isArray(proj.imagens)) {
        for (let i = 1; i <= 5; i++) {
          const urlVal = proj.imagens[i - 1] || "";
          document.getElementById(`proj-imagem-url-${i}`).value = urlVal;
        }
      } else if (proj.imagem) {
        document.getElementById('proj-imagem-url-1').value = proj.imagem;
      }
    }
  } else {
    // Create new project
    title.innerHTML = `<i data-lucide="folder-plus" class="w-4 h-4 text-blue-600 animate-pulse"></i><span>Adicionar Projeto ao Banco</span>`;
    document.getElementById('proj-datacriacao').value = "";
    document.getElementById('proj-status').value = "online";
  }

  modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

// CONFIRM DELETE PROJECT
async function confirmDeleteProject(id) {
  const proj = projectsList.find(p => p.id === Number(id));
  if (!proj) return;

  const result = confirm(`Atenção: Tem certeza que deseja executar JPA Delete no projeto "${proj.nome}" (ID ${id})? Essa operação é irreversível.`);
  if (result) {
    try {
      await api.deleteProject(id);
      showToast(`Projeto "${proj.nome}" deletado do banco de dados.`);
      
      // Refresh dynamic metrics
      if (window.updateStats) await window.updateStats();
      
      switchAdminTab('projects');
    } catch (e) {
      console.error(e);
      alert("Erro ao excluir.");
    }
  }
}

// OPEN CERTIFICATE MODAL
function openCertificateModal(id) {
  editingCertId = id;
  const modal = document.getElementById('cert-modal');
  const title = document.getElementById('cert-modal-title');
  const form = document.getElementById('cert-form-payload');

  if (!modal) return;

  form.reset();

  // Reset file inputs manually
  const logoFileInput = document.getElementById('cert-logo-file-input');
  if (logoFileInput) logoFileInput.value = "";

  if (id) {
    title.innerHTML = `<i data-lucide="edit-3" class="w-4 h-4 text-blue-600 animate-pulse"></i><span>Editar Certificado #${id}</span>`;
    const cert = certificatesList.find(c => c.id === Number(id));
    if (cert) {
      document.getElementById('cert-nome').value = cert.nome;
      document.getElementById('cert-instituicao').value = cert.instituicao;
      document.getElementById('cert-data').value = cert.data;
      document.getElementById('cert-link').value = cert.link;
      document.getElementById('cert-imagem-url').value = cert.imagem;
      document.getElementById('cert-logo-url').value = cert.logoInstituicao || "";
    }
  } else {
    title.innerHTML = `<i data-lucide="award" class="w-4 h-4 text-blue-600 animate-pulse"></i><span>Adicionar Certificado</span>`;
    const nowYm = new Date().toISOString().substring(0, 7); // yyyy-mm
    document.getElementById('cert-data').value = nowYm;
    document.getElementById('cert-logo-url').value = "";
  }

  modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

// CONFIRM DELETE CERTIFICATE
async function confirmDeleteCertificate(id) {
  const cert = certificatesList.find(c => c.id === Number(id));
  if (!cert) return;

  const result = confirm(`Deseja mesmo remover o certificado "${cert.nome}" (ID ${id}) do banco?`);
  if (result) {
    try {
      await api.deleteCertificate(id);
      showToast(`Certificado deletado com sucesso.`);
      
      // Refresh dynamic metrics
      if (window.updateStats) await window.updateStats();
      
      switchAdminTab('certificates');
    } catch (e) {
      console.error(e);
      alert("Erro ao deletar.");
    }
  }
}

// OPEN ACADEMIC MODAL
function openAcademicModal(id) {
  editingAcademicId = id;
  const modal = document.getElementById('acad-modal');
  const title = document.getElementById('acad-modal-title');
  const form = document.getElementById('acad-form-payload');

  if (!modal) return;

  form.reset();

  // Reset file inputs
  const fileInput = document.getElementById('acad-file-input');
  if (fileInput) fileInput.value = "";
  const diplomaFileInput = document.getElementById('acad-diploma-file-input');
  if (diplomaFileInput) diplomaFileInput.value = "";

  if (id) {
    title.innerHTML = `<i data-lucide="edit-3" class="w-4 h-4 text-blue-600 animate-pulse"></i><span>Editar Formação #${id}</span>`;
    const acad = academicsList.find(a => a.id === Number(id));
    if (acad) {
      document.getElementById('acad-curso').value = acad.curso;
      document.getElementById('acad-instituicao').value = acad.instituicao;
      document.getElementById('acad-periodo').value = acad.periodo;
      document.getElementById('acad-descricao').value = acad.descricao;
      document.getElementById('acad-imagem-url').value = acad.imagem;
      document.getElementById('acad-diploma-url').value = acad.diploma || "";
    }
  } else {
    title.innerHTML = `<i data-lucide="graduation-cap" class="w-4 h-4 text-blue-600 animate-pulse"></i><span>Adicionar Formação Acadêmica</span>`;
    document.getElementById('acad-periodo').value = "2024 - 2028 (Em andamento)";
    document.getElementById('acad-imagem-url').value = "";
    document.getElementById('acad-diploma-url').value = "";
  }

  modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

// CONFIRM DELETE ACADEMIC
async function confirmDeleteAcademic(id) {
  const acad = academicsList.find(a => a.id === Number(id));
  if (!acad) return;

  const result = confirm(`Atenção: Tem certeza que deseja executar JPA Delete na formação "${acad.curso}" (ID ${id})?`);
  if (result) {
    try {
      await api.deleteAcademic(id);
      showToast(`Formação "${acad.curso}" deletada.`);
      switchAdminTab('academics');
    } catch (e) {
      console.error(e);
      alert("Erro ao excluir.");
    }
  }
}
