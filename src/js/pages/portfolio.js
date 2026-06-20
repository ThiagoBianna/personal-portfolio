import { api, getSeedsTechLogo } from '../../api.js';

export async function renderPortfolio() {
  const profile = await api.getProfile();
  const projects = await api.getProjects();
  const certificates = await api.getCertificates();
  const stats = await api.getStats();
  const academics = await api.getAcademics();
  const experiences = await api.getExperiences();

  // Generating tech badges lists with full logo support
  const techDominadasHtml = profile.tecnologiasDominadas
    .map(tech => {
      const name = typeof tech === 'string' ? tech : (tech.nome || '');
      const icon = typeof tech === 'object' && tech.icone ? tech.icone : getSeedsTechLogo(name);
      return `
        <div class="flex items-center space-x-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-2.5 rounded-xl text-xs shadow-2xs tech-custom-badge cursor-default">
          <img src="${icon}" class="w-5 h-5 object-contain select-none shrink-0" referrerPolicy="no-referrer" alt="${name}">
          <span class="text-slate-800 dark:text-slate-200 font-sans font-bold leading-none">${name}</span>
        </div>
      `;
    }).join('');

  // Generating academics grid
  const academicsHtml = academics.length > 0
    ? academics.map(acad => `
         <div class="flex items-start space-x-4 p-4 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xs premium-interactive-item duration-200 group">
          <div class="w-12 h-12 rounded-xl overflow-hidden bg-white dark:bg-slate-950/60 shrink-0 shadow-3xs flex items-center justify-center select-none border border-transparent dark:border-transparent">            <img src="${acad.imagem}" alt="${acad.instituicao}" class="w-full h-full object-cover rounded-xl group-hover:scale-102 transition-transform" referrerPolicy="no-referrer">
          </div>
          <div class="flex-1">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <h5 class="text-xs font-bold text-slate-900 dark:text-white font-sans">${acad.curso}</h5>
              <span class="text-[9px] font-bold font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/45 border border-blue-105 dark:border-blue-900/40 px-2 py-0.5 rounded-md self-start sm:self-auto">${acad.periodo}</span>
            </div>
            <p class="text-[10px] font-sans font-semibold text-slate-400 dark:text-slate-500 mt-0.5">${acad.instituicao}</p>
            <p class="text-xs font-sans text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed text-justify">${acad.descricao || ''}</p>
            ${acad.diploma ? `
              <div class="mt-3">
                <a href="${acad.diploma}" target="_blank" class="inline-flex items-center space-x-1.5 text-[10px] font-sans font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/45 hover:bg-emerald-100 dark:hover:bg-emerald-905 border border-emerald-150 dark:border-emerald-900/40 px-3 py-1.5 rounded-xl cursor-pointer transition-all shadow-3xs">
                  <i data-lucide="award" class="w-3.5 h-3.5"></i>
                  <span>Ver Diploma</span>
                </a>
              </div>
            ` : ''}
          </div>
         </div>
      `).join('')
    : `
        <div class="py-6 text-center text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-3xs font-sans text-xs">
          Nenhuma formação acadêmica registrada no momento.
        </div>
      `;

  const experiencesHtml = experiences && experiences.length > 0
      ? experiences.map(exp => `
        <div class="flex items-start space-x-4 p-5 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xs premium-interactive-item group">
          <div class="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 select-none shrink-0 shadow-3xs icon-box-animate transition-all duration-300">
            <i data-lucide="briefcase" class="w-4 h-4"></i>
          </div>
          <div class="flex-1">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
              <!-- Cargo: Aumentado de text-xs para text-sm -->
              <h4 class="text-sm font-bold text-slate-900 dark:text-white font-sans">${exp.cargo}</h4>
              <!-- Período/Data: Aumentado de text-[9px] para text-[11px] -->
              <span class="text-[11px] font-bold font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/45 border border-blue-105 dark:border-blue-900/40 px-2.5 py-1 rounded-lg self-start sm:self-auto uppercase tracking-wide">${exp.periodo}</span>
            </div>
            <!-- Empresa: Aumentado de text-[10px] para text-xs -->
            <p class="text-xs font-sans font-bold text-slate-400 dark:text-slate-500 mt-1 select-none">${exp.empresa}</p>
            <!-- Descrição: Aumentado de text-xs para text-sm -->
            <p class="text-sm font-sans text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed text-justify">${exp.descricao || ''}</p>
          </div>
        </div>
      `).join('')
      : null;

  // Generating languages list with flags and fluency
  const flagsMap = {
    'BR': { emoji: '🇧🇷', name: 'Brasil' },
    'US': { emoji: '🇺🇸', name: 'EUA' },
    'ES': { emoji: '🇪🇸', name: 'Espanha' },
    'FR': { emoji: '🇫🇷', name: 'França' },
    'DE': { emoji: '🇩🇪', name: 'Alemanha' },
    'IT': { emoji: '🇮🇹', name: 'Itália' },
    'GB': { emoji: '🇬🇧', name: 'Reino Unido' },
    'JP': { emoji: '🇯🇵', name: 'Japão' },
    'CN': { emoji: '🇨🇳', name: 'China' }
  };

  const idiomasHtml = profile.idiomas && profile.idiomas.length > 0
      ? profile.idiomas.map(idioma => {
        const info = flagsMap[idioma.flag?.toUpperCase()] || { emoji: '🌐', name: 'Outro' };
        return `
          <div class="flex items-center space-x-3.5 p-3.5 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-3xs group/item lang-badge-hover cursor-default">
            <div class="text-2xl select-none leading-none shrink-0 transition-transform group-hover/item:scale-110 duration-200">
              ${info.emoji}
            </div>
            <div class="flex-1 min-w-0">
              <h5 class="text-xs font-bold text-slate-900 dark:text-white leading-tight font-sans">${idioma.nome}</h5>
              <p class="text-[10px] font-bold text-blue-600 dark:text-blue-400 mt-0.5 font-sans">${idioma.nivel}</p>
            </div>
          </div>
        `;
      }).join('')
      : null;

  // Generating projects grid
  const projectsHtml = projects.length > 0 
    ? projects.map(proj => {
        const hasDemo = proj.linkDemo && proj.linkDemo.trim() !== "";
        const hasVideo = proj.linkVideo && proj.linkVideo.trim() !== "";
        const hasDate = proj.dataCriacao && proj.dataCriacao.trim() !== "";
        const formattedDate = hasDate ? formatDate(proj.dataCriacao) : "";
        const finalVideoPreview = proj.videoPreview && proj.videoPreview.trim() !== "" 
          ? proj.videoPreview 
          : "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-computer-34193-large.mp4";

        const isOnline = (proj.status || "online").toLowerCase() === "online";
        const statusText = isOnline ? "Online" : "Offline";
        const statusColorClass = isOnline ? "bg-emerald-500" : "bg-rose-500";
        const pulseClass = isOnline ? "animate-pulse" : "";

        return `
          <div class="premium-card w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group scroll-reveal">
            <div class="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 project-media-container select-none">
              <!-- Cover image of the project behind the play button/video -->
              <img src="${proj.imagem || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600'}" alt="${proj.nome}" class="absolute inset-0 w-full h-full object-cover project-cover-img cursor-pointer open-full-demo-btn" data-video-url="${proj.linkVideo || finalVideoPreview}" data-proj-name="${proj.nome}" data-video-desc="${proj.descricao}" referrerPolicy="no-referrer">
              
              <!-- Video player direct on card cover, starts with opacity-0 and becomes opacity-100 on group-hover -->
              <video src="${finalVideoPreview}" class="absolute inset-0 w-full h-full object-cover cursor-pointer open-full-demo-btn opacity-0 transition-opacity duration-300 project-preview-video" data-video-url="${proj.linkVideo || finalVideoPreview}" data-proj-name="${proj.nome}" data-video-desc="${proj.descricao}" muted loop playsinline></video>
              
              <!-- Centered Play Button overlay -->
              <div class="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:scale-110 transition-all duration-300">
                <div class="w-12 h-12 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 backdrop-blur-xs border border-white/20 select-none">
                  <i data-lucide="play" class="w-5 h-5 fill-current ml-0.5"></i>
                </div>
              </div>
            </div>
            
            <div class="p-6 flex-1 flex flex-col">
              <h3 class="text-base font-bold text-slate-950 dark:text-slate-100 mb-2 font-sans group-hover:text-blue-605 dark:group-hover:text-blue-400 transition-colors">${proj.nome}</h3>
              ${proj.descricao && proj.descricao.length > 150 ? `
                <p class="text-slate-600 dark:text-slate-350 text-sm mb-4 text-justify leading-relaxed flex-1 font-sans">
                  <span>${proj.descricao.slice(0, 140)}...</span>
                  <button data-id="${proj.id}" class="read-more-btn text-blue-600 hover:text-blue-750 font-bold transition-all ml-1 inline cursor-pointer hover:underline text-xs" style="background: none; border: none; padding: 0;">mais</button>
                </p>
              ` : `
                <p class="text-slate-600 dark:text-slate-350 text-sm mb-4 text-justify leading-relaxed flex-1 font-sans">${proj.descricao || ''}</p>
              `}
              
              <!-- Status Indicator: Online/Offline status positioned between Description and Technologies list -->
              <div class="flex items-center space-x-1.5 mb-4 select-none">
                <span class="inline-flex items-center space-x-1.5 bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 px-2.5 py-1 rounded-lg text-[10px] font-sans font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 shadow-3xs cursor-default">
                  <span class="w-1.5 h-1.5 rounded-full ${statusColorClass} ${pulseClass}"></span>
                  <span>${statusText}</span>
                </span>
              </div>

              <div class="flex flex-wrap gap-1.5 mb-5 font-sans">
                ${proj.tecnologias.map(t => `<span class="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-semibold px-2 py-0.5 rounded-md">${t}</span>`).join('')}
              </div>
              
              <div class="grid grid-cols-2 gap-2 text-xs font-sans">
                <a href="${proj.linkGithub}" target="_blank" class="flex items-center justify-center space-x-1.5 bg-slate-900 dark:bg-slate-950 hover:bg-slate-800 dark:hover:bg-slate-850 text-white dark:text-slate-200 py-2 rounded-xl transition-all shadow-sm">
                  <i data-lucide="github" class="w-3.5 h-3.5"></i>
                  <span class="font-semibold">Código</span>
                </a>
                <div class="flex flex-col space-y-1">
                  ${hasDemo ? `
                    <a href="${proj.linkDemo}" target="_blank" class="flex items-center justify-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold transition-all shadow-xs hover:shadow-sm">
                      <i data-lucide="globe" class="w-3.5 h-3.5"></i>
                      <span>Ver site</span>
                    </a>
                  ` : `
                    <button disabled class="flex items-center justify-center space-x-1.5 bg-slate-100 dark:bg-slate-950 text-slate-400 dark:text-slate-600 border border-slate-200/60 dark:border-slate-800/60 py-2 rounded-xl cursor-not-allowed">
                      <i data-lucide="ban" class="w-3.5 h-3.5 text-slate-450"></i>
                      <span>Sem site</span>
                    </button>
                  `}
                </div>
              </div>

              <!-- Button for project gallery trigger -->
              <button class="w-full flex items-center justify-center space-x-2 bg-blue-50/50 dark:bg-blue-950/25 hover:bg-blue-100/80 dark:hover:bg-blue-900/40 border border-blue-200/60 dark:border-blue-900/30 text-blue-700 dark:text-blue-400 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all mt-3 project-gallery-trigger cursor-pointer" data-proj-id="${proj.id}">
                <i data-lucide="images" class="w-4 h-4 text-blue-600 dark:text-blue-400"></i>
                <span>Ver imagens</span>
              </button>

            </div>
          </div>
        `;
      }).join('')
    : `
      <div class="col-span-full py-12 text-center text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-3xs font-sans text-sm">
        <i data-lucide="folder-open" class="w-8 h-8 mx-auto mb-2 opacity-50 text-slate-350"></i>
        Nenhum projeto cadastrado no banco de dados.
      </div>
    `;

  // Helper function to render certificate cards
  const renderCertificateCards = (certs) => {
    return certs.map(cert => `
      <div class="shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden group hover:border-slate-350 dark:hover:border-slate-705 hover:shadow-md transition-all flex flex-col h-full shadow-xs duration-250">
        <div class="relative h-40 bg-slate-100 dark:bg-slate-950 overflow-hidden cursor-pointer cert-image-trigger" data-img-url="${cert.imagem}" data-title="${cert.nome}">
          <img src="${cert.imagem}" alt="${cert.nome}" class="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-102 transition-all duration-300" referrerPolicy="no-referrer">
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent flex items-end p-3">
            <span class="text-[10px] font-sans text-white bg-slate-900/70 backdrop-blur-xs px-2 py-1 rounded-lg shadow-sm flex items-center justify-center">
              <i data-lucide="maximize-2" class="w-3.5 h-3.5"></i>
            </span>
          </div>
        </div>
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <h4 class="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">${cert.nome}</h4>
            <div class="flex items-center space-x-2 mt-2">
              ${cert.logoInstituicao ? `
                <img src="${cert.logoInstituicao}" alt="Logo ${cert.instituicao}" class="w-7 h-7 object-contain rounded border border-slate-200 dark:border-slate-800 p-0.5 bg-white dark:bg-slate-850 shrink-0 shadow-3xs" referrerPolicy="no-referrer">
              ` : ''}
              <span class="text-xs text-slate-550 dark:text-slate-400 font-sans font-medium line-clamp-1">${cert.instituicao}</span>
            </div>
          </div>
          <div class="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 dark:text-slate-500">
            <span class="font-sans">${formatDateMonthYear(cert.data)}</span>
            ${cert.link ? `
              <a href="${cert.link}" target="_blank" class="text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-1 group/link transition-colors">
                <span>Verificar</span>
                <i data-lucide="arrow-up-right" class="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"></i>
              </a>
            ` : `
              <span class="text-slate-400 dark:text-slate-500 font-sans">Especialização</span>
            `}
          </div>
        </div>
      </div>
    `).join('');
  };

  const hasCertificates = certificates.length > 0;
  const certificatesHtml1 = hasCertificates ? renderCertificateCards(certificates) : '';
  const certificatesHtml2 = hasCertificates ? renderCertificateCards([...certificates].reverse()) : '';
  const emptyCertificatesHtml = `
    <div class="col-span-full py-12 text-center text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-3xs font-sans text-sm">
      <i data-lucide="award" class="w-8 h-8 mx-auto mb-2 opacity-50 text-slate-350"></i>
      Nenhum certificado registrado.
    </div>
  `;

  return `
    <!-- Top Embedded Navigation Bar -->
    <header class="sticky top-0 w-full bg-white/30 dark:bg-slate-950/30 backdrop-blur-lg z-40 transition-all duration-300 border-b border-transparent" id="main-nav">
      <div class="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between transition-all duration-300">
        <a href="#hero" class="flex items-center space-x-2 text-slate-900 dark:text-slate-100 group select-none">
          <div class="w-8 h-8 rounded-lg overflow-hidden bg-white dark:bg-slate-900 border border-blue-200 dark:border-slate-800 shrink-0 shadow-3xs flex items-center justify-center">
            <img src="https://media.licdn.com/dms/image/v2/D4D22AQGBVcUTAn-dJQ/feedshare-image-high-res/B4DZ7fA.oAJsAU-/0/1781858036500?e=1783555200&v=beta&t=KvCj8mvwuwAuhtQPwCgXyCAk6jmY8J4q25FsRrfV7K4" alt="Thiago Bianna" class="w-full h-full object-cover rounded-lg" referrerPolicy="no-referrer">
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-bold tracking-tight font-sans text-slate-800 dark:text-slate-200 group-hover:text-slate-950 dark:group-hover:text-white transition-colors">Thiago Bianna</span>
            <span class="text-[9px] font-sans font-semibold text-slate-400 dark:text-slate-500 leading-none">Desenvolvedor de Software</span>
          </div>
        </a>

        <!-- Desktop Navigation Items -->
        <nav class="hidden md:flex items-center space-x-8 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest select-none">
          <a href="#about" class="relative hover:text-blue-600 dark:hover:text-blue-400 py-1 transition-all duration-300">sobre</a>
          <a href="#projects" class="relative hover:text-blue-600 dark:hover:text-blue-400 py-1 transition-all duration-300">projetos</a>
          ${experiencesHtml ? `<a href="#experiences" class="relative hover:text-blue-600 dark:hover:text-blue-400 py-1 transition-all duration-300">experiencias</a>` : ''}
          <a href="#certificates" class="relative hover:text-blue-600 dark:hover:text-blue-400 py-1 transition-all duration-300">certificados</a>
          <a href="#contact" class="relative hover:text-blue-600 dark:hover:text-blue-400 py-1 transition-all duration-300">contato</a>
        </nav>

        <!-- Curriculo, iOS-style Dark Mode Toggle & Hamburger Trigger -->
        <div class="flex items-center space-x-3.5">
          ${profile.links && profile.links.curriculoPdf ? `
            <a href="${profile.links.curriculoPdf}" target="_blank" class="bg-blue-600 hover:bg-blue-700 text-white font-sans text-[11px] px-3.5 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all shadow-2xs hover:shadow-xs cursor-pointer">
              <i data-lucide="file-down" class="w-3.5 h-3.5"></i>
              <span class="font-bold">Currículo</span>
            </a>
          ` : ''}
          
          <!-- Toggle iOS para Dark Mode -->
          <button id="dark-mode-toggle" class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-200 transition-colors duration-300 ease-in-out focus:outline-none" role="switch" aria-label="Alternar Modo Escuro" aria-checked="false">
            <span id="dark-mode-dot" class="pointer-events-none inline-flex h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-300 ease-in-out translate-x-0 flex items-center justify-center">
              <i data-lucide="moon" id="toggle-sun-icon" class="w-3 h-3 text-blue-600 transition-opacity duration-300 select-none"></i>
              <i data-lucide="moon" id="toggle-moon-icon" class="w-3 h-3 text-blue-600 transition-opacity duration-300 absolute opacity-0 select-none"></i>
            </span>
          </button>

          <button id="mobile-menu-btn" class="md:hidden text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white focus:outline-none p-1.5 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg cursor-pointer">
            <i data-lucide="menu" id="menu-icon-state" class="w-5 h-5"></i>
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown Menu -->
      <div id="mobile-dropdown" class="hidden md:hidden absolute left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-5 flex flex-col space-y-4 shadow-xl z-50 transition-colors">
        <a href="#about" class="mobile-nav-link text-sm font-sans font-semibold text-slate-600 dark:text-slate-350 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-between">
          <span>Sobre Mim</span>
          <i data-lucide="chevron-right" class="w-4 h-4 opacity-40"></i>
        </a>
        <a href="#projects" class="mobile-nav-link text-sm font-sans font-semibold text-slate-600 dark:text-slate-350 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-between">
          <span>Projetos</span>
          <i data-lucide="chevron-right" class="w-4 h-4 opacity-40"></i>
        </a>
        ${experiencesHtml ? `
        <a href="#experiences" class="mobile-nav-link text-sm font-sans font-semibold text-slate-600 dark:text-slate-350 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-between">
          <span>Experiências</span>
          <i data-lucide="chevron-right" class="w-4 h-4 opacity-40"></i>
        </a>
        ` : ''}
        <a href="#certificates" class="mobile-nav-link text-sm font-sans font-semibold text-slate-600 dark:text-slate-350 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-between">
          <span>Certificados</span>
          <i data-lucide="chevron-right" class="w-4 h-4 opacity-40"></i>
        </a>
        <a href="#contact" class="mobile-nav-link text-sm font-sans font-semibold text-slate-600 dark:text-slate-350 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-between">
          <span>Contato</span>
          <i data-lucide="chevron-right" class="w-4 h-4 opacity-40"></i>
        </a>
        ${profile.links && profile.links.curriculoPdf ? `
          <a href="${profile.links.curriculoPdf}" target="_blank" class="mobile-nav-link bg-blue-50 dark:bg-blue-950/40 text-blue-605 dark:text-blue-400 text-sm font-sans font-bold py-2.5 px-3.5 rounded-xl flex items-center space-x-2 border border-blue-100 dark:border-blue-900/40 mt-2">
            <i data-lucide="file-down" class="w-4 h-4"></i>
            <span>Baixar Currículo (PDF)</span>
          </a>
        ` : ''}
      </div>
    </header>

    <!-- MAIN VIEWS WRAPPER -->
    <main class="w-full relative bg-dot-pattern">
      <div class="max-w-6xl mx-auto px-4 pb-20">
      <!-- Ambient professional dark bg spots -->
      <div class="hidden dark:block absolute top-[10%] left-1/4 right-1/4 h-[350px] bg-blue-500/8 blur-[100px] rounded-full pointer-events-none -z-10 select-none"></div>
      <div class="hidden dark:block absolute top-[30%] right-10 w-[280px] h-[280px] bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none -z-10 select-none"></div>
      <div class="hidden dark:block absolute top-[60%] left-10 w-[320px] h-[320px] bg-blue-600/4 blur-[90px] rounded-full pointer-events-none -z-10 select-none"></div>
      <div class="hidden dark:block absolute top-[80%] right-20 w-[300px] h-[300px] bg-indigo-600/5 blur-[100px] rounded-full pointer-events-none -z-10 select-none"></div>
      
      <!-- HERO LANDING SECTION (CENTERED, MINIMAL & PROFESSIONAL) -->
      <section id="hero" class="pt-10 pb-16 md:pt-14 md:pb-24 flex flex-col items-center justify-center text-center relative max-w-4xl mx-auto z-10">
        
        <!-- Centered Profile Photo/Avatar -->
        <div class="relative w-28 h-28 md:w-32 md:h-32 mb-6 animate-fade-in select-none group">
          <div class="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 rounded-full scale-110 profile-ring-glow blur-[1px]"></div>
          <div class="absolute inset-0 bg-blue-100 rounded-full scale-105 opacity-30 blur-xs"></div>
          <div class="relative w-full h-full rounded-full shadow-md overflow-hidden bg-transparent">
            <img src="${profile.fotoPerfil}" alt="${profile.nome}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer">
          </div>
        </div>

        <!-- Primary Greeting (Type premium) -->
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight font-sans max-w-3xl mb-3 animate-fade-in" style="animation-delay: 100ms;">
          Olá, eu sou <span class="text-blue-600 dark:text-blue-400">${profile.nome}</span>
        </h1>

        <!-- Subtitles: Software Engineering Student & Java Backend Dev -->
        <div class="flex flex-col space-y-1 mb-6 animate-fade-in" style="animation-delay: 150ms;">
          <p class="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
            Estudante de Engenharia de Software
          </p>
          <p class="text-base sm:text-lg md:text-xl font-semibold text-blue-600/90 dark:text-blue-400 font-mono tracking-tight select-none">
            Desenvolvedor Backend Java
          </p>
        </div>

        <!-- Small Professional Bio Description -->
        <p class="text-sm sm:text-base md:text-lg text-slate-650 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10 font-sans font-normal animate-fade-in" style="animation-delay: 200ms;">
          ${profile.apresentacao}
        </p>

        <!-- Dynamic Responsive Interactive CTAs (Projects, Contact, GitHub) -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto px-4 mb-12 animate-fade-in" style="animation-delay: 250ms;">
          <a href="#projects" class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center space-x-2">
            <span>Ver Projetos</span>
            <i data-lucide="chevron-right" class="w-4 h-4 button-icon-slide"></i>
          </a>
          <a href="#contact" class="w-full sm:w-auto bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-semibold px-7 py-3 rounded-xl transition-all shadow-3xs flex items-center justify-center space-x-2 hover:border-slate-300 dark:hover:border-slate-700">
            <span>Fale Comigo</span>
            <i data-lucide="mail" class="w-4 h-4 text-slate-500 dark:text-slate-400"></i>
          </a>
          <a href="${profile.links.github}" target="_blank" class="w-full sm:w-auto bg-slate-900 dark:bg-slate-950 hover:bg-slate-800 dark:hover:bg-slate-900 text-white dark:text-slate-200 font-semibold px-7 py-3 rounded-xl transition-all shadow-sm flex items-center justify-center space-x-2">
            <i data-lucide="github" class="w-4 h-4"></i>
            <span>GitHub</span>
          </a>
        </div>
        
        <!--Scroll down indicator -->
        <div class="relative mb-12 mt-4 flex flex-col items-center opacity-45 hover:opacity-100 transition-opacity duration-300 pointer-events-none select-none hidden md:flex animate-fade-in" style="animation-delay: 450ms;">
          <span class="text-[11px] uppercase tracking-widest font-mono text-slate-400 dark:text-slate-500 font-bold mb-2">Role para explorar</span>
          
          <div class="w-6 h-10 border border-slate-300 dark:border-slate-700 rounded-full flex justify-center p-1">
            <div class="w-1.5 h-2.5 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"></div>
          </div>
        </div>

        <div class="w-full max-w-xl border-t border-slate-200/80 dark:border-slate-850 pt-14 animate-fade-in-slow select-none mb-4" style="animation-delay: 350ms;">
          <span class="block text-[11px] font-bold text-slate-700 dark:text-white uppercase tracking-widest mb-4">
            Tecnologias Principais
          </span>
          <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-slate-700 dark:text-slate-300 text-sm sm:text-base font-semibold">
            <span class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default">Java</span>
            <span class="text-slate-300 dark:text-slate-700 select-none">•</span>
            <span class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default">Spring Boot</span>
            <span class="text-slate-300 dark:text-slate-700 select-none">•</span>
            <span class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default">PostgreSQL</span>
            <span class="text-slate-300 dark:text-slate-700 select-none">•</span>
            <span class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default">Hibernate</span>
            <span class="text-slate-300 dark:text-slate-700 select-none">•</span>
            <span class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default">REST APIs</span>
          </div>
        </div>

      </section>

      <!-- DYNAMIC STATS COUNTERS -->
      <section id="stats" class="-mt-8 mb-20 py-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl grid grid-cols-2 md:grid-cols-4 gap-6 px-6 shadow-xs relative scroll-reveal">       
        <div class="flex flex-col items-center text-center p-3">
          <div class="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 flex items-center justify-center mb-3 text-blue-600 dark:text-blue-450">
            <i data-lucide="code" class="w-5 h-5"></i>
          </div>
          <span class="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white font-sans stat-count block" id="proj-stat-num" data-val="${stats.projects || 0}">0</span>
          <span class="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider mt-1.5 font-sans">Projetos Executados</span>
        </div>

        <div class="flex flex-col items-center text-center p-3 border-t md:border-t-0 border-slate-100 dark:border-slate-800 md:border-l">
          <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 flex items-center justify-center mb-3 text-indigo-600 dark:text-indigo-400">
            <i data-lucide="award" class="w-5 h-5"></i>
          </div>
          <span class="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white font-sans stat-count block" id="cert-stat-num" data-val="${stats.certificates || 0}">0</span>
          <span class="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider mt-1.5 font-sans">Certificados TI</span>
        </div>

        <div class="flex flex-col items-center text-center p-3 border-t md:border-t-0 border-l border-slate-100 dark:border-slate-800 md:border-l">
          <div class="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/40 flex items-center justify-center mb-3 text-purple-600 dark:text-purple-400">
            <i data-lucide="cpu" class="w-5 h-5"></i>
          </div>
          <span class="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white font-sans stat-count block" id="tech-stat-num" data-val="${stats.technologies || 0}">0</span>
          <span class="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider mt-1.5 font-sans">Linguagens & Techs</span>
        </div>

        <div class="flex flex-col items-center text-center p-3 border-t md:border-t-0 border-l border-slate-100 dark:border-slate-800 md:border-l">
          <div class="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-transparent flex items-center justify-center mb-3 text-slate-600 dark:text-slate-400">
            <i data-lucide="github" class="w-5 h-5"></i>
          </div>
          <span class="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white font-sans stat-count block" id="commits-stat-num" data-val="${stats.githubCommits || 1450}">0</span>
          <span class="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider mt-1.5 font-sans">Commits no GitHub</span>
        </div>
      </section>

      <!-- SOBRE MIM SECTION -->
      <section id="about" class="py-16 border-t border-slate-200/85 dark:border-slate-800/85 scroll-reveal">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-10">
          
        <div class="md:col-span-5 flex flex-col items-center justify-start md:pt-4 mt-21 md:mt-25">            <!-- Profile Avatar with subtle backing card -->
            <div class="relative w-48 h-48 md:w-56 md:h-56 select-none">
              <div class="absolute inset-0 bg-blue-800 dark:bg-blue-955/20 border border-blue-100 dark:border-blue-900/40 rounded-3xl rotate-3 shadow-3xs animate-float-slow"></div>
              <div class="absolute inset-0 bg-transparent dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img src="${profile.fotoSobre || profile.fotoPerfil}" alt="${profile.nome}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" id="avatar-img-view">
              </div>
              <div class="absolute -bottom-2 -right-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-1.5 rounded-full flex items-center space-x-1.5 shadow-sm">
                <div class="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse"></div>
                <span class="text-[11px] font-sans font-bold text-slate-700 dark:text-slate-200">Java Core Level</span>
              </div>
            </div>
          </div>

          <div class="md:col-span-7 flex flex-col justify-center space-y-6">
            <h2 class="text-2xl md:text-3xl font-bold font-sans tracking-tight text-slate-900 dark:text-white flex items-center space-x-2">
              <span class="text-blue-600">#</span>
              <span>Sobre Mim</span>
            </h2>

            <p class="text-slate-650 dark:text-slate-300 font-sans leading-relaxed text-justify text-sm md:text-base font-normal">
              ${profile.bio}
            </p>

            <div class="space-y-4 pt-2">
              <!-- Formacao Academica Grid -->
              <div class="space-y-4 pt-2">
              <!-- Formacao Academica Grid -->
              <div class="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <h4 class="text-xs font-bold font-sans uppercase tracking-widest text-slate-900 dark:text-slate-100 mb-3.5 flex items-center space-x-1.5 select-none">
                  <i data-lucide="graduation-cap" class="w-4 h-4 text-blue-600"></i>
                  <span>Formação Acadêmica</span>
                </h4>
                <div class="space-y-3">
                  ${academicsHtml}
                </div>
              </div>

              <!-- Idiomas e Fluencia Grid -->
              ${idiomasHtml ? `
              <div class="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <h4 class="text-xs font-bold font-sans uppercase tracking-widest text-slate-900 dark:text-slate-100 mb-3.5 flex items-center space-x-1.5 select-none">
                  <i data-lucide="languages" class="w-4 h-4 text-blue-600"></i>
                  <span>Idiomas & Fluência</span>
                </h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  ${idiomasHtml}
                </div>
              </div>
              ` : ''}

              <!-- Dominadas Grid -->
              <div class="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <h4 class="text-xs font-bold font-sans uppercase tracking-widest text-slate-900 dark:text-white mb-3 flex items-center space-x-1.5 select-none">
                  <i data-lucide="check-check" class="w-4 h-4 text-blue-600"></i>
                  <span>Frameworks & Tecnologias Dominadas</span>
                </h4>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  ${techDominadasHtml}
                </div>
              </div>
            </div>

          </div>

          </div>

        </div>
      </section>
      <section id="projects" class="py-16 border-t border-slate-200/85 dark:border-slate-800/85 scroll-reveal overflow-hidden">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
          <div>
            <h2 class="text-2xl md:text-3xl font-bold font-sans tracking-tight text-slate-900 dark:text-white flex items-center space-x-2">
              <span class="text-blue-600">#</span>
              <span>Projetos em Destaque</span>
            </h2>
            <p class="text-xs font-sans text-slate-550 dark:text-slate-400 mt-1">Carregando APIs e repositórios dinamicamente via Java REST endpoints imitados</p>
          </div>
          <div class="flex items-center space-x-3 select-none shrink-0">
            <span class="text-xs font-sans font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-2 rounded-xl inline-flex items-center space-x-1.5 shadow-3xs">
              <i data-lucide="database" class="w-3.5 h-3.5 text-blue-600 dark:text-blue-400"></i>
              <span>Banco: Ativo</span>
            </span>
          </div>
        </div>

        <div class="w-full py-1">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            ${projectsHtml}
          </div>
        </div>
      </section>

      ${experiencesHtml ? `
      <!-- PORTFOLIO EXPERIENCES SECTION -->
      <section id="experiences" class="py-16 border-t border-slate-200/85 dark:border-slate-800/85 scroll-reveal">
        <div class="mb-10">
          <h2 class="text-2xl md:text-3xl font-bold font-sans tracking-tight text-slate-900 dark:text-white flex items-center space-x-2">
            <span class="text-blue-600">#</span>
            <span>Experiências Profissionais</span>
          </h2>
          <p class="text-xs font-sans text-slate-550 dark:text-slate-400 mt-1">Trajetória prática, atuações profissionais e resolução de problemas corporativos reais de engenharia de software</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${experiencesHtml}
        </div>
      </section>
      ` : ''}

      <!-- CERTIFICATES SECTION -->
      <section id="certificates" class="py-16 border-t border-slate-200/85 dark:border-slate-800/85 scroll-reveal overflow-hidden">
        <div class="flex items-center justify-between mb-10 gap-4">
          <div>
            <h2 class="text-2xl md:text-3xl font-bold font-sans tracking-tight text-slate-900 dark:text-white flex items-center space-x-2">
              <span class="text-blue-600">#</span>
              <span>Certificados & Credenciais</span>
            </h2>
            <p class="text-xs font-sans text-slate-550 dark:text-slate-400 mt-1">Validações oficiais e especializações completadas para engenharia de softwares backend</p>
          </div>
        </div>

        ${hasCertificates ? `
          <div class="flex flex-col space-y-6">
            <!-- Row 1 -->
            <div class="relative overflow-visible w-full py-1">
              <div id="certificates-carousel-track" class="flex gap-6">
                ${certificatesHtml1}
              </div>
            </div>

            <!-- Row 2 -->
            <div class="relative overflow-visible w-full py-1">
              <div id="certificates-carousel-track-2" class="flex gap-6">
                ${certificatesHtml2}
              </div>
            </div>
          </div>
        ` : `
          ${emptyCertificatesHtml}
        `}
        <!-- Carousel Control Buttons under the Certificates track, bottom right -->
        <div class="flex justify-end items-center space-x-3 mt-8 select-none">
          <button id="certificates-prev-btn" class="px-4.5 py-2.5 cursor-pointer rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-sans font-bold text-xs hover:scale-103 active:scale-97 transition-all flex items-center space-x-2 shadow-md shadow-blue-500/20 dark:shadow-blue-900/30 ring-4 ring-blue-500/10 hover:ring-blue-500/25 group/prev" title="Ver anterior">
            <i data-lucide="chevron-left" class="w-4 h-4 transition-transform duration-300 group-hover/prev:-translate-x-0.5"></i>
            <span>Ver Anterior</span>
          </button>
          <button id="certificates-next-btn" class="px-4.5 py-2.5 cursor-pointer rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-sans font-bold text-xs hover:scale-103 active:scale-97 transition-all flex items-center space-x-2 shadow-md shadow-blue-500/20 dark:shadow-blue-900/30 ring-4 ring-blue-500/10 hover:ring-blue-500/25 group/next" title="Ver próximo">
            <span>Ver Próximo</span>
            <i data-lucide="chevron-right" class="w-4 h-4 transition-transform duration-300 group-hover/next:translate-x-0.5"></i>
          </button>
        </div>
      </section>

      <!-- CONTACT SECTION -->
      <section id="contact" class="py-16 border-t border-slate-200/85 dark:border-slate-800/85 scroll-reveal">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-10 items-stretch">
          
          <!-- Contact coordinates info -->
          <div class="md:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <h2 class="text-2xl md:text-3xl font-bold font-sans tracking-tight text-slate-900 dark:text-white flex items-center space-x-2">
                <span class="text-blue-600">#</span>
                <span>Contato</span>
              </h2>
              <p class="text-slate-550 dark:text-slate-300 text-sm mt-3 leading-relaxed">
                Quer discutir algum projeto backend, arquitetura ou tem alguma proposta de oportunidade de estágio, acadêmica ou profissional?<br>Use os canais abaixo ou envie uma mensagem direta através do formulário!
              </p>
            </div>

            <div class="space-y-4 font-sans text-xs">
              
              <!-- Linkedin -->
              <a href="${profile.links.linkedin}" target="_blank" id="contact-linkedin-link" class="flex items-center space-x-4 p-4 bg-blue-50/50 dark:bg-blue-950/20 hover:bg-blue-100/80 dark:hover:bg-blue-900/40 border border-blue-200/65 dark:border-blue-900/60 hover:border-blue-400 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-2xs active:scale-[0.99] group/btn text-blue-700 dark:text-blue-400 font-bold decoration-none">
                <div class="w-9 h-9 rounded-xl bg-blue-600 border border-blue-700 flex items-center justify-center text-white select-none transition-transform duration-300 group-hover/btn:scale-105 shadow-3xs">
                  <i data-lucide="linkedin" class="w-4 h-4"></i>
                </div>
                <div>
                  <span class="text-xs font-sans font-bold tracking-wide text-blue-800 dark:text-blue-300">Linkedin</span>
                </div>
              </a>

              <!-- Email -->
              <a href="mailto:${profile.links.email || 'thgbianna@gmail.com'}" id="contact-email-link" class="flex items-center space-x-4 p-4 bg-sky-50/50 dark:bg-sky-950/20 hover:bg-sky-100/80 dark:hover:bg-sky-900/40 border border-sky-200/65 dark:border-sky-900/60 hover:border-sky-450 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-2xs active:scale-[0.99] group/btn text-sky-700 dark:text-sky-400 font-bold decoration-none">
                <div class="w-9 h-9 rounded-xl bg-sky-600 border border-sky-700 flex items-center justify-center text-white select-none transition-transform duration-300 group-hover/btn:scale-105 shadow-3xs">
                  <i data-lucide="mail" class="w-4 h-4"></i>
                </div>
                <div>
                  <span class="text-xs font-sans font-bold tracking-wide text-sky-800 dark:text-sky-300">E-mail</span>
                </div>
              </a>

              <!-- Instagram -->
              <a href="${profile.links.instagram || 'https://instagram.com/hutzdon/'}" target="_blank" id="contact-instagram-link" class="flex items-center space-x-4 p-4 bg-transparent dark:bg-transparent hover:bg-pink-100/80 dark:hover:bg-pink-900/40 border border-pink-200/65 dark:border-pink-900/60 hover:border-pink-400 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-2xs active:scale-[0.99] group/btn text-pink-700 dark:text-pink-400 font-bold decoration-none">
                <div class="w-9 h-9 rounded-xl bg-pink-600 border border-pink-700 flex items-center justify-center text-white select-none transition-transform duration-300 group-hover/btn:scale-105 shadow-3xs">
                  <i data-lucide="instagram" class="w-4 h-4"></i>
                </div>
                <div>
                  <span class="text-xs font-sans font-bold tracking-wide text-pink-800 dark:text-pink-300">Instagram</span>
                </div>
              </a>

              <!-- WhatsApp -->
              <a href="${profile.links.whatsapp}" target="_blank" id="contact-whatsapp-link" class="flex items-center space-x-4 p-4 bg-emerald-50/50 dark:bg-emerald-950/20 hover:bg-emerald-100/80 dark:hover:bg-emerald-900/40 border border-emerald-200/65 dark:border-emerald-900/60 hover:border-emerald-450 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-2xs active:scale-[0.99] group/btn text-emerald-700 dark:text-emerald-400 font-bold decoration-none">
                <div class="w-9 h-9 rounded-xl bg-emerald-600 border border-emerald-700 flex items-center justify-center text-white select-none transition-transform duration-300 group-hover/btn:scale-105 shadow-3xs">
                  <svg class="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <span class="text-xs font-sans font-bold tracking-wide text-emerald-800 dark:text-emerald-300">WhatsApp</span>
                </div>
              </a>

            </div>

            <div class="text-[10px] text-slate-400 dark:text-slate-500 font-sans select-none">
            </div>
          </div>

          <!-- HTML Contact Form -->
          <div class="md:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xs">
            <h3 class="text-lg font-semibold font-sans text-slate-800 dark:text-slate-100 mb-6 flex items-center space-x-3 select-none">
              <span>Vamos trabalhar juntos?</span>
              <i data-lucide="send" class="w-5 h-5 text-blue-600"></i>
            </h3>

            <form id="portfolio-contact-form" class="space-y-4 text-sm">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="flex flex-col">
                  <label for="contact-name" class="font-sans text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold mb-1.5 select-none">Nome completo</label>
                  <input type="text" id="contact-name" required placeholder="Seu Nome" class="bg-white dark:bg-slate-950 border border-slate-200 dark:border-transparent hover:border-slate-300 dark:hover:border-slate-705 focus:border-blue-600 dark:focus:border-blue-500 rounded-xl px-4 py-3.5 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none transition-all font-sans">
                </div>
                <div class="flex flex-col">
                  <label for="contact-email" class="font-sans text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold mb-1.5 select-none">Seu E-mail</label>
                  <input type="email" id="contact-email" required placeholder="seu@email.com" class="bg-white dark:bg-slate-950 border border-slate-200 dark:border-transparent hover:border-slate-300 dark:hover:border-slate-705 focus:border-blue-600 dark:focus:border-blue-500 rounded-xl px-4 py-3.5 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none transition-all font-sans">
                </div>
              </div>

              <div class="flex flex-col">
                <label for="contact-subject" class="font-sans text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold mb-1.5 select-none">Assunto</label>
                <input type="text" id="contact-subject" required placeholder="Ex: Proposta de Estágio / Oportunidades" class="bg-white dark:bg-slate-950 border border-slate-200 dark:border-transparent hover:border-slate-300 dark:hover:border-slate-705 focus:border-blue-600 dark:focus:border-blue-500 rounded-xl px-4 py-3.5 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none transition-all font-sans">
              </div>

              <div class="flex flex-col">
                <label for="contact-message" class="font-sans text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold mb-1.5 select-none">Mensagem</label>
                <textarea id="contact-message" rows="4" required placeholder="Escreva sua proposta ou mensagem detalhada aqui..." class="bg-white dark:bg-slate-950 border border-slate-200 dark:border-transparent hover:border-slate-300 dark:hover:border-slate-705 focus:border-blue-600 dark:focus:border-blue-500 rounded-xl px-4 py-3.5 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none transition-all font-sans resize-none"></textarea>
              </div>

              <button type="submit" id="contact-submit-btn" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm shadow-blue-200">
                <span>Enviar</span>
              </button>
            </form>
          </div>

        </div>
      </section>

      </div>
    </main>

    <!-- FOOTER -->
    <footer class="relative z-50 w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-12 text-center font-sans text-xs text-slate-550 dark:text-slate-400">
      <div class="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="select-none">© 2026 Thiago Bianna Pessanha da Cruz.\n Todos os direitos reservados.</p>
        
        <div class="flex items-center space-x-4 relative z-50">
          <!-- LinkedIn -->
          <a href="https://www.linkedin.com/in/thiagobpcruz/" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-blue-600 transition-colors block p-2" title="LinkedIn" style="cursor: pointer !important;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>

          <!-- GitHub -->
          <a href="https://github.com/ThiagoBianna" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors block p-2" title="GitHub" style="cursor: pointer !important;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </a>

          <!-- Instagram -->
          <a href="https://www.instagram.com/hutzdon/" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-pink-600 transition-colors block p-2" title="Instagram" style="cursor: pointer !important;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>

          <!-- WhatsApp -->
          <a href="https://wa.me/5521999425820" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-green-500 transition-colors block p-2" title="WhatsApp" style="cursor: pointer !important;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </a>

          <!-- E-mail -->
          <a href="mailto:thgbianna@gmail.com" class="text-slate-400 hover:text-red-500 transition-colors block p-2" title="Enviar E-mail" style="cursor: pointer !important;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </a>
        </div>
      </div>
    </footer>


    <!-- MODAL FOR CERTIFICATE ZOOM -->
    <div id="cert-zoom-modal" class="hidden fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden max-w-2xl w-full relative shadow-2xl animate-fade-in">
        <div class="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-850">
          <h3 id="cert-modal-title" class="text-sm font-semibold text-slate-800 dark:text-white font-sans">Visualizar Certificado</h3>
          <button id="close-modal-btn" class="text-slate-400 hover:text-slate-600 focus:outline-none p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all dark:text-slate-400 dark:hover:text-slate-200">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>
        <div id="cert-image-container" class="p-3 bg-slate-50 dark:bg-slate-950 flex items-center justify-center aspect-video relative group overflow-hidden select-none">
          <img id="cert-modal-img" src="" alt="" class="max-h-96 max-w-full object-contain rounded-lg shadow-xs" referrerPolicy="no-referrer">
          <!-- Floating Full Screen Button for Certificate -->
          <button type="button" id="cert-fullscreen-btn" class="absolute bottom-3 right-3 bg-black/75 hover:bg-black/95 text-white active:scale-95 p-2 rounded-lg transition-all focus:outline-none flex items-center justify-center cursor-pointer shadow-xs" title="Visualizar em Tela Cheia">
            <i data-lucide="maximize-2" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    </div>


    <!-- MODAL FOR DETAILED PROJECT DEMONSTRATION PLAYER -->
    <div id="video-demo-modal" class="hidden fixed inset-0 bg-slate-950/75 backdrop-blur-md flex items-center justify-center z-50 p-4 select-none animate-fade-in">
      <div class="bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-3xl overflow-hidden max-w-2xl w-full relative shadow-2xl transform transition-all duration-300">
        <div class="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-850">
          <div>
            <h3 class="text-sm font-bold text-slate-900 dark:text-white font-sans flex items-center space-x-1.5">
              <i data-lucide="monitor" class="w-4 h-4 text-blue-600"></i>
              <span id="video-modal-label">Demonstração Completa</span>
            </h3>
            <p class="text-[9px] font-sans font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Conexão REST: JPA streaming source active</p>
          </div>
          <button id="close-video-modal-btn" class="text-slate-400 hover:text-slate-600 focus:outline-none p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all dark:text-slate-400 dark:hover:text-slate-200">
            <i data-lucide="x" class="w-4.5 h-4.5"></i>
          </button>
        </div>
        
        <div class="bg-slate-950 aspect-video flex items-center justify-center relative shadow-inner overflow-hidden" id="video-modal-player-container">
          <!-- Rendered Video Player elements go here -->
        </div>

        <div class="p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
          <h4 class="text-sm font-bold text-slate-900 dark:text-white font-sans" id="video-modal-proj-name">Project details</h4>
          <p class="text-xs text-slate-550 dark:text-slate-350 mt-1.5 leading-relaxed font-sans text-justify" id="video-modal-proj-desc">Detailed descriptions</p>
        </div>
      </div>
    </div>


    <!-- MODAL FOR DETAILED PROJECT GALLERY / CAROUSEL -->
    <div id="project-gallery-modal" class="hidden fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4 select-none animate-fade-in">
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden max-w-xl w-full relative shadow-2xl transform transition-all duration-300 flex flex-col">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-850">
          <div>
            <h3 class="text-sm font-bold text-slate-900 dark:text-white font-sans flex items-center space-x-1.5">
              <i data-lucide="images" class="w-4.5 h-4.5 text-blue-600 dark:text-blue-450"></i>
              <span id="gallery-modal-proj-name">Galeria do Projeto</span>
            </h3>
            <p class="text-[9px] font-sans font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Explorador de Imagens (Até 5 fotos)</p>
          </div>
          <button id="close-gallery-modal-btn" class="text-slate-400 hover:text-slate-600 focus:outline-none p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all dark:text-slate-450 dark:hover:text-slate-200">
            <i data-lucide="x" class="w-4.5 h-4.5"></i>
          </button>
        </div>

        <!-- Main Image Display Container -->
        <div id="gallery-media-container" class="bg-slate-950 flex items-center justify-center relative aspect-video overflow-hidden group select-none w-full">
          <img id="gallery-modal-main-img" src="" alt="Projeto" class="max-h-96 max-w-full object-contain transition-all duration-350 select-none pointer-events-none" referrerPolicy="no-referrer">
          
          <!-- Navigation Arrow: Previous -->
          <button type="button" id="gallery-prev-btn" class="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-all focus:outline-none flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer">
            <i data-lucide="chevron-left" class="w-5 h-5"></i>
          </button>
          
          <!-- Navigation Arrow: Next -->
          <button type="button" id="gallery-next-btn" class="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-all focus:outline-none flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer">
            <i data-lucide="chevron-right" class="w-5 h-5"></i>
          </button>

          <!-- Floating Counter (Hidden as requested) -->
          <div class="hidden absolute bottom-3 left-3 bg-black/75 px-2.5 py-1 rounded-lg text-[10px] text-white font-sans font-bold shadow-xs">
            <span id="gallery-current-idx">1</span> / <span id="gallery-total-count">1</span>
          </div>

          <!-- Floating Full Screen Button -->
          <button type="button" id="gallery-fullscreen-btn" class="absolute bottom-3 right-3 bg-black/75 hover:bg-black/95 text-white active:scale-95 p-2 rounded-lg transition-all focus:outline-none flex items-center justify-center cursor-pointer shadow-xs" title="Visualizar em Tela Cheia">
            <i data-lucide="maximize-2" class="w-4 h-4"></i>
          </button>
        </div>

        <!-- Thumbnail Selector List Area -->
        <div class="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-850 flex flex-col items-center justify-center">
          <div id="gallery-thumbnails-container" class="flex items-center justify-center space-x-2 overflow-x-auto py-1 max-w-full">
            <!-- Miniature item buttons will be injected on project load -->
          </div>
        </div>
      </div>
    </div>


    <!-- MODAL FOR DETAILED PROJECT DESCRIPTION -->
    <div id="project-desc-modal" class="hidden fixed inset-0 bg-slate-950/75 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden max-w-xl w-full relative shadow-2xl transform transition-all duration-300 flex flex-col scale-95 md:scale-100">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-850">
          <div>
            <h3 class="text-xs md:text-sm font-bold text-slate-900 dark:text-white font-sans flex items-center space-x-1.5">
              <i data-lucide="file-text" class="w-4.5 h-4.5 text-blue-600 dark:text-blue-400"></i>
              <span id="desc-modal-proj-name">Detalhes do Projeto</span>
            </h3>
            <p class="text-[9px] font-sans font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Descrição Completa</p>
          </div>
          <button id="close-desc-modal-btn" class="text-slate-400 hover:text-slate-600 focus:outline-none p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer dark:text-slate-400 dark:hover:text-slate-200">
            <i data-lucide="x" class="w-4.5 h-4.5"></i>
          </button>
        </div>

        <!-- Scrollable Description text -->
        <div class="p-6 overflow-y-auto max-h-[50vh] text-xs md:text-sm text-slate-650 dark:text-slate-350 leading-relaxed text-justify font-sans whitespace-pre-wrap select-text" id="desc-modal-proj-text">
          <!-- Text will be dynamically injected here -->
        </div>

        <!-- Modal Footer -->
        <div class="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-850 flex justify-end">
          <button id="close-desc-modal-btn-bottom" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-all cursor-pointer">
            Fechar
          </button>
        </div>
      </div>
    </div>


    <!-- REAL-TIME SUCCESS FORM TOAST (LIGHT STYLING) -->
    <div id="contact-toast" class="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 transform translate-y-12 opacity-0 pointer-events-none shrink bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-805 dark:text-slate-200 p-5 rounded-2xl shadow-2xl transition-all duration-300 z-50 max-w-sm flex items-start space-x-3.5">
      <div class="bg-blue-50 dark:bg-blue-950/40 border border-blue-105 dark:border-blue-900/40 text-blue-600 dark:text-blue-400 p-2 rounded-xl shrink-0">
        <i data-lucide="mail-check" class="w-5 h-5"></i>
      </div>
      <div>
        <h4 class="text-xs font-bold font-sans text-slate-900">REST Status - 200 OK</h4>
        <p class="text-xs text-slate-550 mt-1 leading-relaxed" id="toast-message-body">Solicitação enviada! Verifique os logs e console do Spring Boot.</p>
      </div>
    </div>
  `;
}

// FORMAT DATE UTILITIES
function formatDate(dateStr) {
  if (!dateStr) return "";
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  } catch (e) {
    return dateStr;
  }
}

function formatDateMonthYear(dateStr) {
  if (!dateStr) return "";
  try {
    const monthsPt = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    // accepts yyyy-mm-dd or yyyy-mm
    const parts = dateStr.split('-');
    if (parts.length >= 2) {
      const year = parts[0];
      const monthIdx = parseInt(parts[1], 10) - 1;
      if (monthIdx >= 0 && monthIdx < 12) {
        return `${monthsPt[monthIdx]} de ${year}`;
      }
    }
    return dateStr;
  } catch (e) {
    return dateStr;
  }
}

// BIND RECURSIVE Lifecycles / Event Listeners for DOM elements
export function initPortfolio() {
  // 0. Smooth scrolling for headline navigation links (Desktop & Mobile)
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link) {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && !href.startsWith('#/')) {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Update visual hash without triggering router rebuild
          history.pushState(null, null, href);
        }
      }
    }
  });

  // 1. Mobile Menu toggles
  const menuBtn = document.getElementById('mobile-menu-btn');
  const dropdown = document.getElementById('mobile-dropdown');
  const menuIcon = document.getElementById('menu-icon-state');

  if (menuBtn && dropdown) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('hidden');
      if (dropdown.classList.contains('hidden')) {
        menuIcon.setAttribute('data-lucide', 'menu');
      } else {
        menuIcon.setAttribute('data-lucide', 'x');
      }
      if (window.lucide) window.lucide.createIcons();
    });

    // Close on any click inside mobile nav links
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        dropdown.classList.add('hidden');
        menuIcon.setAttribute('data-lucide', 'menu');
        if (window.lucide) window.lucide.createIcons();
      });
    });

    // Close on click outside
    document.addEventListener('click', () => {
      dropdown.classList.add('hidden');
      if (menuIcon) {
        menuIcon.setAttribute('data-lucide', 'menu');
        if (window.lucide) window.lucide.createIcons();
      }
    });
  }

  // 2. Certificate Image Zoom Modals
  const triggs = document.querySelectorAll('.cert-image-trigger');
  const modal = document.getElementById('cert-zoom-modal');
  const modalImg = document.getElementById('cert-modal-img');
  const modalTitle = document.getElementById('cert-modal-title');
  const closeBtn = document.getElementById('close-modal-btn');
  const certFullscreenBtn = document.getElementById('cert-fullscreen-btn');
  const certImageContainer = document.getElementById('cert-image-container');

  if (modal && modalImg && modalTitle) {
    // Event delegation to support both original and cloned elements
    document.addEventListener('click', (e) => {
      const t = e.target.closest('.cert-image-trigger');
      if (t) {
        const url = t.getAttribute('data-img-url');
        const title = t.getAttribute('data-title');
        modalImg.src = url;
        modalTitle.textContent = title;
        modal.classList.remove('hidden');
      }
    });

    const hideModal = () => {
      if (document.fullscreenElement === certImageContainer) {
        if (document.exitFullscreen) document.exitFullscreen();
      }
      modal.classList.add('hidden');
    };
    
    if (closeBtn) closeBtn.addEventListener('click', hideModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) hideModal();
    });

    if (certFullscreenBtn && certImageContainer) {
      certFullscreenBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (document.fullscreenElement === certImageContainer) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        } else {
          try {
            if (certImageContainer.requestFullscreen) {
              certImageContainer.requestFullscreen();
            } else if (certImageContainer.webkitRequestFullscreen) {
              certImageContainer.webkitRequestFullscreen();
            } else if (certImageContainer.msRequestFullscreen) {
              certImageContainer.msRequestFullscreen();
            } else {
              window.open(modalImg.src, '_blank');
            }
          } catch (err) {
            console.warn("Fullscreen permission or support failed. Displaying image directly in a tab.", err);
            window.open(modalImg.src, '_blank');
          }
        }
      });
    }

    document.addEventListener('fullscreenchange', () => {
      if (document.fullscreenElement === certImageContainer) {
        modalImg.classList.add('h-screen', 'max-h-screen', 'w-screen', 'max-w-screen', 'p-4');
        modalImg.classList.remove('max-h-96');
      } else {
        modalImg.classList.remove('h-screen', 'max-h-screen', 'w-screen', 'max-w-screen', 'p-4');
        modalImg.classList.add('max-h-96');
      }
    });
  }

  // 3. Form submission simulations and Toast messages
  const form = document.getElementById('portfolio-contact-form');
  const toast = document.getElementById('contact-toast');
  const toastBody = document.getElementById('toast-message-body');
  const submitBtn = document.getElementById('contact-submit-btn');

  if (form && toast) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const subject = document.getElementById('contact-subject').value;
      const message = document.getElementById('contact-message').value;

      // Lock button to express sending simulation
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        <span>Enviando...</span>
      `;

      // Simulates real posting delay
      await new Promise(r => setTimeout(r, 1200));

      // Trigger actual mailto client with pre-filled inputs
      const emailBody = `Olá, Thiago.\n\nVocê recebeu uma nova mensagem pelo formulário de contato do seu Portfólio.\n\n` + 
                        `Nome: ${name}\n` +
                        `E-mail: ${email}\n` +
                        `Assunto: ${subject}\n\n` +
                        `Mensagem:\n${message}\n\n---\nPayload JSON:\n` +
                        `{ "nome": "${name}", "email": "${email}", "assunto": "${subject}", "mensagem": "${message}" }`;
      
      const mailtoUrl = `mailto:thgbianna@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoUrl;

      // Trigger Spring Boot fake logs in browser console!
      const time = new Date().toISOString().replace('T', ' ').substring(0, 19);
      console.log(
        `%c${time}  INFO 2841 --- [io-8080-exec-12] c.p.controller.ContactController        : %cPOST /api/contact - Received submission from ${email}`,
        "color: #858585;",
        "color: #2563eb; font-weight: bold;"
      );
      console.log(`%c[Request Payload]%c { "nome": "${name}", "email": "${email}", "assunto": "${subject}", "mensagem": "${message}" }`, "color: #3b82f6; font-weight: bold;", "color: #0f172a;");
      console.log(`%c[Response Status]%c 200 OK - { "status": "success", "message": "Feedback received!" }`, "color: #10b981; font-weight: bold;", "color: #0f172a;");

      // Reset Form fields
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <i data-lucide="send" class="w-4 h-4"></i>
        <span>Enviar Mensagem</span>
      `;
      if (window.lucide) window.lucide.createIcons();

      // Trigger visual toast
      toastBody.innerHTML = `Olá <strong>${name}</strong>, sua mensagem sobre <em>"${subject}"</em> foi transmitida com sucesso para a API do Spring Boot!`;
      toast.classList.remove('translate-y-12', 'opacity-0', 'pointer-events-none');
      toast.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');

      // Hide Toast after duration
      setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
        toast.classList.add('translate-y-12', 'opacity-0', 'pointer-events-none');
      }, 5500);

    });
  }

  // 4. Central updateStats function and smooth Counter Animation using requestAnimationFrame
  const animateValue = (id, start, end, duration) => {
    const obj = document.getElementById(id);
    if (!obj) return;
    
    obj.setAttribute('data-val', end);
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const val = Math.floor(progress * (end - start) + start);
      obj.innerText = val;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        obj.innerText = end;
      }
    };
    window.requestAnimationFrame(step);
  };

  // Define global updater
  window.updateStats = async function() {
    try {
      const stats = await api.getStats();
      const duration = 1200; // smooth 1.2 seconds animation count

      const pElem = document.getElementById('proj-stat-num');
      const cElem = document.getElementById('cert-stat-num');
      const tElem = document.getElementById('tech-stat-num');
      const gElem = document.getElementById('commits-stat-num');

      if (pElem) animateValue('proj-stat-num', parseInt(pElem.innerText, 10) || 0, stats.projects || 0, duration);
      if (cElem) animateValue('cert-stat-num', parseInt(cElem.innerText, 10) || 0, stats.certificates || 0, duration);
      if (tElem) animateValue('tech-stat-num', parseInt(tElem.innerText, 10) || 0, stats.technologies || 0, duration);
      if (gElem) animateValue('commits-stat-num', parseInt(gElem.innerText, 10) || 0, stats.githubCommits || 1450, duration);
      return stats;
    } catch (e) {
      console.error("Global updateStats execution failed:", e);
    }
  };

  const statsSection = document.getElementById('stats');
  if (statsSection) {
    // Trigger first-load animation via intersection observer
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          window.updateStats();
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(statsSection);
  }

  // 5. Autoplay preview videos on hover (Desktop) and touch (Mobile) with passive performance binds
  const projectsCards = document.querySelectorAll('.premium-card');
  projectsCards.forEach(card => {
    const video = card.querySelector('.project-preview-video');
    if (!video) return;

    // Desktop hover play states
    card.addEventListener('mouseenter', () => {
      video.classList.remove('opacity-0');
      video.classList.add('opacity-100');
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn("Autoplay was prevented by browser sandbox rules:", error);
        });
      }
    });

    card.addEventListener('mouseleave', () => {
      video.classList.remove('opacity-100');
      video.classList.add('opacity-0');
      video.pause();
    });

    // Mobile / Touch handling for starting loop silently
    card.addEventListener('touchstart', () => {
      // Pause all other preview videos
      document.querySelectorAll('.project-preview-video').forEach(v => {
        if (v !== video) {
          v.classList.remove('opacity-100');
          v.classList.add('opacity-0');
          v.pause();
        }
      });

      if (video.paused) {
        video.classList.remove('opacity-0');
        video.classList.add('opacity-100');
        video.play().catch(e => console.warn("Touch autoplay prevented", e));
      } else {
        video.classList.remove('opacity-100');
        video.classList.add('opacity-0');
        video.pause();
      }
    }, { passive: true });
  });

  // 6. Complete Video Demo Modal loader
  const fullDemoButtons = document.querySelectorAll('.open-full-demo-btn');
  const dVideoModal = document.getElementById('video-demo-modal');
  const dPlayerContainer = document.getElementById('video-modal-player-container');
  const dModalProjName = document.getElementById('video-modal-proj-name');
  const dModalProjDesc = document.getElementById('video-modal-proj-desc');
  const dCloseVideoBtn = document.getElementById('close-video-modal-btn');

  // Helper to parse YouTube embedded Links starting muted
  function getYouTubeEmbedUrl(url) {
    if (!url) return "";
    let videoId = "";
    try {
      if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1].split(/[?#]/)[0];
      } else if (url.includes("youtube.com/watch")) {
        const urlParams = new URLSearchParams(url.split('?')[1]);
        videoId = urlParams.get('v');
      } else if (url.includes("youtube.com/embed/")) {
        videoId = url.split("youtube.com/embed/")[1].split(/[?#]/)[0];
      }
    } catch (e) {
      console.error("Youtube parsing error", e);
    }
    // Added mute=1 so that it starts with absolutely no volume
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&muted=1` : url;
  }

  if (dVideoModal && dPlayerContainer) {
    fullDemoButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const url = btn.getAttribute('data-video-url');
        const name = btn.getAttribute('data-proj-name');
        const desc = btn.getAttribute('data-video-desc');

        dModalProjName.textContent = name;
        dModalProjDesc.textContent = desc;

        if (!url) {
          dPlayerContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center p-8 text-center text-slate-400 font-sans">
              <i data-lucide="video-off" class="w-10 h-10 mb-2 opacity-50"></i>
              <p class="text-xs font-semibold">Nenhum vídeo cadastrado.</p>
              <p class="text-[10px] text-slate-400 mt-1">Insira uma URL de vídeo completa no Console Admin.</p>
            </div>
          `;
        } else if (url.includes("youtube.com") || url.includes("youtu.be")) {
          const embedUrl = getYouTubeEmbedUrl(url);
          dPlayerContainer.innerHTML = `
            <iframe src="${embedUrl}" class="w-full h-full border-0 absolute inset-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          `;
        } else {
          // Play high fidelity direct loop mp4 completely muted/silent
          dPlayerContainer.innerHTML = `
            <video id="native-demo-modal-player" src="${url}" class="w-full h-full object-contain bg-black shadow-inner" controls autoplay playsinline muted></video>
          `;
          const nativePlayer = dPlayerContainer.querySelector("#native-demo-modal-player");
          if (nativePlayer) {
            nativePlayer.volume = 0;
            nativePlayer.muted = true;
          }
        }

        dVideoModal.classList.remove('hidden');
        if (window.lucide) window.lucide.createIcons();
      });
    });

    const hideVideoModal = () => {
      dPlayerContainer.innerHTML = ''; // Kill play immediately
      dVideoModal.classList.add('hidden');
    };

    if (dCloseVideoBtn) dCloseVideoBtn.addEventListener('click', hideVideoModal);
    dVideoModal.addEventListener('click', (e) => {
      if (e.target === dVideoModal) hideVideoModal();
    });
  }

  // 7. Interactive Multi-Image Gallery Modal loader
  const galleryModal = document.getElementById('project-gallery-modal');
  const galleryCloseBtn = document.getElementById('close-gallery-modal-btn');
  const galleryMainImg = document.getElementById('gallery-modal-main-img');
  const galleryProjName = document.getElementById('gallery-modal-proj-name');
  const galleryCurrentIdx = document.getElementById('gallery-current-idx');
  const galleryTotalCount = document.getElementById('gallery-total-count');
  const galleryThumbnailsContainer = document.getElementById('gallery-thumbnails-container');
  const galleryPrevBtn = document.getElementById('gallery-prev-btn');
  const galleryNextBtn = document.getElementById('gallery-next-btn');
  const galleryFullscreenBtn = document.getElementById('gallery-fullscreen-btn');
  const galleryMediaContainer = document.getElementById('gallery-media-container');
  
  if (galleryModal) {
    let currentGalleryImages = [];
    let activeImageIndex = 0;

    const updateGalleryView = () => {
      if (currentGalleryImages.length === 0) return;
      galleryMainImg.src = currentGalleryImages[activeImageIndex];
      galleryCurrentIdx.textContent = activeImageIndex + 1;
      
      // Update active thumbnail borders
      const thumbnails = galleryThumbnailsContainer.querySelectorAll('button');
      thumbnails.forEach((thumb, idx) => {
        if (idx === activeImageIndex) {
          thumb.classList.add('border-blue-600', 'scale-105', 'ring-2', 'ring-blue-100');
          thumb.classList.remove('border-slate-205');
        } else {
          thumb.classList.remove('border-blue-600', 'scale-105', 'ring-2', 'ring-blue-100');
          thumb.classList.add('border-slate-205');
        }
      });
    };

    // Trigger Gallery buttons
    const galleryTriggers = document.querySelectorAll('.project-gallery-trigger');
    galleryTriggers.forEach(trigger => {
      trigger.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const projId = trigger.getAttribute('data-proj-id');
        const allProj = await api.getProjects();
        const proj = allProj.find(p => p.id === Number(projId));
        if (!proj) return;

        galleryProjName.textContent = proj.nome;
        
        // Load up to 5 images list
        currentGalleryImages = [];
        if (proj.imagens && Array.isArray(proj.imagens) && proj.imagens.length > 0) {
          currentGalleryImages = [...proj.imagens];
        } else if (proj.imagem) {
          currentGalleryImages = [proj.imagem];
        } else {
          currentGalleryImages = ["https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=600"];
        }

        activeImageIndex = 0;
        galleryTotalCount.textContent = currentGalleryImages.length;

        // Render thumbnails list
        galleryThumbnailsContainer.innerHTML = '';
        currentGalleryImages.forEach((imgUrl, idx) => {
          const thumbBtn = document.createElement('button');
          thumbBtn.className = "w-12 h-12 rounded-lg border-2 overflow-hidden shrink-0 transition-all p-0.5 bg-white cursor-pointer hover:border-blue-300";
          thumbBtn.innerHTML = `<img src="${imgUrl}" class="w-full h-full object-cover rounded-xs" referrerPolicy="no-referrer">`;
          thumbBtn.addEventListener('click', () => {
            activeImageIndex = idx;
            updateGalleryView();
          });
          galleryThumbnailsContainer.appendChild(thumbBtn);
        });

        // Hide prev/next if only 1 image
        if (currentGalleryImages.length <= 1) {
          galleryPrevBtn.classList.add('hidden');
          galleryNextBtn.classList.add('hidden');
        } else {
          galleryPrevBtn.classList.remove('hidden');
          galleryNextBtn.classList.remove('hidden');
        }

        updateGalleryView();
        galleryModal.classList.remove('hidden');
        if (window.lucide) window.lucide.createIcons();
      });
    });

    const hideGalleryModal = () => {
      if (document.fullscreenElement === galleryMediaContainer) {
        if (document.exitFullscreen) document.exitFullscreen();
      }
      galleryModal.classList.add('hidden');
    };

    if (galleryCloseBtn) galleryCloseBtn.addEventListener('click', hideGalleryModal);
    
    galleryPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      activeImageIndex = (activeImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
      updateGalleryView();
    });

    galleryNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      activeImageIndex = (activeImageIndex + 1) % currentGalleryImages.length;
      updateGalleryView();
    });

    galleryModal.addEventListener('click', (e) => {
      if (e.target === galleryModal) hideGalleryModal();
    });

    if (galleryFullscreenBtn) {
      galleryFullscreenBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (document.fullscreenElement === galleryMediaContainer) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        } else if (galleryMediaContainer) {
          try {
            if (galleryMediaContainer.requestFullscreen) {
              galleryMediaContainer.requestFullscreen();
            } else if (galleryMediaContainer.webkitRequestFullscreen) { /* Safari / Older Chrome */
              galleryMediaContainer.webkitRequestFullscreen();
            } else if (galleryMediaContainer.msRequestFullscreen) { /* IE11 */
              galleryMediaContainer.msRequestFullscreen();
            } else {
              window.open(galleryMainImg.src, '_blank');
            }
          } catch (err) {
            console.warn("Fullscreen permission or support failed. Displaying image directly in a tab.", err);
            window.open(galleryMainImg.src, '_blank');
          }
        }
      });
    }

    document.addEventListener('fullscreenchange', () => {
      if (document.fullscreenElement === galleryMediaContainer) {
        galleryMainImg.classList.add('h-screen', 'max-h-screen', 'w-screen', 'max-w-screen', 'p-4');
        galleryMainImg.classList.remove('max-h-96');
      } else {
        galleryMainImg.classList.remove('h-screen', 'max-h-screen', 'w-screen', 'max-w-screen', 'p-4');
        galleryMainImg.classList.add('max-h-96');
      }
    });

    // Keyboard arrow keys navigation inside projects gallery modal
    document.addEventListener('keydown', (e) => {
      if (galleryModal && !galleryModal.classList.contains('hidden')) {
        if (e.key === 'ArrowLeft' || e.key === 'Left') {
          activeImageIndex = (activeImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
          updateGalleryView();
        } else if (e.key === 'ArrowRight' || e.key === 'Right') {
          activeImageIndex = (activeImageIndex + 1) % currentGalleryImages.length;
          updateGalleryView();
        } else if (e.key === 'Escape' && !document.fullscreenElement) {
          hideGalleryModal();
        }
      }
    });
  }

  // Description modal logic
  const descModal = document.getElementById('project-desc-modal');
  const descModalTitle = document.getElementById('desc-modal-proj-name');
  const descModalText = document.getElementById('desc-modal-proj-text');
  const closeDescBtn = document.getElementById('close-desc-modal-btn');
  const closeDescBtnBottom = document.getElementById('close-desc-modal-btn-bottom');

  function openDescModal(projName, projDesc) {
    if (descModal && descModalTitle && descModalText) {
      descModalTitle.textContent = projName;
      descModalText.textContent = projDesc;
      descModal.classList.remove('hidden');
    }
  }

  function closeDescModal() {
    if (descModal) {
      descModal.classList.add('hidden');
    }
  }

  if (closeDescBtn) {
    closeDescBtn.addEventListener('click', closeDescModal);
  }
  if (closeDescBtnBottom) {
    closeDescBtnBottom.addEventListener('click', closeDescModal);
  }
  if (descModal) {
    descModal.addEventListener('click', (e) => {
      if (e.target === descModal) {
        closeDescModal();
      }
    });
  }

  // Bind project description read more events
  document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const allProjects = await api.getProjects();
      const proj = allProjects.find(p => p.id == id);
      if (proj) {
        openDescModal(proj.nome, proj.descricao);
      }
    });
  });

  // 6. Active Section Highlight for navigation links on scroll
  const sections = ['about', 'experiences', 'projects', 'certificates', 'contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);
  const desktopLinks = document.querySelectorAll('header nav a[href^="#"]');

  const onScrollHighlight = () => {
    let currentActiveSection = '';
    const scrollPos = window.scrollY + 180; // Offset for header trigger position

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentActiveSection = '#' + sec.id;
      }
    });

    if (window.scrollY < 120) {
      currentActiveSection = '#hero';
    }

    desktopLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentActiveSection) {
        link.classList.add('nav-link-active');
        link.classList.remove('text-slate-500');
      } else {
        link.classList.remove('nav-link-active');
        link.classList.add('text-slate-500');
      }
    });
  };

  window.addEventListener('scroll', onScrollHighlight);
  setTimeout(onScrollHighlight, 150);

  // 7. Compact Navigation Header with clean physical transition
  const mainNav = document.getElementById('main-nav');
  if (mainNav) {
    const handleNavCompact = () => {
      const navContainer = mainNav.querySelector('.max-w-6xl');
      if (window.scrollY > 40) {
        mainNav.classList.remove('bg-white/30', 'dark:bg-slate-950/30');
        mainNav.classList.add('bg-white/80', 'dark:bg-slate-900/80', 'shadow-sm', 'shadow-slate-100/10', 'dark:shadow-none', 'border-slate-250/20', 'dark:border-slate-800/20');
        if (navContainer) {
          navContainer.classList.remove('py-3.5');
          navContainer.classList.add('py-2');
        }
      } else {
        mainNav.classList.remove('bg-white/80', 'dark:bg-slate-900/80', 'shadow-sm', 'shadow-slate-100/10', 'dark:shadow-none', 'border-slate-250/20', 'dark:border-slate-800/20');
        mainNav.classList.add('bg-white/30', 'dark:bg-slate-950/30');
        if (navContainer) {
          navContainer.classList.remove('py-2');
          navContainer.classList.add('py-3.5');
        }
      }
    };
    window.addEventListener('scroll', handleNavCompact);
    handleNavCompact(); // run on start
  }

  // 7.5. Configuração dos Carrosséis Infinitos (Projetos & Certificados)
  const setupCarousel = (trackId, prevBtnId, nextBtnId, autoPlayInterval = 0) => {
    const track = document.getElementById(trackId);
    const nextBtn = document.getElementById(nextBtnId);
    const prevBtn = document.getElementById(prevBtnId);
    if (!track || !nextBtn || !prevBtn) return;

    let isTransitioning = false;
    let autoPlayTimer = null;

    const handleNext = () => {
      if (isTransitioning) return;
      const totalItems = track.children.length;
      if (totalItems <= 1) return;

      isTransitioning = true;

      // Pegamos a largura do primeiro card de maneira dinâmica
      const card = track.firstElementChild;
      const cardWidth = card.getBoundingClientRect().width;
      const gap = 24; // gap-6 (24px)
      const offset = cardWidth + gap;

      // Inicia a transição de deslizar para a esquerda (trazendo o próximo card da direita)
      track.style.transition = 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)';
      track.style.transform = `translateX(-${offset}px)`;

      const onTransitionEnd = () => {
        // Desativa a transição temporariamente para o reset instantâneo e invisível
        track.style.transition = 'none';
        
        // Move o primeiro item para o fim do track no DOM (não perde os event listeners de clique/video)
        track.appendChild(track.firstElementChild);
        
        // Reseta o transform para 0px
        track.style.transform = 'translateX(0px)';
        
        // Força reflow
        track.offsetHeight; 

        // Libera para o próximo clique
        track.removeEventListener('transitionend', onTransitionEnd);
        isTransitioning = false;
      };

      track.addEventListener('transitionend', onTransitionEnd);
    };

    const handlePrev = () => {
      if (isTransitioning) return;
      const totalItems = track.children.length;
      if (totalItems <= 1) return;

      isTransitioning = true;

      // Pegamos a largura do último card de maneira dinâmica
      const card = track.lastElementChild;
      const cardWidth = card.getBoundingClientRect().width;
      const gap = 24; // gap-6 (24px)
      const offset = cardWidth + gap;

      // 1. Desativa transição e move o último elemento para o começo (prepend)
      track.style.transition = 'none';
      track.insertBefore(track.lastElementChild, track.firstElementChild);
      
      // 2. Ajusta o transform instantaneamente para compensar o item inserido à esquerda
      track.style.transform = `translateX(-${offset}px)`;
      track.offsetHeight; // força reflow

      // 3. Aplica a transição de volta para 0px para revelar o elemento inserido de forma suave
      track.style.transition = 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)';
      track.style.transform = 'translateX(0px)';

      const onTransitionEnd = () => {
        track.style.transition = 'none';
        track.removeEventListener('transitionend', onTransitionEnd);
        isTransitioning = false;
      };

      track.addEventListener('transitionend', onTransitionEnd);
    };

    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleNext();
    });

    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      handlePrev();
    });

    // Start auto rolling
    const startAutoPlay = () => {
      if (autoPlayInterval > 0 && !autoPlayTimer) {
        autoPlayTimer = setInterval(() => {
          handleNext();
        }, autoPlayInterval);
      }
    };

    // Stop auto rolling
    const stopAutoPlay = () => {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    };

    if (autoPlayInterval > 0) {
      startAutoPlay();

      // Pause when mouse enters the track or controls, start when they leave
      track.addEventListener('mouseenter', stopAutoPlay);
      track.addEventListener('mouseleave', startAutoPlay);
      
      prevBtn.addEventListener('mouseenter', stopAutoPlay);
      prevBtn.addEventListener('mouseleave', startAutoPlay);
      nextBtn.addEventListener('mouseenter', stopAutoPlay);
      nextBtn.addEventListener('mouseleave', startAutoPlay);
    }

    // Certifica-se de redefinir o estado de repouso no início/resize
    const resetPosition = () => {
      track.style.transition = 'none';
      track.style.transform = 'translateX(0px)';
    };

    window.addEventListener('resize', resetPosition);
    resetPosition();
  };

  // 7.6. Configuração da Rolagem Contínua Lenta (apenas Certificados)
// Configuração da Rolagem Contínua Lenta (apenas Certificados)
  const setupContinuousCarousel = (trackId, direction = 'left') => {
    const track = document.getElementById(trackId);
    if (!track) return;

    const container = track.parentElement;
    if (!container) return;

    // Hide scrollbar, configure relative/hidden layout on container
    container.style.overflowX = 'hidden';
    container.style.position = 'relative';
    container.style.width = '100%';

    const originalCards = Array.from(track.children);
    if (originalCards.length === 0) return;

    // Clone all cards and append them
    originalCards.forEach(card => {
      const clone = card.cloneNode(true);
      track.appendChild(clone);
    });

    let cardWidth = 0;
    const gap = 24; // gap-6
    let singleSetWidth = 0;

    const calculateSizes = () => {
      const containerWidth = container.getBoundingClientRect().width;
      if (window.innerWidth >= 1024) { // lg
        cardWidth = (containerWidth - 2 * gap) / 3;
      } else if (window.innerWidth >= 640) { // sm
        cardWidth = (containerWidth - gap) / 2;
      } else {
        cardWidth = containerWidth;
      }

      // Set width on all children (including clones)
      Array.from(track.children).forEach(child => {
        child.style.width = `${cardWidth}px`;
        child.style.flexShrink = '0';
      });

      singleSetWidth = (cardWidth + gap) * originalCards.length;
    };

    calculateSizes();
    window.addEventListener('resize', calculateSizes);

    let scrollPos = direction === 'right' ? singleSetWidth : 0;
    let isPaused = false;
    const speed = 0.6;

    const step = () => {
      if (!isPaused) {
        if (direction === 'right') {
          scrollPos -= speed;
          if (scrollPos <= 0) {
            scrollPos = singleSetWidth;
          }
        } else {
          scrollPos += speed;
          if (scrollPos >= singleSetWidth) {
            scrollPos = 0;
          }
        }
        container.scrollLeft = scrollPos;
      }
      requestAnimationFrame(step);
    };

    container.addEventListener('mouseenter', () => { isPaused = true; });
    container.addEventListener('mouseleave', () => { isPaused = false; });
    container.addEventListener('touchstart', () => { isPaused = true; }, { passive: true });
    container.addEventListener('touchend', () => { isPaused = false; }, { passive: true });

    // Hide control buttons since scrolling is continuous and automatic
    const certPrev = document.getElementById('certificates-prev-btn');
    if (certPrev && certPrev.parentElement) {
      certPrev.parentElement.style.display = 'none';
    }

    // Start!
    requestAnimationFrame(step);
  };

  setupContinuousCarousel('certificates-carousel-track');
  setupContinuousCarousel('certificates-carousel-track-2', 'right');

  // 8. iOS Style Dark Mode Toggle e persistência do tema
  const themeToggle = document.getElementById('dark-mode-toggle');
  const themeDot = document.getElementById('dark-mode-dot');
  const sunIcon = document.getElementById('toggle-sun-icon');
  const moonIcon = document.getElementById('toggle-moon-icon');

  const updateSwitchUI = (isDark) => {
    if (isDark) {
      themeToggle.classList.remove('bg-slate-200');
      themeToggle.classList.add('bg-emerald-500');
      themeToggle.setAttribute('aria-checked', 'true');
      
      themeDot.classList.remove('translate-x-0');
      themeDot.classList.add('translate-x-5');
      
      if (sunIcon && moonIcon) {
        sunIcon.classList.add('opacity-0');
        sunIcon.classList.remove('opacity-100');
        moonIcon.classList.remove('opacity-0');
        moonIcon.classList.add('opacity-100');
      }
    } else {
      themeToggle.classList.remove('bg-emerald-500');
      themeToggle.classList.add('bg-slate-200');
      themeToggle.setAttribute('aria-checked', 'false');
      
      themeDot.classList.remove('translate-x-5');
      themeDot.classList.add('translate-x-0');
      
      if (sunIcon && moonIcon) {
        sunIcon.classList.remove('opacity-0');
        sunIcon.classList.add('opacity-100');
        moonIcon.classList.add('opacity-0');
        moonIcon.classList.remove('opacity-100');
      }
    }
  };

  // Inicializa o switch com base no tema atual no html
  const isCurrentlyDark = document.documentElement.classList.contains('dark');
  if (themeToggle && themeDot) {
    updateSwitchUI(isCurrentlyDark);

    themeToggle.addEventListener('click', () => {
      const willBeDark = !document.documentElement.classList.contains('dark');
      if (willBeDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      updateSwitchUI(willBeDark);
    });
  }
}

