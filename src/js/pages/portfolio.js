import { api, getSeedsTechLogo } from '../../api.js';

export async function renderPortfolio() {
  const profile = await api.getProfile();
  const projects = await api.getProjects();
  const certificates = await api.getCertificates();
  const stats = await api.getStats();
  const academics = await api.getAcademics();

  // Generating tech badges lists with full logo support
  const techDominadasHtml = profile.tecnologiasDominadas
    .map(tech => {
      const name = typeof tech === 'string' ? tech : (tech.nome || '');
      const icon = typeof tech === 'object' && tech.icone ? tech.icone : getSeedsTechLogo(name);
      return `
        <div class="flex items-center space-x-2 bg-white border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs transition-all hover:border-blue-350 hover:bg-blue-50/10 group shadow-2xs hover:-translate-y-0.5 duration-200">
          <img src="${icon}" class="w-5 h-5 object-contain select-none shrink-0" referrerPolicy="no-referrer" alt="${name}">
          <span class="text-slate-800 font-sans font-bold leading-none">${name}</span>
        </div>
      `;
    }).join('');

  // Generating academics grid
  const academicsHtml = academics.length > 0
    ? academics.map(acad => `
         <div class="flex items-start space-x-4 p-4 bg-white border border-slate-200 rounded-2xl transition-all hover:border-blue-350 hover:bg-blue-50/10 group shadow-2xs hover:-translate-y-0.5 duration-200">
          <div class="w-12 h-12 rounded-xl overflow-hidden bg-white shrink-0 shadow-3xs flex items-center justify-center p-1 select-none">
            <img src="${acad.imagem}" alt="${acad.instituicao}" class="w-full h-full object-contain rounded-lg group-hover:scale-102 transition-transform" referrerPolicy="no-referrer">
          </div>
          <div class="flex-1">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <h5 class="text-xs font-bold text-slate-900 font-sans">${acad.curso}</h5>
              <span class="text-[9px] font-bold font-mono text-blue-600 bg-blue-50 border border-blue-105 px-2 py-0.5 rounded-md self-start sm:self-auto">${acad.periodo}</span>
            </div>
            <p class="text-[10px] font-sans font-semibold text-slate-400 mt-0.5">${acad.instituicao}</p>
            <p class="text-xs font-sans text-slate-550 mt-1.5 leading-relaxed text-justify">${acad.descricao || ''}</p>
            ${acad.diploma ? `
              <div class="mt-3">
                <a href="${acad.diploma}" target="_blank" class="inline-flex items-center space-x-1.5 text-[10px] font-sans font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-150 px-3 py-1.5 rounded-xl cursor-pointer transition-all shadow-3xs">
                  <i data-lucide="award" class="w-3.5 h-3.5"></i>
                  <span>Ver Diploma</span>
                </a>
              </div>
            ` : ''}
          </div>
        </div>
      `).join('')
    : `
        <div class="py-6 text-center text-slate-400 border border-dashed border-slate-200 rounded-2xl bg-white shadow-3xs font-sans text-xs">
          Nenhuma formação acadêmica registrada no momento.
        </div>
      `;


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
          <div class="premium-card bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group scroll-reveal">
            <div class="relative h-48 overflow-hidden bg-slate-100 border-b border-slate-100 project-media-container select-none">
              <img src="${proj.imagem}" alt="${proj.nome}" class="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 project-cover-img cursor-pointer project-gallery-trigger" data-proj-id="${proj.id}" referrerPolicy="no-referrer">
              
              <video src="${finalVideoPreview}" class="project-preview-video absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 pointer-events-none" muted loop playsinline></video>
              <div class="absolute top-3 left-3 bg-slate-900/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-lg text-[9px] font-sans text-white font-bold tracking-wider uppercase flex items-center space-x-1 transition-opacity duration-300 pointer-events-none group-hover:opacity-0 video-badge-indicator">
                <span class="w-1.5 h-1.5 rounded-full ${statusColorClass} ${pulseClass}"></span>
                <span>${statusText}</span>
              </div>

              <div class="absolute bottom-3 right-3 bg-slate-900/75 backdrop-blur-md border border-white/10 px-2 py-1 rounded-lg text-[9px] font-sans text-white font-bold flex items-center space-x-1 cursor-pointer hover:bg-slate-950 transition-all project-gallery-trigger shadow-2xs z-10" data-proj-id="${proj.id}">
                <i data-lucide="images" class="w-3.5 h-3.5 text-blue-450"></i>
                <span class="font-sans font-bold">Ver</span>              </div>

              ${hasDate ? `
                <div class="absolute top-3 right-3 bg-white/95 backdrop-blur-md border border-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-sans text-blue-600 font-semibold shadow-2xs">
                  ${formattedDate}
                </div>
              ` : ''}
            </div>
            
            <div class="p-6 flex-1 flex flex-col">
              <h3 class="text-base font-bold text-slate-950 mb-2 font-sans group-hover:text-blue-605 transition-colors">${proj.nome}</h3>
              ${proj.descricao && proj.descricao.length > 150 ? `
                <p class="text-slate-600 text-sm mb-4 text-justify leading-relaxed flex-1 font-sans">
                  <span>${proj.descricao.slice(0, 140)}...</span>
<button data-id="${proj.id}" class="read-more-btn text-black hover:text-slate-700 font-bold transition-all ml-1 inline cursor-pointer hover:underline text-[10px]" style="background: none; border: none; padding: 0;">mais</button>                </p>
              ` : `
                <p class="text-slate-600 text-sm mb-4 text-justify leading-relaxed flex-1 font-sans">${proj.descricao || ''}</p>
              `}
              
              <div class="flex flex-wrap gap-1.5 mb-5 font-sans">
                ${proj.tecnologias.map(t => `<span class="bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded-md">${t}</span>`).join('')}
              </div>
              
              <div class="grid grid-cols-2 gap-2 text-xs font-sans">
                <a href="${proj.linkGithub}" target="_blank" class="flex items-center justify-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-xl transition-all shadow-sm">
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
                    <button disabled class="flex items-center justify-center space-x-1.5 bg-slate-100 text-slate-400 border border-slate-200/60 py-2 rounded-xl cursor-not-allowed">
                      <i data-lucide="ban" class="w-3.5 h-3.5 text-slate-400"></i>
                      <span>Sem site</span>
                    </button>
                  `}
                </div>
              </div>

              <button class="w-full flex items-center justify-center space-x-2 bg-blue-50/50 hover:bg-blue-100/80 border border-blue-200/60 text-blue-700 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all mt-3 open-full-demo-btn" data-video-url="${proj.linkVideo || finalVideoPreview}" data-proj-name="${proj.nome}" data-video-desc="${proj.descricao}">
                <i data-lucide="play-circle" class="w-4 h-4 text-blue-600"></i>
                <span>Vídeo demonstração</span>
              </button>

            </div>
          </div>
        `;
    }).join('')
    : `
      <div class="col-span-full py-12 text-center text-slate-400 border border-dashed border-slate-200 rounded-2xl bg-white shadow-3xs font-sans text-sm">
        <i data-lucide="folder-open" class="w-8 h-8 mx-auto mb-2 opacity-50 text-slate-350"></i>
        Nenhum projeto cadastrado no banco de dados.
      </div>
    `;

  // Generating certificates grid
  const certificatesHtml = certificates.length > 0
    ? certificates.map(cert => `
        <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden group hover:border-slate-350 hover:shadow-md transition-all flex flex-col h-full shadow-xs duration-250">
          <div class="relative h-40 bg-slate-100 overflow-hidden cursor-pointer cert-image-trigger" data-img-url="${cert.imagem}" data-title="${cert.nome}">
            <img src="${cert.imagem}" alt="${cert.nome}" class="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-102 transition-all duration-300" referrerPolicy="no-referrer">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent flex items-end p-3">
              <span class="text-[10px] font-sans text-white bg-slate-900/70 backdrop-blur-xs px-2 py-0.5 rounded-lg shadow-sm">Clique para expandir</span>
            </div>
          </div>
          <div class="p-5 flex-1 flex flex-col justify-between">
            <div>
              <h4 class="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">${cert.nome}</h4>
              <div class="flex items-center space-x-2 mt-2">
                ${cert.logoInstituicao ? `
                  <img src="${cert.logoInstituicao}" alt="Logo ${cert.instituicao}" class="w-7 h-7 object-contain rounded border border-slate-200 p-0.5 bg-white shrink-0 shadow-3xs" referrerPolicy="no-referrer">
                ` : ''}
                <span class="text-xs text-slate-550 font-sans font-medium line-clamp-1">${cert.instituicao}</span>
              </div>
            </div>
            <div class="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400">
              <span class="font-sans">${formatDateMonthYear(cert.data)}</span>
              ${cert.link ? `
                <a href="${cert.link}" target="_blank" class="text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-1 group/link transition-colors">
                  <span>Verificar</span>
                  <i data-lucide="arrow-up-right" class="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"></i>
                </a>
              ` : `
                <span class="text-slate-400 font-sans">Especialização</span>
              `}
            </div>
          </div>
        </div>
      `).join('')
    : `
      <div class="col-span-full py-12 text-center text-slate-400 border border-dashed border-slate-200 rounded-2xl bg-white shadow-3xs font-sans text-sm">
        <i data-lucide="award" class="w-8 h-8 mx-auto mb-2 opacity-50 text-slate-350"></i>
        Nenhum certificado registrado.
      </div>
    `;

  return `
    <header class="sticky top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 z-40 transition-all duration-300" id="main-nav">
      <div class="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
        <a href="#hero" class="flex items-center space-x-2 text-slate-900 group select-none">
          <div class="flex flex-col">
            <span class="text-sm font-bold tracking-tight font-sans text-slate-800 group-hover:text-slate-950 transition-colors">Thiago Bianna Pessanha da Cruz</span>
            <span class="text-[9px] font-sans font-semibold text-slate-400 leading-none">Software Engineer</span>
          </div>
        </a>

        <nav class="hidden md:flex items-center space-x-8 text-xs font-semibold text-slate-500 uppercase tracking-widest">
          <a href="#about" class="hover:text-blue-600 transition-colors">sobre</a>
          <a href="#projects" class="hover:text-blue-600 transition-colors">projetos</a>
          <a href="#certificates" class="hover:text-blue-600 transition-colors">certificados</a>
          <a href="#contact" class="hover:text-blue-600 transition-colors">contato</a>
        </nav>

        <div class="flex items-center space-x-3">
          ${profile.links && profile.links.curriculoPdf ? `
            <a href="${profile.links.curriculoPdf}" target="_blank" class="bg-blue-600 hover:bg-blue-700 text-white font-sans text-[11px] px-3.5 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all shadow-2xs hover:shadow-xs">
              <i data-lucide="file-down" class="w-3.5 h-3.5"></i>
              <span class="font-bold">Baixar Currículo</span>
            </a>
          ` : ''}
          <a href="#/admin" class="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-sans text-[11px] px-3.5 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all shadow-2xs hover:border-slate-350">
            <i data-lucide="lock" class="w-3 h-3 text-slate-400"></i>
            <span class="font-semibold">Painel Admin</span>
          </a>
          <button id="mobile-menu-btn" class="md:hidden text-slate-500 hover:text-slate-800 focus:outline-none p-1.5 hover:bg-slate-100 rounded-lg">
            <i data-lucide="menu" id="menu-icon-state" class="w-5 h-5"></i>
          </button>
        </div>
      </div>

      <div id="mobile-dropdown" class="hidden md:hidden absolute left-0 right-0 bg-white border-b border-slate-200 px-6 py-5 flex flex-col space-y-4 shadow-xl z-50">
        <a href="#about" class="mobile-nav-link text-sm font-sans font-semibold text-slate-600 hover:text-blue-600 flex items-center justify-between">
          <span>Sobre Mim</span>
          <i data-lucide="chevron-right" class="w-4 h-4 opacity-40"></i>
        </a>
        <a href="#projects" class="mobile-nav-link text-sm font-sans font-semibold text-slate-600 hover:text-blue-600 flex items-center justify-between">
          <span>Projetos</span>
          <i data-lucide="chevron-right" class="w-4 h-4 opacity-40"></i>
        </a>
        <a href="#certificates" class="mobile-nav-link text-sm font-sans font-semibold text-slate-600 hover:text-blue-600 flex items-center justify-between">
          <span>Certificados</span>
          <i data-lucide="chevron-right" class="w-4 h-4 opacity-40"></i>
        </a>
        <a href="#contact" class="mobile-nav-link text-sm font-sans font-semibold text-slate-600 hover:text-blue-600 flex items-center justify-between">
          <span>Contato</span>
          <i data-lucide="chevron-right" class="w-4 h-4 opacity-40"></i>
        </a>
        ${profile.links && profile.links.curriculoPdf ? `
          <a href="${profile.links.curriculoPdf}" target="_blank" class="mobile-nav-link bg-blue-50 text-blue-600 text-sm font-sans font-bold py-2.5 px-3.5 rounded-xl flex items-center space-x-2 border border-blue-100 mt-2">
            <i data-lucide="file-down" class="w-4 h-4"></i>
            <span>Baixar Currículo (PDF)</span>
          </a>
        ` : ''}
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-4 pb-20 relative bg-dot-pattern">
      
      <section id="hero" class="pt-10 pb-16 md:pt-14 md:pb-24 flex flex-col items-center justify-center text-center relative max-w-4xl mx-auto z-10">
        
        <div class="relative w-28 h-28 md:w-32 md:h-32 mb-6 animate-fade-in select-none">
          <div class="absolute inset-0 bg-blue-100 rounded-full scale-105 opacity-30 blur-xs"></div>
          <div class="relative w-full h-full rounded-full border border-slate-200 shadow-md overflow-hidden bg-white">
            <img src="${profile.fotoPerfil}" alt="${profile.nome}" class="w-full h-full object-cover" referrerPolicy="no-referrer">
          </div>
        </div>

        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight font-sans max-w-3xl mb-3 animate-fade-in" style="animation-delay: 100ms;">
          Olá, eu sou <span class="text-blue-600">${profile.nome}</span>
        </h1>

        <div class="flex flex-col space-y-1 mb-6 animate-fade-in" style="animation-delay: 150ms;">
          <p class="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
            Estudante de Engenharia de Software
          </p>
          <p class="text-base sm:text-lg md:text-xl font-semibold text-blue-600/90 font-mono tracking-tight select-none">
            Desenvolvedor Backend Java
          </p>
        </div>

        <p class="text-sm sm:text-base md:text-lg text-slate-650 leading-relaxed max-w-2xl mx-auto mb-10 font-sans font-normal animate-fade-in" style="animation-delay: 200ms;">
          ${profile.apresentacao}
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto px-4 mb-16 animate-fade-in" style="animation-delay: 250ms;">
          <a href="#projects" class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center space-x-2">
            <span>Ver Projetos</span>
            <i data-lucide="chevron-right" class="w-4 h-4"></i>
          </a>
          <a href="#contact" class="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold px-7 py-3 rounded-xl transition-all shadow-3xs flex items-center justify-center space-x-2 hover:border-slate-300">
            <span>Fale Comigo</span>
            <i data-lucide="mail" class="w-4 h-4 text-slate-500"></i>
          </a>
          <a href="${profile.links.github}" target="_blank" class="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-semibold px-7 py-3 rounded-xl transition-all shadow-sm flex items-center justify-center space-x-2">
            <i data-lucide="github" class="w-4 h-4"></i>
            <span>GitHub</span>
          </a>
        </div>

        <div class="w-full max-w-xl border-t border-slate-200/80 pt-8 animate-fade-in-slow select-none" style="animation-delay: 350ms;">
          <span class="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">
            Tecnologias Principais
          </span>
          <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-slate-700 text-sm sm:text-base font-semibold">
            <span class="hover:text-blue-600 transition-colors">Java</span>
            <span class="text-slate-300 select-none">•</span>
            <span class="hover:text-blue-600 transition-colors">Spring Boot</span>
            <span class="text-slate-300 select-none">•</span>
            <span class="hover:text-blue-600 transition-colors">PostgreSQL</span>
            <span class="text-slate-300 select-none">•</span>
            <span class="hover:text-blue-600 transition-colors">Hibernate</span>
            <span class="text-slate-300 select-none">•</span>
            <span class="hover:text-blue-600 transition-colors">REST APIs</span>
          </div>
        </div>

      </section>

      <section id="stats" class="my-12 py-8 bg-white border border-slate-200/80 rounded-3xl grid grid-cols-2 md:grid-cols-4 gap-6 px-6 shadow-xs relative scroll-reveal">
        <div class="flex flex-col items-center text-center p-3">
          <div class="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-3 text-blue-600">
            <i data-lucide="code" class="w-5 h-5"></i>
          </div>
          <span class="text-2xl md:text-3xl font-extrabold text-slate-900 font-sans stat-count block" id="proj-stat-num" data-val="${stats.projects || 0}">0</span>
          <span class="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider mt-1.5 font-sans">Projetos Executados</span>
        </div>

        <div class="flex flex-col items-center text-center p-3 border-t md:border-t-0 border-slate-100 md:border-l">
          <div class="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-3 text-indigo-600">
            <i data-lucide="award" class="w-5 h-5"></i>
          </div>
          <span class="text-2xl md:text-3xl font-extrabold text-slate-900 font-sans stat-count block" id="cert-stat-num" data-val="${stats.certificates || 0}">0</span>
          <span class="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider mt-1.5 font-sans">Certificados TI</span>
        </div>

        <div class="flex flex-col items-center text-center p-3 border-t md:border-t-0 border-l border-slate-100 md:border-l">
          <div class="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center mb-3 text-purple-600">
            <i data-lucide="cpu" class="w-5 h-5"></i>
          </div>
          <span class="text-2xl md:text-3xl font-extrabold text-slate-900 font-sans stat-count block" id="tech-stat-num" data-val="${stats.technologies || 0}">0</span>
          <span class="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider mt-1.5 font-sans">Linguagens & Techs</span>
        </div>

        <div class="flex flex-col items-center text-center p-3 border-t md:border-t-0 border-l border-slate-100 md:border-l">
          <div class="w-10 h-10 rounded-xl bg-slate-50 border border-slate-150 flex items-center justify-center mb-3 text-slate-600">
            <i data-lucide="github" class="w-5 h-5"></i>
          </div>
          <span class="text-2xl md:text-3xl font-extrabold text-slate-900 font-sans stat-count block" id="commits-stat-num" data-val="${stats.githubCommits || 1450}">0</span>
          <span class="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider mt-1.5 font-sans">Commits no GitHub</span>
        </div>
      </section>

      <section id="about" class="py-16 border-t border-slate-200/85 scroll-reveal">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          <div class="md:col-span-5 flex flex-col items-center justify-center">
            <div class="relative w-48 h-48 md:w-56 md:h-56 select-none">
              <div class="absolute inset-0 bg-blue-50 border border-blue-100 rounded-3xl rotate-3 shadow-3xs"></div>
              <div class="absolute inset-0 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <img src="${profile.fotoSobre || profile.fotoPerfil}" alt="${profile.nome}" class="w-full h-full object-cover hover:scale-102 transition-transform duration-500" referrerPolicy="no-referrer" id="avatar-img-view">
              </div>
              <div class="absolute -bottom-2 -right-2 bg-white border border-slate-200 px-3.5 py-1.5 rounded-full flex items-center space-x-1.5 shadow-sm">
                <div class="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse"></div>
                <span class="text-[11px] font-sans font-bold text-slate-700">Java Core Level</span>
              </div>
            </div>
          </div>

          <div class="md:col-span-7 flex flex-col justify-center space-y-6">
            <h2 class="text-2xl md:text-3xl font-bold font-sans tracking-tight text-slate-900 flex items-center space-x-2">
              <span class="text-blue-600">#</span>
              <span>Sobre Mim</span>
            </h2>

            <p class="text-slate-650 font-sans leading-relaxed text-justify text-sm md:text-base font-normal">
              ${profile.bio}
            </p>

            <div class="space-y-4 pt-2">
              <div>
                <h4 class="text-[11px] font-bold font-sans uppercase tracking-widest text-blue-600 mb-3 flex items-center space-x-1.5 select-none">
                  <i data-lucide="check-check" class="w-4 h-4"></i>
                  <span>Frameworks & Tecnologias Dominadas</span>
                </h4>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  ${techDominadasHtml}
                </div>
              </div>

              <div class="pt-4 border-t border-slate-100">
                <h4 class="text-[11px] font-bold font-sans uppercase tracking-widest text-slate-900 mb-3.5 flex items-center space-x-1.5 select-none">
                  <i data-lucide="graduation-cap" class="w-4 h-4 text-blue-600"></i>
                  <span>Formação Acadêmica</span>
                </h4>
                <div class="space-y-3">
                  ${academicsHtml}
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      <section id="projects" class="py-16 border-t border-slate-200/85 scroll-reveal">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <h2 class="text-2xl md:text-3xl font-bold font-sans tracking-tight text-slate-900 flex items-center space-x-2">
              <span class="text-blue-600">#</span>
              <span>Projetos em Destaque</span>
            </h2>
            <p class="text-xs font-sans text-slate-550 mt-1">Carregando APIs e repositórios dinamicamente via Java REST endpoints imitados</p>
          </div>
          <div class="mt-4 md:mt-0 select-none">
            <span class="text-xs font-sans font-semibold text-slate-600 border border-slate-200 bg-white px-3.5 py-2 rounded-xl inline-flex items-center space-x-1.5 shadow-3xs">
              <i data-lucide="database" class="w-3.5 h-3.5 text-blue-600"></i>
              <span>Banco de Dados: Ativo</span>
            </span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${projectsHtml}
        </div>
      </section>

      <section id="certificates" class="py-16 border-t border-slate-200/85 scroll-reveal">
        <div class="mb-10">
          <h2 class="text-2xl md:text-3xl font-bold font-sans tracking-tight text-slate-900 flex items-center space-x-2">
            <span class="text-blue-600">#</span>
            <span>Certificados & Credenciais</span>
          </h2>
          <p class="text-xs font-sans text-slate-550 mt-1">Validações oficiais e especializações completadas para engenharia de softwares backend</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          ${certificatesHtml}
        </div>
      </section>

      <section id="contact" class="py-16 border-t border-slate-200/85 scroll-reveal">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-10 items-stretch">
          
          <div class="md:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <h2 class="text-2xl md:text-3xl font-bold font-sans tracking-tight text-slate-900 flex items-center space-x-2">
                <span class="text-blue-600">#</span>
                <span>Contato</span>
              </h2>
              <p class="text-slate-550 text-sm mt-3 leading-relaxed">
                Quer discutir algum projeto backend, arquitetura ou tem alguma proposta de oportunidade de estágio, acadêmica ou profissional?<br>Use os canais abaixo ou envie uma mensagem direta através do formulário!
              </p>
            </div>

            <div class="space-y-4 font-sans text-xs">
              
              <div class="flex items-center space-x-3.5 p-3.5 bg-white border border-slate-200 hover:border-slate-300 rounded-2xl transition-all shadow-3xs">
                <div class="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 select-none">
                  <i data-lucide="mail" class="w-4 h-4"></i>
                </div>
                <div>
                  <p class="text-slate-400 font-sans text-[9px] uppercase tracking-wider leading-none mb-1 font-bold select-none">E-mail Corporativo</p>
                  <a href="mailto:${profile.links.email}" class="text-slate-700 hover:text-blue-600 font-semibold tracking-tight break-all">${profile.links.email}</a>
                </div>
              </div>

              <div class="flex items-center space-x-3.5 p-3.5 bg-white border border-slate-200 hover:border-slate-300 rounded-2xl transition-all shadow-3xs">
                <div class="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-110 flex items-center justify-center text-emerald-650 select-none">
                  <i data-lucide="phone" class="w-4 h-4"></i>
                </div>
                <div>
                  <p class="text-slate-400 font-sans text-[9px] uppercase tracking-wider leading-none mb-1 font-bold select-none">WhatsApp direto</p>
                  <a href="${profile.links.whatsapp}" target="_blank" class="text-slate-700 hover:text-blue-600 font-semibold tracking-tight">${profile.links.whatsapp.replace("https://wa.me/", "+")}</a>
                </div>
              </div>

              <div class="flex items-center space-x-3.5 p-3.5 bg-white border border-slate-200 hover:border-slate-300 rounded-2xl transition-all shadow-3xs">
                <div class="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 select-none">
                  <i data-lucide="linkedin" class="w-4 h-4"></i>
                </div>
                <div>
                  <p class="text-slate-400 font-sans text-[9px] uppercase tracking-wider leading-none mb-1 font-bold select-none">LinkedIn Profissional</p>
                  <a href="${profile.links.linkedin}" target="_blank" class="text-slate-700 hover:text-blue-600 font-semibold tracking-tight break-all">${profile.links.linkedin.replace("https://", "")}</a>
                </div>
              </div>

            </div>

            <div class="text-[10px] text-slate-400 font-sans select-none">
              
            </div>
          </div>

          <div class="md:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xs">
  <h3 class="text-xs font-bold font-sans text-slate-800 uppercase tracking-widest mb-4 flex items-center space-x-2 select-none">
    <i data-lucide="send" class="w-4 h-4 text-blue-600"></i>
    <span>Enviar Mensagem</span>
  </h3>

  <form id="portfolio-contact-form" class="space-y-4 text-sm">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="flex flex-col">
        <label for="contact-name" class="font-sans text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1.5 select-none">Nome completo</label>
        <input type="text" id="contact-name" required placeholder="Seu Nome" class="bg-white border border-slate-200 hover:border-slate-300 focus:border-blue-600 rounded-xl px-4 py-3.5 text-slate-800 placeholder-slate-400 focus:outline-none transition-all font-sans">
      </div>
      <div class="flex flex-col">
        <label for="contact-email" class="font-sans text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1.5 select-none">Seu E-mail</label>
        <input type="email" id="contact-email" required placeholder="Ex: lucas@example.com" class="bg-white border border-slate-200 hover:border-slate-300 focus:border-blue-600 rounded-xl px-4 py-3.5 text-slate-800 placeholder-slate-400 focus:outline-none transition-all font-sans">
      </div>
    </div>

    <div class="flex flex-col">
      <label for="contact-subject" class="font-sans text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1.5 select-none">Assunto</label>
      <input type="text" id="contact-subject" required placeholder="Ex: Proposta de Estágio / Oportunidades" class="bg-white border border-slate-200 hover:border-slate-300 focus:border-blue-600 rounded-xl px-4 py-3.5 text-slate-800 placeholder-slate-400 focus:outline-none transition-all font-sans">
    </div>

    <div class="flex flex-col">
      <label for="contact-message" class="font-sans text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1.5 select-none">Mensagem</label>
      <textarea id="contact-message" rows="4" required placeholder="Escreva sua proposta ou mensagem detalhada aqui..." class="bg-white border border-slate-200 hover:border-slate-300 focus:border-blue-600 rounded-xl px-4 py-3.5 text-slate-800 placeholder-slate-400 focus:outline-none transition-all font-sans resize-none"></textarea>
    </div>

    <button type="submit" id="contact-submit-btn" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm shadow-blue-200">
      <i data-lucide="send" class="w-4 h-4"></i>
      <span>Enviar</span>
    </button>
  </form>
</div>
      </section>

    </main>

    <footer class="relative z-50 w-full border-t border-slate-200 bg-white py-12 text-center font-sans text-xs text-slate-550">
  <div class="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
    <p class="select-none">© 2026 Thiago Bianna Pessanha da Cruz.</p>
    
   <div class="flex items-center space-x-4 relative z-50">
  <a href="https://www.linkedin.com/in/thiagobpcruz/" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-blue-600 transition-colors block p-2" title="LinkedIn" style="cursor: pointer !important;">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
  </a>

  <a href="https://github.com/ThiagoBianna" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-slate-900 transition-colors block p-2" title="GitHub" style="cursor: pointer !important;">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
  </a>

  <a href="mailto:thgbianna@gmail.com" class="text-slate-400 hover:text-red-500 transition-colors block p-2" title="Enviar E-mail" style="cursor: pointer !important;">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  </a>
</div>
  </div>
</footer>


    <div id="cert-zoom-modal" class="hidden fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden max-w-2xl w-full relative shadow-2xl animate-fade-in">
        <div class="flex items-center justify-between p-4 border-b border-slate-100">
          <h3 id="cert-modal-title" class="text-sm font-semibold text-slate-800 font-sans">Visualizar Certificado</h3>
          <button id="close-modal-btn" class="text-slate-400 hover:text-slate-600 focus:outline-none p-1.5 hover:bg-slate-100 rounded-lg transition-all">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>
        <div id="cert-image-container" class="p-3 bg-slate-50 flex items-center justify-center aspect-video relative group overflow-hidden select-none">
          <img id="cert-modal-img" src="" alt="" class="max-h-96 max-w-full object-contain rounded-lg shadow-xs" referrerPolicy="no-referrer">
          <button type="button" id="cert-fullscreen-btn" class="absolute bottom-3 right-3 bg-black/75 hover:bg-black/95 text-white active:scale-95 p-2 rounded-lg transition-all focus:outline-none flex items-center justify-center cursor-pointer shadow-xs" title="Visualizar em Tela Cheia">
            <i data-lucide="maximize-2" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    </div>


    <div id="video-demo-modal" class="hidden fixed inset-0 bg-slate-950/75 backdrop-blur-md flex items-center justify-center z-50 p-4 select-none animate-fade-in">
      <div class="bg-white border border-slate-250 rounded-3xl overflow-hidden max-w-2xl w-full relative shadow-2xl transform transition-all duration-300">
        <div class="flex items-center justify-between p-5 border-b border-slate-100">
          <div>
            <h3 class="text-sm font-bold text-slate-900 font-sans flex items-center space-x-1.5">
              <i data-lucide="monitor" class="w-4 h-4 text-blue-600"></i>
              <span id="video-modal-label">Demonstração Completa</span>
            </h3>
            <p class="text-[9px] font-sans font-bold text-slate-400 uppercase tracking-widest mt-1">Conexão REST: JPA streaming source active</p>
          </div>
          <button id="close-video-modal-btn" class="text-slate-400 hover:text-slate-600 focus:outline-none p-1.5 hover:bg-slate-100 rounded-xl transition-all">
            <i data-lucide="x" class="w-4.5 h-4.5"></i>
          </button>
        </div>
        
        <div class="bg-slate-950 aspect-video flex items-center justify-center relative shadow-inner overflow-hidden" id="video-modal-player-container">
          </div>

        <div class="p-6 bg-white border-t border-slate-100">
          <h4 class="text-sm font-bold text-slate-900 font-sans" id="video-modal-proj-name">Project details</h4>
          <p class="text-xs text-slate-550 mt-1.5 leading-relaxed font-sans text-justify" id="video-modal-proj-desc">Detailed descriptions</p>
        </div>
      </div>
    </div>


    <div id="project-gallery-modal" class="hidden fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4 select-none animate-fade-in">
      <div class="bg-white border border-slate-200 rounded-3xl overflow-hidden max-w-xl w-full relative shadow-2xl transform transition-all duration-300 flex flex-col">
        <div class="flex items-center justify-between p-5 border-b border-slate-100">
          <div>
            <h3 class="text-sm font-bold text-slate-900 font-sans flex items-center space-x-1.5">
              <i data-lucide="images" class="w-4.5 h-4.5 text-blue-600"></i>
              <span id="gallery-modal-proj-name">Galeria do Projeto</span>
            </h3>
            <p class="text-[9px] font-sans font-semibold text-slate-400 uppercase tracking-widest mt-1">Explorador de Imagens (Até 5 fotos)</p>
          </div>
          <button id="close-gallery-modal-btn" class="text-slate-400 hover:text-slate-600 focus:outline-none p-1.5 hover:bg-slate-100 rounded-xl transition-all">
            <i data-lucide="x" class="w-4.5 h-4.5"></i>
          </button>
        </div>

        <div id="gallery-media-container" class="bg-slate-950 flex items-center justify-center relative aspect-video overflow-hidden group select-none w-full">
          <img id="gallery-modal-main-img" src="" alt="Projeto" class="max-h-96 max-w-full object-contain transition-all duration-350 select-none pointer-events-none" referrerPolicy="no-referrer">
          
          <button type="button" id="gallery-prev-btn" class="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-all focus:outline-none flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer">
            <i data-lucide="chevron-left" class="w-5 h-5"></i>
          </button>
          
          <button type="button" id="gallery-next-btn" class="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-all focus:outline-none flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer">
            <i data-lucide="chevron-right" class="w-5 h-5"></i>
          </button>

          <div class="absolute bottom-3 left-3 bg-black/75 px-2.5 py-1 rounded-lg text-[10px] text-white font-sans font-bold shadow-xs">
            <span id="gallery-current-idx">1</span> / <span id="gallery-total-count">1</span>
          </div>

          <button type="button" id="gallery-fullscreen-btn" class="absolute bottom-3 right-3 bg-black/75 hover:bg-black/95 text-white active:scale-95 p-2 rounded-lg transition-all focus:outline-none flex items-center justify-center cursor-pointer shadow-xs" title="Visualizar em Tela Cheia">
            <i data-lucide="maximize-2" class="w-4 h-4"></i>
          </button>
        </div>

        <div class="p-4 bg-slate-50 border-t border-slate-100 flex flex-col items-center justify-center">
          <div id="gallery-thumbnails-container" class="flex items-center justify-center space-x-2 overflow-x-auto py-1 max-w-full">
            </div>
        </div>
      </div>
    </div>


    <div id="project-desc-modal" class="hidden fixed inset-0 bg-slate-950/75 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
      <div class="bg-white border border-slate-200 rounded-3xl overflow-hidden max-w-xl w-full relative shadow-2xl transform transition-all duration-300 flex flex-col scale-95 md:scale-100">
        <div class="flex items-center justify-between p-5 border-b border-slate-100">
          <div>
            <h3 class="text-xs md:text-sm font-bold text-slate-900 font-sans flex items-center space-x-1.5">
              <i data-lucide="file-text" class="w-4.5 h-4.5 text-blue-600"></i>
              <span id="desc-modal-proj-name">Detalhes do Projeto</span>
            </h3>
            <p class="text-[9px] font-sans font-bold text-slate-400 uppercase tracking-widest mt-1">Descrição Completa</p>
          </div>
          <button id="close-desc-modal-btn" class="text-slate-400 hover:text-slate-600 focus:outline-none p-1.5 hover:bg-slate-100 rounded-xl transition-all cursor-pointer">
            <i data-lucide="x" class="w-4.5 h-4.5"></i>
          </button>
        </div>

        <div class="p-6 overflow-y-auto max-h-[50vh] text-xs md:text-sm text-slate-650 leading-relaxed text-justify font-sans whitespace-pre-wrap select-text" id="desc-modal-proj-text">
          </div>

        <div class="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button id="close-desc-modal-btn-bottom" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer">
            Fechar
          </button>
        </div>
      </div>
    </div>


    <div id="contact-toast" class="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 transform translate-y-12 opacity-0 pointer-events-none shrink bg-white border border-slate-200 text-slate-805 p-5 rounded-2xl shadow-2xl transition-all duration-300 z-50 max-w-sm flex items-start space-x-3.5">
      <div class="bg-blue-50 border border-blue-105 text-blue-600 p-2 rounded-xl shrink-0">
        <i data-lucide="mail-check" class="w-5 h-5"></i>
      </div>
      <div>
        <h4 class="text-xs font-bold font-sans text-slate-900">Mensagem Preparada!</h4>
        <p class="text-xs text-slate-550 mt-1 leading-relaxed" id="toast-message-body">Solicitação enviada para o seu aplicativo de e-mail.</p>
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
    triggs.forEach(t => {
      t.addEventListener('click', () => {
        const url = t.getAttribute('data-img-url');
        const title = t.getAttribute('data-title');
        modalImg.src = url;
        modalTitle.textContent = title;
        modal.classList.remove('hidden');
      });
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

  if (form && toast) {
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Impede que a página recarregue

      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const subject = document.getElementById('contact-subject').value;
      const message = document.getElementById('contact-message').value;

      const meuEmail = "thgbianna@gmail.com";
      const corpoEmail = `Nome completo: ${name}\nE-mail de contato: ${email}\n\nMensagem:\n${message}`;

      const assuntoFormatado = encodeURIComponent(subject);
      const corpoFormatado = encodeURIComponent(corpoEmail);

      const mailtoUrl = `mailto:${meuEmail}?subject=${assuntoFormatado}&body=${corpoFormatado}`;

      // Técnica para burlar o conflito da hash '#' na URL: target = "_blank"
      const tempLink = document.createElement('a');
      tempLink.href = mailtoUrl;
      tempLink.target = '_blank'; // Resolve o problema de rota do site
      tempLink.style.display = 'none';
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);

      // Limpa os campos do formulário
      form.reset();

      // Dispara o Toast avisando que deu certo e mandou pro app de e-mail
      toastBody.innerHTML = `Tudo pronto, <strong>${name}</strong>! O seu aplicativo de e-mail está sendo aberto para enviarmos a mensagem.`;
      toast.classList.remove('translate-y-12', 'opacity-0', 'pointer-events-none');
      toast.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');

      // Esconde o Toast depois de 5.5s
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
  window.updateStats = async function () {
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

  // Limpa a URL (remove as #) assim que o usuário clica em qualquer campo do formulário
  document.addEventListener('focusin', (e) => {
    if (e.target && e.target.closest('#portfolio-contact-form')) {
      if (window.location.hash) {
        window.history.pushState({}, document.title, window.location.pathname);
      }
    }
  });

  // 1. Limpa a URL assim que o usuário interage com o formulário
  document.addEventListener('focusin', (e) => {
    if (e.target && e.target.closest('#portfolio-contact-form')) {
      if (window.location.hash) {
        window.history.pushState({}, document.title, window.location.pathname);
      }
    }
  });

  // 2. Escutador do envio usando Delegação de Eventos (Bloqueio garantido contra refresh)
  document.addEventListener('submit', function (event) {
    // Verifica se o formulário disparado é o de contato
    if (event.target && event.target.id === 'portfolio-contact-form') {
      event.preventDefault(); // Trava o recarregamento na hora!

      const form = event.target;

      // Busca os valores dos inputs direto do formulário ativo
      const nome = form.querySelector('#contact-name').value;
      const emailUsuario = form.querySelector('#contact-email').value;
      const assuntoDigitado = form.querySelector('#contact-subject').value;
      const mensagemDigitada = form.querySelector('#contact-message').value;

      const meuEmail = "thgbianna@gmail.com";
      const corpoEmail = `Nome completo: ${nome}\nE-mail de contato: ${emailUsuario}\n\nMensagem:\n${mensagemDigitada}`;

      const assuntoFormatado = encodeURIComponent(assuntoDigitado);
      const corpoFormatado = encodeURIComponent(corpoEmail);

      const mailtoUrl = `mailto:${meuEmail}?subject=${assuntoFormatado}&body=${corpoFormatado}`;

      // Cria e dispara o link temporário para abrir o app de e-mail
      const tempLink = document.createElement('a');
      tempLink.href = mailtoUrl;
      tempLink.target = '_blank';
      tempLink.style.display = 'none';
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);

      // Limpa os campos do formulário para o usuário saber que deu certo
      form.reset();
    }
  });
} // <-- Aquela sua última chave fecha tudo aqui!