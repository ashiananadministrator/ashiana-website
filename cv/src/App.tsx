import React, { useState, useEffect, useRef } from 'react';

// Mock Resume Files Content
interface MockResumes {
  [key: string]: string;
}

const MOCK_RESUMES: MockResumes = {
  'Resume_FullStack_Engineer.docx': `# Suhas Kumar
suhas.kumar@gmail.com | +91 98765 43210 | Bangalore, India | github.com/suhaskumar

## Professional Summary
Software Engineer with 3 years of experience specializing in building responsive web applications. Proficient in frontend technologies like HTML, CSS, JavaScript, and React, with foundational knowledge of backend systems. Passionate about writing clean, maintainable code and collaborating in agile teams.

## Core Skills
* Programming Languages: JavaScript (ES6+), TypeScript, HTML5, CSS3
* Libraries & Frameworks: React, Redux, Express.js
* Database: MongoDB, PostgreSQL
* Tools: Git, VS Code, Postman, Webpack

## Experience
### Software Engineer | TechSolutions Pvt Ltd
*June 2024 - Present*
* Developed and maintained 5+ React-based web applications, improving page load speeds by 20%.
* Designed responsive UI components using HTML5 and CSS Grid/Flexbox, ensuring mobile compatibility.
* Integrated RESTful APIs with React state management using Redux Toolkit.
* Participated in code reviews and daily stand-up meetings in an Agile Scrum environment.

### Associate Developer | CodeVantage Labs
*June 2023 - May 2024*
* Implemented UI bug fixes and small features for a customer-facing portal.
* Wrote unit tests for frontend utility functions, increasing coverage by 15%.
* Collaborated with UX designers to translate wireframes into interactive HTML/CSS prototypes.

## Education
* **Bachelor of Engineering in Computer Science** | Bangalore University (2019 - 2023)`,

  'Suhas_Senior_Developer_CV.pdf': `# Suhas Kumar
suhas.kumar@gmail.com | Bangalore, India | linkedin.com/in/suhas-kumar

## Summary
Lead Developer with over 6 years of expertise in software architecture, cloud engineering, and backend development. Strong background in designing scalable REST APIs, microservices, and setting up automated CI/CD pipelines. Proven record of mentoring junior developers and driving product delivery.

## Technical Skills
* Languages: JavaScript, Python, SQL, Go
* Backend: Node.js, Express, Django, FastAPI
* Cloud & DevOps: AWS (EC2, S3, Lambda, RDS), Docker, Kubernetes, GitHub Actions, Terraform
* Databases: PostgreSQL, MongoDB, Redis

## Professional Experience
### Technical Lead | CloudScale Innovations
*Jan 2024 - Present*
* Architected a real-time analytics engine processing 10M+ daily events using Node.js and PostgreSQL.
* Automated application deployments on AWS using Terraform and GitHub Actions, cutting setup time by 40%.
* Designed secure microservices using Docker and Kubernetes to ensure zero-downtime scaling.
* Mentor and lead a team of 4 junior developers, running design sprints and code reviews.

### Senior Software Engineer | DataStream Systems
*Jul 2021 - Dec 2023*
* Re-designed a legacy monolithic backend to Python/FastAPI microservices, boosting throughput by 50%.
* Implemented caching using Redis, reducing API response times from 350ms to 80ms.
* Managed relational databases, writing complex SQL queries and optimizing schema performance.

## Education
* **M.S. in Software Systems** | BITS Pilani (2020 - 2022)
* **B.Tech in Information Technology** | PES University (2016 - 2020)`,

  'Resume_UIUX_Designer.pdf': `# Suhas Kumar
suhas.design@gmail.com | Portfolio: suhaskumar.design | Bangalore, India

## Summary
Creative UI/UX Designer with 4 years of experience crafting user-centered web and mobile experiences. Skilled in user research, wireframing, prototyping, and user testing. Expert in designing intuitive design systems that bridge the gap between design and development.

## Areas of Expertise
* UI/UX Design, Interaction Design, Visual Design
* User Research, Personas, User Journeys, Usability Testing
* Figma, Adobe Creative Suite, Sketch, InVision
* HTML, CSS, Basic JavaScript (Design-to-code workflow)

## Work History
### Product Designer | PixelPerfect studio
*Mar 2024 - Present*
* Redesigned a mobile e-commerce application, resulting in a 25% increase in user conversion rate.
* Developed and documented a global Figma Design System used across 3 separate product lines.
* Conducted 15+ moderated user testing sessions, converting insights into actionable design improvements.
* Collaborated closely with frontend developers to ensure pixel-perfect CSS styling implementation.

### UX Designer | WebCrafters agency
*May 2022 - Feb 2024*
* Designed mockups, wireframes, and high-fidelity interactive prototypes for 12 client websites.
* Mapped user flows, site architectures, and task flows for complex SaaS platforms.
* Delivered brand assets and vector illustrations using Adobe Illustrator.

## Education
* **Bachelor of Design (B.Des)** | National Institute of Design (2018 - 2022)`,

  'Draft_Marketing_Resume.txt': `# Suhas Kumar
suhas.marketing@gmail.com | +91 99000 88888 | Bangalore

## Profile
Digital Marketing Specialist with 3+ years of experience managing SEO, content strategy, and social media campaigns. Proficient in analytics tools and dedicated to growing organic brand traffic and user acquisition.

## Skills
* SEO, SEM, Google Analytics, Google Search Console
* Content Writing, Email Marketing (Mailchimp), Social Media Management
* Competitor Analysis, Keyword Research, A/B Testing

## Experience
### Marketing Coordinator | GrowBiz Solutions
*2024 - Present*
* Executed SEO strategy that increased organic search traffic by 35% in 8 months.
* Wrote 4 SEO-optimized blog posts per week, ranking on page 1 of Google for 10+ target keywords.
* Created weekly email newsletters, achieving an average open rate of 28% (industry avg: 20%).

### Content Specialist | BrandJump Agency
*2023 - 2024*
* Managed social media channels (LinkedIn, Twitter, Instagram), growing total followers by 45%.
* Curated and scheduled promotional campaigns, coordinating design assets with graphics team.
* Monitored campaign metrics using Google Analytics and compiled monthly performance reports.

## Education
* **Bachelor of Business Administration (BBA)** | Christ University (2020 - 2023)`,

  'Suhas_Bio_Data.docx': `# BIODATA
Name: Suhas Kumar
Contact: suhas.kumar@gmail.com
Address: Bangalore, Karnataka

## Personal Details
Date of Birth: 15 August 2001
Marital Status: Single
Languages: English, Kannada, Hindi

## Educational Profile
* SSC - CBSE Board (92%)
* HSC - State Board (88%)
* B.Com - Bangalore University (85%)

## Experience Overview
* Worked as Junior Accountant at local auditing firm for 1 year.
* Handled ledger book maintenance, invoice filing, and basic taxation checks.`
};

interface Certification {
  name: string;
  keywords: string[];
  domain: string[];
}

const POPULAR_CERTS: Certification[] = [
  {
    name: "AWS Certified Solutions Architect - Associate",
    keywords: ["aws certified solutions architect", "aws solutions architect", "aws architect", "solutions architect certification"],
    domain: ["aws", "cloud", "solutions architect", "devops", "infrastructure"]
  },
  {
    name: "AWS Certified Developer - Associate",
    keywords: ["aws certified developer", "aws developer", "aws dev certification"],
    domain: ["aws", "developer", "node.js", "python", "backend", "software engineer"]
  },
  {
    name: "Certified ScrumMaster (CSM)",
    keywords: ["certified scrummaster", "csm", "scrum master", "scrummaster certification"],
    domain: ["scrum", "agile", "project manager", "scrum master", "delivery"]
  },
  {
    name: "Project Management Professional (PMP)",
    keywords: ["project management professional", "pmp", "pmp certification"],
    domain: ["project manager", "pmp", "program manager", "management"]
  },
  {
    name: "Salesforce Certified Administrator",
    keywords: ["salesforce certified administrator", "salesforce administrator", "salesforce admin"],
    domain: ["salesforce", "crm", "admin"]
  },
  {
    name: "Google Cloud Certified Associate Cloud Engineer",
    keywords: ["google cloud certified", "gcp certified", "gcp cloud engineer", "google cloud engineer"],
    domain: ["gcp", "google cloud", "devops"]
  },
  {
    name: "Microsoft Certified: Azure Solutions Architect Expert",
    keywords: ["azure solutions architect", "azure architect", "azure certified"],
    domain: ["azure", "cloud", "architect"]
  },
  {
    name: "Certified Information Systems Security Professional (CISSP)",
    keywords: ["cissp", "certified information systems security professional", "cybersecurity certification"],
    domain: ["security", "cybersecurity", "cissp", "compliance"]
  },
  {
    name: "Google UX Design Professional Certificate",
    keywords: ["ux design certificate", "google ux", "ux certification", "figma certification"],
    domain: ["ux", "ui/ux", "designer", "figma", "product design"]
  }
];

interface AlignmentItem {
  id: number;
  title: string;
  sourceResume: string;
  targetJd: string;
  alignedResume: string;
  preScore: number;
  postScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  modificationsCount: number;
  timestamp: string;
}

export default function App() {
  // Application State
  const [screen, setScreen] = useState<'landing' | 'workspace'>('landing');
  const [activeTab, setActiveTab] = useState<'input' | 'loading' | 'results'>('input');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [apiKey, setApiKey] = useState<string>('');
  const [history, setHistory] = useState<AlignmentItem[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('sharp');
  
  // Inputs
  const [sourceResume, setSourceResume] = useState<string>('');
  const [targetJd, setTargetJd] = useState<string>('');
  
  // Results
  const [currentAlignment, setCurrentAlignment] = useState<AlignmentItem | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedResumeText, setEditedResumeText] = useState<string>('');
  
  // Settings & UI state
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [apiKeyVisible, setApiKeyVisible] = useState<boolean>(false);
  const [driveModalOpen, setDriveModalOpen] = useState<boolean>(false);
  const [selectedDriveFile, setSelectedDriveFile] = useState<{ filename: string; filetype: string } | null>(null);
  const [apiErrorModalOpen, setApiErrorModalOpen] = useState<boolean>(false);
  const [apiErrorDetails, setApiErrorDetails] = useState<string>('');
  
  // Loading animations
  const [loadingStep, setLoadingStep] = useState<number>(0);
  
  // Toast notifications
  const [toasts, setToasts] = useState<{ id: number; message: string; type: string }[]>([]);
  
  // Landing Page Interactive Tabs state
  const [landingExampleTab, setLandingExampleTab] = useState<'original' | 'tailored'>('original');
  const [faqActive, setFaqActive] = useState<number | null>(null);
  
  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize App & recover states
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme') || 'dark';
      setTheme(savedTheme as 'dark' | 'light');
      document.documentElement.setAttribute('data-theme', savedTheme);
      
      const savedApiKey = localStorage.getItem('gemini_api_key') || '';
      setApiKey(savedApiKey);
      
      const savedHistoryStr = localStorage.getItem('alignment_history');
      if (savedHistoryStr) {
        setHistory(JSON.parse(savedHistoryStr));
      }
      
      const savedTpl = localStorage.getItem('selected_template') || 'sharp';
      setSelectedTemplate(savedTpl);
    } catch (e) {
      console.error("Localstorage recovery failed", e);
    }
  }, []);

  const showToast = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4300);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    showToast(`Switched to ${newTheme} mode`, 'info');
  };

  const saveApiKey = () => {
    localStorage.setItem('gemini_api_key', apiKey.trim());
    showToast(apiKey.trim() ? 'API key saved successfully!' : 'API Key removed. Switched to Demo Mode.', 'success');
    setSettingsOpen(false);
  };

  const handleFileUploadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await extractTextFromFile(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const extractTextFromFile = async (file: File) => {
    const fileName = file.name;
    const fileType = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
    showToast(`Reading file: ${fileName}...`, 'info');

    try {
      let text = '';
      if (fileType === '.txt' || fileType === '.md') {
        text = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string || '');
          reader.onerror = () => reject(new Error('Failed to read text file.'));
          reader.readAsText(file);
        });
      } else if (fileType === '.pdf') {
        text = await readAsPdf(file);
      } else if (fileType === '.docx') {
        text = await readAsDocx(file);
      } else {
        throw new Error('Unsupported file extension. Please upload PDF, DOCX, TXT, or MD.');
      }

      setSourceResume(text.trim());
      showToast('Resume file content successfully imported!', 'success');
    } catch (err: any) {
      console.error(err);
      showToast(`Failed to parse file: ${err.message}`, 'error');
    }
  };

  const readAsPdf = async (file: File): Promise<string> => {
    const pdfjsLib = (window as any).pdfjsLib;
    if (!pdfjsLib) {
      throw new Error('PDF reader engine is not loaded. Please reload the page.');
    }
    const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as ArrayBuffer);
      reader.onerror = () => reject(new Error('Failed to read PDF binary.'));
      reader.readAsArrayBuffer(file);
    });

    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');
      text += pageText + '\n\n';
    }
    if (!text.trim()) {
      throw new Error('This PDF appears to be empty or scanned. Text extraction unsuccessful.');
    }
    return text;
  };

  const readAsDocx = async (file: File): Promise<string> => {
    const mammoth = (window as any).mammoth;
    if (!mammoth) {
      throw new Error('Word document reader engine is not loaded. Please reload the page.');
    }
    const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as ArrayBuffer);
      reader.onerror = () => reject(new Error('Failed to read Word file.'));
      reader.readAsArrayBuffer(file);
    });
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  };

  // Google Drive simulation
  const selectDriveFile = () => {
    if (!selectedDriveFile) return;
    const content = MOCK_RESUMES[selectedDriveFile.filename];
    if (content) {
      setSourceResume(content.trim());
      showToast(`Imported "${selectedDriveFile.filename}" from Google Drive!`, 'success');
      setDriveModalOpen(false);
    } else {
      showToast('Google Drive connection error.', 'error');
    }
  };

  // Alignment Helpers
  const mergeCompanyExperiences = (text: string, comp1: string, comp2: string) => {
    if (!text) return '';
    const escapeRegex = (str: string) => str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const makeSectionRegex = (compName: string) => new RegExp(
      `(###[^\\n]*?${escapeRegex(compName)}[^\\n]*?\\n)([\\s\\S]*?)(?=\\n###|\\n##|$)`,
      'i'
    );
    const regex1 = makeSectionRegex(comp1);
    const regex2 = makeSectionRegex(comp2);

    const match1 = text.match(regex1);
    const match2 = text.match(regex2);

    if (match1 && match2) {
      const fullMatch1 = match1[0];
      const header1 = match1[1].replace(/^###\s*/, '').trim();
      const content1 = match1[2].trim();

      const fullMatch2 = match2[0];
      const header2 = match2[1].replace(/^###\s*/, '').trim();
      const content2 = match2[2].trim();

      const combinedHeader = `### ++${comp1} & ${comp2} (Combined Experience)++`;
      const subBlock1 = `**${header1}**\n${content1}`;
      const subBlock2 = `**${header2}**\n${content2}`;
      const mergedBlock = `${combinedHeader}\n\n${subBlock1}\n\n${subBlock2}\n\n`;

      let updatedText = text.replace(fullMatch1, mergedBlock);
      updatedText = updatedText.replace(fullMatch2, '');
      return updatedText;
    }
    return text;
  };

  const extractAndInjectCertification = (alignedResume: string, jdText: string, sourceResume: string) => {
    if (!alignedResume) return '';
    const jdLower = jdText.toLowerCase();
    const sourceLower = sourceResume.toLowerCase();

    let selectedCert = null;
    let certFoundInJd = false;

    for (const cert of POPULAR_CERTS) {
      for (const kw of cert.keywords) {
        if (jdLower.includes(kw)) {
          selectedCert = cert.name;
          certFoundInJd = true;
          break;
        }
      }
      if (certFoundInJd) break;
    }

    if (!selectedCert) {
      const certRegex = /(?:required|mandatory|preferred)\s+(?:certification|certifications|certificate):\s*([A-Za-z0-9\s#\-+:]+)/i;
      const match = jdText.match(certRegex);
      if (match && match[1] && match[1].trim().length > 5 && match[1].trim().length < 60) {
        selectedCert = match[1].trim();
      }
    }

    if (!selectedCert) {
      let maxMatchCount = -1;
      let bestCert = "AWS Certified Solutions Architect - Associate";
      for (const cert of POPULAR_CERTS) {
        let matchCount = 0;
        for (const domKw of cert.domain) {
          if (sourceLower.includes(domKw)) {
            matchCount++;
          }
        }
        if (matchCount > maxMatchCount) {
          maxMatchCount = matchCount;
          bestCert = cert.name;
        }
      }
      selectedCert = bestCert;
    }

    if (alignedResume.toLowerCase().includes(selectedCert.toLowerCase())) {
      const regex = new RegExp(`(${selectedCert.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
      return alignedResume.replace(regex, '++$1 (Mandatory Certification)++');
    }

    const certsHeaderRegex = /##\s*(Certifications|Certificates|Credentials|Accreditations|Professional Certifications|Professional Certificates)/i;
    const hasCertsSection = certsHeaderRegex.test(alignedResume);

    let updatedResume = alignedResume;
    if (hasCertsSection) {
      updatedResume = alignedResume.replace(certsHeaderRegex, (match) => {
        return `${match}\n* ++${selectedCert} (Mandatory Certification)++`;
      });
    } else {
      const eduHeaderRegex = /##\s*(Education|Academic Background)/i;
      const hasEduSection = eduHeaderRegex.test(alignedResume);
      if (hasEduSection) {
        updatedResume = alignedResume.replace(eduHeaderRegex, (match) => {
          return `## Certifications\n* ++${selectedCert} (Mandatory Certification)++\n\n${match}`;
        });
      } else {
        updatedResume = alignedResume.trim() + `\n\n## Certifications\n* ++${selectedCert} (Mandatory Certification)++\n`;
      }
    }
    return updatedResume;
  };

  const postProcessAlignedResume = (alignedCv: string, jdText: string, source: string) => {
    let result = alignedCv;
    result = mergeCompanyExperiences(result, 'Persistent', 'Globant');
    result = mergeCompanyExperiences(result, 'Royal Cyber', 'Accion Labs');
    result = mergeCompanyExperiences(result, 'Black Piano', 'Cytel');
    result = mergeCompanyExperiences(result, 'Katalyst', 'Reliance BPO');
    result = extractAndInjectCertification(result, jdText, source);
    return result;
  };

  const generateMockAlignment = (source: string, jd: string) => {
    const cleanJd = jd.toLowerCase().replace(/[^a-zA-Z\s]/g, '');
    const techDict = [
      'react', 'redux', 'node.js', 'node', 'express', 'python', 'django', 'fastapi', 'aws', 'docker', 'kubernetes',
      'terraform', 'github actions', 'ci/cd', 'typescript', 'mongodb', 'postgresql', 'sql', 'figma', 'design system',
      'wireframe', 'prototyping', 'seo', 'sem', 'google analytics', 'email marketing', 'scrum', 'agile'
    ];

    const matched: string[] = [];
    const missing: string[] = [];

    techDict.forEach(tech => {
      if (cleanJd.includes(tech)) {
        if (source.toLowerCase().includes(tech)) {
          matched.push(tech);
        } else {
          missing.push(tech);
        }
      }
    });

    if (matched.length === 0 && missing.length === 0) {
      matched.push('communication', 'problem solving');
      missing.push('agile workflow', 'performance optimization');
    }

    const totalKeywords = matched.length + missing.length;
    const matchedRatio = totalKeywords > 0 ? (matched.length / totalKeywords) : 0.65;
    const preScore = Math.min(Math.max(Math.round(matchedRatio * 100) - Math.round(Math.random() * 5), 25), 65);
    const postScore = Math.min(Math.max(Math.round(90 + (Math.random() * 8)), 85), 98);
    const modificationsCount = missing.length + 3;

    let alignedCv = source;
    alignedCv = mergeCompanyExperiences(alignedCv, 'Persistent', 'Globant');
    alignedCv = mergeCompanyExperiences(alignedCv, 'Royal Cyber', 'Accion Labs');
    alignedCv = mergeCompanyExperiences(alignedCv, 'Black Piano', 'Cytel');
    alignedCv = mergeCompanyExperiences(alignedCv, 'Katalyst', 'Reliance BPO');

    // space-saving pruning
    let expSections = alignedCv.split('\n### ');
    if (expSections.length > 3) {
      for (let i = 2; i < expSections.length; i++) {
        let lines = expSections[i].split('\n');
        let bulletCount = 0;
        let prunedLines = [];
        for (let j = 0; j < lines.length; j++) {
          if (lines[j].trim().startsWith('*') || lines[j].trim().startsWith('-')) {
            bulletCount++;
            if (bulletCount <= 2) {
              prunedLines.push(lines[j]);
            }
          } else {
            prunedLines.push(lines[j]);
          }
        }
        expSections[i] = prunedLines.join('\n');
      }
      alignedCv = expSections.join('\n### ');
    }

    alignedCv = alignedCv.replace(/visa\s*:\s*[a-zA-Z0-9\s]+/gi, '');
    alignedCv = alignedCv.replace(/h1b|l1|b1|schengen/gi, '');

    matched.forEach(tech => {
      const regex = new RegExp(`\\b(${tech})\\b`, 'gi');
      alignedCv = alignedCv.replace(regex, '++$1++');
    });

    const missingTextString = missing.slice(0, 3).map(m => m.toUpperCase()).join(', ');
    const lines = alignedCv.split('\n');
    let summaryLineIdx = lines.findIndex(l => l.toLowerCase().includes('summary') || l.toLowerCase().includes('profile'));
    if (summaryLineIdx !== -1 && summaryLineIdx + 1 < lines.length) {
      lines[summaryLineIdx + 1] = `++Tailored qualifications matching JD: Managed and automated **100+ deployment workflows** utilizing ${missingTextString} to boost delivery times.++ ` + lines[summaryLineIdx + 1];
    } else {
      lines.splice(2, 0, `\n* ++Added Focus: Managed and automated **100+ deployment workflows** utilizing ${missingTextString}.++\n`);
    }

    let skillsLineIdx = lines.findIndex(l => l.toLowerCase().includes('skills') || l.toLowerCase().includes('expertise'));
    if (skillsLineIdx !== -1 && skillsLineIdx + 1 < lines.length) {
      lines[skillsLineIdx + 1] = lines[skillsLineIdx + 1] + ` * ++${missing.join(', ')}++`;
    }
    alignedCv = lines.join('\n');

    if (!alignedCv.toLowerCase().includes('## languages')) {
      alignedCv = alignedCv.trim() + `\n\n## Languages\n* English (Full Professional Proficiency)\n* Spanish (Conversational)\n* German (Basic)\n`;
    }

    return {
      preScore,
      postScore,
      matchedKeywords: matched.map(m => m.charAt(0).toUpperCase() + m.slice(1)),
      missingKeywords: missing.map(m => m.charAt(0).toUpperCase() + m.slice(1)),
      alignedResume: alignedCv,
      modificationsCount
    };
  };

  const generateGeminiAlignment = async (source: string, jd: string, key: string) => {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;
    const systemInstruction = `You are a professional resume strategist. Your goal is to optimize the Candidate's original Resume to align closely with the provided Job Description (JD).
Modify and rephrase the resume content to emphasize requirements, skills, and tools mentioned in the Job Description, while preserving truthful background structure.

CRITICAL RESUME WRITING RULES:
1. STRICT PAGE BUDGET (MAX 2 PAGES): The output resume must fit STRICTLY on exactly 2 pages when printed using standard, professional resume margins and spacing (10.5pt font, 1.45 line-height). 
   To achieve this, you must AGGRESSIVELY summarize, combine, or trim less relevant bullet points and project descriptions (especially for older roles), while preserving all job history entries. 
   - Spend more bullet points (3-4) on your most recent, highly relevant roles.
   - Limit older or less relevant roles to 1-2 concise, high-impact bullet points.
   - Remove fluffy, repetitive, or low-impact project descriptions.
   - Target a total character length of the generated Markdown between 4,200 and 5,300 characters to guarantee it fits on exactly 2 pages.
2. NO INVENTIONS: Use ONLY information available in the Source Resume. Do NOT invent employers, dates, projects, tools, metrics, achievements, education, or certifications unless explicitly present in the Source Resume.
3. JD CUSTOMIZATION: Customize the resume according to the Job Description. Naturally include relevant JD keywords, tools, technologies, responsibilities, cloud/platform skills, DevOps terms, infrastructure skills, monitoring tools, security practices, and automation terms where they truthfully match the Source Resume.
4. EXPERIENCE INTEGRITY: Do NOT delete any job history or experience. Keep the experience sequence exactly as given in the Source Resume (do not rearrange the order based on your own judgment).
5. NO TABLES: Use bullet points. Tables are strictly forbidden.
6. SPACE-SAVING ROLE MERGING: To save space, merge only the following similar roles where applicable. Each merged pair must be combined into a single, separate, distinct merge block under a unified heading (e.g. \`### Persistent & Globant (Combined Experience)\`), preserving and formatting all respective experience details (job titles, dates, and bullet points) correctly under sub-labels in that block, without losing any experience content:
   - "Persistent" & "Globant"
   - "Royal Cyber" & "Accion Labs"
   - "Black Piano" & "Cytel Inc"
   - "Katalyst" & "Reliance BPO"
7. VISA DETAILS: For domestic openings, remove Visa details. For international openings, add Visa details only if they exist in the Source Resume.
8. CERTIFICATIONS: Cross-reference certifications from the Source Resume with the JD. Retain and prioritize JD-relevant certifications. If the JD clearly requires or prefers a certification, select the certification closest to the candidate's profile and add it to the Certifications section of the tailored resume, wrapping it in double-plus highlights (e.g. \`++AWS Certified Solutions Architect - Associate (Mandatory Certification)++\`).
9. MEASURABLE SCALE: Naturally highlight a strong measurable achievement such as managing, optimizing, or automating 100+ deployment workflows, application workflows, resume workflows, infrastructure workflows, or similar systems only if supported by the Source Resume.
10. BULLET STYLE: Use short, action-oriented bullets. Start bullets with strong verbs. Each bullet should show responsibility, tool usage, business impact, or scale. Avoid generic statements like "responsible for".
11. LAYOUT: Keep the use of bold fonts to a strict minimum (approximately 10% of total words or less). Do not overuse bold formatting. Use bold and italic fonts selectively and only as needed. Specifically:
    - Bold ONLY section titles (Professional Summary, Experience, Skills, Certifications, Education), job titles, company names, and degrees.
    - Do NOT bold starting words, key phrases, or entire lines in description bullet points.
    - Use italics selectively (e.g. for dates, locations, or secondary sub-titles) to establish a clean and professional visual hierarchy. Use standard spacing and minimal design.
12. GRAMMAR & SPELLING: The tailored resume must be written in impeccable, grammatically correct professional English. Ensure zero typos, spelling mistakes, or punctuation errors. Maintain consistent tenses (past tense for previous roles, present tense only for ongoing roles) and use active voice.

FIT SCORES CALCULATION:
Calculate two fit scores:
1. preScore: The percentage match of the ORIGINAL resume against the Job Description (typically 20% to 65% depending on relevance).
2. postScore: The percentage match of the newly TAILORED/ALIGNED resume against the Job Description (typically much higher, around 85% to 98%).

CRITICAL HIGHLIGHTING INSTRUCTION:
You must explicitly highlight all key additions, modified achievements, and skills you injected into the tailored resume by wrapping them in double-plus characters '++'. For example: '++React++' or '++Led migration of 4 core REST APIs to Python/FastAPI++'. This will be parsed in the frontend display to highlight difference views. Do not use standard markdown formatting for diffs, ONLY use '++' wrapping.

You must output your complete analysis as a single JSON object matching the JSON schema below. Do not wrap the JSON in markdown code blocks like \`\`\`json. Return the raw JSON string directly.`;

    const userPrompt = `
### ORIGINAL RESUME:
${source}

### TARGET JOB DESCRIPTION (JD):
${jd}
`;

    const payload = {
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      systemInstruction: { parts: [{ text: systemInstruction }] },
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            preScore: { type: "INTEGER" },
            postScore: { type: "INTEGER" },
            matchedKeywords: { type: "ARRAY", items: { type: "STRING" } },
            missingKeywords: { type: "ARRAY", items: { type: "STRING" } },
            alignedResume: { type: "STRING" },
            modificationsCount: { type: "INTEGER" }
          },
          required: ["preScore", "postScore", "matchedKeywords", "missingKeywords", "alignedResume", "modificationsCount"]
        }
      }
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      throw new Error(errJson.error?.message || `API HTTP Error ${response.status}`);
    }

    const resJson = await response.json();
    const responseText = resJson.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!responseText) {
      throw new Error('Received an empty response from Gemini API.');
    }
    return JSON.parse(responseText);
  };

  const startResumeAlignment = async () => {
    if (!sourceResume.trim()) {
      showToast('Please insert your source resume details first.', 'error');
      return;
    }
    if (!targetJd.trim()) {
      showToast('Please insert the target job description to align against.', 'error');
      return;
    }

    const isMock = !apiKey;
    const duration = isMock ? 2500 : 4000;

    // Trigger Loading Steps
    setActiveTab('loading');
    setLoadingStep(0);
    const stepInterval = duration / 4;
    const interval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev < 3) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, stepInterval);

    setTimeout(async () => {
      try {
        let result;
        if (isMock) {
          result = generateMockAlignment(sourceResume, targetJd);
        } else {
          result = await generateGeminiAlignment(sourceResume, targetJd, apiKey);
        }

        // Post process
        result.alignedResume = postProcessAlignedResume(result.alignedResume, targetJd, sourceResume);

        const cleanTitle = extractRoleNameFromJd(targetJd);
        const newAlignment: AlignmentItem = {
          id: currentAlignment?.id || Date.now(),
          title: cleanTitle,
          sourceResume,
          targetJd,
          alignedResume: result.alignedResume,
          preScore: result.preScore,
          postScore: result.postScore,
          matchedKeywords: result.matchedKeywords,
          missingKeywords: result.missingKeywords,
          modificationsCount: result.modificationsCount,
          timestamp: currentAlignment?.timestamp || new Date().toLocaleString()
        };

        setCurrentAlignment(newAlignment);
        setEditedResumeText(result.alignedResume);
        setIsEditing(false);

        // Update history
        setHistory(prev => {
          const idx = prev.findIndex(item => item.id === newAlignment.id);
          let newHist = [...prev];
          if (idx !== -1) {
            newHist[idx] = newAlignment;
          } else {
            newHist.unshift(newAlignment);
          }
          if (newHist.length > 25) newHist.pop();
          localStorage.setItem('alignment_history', JSON.stringify(newHist));
          return newHist;
        });

        setActiveTab('results');
        showToast('Resume successfully aligned with Job Description!', 'success');
      } catch (err: any) {
        console.error(err);
        setActiveTab('input');
        const errMsg = err.message || '';
        if (errMsg.includes('denied access') || errMsg.includes('API key') || errMsg.includes('Forbidden') || errMsg.includes('project')) {
          setApiErrorDetails(errMsg);
          setApiErrorModalOpen(true);
        } else {
          showToast(`Alignment process failed: ${errMsg}`, 'error');
        }
      }
    }, duration + 200);
  };

  const extractRoleNameFromJd = (jd: string) => {
    const lines = jd.split('\n');
    const candidateLines = lines.map(l => l.trim()).filter(l => l.length > 5).slice(0, 2);
    if (candidateLines.length > 0) {
      let firstLine = candidateLines[0].replace(/[#*`_]/g, '').trim();
      if (firstLine.length > 40) {
        firstLine = firstLine.substring(0, 37) + '...';
      }
      return `Align to: ${firstLine}`;
    }
    return 'Aligned Resume ' + new Date().toLocaleDateString();
  };

  const deleteHistoryItem = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setHistory(prev => {
      const updated = prev.filter(h => h.id !== id);
      localStorage.setItem('alignment_history', JSON.stringify(updated));
      return updated;
    });
    if (currentAlignment?.id === id) {
      setCurrentAlignment(null);
      setSourceResume('');
      setTargetJd('');
      setActiveTab('input');
    }
    showToast('Record deleted from history', 'info');
  };

  const loadPastAlignment = (item: AlignmentItem) => {
    setCurrentAlignment(item);
    setSourceResume(item.sourceResume);
    setTargetJd(item.targetJd);
    setEditedResumeText(item.alignedResume);
    setIsEditing(false);
    setActiveTab('results');
    showToast(`Loaded: ${item.title}`, 'info');
  };

  const saveEdit = () => {
    if (!editedResumeText.trim()) {
      showToast('Resume content cannot be empty.', 'error');
      return;
    }
    if (currentAlignment) {
      const updated = { ...currentAlignment, alignedResume: editedResumeText };
      setCurrentAlignment(updated);
      setHistory(prev => {
        const idx = prev.findIndex(i => i.id === updated.id);
        if (idx !== -1) {
          const newHist = [...prev];
          newHist[idx] = updated;
          localStorage.setItem('alignment_history', JSON.stringify(newHist));
          return newHist;
        }
        return prev;
      });
      setIsEditing(false);
      showToast('Changes saved successfully!', 'success');
    }
  };

  const copyToClipboard = () => {
    if (!currentAlignment) return;
    const cleanMarkdown = currentAlignment.alignedResume.replace(/\+\+/g, '').replace(/~~/g, '');
    navigator.clipboard.writeText(cleanMarkdown)
      .then(() => showToast('Clean tailored markdown copied to clipboard!', 'success'))
      .catch(err => showToast('Failed to copy: ' + err.message, 'error'));
  };

  const printResumeToPdf = () => {
    if ((window as any).AndroidInterface && (window as any).AndroidInterface.printResume) {
      showToast('Preparing native print job...', 'info');
      (window as any).AndroidInterface.printResume();
    } else {
      const oldTitle = document.title;
      document.title = 'Suhas_Dhumal_CV';
      showToast('Opening print dialog. Set layout to Portrait & Background Graphics: ON for best results.', 'info');
      window.print();
      setTimeout(() => {
        document.title = oldTitle;
      }, 1000);
    }
  };

  // Text renderers
  const parseDiffHighlighting = (markdownText: string) => {
    if (!markdownText) return '';
    let html = markdownText.replace(/\+\+([^+]+)\+\+/g, '<span class="diff-added">$1</span>');
    html = html.replace(/~~([^~]+)~~/g, '<span class="diff-removed">$1</span>');
    return html;
  };

  const wrapResumeSections = (html: string) => {
    if (!html) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');

    headings.forEach(heading => {
      const text = heading.textContent?.toLowerCase() || '';
      let className = '';
      if (text.includes('language')) {
        className = 'resume-section-languages';
      } else if (text.includes('certification')) {
        className = 'resume-section-certifications';
      } else if (text.includes('certificate') || text.includes('credential') || text.includes('accreditat')) {
        className = 'resume-section-certificates';
      }

      if (className) {
        let sibling = heading.nextElementSibling;
        let listFound = null;
        while (sibling) {
          if (sibling.tagName.match(/^H[1-6]$/i)) break;
          if (sibling.tagName === 'UL') {
            listFound = sibling;
            break;
          }
          sibling = sibling.nextElementSibling;
        }

        if (listFound) {
          const wrapper = document.createElement('div');
          wrapper.className = className;
          heading.parentNode?.insertBefore(wrapper, heading);
          let current: ChildNode | null = heading;
          const elementsToMove = [];
          while (current && current !== listFound.nextSibling) {
            elementsToMove.push(current);
            current = current.nextSibling;
          }
          elementsToMove.forEach(el => wrapper.appendChild(el));
        }
      }
    });
    return tempDiv.innerHTML;
  };

  const renderMarkdown = (mdText: string, isDiff: boolean) => {
    const marked = (window as any).marked;
    const cleanText = isDiff ? parseDiffHighlighting(mdText) : mdText;
    if (marked && marked.parse) {
      const html = marked.parse(cleanText);
      return { __html: wrapResumeSections(html) };
    }
    // Fallback simple rendering
    const paragraphs = cleanText.split('\n').map(l => `<p>${l}</p>`).join('');
    return { __html: wrapResumeSections(paragraphs) };
  };

  return (
    <>
      {screen === 'landing' ? (
        <div id="landing-page" className="landing-page active">
          {/* Landing Header */}
          <header className="landing-header">
            <div className="landing-nav-container">
              <div className="landing-logo">
                <i className="fa-solid fa-wand-magic-sparkles logo-icon"></i>
                <span>JobOwl<span>Align</span></span>
              </div>
              <nav className="landing-nav-links">
                <a href="#features-section">Features</a>
                <a href="#example-section">How it Works</a>
                <a href="#pricing-section">Pricing</a>
                <a href="#faq-section">FAQs</a>
              </nav>
              <div className="landing-nav-actions">
                <button onClick={() => setScreen('workspace')} className="btn btn-primary">Tailor My Resume</button>
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <section className="landing-hero">
            <div className="hero-content">
              <h1>Tailor your Resume<br />to any Job Description</h1>
              <p>Generate a job-specific resume in seconds, based on your real experience and skills. Paste in a job description and get a version of your resume tailored to what that role requires (ATS-friendly).</p>
              <div className="hero-actions">
                <button onClick={() => setScreen('workspace')} className="btn btn-primary btn-lg btn-glow">Tailor My Resume for Free!</button>
                <span className="subtext">Free to start · No credit card required</span>

                <div className="onboarding-template-select margin-top-md">
                  <span className="onboarding-label">Select ATS-Friendly Template:</span>
                  <div className="onboarding-template-options">
                    <button onClick={() => { setSelectedTemplate('sharp'); showToast('Selected Sharp template', 'success'); }} className={`onboarding-tpl-btn ${selectedTemplate === 'sharp' ? 'active' : ''}`}>
                      <i className="fa-solid fa-square-poll-vertical"></i> Sharp (IBM Plex Serif)
                    </button>
                    <button onClick={() => { setSelectedTemplate('minimal'); showToast('Selected Minimal template', 'success'); }} className={`onboarding-tpl-btn ${selectedTemplate === 'minimal' ? 'active' : ''}`}>
                      <i className="fa-solid fa-table-cells-large"></i> Minimal (DM Sans)
                    </button>
                    <button onClick={() => { setSelectedTemplate('classic'); showToast('Selected Classic template', 'success'); }} className={`onboarding-tpl-btn ${selectedTemplate === 'classic' ? 'active' : ''}`}>
                      <i className="fa-solid fa-book-open"></i> Classic (Georgia)
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-preview">
              <div className="preview-card glass-panel">
                <div className="preview-header">
                  <div className="dots"><span className="dot"></span><span class="dot"></span><span class="dot"></span></div>
                  <div className="preview-title">JobOwl Resume Tailoring</div>
                </div>
                <div className="preview-body">
                  <div className="diff-block">
                    <span className="diff-label label-removed">Original Bullet</span>
                    <p className="bullet-text text-removed">~~Responsible for writing frontend code for the user portal.~~</p>
                  </div>
                  <div className="diff-block">
                    <span className="diff-label label-added">Tailored Bullet</span>
                    <p className="bullet-text text-added">++Architected responsive UI components using **React** and **Redux**, boosting page speed by 25% to align with high-scale JD priorities.++</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How it works (Features) */}
          <section id="features-section" className="landing-section features-section">
            <div className="section-header">
              <h2>Stop rewriting your resume for every role</h2>
              <p>Generate a job-specific resume in seconds, based on your real experience and skills.</p>
            </div>
            <div className="features-grid">
              <div className="feature-card glass-panel">
                <div className="feature-icon"><i className="fa-solid fa-file-shield icon-blue"></i></div>
                <h3>Clear resume templates</h3>
                <p>Our templates are easily readable by ATS systems, ensuring your resume gets past the initial screening.</p>
              </div>
              <div className="feature-card glass-panel">
                <div className="feature-icon"><i className="fa-solid fa-briefcase icon-purple"></i></div>
                <h3>Look like a clear role fit</h3>
                <p>Reframes your experience and reorders skills so the role’s priorities show up instantly, so recruiters see the match in seconds.</p>
              </div>
              <div className="feature-card glass-panel">
                <div className="feature-icon"><i className="fa-solid fa-key icon-green"></i></div>
                <h3>Injects relevant keywords</h3>
                <p>Takes the most important keywords from the job description and adds them naturally to your resume.</p>
              </div>
              <div className="feature-card glass-panel">
                <div className="feature-icon"><i className="fa-solid fa-circle-check icon-yellow"></i></div>
                <h3>Higher interview rates</h3>
                <p>Users report a significant increase in interview invitations after using JobOwl to tailor their resumes.</p>
              </div>
            </div>
          </section>

          {/* Example visualizer */}
          <section id="example-section" className="landing-section example-section">
            <div className="section-header">
              <h2>See what changes JobOwl makes</h2>
              <p>Visualize the precise changes made to fit your background to the target job description.</p>
            </div>
            <div className="example-container glass-panel">
              <div className="example-tabs">
                <button onClick={() => setLandingExampleTab('original')} className={`example-tab-btn ${landingExampleTab === 'original' ? 'active' : ''}`}>Original Resume</button>
                <button onClick={() => setLandingExampleTab('tailored')} className={`example-tab-btn ${landingExampleTab === 'tailored' ? 'active' : ''}`}>Tailored Resume</button>
              </div>
              <div className="example-tab-content">
                {landingExampleTab === 'original' ? (
                  <div className="tab-pane active" id="tab-original">
                    <div className="mock-resume">
                      <h3>Suhas Kumar</h3>
                      <p className="role-title">Software Engineer</p>
                      <ul>
                        <li>Developed and maintained user-facing portals.</li>
                        <li>Wrote code in HTML, CSS and JavaScript.</li>
                        <li>Helped fix bugs and release updates.</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="tab-pane active" id="tab-tailored">
                    <div className="mock-resume">
                      <h3>Suhas Kumar</h3>
                      <p className="role-title">Software Engineer</p>
                      <ul>
                        <li>Developed and maintained <span className="diff-added">5+ high-performance React user portals</span>, improving loading speed by <span className="diff-added">20%</span>.</li>
                        <li>Designed responsive, modern UI layouts using <span className="diff-added">HTML5, CSS Flexbox/Grid, and modern JavaScript (ES6+)</span>.</li>
                        <li>Participated in <span className="diff-added">Agile Scrum daily stand-ups</span> and optimized release deployment workflows.</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing-section" className="landing-section pricing-section">
            <div className="section-header">
              <h2>Simple, Transparent Pricing</h2>
              <p>Start tailoring your resume for free, or unlock unlimited features.</p>
            </div>
            <div className="pricing-grid">
              <div className="pricing-card glass-panel">
                <h3>Starter Plan</h3>
                <div className="price">Free</div>
                <span className="price-desc">(no credit card required!)</span>
                <ul className="pricing-features">
                  <li><i className="fa-solid fa-check text-green"></i> 3 Tailored Resumes for Free</li>
                  <li><i className="fa-solid fa-check text-green"></i> Mock Offline AI Engine</li>
                  <li><i className="fa-solid fa-check text-green"></i> Standard ATS Spacing</li>
                  <li><i className="fa-solid fa-check text-green"></i> Markdown & TXT Export</li>
                </ul>
                <button onClick={() => setScreen('workspace')} className="btn btn-secondary btn-block">Get Started for Free</button>
              </div>
              <div className="pricing-card glass-panel popular">
                <div className="badge badge-green">RECOMMENDED</div>
                <h3>JobOwl Pro</h3>
                <div className="price">$24.99<span className="period">/month</span></div>
                <span className="price-desc">Land interviews or get a refund</span>
                <ul className="pricing-features">
                  <li><i className="fa-solid fa-check text-green"></i> Unlimited Tailored Resumes</li>
                  <li><i className="fa-solid fa-check text-green"></i> Unlimited Tailored Cover Letters</li>
                  <li><i className="fa-solid fa-check text-green"></i> Custom Gemini AI Engine</li>
                  <li><i className="fa-solid fa-check text-green"></i> Interactive Markdown Editor</li>
                  <li><i className="fa-solid fa-check text-green"></i> Priority Support & Backups</li>
                </ul>
                <button onClick={() => setScreen('workspace')} className="btn btn-primary btn-block btn-glow">Get Started with Pro</button>
              </div>
            </div>
          </section>

          {/* FAQs Section */}
          <section id="faq-section" className="landing-section faq-section">
            <div className="section-header">
              <h2>Frequently asked questions</h2>
              <p>Have questions about how JobOwl helps you tailor your resume? We have answers.</p>
            </div>
            <div className="faq-container">
              {[
                {
                  q: "Is this resume builder ATS-friendly?",
                  a: "Yes, absolutely. ATS (Applicant Tracking Systems) parse text. JobOwl generates clean, structured Markdown, PDF, and TXT resumes without tables or complex graphics, guaranteeing optimal parsing scores for recruiter software."
                },
                {
                  q: "Do I need to sign up or log in?",
                  a: "No login or registration is required. Our app is designed to be serverless and client-side first, meaning you can start using all tools immediately from your local browser session."
                },
                {
                  q: "How does the Gemini API key configuration work?",
                  a: "You can use our smart offline Mock AI for free. To use actual real-time AI alignments, you can save your Gemini API key in the configuration panel. It is stored securely in your local browser storage and sent directly to Google APIs (serverless)."
                }
              ].map((faq, i) => (
                <div key={i} className={`faq-item glass-panel ${faqActive === i ? 'active' : ''}`}>
                  <button onClick={() => setFaqActive(faqActive === i ? null : i)} className="faq-question">
                    <span>{faq.q}</span>
                    <i className={`fa-solid ${faqActive === i ? 'fa-minus' : 'fa-plus'} faq-chevron`}></i>
                  </button>
                  {faqActive === i && (
                    <div className="faq-answer" style={{ maxHeight: '200px' }}>
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="landing-footer">
            <p>&copy; 2026 JobOwl Align. Backed by Career Experts.</p>
            <div className="footer-links">
              <a href="#features-section">Features</a>
              <a href="#pricing-section">Pricing</a>
              <a href="mailto:contact@jobowl.co">Contact Support</a>
            </div>
          </footer>
        </div>
      ) : (
        /* Main Workspace Area */
        <div className="app-container" style={{ display: 'flex' }}>
          {/* Sidebar */}
          <aside className="sidebar">
            <div className="sidebar-header">
              <div className="logo">
                <i className="fa-solid fa-wand-magic-sparkles logo-icon"></i>
                <span>Align<span>CV</span></span>
              </div>
              <button onClick={() => {
                setSourceResume('');
                setTargetJd('');
                setCurrentAlignment(null);
                setActiveTab('input');
                showToast('Created new alignment workspace', 'info');
              }} id="btn-new-align" className="btn btn-secondary btn-icon-only" title="New Alignment">
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>

            <div className="sidebar-content">
              <div className="sidebar-section">
                <h3>ALIGNMENT HISTORY</h3>
                <div id="history-list" className="history-list">
                  {history.length === 0 ? (
                    <div className="no-history-msg">No previous alignments</div>
                  ) : (
                    history.map(item => (
                      <div key={item.id} onClick={() => loadPastAlignment(item)} className={`history-item ${currentAlignment?.id === item.id ? 'active' : ''}`}>
                        <span className="job-title" title={item.title}>{item.title}</span>
                        <div className="item-meta">
                          <span>{item.timestamp.split(',')[0]}</span>
                          <span className="item-score">{item.preScore}% ➔ {item.postScore}%</span>
                        </div>
                        <button onClick={(e) => deleteHistoryItem(item.id, e)} className="btn-delete-history" title="Delete record">
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="sidebar-section settings-section">
                <button onClick={() => setSettingsOpen(!settingsOpen)} className="settings-toggle">
                  <i className="fa-solid fa-gear"></i>
                  <span>AI API Configuration</span>
                  <i className={`fa-solid ${settingsOpen ? 'fa-chevron-up' : 'fa-chevron-down'} chevron`}></i>
                </button>
                <div id="settings-panel" className={`settings-panel ${settingsOpen ? '' : 'collapsed'}`}>
                  <p className="settings-desc">Provide your Gemini API key to run actual AI-powered alignments. Otherwise, a smart mock generator is used.</p>
                  <div className="form-group">
                    <label htmlFor="gemini-api-key">Gemini API Key</label>
                    <div className="input-with-icon">
                      <i className="fa-solid fa-key"></i>
                      <input
                        type={apiKeyVisible ? 'text' : 'password'}
                        id="gemini-api-key"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="AIzaSy..."
                      />
                      <button type="button" onClick={() => setApiKeyVisible(!apiKeyVisible)} className="btn-api-visibility">
                        <i className={`fa-solid ${apiKeyVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                  </div>
                  <button onClick={saveApiKey} id="btn-save-settings" className="btn btn-primary btn-sm btn-block">Save API Key</button>
                  <div className={`api-status-badge ${apiKey ? 'api-active' : 'mock-active'}`}>
                    <span className="status-dot"></span>
                    <span className="status-text">{apiKey ? 'Gemini API Key Saved' : 'Demo Mode (Mock API)'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="sidebar-footer">
              <button onClick={() => setScreen('landing')} className="btn btn-secondary btn-sm btn-block" style={{ marginBottom: '8px' }}>
                <i className="fa-solid fa-house"></i> Back to Homepage
              </button>
              <p>&copy; 2026 JobOwl Align. Serverless.</p>
            </div>
          </aside>

          {/* Main workspace */}
          <main className="main-content">
            <header className="top-bar">
              <div className="top-bar-title">
                <h1 id="workspace-title">{currentAlignment ? currentAlignment.title : 'New Resume Alignment'}</h1>
                <p id="workspace-subtitle" className="text-muted">
                  {currentAlignment ? `Aligned on ${currentAlignment.timestamp}` : 'Align a resume to your target job description side-by-side'}
                </p>
              </div>
              <div className="top-bar-actions">
                <button onClick={() => setScreen('landing')} className="btn btn-secondary btn-sm" title="Return to Landing Page">
                  <i className="fa-solid fa-house"></i> <span>Home</span>
                </button>
                <button onClick={toggleTheme} className="btn btn-secondary btn-icon-only" title="Toggle Theme">
                  <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
                </button>
              </div>
            </header>

            {/* Input screen */}
            {activeTab === 'input' && (
              <div id="input-screen" className="workspace-screen active">
                <div className="input-grid">
                  <div className="card glass-panel flex-column">
                    <div className="card-header">
                      <div className="card-title">
                        <i className="fa-solid fa-file-invoice icon-blue"></i>
                        <h2>1. Source Resume</h2>
                      </div>
                      <span className="card-subtitle">Upload your existing CV or paste its content</span>
                    </div>

                    <div className="card-content flex-grow">
                      <div className="upload-options">
                        <button onClick={handleFileUploadClick} type="button" className="btn-upload">
                          <i className="fa-solid fa-cloud-arrow-up"></i>
                          <span>Upload File</span>
                          <span className="file-types">PDF, DOCX, TXT</span>
                        </button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept=".pdf,.docx,.txt,.md"
                          style={{ display: 'none' }}
                        />

                        <button onClick={() => setDriveModalOpen(true)} className="btn-upload btn-gdrive">
                          <i className="fa-brands fa-google-drive"></i>
                          <span>Import Drive</span>
                          <span className="file-types">Connect & Choose</span>
                        </button>
                      </div>

                      <div className="form-group flex-grow flex-column margin-top-lg">
                        <div className="textarea-header">
                          <label htmlFor="source-resume-text">Or Paste Resume Content</label>
                          <span className="char-count">{sourceResume.length.toLocaleString()} chars</span>
                        </div>
                        <textarea
                          id="source-resume-text"
                          value={sourceResume}
                          onChange={(e) => setSourceResume(e.target.value)}
                          className="flex-grow resume-textarea"
                          placeholder="Paste your current resume details here (Skills, Experience, Projects, Education, etc.)..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="card glass-panel flex-column">
                    <div className="card-header">
                      <div className="card-title">
                        <i className="fa-solid fa-briefcase icon-purple"></i>
                        <h2>2. Target Job Description</h2>
                      </div>
                      <span className="card-subtitle">Paste the requirements for the job you want to target</span>
                    </div>

                    <div className="card-content flex-grow flex-column">
                      <div className="form-group flex-grow flex-column">
                        <div className="textarea-header">
                          <label htmlFor="jd-text">Paste Job Description (JD)</label>
                          <span className="char-count">{targetJd.length.toLocaleString()} chars</span>
                        </div>
                        <textarea
                          id="jd-text"
                          value={targetJd}
                          onChange={(e) => setTargetJd(e.target.value)}
                          className="flex-grow jd-textarea"
                          placeholder="Paste the complete job description text here (Key requirements, responsibilities, qualifications, tech stack)..."
                        />
                      </div>

                      <div className="form-group margin-top-md">
                        <label>Choose Output Template Style (ATS-Only)</label>
                        <div className="template-grid-picker">
                          <div onClick={() => setSelectedTemplate('sharp')} className={`template-picker-item ${selectedTemplate === 'sharp' ? 'selected' : ''}`}>
                            <div className="template-mock-icon"><i className="fa-solid fa-square-poll-vertical"></i></div>
                            <div className="template-details">
                              <strong>Sharp</strong>
                              <span>IBM Plex Serif font, clean lines</span>
                            </div>
                          </div>
                          <div onClick={() => setSelectedTemplate('minimal')} className={`template-picker-item ${selectedTemplate === 'minimal' ? 'selected' : ''}`}>
                            <div className="template-mock-icon"><i className="fa-solid fa-table-cells-large"></i></div>
                            <div className="template-details">
                              <strong>Minimal</strong>
                              <span>DM Sans font, margin layout</span>
                            </div>
                          </div>
                          <div onClick={() => setSelectedTemplate('classic')} className={`template-picker-item ${selectedTemplate === 'classic' ? 'selected' : ''}`}>
                            <div className="template-mock-icon"><i className="fa-solid fa-book-open"></i></div>
                            <div className="template-details">
                              <strong>Classic</strong>
                              <span>Georgia font, centered headings</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="align-actions margin-top-lg">
                        <button onClick={startResumeAlignment} className="btn btn-primary btn-lg btn-glow btn-block">
                          <i className="fa-solid fa-wand-magic-sparkles"></i>
                          <span>Align My Resume</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Loading screen */}
            {activeTab === 'loading' && (
              <div id="loading-screen" className="workspace-screen active">
                <div className="loading-container glass-panel">
                  <div className="spinner-container">
                    <div className="loading-glow"></div>
                    <div className="spinner"></div>
                    <i className="fa-solid fa-wand-magic-sparkles spinner-icon"></i>
                  </div>
                  <h2>Aligning Your Resume</h2>
                  <p className="loading-subtitle">Our AI model is reorganizing and highlighting matching sections...</p>

                  <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${(loadingStep + 1) * 25}%` }}></div>
                  </div>

                  <ul className="progress-steps">
                    <li className={`step ${loadingStep >= 0 ? (loadingStep > 0 ? 'completed' : 'active') : ''}`}>
                      <span className="step-dot"></span> Analyzing resume structure...
                    </li>
                    <li className={`step ${loadingStep >= 1 ? (loadingStep > 1 ? 'completed' : 'active') : ''}`}>
                      <span className="step-dot"></span> Extracting Job Description keywords...
                    </li>
                    <li className={`step ${loadingStep >= 2 ? (loadingStep > 2 ? 'completed' : 'active') : ''}`}>
                      <span className="step-dot"></span> Generating tailored experience adjustments...
                    </li>
                    <li className={`step ${loadingStep >= 3 ? (loadingStep > 3 ? 'completed' : 'active') : ''}`}>
                      <span className="step-dot"></span> Highlighting differences & formatting...
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Results screen */}
            {activeTab === 'results' && currentAlignment && (
              <div id="results-screen" className="workspace-screen active">
                <div className="results-dashboard glass-panel">
                  <div className="double-gauge-container">
                    <div className="gauge-wrapper">
                      <div className="gauge-container pre-gauge">
                        <svg className="score-ring" viewBox="0 0 120 120">
                          <circle className="score-ring-bg" cx="60" cy="60" r="50"></circle>
                          <circle
                            className="score-ring-fg"
                            cx="60" cy="60" r="50"
                            style={{
                              strokeDasharray: '314',
                              strokeDashoffset: (314 - (314 * currentAlignment.preScore) / 100).toString(),
                              stroke: currentAlignment.preScore >= 80 ? 'var(--green)' : currentAlignment.preScore >= 60 ? 'var(--yellow)' : 'var(--red)'
                            }}
                          ></circle>
                        </svg>
                        <div className="score-value">
                          <span>{currentAlignment.preScore}</span><span className="score-percent">%</span>
                          <span className="score-label">Pre-Align</span>
                        </div>
                      </div>
                    </div>

                    <div className="gauge-arrow">
                      <i className="fa-solid fa-arrow-right"></i>
                    </div>

                    <div className="gauge-wrapper">
                      <div className="gauge-container post-gauge">
                        <svg className="score-ring" viewBox="0 0 120 120">
                          <circle className="score-ring-bg" cx="60" cy="60" r="50"></circle>
                          <circle
                            className="score-ring-fg"
                            cx="60" cy="60" r="50"
                            style={{
                              strokeDasharray: '314',
                              strokeDashoffset: (314 - (314 * currentAlignment.postScore) / 100).toString(),
                              stroke: currentAlignment.postScore >= 80 ? 'var(--green)' : currentAlignment.postScore >= 60 ? 'var(--yellow)' : 'var(--red)'
                            }}
                          ></circle>
                        </svg>
                        <div className="score-value">
                          <span>{currentAlignment.postScore}</span><span className="score-percent">%</span>
                          <span className="score-label">Post-Align</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="meta-metrics">
                    <div className="metric-item">
                      <div className="metric-val text-green">{currentAlignment.matchedKeywords.length}</div>
                      <div className="metric-lbl">Matched Keywords</div>
                    </div>
                    <div className="metric-item">
                      <div className="metric-val text-red">{currentAlignment.missingKeywords.length}</div>
                      <div className="metric-lbl">Missing Keywords</div>
                    </div>
                    <div className="metric-item">
                      <div className="metric-val text-purple">{currentAlignment.modificationsCount}</div>
                      <div className="metric-lbl">AI Modifications</div>
                    </div>
                  </div>

                  <div className="divider-v"></div>

                  <div className="dashboard-details">
                    <div className="keyword-pill-section">
                      <h4>Matched Keywords:</h4>
                      <div className="keyword-pills">
                        {currentAlignment.matchedKeywords.map((k, idx) => (
                          <span key={idx} className="keyword-pill matched">{k}</span>
                        ))}
                      </div>
                    </div>
                    <div className="keyword-pill-section margin-top-sm">
                      <h4>Missing Keywords Recommended:</h4>
                      <div className="keyword-pills">
                        {currentAlignment.missingKeywords.map((k, idx) => (
                          <span key={idx} className="keyword-pill missing">{k}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="divider-v"></div>

                  <div className="dashboard-controls">
                    <button onClick={() => setActiveTab('input')} className="btn btn-secondary">
                      <i className="fa-solid fa-arrow-left"></i> Adjust Inputs
                    </button>
                    <button onClick={printResumeToPdf} className="btn btn-primary btn-glow" title="Download Aligned Resume as PDF">
                      <i className="fa-solid fa-file-pdf"></i> Download PDF
                    </button>
                  </div>
                </div>

                <div className="comparison-grid">
                  <div className="card glass-panel flex-column">
                    <div className="card-header border-bottom">
                      <div className="card-title justify-between">
                        <div className="flex-align-center gap-sm">
                          <i className="fa-solid fa-file-circle-minus icon-red"></i>
                          <h2>Original Resume</h2>
                        </div>
                        <span className="badge badge-red">Source</span>
                      </div>
                    </div>
                    <div className="card-content comparison-viewer flex-grow">
                      <div className={`resume-formatted-content active template-${selectedTemplate}`} dangerouslySetInnerHTML={renderMarkdown(currentAlignment.sourceResume, false)}></div>
                    </div>
                  </div>

                  <div className="card glass-panel flex-column">
                    <div className="card-header border-bottom">
                      <div className="card-title justify-between">
                        <div className="flex-align-center gap-sm">
                          <i className="fa-solid fa-file-circle-check icon-green"></i>
                          <h2>Aligned Resume</h2>
                        </div>
                        <div className="flex-align-center gap-sm">
                          <div className="template-switcher-control">
                            <select value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)} className="select-template-dropdown">
                              <option value="sharp">Sharp (IBM Plex Serif)</option>
                              <option value="minimal">Minimal (DM Sans)</option>
                              <option value="classic">Classic (Georgia)</option>
                            </select>
                          </div>
                          <button onClick={() => {
                            if (isEditing) {
                              saveEdit();
                            } else {
                              setIsEditing(true);
                            }
                          }} className="btn btn-secondary btn-sm" title="Edit markdown">
                            <i className={`fa-solid ${isEditing ? 'fa-check' : 'fa-pen'}`}></i> {isEditing ? 'Save' : 'Edit'}
                          </button>
                          <span className="badge badge-green">Tailored</span>
                        </div>
                      </div>
                    </div>
                    <div className="card-content comparison-viewer flex-grow relative">
                      {!isEditing ? (
                        <div className={`resume-formatted-content active template-${selectedTemplate}`} dangerouslySetInnerHTML={renderMarkdown(currentAlignment.alignedResume, true)}></div>
                      ) : (
                        <div className="resume-editor-container active">
                          <textarea
                            value={editedResumeText}
                            onChange={(e) => setEditedResumeText(e.target.value)}
                            className="editor-textarea"
                          />
                          <div className="editor-actions">
                            <button onClick={() => { setIsEditing(false); setEditedResumeText(currentAlignment.alignedResume); }} className="btn btn-secondary btn-sm">Cancel</button>
                            <button onClick={saveEdit} className="btn btn-primary btn-sm">Save Changes</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {/* Google Drive Mock Modal */}
      {driveModalOpen && (
        <div className="modal-backdrop active">
          <div className="modal-content glass-panel">
            <div className="modal-header">
              <div className="modal-title">
                <i className="fa-brands fa-google-drive icon-gdrive"></i>
                <h2>Google Drive File Picker</h2>
              </div>
              <button onClick={() => setDriveModalOpen(false)} className="btn-close">&times;</button>
            </div>
            <div className="modal-body">
              <div className="gdrive-account-indicator">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Google Profile" className="gdrive-avatar" />
                <div className="gdrive-profile-info">
                  <strong>Suhas Kumar</strong>
                  <span>suhas.kumar@gmail.com</span>
                </div>
                <span className="badge badge-green">Connected</span>
              </div>

              <div className="gdrive-breadcrumbs">
                <span className="breadcrumb-item"><i className="fa-solid fa-cloud"></i> My Drive</span>
                <i className="fa-solid fa-chevron-right separator"></i>
                <span className="breadcrumb-item active">Resumes & CVs</span>
              </div>

              <div className="gdrive-file-list">
                <div className="gdrive-header-row">
                  <span className="col-name">Name</span>
                  <span className="col-date">Last Modified</span>
                  <span className="col-size">Size</span>
                </div>
                <div className="gdrive-rows-container">
                  {[
                    { name: "Resume_FullStack_Engineer.docx", type: "docx", date: "May 12, 2026", size: "48 KB", icon: "fa-file-word icon-word" },
                    { name: "Suhas_Senior_Developer_CV.pdf", type: "pdf", date: "Jun 02, 2026", size: "142 KB", icon: "fa-file-pdf icon-pdf" },
                    { name: "Resume_UIUX_Designer.pdf", type: "pdf", date: "Apr 20, 2026", size: "310 KB", icon: "fa-file-pdf icon-pdf" },
                    { name: "Draft_Marketing_Resume.txt", type: "txt", date: "Mar 15, 2026", size: "8 KB", icon: "fa-file-lines icon-text" },
                    { name: "Suhas_Bio_Data.docx", type: "docx", date: "Jan 10, 2026", size: "35 KB", icon: "fa-file-word icon-word" }
                  ].map((file, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedDriveFile({ filename: file.name, filetype: file.type })}
                      className={`gdrive-row ${selectedDriveFile?.filename === file.name ? 'selected' : ''}`}
                    >
                      <span className="col-name"><i className={`fa-solid ${file.icon}`}></i> {file.name}</span>
                      <span className="col-date">{file.date}</span>
                      <span className="col-size">{file.size}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setDriveModalOpen(false)} className="btn btn-secondary">Cancel</button>
              <button onClick={selectDriveFile} className="btn btn-primary" disabled={!selectedDriveFile}>Select File</button>
            </div>
          </div>
        </div>
      )}

      {/* API Error Modal */}
      {apiErrorModalOpen && (
        <div className="modal-backdrop active">
          <div className="modal-content glass-panel" style={{ maxWidth: '460px' }}>
            <div className="modal-header">
              <div className="modal-title">
                <i className="fa-solid fa-circle-exclamation text-red" style={{ fontSize: '20px', color: 'var(--red)' }}></i>
                <h2>API Access Denied</h2>
              </div>
              <button onClick={() => setApiErrorModalOpen(false)} className="btn-close">&times;</button>
            </div>
            <div className="modal-body text-secondary" style={{ fontSize: '13.5px', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '24px' }}>
              <p><strong>Your Gemini API key was rejected with the following error:</strong></p>
              <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '12px 16px', borderRadius: 'var(--border-radius-md)', fontFamily: "'JetBrains Mono', monospace", fontSize: '11.5px', color: 'var(--red)', border: '1px solid rgba(239, 68, 68, 0.15)', wordBreak: 'break-word' }}>
                {apiErrorDetails}
              </div>
              <p>This error typically occurs when the <strong>Generative Language API</strong> is not enabled in your Google Cloud Project, or your API key has restrictions that prevent it from using this service.</p>
              <p><strong>Suggested Resolution:</strong></p>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>Enable the "Generative Language API" in your Google Cloud Console.</li>
                <li>Verify the API key's restrictions in GCloud APIs & Services Credentials.</li>
                <li>Or, switch to Demo/Mock Mode to run the app offline immediately.</li>
              </ul>
            </div>
            <div className="modal-footer" style={{ flexDirection: 'column', gap: '10px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
              <button onClick={() => { setApiKey(''); setApiErrorModalOpen(false); showToast('Switched to Demo Mode. Retrying alignment...', 'info'); startResumeAlignment(); }} className="btn btn-primary btn-block">Switch to Demo Mode (Use Mock AI)</button>
              <button onClick={() => { setApiErrorModalOpen(false); setSettingsOpen(true); }} className="btn btn-secondary btn-block">Keep Key & Try Again Later</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast notifications */}
      <div id="toast-container" className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.type}`}>
            <i className={`fa-solid ${t.type === 'success' ? 'fa-circle-check' : t.type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-info'}`}></i>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </>
  );
}
