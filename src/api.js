/**
 * API Integration Layer simulating endpoints of a Spring Boot backend.
 * Provides live CRUD persistence using localStorage.
 * Outputs simulated Java 21 / Spring Boot 3 logs in the browser console.
 */

// Helper log function to simulate Spring Boot console outputs
function logSpringBoot(method, path, message, statusCode = "200") {
  const time = new Date().toISOString().replace('T', ' ').substring(0, 19);
  const pid = "2841";
  const thread = "nio-8080-exec-" + Math.floor(Math.random() * 8 + 1);
  const loggerName = "c.p.controller." + getLoggerByPath(path);
  
  // Color styling for console log
  let methodColor = "color: #2563eb; font-weight: bold;"; // Blue for GET
  if (method === "POST") methodColor = "color: #16a34a; font-weight: bold;"; // Green
  if (method === "PUT") methodColor = "color: #ca8a04; font-weight: bold;"; // Yellow
  if (method === "DELETE") methodColor = "color: #dc2626; font-weight: bold;"; // Red

  console.log(
    `%c${time}  INFO ${pid} --- [%-15s] %-40s : %c%-6s %s %c- Status: %s - %s`,
    "color: #858585;",
    thread,
    loggerName,
    methodColor,
    method,
    path,
    "color: #10b981; font-weight: bold;",
    statusCode,
    message
  );
}

function getLoggerByPath(path) {
  if (path.includes("/auth")) return "AuthController";
  if (path.includes("/projects")) return "ProjectController";
  if (path.includes("/certificates")) return "CertificateController";
  if (path.includes("/profile")) return "ProfileController";
  if (path.includes("/stats")) return "StatsController";
  if (path.includes("/experiences")) return "ExperienceController";
  return "AppController";
}

// Simulates network latency
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Safe local storage JSON parser
export function safeGetItem(key, defaultValue) {
  try {
    const val = localStorage.getItem(key);
    if (!val || val === "undefined" || val === "null") return defaultValue;
    return JSON.parse(val);
  } catch (e) {
    console.error(`Error parsing localStorage key "${key}":`, e);
    return defaultValue;
  }
}

// INITIAL SEED DATA
const initialProfile = {
  nome: "Thiago",
  cargo: "Estudante de Engenharia de Software | Desenvolvedor Backend Java",
  apresentacao: "Especialista em construir soluções robustas, escaláveis e eficientes com foco no ecossistema Java. Atualmente cursando Engenharia de Software e desenvolvendo APIs REST seguras e de alta performance utilizando Spring Boot 3, Hibernate e bancos de dados SQL.",
  fotoPerfil: "https://media.licdn.com/dms/image/v2/D4D22AQGBVcUTAn-dJQ/feedshare-image-high-res/B4DZ7fA.oAJsAU-/0/1781858036500?e=1783555200&v=beta&t=KvCj8mvwuwAuhtQPwCgXyCAk6jmY8J4q25FsRrfV7K4",
  fotoSobre: "https://media.licdn.com/dms/image/v2/D4D22AQGBVcUTAn-dJQ/feedshare-image-high-res/B4DZ7fA.oAJsAU-/0/1781858036500?e=1783555200&v=beta&t=KvCj8mvwuwAuhtQPwCgXyCAk6jmY8J4q25FsRrfV7K4",
  bio: "Como graduando em Engenharia de Software, direcionei meus estudos para a arquitetura de sistemas e o desenvolvimento backend de alto nível. Minha paixão está em desenhar e implementar APIs que resolvem problemas reais de negócios. Tenho forte domínio do ecossistema Spring (Security, Data, Cloud) e busco sempre alinhar meu código aos princípios de Clean Code, SOLID e testes automatizados robustos.",
  tecnologiasDominadas: [
    { nome: "Java 21", icone: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { nome: "Spring Boot 3", icone: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
    { nome: "Spring Data JPA", icone: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
    { nome: "Spring Security", icone: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
    { nome: "PostgreSQL", icone: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { nome: "Docker", icone: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { nome: "JUnit 5", icone: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { nome: "REST APIs", icone: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { nome: "Git/GitHub", icone: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { nome: "Flyway Migrations", icone: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" }
  ],
  tecnologiasEstudando: ["Apache Kafka", "Kubernetes", "AWS (S3, RDS, EC2)", "Spring Cloud", "TDD / Domain-Driven Design (DDD)", "CI/CD (GitHub Actions)"],
  links: {
    github: "https://github.com/gabriel-bianna",
    linkedin: "https://www.linkedin.com/in/thiagobpcruz/",
    whatsapp: "https://wa.me/5521999425820",
    email: "thgbianna@gmail.com",
    instagram: "https://instagram.com/thgbianna",
    curriculoPdf: "https://example.com/thiago-bianna-cv.pdf"
  },
  idiomas: [
    { nome: "Português", nivel: "Nativo", flag: "BR" },
    { nome: "Inglês", nivel: "Fluente / Avançado", flag: "US" }
  ]
};

const initialProjects = [
  {
    id: 1,
    nome: "Microservices Banking API",
    descricao: "Arquitetura distribuída simulando transações bancárias Pix e TED com processamento assíncrono. Utiliza Eureka Service Discovery, Spring Cloud Gateway, RabbitMQ para mensageria resiliente e PostgreSQL particionado por tenant.",
    tecnologias: ["Spring Cloud", "RabbitMQ", "PostgreSQL", "Eureka", "Docker"],
    linkGithub: "https://github.com/thiago-bianna/microservices-banking",
    linkDemo: "http://banking.demo.thiagobianna.com",
    linkVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    videoPreview: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-computer-34193-large.mp4",
    dataCriacao: "2026-04-15",
    imagem: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600",
    status: "online"
  },
  {
    id: 2,
    nome: "Spring Security JWT Guard",
    descricao: "Template de autenticação de altíssima segurança implementado com Spring Security 6, filtros customizados, geração automática de JWTs com criptografia RSA 256 bits, rota de refresh token e prevenção de ataques CSRF/DDoS.",
    tecnologias: ["Spring Security 6", "JWT", "Java 21", "Redis", "H2 Database"],
    linkGithub: "https://github.com/gabriel-bianna/security-jwt-guard",
    linkDemo: "",
    linkVideo: "",
    videoPreview: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-programmer-typing-on-a-keyboard-40541-large.mp4",
    dataCriacao: "2026-05-10",
    imagem: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600",
    status: "online"
  },
  {
    id: 3,
    nome: "Sistema de Agendamento da Saúde",
    descricao: "API RESTful resiliente para clínica médica com agendamento inteligente. Possui geração de relatórios PDF com OpenPDF, agendador automático que dispara lembretes de consultas via Email/WhatsApp (Twilio API) e testes unitários em JUnit 5.",
    tecnologias: ["Spring Boot 3", "Hibernate", "OpenPDF", "JUnit 5", "MySQL"],
    linkGithub: "https://github.com/gabriel-bianna/health-scheduler",
    linkDemo: "http://agenda.saude.demo",
    linkVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    videoPreview: "https://assets.mixkit.co/videos/preview/mixkit-writing-code-on-a-laptop-40436-large.mp4",
    dataCriacao: "2026-02-28",
    imagem: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600",
    status: "online"
  }
];

const initialCertificates = [
  {
    id: 1,
    nome: "Especialista Spring Boot 3 & Java 21",
    instituicao: "Udemy - Especialização Java Advanced",
    data: "2026-03-20",
    imagem: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600",
    link: "https://www.udemy.com"
  },
  {
    id: 2,
    nome: "Arquitetura de Microserviços baseada em Java",
    instituicao: "Alura Tech",
    data: "2025-11-14",
    imagem: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600",
    link: "https://www.alura.com.br"
  },
  {
    id: 3,
    nome: "Docker & Kubernetes para Desenvolvedores Backend",
    instituicao: "Red Hat Developer Academy",
    data: "2026-01-10",
    imagem: "https://images.unsplash.com/photo-1605787020600-b9ebd5df1d07?auto=format&fit=crop&q=80&w=600",
    link: "https://www.redhat.com"
  }
];

const initialAcademics = [
  {
    id: 1,
    curso: "Bacharelado em Engenharia de Software",
    instituicao: "FIAP - Faculdade de Informática e Administração Paulista",
    periodo: "2024 - 2028 (Em andamento)",
    imagem: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=200",
    descricao: "Formação integral focada em arquitetura de softwares empresarial, engenharia de requisitos, DevOps e desenvolvimento de microsserviços. Amplo foco na plataforma Java SE/EE e ecossistema de dados persistentes."
  }
];

const initialStats = {
  projetosConcluidos: 14,
  certificados: 9,
  tecnologiasEstudadas: 18,
  horasEstudo: 520
};

export function getSeedsTechLogo(name) {
  const lower = name.toLowerCase();
  if (lower.includes('java 21') || lower.includes('java')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg';
  if (lower.includes('spring boot') || lower.includes('spring')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg';
  if (lower.includes('jpa') || lower.includes('hibernate')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg';
  if (lower.includes('postgres')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg';
  if (lower.includes('docker')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg';
  if (lower.includes('git')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg';
  if (lower.includes('junit')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg';
  if (lower.includes('kafka')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg';
  if (lower.includes('aws') || lower.includes('cloud')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg';
  return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg';
}

// Initialize localStorage if not set
const storedProfile = localStorage.getItem("portfolio_profile");
if (!storedProfile) {
  localStorage.setItem("portfolio_profile", JSON.stringify(initialProfile));
} else {
  try {
    const prof = JSON.parse(storedProfile);
    let updated = false;
    if (!prof.links) {
      prof.links = {};
      updated = true;
    }
    if (!prof.links.curriculoPdf) {
      prof.links.curriculoPdf = "https://example.com/gabriel-bianna-cv.pdf";
      updated = true;
    }
    if (!prof.links.instagram) {
      prof.links.instagram = "https://instagram.com/thgbianna";
      updated = true;
    }
    if (prof.tecnologiasDominadas) {
      prof.tecnologiasDominadas = prof.tecnologiasDominadas.map(tech => {
        if (typeof tech === 'string') {
          updated = true;
          return { nome: tech, icone: getSeedsTechLogo(tech) };
        }
        return tech;
      });
    }
    if (!prof.fotoSobre) {
      prof.fotoSobre = prof.fotoPerfil || "https://media.licdn.com/dms/image/v2/D4D22AQGBVcUTAn-dJQ/feedshare-image-high-res/B4DZ7fA.oAJsAU-/0/1781858036500?e=1783555200&v=beta&t=KvCj8mvwuwAuhtQPwCgXyCAk6jmY8J4q25FsRrfV7K4";
      updated = true;
    }
    if (!prof.idiomas) {
      prof.idiomas = [
        { nome: "Português", nivel: "Nativo", flag: "BR" },
        { nome: "Inglês", nivel: "Fluente / Avançado", flag: "US" }
      ];
      updated = true;
    }
    if (updated) {
      localStorage.setItem("portfolio_profile", JSON.stringify(prof));
    }
  } catch (err) {
    console.error("Profile storage migration failed", err);
  }
}

const storedProjects = localStorage.getItem("portfolio_projects");
if (!storedProjects) {
  localStorage.setItem("portfolio_projects", JSON.stringify(initialProjects));
} else {
  try {
    const projs = JSON.parse(storedProjects);
    let updated = false;
    const migrated = projs.map(p => {
      if (p.videoPreview === undefined) {
        updated = true;
        if (p.id === 1 || (p.nome && p.nome.includes("Banking"))) {
          p.videoPreview = "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-computer-34193-large.mp4";
        } else if (p.id === 2 || (p.nome && p.nome.includes("JWT"))) {
          p.videoPreview = "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-programmer-typing-on-a-keyboard-40541-large.mp4";
        } else if (p.id === 3 || (p.nome && (p.nome.includes("Agendamento") || p.nome.includes("Saúde")))) {
          p.videoPreview = "https://assets.mixkit.co/videos/preview/mixkit-writing-code-on-a-laptop-40436-large.mp4";
        } else {
          p.videoPreview = "";
        }
      }
      if (p.status === undefined) {
        updated = true;
        p.status = "online";
      }
      return p;
    });
    if (updated) {
      localStorage.setItem("portfolio_projects", JSON.stringify(migrated));
    }
  } catch (e) {
    console.error("Failed to migrate projects storage for preview videos", e);
  }
}
if (!localStorage.getItem("portfolio_certificates")) {
  localStorage.setItem("portfolio_certificates", JSON.stringify(initialCertificates));
}
if (!localStorage.getItem("portfolio_stats")) {
  localStorage.setItem("portfolio_stats", JSON.stringify(initialStats));
}
if (!localStorage.getItem("portfolio_academics")) {
  localStorage.setItem("portfolio_academics", JSON.stringify(initialAcademics));
}
if (!localStorage.getItem("portfolio_experiences")) {
  localStorage.setItem("portfolio_experiences", JSON.stringify([]));
}

// REST API CLIENT
export const api = {
  /**
   * AUTHENTICATION ENDPOINTS
   * Simulates POST /api/auth/login
   */
  login: async (username, password) => {
    await delay(600); // realistic latency
    
    // In Spring Boot, this would map to AuthController.java
    // e.g., @PostMapping("/api/auth/login") returns ResponseEntity<TokenDto>
    if (username === "admin" && password === "admin123") {
      const mockToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY4NjUzOTYwMCwiZXhwIjoxNjg2NTc1NjAwfQ.mockSpringJwtTokenSignature";
      localStorage.setItem("admin_token", mockToken);
      logSpringBoot("POST", "/api/auth/login", `User '${username}' authenticated successfully. Jwt Token issued.`, "200 OK");
      return { token: mockToken };
    } else {
      logSpringBoot("POST", "/api/auth/login", `Failed authentication attempt for user '${username}'. Bad credentials.`, "401 UNAUTHORIZED");
      throw new Error("Usuário ou senha incorretos.");
    }
  },

  logout: () => {
    localStorage.removeItem("admin_token");
    logSpringBoot("POST", "/api/auth/logout", "User session invalidated. Token deleted from client.", "200 OK");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("admin_token");
  },

  /**
   * PROFILE ENDPOINTS
   * Simulates GET /api/profile and PUT /api/profile
   */
  getProfile: async () => {
    await delay(200);
    const data = JSON.parse(localStorage.getItem("portfolio_profile"));
    logSpringBoot("GET", "/api/profile", "Fetched public developer profile information.", "200 OK");
    return data;
  },

  updateProfile: async (profileData) => {
    await delay(400);
    // Mimics Form-data payload or JSON PUT mapping request body
    // e.g., @PutMapping("/api/profile") public ResponseEntity<Profile> update(...)
    localStorage.setItem("portfolio_profile", JSON.stringify(profileData));
    logSpringBoot("PUT", "/api/profile", "Successfully updated profile information. JPA Hibernate dirty saving completed.", "200 OK");
    return profileData;
  },

  /**
   * STATISTICS ENDPOINTS
   * Simulates GET /api/stats (dynamically computed)
   * 
   * In Spring Boot, this maps to:
   * GET /api/stats
   * 
   * Controller Example:
   * @GetMapping("/api/stats")
   * public ResponseEntity<StatsDto> getStats() {
   *     return ResponseEntity.ok(statsService.getDynamicStats());
   * }
   * 
   * Response format:
   * {
   *   "projects": 8,
   *   "certificates": 12,
   *   "technologies": 15,
   *   "githubCommits": 1450
   * }
   */
  getStats: async () => {
    await delay(150);
    
    // Calculate values on demand
    const projs = JSON.parse(localStorage.getItem("portfolio_projects")) || [];
    const certs = JSON.parse(localStorage.getItem("portfolio_certificates")) || [];
    const prof = JSON.parse(localStorage.getItem("portfolio_profile")) || { tecnologiasDominadas: [] };
    
    // Count of technologies
    const techCount = prof.tecnologiasDominadas ? prof.tecnologiasDominadas.length : 0;
    
    // Fetch live GitHub commits for user 'ThiagoBianna'
    let githubCommits = 1450; // Fallback default value
    try {
      const cached = localStorage.getItem("github_commits_cache");
      const cachedTime = localStorage.getItem("github_commits_cache_time");
      
      // Cache for 10 minutes to stay clear of unauthenticated rate limit
      if (cached && cachedTime && (Date.now() - Number(cachedTime) < 1000 * 60 * 10)) {
        githubCommits = Number(cached);
      } else {
        const response = await fetch("https://api.github.com/search/commits?q=author:ThiagoBianna", {
          headers: {
            "Accept": "application/vnd.github.cloak-preview"
          },
          signal: AbortSignal.timeout ? AbortSignal.timeout(3000) : undefined // 3 seconds timeout
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data && typeof data.total_count === 'number') {
            githubCommits = data.total_count;
            localStorage.setItem("github_commits_cache", githubCommits.toString());
            localStorage.setItem("github_commits_cache_time", Date.now().toString());
          }
        } else {
          console.warn("GitHub search API returned status " + response.status + ". Using fallback/cache.");
          if (cached) githubCommits = Number(cached);
        }
      }
    } catch (err) {
      console.warn("Could not load github commits dynamically. Using cached/fallback.", err);
      const cached = localStorage.getItem("github_commits_cache");
      if (cached) githubCommits = Number(cached);
    }

    const statsData = {
      projects: projs.length + 1,
      certificates: certs.length,
      technologies: techCount,
      githubCommits: githubCommits
    };

    logSpringBoot("GET", "/api/stats", `Recalculated dynamic stats on access: values=${JSON.stringify(statsData)}`, "200 OK");
    return statsData;
  },

  updateStats: async (statsData) => {
    await delay(200);
    logSpringBoot("PUT", "/api/stats", "Dynamic calculations override. Portfolios stats flushed.", "200 OK");
    return statsData;
  },

  /**
   * PROJECTS SERVICE - CRUD
   * Simulates GET /api/projects, POST /api/projects, PUT /api/projects/{id}, DELETE /api/projects/{id}
   */
  getProjects: async () => {
    await delay(250);
    const data = JSON.parse(localStorage.getItem("portfolio_projects")) || [];
    logSpringBoot("GET", "/api/projects", `Retrieved list of ${data.length} projects from database.`, "200 OK");
    return data.sort((a, b) => {
      const oA = typeof a.ordem === 'number' ? a.ordem : 0;
      const oB = typeof b.ordem === 'number' ? b.ordem : 0;
      if (oA !== oB) return oA - oB;
      return b.id - a.id;
    });
  },

  createProject: async (formData) => {
    await delay(450);
    // In Spring, we receive MultipartFile + JSON representation or request parameters
    // e.g., @PostMapping(value = "/api/projects", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    const projects = JSON.parse(localStorage.getItem("portfolio_projects")) || [];
    
    // Process up to 5 project images
    const imgSlots = [];
    for (let i = 1; i <= 5; i++) {
      let slotImage = "";
      const file = formData.get(`imagemFile_${i}`);
      if (file && file.size > 0) {
        slotImage = await convertFileToBase64(file);
      } else {
        const urlVal = formData.get(`imagem_${i}`);
        if (urlVal) {
          slotImage = urlVal.trim();
        }
      }
      if (slotImage) {
        imgSlots.push(slotImage);
      }
    }

    // Default if absolutely everything is empty
    if (imgSlots.length === 0) {
      imgSlots.push("https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=600");
    }

    const newProj = {
      id: Date.now(), // Simulating JPA auto increment sequence
      nome: formData.get("nome"),
      descricao: formData.get("descricao"),
      tecnologias: formData.get("tecnologias").split(",").map(t => t.trim()).filter(Boolean),
      linkGithub: formData.get("linkGithub") || "",
      linkDemo: formData.get("linkDemo") || "",
      linkVideo: formData.get("linkVideo") || "",
      videoPreview: formData.get("videoPreview") || "",
      dataCriacao: formData.get("dataCriacao") || "",
      imagem: imgSlots[0],
      imagens: imgSlots,
      status: formData.get("status") || "online"
    };

    projects.push(newProj);
    localStorage.setItem("portfolio_projects", JSON.stringify(projects));
    logSpringBoot("POST", `/api/projects`, `Entity Project saved with ID: ${newProj.id}. Saved ${imgSlots.length} images. Hibernate transaction committed.`, "201 CREATED");
    return newProj;
  },

  updateProject: async (id, formData) => {
    await delay(450);
    const projects = JSON.parse(localStorage.getItem("portfolio_projects")) || [];
    const index = projects.findIndex(p => p.id === Number(id));
    if (index === -1) {
      logSpringBoot("PUT", `/api/projects/${id}`, "Entity not found. Transaction aborted.", "404 NOT FOUND");
      throw new Error(`Project ${id} not found`);
    }

    // Process up to 5 project images
    const imgSlots = [];
    for (let i = 1; i <= 5; i++) {
      let slotImage = "";
      const file = formData.get(`imagemFile_${i}`);
      if (file && file.size > 0) {
        slotImage = await convertFileToBase64(file);
      } else {
        const urlVal = formData.get(`imagem_${i}`);
        if (urlVal) {
          slotImage = urlVal.trim();
        }
      }
      if (slotImage) {
        imgSlots.push(slotImage);
      }
    }

    // Fallback if empty but had previous images
    if (imgSlots.length === 0) {
      if (projects[index].imagens && projects[index].imagens.length > 0) {
        imgSlots.push(...projects[index].imagens);
      } else if (projects[index].imagem) {
        imgSlots.push(projects[index].imagem);
      } else {
        imgSlots.push("https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=600");
      }
    }

    projects[index] = {
      ...projects[index],
      nome: formData.get("nome"),
      descricao: formData.get("descricao"),
      tecnologias: formData.get("tecnologias").split(",").map(t => t.trim()).filter(Boolean),
      linkGithub: formData.get("linkGithub") || "",
      linkDemo: formData.get("linkDemo") || "",
      linkVideo: formData.get("linkVideo") || "",
      videoPreview: formData.get("videoPreview") || "",
      dataCriacao: formData.get("dataCriacao") !== null ? formData.get("dataCriacao") : "",
      imagem: imgSlots[0],
      imagens: imgSlots,
      status: formData.get("status") || "online"
    };

    localStorage.setItem("portfolio_projects", JSON.stringify(projects));
    logSpringBoot("PUT", `/api/projects/${id}`, `Entity Project ${id} merged and database successfully flushed. Saved ${imgSlots.length} images.`, "200 OK");
    return projects[index];
  },

  deleteProject: async (id) => {
    await delay(350);
    let projects = JSON.parse(localStorage.getItem("portfolio_projects")) || [];
    const sizeBefore = projects.length;
    projects = projects.filter(p => p.id !== Number(id));
    
    if (projects.length === sizeBefore) {
      logSpringBoot("DELETE", `/api/projects/${id}`, "Entity not found for deletion. Rollback.", "404 NOT FOUND");
      throw new Error(`Project ${id} not found`);
    }

    localStorage.setItem("portfolio_projects", JSON.stringify(projects));
    logSpringBoot("DELETE", `/api/projects/${id}`, `Entity Project ${id} deleted successfully. Cascading keys completed.`, "204 NO CONTENT");
    return true;
  },

  reorderProject: async (id, direction) => {
    await delay(100);
    const list = JSON.parse(localStorage.getItem("portfolio_projects")) || [];
    list.sort((a, b) => {
      const oA = typeof a.ordem === 'number' ? a.ordem : 0;
      const oB = typeof b.ordem === 'number' ? b.ordem : 0;
      if (oA !== oB) return oA - oB;
      return b.id - a.id;
    });

    list.forEach((proj, idx) => {
      proj.ordem = idx;
    });

    const curIndex = list.findIndex(p => p.id === Number(id));
    if (curIndex !== -1) {
      if (direction === 'up' && curIndex > 0) {
        const temp = list[curIndex].ordem;
        list[curIndex].ordem = list[curIndex - 1].ordem;
        list[curIndex - 1].ordem = temp;
      } else if (direction === 'down' && curIndex < list.length - 1) {
        const temp = list[curIndex].ordem;
        list[curIndex].ordem = list[curIndex + 1].ordem;
        list[curIndex + 1].ordem = temp;
      }
    }
    localStorage.setItem("portfolio_projects", JSON.stringify(list));
    logSpringBoot("POST", `/api/projects/reorder/${id}`, `Project reordered direction: ${direction}.`, "200 OK");
    return true;
  },

  /**
   * CERTIFICATES SERVICE - CRUD
   * Simulates GET /api/certificates, POST /api/certificates, PUT /api/certificates/{id}, DELETE /api/certificates/{id}
   */
  getCertificates: async () => {
    await delay(200);
    const data = JSON.parse(localStorage.getItem("portfolio_certificates")) || [];
    logSpringBoot("GET", "/api/certificates", `Retrieved ${data.length} credential entities.`, "200 OK");
    return data.sort((a, b) => {
      const oA = typeof a.ordem === 'number' ? a.ordem : 0;
      const oB = typeof b.ordem === 'number' ? b.ordem : 0;
      if (oA !== oB) return oA - oB;
      return b.id - a.id;
    });
  },

  createCertificate: async (formData) => {
    await delay(400);
    const certificates = JSON.parse(localStorage.getItem("portfolio_certificates")) || [];
    
    let fileImage = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600";
    if (formData.get("imagemFile")) {
      const file = formData.get("imagemFile");
      if (file && file.size > 0) {
        fileImage = await convertFileToBase64(file);
      }
    } else if (formData.get("imagem")) {
      fileImage = formData.get("imagem");
    }

    let schoolLogo = "";
    if (formData.get("logoInstituicaoFile")) {
      const file = formData.get("logoInstituicaoFile");
      if (file && file.size > 0) {
        schoolLogo = await convertFileToBase64(file);
      }
    } else if (formData.get("logoInstituicao")) {
      schoolLogo = formData.get("logoInstituicao");
    }

    const newCert = {
      id: Date.now(),
      nome: formData.get("nome"),
      instituicao: formData.get("instituicao"),
      data: formData.get("data") || new Date().toISOString().substring(0, 7),
      link: formData.get("link") || "",
      imagem: fileImage,
      logoInstituicao: schoolLogo
    };

    certificates.push(newCert);
    localStorage.setValue ? localStorage.setValue() : null; // redundant check
    localStorage.setItem("portfolio_certificates", JSON.stringify(certificates));
    logSpringBoot("POST", "/api/certificates", `Credential entity saved with ID: ${newCert.id}. Attached logo: ${!!schoolLogo}`, "201 CREATED");
    return newCert;
  },

  updateCertificate: async (id, formData) => {
    await delay(400);
    const certificates = JSON.parse(localStorage.getItem("portfolio_certificates")) || [];
    const index = certificates.findIndex(c => c.id === Number(id));
    if (index === -1) {
      logSpringBoot("PUT", `/api/certificates/${id}`, "Credential entry not found.", "404 NOT FOUND");
      throw new Error(`Certificate ${id} not found`);
    }

    let fileImage = certificates[index].imagem;
    if (formData.get("imagemFile")) {
      const file = formData.get("imagemFile");
      if (file && file.size > 0) {
        fileImage = await convertFileToBase64(file);
      }
    } else if (formData.get("imagem")) {
      fileImage = formData.get("imagem");
    }

    let schoolLogo = certificates[index].logoInstituicao || "";
    if (formData.get("logoInstituicaoFile")) {
      const file = formData.get("logoInstituicaoFile");
      if (file && file.size > 0) {
        schoolLogo = await convertFileToBase64(file);
      }
    } else if (formData.get("logoInstituicao")) {
      schoolLogo = formData.get("logoInstituicao");
    }

    certificates[index] = {
      ...certificates[index],
      nome: formData.get("nome"),
      instituicao: formData.get("instituicao"),
      data: formData.get("data") || certificates[index].data,
      link: formData.get("link") || "",
      imagem: fileImage,
      logoInstituicao: schoolLogo
    };

    localStorage.setItem("portfolio_certificates", JSON.stringify(certificates));
    logSpringBoot("PUT", `/api/certificates/${id}`, `Credential entity ${id} updated. Attached logo: ${!!schoolLogo}`, "200 OK");
    return certificates[index];
  },

  deleteCertificate: async (id) => {
    await delay(300);
    let certificates = JSON.parse(localStorage.getItem("portfolio_certificates")) || [];
    const sizeBefore = certificates.length;
    certificates = certificates.filter(c => c.id !== Number(id));

    if (certificates.length === sizeBefore) {
      logSpringBoot("DELETE", `/api/certificates/${id}`, "Entity not found for deletion.", "404 NOT FOUND");
      throw new Error(`Certificate ${id} not found`);
    }

    localStorage.setItem("portfolio_certificates", JSON.stringify(certificates));
    logSpringBoot("DELETE", `/api/certificates/${id}`, `Credential ${id} removed.`, "204 NO CONTENT");
    return true;
  },

  reorderCertificate: async (id, direction) => {
    await delay(100);
    const list = JSON.parse(localStorage.getItem("portfolio_certificates")) || [];
    list.sort((a, b) => {
      const oA = typeof a.ordem === 'number' ? a.ordem : 0;
      const oB = typeof b.ordem === 'number' ? b.ordem : 0;
      if (oA !== oB) return oA - oB;
      return b.id - a.id;
    });

    list.forEach((cert, idx) => {
      cert.ordem = idx;
    });

    const curIndex = list.findIndex(c => c.id === Number(id));
    if (curIndex !== -1) {
      if (direction === 'up' && curIndex > 0) {
        const temp = list[curIndex].ordem;
        list[curIndex].ordem = list[curIndex - 1].ordem;
        list[curIndex - 1].ordem = temp;
      } else if (direction === 'down' && curIndex < list.length - 1) {
        const temp = list[curIndex].ordem;
        list[curIndex].ordem = list[curIndex + 1].ordem;
        list[curIndex + 1].ordem = temp;
      }
    }
    localStorage.setItem("portfolio_certificates", JSON.stringify(list));
    logSpringBoot("POST", `/api/certificates/reorder/${id}`, `Certificate reordered direction: ${direction}.`, "200 OK");
    return true;
  },

  /**
   * ACADEMICS SERVICE - CRUD
   * Simulates GET /api/academics, POST /api/academics, PUT /api/academics/{id}, DELETE /api/academics/{id}
   */
  getAcademics: async () => {
    await delay(200);
    const data = safeGetItem("portfolio_academics", []);
    logSpringBoot("GET", "/api/academics", `Retrieved ${data.length} academic education entities.`, "200 OK");
    return data.sort((a, b) => b.id - a.id);
  },

  createAcademic: async (formData) => {
    await delay(400);
    const academics = safeGetItem("portfolio_academics", []);

    let fileImage = "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600";
    if (formData.get("imagemFile")) {
      const file = formData.get("imagemFile");
      if (file && file.size > 0) {
        fileImage = await convertFileToBase64(file);
      }
    } else if (formData.get("imagem")) {
      fileImage = formData.get("imagem");
    }

    let diplomaSource = "";
    if (formData.get("diplomaFile")) {
      const file = formData.get("diplomaFile");
      if (file && file.size > 0) {
        diplomaSource = await convertFileToBase64(file);
      }
    } else if (formData.get("diploma")) {
      diplomaSource = formData.get("diploma");
    }

    const newAcad = {
      id: Date.now(),
      curso: formData.get("curso"),
      instituicao: formData.get("instituicao"),
      periodo: formData.get("periodo"),
      descricao: formData.get("descricao"),
      imagem: fileImage,
      diploma: diplomaSource
    };

    academics.push(newAcad);
    localStorage.setItem("portfolio_academics", JSON.stringify(academics));
    logSpringBoot("POST", "/api/academics", `Academic background entity saved with ID: ${newAcad.id}. Attached diploma: ${!!diplomaSource}`, "201 CREATED");
    return newAcad;
  },

  updateAcademic: async (id, formData) => {
    await delay(400);
    const academics = safeGetItem("portfolio_academics", []);
    const index = academics.findIndex(c => c.id === Number(id));
    if (index === -1) {
      logSpringBoot("PUT", `/api/academics/${id}`, "Academic background entry not found.", "404 NOT FOUND");
      throw new Error(`Academic education ${id} not found`);
    }

    let fileImage = academics[index].imagem;
    if (formData.get("imagemFile")) {
      const file = formData.get("imagemFile");
      if (file && file.size > 0) {
        fileImage = await convertFileToBase64(file);
      }
    } else if (formData.get("imagem")) {
      fileImage = formData.get("imagem");
    }

    let diplomaSource = academics[index].diploma || "";
    if (formData.get("diplomaFile")) {
      const file = formData.get("diplomaFile");
      if (file && file.size > 0) {
        diplomaSource = await convertFileToBase64(file);
      }
    } else if (formData.get("diploma")) {
      diplomaSource = formData.get("diploma");
    }

    academics[index] = {
      ...academics[index],
      curso: formData.get("curso"),
      instituicao: formData.get("instituicao"),
      periodo: formData.get("periodo"),
      descricao: formData.get("descricao"),
      imagem: fileImage,
      diploma: diplomaSource
    };

    localStorage.setItem("portfolio_academics", JSON.stringify(academics));
    logSpringBoot("PUT", `/api/academics/${id}`, `Academic background entity ${id} updated. Attached diploma: ${!!diplomaSource}`, "200 OK");
    return academics[index];
  },

  deleteAcademic: async (id) => {
    await delay(305);
    let academics = safeGetItem("portfolio_academics", []);
    const sizeBefore = academics.length;
    academics = academics.filter(c => c.id !== Number(id));

    if (academics.length === sizeBefore) {
      logSpringBoot("DELETE", `/api/academics/${id}`, "Entity not found for deletion.", "404 NOT FOUND");
      throw new Error(`Academic background ${id} not found`);
    }

    localStorage.setItem("portfolio_academics", JSON.stringify(academics));
    logSpringBoot("DELETE", `/api/academics/${id}`, `Academic background entity ${id} removed.`, "204 NO CONTENT");
    return true;
  },

  /**
   * EXPERIENCES SERVICE - CRUD
   * Simulates GET /api/experiences, POST /api/experiences, PUT /api/experiences/{id}, DELETE /api/experiences/{id}
   */
  getExperiences: async () => {
    await delay(200);
    const data = JSON.parse(localStorage.getItem("portfolio_experiences")) || [];
    logSpringBoot("GET", "/api/experiences", `Retrieved ${data.length} experience entities.`, "200 OK");
    return data.sort((a, b) => {
      const oA = typeof a.ordem === 'number' ? a.ordem : 0;
      const oB = typeof b.ordem === 'number' ? b.ordem : 0;
      if (oA !== oB) return oA - oB;
      return b.id - a.id;
    });
  },

  createExperience: async (payload) => {
    await delay(350);
    const experiences = JSON.parse(localStorage.getItem("portfolio_experiences")) || [];

    const getVal = (key) => {
      if (payload && typeof payload.get === 'function') {
        return payload.get(key) || "";
      }
      return payload ? payload[key] : "";
    };

    const newExp = {
      id: Date.now(),
      cargo: getVal("cargo"),
      empresa: getVal("empresa"),
      periodo: getVal("periodo"),
      descricao: getVal("descricao"),
      ordem: experiences.length
    };

    experiences.push(newExp);
    localStorage.setItem("portfolio_experiences", JSON.stringify(experiences));
    logSpringBoot("POST", "/api/experiences", `Experience entity saved with ID: ${newExp.id}`, "201 CREATED");
    return newExp;
  },

  updateExperience: async (id, payload) => {
    await delay(350);
    const experiences = JSON.parse(localStorage.getItem("portfolio_experiences")) || [];
    const index = experiences.findIndex(e => e.id === Number(id));
    if (index === -1) {
      logSpringBoot("PUT", `/api/experiences/${id}`, "Experience entry not found.", "404 NOT FOUND");
      throw new Error(`Experience ${id} not found`);
    }

    const getVal = (key) => {
      if (payload && typeof payload.get === 'function') {
        return payload.get(key) || "";
      }
      return payload ? payload[key] : "";
    };

    experiences[index] = {
      ...experiences[index],
      cargo: getVal("cargo"),
      empresa: getVal("empresa"),
      periodo: getVal("periodo"),
      descricao: getVal("descricao")
    };

    localStorage.setItem("portfolio_experiences", JSON.stringify(experiences));
    logSpringBoot("PUT", `/api/experiences/${id}`, `Experience entity ${id} updated.`, "200 OK");
    return experiences[index];
  },

  deleteExperience: async (id) => {
    await delay(300);
    let experiences = JSON.parse(localStorage.getItem("portfolio_experiences")) || [];
    const sizeBefore = experiences.length;
    experiences = experiences.filter(e => e.id !== Number(id));

    if (experiences.length === sizeBefore) {
      logSpringBoot("DELETE", `/api/experiences/${id}`, "Entity not found for deletion.", "404 NOT FOUND");
      throw new Error(`Experience ${id} not found`);
    }

    localStorage.setItem("portfolio_experiences", JSON.stringify(experiences));
    logSpringBoot("DELETE", `/api/experiences/${id}`, `Experience ${id} removed.`, "204 NO CONTENT");
    return true;
  },

  reorderExperience: async (id, direction) => {
    await delay(100);
    const list = JSON.parse(localStorage.getItem("portfolio_experiences")) || [];
    list.sort((a, b) => {
      const oA = typeof a.ordem === 'number' ? a.ordem : 0;
      const oB = typeof b.ordem === 'number' ? b.ordem : 0;
      if (oA !== oB) return oA - oB;
      return b.id - a.id;
    });

    list.forEach((exp, idx) => {
      exp.ordem = idx;
    });

    const curIndex = list.findIndex(e => e.id === Number(id));
    if (curIndex !== -1) {
      if (direction === 'up' && curIndex > 0) {
        const temp = list[curIndex].ordem;
        list[curIndex].ordem = list[curIndex - 1].ordem;
        list[curIndex - 1].ordem = temp;
      } else if (direction === 'down' && curIndex < list.length - 1) {
        const temp = list[curIndex].ordem;
        list[curIndex].ordem = list[curIndex + 1].ordem;
        list[curIndex + 1].ordem = temp;
      }
    }
    localStorage.setItem("portfolio_experiences", JSON.stringify(list));
    logSpringBoot("POST", `/api/experiences/reorder/${id}`, `Experience reordered direction: ${direction}.`, "200 OK");
    return true;
  }
};

// Utilities for simulation
export function convertFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result;
      if (file.type && file.type.startsWith('image/')) {
        const img = new Image();
        img.src = base64;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDim = 320; // 320px is perfect for logos/certificates
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', 0.7)); // Compress to JPEG with 70% quality
          } else {
            resolve(base64);
          }
        };
        img.onerror = () => resolve(base64);
      } else {
        resolve(base64);
      }
    };
    reader.onerror = (error) => reject(error);
  });
}
