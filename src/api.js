/**
 * Dados Estáticos de Perfil Profissional - Thiago Bianna
 * Configuração estática central de todo o conteúdo exposto no portfólio.
 * Todas as alterações futuras de conteúdo podem ser realizadas diretamente neste arquivo.
 */

const initialProfile = {
  nome: "Thiago Bianna",
  cargo: "Estudante de Engenharia de Software | Desenvolvedor Backend Java",
  apresentacao: "Especialista em construir soluções robustas, escaláveis e eficientes com foco no ecossistema Java. Atualmente cursando Engenharia de Software e desenvolvendo APIs REST seguras e de alta performance utilizando Spring Boot 3, Hibernate e bancos de dados SQL.",
  fotoPerfil: "https://media.licdn.com/dms/image/v2/D4D03AQFzeqxaqnDzhQ/profile-displayphoto-scale_400_400/B4DZ2zcwK_JAAg-/0/1776832157571?e=1783555200&v=beta&t=PwgfyGW15H_UfHdqHVk0lft2bWDqlAn02h-5OkqgsT8",
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
    github: "https://github.com/ThiagoBianna",
    linkedin: "https://linkedin.com/in/thiago-bianna",
    whatsapp: "https://wa.me/5511999999999",
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
    linkGithub: "https://github.com/ThiagoBianna/microservices-banking",
    linkDemo: "http://banking.demo.thiagobianna.com",
    linkVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    videoPreview: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-computer-34193-large.mp4",
    dataCriacao: "2026-04-15",
    imagem: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600",
    imagens: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&q=80&w=600"
    ],
    status: "online"
  },
  {
    id: 2,
    nome: "Spring Security JWT Guard",
    descricao: "Template de autenticação de altíssima segurança implementado com Spring Security 6, filtros customizados, geração automática de JWTs com criptografia RSA 256 bits, rota de refresh token e prevenção de ataques CSRF/DDoS.",
    tecnologias: ["Spring Security 6", "JWT", "Java 21", "Redis", "H2 Database"],
    linkGithub: "https://github.com/ThiagoBianna/security-jwt-guard",
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
    linkGithub: "https://github.com/ThiagoBianna/health-scheduler",
    linkDemo: "http://agenda.saude.demo",
    linkVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    videoPreview: "https://assets.mixkit.co/videos/preview/mixkit-writing-code-on-a-laptop-40436-large.mp4",
    dataCriacao: "2026-02-28",
    imagem: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600",
    status: "online"
  },
  {
    id: 4,
    nome: "Enterprise Log Aggregator with Kafka",
    descricao: "Motor de coleta e filtragem em tempo real de logs distribuídos. Implementa múltiplos brokers Apache Kafka estruturados, consumidores reativos com Spring Boot, banco de dados PostgreSQL indexado para buscas e triggers de alertas automáticos via WebSockets.",
    tecnologias: ["Apache Kafka", "Spring Boot 3", "Docker", "PostgreSQL", "WebSockets"],
    linkGithub: "https://github.com/ThiagoBianna/kafka-log-aggregator",
    linkDemo: "",
    linkVideo: "",
    videoPreview: "https://assets.mixkit.co/videos/preview/mixkit-matrix-style-code-screen-background-34208-large.mp4",
    dataCriacao: "2026-06-05",
    imagem: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600",
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
    link: "https://www.alura.com.br",
    logoInstituicao: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
  },
  {
    id: 3,
    nome: "Docker & Kubernetes para Desenvolvedores Backend",
    instituicao: "Red Hat Developer Academy",
    data: "2026-01-10",
    imagem: "https://images.unsplash.com/photo-1605787020600-b9ebd5df1d07?auto=format&fit=crop&q=80&w=600",
    link: "https://www.redhat.com"
  },
  {
    id: 4,
    nome: "Apache Kafka Enterprise Messaging",
    instituicao: "Confluent University S/A",
    data: "2026-05-18",
    imagem: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
    link: "https://www.confluent.io",
    logoInstituicao: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg"
  }
];

const initialAcademics = [
  {
    id: 1,
    curso: "Bacharelado em Engenharia de Software",
    instituicao: "UNINTER Centro Universitário Internacional",
    periodo: "2024 - 2028 (Em andamento)",
    imagem: "https://media.licdn.com/dms/image/v2/D4D0BAQHrDUW2-Vq5iw/company-logo_200_200/B4DZuP0fiiGUAI-/0/1767644461719/grupo_uninter_logo?e=1783555200&v=beta&t=-JXAGlE1EjpHShrzqerHYyvuhdQpYZBB-q2cMcVJ4qc",
    descricao: "Formação integral focada em arquitetura de softwares empresarial, engenharia de requisitos, DevOps e desenvolvimento de microsserviços. Amplo foco na plataforma Java SE/EE e ecossistema de dados persistentes."
  }
];

const initialExperiences = [
  {
    id: 1,
    cargo: "Desenvolvedor Java Júnior",
    empresa: "FinTech Hub S/A",
    periodo: "Jan 2025 - Presente",
    descricao: "Atuação na sustentação e desenvolvimento contínuo de microsserviços e soluções financeiras utilizando o ecossistema robusto do Java 21, Spring Boot, Spring Security e JPA / Hibernate. Criação de consultas SQL otimizadas com PostgreSQL e implementação de testes automatizados unitários de cobertura ampla utilizando JUnit 5 e Mockito.",
    ordem: 0
  },
  {
    id: 2,
    cargo: "Estagiário em Engenharia de Software",
    empresa: "CodeCraft Solutions",
    periodo: "Mar 2024 - Dez 2025",
    descricao: "Suporte na modelagem lógica de bancos de dados relacionais e manutenção de controladores RESTful (APIs). Auxílio técnico no mapeamento relacional de entidades, revisão de código colaborativo integrado via GitHub e conteinerização de ambientes locais de testes utilizando Docker.",
    ordem: 1
  }
];

const initialStats = {
  projetosConcluidos: 14,
  certificados: 9,
  tecnologiasEstudadas: 18,
  horasEstudo: 520
};

// REST API CLIENT - Fornece dados estáticos síncronos imediatos
export const api = {
  getProfile: async () => {
    return initialProfile;
  },

  getStats: async () => {
    // Retorna estatísticas de perfil, agregando quantidade real de projetos e certificados
    let githubCommits = 1450;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);
      const res = await fetch(`https://api.github.com/search/commits?q=author:ThiagoBianna`, {
        headers: {
          'Accept': 'application/vnd.github.cloak-preview+json'
        },
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data.total_count === 'number') {
          githubCommits = data.total_count;
        }
      }
    } catch (err) {
      console.warn("Flipped fallback for GitHub commits fetch:", err);
    }

    return {
      projects: initialProjects.length + 1, // Total de projetos + 1
      certificates: initialCertificates.length,
      technologies: initialProfile.tecnologiasDominadas.length,
      githubCommits: githubCommits
    };
  },

  getProjects: async () => {
    return initialProjects;
  },

  getCertificates: async () => {
    return initialCertificates;
  },

  getAcademics: async () => {
    return initialAcademics;
  },

  getExperiences: async () => {
    return initialExperiences;
  }
};

export function getSeedsTechLogo(name) {
  if (!name) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg';
  const slug = name.toLowerCase().replace(/[\s\.\-\/\_\+]/g, '');
  if (slug.includes('java')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg';
  if (slug.includes('spring')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg';
  if (slug.includes('postgres')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg';
  if (slug.includes('docker')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg';
  if (slug.includes('git')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg';
  return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg';
}
