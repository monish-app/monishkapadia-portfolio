/* ============================================================
   Content source of truth.
   Edit here, run `node build.mjs`, and the HTML regenerates.
   ============================================================ */

export const site = {
  name: "Monish Kapadia",
  role: "Art Director with an expertise in Motion Design",
  city: "Atlanta",
  email: "monishbkapadia@gmail.com",
  linkedin: "https://www.linkedin.com/in/monishkapadia/",
  resume: "/assets/monishkapadia-resume.pdf",
  origin: "https://www.monishkapadia.in",
  heroQuestion: {
    line1: "A curious kid who never stopped asking",
    line2a: "but what if it looked like",
    line2b: "?"
  },
  intro:
    "I am an <strong>Art Director with an expertise in Motion Design</strong>, based in Atlanta. I make campaigns that move, literally. Currently at Heads Up, co-founder at KAM Agency, and open to full-time roles.",
  /* Home page proof row. Counts are totalled from the `awards` list below —
     check them and edit here if any are off. */
  /* Marks that scroll in the recognition strip. */
  badgeStrip: ["addy", "red-dot", "applied-arts", "scaddy-gold", "scaddy-silver"],
  /* Detail lines are totalled from the `awards` list below — check them
     and edit here if any are off. */
  awardSummary: [
    {
      badge: "addy",
      name: "American Advertising Award",
      detail: ["Best of Online / Interactive", "11\u00d7 Gold \u00b7 8\u00d7 Silver", "National \u00b7 District 7 \u00b7 Atlanta"]
    },
    {
      badge: "red-dot",
      name: "Red Dot Award",
      detail: ["Hinge: Text Your Ex", "Rover: For the In-Between", "Design Concept, 2026"]
    },
    {
      badge: "applied-arts",
      name: "Applied Arts Award",
      detail: ["Hinge: Text Your Ex", "Rover: Where Quirks Find Company", "Student, 2026"]
    },
    {
      badge: "scaddy-gold",
      name: "SCADDY Award",
      detail: ["6\u00d7 Gold \u00b7 1\u00d7 Silver", "4\u00d7 Honorable Mention", "2025 & 2026"]
    }
  ],
  footerQuestion: "So, what if we made something together?"
};

export const awards = [
  { badge: "red-dot", year: "2026 Red Dot Awards", items: ["Hinge: Text Your Ex", "Rover: For the In-Between"] },
  { badge: "applied-arts", year: "2026 Applied Arts Awards", items: ["Hinge: Text Your Ex", "Rover: Where Quirks Find Company"] },
  { badge: "addy", year: "2026 National ADDYs", items: ["2× Silver — Hinge: Text Your Ex"] },
  {
    badge: "addy",
    year: "2026 American Advertising Awards (ADDYs) — District 7",
    items: [
      "Best of Online / Interactive — Hinge: Text Your Ex",
      "4× Gold, Silver — Hinge: Text Your Ex",
      "Gold — Vaseline: When Chaos Calls",
      "Gold, Silver — Rover: For the In-Between"
    ]
  },
  {
    badge: "addy",
    year: "2026 American Advertising Awards (ADDYs) — Atlanta Chapter",
    items: [
      "4× Gold, Silver — Hinge: Text Your Ex",
      "Gold — Vaseline: When Chaos Calls",
      "2× Silver — Rover: For the In-Between",
      "Silver — Rover: Where Quirks Find Company"
    ]
  },
  { badge: "scaddy-gold", year: "The 2026 SCADDY Awards", items: ["4× Gold, 2× Honorable Mentions"] },
  { badge: "scaddy-gold", year: "The 2025 SCADDY Awards", items: ["2× Gold, Silver, 2× Honorable Mentions"] }
];

/* --- media helpers ------------------------------------------------ */
const film = (src, cap, opt = {}) => ({ t: "film", src, cap, ...opt });
const loop = (src, cap, opt = {}) => ({ t: "loop", src, cap, ...opt });
const img  = (src, cap, opt = {}) => ({ t: "img",  src, cap, ...opt });
const grid = (cols, items) => ({ t: "grid", cols, items });

export const projects = [
  /* ============================== HINGE ============================== */
  {
    slug: "hinge",
    brand: "Hinge",
    campaign: "Text Your Ex",
    kind: "24-hour activation · Integrated campaign",
    year: "2026",
    question: "What if you had 24 hours to text your ex?",
    wide: true,
    tile: { poster: "/assets/media/loops/hinge.jpg", video: "/assets/media/loops/hinge.mp4" },
    answer: [
      "A 24-hour digital activation. One disappearing microsite. One ex. Hinge invites you to send the text you have been drafting in your head for two years, then takes the whole thing offline before you can regret it.",
      "The insight: Hinge does not only support your choices, it supports your chances. In a world exhausted by swiping, the campaign reframes connection as something worth risking embarrassment for. Countdown OOH, lock-screen notifications, and post-event mental health support turn a personal decision into a shared, chaotic, very public experiment."
    ],
    badges: ["red-dot", "addy", "applied-arts", "scaddy-gold"],
    role: "Motion Director, Art Director, Copywriter",
    team: "Monish Kapadia, Riya Shah, Stella Braune",
    awardList: [
      { badge: "2026", text: "2× National ADDY Silver" },
      { badge: "D7", text: "Best of Online/Interactive · 4× Gold, Silver" },
      { badge: "ATL", text: "4× Gold, Silver" },
      { badge: "RED DOT", text: "Design Concept Award" },
      { badge: "AA", text: "Applied Arts Award" }
    ],
    sections: [
      { q: "So what actually happened?", media: [film("hinge/02-finalcampaignvideo", "Campaign film")] },
      { q: "Where did the texts go?", media: [film("hinge/03-micrositemockup", "The disappearing microsite")] },
      {
        q: "How do you make a whole city nervous?",
        media: [
          loop("hinge/13outdoor-countdown-1", "Outdoor countdown, live to the second"),
          film("hinge/04-just-count-down", "The countdown, in full")
        ]
      },
      {
        q: "What did it look like outside?",
        media: [
          grid(2, [
            img("hinge/06ooh-mockup-1", "OOH"),
            img("hinge/12ooh-mockup-7", "OOH"),
            img("hinge/09ooh-mockup-4", "OOH"),
            img("hinge/10ooh-mockup-5", "OOH"),
            img("hinge/11ooh-mockup-6", "OOH"),
            img("hinge/14ooh-confession-booth", "Confession booth")
          ])
        ]
      },
      {
        q: "And in your hand?",
        media: [
          grid(3, [
            loop("hinge/05-in-app-countdown-mp4", "In-app countdown"),
            img("hinge/15phone-message", "Lock screen"),
            img("hinge/18text-notifications", "Notifications")
          ])
        ]
      },
      {
        q: "Then what did the internet do with it?",
        media: [
          grid(2, [
            img("hinge/17reddit-post", "Reddit"),
            img("hinge/16press-mockups", "Press")
          ]),
          grid(2, [
            loop("hinge/19-ugc-1-mocked", "UGC"),
            loop("hinge/20-ugc-2-mocked", "UGC")
          ])
        ]
      },
      { q: "How does it end?", media: [loop("hinge/01-hinge-logo-animation", "Logo animation"), img("hinge/end-card", "End card")] }
    ]
  },

  /* ============================ VASELINE ============================ */
  {
    slug: "vaseline",
    brand: "Vaseline",
    campaign: "When Chaos Calls",
    kind: "Integrated campaign",
    year: "2026",
    question: "What if skincare admitted your life is a mess?",
    tile: { poster: "/assets/media/loops/vaseline.jpg", video: "/assets/media/loops/vaseline.mp4" },
    answer: [
      "Gen Z does not live in the calm, backlit bathroom that skincare advertising keeps selling. They live in all-nighters, cracked lips, bad tattoos and meltdowns. \"When Chaos Calls\" repositions Vaseline from a shelf product to an on-the-go rescue for the exact moments the category pretends do not happen.",
      "As Motion Designer I built every moving element: the campaign film, the kinetic type system, and the animated social units. The brief was to match the chaos rather than smooth it over, so the motion is fast, interruptive, and cut for a thumb that is already moving."
    ],
    badges: ["addy", "scaddy-gold"],
    role: "Motion Designer",
    team: "Anukriti Agrawal, Monish Kapadia, Riya Mehta",
    awardList: [
      { badge: "D7", text: "Gold ADDY" },
      { badge: "ATL", text: "Gold ADDY" },
      { badge: "SCAD", text: "SCADDY Gold" }
    ],
    sections: [
      { q: "What does chaos sound like?", media: [film("vaseline/atl-202520-adbr341-anukriti-riyam-monish-david-vaseline-campaignvideo", "Campaign film")] },
      { q: "How does it announce itself?", media: [loop("vaseline/when-chaos-calls-intro", "Title animation")] },
      {
        q: "When exactly does chaos call?",
        media: [
          grid(3, [
            loop("vaseline/beard-mock-up-mp4", "Beard"),
            loop("vaseline/dark-circles-mock-up", "Dark circles"),
            loop("vaseline/tattoo-mock-up", "Fresh tattoo")
          ])
        ]
      },
      {
        q: "What stops the scroll?",
        media: [
          grid(3, [
            loop("vaseline/atl-202520-adbr341-anukriti-riyam-monish-david-vaseline-socail1", "Social"),
            loop("vaseline/atl-202520-adbr341-anukriti-riyam-monish-david-vaseline-socail2", "Social"),
            loop("vaseline/atl-202520-adbr341-anukriti-riyam-monish-david-vaseline-socail3", "Social")
          ]),
          grid(3, [
            loop("vaseline/social-1-mock-up", "In feed"),
            loop("vaseline/social-2-mock-up", "In feed"),
            loop("vaseline/social-3-mock-up", "In feed")
          ])
        ]
      },
      { q: "Where did it start?", media: [img("vaseline/idea-board", "Idea board")] }
    ]
  },

  /* =========================== ADOBE MAX ============================ */
  {
    slug: "adobe-max",
    brand: "Adobe MAX",
    campaign: "Playful Modular",
    kind: "Brand identity · Experience design",
    year: "2025",
    question: "What if a conference wasn't attended, but assembled?",
    tile: { poster: "/assets/media/loops/adobe-max.jpg", video: "/assets/media/loops/adobe-max.mp4" },
    answer: [
      "A full-scale rebrand of Adobe MAX, repositioned for an audience that no longer looks like one audience: students, freelancers, strategists and agency leaders in the same room.",
      "\"Playful Modular\" turns the identity into a kit rather than a lockup. Every touchpoint, from the wayfinding tunnel to a lanyard to a tote bag, is a component somebody else can rearrange. As Art Director, Brand Designer and Motion Designer I built the identity, the motion system, and the spatial experience, so MAX becomes the only global creativity conference you help build while you are inside it."
    ],
    badges: [],
    role: "Art Director, Brand Designer, Motion Designer",
    team: "Solo project",
    awardList: [],
    sections: [
      {
        q: "How does a modular brand move?",
        media: [
          grid(2, [
            loop("adobe-max/08-motion-pack-13-motionpack", "Motion pack"),
            loop("adobe-max/08-motion-pack-02-openinganimation", "Opening animation")
          ])
        ]
      },
      {
        q: "What is the smallest piece?",
        media: [
          grid(2, [
            img("adobe-max/01-logo-01max-logo-primary-logo-transparent", "Primary logo"),
            img("adobe-max/01-logo-04max-logo-logo-lockup-transparent", "Lockup")
          ]),
          loop("adobe-max/08-motion-pack-01-logoanimation", "Logo animation")
        ]
      },
      {
        q: "What does it feel like to walk in?",
        media: [
          loop("adobe-max/09-space-and-wayfinding-03-welcome-wall", "Welcome wall"),
          grid(2, [
            loop("adobe-max/09-space-and-wayfinding-05-wayfinding-tunnel", "Wayfinding tunnel"),
            loop("adobe-max/09-space-and-wayfinding-10-mainstage", "Main stage")
          ]),
          grid(3, [
            img("adobe-max/09-space-and-wayfinding-07-way-finding-studios", "Studios"),
            img("adobe-max/09-space-and-wayfinding-08-way-finding-car-park", "Car park"),
            img("adobe-max/09-space-and-wayfinding-09-way-finding-main-stage", "Main stage")
          ])
        ]
      },
      {
        q: "How loud is it in the street?",
        media: [
          grid(2, [
            img("adobe-max/04-ooh-01-billboard", "Billboard"),
            img("adobe-max/04-ooh-03-wall-wheatpasting", "Wheatpasting"),
            img("adobe-max/04-ooh-04-subway-takeover", "Subway takeover"),
            img("adobe-max/05-posters-02-poster", "Poster")
          ])
        ]
      },
      {
        q: "What do you take home?",
        media: [
          grid(3, [
            img("adobe-max/02-swag-01-lanyard-id", "Lanyard"),
            img("adobe-max/02-swag-09-bagpack", "Backpack"),
            img("adobe-max/02-swag-11-tote-bag", "Tote"),
            img("adobe-max/02-swag-08-pins", "Pins"),
            img("adobe-max/02-swag-07-sticker", "Stickers"),
            img("adobe-max/02-swag-04-pillow", "Pillow")
          ]),
          grid(3, [
            img("adobe-max/03-packaging-01-packaging", "Packaging"),
            img("adobe-max/03-packaging-02-packaging", "Packaging"),
            img("adobe-max/03-packaging-03-packaging", "Packaging")
          ])
        ]
      },
      {
        q: "And what happens when you point a phone at it?",
        media: [
          grid(2, [
            loop("adobe-max/07-ar-01-ar", "AR layer"),
            loop("adobe-max/10-workshop-12-workshop-space", "Workshop space")
          ])
        ]
      }
    ]
  },

  /* ============================== CHASE ============================= */
  {
    slug: "chase",
    brand: "Chase",
    campaign: "What's Yours?",
    kind: "Commercials · OOH",
    year: "2025",
    question: "What if a bank asked instead of told?",
    tile: { poster: "/assets/media/loops/chase.jpg", video: "/assets/media/loops/chase.mp4" },
    answer: [
      "Banks tell young people what to want: a house, a plan, a retirement account. \"What's Yours?\" flips the sentence into a question and hands it back to Gen Z college students who are defining financial independence on terms nobody has written down yet.",
      "Three original commercials, directed and produced, built as music-driven vignettes of real side-hustles and small wins. OOH ran near campuses and social hubs. Product features like Autosave, Zelle and Credit Journey stopped being banking tools and started being ways to get the thing you actually said out loud."
    ],
    badges: [],
    role: "Creative Strategist, Art Director, Producer",
    team: "Actors: Anvi Madan, Shean Zakk Bajaj, Vedanti Pawar",
    awardList: [],
    sections: [
      { q: "What does an answer look like?", media: [film("chase/pro1-v1-mkapadia", "Film one")] },
      {
        q: "And two more?",
        media: [film("chase/pro1-v2-mkapadia", "Film two"), film("chase/pro1-v3-mkapadia", "Film three")]
      },
      {
        q: "How does the question travel?",
        media: [
          grid(3, [
            img("chase/pro1-print1-mkapadia", "OOH"),
            img("chase/pro1-print2-mkapadia", "OOH"),
            img("chase/pro1-print3-mkapadia", "OOH")
          ])
        ]
      }
    ]
  },

  /* ========================= UNO x INSTAGRAM ======================== */
  {
    slug: "uno-instagram",
    brand: "UNO × Instagram",
    campaign: "UNO What To Do",
    kind: "Social responsibility",
    year: "2025",
    question: "What if blocking a troll felt like winning the game?",
    tile: { poster: "/assets/media/loops/uno-instagram.jpg", video: "/assets/media/loops/uno-instagram.mp4" },
    answer: [
      "Instagram's anti-bullying tools are good and almost nobody under fifteen uses them. UNO is a language every one of those kids already speaks. \"UNO What To Do\" maps the cards onto the tools: Skip, Reverse, Draw 4 and Wild become metaphor-driven responses to hate in the comments.",
      "A custom UNO button sits inside Instagram's interface and turns block, restrict, positivity floods, AI comebacks and stickers into moves you play rather than settings you find. I led strategy and concept, designed all motion assets, and built the responsive UI integration."
    ],
    badges: [],
    role: "Creative Strategist, Motion Designer",
    team: "Elisa Boulton, Monish Kapadia",
    awardList: [],
    sections: [
      { q: "How do you teach a kid to play their cards?", media: [film("uno-instagram/pro2-v1-eboulton-mkapadia", "Campaign film")] },
      {
        q: "What does it look like in a feed?",
        media: [
          grid(3, [
            loop("uno-instagram/uno-socialmedia1", "Social"),
            loop("uno-instagram/uno-socialmedia2", "Social"),
            loop("uno-instagram/uno-socialmedia3", "Social")
          ])
        ]
      },
      {
        q: "And out in the world?",
        media: [
          grid(2, [
            img("uno-instagram/uno-ooh-mockup1", "OOH"),
            img("uno-instagram/uno-ooh-mockup3", "OOH"),
            img("uno-instagram/uno-ooh-mockup4", "OOH"),
            img("uno-instagram/uno-ooh-mockup5", "OOH")
          ]),
          img("uno-instagram/uno-ooh-sticker", "Sticker")
        ]
      }
    ]
  }
];

export const about = {
  question: "What if a kid never put the camera down?",
  prose: [
    "It started at 13. A curious kid in Dahanu, India, editing videos in his bedroom, finding frames, chasing feeling. No brief. No client. Just a gut instinct that images, when moved the right way, could say something words never could.",
    "That curiosity became a craft. And that craft became a career.",
    "I was basically running a one-person agency before I knew what an agency was. By the time I got to SCAD, I had already learned the most important thing this industry can teach you: <strong>ideas don't wait for permission.</strong>",
    "Today I'm an Art Director with an expertise in Motion Design. I've led large creative teams, worked with celebrities, and navigated large-scale productions, turning strategy into stories that move people across screens, stages and streets."
  ],
  pull: "A curious kid still sees the world differently. Moments. People. Stories. The beginnings of something more.",
  close: "Every story begins with an idea. And every idea is waiting to become something bigger. Let's make something memorable together."
};
