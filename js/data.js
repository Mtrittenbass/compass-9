/* =============================================================================
   Compass 9, Core Data
   -----------------------------------------------------------------------------
   All majors, careers, AP roadmaps, SAT targets, and extracurriculars live here.
   Loaded via a plain <script> tag (not fetch) so the site works both on
   GitHub Pages AND when opened directly from a file:// URL for local testing.

   Salary figures: U.S. Bureau of Labor Statistics (BLS), Occupational
   Employment & Wage Statistics, most recent available (May 2024/2025).
   These are NATIONAL MEDIANS, real pay varies by city/state.

   To rename the app, change APP_DATA.appName below (that's the only place).
   ========================================================================== */

const APP_DATA = {
  appName: "Compass 9",
  tagline: "Find a path that fits you, then get the exact high school plan to get there.",

  // Shown on every Results Hub so students read salaries in context.
  regionNote:
    "Heads up: these are national median salaries. Pay often runs higher in big cities and tech hubs.",

  // SAT timing note (Results Hub, SAT section).
  satTimingNote:
    "Most students take the PSAT in sophomore/junior year and the SAT in the spring of junior year, with a retake in fall of senior year if needed.",

  // The important caveat from the data reference, shown on every AP roadmap.
  bhsCaveat:
    "This sequence (which year, which order) is standard for most public high schools. Before you schedule classes, confirm the exact prerequisites in your own high school's course catalog. AP offerings and prerequisite rules vary from school to school.",

  /* ---------------------------------------------------------------------------
     MAJORS
     Each career shows a salaryMedian (always) and, where BLS publishes one,
     a salaryLow/salaryHigh range (entry-level vs. experienced).
     ------------------------------------------------------------------------- */
  majors: [
    /* ===================== BUSINESS / FINANCE ===================== */
    {
      key: "business",
      name: "Business & Finance",
      emoji: "📈",
      short: "Money, markets, management, and the art of running things well.",
      description:
        "Business & Finance is about how organizations make decisions, use money wisely, and grow. It rewards people who like leading teams, spotting opportunities, and turning numbers into smart choices.",
      whyFits:
        "You lean toward leading, organizing, and persuading, and you're comfortable using numbers and data to make decisions.",
      sat: { low: 1450, high: 1540, note: "Typical range for competitive business programs (USC Marshall, NYU Stern, Indiana Kelley tier)." },
      extracurriculars: [
        "DECA (business & marketing competitions)",
        "FBLA, Future Business Leaders of America",
        "Investment / stock market club",
        "School-run entrepreneurship competitions"
      ],
      apRoadmap: {
        freshman: [{ name: "AP Human Geography", note: "self-contained, great first AP" }],
        sophomore: [
          { name: "AP Psychology" },
          { name: "Begin Precalculus track", note: "math foundation" }
        ],
        junior: [
          { name: "AP Calculus AB" },
          { name: "AP Microeconomics" },
          { name: "AP Macroeconomics" },
          { name: "AP English Language" }
        ],
        senior: [
          { name: "AP Statistics" },
          { name: "AP English Literature" },
          { name: "AP U.S. Government and Politics" },
          { name: "AP Computer Science Principles", note: "optional, for business analytics / fintech" }
        ]
      },
      careers: [
        {
          id: "financial-analyst",
          title: "Financial Analyst",
          salaryMedian: 101350,
          salaryLow: 62410,
          salaryHigh: 180550,
          hours: "~40/week, often more under deadlines",
          short: "Studies data and trends to help companies and people make smart money decisions.",
          long: "Financial analysts dig into financial data, market trends, and company performance to guide investment and business decisions. They build models, write reports, and recommend where money should go.",
          dayInLife: [
            "Build spreadsheets and models to forecast performance",
            "Research companies, industries, and market trends",
            "Present recommendations to managers or clients"
          ]
        },
        {
          id: "accountant-auditor",
          title: "Accountant / Auditor",
          salaryMedian: 81680,
          hours: "~40/week, heavier during tax season (Jan-Apr)",
          short: "Keeps financial records accurate and makes sure the numbers follow the rules.",
          long: "Accountants and auditors prepare and check financial records, make sure taxes are paid correctly, and confirm that organizations are following the rules. Accuracy and attention to detail are everything.",
          dayInLife: [
            "Prepare and review financial statements",
            "Check records for errors and compliance",
            "Help individuals or companies file taxes"
          ]
        },
        {
          id: "financial-manager",
          title: "Financial Manager",
          salaryMedian: 161700,
          hours: "40+/week, usually after 5+ years of experience first",
          short: "Leads a company's money strategy, budgets, investments, and long-term planning.",
          long: "Financial managers oversee the financial health of an organization. They set budgets, direct investment strategy, and plan for long-term goals. This is a leadership role you grow into after years of experience.",
          dayInLife: [
            "Set and monitor budgets across departments",
            "Guide big investment and spending decisions",
            "Lead a team of analysts and accountants"
          ]
        },
        {
          id: "management-consultant",
          title: "Management Consultant",
          salaryMedian: 101190,
          hours: "Often 40+/week, especially at consulting firms",
          short: "Gets hired to solve companies' toughest problems and make them run better.",
          long: "Management consultants are problem-solvers for hire. Companies bring them in to improve how they operate, cut costs, or launch something new. The work is fast-paced, varied, and often involves travel.",
          dayInLife: [
            "Analyze how a client's business works today",
            "Interview staff and crunch data to find fixes",
            "Pitch a plan and help the client roll it out"
          ]
        },
        {
          id: "market-research-analyst",
          title: "Market Research Analyst",
          salaryMedian: 89490,
          hours: "~40/week",
          short: "Figures out what customers want by studying data, surveys, and trends.",
          long: "Market research analysts study what people buy and why. They design surveys, analyze data, and turn it into insights that shape products, ads, and pricing.",
          dayInLife: [
            "Design surveys and collect customer data",
            "Spot patterns and trends in the numbers",
            "Turn findings into reports and recommendations"
          ]
        }
      ]
    },

    /* ===================== MEDICINE / HEALTH ===================== */
    {
      key: "medicine",
      name: "Medicine & Health",
      emoji: "🩺",
      short: "Caring for people, understanding the body, and keeping communities healthy.",
      description:
        "Medicine & Health is for people who want to help others directly and are fascinated by how the body works. It's a demanding path built on a strong science foundation.",
      whyFits:
        "You're drawn to helping people directly and enjoy science, especially figuring out how the human body works.",
      sat: { low: 1450, high: 1550, note: "Typical for competitive pre-med / biology-heavy undergraduate programs." },
      extracurriculars: [
        "HOSA, Health Occupations Students of America",
        "Hospital / clinic volunteering",
        "Science Olympiad",
        "Red Cross programs"
      ],
      apRoadmap: {
        freshman: [{ name: "Biology + Algebra track", note: "no AP yet, build the science foundation first" }],
        sophomore: [
          { name: "AP Human Geography", note: "optional" },
          { name: "Continue toward Chemistry" }
        ],
        junior: [
          { name: "AP Chemistry" },
          { name: "AP Biology" },
          { name: "AP Calculus AB" },
          { name: "AP Psychology" }
        ],
        senior: [
          { name: "AP Physics 1 and/or AP Physics 2" },
          { name: "AP Environmental Science" },
          { name: "AP Statistics" },
          { name: "AP Research (Capstone)", note: "strong option for an independent health project" }
        ]
      },
      careers: [
        {
          id: "physician-surgeon",
          title: "Physician / Surgeon",
          salaryMedian: 239200,
          salaryNote: "median $239,200+; specialists earn more",
          hours: "40+/week, often irregular, on-call and overnight shifts",
          short: "Diagnoses and treats illness and injury, the doctor you see when something's wrong.",
          long: "Physicians and surgeons diagnose illness, prescribe treatment, and perform procedures. It's the longest training path in this list (college + medical school + residency), but also one of the most respected and highest-paid.",
          dayInLife: [
            "Examine patients and diagnose conditions",
            "Order tests and design treatment plans",
            "Perform procedures or surgery (for surgeons)"
          ]
        },
        {
          id: "registered-nurse",
          title: "Registered Nurse (RN)",
          salaryMedian: 93600,
          hours: "Shift-based, may include nights, weekends, and holidays",
          short: "Cares for patients day to day and is the heartbeat of any hospital.",
          long: "Registered nurses provide direct patient care, give medications, monitor conditions, and support patients and families. Nurses are the people patients see most, and the field is always in demand.",
          dayInLife: [
            "Monitor patients and record vital signs",
            "Give medications and treatments",
            "Coordinate care with doctors and families"
          ]
        },
        {
          id: "nurse-practitioner",
          title: "Nurse Practitioner (NP)",
          salaryMedian: 137300,
          hours: "Generally more regular hours than hospital shift nursing",
          short: "An advanced nurse who can diagnose, treat, and prescribe in many settings.",
          long: "Nurse practitioners are advanced-practice nurses. In many states they can diagnose, treat, and prescribe like a physician. It's a strong middle path, high responsibility with shorter training than becoming a doctor.",
          dayInLife: [
            "See patients and diagnose common conditions",
            "Prescribe medication and order tests",
            "Manage ongoing care for a set of patients"
          ]
        },
        {
          id: "health-services-manager",
          title: "Medical & Health Services Manager",
          salaryMedian: 117960,
          hours: "40+/week",
          short: "Runs the business side of hospitals and clinics so care runs smoothly.",
          long: "Health services managers keep hospitals, clinics, and practices running, staffing, budgets, compliance, and operations. It blends healthcare with business, so you help people without treating patients directly.",
          dayInLife: [
            "Manage staffing, schedules, and budgets",
            "Make sure the facility follows regulations",
            "Improve how the department or clinic runs"
          ]
        }
      ]
    },

    /* ===================== ENGINEERING ===================== */
    {
      key: "engineering",
      name: "Engineering",
      emoji: "⚙️",
      short: "Designing and building the machines, structures, and systems around us.",
      description:
        "Engineering turns math and science into things that work, bridges, machines, circuits, and more. It's ideal for hands-on problem-solvers who love figuring out how and why things work.",
      whyFits:
        "You like building and fixing things, and you're strong in math and science, especially applying them to real problems.",
      sat: { low: 1450, high: 1560, note: "Typical for competitive engineering programs." },
      extracurriculars: [
        "Robotics club (FRC / FTC)",
        "Science Olympiad",
        "Math Club / math competitions"
      ],
      apRoadmap: {
        freshman: [{ name: "Geometry / Algebra 2 track" }, { name: "Intro coding elective", note: "non-AP, good complement" }],
        sophomore: [
          { name: "AP Human Geography", note: "optional" },
          { name: "Precalculus" }
        ],
        junior: [
          { name: "AP Calculus AB" },
          { name: "AP Physics 1" },
          { name: "AP Chemistry" },
          { name: "AP Computer Science A" }
        ],
        senior: [
          { name: "AP Calculus BC" },
          { name: "AP Physics C: Mechanics" },
          { name: "AP Physics C: Electricity & Magnetism" },
          { name: "AP Statistics", note: "optional" }
        ]
      },
      careers: [
        {
          id: "mechanical-engineer",
          title: "Mechanical Engineer",
          salaryMedian: 102320,
          hours: "~40/week, sometimes more",
          short: "Designs and builds machines, engines, and moving systems of all kinds.",
          long: "Mechanical engineers design anything that moves or has moving parts, engines, robots, tools, HVAC systems, and more. They combine physics and creativity to build things that work in the real world.",
          dayInLife: [
            "Design parts and machines with CAD software",
            "Test prototypes and troubleshoot failures",
            "Work with a team to bring a product to life"
          ]
        },
        {
          id: "civil-engineer",
          title: "Civil Engineer",
          salaryMedian: 99590,
          hours: "~40/week",
          short: "Designs the roads, bridges, and buildings that hold up modern life.",
          long: "Civil engineers design and oversee big infrastructure, roads, bridges, dams, water systems, and buildings. They make sure these structures are safe, durable, and built correctly.",
          dayInLife: [
            "Design structures and review plans",
            "Run calculations to keep projects safe",
            "Visit construction sites to check progress"
          ]
        },
        {
          id: "electrical-engineer",
          title: "Electrical Engineer",
          salaryMedian: 111910,
          hours: "~40/week",
          short: "Designs the electronics and power systems behind almost every device.",
          long: "Electrical engineers design circuits, power systems, and electronics, from phone chips to city power grids. It's a field for people who like precision and invisible-but-essential systems.",
          dayInLife: [
            "Design and test circuits and electronics",
            "Solve power and signal problems",
            "Collaborate on products from phones to grids"
          ]
        },
        {
          id: "computer-hardware-engineer",
          title: "Computer Hardware Engineer",
          salaryMedian: 155020,
          hours: "~40/week",
          short: "Designs the physical guts of computers, chips, boards, and processors.",
          long: "Computer hardware engineers design the physical components of computers and devices: processors, memory, circuit boards. They sit at the crossroads of electrical engineering and computer science.",
          dayInLife: [
            "Design and test computer components",
            "Optimize hardware for speed and power use",
            "Work closely with software teams"
          ]
        }
      ]
    },

    /* ===================== COMPUTER SCIENCE ===================== */
    {
      key: "cs",
      name: "Computer Science",
      emoji: "💻",
      short: "Writing the code and building the software that runs the modern world.",
      description:
        "Computer Science is about solving problems with code. It's a strong fit for logical thinkers and builders, and it opens doors to some of the highest-paid, fastest-growing jobs out there.",
      whyFits:
        "You enjoy logic and puzzles, and you like the idea of building apps, games, or tools that people actually use.",
      sat: { low: 1480, high: 1570, note: "Typical for competitive CS programs, which tend to be math-score-sensitive." },
      extracurriculars: [
        "Hackathons",
        "Competitive programming (USACO)",
        "CyberPatriot (cybersecurity)",
        "School coding club"
      ],
      apRoadmap: {
        freshman: [{ name: "Intro coding elective (Python)", note: "non-AP" }, { name: "Algebra" }],
        sophomore: [
          { name: "AP Computer Science Principles" },
          { name: "AP Human Geography", note: "optional" }
        ],
        junior: [
          { name: "AP Computer Science A" },
          { name: "AP Calculus AB" },
          { name: "AP Physics 1" }
        ],
        senior: [
          { name: "AP Calculus BC" },
          { name: "AP Statistics" },
          { name: "AP Physics C: Mechanics", note: "optional" },
          { name: "AP Research", note: "if doing an independent CS project" }
        ]
      },
      careers: [
        {
          id: "software-developer",
          title: "Software Developer",
          salaryMedian: 133080,
          hours: "~40/week",
          short: "Builds the apps, websites, and programs people use every day.",
          long: "Software developers design, write, and maintain the programs behind apps, websites, and systems. It's creative and logical at once, and it's one of the most in-demand careers today.",
          dayInLife: [
            "Write and test code for new features",
            "Fix bugs and improve existing software",
            "Plan projects with a team of engineers"
          ]
        },
        {
          id: "web-developer",
          title: "Web Developer",
          salaryMedian: 98770,
          hours: "~40/week",
          short: "Designs and codes websites and web apps that work and look great.",
          long: "Web developers build the websites and web apps you use in a browser. Some focus on the visual, user-facing side; others on the servers and data behind it. Great for people who like fast, visible results.",
          dayInLife: [
            "Build web pages and features",
            "Make sites fast, responsive, and accessible",
            "Connect the front end to data and servers"
          ]
        },
        {
          id: "qa-analyst",
          title: "Software QA Analyst / Tester",
          salaryMedian: 102610,
          hours: "~40/week",
          short: "Hunts for bugs and makes sure software actually works before it ships.",
          long: "Quality assurance analysts test software to catch problems before users do. They design test plans, break things on purpose, and make sure a product is reliable. Great for detail-oriented problem-finders.",
          dayInLife: [
            "Design and run tests on software",
            "Find, document, and re-check bugs",
            "Work with developers to confirm fixes"
          ]
        },
        {
          id: "computer-programmer",
          title: "Computer Programmer",
          salaryMedian: 98670,
          hours: "~40/week",
          short: "Writes and tweaks the code that makes software run.",
          long: "Computer programmers write and adjust the code that turns designs into working software. Note: this exact job title is shrinking as the broader 'software developer' role absorbs it, but the coding skills transfer directly.",
          caveat: "This specific job category is shrinking as 'software developer' absorbs it, the underlying skills still transfer.",
          dayInLife: [
            "Write code from a developer's design",
            "Update and maintain existing programs",
            "Test code and fix errors"
          ]
        }
      ]
    },

    /* ===================== LAW / PRE-LAW ===================== */
    {
      key: "law",
      name: "Law & Pre-Law",
      emoji: "⚖️",
      short: "Argument, justice, and the rules that hold society together.",
      description:
        "Law is for strong readers, writers, and arguers who care about fairness and how society works. The path runs through college and then law school, the SAT matters for college, and the LSAT comes later.",
      whyFits:
        "You like reading, writing, and building an argument, and you care about fairness and how the rules of society work.",
      sat: { low: 1400, high: 1520, note: "Typical for strong political science / pre-law undergrad programs. Law school admission itself depends on the LSAT later, not this SAT." },
      extracurriculars: [
        "Mock Trial",
        "Model UN",
        "Debate / Speech",
        "Youth & Government"
      ],
      apRoadmap: {
        freshman: [{ name: "AP Human Geography" }],
        sophomore: [
          { name: "AP European History or AP World History: Modern" },
          { name: "AP Psychology" }
        ],
        junior: [
          { name: "AP United States History" },
          { name: "AP English Language" },
          { name: "AP Microeconomics / Macroeconomics" }
        ],
        senior: [
          { name: "AP U.S. Government and Politics" },
          { name: "AP Comparative Government and Politics" },
          { name: "AP English Literature" },
          { name: "AP Seminar / Research", note: "builds argumentation skills" }
        ]
      },
      careers: [
        {
          id: "lawyer",
          title: "Lawyer",
          salaryMedian: 151160,
          salaryLow: 72780,
          salaryHigh: 239200,
          hours: "40+/week, often more",
          short: "Advises and represents people, arguing cases and navigating the rules of society.",
          long: "Lawyers advise clients, negotiate deals, write contracts, and argue cases in court. The specialties are huge, criminal, corporate, environmental, civil rights, and more. It takes college plus law school.",
          dayInLife: [
            "Research laws and past cases",
            "Write contracts, briefs, and arguments",
            "Advise clients and represent them in court"
          ]
        },
        {
          id: "judge-magistrate",
          title: "Judge / Magistrate",
          salaryMedian: 143830,
          hours: "~40/week (after many years practicing law first)",
          short: "Runs the courtroom and makes the final call on legal disputes.",
          long: "Judges preside over court cases, apply the law, and make rulings. It's a role you reach after years as a practicing lawyer, a career capstone rather than an entry point.",
          dayInLife: [
            "Preside over hearings and trials",
            "Review evidence and legal arguments",
            "Issue rulings and sentences"
          ]
        },
        {
          id: "arbitrator-mediator",
          title: "Arbitrator / Mediator",
          salaryMedian: 91010,
          hours: "~40/week",
          short: "Helps two sides settle a disagreement without a full court battle.",
          long: "Arbitrators and mediators help people resolve disputes outside of court. They listen to both sides and guide them to a fair agreement. Great for calm, fair-minded people who are good at seeing every angle.",
          dayInLife: [
            "Hear both sides of a dispute",
            "Guide the parties toward an agreement",
            "Write up settlements or decisions"
          ]
        }
      ]
    },

    /* ===================== SOCIAL SCIENCES ===================== */
    {
      key: "social",
      name: "Social Sciences",
      emoji: "🧠",
      short: "Understanding people, societies, and the choices that drive them.",
      description:
        "Social Sciences, psychology, political science, economics, study why people and groups behave the way they do. It's for curious thinkers who like research, writing, and understanding human behavior.",
      whyFits:
        "You're curious about why people behave the way they do, and you enjoy research, discussion, and analyzing ideas.",
      sat: { low: 1350, high: 1500, note: "A wide range, since this field spans many different programs." },
      extracurriculars: [
        "Model UN",
        "Psychology Club",
        "Debate",
        "Peer counseling / peer mediation"
      ],
      apRoadmap: {
        freshman: [{ name: "AP Human Geography" }],
        sophomore: [
          { name: "AP Psychology" },
          { name: "AP World History: Modern" }
        ],
        junior: [
          { name: "AP United States History" },
          { name: "AP Macroeconomics" },
          { name: "AP Microeconomics" },
          { name: "AP English Language" }
        ],
        senior: [
          { name: "AP U.S. Government and Politics" },
          { name: "AP Comparative Government and Politics" },
          { name: "AP Statistics" },
          { name: "AP Research", note: "strong senior capstone for this track" }
        ]
      },
      careers: [
        {
          id: "psychologist",
          title: "Psychologist",
          salaryMedian: 94310,
          hours: "Full-time common; part-time also common; some evenings/weekends",
          short: "Studies how people think, feel, and behave, and helps them work through it.",
          long: "Psychologists study the mind and behavior. Some do therapy and counseling; others do research or work in schools, businesses, or hospitals. Most roles require graduate school after college.",
          dayInLife: [
            "Meet with clients or run research studies",
            "Assess behavior and mental health",
            "Design plans or treatments to help people"
          ]
        },
        {
          id: "economist",
          title: "Economist",
          salaryMedian: 142130,
          hours: "~40/week",
          short: "Studies how money, resources, and choices move through the world.",
          long: "Economists analyze data on money, jobs, and resources to explain trends and advise governments and companies. It blends social science with heavy math and data work.",
          dayInLife: [
            "Collect and analyze economic data",
            "Build models to predict trends",
            "Write reports and advise decision-makers"
          ]
        },
        {
          id: "survey-researcher",
          title: "Survey / Market Researcher",
          salaryMedian: 79580,
          hours: "~40/week",
          short: "Designs surveys and studies to figure out what people really think.",
          long: "Survey researchers design and analyze surveys to measure opinions, behaviors, and trends. Their work informs everything from products to public policy.",
          dayInLife: [
            "Design survey questions and samples",
            "Collect and clean response data",
            "Turn results into clear findings"
          ]
        }
      ]
    },

    /* ===================== ARTS & DESIGN ===================== */
    {
      key: "arts",
      name: "Arts & Design",
      emoji: "🎨",
      short: "Turning creativity into visuals, products, and experiences people love.",
      description:
        "Arts & Design is for visual, creative people who want to make things that look and feel great, from brands and products to animation and film. Portfolios often matter more than test scores here.",
      whyFits:
        "You're visual and creative, and you love making original things, designs, art, video, or products.",
      sat: {
        low: 1300,
        high: 1480,
        note: "Many art/design programs are test-optional or portfolio-weighted, so the SAT matters less here than in other tracks. Focus on building a strong portfolio."
      },
      extracurriculars: [
        "National Art Honor Society",
        "School art shows / exhibitions",
        "Scholastic Art & Writing Awards submissions"
      ],
      apRoadmap: {
        freshman: [{ name: "Foundational art elective", note: "non-AP, start your portfolio" }],
        sophomore: [
          { name: "AP Art History", note: "optional, good for the analytical side" },
          { name: "Continue portfolio work" }
        ],
        junior: [
          { name: "AP 2-D Art and Design, AP 3-D Art and Design, or AP Drawing", note: "pick based on your medium" }
        ],
        senior: [
          { name: "Continue your AP Art portfolio" },
          { name: "AP Seminar / Research", note: "optional, for design-thinking students" }
        ]
      },
      careers: [
        {
          id: "graphic-designer",
          title: "Graphic Designer",
          salaryMedian: 61300,
          hours: "~40/week, deadline-driven; evenings if self-employed",
          short: "Creates the visuals, logos, layouts, ads, that shape how brands look.",
          long: "Graphic designers create visual content: logos, posters, websites, packaging, and ads. They combine creativity with tools like Photoshop and Illustrator to communicate ideas visually.",
          dayInLife: [
            "Design layouts, logos, and graphics",
            "Take client feedback and revise",
            "Prepare final files for print or web"
          ]
        },
        {
          id: "art-director",
          title: "Art Director",
          salaryMedian: 112040,
          hours: "~40/week",
          short: "Leads the creative vision and directs a team of designers and artists.",
          long: "Art directors set the overall look and feel of a project, a magazine, ad campaign, film, or brand, and lead the creative team that makes it happen. It's a senior role you grow into from designer.",
          dayInLife: [
            "Set the creative direction for a project",
            "Guide and review a team's work",
            "Present concepts to clients or executives"
          ]
        },
        {
          id: "industrial-designer",
          title: "Commercial / Industrial Designer",
          salaryMedian: 63040,
          hours: "~40/week",
          short: "Designs the everyday products you use, blending looks and function.",
          long: "Industrial designers shape the products around you, furniture, gadgets, tools, cars. They balance how something looks with how it works and how it's manufactured.",
          dayInLife: [
            "Sketch and model product designs",
            "Prototype and test how products feel",
            "Work with engineers to make them buildable"
          ]
        },
        {
          id: "animator",
          title: "Animator / Special Effects Artist",
          salaryMedian: 73150,
          hours: "Often deadline / project-based",
          short: "Brings characters, games, and movie effects to life on screen.",
          long: "Animators and effects artists create the moving images in films, TV, games, and ads. They use specialized software to make characters and worlds move and feel real.",
          dayInLife: [
            "Create and animate characters or effects",
            "Refine motion frame by frame",
            "Collaborate with directors and studios"
          ]
        }
      ]
    }
  ]
};

/* Convenience lookups (used by the app). */
const MAJORS_BY_KEY = APP_DATA.majors.reduce((acc, m) => {
  acc[m.key] = m;
  return acc;
}, {});

function getMajor(key) {
  return MAJORS_BY_KEY[key] || null;
}

function getCareer(majorKey, careerId) {
  const major = getMajor(majorKey);
  if (!major) return null;
  return major.careers.find((c) => c.id === careerId) || null;
}

/* Field cover photos (Unsplash) + a fallback tint used if the photo fails. */
const FIELD_MEDIA = {
  business:    { img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=70", tint: "#2f6bed" },
  medicine:    { img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=70", tint: "#0e9d8f" },
  engineering: { img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=70", tint: "#d98a2b" },
  cs:          { img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=70", tint: "#6a54e0" },
  law:         { img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=70", tint: "#b8862b" },
  social:      { img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=70", tint: "#2f9e8f" },
  arts:        { img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=70", tint: "#d94f8a" }
};
function fieldMedia(key) { return FIELD_MEDIA[key] || { img: "", tint: "#3B6EF5" }; }
