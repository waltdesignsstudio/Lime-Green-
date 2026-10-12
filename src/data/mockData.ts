import { Milestone, RuleItem, CharacterItem } from "../types";

export const MILESTONES: Milestone[] = [
  {
    year: 2015,
    title: "The Unspoken Genesis (Magenta v1)",
    subtitle: "When paths crossed under early autumn winds",
    description: "A spontaneous meeting that seemed insignificant at first. No promises were made, yet an unspoken resonance lingered long after the autumn leaves fell.",
    emotion: "🌱 Genesis & Curiosity",
    highlightTag: "Since 2015",
    archivedRuleRef: 1
  },
  {
    year: 2016,
    title: "The Boundless Laughter",
    subtitle: "Rooftops, endless cycles & tea cups at 2 AM",
    description: "Friendships solidified into an unbreakable circle. We carved our names into hidden desks, convinced time would wait forever for us.",
    emotion: "✨ Pure Attachment",
    highlightTag: "Year of Innocence",
    archivedRuleRef: 14
  },
  {
    year: 2017,
    title: "First Distances & Fragile Trust",
    subtitle: "When silence began to test the bonds",
    description: "The first subtle shifts. Different colleges, distant horizons, yet whenever we spoke, the world paused. Some attractions bloomed quietly in the shadows.",
    emotion: "🍂 Quiet Yearning",
    highlightTag: "Trial of Distance",
    archivedRuleRef: 42
  },
  {
    year: 2018,
    title: "Codification of The First 100 Rules",
    subtitle: "Scrawled on napkins & diary margins",
    description: "We declared: 'No one leaves without answering the call.' Rule 18 and Rule 62 were born. A pact of loyalty sealed without paperwork.",
    emotion: "🔏 Unwritten Oath",
    highlightTag: "100 Rules Born",
    archivedRuleRef: 62
  },
  {
    year: 2019,
    title: "Departures & Wandering Echoes",
    subtitle: "Some stayed behind, some drifted like autumn leaves",
    description: "The bittersweet ache of watching people choose different crossroads. We realized some loves and attachments are never forgettable until they stay.",
    emotion: "🥀 Bitter Sweetness",
    highlightTag: "The Divergence",
    archivedRuleRef: 133
  },
  {
    year: 2020,
    title: "The Screen-Lit Silence (Magenta V2)",
    subtitle: "Isolation across borders & late night texts",
    description: "Global stillness. Late-night discord pings, voice notes sent at sunrise, remembering how loud our laughter once was under the sky.",
    emotion: "🌌 Solitary Resonance",
    highlightTag: "The Long Pause",
    archivedRuleRef: 240
  },
  {
    year: 2021,
    title: "The Glance in the Crowd",
    subtitle: "Three seconds that undid four years of absence",
    description: "A brief, unexpected reunion. You looked across the platform. Neither spoke immediately, but the eyes confirmed: nothing was ever lost.",
    emotion: "👁️ Unspoken Truth",
    highlightTag: "The Resonance",
    archivedRuleRef: 388
  },
  {
    year: 2022,
    title: "The Register of 18 Chapters (Magenta v3)",
    subtitle: "Some founded, some lost forever in the mist",
    description: "We mapped the 18 essential chapters of Lime Green. Some were still around our table; others had become ghosts in our camera rolls.",
    emotion: "📜 Sacred Archive",
    highlightTag: "18 Chapters",
    archivedRuleRef: 512
  },
  {
    year: 2023,
    title: "Sealing of Rule #803",
    subtitle: "The ceiling of memory & unclosed chapters",
    description: "Rule 803 was etched into stone: 'To be continued...'. No final full stop. Some stories are too delicate to ever be given an ending.",
    emotion: "🔐 The 803 Boundary",
    highlightTag: "803 Rules Total",
    archivedRuleRef: 803
  },
  {
    year: 2024,
    title: "The Quiet Anchor",
    subtitle: "Accepting incomplete chapters with grace",
    description: "Learning that nostalgia is not grief, but proof of love. The group evolved; the private jokes remained holy; the dry leaf kept drifting.",
    emotion: "🍁 Calm Acceptance",
    highlightTag: "Quiet Strength",
    archivedRuleRef: 750
  },
  {
    year: 2025,
    title: "The Echoes in the Wind",
    subtitle: "Preserving the flame before the winds shift",
    description: "A digital sanctuary established to safeguard the 18 characters and 803 rules. Even if strangers glance at it, only authorized souls feel it.",
    emotion: "🌬️ Memory Keeper",
    highlightTag: "Sanctuary Built",
    archivedRuleRef: 799
  },
  {
    year: 2026,
    title: "Lime Green Eternal",
    subtitle: "Still waiting, still hoping, to be continued 🔏🧿🤌🏻🫠🫶🏻",
    description: "Here in the present moment. A single dry leaf resting on autumn soil. The door remains ajar. Are we loyal, or are we just beautifully stuck? 🙃",
    emotion: "💚 Living Story",
    highlightTag: "Present Horizon",
    archivedRuleRef: 803
  }
];

export const RULES_DATA: RuleItem[] = [
  {
    id: 1,
    category: "public",
    title: "Magenta v1",
    text: "Never force an explanation from someone who has run out of words. Silence is an answer, but silence is also shelter.",
    yearAdded: 2015,
    status: "Active Public"
  },
  {
    id: 18,
    category: "authorised",
    title: "The 18 Chapters Boundary",
    text: "No matter how many cross the perimeter, only 18 chapters shall ever be pulled to the primary hearth. Founded or lost, each chapter is preserved forever.",
    yearAdded: 2018,
    status: "Authorised Only"
  },
  {
    id: 62,
    category: "public",
    title: "The 62% Affinity Law",
    text: "Peoples carry a natural capacity of 62% to become a Chapter of Lime Green 💚. The remaining 38% demands Time, Trust, and unconditional Loyalty.",
    yearAdded: 2018,
    status: "Active Public"
  },
  {
    id: 104,
    category: "public",
    title: "The Drifting Leaf Precept",
    text: "A dry leaf does not fall because it hates the branch; it falls because its season has arrived. Do not blame the ones who drifted.",
    yearAdded: 2019,
    status: "Active Public"
  },
  {
    id: 240,
    category: "authorised",
    title: "Magenta V2",
    text: "If a call arrives between 02:00 and 04:00 AM, pick up without inquiring 'why'. Some burdens cannot withstand waiting for sunrise.",
    yearAdded: 2020,
    status: "Authorised Only"
  },
  {
    id: 404,
    category: "private",
    title: "The Lost Chapter Crypt",
    text: "[ENCRYPTED CONTENT: Accessible solely during Yellow Autumn authorization]. Remembering the chapter whose words cannot be whispered in the daylight.",
    yearAdded: 2021,
    status: "Private Sealed"
  },
  {
    id: 512,
    category: "authorised",
    title: "Magenta v3",
    text: "The sacred bond of the 18 Chapters. Even if the book closes, the ink remains alive in the memories of those who lived it.",
    yearAdded: 2022,
    status: "Authorised Only"
  },
  {
    id: 620,
    category: "authorised",
    title: "The Loyalty Paradox",
    text: "Is it loyalty when you stay, or is it fear of being forgotten? If you smile through the ache, Lime Green recognizes you.",
    yearAdded: 2022,
    status: "Authorised Only"
  },
  {
    id: 777,
    category: "private",
    title: "The Three Sacred Vows",
    text: "[ENCRYPTED CONTENT: Classified under Chapter Magenta]. Time softens every jagged stone. Trust is a mirror you only break once.",
    yearAdded: 2023,
    status: "Private Sealed"
  },
  {
    id: 803,
    category: "public",
    title: "To Be Continued 🔏🧿🤌🏻🫠🫶🏻",
    text: "Never type 'The End'. In Lime Green 💚, every ending is merely an intermission while the yellow dry leaf drifts to the next page.",
    yearAdded: 2023,
    status: "Master Rule"
  }
];

export const CHARACTERS_DATA: CharacterItem[] = [
  {
    id: 1,
    code: "LG-CH-01",
    name: "Chapter 1: The First Witness",
    title: "Genesis Architect of 2015",
    nature: "Silent Observer & Chronicler",
    status: "Founded",
    affinity: 98,
    symbol: "🧭",
    notes: "Was there when the first word was penned. Carries the original pocket notebook."
  },
  {
    id: 2,
    code: "LG-CH-02",
    name: "Chapter 2: The Laughing Anchor",
    title: "Rooftop Keeper",
    nature: "Unfiltered Warmth & Defiance",
    status: "Founded",
    affinity: 92,
    symbol: "🏮",
    notes: "Never allowed silence to turn into sadness during the golden days."
  },
  {
    id: 3,
    code: "LG-CH-03",
    name: "Chapter 3: The Autumn Wanderer",
    title: "Drifting Soul",
    nature: "Restless Dreamer",
    status: "Lost in Echoes",
    affinity: 62,
    symbol: "🍂",
    notes: "Departed in late 2019. Letters stopped arriving, but Chapter 3 remains untouched."
  },
  {
    id: 4,
    code: "LG-CH-04",
    name: "Chapter 4: The Midnight Confessor",
    title: "Night Warden",
    nature: "Deep Listener & Secret Vault",
    status: "Active Guardian",
    affinity: 89,
    symbol: "🌙",
    notes: "Holds approximately 412 private confessions across the group's history."
  },
  {
    id: 5,
    code: "LG-CH-05",
    name: "Chapter 5: The Crimson Rose",
    title: "Attachment Paradox",
    nature: "Fierce Loyalty & Guarded Fragility",
    status: "Founded",
    affinity: 84,
    symbol: "🌹",
    notes: "Reminded everyone that some loves never leave even when distance wins."
  },
  {
    id: 6,
    code: "LG-06",
    name: "The Emotionless Echo",
    title: "The Stoic Mirror",
    nature: "Unreadable Expression, Deep Heart",
    status: "Founded",
    affinity: 76,
    symbol: "😐",
    notes: "Expresses nothing outwardly, yet is always the first to show up when trouble calls."
  },
  {
    id: 7,
    code: "LG-07",
    name: "The Unsent Letter",
    title: "Poet of Regret",
    nature: "Melancholic Nostalgia",
    status: "Lost in Echoes",
    affinity: 62,
    symbol: "✉️",
    notes: "Left behind a playlist and three dry leaves pressed in a textbook."
  },
  {
    id: 8,
    code: "LG-08",
    name: "The Trust Enforcer",
    title: "Judge of Oaths",
    nature: "Absolute Integrity & Steel",
    status: "Active Guardian",
    affinity: 94,
    symbol: "🛡️",
    notes: "Authored Rule 18 and Rule 62. Does not believe in second betrayals."
  },
  {
    id: 9,
    code: "LG-09",
    name: "The Phantom Companion",
    title: "The Ghost in the Photo",
    nature: "Distant Protector",
    status: "Lost in Echoes",
    affinity: 62,
    symbol: "🌫️",
    notes: "Only appears in memories when rain falls at dusk."
  },
  {
    id: 10,
    code: "LG-10",
    name: "The Daylight Optimist",
    title: "Sunlight Weaver",
    nature: "Resilient Cheerfulness",
    status: "Founded",
    affinity: 81,
    symbol: "☀️",
    notes: "Believes every lost character will walk back through the gate one morning."
  },
  {
    id: 11,
    code: "LG-11",
    name: "The Secret Scribe",
    title: "Keeper of Rule 803",
    nature: "Meticulous & Reclusive",
    status: "Active Guardian",
    affinity: 95,
    symbol: "🔏",
    notes: "Locks the archives every season transition. Key holder of Yellow Autumn."
  },
  {
    id: 12,
    code: "LG-12",
    name: "The Reluctant Traveler",
    title: "Crossroad Wanderer",
    nature: "Torn Between Here and Elsewhere",
    status: "Wandering",
    affinity: 68,
    symbol: "🧳",
    notes: "Moves across cities every two years, carrying a single green token."
  },
  {
    id: 13,
    code: "LG-13",
    name: "The Silent Healer",
    title: "Remedy in the Dark",
    nature: "Empathy Without Words",
    status: "Founded",
    affinity: 87,
    symbol: "🌿",
    notes: "Brings hot chai and sits beside you without making you explain yourself."
  },
  {
    id: 14,
    code: "LG-14",
    name: "The Missing Compass",
    title: "The Lost Navigator",
    nature: "Unpredictable Whirlwind",
    status: "Lost in Echoes",
    affinity: 62,
    symbol: "🧩",
    notes: "The void they left reshaped the entire circle's dynamics forever."
  },
  {
    id: 15,
    code: "LG-15",
    name: "The Unyielding Shadow",
    title: "Silent Shield",
    nature: "Protective Solitude",
    status: "Active Guardian",
    affinity: 90,
    symbol: "🌑",
    notes: "Watches over the perimeter. Speaks only when the circle is threatened."
  },
  {
    id: 16,
    code: "LG-16",
    name: "The Memory Archivist",
    title: "Voice of the Vault",
    nature: "Curator of Forgotten Days",
    status: "Founded",
    affinity: 83,
    symbol: "📼",
    notes: "Still preserves audio recordings from 2016 college stairwells."
  },
  {
    id: 17,
    code: "LG-17",
    name: "The Drifting Ember",
    title: "The Flickering Flame",
    nature: "Intense yet Transient",
    status: "Wandering",
    affinity: 65,
    symbol: "🔥",
    notes: "Comes back once every three years like a comet, illuminates everything, then fades."
  },
  {
    id: 18,
    code: "LG-CH-18",
    name: "Chapter 18: The Unwritten Chapter",
    title: "The Chapter Awaiting You",
    nature: "The Open Door",
    status: "Founded",
    affinity: 62,
    symbol: "💚",
    notes: "The final 18th chapter. Reserved for whoever reads these words and stays loyal."
  }
];

export const CHAPTERS_DATA = CHARACTERS_DATA;

export const LANGUAGES_OF_LIME_GREEN = [
  {
    id: "time",
    title: "Time ⏳",
    quote: "Patience when months turn to silence without turning into distance.",
    description: "In Lime Green, Time is not measured by daily texts or constant updates. It is the miraculous quiet certainty that after two years of silence, picking up the conversation feels like picking up yesterday's comma.",
    color: "from-amber-500/20 to-amber-700/10",
    border: "border-amber-500/30",
    badge: "Language 01"
  },
  {
    id: "trust",
    title: "Trust 🤝",
    quote: "Speaking your rawest ache without guarding the flanks.",
    description: "Trust is the quiet confidence that your secrets will never be converted into weapons during an argument. It is handing someone the loaded gun knowing they would never aim it at you.",
    color: "from-blue-500/20 to-indigo-700/10",
    border: "border-blue-500/30",
    badge: "Language 02"
  },
  {
    id: "loyalty",
    title: "Loyalty 🛡️",
    quote: "Remaining rooted even when autumn strips the branches bare.",
    description: "Not blind obedience, but fierce presence. When everyone else is convinced you've lost your way, Loyalty stands beside you on the cold porch and hands you an umbrella.",
    color: "from-emerald-500/20 to-teal-700/10",
    border: "border-emerald-500/30",
    badge: "Language 03"
  },
  {
    id: "unspoken",
    title: "...~~~:) 🔏",
    quote: "The unnamed dialect spoken solely in glances, inside jokes, and incomplete sentences.",
    description: "The 4th language that has no alphabets. It lives between the pauses, in the shared '🙃' emoji, in knowing who hurt you before you've even typed the first word. It is to be continued...",
    color: "from-fuchsia-500/20 to-rose-700/10",
    border: "border-fuchsia-500/30",
    badge: "Language 04 • Secret"
  }
];
