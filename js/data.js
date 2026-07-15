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
        },
        {
          id: "personal-financial-advisor",
          title: "Personal Financial Advisor",
          salaryMedian: 99580,
          hours: "~40/week, some evenings to meet clients",
          short: "Helps people plan savings, investments, college, and retirement.",
          long: "Personal financial advisors guide individuals and families through big money decisions: saving, investing, taxes, college, and retirement. They build a long-term plan and adjust it as life changes.",
          dayInLife: [
            "Meet clients to understand their goals",
            "Build savings and investment plans",
            "Review and adjust portfolios over time"
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
        },
        {
          id: "pharmacist",
          title: "Pharmacist",
          salaryMedian: 136030,
          hours: "Shift-based; includes some evenings and weekends",
          short: "The medication expert who fills prescriptions and keeps patients safe.",
          long: "Pharmacists dispense medications, check for harmful drug interactions, and advise patients on how to take them. It takes a Doctor of Pharmacy degree after college, and it pays well.",
          dayInLife: [
            "Review and fill prescriptions accurately",
            "Check for dangerous drug interactions",
            "Counsel patients on their medications"
          ]
        },
        {
          id: "physical-therapist",
          title: "Physical Therapist",
          salaryMedian: 99710,
          hours: "~40/week",
          short: "Helps people recover movement and strength after injury or illness.",
          long: "Physical therapists help patients rebuild strength and movement after injuries, surgeries, or illness. It blends science, hands-on care, and coaching, and requires a doctoral degree after college.",
          dayInLife: [
            "Assess a patient's movement and pain",
            "Guide them through recovery exercises",
            "Track progress and adjust the plan"
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
        },
        {
          id: "aerospace-engineer",
          title: "Aerospace Engineer",
          salaryMedian: 130720,
          hours: "~40/week",
          short: "Designs aircraft, spacecraft, satellites, and missiles.",
          long: "Aerospace engineers design and test things that fly, from airplanes and drones to rockets and satellites. It's one of the most advanced engineering fields, heavy on physics and math.",
          dayInLife: [
            "Design and simulate flight systems",
            "Test prototypes and analyze results",
            "Solve problems in aerodynamics and propulsion"
          ]
        },
        {
          id: "biomedical-engineer",
          title: "Biomedical Engineer",
          salaryMedian: 100730,
          hours: "~40/week",
          short: "Designs medical devices, from prosthetics to imaging machines.",
          long: "Biomedical engineers apply engineering to medicine, designing artificial limbs, pacemakers, imaging machines, and lab equipment. It's a great fit if you like both healthcare and building things.",
          dayInLife: [
            "Design medical devices and equipment",
            "Test for safety and reliability",
            "Work with doctors on real needs"
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
        },
        {
          id: "data-scientist",
          title: "Data Scientist",
          salaryMedian: 108020,
          hours: "~40/week",
          short: "Finds patterns in huge amounts of data to answer real questions.",
          long: "Data scientists use code, statistics, and machine learning to pull insights out of massive datasets, the people behind recommendations, forecasts, and the AI tools everyone's talking about.",
          dayInLife: [
            "Clean and explore large datasets",
            "Build models that predict or classify",
            "Turn results into decisions for the team"
          ]
        },
        {
          id: "security-analyst",
          title: "Information Security Analyst",
          salaryMedian: 120360,
          hours: "~40/week, some on-call",
          short: "Defends companies and people from hackers and data breaches.",
          long: "Information security analysts protect networks and data from cyberattacks. They hunt for weaknesses, respond to breaches, and stay a step ahead of hackers. It's one of the fastest-growing tech fields.",
          dayInLife: [
            "Monitor systems for threats and attacks",
            "Test defenses and fix weak spots",
            "Respond fast when something breaks in"
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
        },
        {
          id: "paralegal",
          title: "Paralegal",
          salaryMedian: 60970,
          hours: "~40/week",
          short: "The legal researcher who keeps cases organized and moving.",
          long: "Paralegals support lawyers by researching cases, drafting documents, and organizing evidence. It's a way into the legal world without law school, and a great stepping stone if you're considering it.",
          dayInLife: [
            "Research laws and past cases",
            "Draft contracts and legal documents",
            "Organize evidence and case files"
          ]
        },
        {
          id: "prosecutor",
          title: "Prosecutor / District Attorney",
          salaryMedian: 100000,
          hours: "40+/week, often more during trials",
          short: "The lawyer who represents the government and argues criminal cases.",
          long: "Prosecutors are lawyers who represent the public in criminal cases, deciding what charges to bring and arguing them in court. It's a high-stakes path for people who want to serve justice directly.",
          dayInLife: [
            "Review cases and decide on charges",
            "Prepare witnesses and evidence",
            "Argue cases in front of a judge and jury"
          ]
        },
        {
          id: "corporate-lawyer",
          title: "Corporate Lawyer",
          salaryMedian: 145000,
          hours: "40+/week, often long hours at big firms",
          short: "Advises companies on deals, contracts, and staying within the law.",
          long: "Corporate lawyers advise businesses on contracts, mergers, and regulations. Instead of courtrooms, much of the work is negotiating deals and reviewing documents. It's one of the higher-paid legal paths.",
          dayInLife: [
            "Draft and review business contracts",
            "Advise on deals and regulations",
            "Negotiate on behalf of the company"
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
        },
        {
          id: "political-scientist",
          title: "Political Scientist",
          salaryMedian: 132350,
          hours: "~40/week",
          short: "Studies governments, elections, and public policy.",
          long: "Political scientists study how governments and politics work, analyzing elections, policies, and public opinion. They advise campaigns, think tanks, and government agencies. Most roles need graduate school.",
          dayInLife: [
            "Research policies and political trends",
            "Analyze polling and election data",
            "Advise leaders or write reports"
          ]
        },
        {
          id: "social-worker",
          title: "Social Worker",
          salaryMedian: 58380,
          hours: "~40/week, sometimes evenings/on-call",
          short: "Supports people through tough situations and connects them to help.",
          long: "Social workers help people navigate hard moments, family crises, mental health, poverty, connecting them with resources and support. It's demanding and deeply people-focused work.",
          dayInLife: [
            "Meet with individuals and families",
            "Connect people to services and support",
            "Advocate for clients' needs"
          ]
        },
        {
          id: "urban-planner",
          title: "Urban & Regional Planner",
          salaryMedian: 81800,
          hours: "~40/week",
          short: "Designs how cities and neighborhoods grow and function.",
          long: "Urban planners shape how communities develop, deciding where housing, parks, transit, and businesses should go. It blends social science, design, and public policy to make cities work better.",
          dayInLife: [
            "Study land use and community needs",
            "Design plans for growth and transit",
            "Present proposals at public meetings"
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
        },
        {
          id: "ux-designer",
          title: "UX / Product Designer",
          salaryMedian: 98000,
          hours: "~40/week",
          short: "Designs how apps and websites look and feel to use.",
          long: "UX (user experience) designers shape how digital products work, mapping out screens, buttons, and flows so apps feel simple and intuitive. It blends art, psychology, and tech, and it's in high demand.",
          dayInLife: [
            "Sketch and prototype app screens",
            "Test designs with real users",
            "Refine the flow so it feels effortless"
          ]
        },
        {
          id: "architect",
          title: "Architect",
          salaryMedian: 93310,
          hours: "~40/week, more near deadlines",
          short: "Designs buildings that are beautiful, safe, and functional.",
          long: "Architects design buildings and spaces, balancing looks, safety, budget, and how people will actually use them. It combines art, engineering, and problem-solving, and requires a professional degree plus licensing.",
          dayInLife: [
            "Sketch and model building designs",
            "Balance beauty, cost, and safety",
            "Work with engineers and clients"
          ]
        }
      ]
    },

    /* ===================== EDUCATION & TEACHING ===================== */
    {
      key: "education",
      name: "Education & Teaching",
      emoji: "🎓",
      short: "Helping people learn, grow, and reach their potential.",
      description:
        "Education is for people who love a subject and love helping others get it. It's a stable, meaningful path with roles from the classroom to running whole programs.",
      whyFits:
        "You're patient, you like explaining things, and you get satisfaction from watching someone finally understand.",
      sat: { low: 1200, high: 1400, note: "Typical for solid education and liberal-arts programs; teaching is more about people skills than test scores." },
      extracurriculars: [
        "Educators Rising (future teachers)",
        "Peer tutoring / homework help",
        "Coaching, camp counseling, or mentoring",
        "Key Club or other service clubs"
      ],
      apRoadmap: {
        freshman: [{ name: "AP Human Geography", note: "optional, good first AP" }, { name: "Start peer tutoring" }],
        sophomore: [{ name: "AP Psychology" }, { name: "AP World History: Modern" }],
        junior: [
          { name: "AP English Language" },
          { name: "AP U.S. History" },
          { name: "An AP in your future subject", note: "math, science, or history" }
        ],
        senior: [
          { name: "AP English Literature" },
          { name: "AP U.S. Government and Politics" },
          { name: "AP Statistics or AP Research" }
        ]
      },
      careers: [
        {
          id: "elementary-teacher",
          title: "Elementary School Teacher",
          salaryMedian: 63680,
          hours: "~40/week plus grading; summers off",
          short: "Teaches young kids everything from reading to first science.",
          long: "Elementary teachers guide young students through the building blocks of learning, reading, math, and how to be a good classmate. It's demanding, creative, and hugely important work.",
          dayInLife: ["Plan and teach lessons across subjects", "Support each kid's progress", "Work with parents and other teachers"]
        },
        {
          id: "high-school-teacher",
          title: "High School Teacher",
          salaryMedian: 65220,
          hours: "~40/week plus grading; summers off",
          short: "Teaches a subject you love to teenagers.",
          long: "High school teachers specialize in one subject, like math, science, English, or history, and help teens master it while preparing them for college and life. Great for people who love their field and want to share it.",
          dayInLife: ["Plan and teach subject lessons", "Grade work and give feedback", "Coach, advise, or run a club"]
        },
        {
          id: "school-counselor",
          title: "School Counselor",
          salaryMedian: 61710,
          hours: "~40/week; school-year schedule",
          short: "Guides students through classes, college, and tough moments.",
          long: "School counselors help students choose classes, plan for college and careers, and work through personal challenges. If you like the idea behind Compass 9, this is basically that job in real life.",
          dayInLife: ["Meet students about plans and problems", "Guide course and college choices", "Connect students to support"]
        },
        {
          id: "special-ed-teacher",
          title: "Special Education Teacher",
          salaryMedian: 65910,
          hours: "~40/week plus planning; summers off",
          short: "Adapts learning so every student can succeed.",
          long: "Special education teachers work with students who learn differently, adapting lessons and support so each one can thrive. It takes patience, creativity, and a lot of heart.",
          dayInLife: ["Build custom learning plans", "Adapt lessons for each student", "Coordinate with families and staff"]
        },
        {
          id: "instructional-coordinator",
          title: "Instructional Coordinator",
          salaryMedian: 74620,
          hours: "~40/week",
          short: "Designs what and how schools teach.",
          long: "Instructional coordinators shape curriculum and train teachers, deciding what students learn and how. It's a behind-the-scenes leadership role you grow into after classroom experience.",
          dayInLife: ["Develop curriculum and standards", "Train and support teachers", "Review what's working and improve it"]
        },
        {
          id: "professor",
          title: "College Professor",
          salaryMedian: 84380,
          hours: "Flexible; heavy during research and grading",
          short: "Teaches and researches a subject at the college level.",
          long: "Professors teach college courses and often run research in their field. It's the top of the education path, requiring a master's or PhD, and it lets you go deep on a subject you love.",
          dayInLife: ["Teach and mentor college students", "Research and publish in your field", "Advise students and grade work"]
        }
      ]
    },

    /* ===================== MEDIA & COMMUNICATIONS ===================== */
    {
      key: "media",
      name: "Media & Communications",
      emoji: "🎬",
      short: "Telling stories and shaping how the world sees a message.",
      description:
        "Media & Communications is for strong writers, talkers, and creators who want to inform, persuade, and entertain, across news, marketing, video, and social.",
      whyFits:
        "You're a strong communicator who likes creating content, telling stories, and shaping how people see things.",
      sat: { low: 1250, high: 1440, note: "Typical for competitive journalism, communications, and marketing programs." },
      extracurriculars: [
        "School newspaper or yearbook",
        "Broadcast / video / podcast club",
        "DECA (marketing) or debate & speech",
        "Running a social media or content team"
      ],
      apRoadmap: {
        freshman: [{ name: "AP Human Geography", note: "optional" }, { name: "Join the school paper or media team" }],
        sophomore: [{ name: "AP Psychology" }, { name: "AP World History: Modern" }],
        junior: [
          { name: "AP English Language" },
          { name: "AP U.S. History" },
          { name: "AP Seminar", note: "builds research + argument" }
        ],
        senior: [
          { name: "AP English Literature" },
          { name: "AP U.S. Government and Politics" },
          { name: "AP Research" },
          { name: "AP Computer Science Principles", note: "optional, for digital media" }
        ]
      },
      careers: [
        {
          id: "journalist",
          title: "Journalist / Reporter",
          salaryMedian: 57500,
          hours: "Often irregular; news happens anytime",
          short: "Investigates and reports the real story behind the news.",
          long: "Journalists find, verify, and tell true stories, from local news to national investigations. It's fast-paced and vital to democracy, and increasingly digital and multimedia.",
          dayInLife: ["Chase leads and interview sources", "Verify facts under deadline", "Write and publish the story"]
        },
        {
          id: "pr-specialist",
          title: "Public Relations Specialist",
          salaryMedian: 67440,
          hours: "~40/week, more during a crisis",
          short: "Shapes and protects the public image of a brand or person.",
          long: "PR specialists manage how organizations are seen, writing press releases, handling media, and steering the message, especially when something goes wrong. It's strategic, fast, and people-heavy.",
          dayInLife: ["Write press releases and pitches", "Build relationships with media", "Manage the message in a crisis"]
        },
        {
          id: "marketing-manager",
          title: "Marketing Manager",
          salaryMedian: 157620,
          hours: "40+/week",
          short: "Leads the campaigns that get people to notice and buy.",
          long: "Marketing managers plan and run the campaigns behind products and brands, ads, social, launches, and more. It blends creativity with data and leadership, and it's one of the higher-paid comms roles.",
          dayInLife: ["Plan campaigns and brand strategy", "Lead a creative and analytics team", "Track results and adjust"]
        },
        {
          id: "editor",
          title: "Editor",
          salaryMedian: 75020,
          hours: "~40/week, deadline-driven",
          short: "Shapes writing into its clearest, strongest final form.",
          long: "Editors plan, review, and polish content, sharpening writing, checking facts, and guiding writers. They set the voice and quality bar for publications, sites, and brands.",
          dayInLife: ["Assign and plan stories", "Edit for clarity and accuracy", "Coach writers and set the voice"]
        },
        {
          id: "film-video-editor",
          title: "Film & Video Editor",
          salaryMedian: 66600,
          hours: "Project-based; long hours near deadlines",
          short: "Cuts raw footage into the final story you watch.",
          long: "Film and video editors assemble raw footage into finished videos, films, ads, YouTube, and shows, choosing every cut, transition, and beat. It's where a lot of the storytelling actually happens.",
          dayInLife: ["Organize and review footage", "Cut scenes and add sound and effects", "Refine the pacing and final look"]
        },
        {
          id: "technical-writer",
          title: "Technical Writer",
          salaryMedian: 80050,
          hours: "~40/week",
          short: "Turns complicated things into clear instructions people can follow.",
          long: "Technical writers explain complex products and processes in plain language, manuals, help articles, and guides. Great for people who write clearly and like making hard things simple.",
          dayInLife: ["Learn how a product or process works", "Write clear guides and docs", "Test that instructions actually work"]
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
  arts:        { img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=70", tint: "#d94f8a" },
  education:   { img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=70", tint: "#2b8a72" },
  media:       { img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=70", tint: "#c0392b" }
};
function fieldMedia(key) { return FIELD_MEDIA[key] || { img: "", tint: "#3B6EF5" }; }

/* Per-career photos (Unsplash). If one fails to load it falls back to the
   field photo, so a career card is never left blank. */
const CAREER_IMG = {
  // business
  "financial-analyst": "1590283603385-17ffb3a7f29f",
  "accountant-auditor": "1554224155-6726b3ff858f",
  "financial-manager": "1521737711867-e3b97375f902",
  "management-consultant": "1552664730-d307ca884978",
  "market-research-analyst": "1551288049-bebda4e38f71",
  // medicine
  "physician-surgeon": "1612349317150-e413f6a5b16d",
  "registered-nurse": "1576765608535-5f04d1e3f289",
  "nurse-practitioner": "1559839734-2b71ea197ec2",
  "health-services-manager": "1519494026892-80bbd2d6fd0d",
  // engineering
  "mechanical-engineer": "1581092918056-0c4c3acd3789",
  "civil-engineer": "1541888946425-d81bb19240f5",
  "electrical-engineer": "1620283085439-39620a1e21c4",
  "computer-hardware-engineer": "1518770660439-4636190af475",
  // cs
  "software-developer": "1517180102446-f3ece451e9d8",
  "web-developer": "1547658719-da2b51169166",
  "qa-analyst": "1555949963-aa79dcee981c",
  "computer-programmer": "1515879218367-8466d910aaa4",
  // law
  "lawyer": "1589829545856-d10d557cf95f",
  "judge-magistrate": "1505664194779-8beaceb93744",
  "arbitrator-mediator": "1521790361543-f645cf042ec4",
  // social
  "psychologist": "1573497019940-1c28c88b4f3e",
  "economist": "1526304640581-d334cdbbf45e",
  "survey-researcher": "1543286386-713bdd548da4",
  // arts
  "graphic-designer": "1626785774573-4b799315345d",
  "art-director": "1611532736597-de2d4265fba3",
  "industrial-designer": "1503602642458-232111445657",
  "animator": "1616499370260-485b3e5ed653"
};
function careerImg(majorKey, careerId) {
  const id = CAREER_IMG[careerId];
  const url = id ? "https://images.unsplash.com/photo-" + id + "?auto=format&fit=crop&w=800&q=70" : "";
  return { img: url, fallback: fieldMedia(majorKey).img, tint: fieldMedia(majorKey).tint };
}
