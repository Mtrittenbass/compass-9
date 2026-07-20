/* =============================================================================
   Compass 9, Colleges
   -----------------------------------------------------------------------------
   A dataset of universities with authentic school colors and a per-major
   strength score (0-100, reflecting general program reputation). Used to
   recommend the top 5 schools for a chosen field on the Results Hub.

   Each school is rendered as a "spirit crest" in its own colors:
     c1   = primary color   (crest fill)
     c2   = secondary color (crest ring / accent)
     tx   = readable text color for the monogram on c1
   Trademarked logos belong to the schools; we use colors + monograms only.

   Major keys must match data.js: business, medicine, engineering, cs, law,
   social, arts.  `wa: true` flags in-state (Bellevue, WA) schools.
   ========================================================================== */

const COLLEGES = [
  { id: "harvard",    name: "Harvard University",         short: "Harvard",       mono: "H",   city: "Cambridge, MA",   c1: "#A51C30", c2: "#1E1E1E", tx: "#fff", majors: { medicine: 98, law: 99, social: 96, business: 88 } },
  { id: "stanford",   name: "Stanford University",        short: "Stanford",      mono: "S",   city: "Stanford, CA",    c1: "#8C1515", c2: "#2E2D29", tx: "#fff", majors: { cs: 99, engineering: 96, business: 92, medicine: 90, social: 88 } },
  { id: "duke",       name: "Duke University",            short: "Duke",          mono: "D",   city: "Durham, NC",      c1: "#012169", c2: "#ffffff", tx: "#fff", majors: { medicine: 96, law: 94, social: 90, business: 88, engineering: 84 } },
  { id: "cornell",    name: "Cornell University",         short: "Cornell",       mono: "C",   city: "Ithaca, NY",      c1: "#B31B1B", c2: "#ffffff", tx: "#fff", majors: { engineering: 92, business: 90, cs: 91, medicine: 88, social: 88, arts: 82 } },
  { id: "gatech",     name: "Georgia Tech",               short: "Georgia Tech",  mono: "GT",  city: "Atlanta, GA",     c1: "#003057", c2: "#B3A369", tx: "#fff", majors: { engineering: 99, cs: 97, business: 82 } },
  { id: "michigan",   name: "University of Michigan",     short: "Michigan",      mono: "M",   city: "Ann Arbor, MI",   c1: "#00274C", c2: "#FFCB05", tx: "#FFCB05", majors: { business: 96, engineering: 94, cs: 92, medicine: 92, law: 93, social: 92, arts: 85 } },
  { id: "purdue",     name: "Purdue University",          short: "Purdue",        mono: "P",   city: "West Lafayette, IN", c1: "#000000", c2: "#CEB888", tx: "#CEB888", majors: { engineering: 95, cs: 90 } },
  { id: "illinois",   name: "University of Illinois",     short: "Illinois",      mono: "I",   city: "Urbana-Champaign, IL", c1: "#13294B", c2: "#FF5F05", tx: "#FF5F05", majors: { cs: 96, engineering: 94, business: 84 } },
  { id: "texas",      name: "UT Austin",                  short: "Texas",         mono: "T",   city: "Austin, TX",      c1: "#BF5700", c2: "#ffffff", tx: "#fff", majors: { cs: 90, engineering: 92, business: 90, law: 90, social: 84 } },
  { id: "unc",        name: "UNC Chapel Hill",            short: "UNC",           mono: "NC",  city: "Chapel Hill, NC", c1: "#13294B", c2: "#4B9CD3", tx: "#4B9CD3", majors: { business: 92, medicine: 90, law: 88, social: 88 } },
  { id: "notredame",  name: "University of Notre Dame",   short: "Notre Dame",    mono: "ND",  city: "Notre Dame, IN",  c1: "#0C2340", c2: "#C99700", tx: "#C99700", majors: { business: 94, law: 88, arts: 80, social: 82 } },
  { id: "northwestern", name: "Northwestern University",  short: "Northwestern",  mono: "N",   city: "Evanston, IL",    c1: "#4E2A84", c2: "#ffffff", tx: "#fff", majors: { social: 92, law: 90, business: 90, medicine: 88, arts: 86 } },
  { id: "washington", name: "University of Washington",   short: "UW",            mono: "W",   city: "Seattle, WA",     c1: "#4B2E83", c2: "#B7A57A", tx: "#fff", wa: true, majors: { cs: 94, medicine: 90, engineering: 88, business: 84, social: 84 } },
  { id: "wsu",        name: "Washington State University", short: "Wash. State",  mono: "WS",  city: "Pullman, WA",     c1: "#981E32", c2: "#5E6A71", tx: "#fff", wa: true, majors: { engineering: 80, business: 78, social: 76, arts: 76 } },
  { id: "gonzaga",    name: "Gonzaga University",         short: "Gonzaga",       mono: "GU",  city: "Spokane, WA",     c1: "#041E42", c2: "#C8102E", tx: "#fff", wa: true, majors: { business: 82, law: 80, medicine: 78 } },
  { id: "cincinnati", name: "University of Cincinnati",   short: "Cincinnati",    mono: "UC",  city: "Cincinnati, OH",  c1: "#E00122", c2: "#000000", tx: "#fff", majors: { arts: 96, engineering: 82, business: 78 } },
  { id: "syracuse",   name: "Syracuse University",        short: "Syracuse",      mono: "SU",  city: "Syracuse, NY",    c1: "#F76900", c2: "#000E54", tx: "#fff", majors: { arts: 90, social: 82, business: 80 } },
  { id: "pitt",       name: "University of Pittsburgh",   short: "Pitt",          mono: "PI",  city: "Pittsburgh, PA",  c1: "#003594", c2: "#FFB81C", tx: "#FFB81C", majors: { medicine: 92, engineering: 84, social: 80 } },
  { id: "florida",    name: "University of Florida",      short: "Florida",       mono: "UF",  city: "Gainesville, FL", c1: "#0021A5", c2: "#FA4616", tx: "#FA4616", majors: { medicine: 86, engineering: 84, business: 85, law: 82 } },
  { id: "pennstate",  name: "Penn State",                 short: "Penn State",    mono: "PS",  city: "University Park, PA", c1: "#041E42", c2: "#ffffff", tx: "#fff", majors: { engineering: 88, business: 86, cs: 84 } },
  { id: "wisconsin",  name: "University of Wisconsin",    short: "Wisconsin",     mono: "WI",  city: "Madison, WI",     c1: "#C5050C", c2: "#ffffff", tx: "#fff", majors: { engineering: 88, business: 86, social: 88, medicine: 86, cs: 86 } },
  { id: "maryland",   name: "University of Maryland",     short: "Maryland",      mono: "MD",  city: "College Park, MD", c1: "#E03A3E", c2: "#FFD520", tx: "#fff", majors: { cs: 90, engineering: 88, business: 84 } },
  { id: "bc",         name: "Boston College",            short: "Boston College", mono: "BC", city: "Chestnut Hill, MA", c1: "#98002E", c2: "#BC9B6A", tx: "#BC9B6A", majors: { business: 90, law: 84, social: 82 } },
  { id: "georgia",    name: "University of Georgia",      short: "Georgia",       mono: "G",   city: "Athens, GA",      c1: "#BA0C2F", c2: "#000000", tx: "#fff", majors: { business: 86, law: 84, social: 82 } },
  { id: "minnesota",  name: "University of Minnesota",    short: "Minnesota",     mono: "MN",  city: "Minneapolis, MN", c1: "#7A0019", c2: "#FFCC33", tx: "#FFCC33", majors: { engineering: 84, medicine: 84, business: 82, arts: 80 } },
  { id: "miami",      name: "University of Miami",        short: "Miami",         mono: "MI",  city: "Coral Gables, FL", c1: "#005030", c2: "#F47321", tx: "#F47321", majors: { medicine: 84, arts: 82, business: 82 } },
  { id: "alabama",    name: "University of Alabama",      short: "Alabama",       mono: "A",   city: "Tuscaloosa, AL",  c1: "#9E1B32", c2: "#ffffff", tx: "#fff", majors: { business: 84, engineering: 82, law: 82 } },
  { id: "auburn",     name: "Auburn University",          short: "Auburn",        mono: "AU",  city: "Auburn, AL",      c1: "#0C2340", c2: "#E87722", tx: "#E87722", majors: { engineering: 84, business: 80 } },
  { id: "clemson",    name: "Clemson University",         short: "Clemson",       mono: "CU",  city: "Clemson, SC",     c1: "#522D80", c2: "#F66733", tx: "#F66733", majors: { engineering: 84, cs: 82, business: 78 } },
  { id: "southcarolina", name: "University of South Carolina", short: "S. Carolina", mono: "SC", city: "Columbia, SC", c1: "#73000A", c2: "#000000", tx: "#fff", majors: { business: 84, law: 80, social: 78 } },
  { id: "arizona",    name: "University of Arizona",      short: "Arizona",       mono: "AZ",  city: "Tucson, AZ",      c1: "#0C234B", c2: "#AB0520", tx: "#fff", majors: { social: 84, business: 80, arts: 80 } },
  { id: "uconn",      name: "University of Connecticut",  short: "UConn",         mono: "UC",  city: "Storrs, CT",      c1: "#000E2F", c2: "#ffffff", tx: "#fff", majors: { social: 82, business: 80, law: 78 } },
  { id: "fsu",        name: "Florida State University",   short: "Florida State", mono: "FS",  city: "Tallahassee, FL", c1: "#782F40", c2: "#CEB888", tx: "#CEB888", majors: { social: 82, law: 82, business: 80 } },
  { id: "lsu",        name: "LSU",                        short: "LSU",           mono: "LSU", city: "Baton Rouge, LA", c1: "#461D7C", c2: "#FDD023", tx: "#FDD023", majors: { engineering: 80, business: 80, arts: 78 } },
  { id: "tennessee",  name: "University of Tennessee",    short: "Tennessee",     mono: "UT",  city: "Knoxville, TN",   c1: "#FF8200", c2: "#58595B", tx: "#fff", majors: { engineering: 80, business: 80 } },
  { id: "kentucky",   name: "University of Kentucky",     short: "Kentucky",      mono: "UK",  city: "Lexington, KY",   c1: "#0033A0", c2: "#ffffff", tx: "#fff", majors: { medicine: 82, business: 78 } },
  { id: "louisville", name: "University of Louisville",   short: "Louisville",    mono: "L",   city: "Louisville, KY",  c1: "#AD0000", c2: "#000000", tx: "#fff", majors: { medicine: 80, business: 78 } },
  { id: "olemiss",    name: "Ole Miss",                   short: "Ole Miss",      mono: "OM",  city: "Oxford, MS",      c1: "#14213D", c2: "#CE1126", tx: "#fff", majors: { law: 80, business: 78, social: 78 } },
  { id: "sdsu",       name: "San Diego State",            short: "San Diego St.", mono: "SD",  city: "San Diego, CA",   c1: "#A6192E", c2: "#000000", tx: "#fff", majors: { business: 80, arts: 80, social: 78 } },
  { id: "kstate",     name: "Kansas State",               short: "Kansas State",  mono: "KS",  city: "Manhattan, KS",   c1: "#512888", c2: "#ffffff", tx: "#fff", majors: { engineering: 78, business: 76 } },
  { id: "okstate",    name: "Oklahoma State",             short: "Oklahoma St.",  mono: "OK",  city: "Stillwater, OK",  c1: "#FF7300", c2: "#000000", tx: "#fff", majors: { engineering: 80, business: 80 } },
  { id: "arkansas",   name: "University of Arkansas",     short: "Arkansas",      mono: "AR",  city: "Fayetteville, AR", c1: "#9D2235", c2: "#ffffff", tx: "#fff", majors: { business: 80, engineering: 78 } }
];

const COLLEGES_BY_ID = COLLEGES.reduce((a, c) => ((a[c.id] = c), a), {});

/* Extra strengths merged in without editing every row above. Also fills gaps so
   every field has options at each selectivity tier. */
const EXTRA_MAJOR_SCORES = {
  education: { michigan: 92, wisconsin: 88, unc: 86, stanford: 86, texas: 86, illinois: 85, northwestern: 84, washington: 84, maryland: 84, florida: 84, georgia: 82, minnesota: 82, arizona: 80, kentucky: 80, bc: 80 },
  media: { northwestern: 96, syracuse: 94, unc: 88, georgia: 86, texas: 86, florida: 84, michigan: 84, maryland: 82, arizona: 82, miami: 82, wisconsin: 82, alabama: 80, minnesota: 80, cincinnati: 78, tennessee: 78 },
  arts: { fsu: 86, maryland: 78, georgia: 78 },
  cs: { minnesota: 84, cincinnati: 80, arizona: 78, tennessee: 76 }
};
Object.entries(EXTRA_MAJOR_SCORES).forEach(([mk, scores]) => {
  Object.entries(scores).forEach(([id, sc]) => { if (COLLEGES_BY_ID[id]) COLLEGES_BY_ID[id].majors[mk] = sc; });
});

/* Approximate recent admissions data: acceptance rate (%) and SAT middle 50%.
   These move year to year, so they are shown as a guide, not a guarantee. */
const COLLEGE_ADMISSIONS = {
  harvard: { acc: 3, sat: [1500, 1580] }, stanford: { acc: 4, sat: [1500, 1570] }, duke: { acc: 6, sat: [1510, 1570] },
  northwestern: { acc: 7, sat: [1500, 1560] }, cornell: { acc: 8, sat: [1500, 1560] }, notredame: { acc: 12, sat: [1450, 1540] },
  bc: { acc: 16, sat: [1440, 1520] }, gatech: { acc: 16, sat: [1420, 1550] }, unc: { acc: 17, sat: [1360, 1520] },
  michigan: { acc: 18, sat: [1370, 1530] }, miami: { acc: 19, sat: [1340, 1490] },
  florida: { acc: 23, sat: [1330, 1470] }, fsu: { acc: 25, sat: [1270, 1390] }, texas: { acc: 29, sat: [1300, 1500] },
  georgia: { acc: 37, sat: [1300, 1450] }, clemson: { acc: 38, sat: [1230, 1400] }, sdsu: { acc: 39, sat: [1160, 1350] },
  syracuse: { acc: 42, sat: [1290, 1450] }, wisconsin: { acc: 43, sat: [1330, 1480] }, washington: { acc: 43, sat: [1250, 1470] },
  auburn: { acc: 44, sat: [1180, 1380] }, illinois: { acc: 45, sat: [1300, 1500] }, maryland: { acc: 45, sat: [1360, 1520] },
  pitt: { acc: 49, sat: [1290, 1460] }, purdue: { acc: 50, sat: [1210, 1450] },
  uconn: { acc: 55, sat: [1230, 1430] }, pennstate: { acc: 55, sat: [1200, 1390] }, southcarolina: { acc: 64, sat: [1190, 1380] },
  tennessee: { acc: 68, sat: [1180, 1360] }, okstate: { acc: 70, sat: [1080, 1300] }, minnesota: { acc: 75, sat: [1300, 1470] },
  lsu: { acc: 76, sat: [1090, 1310] }, gonzaga: { acc: 78, sat: [1210, 1390] }, arkansas: { acc: 79, sat: [1090, 1310] },
  alabama: { acc: 80, sat: [1080, 1340] }, wsu: { acc: 80, sat: [1050, 1260] }, louisville: { acc: 83, sat: [1080, 1310] },
  cincinnati: { acc: 85, sat: [1150, 1360] }, arizona: { acc: 87, sat: [1100, 1360] }, olemiss: { acc: 88, sat: [1030, 1270] },
  kentucky: { acc: 95, sat: [1080, 1320] }, kstate: { acc: 95, sat: [1030, 1280] }
};
Object.entries(COLLEGE_ADMISSIONS).forEach(([id, d]) => {
  const c = COLLEGES_BY_ID[id];
  if (c) { c.acc = d.acc; c.sat = d.sat; }
});

/** Nine schools for a field: 3 reach (under 20% accept), 3 target (20-50%), 3 likely (over 50%). */
function collegeTiers(majorKey, perTier) {
  perTier = perTier || 3;
  const ranked = COLLEGES
    .filter((c) => c.majors[majorKey] != null && c.acc != null)
    .sort((a, b) => b.majors[majorKey] - a.majors[majorKey]);
  return {
    reach: ranked.filter((c) => c.acc < 20).slice(0, perTier),
    target: ranked.filter((c) => c.acc >= 20 && c.acc <= 50).slice(0, perTier),
    likely: ranked.filter((c) => c.acc > 50).slice(0, perTier)
  };
}

/* Official domains, used to fetch each school's real logo/emblem. */
const COLLEGE_DOMAINS = {
  harvard: "harvard.edu", stanford: "stanford.edu", duke: "duke.edu", cornell: "cornell.edu",
  gatech: "gatech.edu", michigan: "umich.edu", purdue: "purdue.edu", illinois: "illinois.edu",
  texas: "utexas.edu", unc: "unc.edu", notredame: "nd.edu", northwestern: "northwestern.edu",
  washington: "washington.edu", wsu: "wsu.edu", gonzaga: "gonzaga.edu", cincinnati: "uc.edu",
  syracuse: "syracuse.edu", pitt: "pitt.edu", florida: "ufl.edu", pennstate: "psu.edu",
  wisconsin: "wisc.edu", maryland: "umd.edu", bc: "bc.edu", georgia: "uga.edu",
  minnesota: "umn.edu", miami: "miami.edu", alabama: "ua.edu", auburn: "auburn.edu",
  clemson: "clemson.edu", southcarolina: "sc.edu", arizona: "arizona.edu", uconn: "uconn.edu",
  fsu: "fsu.edu", lsu: "lsu.edu", tennessee: "utk.edu", kentucky: "uky.edu",
  louisville: "louisville.edu", olemiss: "olemiss.edu", sdsu: "sdsu.edu", kstate: "k-state.edu",
  okstate: "okstate.edu", arkansas: "uark.edu"
};

/** Real logo URL for a college (falls back to its monogram if it fails to load). */
function collegeLogo(c) {
  const d = COLLEGE_DOMAINS[c.id];
  return d ? "https://www.google.com/s2/favicons?sz=128&domain=" + d : "";
}

/** Top N colleges for a major, ranked by strength score (desc). */
function topCollegesForMajor(majorKey, n = 5) {
  return COLLEGES
    .filter((c) => c.majors[majorKey] != null)
    .sort((a, b) => b.majors[majorKey] - a.majors[majorKey])
    .slice(0, n);
}

/** A college's two headline fields (for tag chips), excluding the current one. */
function collegeStrengths(college, excludeMajorKey) {
  return Object.entries(college.majors)
    .filter(([k]) => k !== excludeMajorKey)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([k]) => k);
}
