/* =============================================================================
   Compass 9, Quiz Questions & Scoring
   -----------------------------------------------------------------------------
   12 questions, one per screen. A mix of two styles (per the spec):
     - "interest"  : RIASEC-style "which sounds more interesting" comparisons
     - "strength"  : behavior/strength "which do you do best on" questions

   Each option adds points to one or more majors (keys must match data.js:
   business, medicine, engineering, cs, law, social, arts).

   scoreQuiz(answers) sums the points and returns majors ranked high -> low.
   ========================================================================== */

const QUIZ_QUESTIONS = [
  {
    id: "q1",
    type: "interest",
    text: "You've got a free afternoon. Which sounds most fun?",
    options: [
      { text: "Building or fixing something with your hands", scores: { engineering: 3, cs: 1 } },
      { text: "Reading about a real court case or a big debate in the news", scores: { law: 3, social: 1 } },
      { text: "Sketching, designing, or editing videos and photos", scores: { arts: 3 } },
      { text: "Figuring out how the human body works", scores: { medicine: 3 } },
      { text: "Starting a small business or selling something", scores: { business: 3 } },
      { text: "Solving a tricky logic puzzle or coding challenge", scores: { cs: 3, engineering: 1 } }
    ]
  },
  {
    id: "q2",
    type: "strength",
    text: "Which type of school assignment do you usually do BEST on?",
    options: [
      { text: "Math problem sets", scores: { engineering: 2, cs: 2, business: 1 } },
      { text: "Persuasive essays or debates", scores: { law: 3, social: 1 } },
      { text: "Science labs and experiments", scores: { medicine: 2, engineering: 2 } },
      { text: "Creative projects (art, design, video)", scores: { arts: 3 } },
      { text: "Group presentations or pitching an idea", scores: { business: 2, social: 1 } }
    ]
  },
  {
    id: "q3",
    type: "interest",
    text: "Which class do you look forward to most?",
    options: [
      { text: "Math", scores: { engineering: 2, cs: 2, business: 1 } },
      { text: "Science (biology / chemistry)", scores: { medicine: 3, engineering: 1 } },
      { text: "History or social studies", scores: { law: 2, social: 2 } },
      { text: "Art, design, or music", scores: { arts: 3 } },
      { text: "Computer or tech elective", scores: { cs: 3 } }
    ]
  },
  {
    id: "q4",
    type: "strength",
    text: "When you get grades back, where do you usually score highest?",
    options: [
      { text: "Math & science", scores: { engineering: 2, cs: 2, medicine: 1 } },
      { text: "English & writing", scores: { law: 2, social: 1, arts: 1 } },
      { text: "History & social studies", scores: { law: 2, social: 2 } },
      { text: "Electives & creative classes", scores: { arts: 3 } },
      { text: "It's pretty balanced across everything", scores: { business: 2, social: 1 } }
    ]
  },
  {
    id: "q5",
    type: "interest",
    text: "Which of these sounds more interesting to you?",
    options: [
      { text: "Investigating why something happens (research, experiments)", scores: { medicine: 2, social: 2, engineering: 1 } },
      { text: "Convincing people and leading a team", scores: { business: 2, law: 2 } },
      { text: "Making something look amazing (design, visuals)", scores: { arts: 3 } },
      { text: "Writing code that runs a game or an app", scores: { cs: 3 } }
    ]
  },
  {
    id: "q6",
    type: "interest",
    text: "What would matter most to you in a future job?",
    options: [
      { text: "Helping people directly", scores: { medicine: 3, social: 1 } },
      { text: "Earning a strong income", scores: { business: 2, cs: 1, engineering: 1 } },
      { text: "Creating something original", scores: { arts: 2, cs: 1 } },
      { text: "Standing up for what's fair", scores: { law: 3, social: 1 } }
    ]
  },
  {
    id: "q7",
    type: "strength",
    text: "How do you like to work?",
    options: [
      { text: "On my own, deep in focus", scores: { cs: 2, engineering: 1, arts: 1 } },
      { text: "Leading or organizing a group", scores: { business: 2, law: 1 } },
      { text: "Talking with and helping people one-on-one", scores: { medicine: 2, social: 2 } },
      { text: "A mix of solo work and teamwork", scores: { engineering: 1, business: 1, cs: 1 } }
    ]
  },
  {
    id: "q8",
    type: "interest",
    text: "Pick the club you'd most want to join:",
    options: [
      { text: "Robotics or Science Olympiad", scores: { engineering: 3, cs: 1 } },
      { text: "DECA or the stock market club", scores: { business: 3 } },
      { text: "Mock Trial, Model UN, or Debate", scores: { law: 2, social: 2 } },
      { text: "Coding club or a hackathon", scores: { cs: 3 } },
      { text: "Art Honor Society or a design club", scores: { arts: 3 } },
      { text: "HOSA (health careers) or hospital volunteering", scores: { medicine: 3 } }
    ]
  },
  {
    id: "q9",
    type: "strength",
    text: "Which are you naturally better at?",
    options: [
      { text: "Numbers and logic", scores: { cs: 2, engineering: 2, business: 1 } },
      { text: "Words and argument", scores: { law: 2, social: 1 } },
      { text: "Visuals and creativity", scores: { arts: 3 } },
      { text: "Understanding how people feel", scores: { medicine: 1, social: 2 } }
    ]
  },
  {
    id: "q10",
    type: "interest",
    text: "Which problem would you most enjoy tackling?",
    options: [
      { text: "Design a bridge that holds more weight", scores: { engineering: 3 } },
      { text: "Build an app that fixes a daily annoyance", scores: { cs: 3 } },
      { text: "Figure out the right treatment for a patient", scores: { medicine: 3 } },
      { text: "Plan a marketing campaign for a new product", scores: { business: 3 } },
      { text: "Argue a case in front of a jury", scores: { law: 3 } },
      { text: "Study why people behave the way they do", scores: { social: 3 } },
      { text: "Design a brand or poster that grabs attention", scores: { arts: 3 } }
    ]
  },
  {
    id: "q11",
    type: "strength",
    text: "Your favorite kind of test question is:",
    options: [
      { text: "Solve this equation or calculation", scores: { engineering: 2, cs: 1, business: 1 } },
      { text: "Write an essay defending a position", scores: { law: 2, social: 2 } },
      { text: "Label the diagram or explain the process", scores: { medicine: 2, engineering: 1 } },
      { text: "Create something original", scores: { arts: 3 } }
    ]
  },
  {
    id: "q12",
    type: "interest",
    text: "Which headline would you click first?",
    options: [
      { text: "\"New AI tool changes how we code\"", scores: { cs: 3 } },
      { text: "\"Breakthrough treatment for a disease\"", scores: { medicine: 3 } },
      { text: "\"Startup founder's billion-dollar idea\"", scores: { business: 3 } },
      { text: "\"Supreme Court makes a landmark ruling\"", scores: { law: 3 } },
      { text: "\"How social media affects the teen brain\"", scores: { social: 3 } },
      { text: "\"Inside the design of a hit video game\"", scores: { arts: 2, cs: 1 } },
      { text: "\"Engineers build a record-breaking rocket\"", scores: { engineering: 3 } }
    ]
  },
  {
    id: "q13",
    type: "interest",
    text: "Which of these would you enjoy most?",
    options: [
      { text: "Explaining a tricky idea until it finally clicks for someone", scores: { education: 3, social: 1 } },
      { text: "Making a promo video or running a brand's social media", scores: { media: 3, arts: 1 } },
      { text: "Reporting the real story behind big news", scores: { media: 3, law: 1 } },
      { text: "Coaching or mentoring younger students", scores: { education: 3 } },
      { text: "Designing a campaign that gets everyone talking", scores: { media: 2, business: 2 } }
    ]
  },
  {
    id: "q14",
    type: "strength",
    text: "Among your friends, you're the one who...",
    options: [
      { text: "Explains the homework so everyone gets it", scores: { education: 3 } },
      { text: "Makes the posts and videos everyone shares", scores: { media: 3 } },
      { text: "Wins every argument", scores: { law: 2, media: 1 } },
      { text: "Organizes the whole group project", scores: { business: 2, education: 1 } },
      { text: "Comes up with the creative ideas", scores: { arts: 2, media: 1 } }
    ]
  }
];

/**
 * Score a set of answers.
 * @param {Object} answers  Map of questionId -> option index chosen.
 * @returns {Array} Sorted array of { key, name, emoji, points } high -> low,
 *                  including only majors that scored above zero.
 */
function scoreQuiz(answers) {
  const totals = {};
  APP_DATA.majors.forEach((m) => (totals[m.key] = 0));

  QUIZ_QUESTIONS.forEach((q) => {
    const choice = answers[q.id];
    if (choice === undefined || choice === null) return;
    const option = q.options[choice];
    if (!option) return;
    Object.entries(option.scores).forEach(([majorKey, pts]) => {
      if (totals[majorKey] !== undefined) totals[majorKey] += pts;
    });
  });

  return APP_DATA.majors
    .map((m) => ({ key: m.key, name: m.name, emoji: m.emoji, points: totals[m.key] }))
    .filter((r) => r.points > 0)
    .sort((a, b) => b.points - a.points);
}
