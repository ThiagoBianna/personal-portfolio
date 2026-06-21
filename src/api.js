/**
 * Dados Estáticos de Perfil Profissional - Thiago Bianna
 * Configuração estática central de todo o conteúdo exposto no portfólio.
 * Todas as alterações futuras de conteúdo podem ser realizadas diretamente neste arquivo.
 */

const initialProfile = {
  nome: "Thiago",
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
    linkedin: "https://linkedin.com/in/thiagobpcruz/",
    whatsapp: "https://wa.me/5521999425820",
    email: "thgbianna@gmail.com",
    instagram: "https://instagram.com/hutzdon",
    curriculoPdf: "https://drive.google.com/uc?export=download&id=1mJCaogP8VARFMDJgxbCXha14BkB2W1Qq"
  },
  idiomas: [
    { nome: "Português", nivel: "Nativo", flag: "BR" },
    { nome: "Inglês", nivel: "Avançado", flag: "US" }
  ]
};

const initialProjects = [
  {
    id: 1,
    nome: "PDF Magic Editor",
    descricao: "Um editor de PDFs que permite que os usuários editem e gerenciem seus arquivos PDFs Online de forma simples e eficiente. Apague, mude, recrie. Modifique arquivos sem bagunçar nada. Garantindo que seu PDF continue com um visual profissional após edição. ",
    tecnologias: ["HTML", "CSS", "JavaScript", "TypeScript"],
    linkGithub: "https://github.com/ThiagoBianna/PDF-MAGIC-EDITOR.git",
    linkDemo: "http://banking.demo.thiagobianna.com",
    linkVideo: "https://www.youtube.com/watch?v=7S4i2_EJ_hI",
    videoPreview: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-programmer-typing-on-a-keyboard-40541-large.mp4",
    dataCriacao: " ",
    imagem: "https://pdf-magic-editor-omega.vercel.app/assets/app_logo_fullbleed_1781584776838-Dg5g4VNi.jpg",
    imagens: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&q=80&w=600"
    ],
    status: "online"
  },
  {
    id: 2,
    nome: "Viewer de Desempenho Acadêmico - Uninter",
    descricao: "Aplicação Web para Otimização e Análise de CR\n" +
        "\n" +
        "Desenvolvi o UninterAnalytics, uma aplicação web SPA criada para acompanhar e gerenciar o histórico acadêmico de forma precisa, transparente e automatizada. \n" +
        "\n" +
        "O sistema calcula o Coeficiente de Rendimento (CR) global e por disciplina, aplicando as regras de ponderação de notas institucionais (15% APOL 1, 15% APOL 2 e 70% Exame Final).\n" +
        "\n" +
        "🔵Principais Funcionalidades e Tecnologias:\n" +
        "\n" +
        "-Cálculo Ponderado: Validação de notas via Regex e feedback instantâneo com precisão decimal.\n" +
        "\n" +
        "-Persistência de Dados: Integração nativa com LocalStorage mantendo o perfil e as disciplinas salvos localmente.\n" +
        "\n" +
        "-Gestão de Backup: Exportação e importação de todo o progresso acadêmico via arquivo .json.\n" +
        "\n" +
        "-Relatório em PDF: Estilização dedicada (@media print) que oculta os controles da tela e formata a grade como um documento pronto para impressão.\n" +
        "\n" +
        "-Identidade Visual: Favicon dinâmico em SVG integrado diretamente ao cabeçalho.\n" +
        "\n" +
        "-Zero Dependências (Vanilla Stack): Construído puramente com HTML5, CSS3 e JavaScript nativo, garantindo carregamento instantâneo via CDN.\n" +
        "\n" +
        "🔵Portfólio e Diferenciais:\n" +
        "\n" +
        "Um projeto focado em resolver dores reais, demonstrando domínio em manipulação de DOM, web storage, validação de formulários complexos e arquitetura de aplicações web sem o uso de frameworks.",
    tecnologias: ["HTML", "CSS", "JavaScript"],
    linkGithub: "https://github.com/ThiagoBianna/security-jwt-guard",
    linkDemo: "",
    linkVideo: "https://www.youtube.com/watch?v=7S4i2_EJ_hI",
    videoPreview: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-programmer-typing-on-a-keyboard-40541-large.mp4",
    dataCriacao: " ",
    imagem: "https://media.licdn.com/dms/image/v2/D4D2DAQG2Myr6FJ8Sbg/profile-treasury-image-shrink_800_800/B4DZ7pNMocK8AI-/0/1782029011723?e=1782637200&v=beta&t=zugatgeliDUDWHjyhBOvitqmy8UJ4sQchizYQNFv4pk",
    status: "online"
  },
  {
    id: 3,
    nome: "Orçamento Inteligente de Viagens",
    descricao: "Projeto Final CS50 HARVARD\n" +
        "\n" +
        "O \"Vai dar quanto?\" é uma aplicação Full-Stack projetada para ajudar motoristas a estimar o custo real de combustível em seus trajetos. Utilizando integrações com a Google Maps API, o sistema calcula a distância precisa entre dois pontos e aplica regras de negócio inteligentes, como alertas para horários de maior consumo (pico).\n" +
        "\n" +
        "🔵 Funcionalidades Principais\n" +
        "\n" +
        "-Cálculo Preciso: Integração com Google Distance Matrix API para quilometragem exata.\n" +
        "\n" +
        "-Autocomplete de Endereços: Busca inteligente de locais via Google Places API.\n" +
        "\n" +
        "-Suporte a Múltiplos Combustíveis: Cálculos específicos para Gasolina, Etanol, Diesel e GNV.\n" +
        "\n" +
        "-Consumo Inteligente: Exibição de médias em km/L e km/m³ (para GNV).\n" +
        "\n" +
        "-Alerta de Horário de Pico: Sistema que identifica horários comerciais e sugere que o consumo pode ser maior.\n" +
        "\n" +
        "🔵 Tecnologias Utilizadas\n" +
        "\n" +
        "-Frontend: React (Vite), Styled Components/CSS dinâmico.\n" +
        "\n" +
        "-Backend: Java 17+, Spring Boot, PostgreSQL, Docker.\n" +
        "\n" +
        "-APIs: Google Maps (Distance Matrix, Autocomplete e Places).\n" +
        "\n" +
        "\n" +
        "⚠️ NOTA SOBRE O ACESSO: Este projeto está hospedado no plano gratuito do Render. Por isso, o site pode estar inativo por algum tempo, o primeiro cálculo pode levar cerca de 30-40 segundos para \"acordar\" o container. Agradeço a paciência!",
    tecnologias: ["Java" , "Spring Boot" , "PostgreSQL" , "Docker" , "React" , "Vite" , "Google Maps API"],
    linkDemo: "https://vai-dar-quanto-web-front.onrender.com/",
    linkVideo: "https://www.youtube.com/watch?v=7S4i2_EJ_hI",
    linkGithub: "https://github.com/ThiagoBianna/travel-cost-calculator",
    videoPreview: "https://media.licdn.com/dms/image/v2/D4D05AQHb_iiUBGBRkw/videocover-low/B4DZ5g2XmWIUBI-/0/1779741327533?e=1782619200&v=beta&t=wtM-Nlm2jtDgcVGMwl6nNoLmovXa4JrmsmaI4Zxp0hU",
    dataCriacao: " ",
    imagem: "https://media.licdn.com/dms/image/v2/D4D05AQHb_iiUBGBRkw/videocover-low/B4DZ5g2XmWIUBI-/0/1779741327533?e=1782619200&v=beta&t=wtM-Nlm2jtDgcVGMwl6nNoLmovXa4JrmsmaI4Zxp0hU",
    status: "online"
  },
  {
    id: 4,
    nome: "Enterprise Log Aggregator with Kafka",
    descricao: "Motor de coleta e filtragem em tempo real de logs distribuídos. Implementa múltiplos brokers Apache Kafka estruturados, consumidores reativos com Spring Boot, banco de dados PostgreSQL indexado para buscas e triggers de alertas automáticos via WebSockets.",
    tecnologias: ["Apache Kafka", "Spring Boot 3", "Docker", "PostgreSQL", "WebSockets"],
    linkGithub: "https://github.com/ThiagoBianna/kafka-log-aggregator",
    linkDemo: "",
    linkVideo: "https://www.youtube.com/watch?v=7S4i2_EJ_hI",
    videoPreview: "https://assets.mixkit.co/videos/preview/mixkit-matrix-style-code-screen-background-34208-large.mp4",
    dataCriacao: "2026-06-05",
    imagem: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600",
    status: "online"
  },
  {
    id: 5,
    nome: "Enterprise Log Aggregator with Kafka",
    descricao: "Motor de coleta e filtragem em tempo real de logs distribuídos. Implementa múltiplos brokers Apache Kafka estruturados, consumidores reativos com Spring Boot, banco de dados PostgreSQL indexado para buscas e triggers de alertas automáticos via WebSockets.",
    tecnologias: ["Apache Kafka", "Spring Boot 3", "Docker", "PostgreSQL", "WebSockets"],
    linkGithub: "https://github.com/ThiagoBianna/kafka-log-aggregator",
    linkDemo: "",
    linkVideo: "https://www.youtube.com/watch?v=7S4i2_EJ_hI",
    videoPreview: "https://assets.mixkit.co/videos/preview/mixkit-matrix-style-code-screen-background-34208-large.mp4",
    dataCriacao: "2026-06-05",
    imagem: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600",
    status: "online"
  }
];

const initialCertificates = [
  {
    id: 1,
    nome: "Certificate of completion: Claude 101",
    instituicao: "Anthropic",
    data: " ",
    imagem: "https://media.licdn.com/dms/image/v2/D4D2DAQFCORFcYj43zg/profile-treasury-image-shrink_800_800/B4DZ6npHeQH4AI-/0/1780929034396?e=1782619200&v=beta&t=WYLEukq5onb0cKruO62M7PtH9WwJSMezEhmR1a89gwk",
    link: "https://media.licdn.com/dms/image/v2/C4D0BAQHSLqrrC1FghQ/company-logo_200_200/company-logo_200_200/0/1630571650763?e=1783555200&v=beta&t=wJK4M7iz46n6RwMa8sVHQ6d5I-05Oxba4-2iXQ_ejCg",
    logoInstituicao: "https://media.licdn.com/dms/image/v2/D4E0BAQFMhKgeR7EYAg/company-logo_200_200/company-logo_200_200/0/1719256413073/anthropicresearch_logo?e=1783555200&v=beta&t=prQjZZ8WRzymNsf_irUBb9wyCo3va9wVaEfM7jjFe_U"
  },
  {
    id: 2,
    nome: "CURSO.DEV - Desenvolvimento Full Stack",
    instituicao: "Filipe Deschamps Tech Inc.",
    data: " ",
    imagem: "https://media.licdn.com/dms/image/v2/D4D2DAQFGYwOvJPRWJg/profile-treasury-image-shrink_800_800/B4DZ6viVfsGwAI-/0/1781061474546?e=1782619200&v=beta&t=zIHyGZTFUKB5AWa46YzIgqeC4BxGDhFe1jHwzFWnU84",
    link: "https://curso.dev/certificados/c21f3180-714a-49c5-9a36-7e9d3f932a2c",
    logoInstituicao: "https://media.licdn.com/dms/image/v2/C4D0BAQHSLqrrC1FghQ/company-logo_200_200/company-logo_200_200/0/1630571650763?e=1783555200&v=beta&t=wJK4M7iz46n6RwMa8sVHQ6d5I-05Oxba4-2iXQ_ejCg"
  },
  {
    id: 3,
    nome: "BOOTCAMP I",
    instituicao: "UNINTER Centro Universitário Internacional",
    data: " ",
    imagem: "https://media.licdn.com/dms/image/v2/D4D2DAQHf2xDhbZjH1g/profile-treasury-image-shrink_800_800/B4DZ6pyfWvIsAI-/0/1780965046124?e=1782615600&v=beta&t=MYrzmqDy_TexV3fsl9qkoo-_qh-l-sMZaxEcJbkosyI",
    link: "https://extensaocommerce.uninter.com/certificado",
    logoInstituicao: "https://media.licdn.com/dms/image/v2/D4D0BAQHrDUW2-Vq5iw/company-logo_200_200/B4DZuP0fiiGUAI-/0/1767644461719/grupo_uninter_logo?e=1783555200&v=beta&t=-JXAGlE1EjpHShrzqerHYyvuhdQpYZBB-q2cMcVJ4qc"

  },
  {
    id: 4,
    nome: "CS50 - Introduction to Computer Science",
    instituicao: "Harvard University",
    data: " ",
    imagem: "https://media.licdn.com/dms/image/v2/D4D2DAQFcR26za7vTAQ/profile-treasury-image-shrink_800_800/B4DZ6vjpOMJ0AI-/0/1781061817531?e=1782615600&v=beta&t=M5LMQ86bMcy6ZrKA9oZb3PBQjIvzdNbkrpFs2k5Rzy0",
    link: "https://certificates.cs50.io/db6fdf6c-b72c-4537-a09a-f3f09a0f8acf",
    logoInstituicao: "https://media.licdn.com/dms/image/v2/C4E0BAQGYjmmBCvqLmg/company-logo_200_200/company-logo_200_200/0/1631309789389?e=1783555200&v=beta&t=DgbIHE9IGqauso3tXFj0_Zzv7M1-OO0MLH2_m-SUKhY"
  },
  {
    id: 5,
    nome: "Formação Lógica de Programação",
    instituicao: "DIO",
    data: " ",
    imagem: "https://media.licdn.com/dms/image/v2/D4D2DAQHZgrmT0BeKCw/profile-treasury-image-shrink_800_800/B4DZ542UOBJoAI-/0/1780143965335?e=1782619200&v=beta&t=1_XFum_Nx5dTl-zxxxS8b0SJ2q6F0W0pF1u5OD3NRAA",
    link: "https://hermes.dio.me/certificates/FISFEGJY.pdf",
    logoInstituicao: "https://media.licdn.com/dms/image/v2/D4D0BAQH1TY3FZloIyA/company-logo_200_200/B4DZxMvm8KJwAM-/0/1770814075164/dio_makethechange_logo?e=1783555200&v=beta&t=JYt70ZzJU6crzcNMk7pMK50dFeDh8lOo4bu5LaNhThI"
  },
  {
    id: 6,
    nome: "Administração",
    instituicao: "Cursos iPED",
    data: " ",
    imagem: "https://media.licdn.com/dms/image/v2/D4D2DAQFSQ_g_wivA4w/profile-treasury-image-shrink_800_800/B4DZ535FaZJoAI-/0/1780127913944?e=1782619200&v=beta&t=tw2SLGXI0cfzq5xACd-XrAxh9GsaClXE1BNnLveKIHI",
    link: "https://www.iped.com.br/ava/cert/3233547/764/a06b49f6e21bd7be8a10?",
    logoInstituicao: "https://media.licdn.com/dms/image/v2/D4D0BAQEuBTLuLcRG5g/company-logo_200_200/company-logo_200_200/0/1689366391676?e=1783555200&v=beta&t=ZBlTDEF_JHeid8PkVQe0isBvqFeCvZeuih63YW_RtiU"
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
    cargo: "Soldado",
    empresa: "Força Aérea Brasileira - FAB",
    periodo: "Jun/2016 - Set/2019 • 3 anos e 4 meses",
    descricao: "Experiência em ambiente militar altamente estruturado, baseado em disciplina, padrões operacionais, hierarquia e cumprimento rigoroso de normas e procedimentos. Aprimoramento de habilidades de trabalho em equipe, resolução de problemas sob pressão, organização de atividades diárias e comunicação eficiente para garantir a execução das tarefas com qualidade e precisão.",
    ordem: 0
  },
  {
    id: 2,
    cargo: "Técnico de Hardware",
    empresa: "Assistência Técnica de Consoles - Autônomo",
    periodo: "Jan/2020 - Out/2025 • 5 anos e 10 meses",
    descricao: "Diagnóstico e resolução de falhas de hardware e software, garantindo a integridade dos sistemas. Realização de reparos técnicos, substituição de componentes e otimização de performance.",
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
