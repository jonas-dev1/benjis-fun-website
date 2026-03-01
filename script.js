// ─── Random hero quote on each reload ───
const heroQuotes = [
  '"Imagination is more important than knowledge." — Albert Einstein',
  '"The important thing is not to stop questioning." — Albert Einstein',
  '"Look up at the stars and not down at your feet." — Stephen Hawking',
  '"Somewhere, something incredible is waiting to be known." — Carl Sagan',
  '"Science is a way of thinking much more than it is a body of knowledge." — Carl Sagan',
  '"Nothing in life is to be feared, it is only to be understood." — Marie Curie',
  '"Be less curious about people and more curious about ideas." — Marie Curie',
  '"The good thing about science is that it\'s true whether or not you believe in it." — Neil deGrasse Tyson',
  '"We are all connected: to each other, biologically; to the Earth, chemically; to the rest of the universe, atomically." — Neil deGrasse Tyson',
  '"If I have seen further, it is by standing on the shoulders of giants." — Isaac Newton',
  '"An expert is a person who has made all the mistakes that can be made in a very narrow field." — Niels Bohr',
  '"The universe is under no obligation to make sense to you." — Neil deGrasse Tyson',
  '"Life is like riding a bicycle. To keep your balance you must keep moving." — Albert Einstein',
  '"Creativity is intelligence having fun." — Albert Einstein',
  '"I have no special talent. I am only passionately curious." — Albert Einstein',
  '"Equipped with his five senses, man explores the universe around him and calls the adventure Science." — Edwin Hubble',
  '"The Earth is the cradle of humanity, but mankind cannot stay in the cradle forever." — Konstantin Tsiolkovsky',
  '"That\'s one small step for man, one giant leap for mankind." — Neil Armstrong',
  '"Genius is one percent inspiration and ninety-nine percent perspiration." — Thomas Edison',
  '"The only source of knowledge is experience." — Albert Einstein'
];

(function setHeroQuote() {
  const el = document.getElementById("hero-quote");
  if (el) el.textContent = heroQuotes[Math.floor(Math.random() * heroQuotes.length)];
})();

const facts = {
  space: [
    "Jupiter is so big that over 1,300 Earths could fit inside it!",
    "Neptune has super-fast winds racing faster than race cars.",
    "A day on Venus is longer than a year on Venus. Wild!",
    "The Milky Way galaxy has billions of stars."
  ],
  countries: [
    "Japan has over 6,000 islands.",
    "Canada has more lakes than any other country.",
    "South Africa has three capital cities.",
    "India has one of the world's biggest film industries.",
    "Australia is home to the world's longest fence, the Dingo Fence.",
  ],
  nfl: [
    "NFL teams move the ball in sets of four plays called downs.",
    "A field goal is worth 3 points.",
    "The Super Bowl is one of the biggest sports events each year.",
    "NFL players train for speed, strength, and strategy.",
    "The NFL was founded in 1920 and has grown into a massive league.",
  ],
  mario: [
    "Super Mario Bros. launched in 1985.",
    "Princess Peach rules the Mushroom Kingdom.",
    "Yoshi first appeared in Super Mario World.",
    "Power-ups like mushrooms make Mario stronger.",
    "Bowser is Mario's main nemesis.",
  ],
  roblox: [
    "Roblox has millions of player-created experiences.",
    "Players can learn coding by making their own Roblox games.",
    "Roblox avatars can be customized in tons of ways.",
    "Obbies are Roblox obstacle course games.",
    "Roblox runs on phones, tablets, PC, consoles, and even VR headsets!",
    "Roblox's motto is 'Powering Imagination'.",
    "You can build your own worlds with Roblox Studio.",
    "Roblox has experiences in every genre: racing, tycoon, RPG, horror, and more!"
  ]
};

const underseaPrompts = {
  adventure: [
    "A giggle-powered jellyfish race has started in Bubble Bay!",
    "Treasure hunt time: find the golden shell near Coral Castle.",
    "A super-bouncy sea scooter challenge just popped up!",
    "A silly sea-dragon just challenged everyone to a bubble race!",
    "Mission splash: collect 5 glowing shells before the tide flips!"
  ],
  friends: [
    "Best-friend mission: share 3 giant laughs before sunset.",
    "Two goofy ocean buddies are building the silliest sand fort.",
    "Friendship bonus unlocked: dance party on the ocean floor!",
    "Buddy boost unlocked: high-five a crab and spin like a starfish!",
    "Ocean teamwork challenge: build a jelly castle with your bestie!"
  ],
  games: [
    "Mini game: pop 20 bubbles in 10 seconds.",
    "Mini game: freeze dance when the conch shell stops singing.",
    "Mini game: jelly-jump across sea stars without touching seaweed.",
    "Mini game: dodge sleepy pufferfish for 15 seconds.",
    "Mini game: ride the current and grab 8 rainbow pearls."
  ]
};

const confettiCanvas = document.getElementById("confetti-canvas");
const ctx = confettiCanvas.getContext("2d");
const particles = [];

let meter = 0;
const meterBar = document.getElementById("fun-meter");
const meterText = document.getElementById("fun-meter-text");
let meterGlobalCooldown = false;

const pick = (items) => items[Math.floor(Math.random() * items.length)];

function triggerMeterGlobalCooldown() {
  meterGlobalCooldown = true;
  document.querySelectorAll(".chip, [data-confetti], .card-btn[data-fact-group], [data-scroll], .undersea-btn, .roblox-btn").forEach((b) => b.classList.add("on-cooldown"));
  setTimeout(() => {
    meterGlobalCooldown = false;
    document.querySelectorAll(".on-cooldown").forEach((b) => b.classList.remove("on-cooldown"));
  }, 1000);
}

function updateMeter(add = 8) {
  meter = Math.min(100, meter + add);
  meterBar.style.width = `${meter}%`;
  meterText.textContent = `${meter}% charged`;

  if (meter >= 100) {
    meterText.textContent = "100%! MAX FUN!";
    burstConfetti(window.innerWidth * 0.5, 120, 140);
    triggerMeterGlobalCooldown();
    meter = 0;
    setTimeout(() => {
      meterBar.style.width = `${meter}%`;
      meterText.textContent = `${meter}% charged`;
    }, 1200);
  }
}

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}

function burstConfetti(x = window.innerWidth / 2, y = window.innerHeight / 2, count = 80) {
  const canvasRect = confettiCanvas.getBoundingClientRect();
  const localX = x - canvasRect.left;
  const localY = y - canvasRect.top;
  const scaled = Math.round(count * 0.45);
  const colors = ["#7cf3ff", "#ffdf4d", "#ff7acc", "#8dffaf", "#ffffff"];
  for (let i = 0; i < scaled; i += 1) {
    particles.push({
      x: localX,
      y: localY,
      size: Math.random() * 6 + 4,
      color: pick(colors),
      vx: (Math.random() - 0.5) * 8,
      vy: Math.random() * -7 - 2,
      life: 85 + Math.random() * 20,
      rotation: Math.random() * Math.PI
    });
  }
}

function burstConfettiAtElement(element, count = 80) {
  const rect = element.getBoundingClientRect();
  burstConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, count);
}

function animateConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  for (let i = particles.length - 1; i >= 0; i -= 1) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.13;
    p.life -= 1;
    p.rotation += 0.15;

    if (p.life <= 0 || p.y > confettiCanvas.height + 30) {
      particles.splice(i, 1);
      continue;
    }

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = Math.max(0, p.life / 95);
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
    ctx.restore();
  }

  requestAnimationFrame(animateConfetti);
}

function setTheme(theme) {
  const classes = ["theme-space", "theme-countries", "theme-nfl", "theme-mario", "theme-roblox"];
  document.body.classList.remove(...classes);
  document.body.classList.add(`theme-${theme}`);

  document.querySelectorAll(".chip").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.theme === theme);
  });
}

document.querySelectorAll("[data-scroll]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(button.dataset.scroll)?.scrollIntoView({ behavior: "smooth", block: "start" });
    burstConfettiAtElement(button, 40);
    updateMeter(5);
  });
});

function rollFunAmount() {
  const roll = Math.random() * 100;
  if (roll < 50) {
    // Plain (50%) — 1-10
    return { amount: Math.floor(Math.random() * 10) + 1, tier: "plain" };
  } else if (roll < 80) {
    // Nice (30%) — 11-30
    return { amount: Math.floor(Math.random() * 20) + 11, tier: "nice" };
  } else if (roll < 90) {
    // Epic (10%) — 31-60
    return { amount: Math.floor(Math.random() * 30) + 31, tier: "epic" };
  } else {
    // Legendary (10%) — 61-100
    return { amount: Math.floor(Math.random() * 40) + 61, tier: "legendary" };
  }
}

const tierLabels = {
  plain: "",
  nice: "🟢 Nice! +",
  epic: "🟣 Epic! +",
  legendary: "🌟 LEGENDARY! +"
};

function flashMeterTier(tier, amount) {
  if (tier === "plain") {
    meterText.textContent = `+${amount} — ${meter}% charged`;
    return;
  }
  meterText.textContent = `${tierLabels[tier]}${amount}! — ${meter}% charged`;
  meterBar.classList.add(`meter-${tier}`);
  setTimeout(() => meterBar.classList.remove(`meter-${tier}`), 900);
}

let chipCooldown = false;

document.querySelectorAll(".chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    if (chipCooldown || meterGlobalCooldown) return;
    chipCooldown = true;
    document.querySelectorAll(".chip").forEach((c) => c.classList.add("on-cooldown"));
    setTimeout(() => {
      chipCooldown = false;
      document.querySelectorAll(".chip").forEach((c) => c.classList.remove("on-cooldown"));
    }, 1000);

    setTheme(chip.dataset.theme);
    const { amount, tier } = rollFunAmount();
    const confettiCount = tier === "legendary" ? 160 : tier === "epic" ? 90 : 45;
    burstConfettiAtElement(chip, confettiCount);
    updateMeter(amount);
    flashMeterTier(tier, amount);
  });
});

document.querySelectorAll(".card-btn[data-fact-group]").forEach((button) => {
  button.addEventListener("click", () => {
    if (meterGlobalCooldown) return;
    const group = button.dataset.factGroup;
    const target = document.getElementById(`${group}-fact`);
    target.textContent = pick(facts[group]);
    burstConfettiAtElement(button, 34);
    updateMeter(7);
  });
});

const mixMessages = [
  "You unlocked the Benji Cosmic Champion combo!",
  "MEGA COMBO: Space explorer + Country hopper + Touchdown king!",
  "Mix level: OVER 9000! Mario rides a comet through Roblox! 🌠",
  "Benji just fused all worlds into one EPIC dimension!",
  "Achievement unlocked: Master of Every Universe!",
  "The NFL plays on Mars while Mario builds in Roblox — chaos mode!",
  "Countries are floating in space and touchdowns rain from the sky!",
  "Roblox + Mario + NFL + Space = the ultimate crossover episode!",
  "Benji has entered the Multiverse of Maximum Fun!",
  "Plot twist: the entire galaxy is a Roblox obby built by Mario!",
  "Fun overload detected — deploying emergency confetti!",
  "All 6 themes combined — Benji is now unstoppable!",
  "Cosmic touchdown! Mario scored from across the galaxy!",
  "Every country just joined the NFL — in SPACE!",
  "Benji mode activated: infinite imagination unlocked!"
];

const mixFactEl = document.getElementById("mix-fact");
const chillLineEl = document.getElementById("chill-line");

const chillLines = [
  "Cosmic breeze detected... fun levels rising automatically 🌌",
  "No clicks needed: your galaxy is vibing on autopilot ✨",
  "A tiny comet just did a backflip behind Saturn ☄️",
  "Roblox bricks are orbiting Mars in perfect formation 🧱",
  "Undersea giggles are bubbling up from Bubble Bay 🫧",
  "Mario found a star and launched it into rainbow space 🌟",
  "Country hopper update: world dance party now in session 🌍",
  "Benji's universe is running in MAX CHILL mode 😎",
  "The NFL just called a timeout to admire the cosmic view 🏈🌠",
  "\"Adventure is out there.\" — Up"
];

function startNoClickFun() {
  if (!chillLineEl) {
    return;
  }
  chillLineEl.textContent = pick(chillLines);
  setInterval(() => {
    chillLineEl.textContent = pick(chillLines);
  }, 2600);
}

let confettiBlastCooldown = false;

document.querySelectorAll("[data-confetti]").forEach((button) => {
  button.addEventListener("click", () => {
    if (meterGlobalCooldown || confettiBlastCooldown) return;
    const mode = button.dataset.confetti;
    if (mode === "big") {
      confettiBlastCooldown = true;
      button.classList.add("on-cooldown");
      setTimeout(() => { confettiBlastCooldown = false; if (!meterGlobalCooldown) button.classList.remove("on-cooldown"); }, 1000);
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      burstConfetti(centerX, centerY, 180);
      setTimeout(() => burstConfetti(centerX - 120, centerY + 30, 90), 180);
      setTimeout(() => burstConfetti(centerX + 120, centerY + 30, 90), 180);
      updateMeter(Math.floor(Math.random() * 30) + 1);
    } else {
      burstConfettiAtElement(button, 95);
      if (mixFactEl) mixFactEl.textContent = pick(mixMessages);
      updateMeter(10);
    }
  });
});

const timezoneNameEl = document.getElementById("timezone-name");
const timezoneTimeEl = document.getElementById("timezone-time");
const globeButton = document.getElementById("globe-btn");
const underseaFactEl = document.getElementById("undersea-fact");
const underseaPanel = document.getElementById("undersea");
const metricOffsetEl = document.getElementById("metric-offset");
const metricIsoEl = document.getElementById("metric-iso");
const metricUnixEl = document.getElementById("metric-unix");
const metricDayEl = document.getElementById("metric-day");
const flagDisplayEl = document.getElementById("flag-display");
const flagFeedbackEl = document.getElementById("flag-feedback");
const flagScoreEl = document.getElementById("flag-score");
const flagStreakEl = document.getElementById("flag-streak");
const flagNextBtn = document.getElementById("flag-next");
const flagOptionButtons = document.querySelectorAll(".flag-option");
let selectedTzOffset = null; // null = local, otherwise hours offset from UTC

function regionCodeToFlag(code) {
  return String.fromCodePoint(...code.toUpperCase().split("").map((char) => 127397 + char.charCodeAt(0)));
}

function shuffleArray(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

let regionNameFormatter = null;
if (typeof Intl.DisplayNames === "function") {
  try {
    regionNameFormatter = new Intl.DisplayNames(["en"], { type: "region" });
  } catch {
    regionNameFormatter = null;
  }
}

const regionCodes = [
  "AD", "AE", "AF", "AG", "AL", "AM", "AO", "AR", "AT", "AU", "AZ",
  "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BN", "BO", "BR", "BS", "BT", "BW", "BY", "BZ",
  "CA", "CD", "CF", "CG", "CH", "CI", "CL", "CM", "CN", "CO", "CR", "CU", "CV", "CY", "CZ",
  "DE", "DJ", "DK", "DM", "DO", "DZ",
  "EC", "EE", "EG", "ER", "ES", "ET",
  "FI", "FJ", "FM", "FR",
  "GA", "GB", "GD", "GE", "GH", "GM", "GN", "GQ", "GR", "GT", "GW", "GY",
  "HN", "HR", "HT", "HU",
  "ID", "IE", "IL", "IN", "IQ", "IR", "IS", "IT",
  "JM", "JO", "JP",
  "KE", "KG", "KH", "KI", "KM", "KN", "KR", "KW", "KZ",
  "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY",
  "MA", "MC", "MD", "ME", "MG", "MH", "MK", "ML", "MM", "MN", "MR", "MT", "MU", "MV", "MW", "MX", "MY", "MZ",
  "NA", "NE", "NG", "NI", "NL", "NO", "NP", "NR", "NZ",
  "OM",
  "PA", "PE", "PG", "PH", "PK", "PL", "PT", "PW", "PY",
  "QA",
  "RO", "RS", "RU", "RW",
  "SA", "SB", "SC", "SD", "SE", "SG", "SI", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SY", "SZ",
  "TD", "TG", "TH", "TJ", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TZ",
  "UA", "UG", "US", "UY", "UZ",
  "VA", "VC", "VE", "VN", "VU",
  "WS",
  "YE",
  "ZA", "ZM", "ZW"
];

const flagQuestions = regionCodes
  .map((code) => {
    const country = regionNameFormatter ? regionNameFormatter.of(code) : code;
    return { code, country, flag: regionCodeToFlag(code) };
  })
  .filter((entry) => entry.country);

let currentFlagQuestion = null;
let flagScore = 0;
let flagStreak = 0;
let flagAnswered = false;
let flagQuestionBag = [];

function drawNextFlagQuestion() {
  if (flagQuestionBag.length === 0) {
    flagQuestionBag = shuffleArray(flagQuestions);
  }
  return flagQuestionBag.pop() || pick(flagQuestions);
}

function setFlagQuestion() {
  if (!flagDisplayEl || flagQuestions.length === 0) {
    return;
  }

  currentFlagQuestion = drawNextFlagQuestion();
  const cropZoom = 1.15 + Math.random() * 0.3;
  const cropX = 15 + Math.random() * 70;
  const cropY = 15 + Math.random() * 70;
  flagDisplayEl.textContent = "";
  flagDisplayEl.style.backgroundImage = `url(https://flagcdn.com/w320/${currentFlagQuestion.code.toLowerCase()}.png)`;
  flagDisplayEl.style.backgroundSize = `${cropZoom * 100}%`;
  flagDisplayEl.style.backgroundPosition = `${cropX}% ${cropY}%`;

  const answerPool = [currentFlagQuestion];
  while (answerPool.length < Math.min(5, flagQuestions.length)) {
    const candidate = pick(flagQuestions);
    if (!answerPool.some((entry) => entry.code === candidate.code)) {
      answerPool.push(candidate);
    }
  }
  const options = shuffleArray(answerPool);

  flagAnswered = false;
  flagOptionButtons.forEach((button, index) => {
    const option = options[index];
    if (!option) {
      button.style.display = "none";
      return;
    }
    button.style.display = "";
    button.textContent = option.country;
    button.dataset.code = option.code;
    button.dataset.country = option.country;
    button.disabled = false;
    button.classList.remove("correct", "wrong", "on-cooldown");
  });

  if (flagFeedbackEl) {
    flagFeedbackEl.textContent = "Pick an answer to start!";
  }
}

function updateFlagStats() {
  if (flagScoreEl) {
    flagScoreEl.textContent = `${flagScore}`;
  }
  if (flagStreakEl) {
    flagStreakEl.textContent = `${flagStreak}`;
  }
}

function setupFlagQuiz() {
  if (!flagDisplayEl || !flagOptionButtons.length || flagQuestions.length === 0) {
    return;
  }

  flagDisplayEl.addEventListener("contextmenu", (event) => event.preventDefault());
  flagDisplayEl.addEventListener("dragstart", (event) => event.preventDefault());
  flagDisplayEl.addEventListener("selectstart", (event) => event.preventDefault());

  setFlagQuestion();
  updateFlagStats();

  flagOptionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!currentFlagQuestion || flagAnswered) {
        return;
      }

      const guessCode = button.dataset.code;
      const isCorrect = guessCode === currentFlagQuestion.code;
      flagAnswered = true;

      if (isCorrect) {
        flagScore += 1;
        flagStreak += 1;
        button.classList.add("correct");
        const buttonRect = button.getBoundingClientRect();
        burstConfetti(buttonRect.left + buttonRect.width / 2, buttonRect.top + buttonRect.height / 2, 55);
        if (flagFeedbackEl) {
          flagFeedbackEl.textContent = `✅ Correct! ${currentFlagQuestion.flag} is ${currentFlagQuestion.country}.`;
        }
      } else {
        flagStreak = 0;
        button.classList.add("wrong");
        flagOptionButtons.forEach((candidate) => {
          if (candidate.dataset.code === currentFlagQuestion.code) {
            candidate.classList.add("correct");
          }
        });
        if (flagFeedbackEl) {
          flagFeedbackEl.textContent = `❌ Nice try! That flag is ${currentFlagQuestion.country}.`;
        }
      }

      flagOptionButtons.forEach((candidate) => {
        candidate.disabled = true;
        candidate.classList.add("on-cooldown");
      });

      updateFlagStats();
    });
  });

  if (flagNextBtn) {
    flagNextBtn.addEventListener("click", () => {
      setFlagQuestion();
    });
  }
}

function getUtcOffsetLabel(offsetHours) {
  if (offsetHours == null) {
    const offsetMinutes = -new Date().getTimezoneOffset();
    const sign = offsetMinutes >= 0 ? "+" : "-";
    const absMinutes = Math.abs(offsetMinutes);
    const hours = String(Math.floor(absMinutes / 60)).padStart(2, "0");
    const minutes = String(absMinutes % 60).padStart(2, "0");
    return `UTC${sign}${hours}:${minutes}`;
  }
  const sign = offsetHours >= 0 ? "+" : "-";
  const abs = Math.abs(offsetHours);
  const h = Math.floor(abs);
  const m = Math.round((abs - h) * 60);
  return `UTC${sign}${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function getDateInOffset(offsetHours) {
  const now = new Date();
  if (offsetHours == null) return now;
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utcMs + offsetHours * 3600000);
}

function updateTimezoneWidget() {
  const display = getDateInOffset(selectedTzOffset);
  const timeText = display.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  const dayOfYear = Math.floor((display - new Date(display.getFullYear(), 0, 0)) / 86400000);

  if (selectedTzOffset == null) {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Local";
    timezoneNameEl.textContent = `${timezone} (${getUtcOffsetLabel()})`;
    timezoneTimeEl.textContent = `Local time: ${timeText}`;
  } else {
    timezoneNameEl.textContent = getUtcOffsetLabel(selectedTzOffset);
    timezoneTimeEl.textContent = timeText;
  }

  if (metricOffsetEl) {
    metricOffsetEl.textContent = getUtcOffsetLabel(selectedTzOffset);
  }
  if (metricIsoEl) {
    if (selectedTzOffset == null) {
      metricIsoEl.textContent = new Date().toISOString();
    } else {
      metricIsoEl.textContent = display.toISOString().replace("Z", getUtcOffsetLabel(selectedTzOffset).replace("UTC", ""));
    }
  }
  if (metricUnixEl) {
    metricUnixEl.textContent = `${Math.floor(Date.now() / 1000)} s`;
  }
  if (metricDayEl) {
    metricDayEl.textContent = `${dayOfYear}`;
  }
}

// Timezone picker logic
const tzPicks = document.querySelectorAll(".tz-pick");
const tzLocalBtn = document.getElementById("tz-local-btn");

function setActiveTzPick(offset) {
  tzPicks.forEach((btn) => {
    btn.classList.toggle("active", parseFloat(btn.dataset.tz) === offset);
  });
}

// Auto-select local timezone on load
(function initLocalTzPick() {
  const localOffset = -new Date().getTimezoneOffset() / 60;
  selectedTzOffset = null;
  tzPicks.forEach((btn) => {
    btn.classList.toggle("active", parseFloat(btn.dataset.tz) === localOffset);
  });
})();

tzPicks.forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedTzOffset = parseFloat(btn.dataset.tz);
    tzPicks.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    updateTimezoneWidget();
  });
});

if (tzLocalBtn) {
  tzLocalBtn.addEventListener("click", () => {
    selectedTzOffset = null;
    const localOffset = -new Date().getTimezoneOffset() / 60;
    tzPicks.forEach((btn) => {
      btn.classList.toggle("active", parseFloat(btn.dataset.tz) === localOffset);
    });
    updateTimezoneWidget();
  });
}

globeButton.addEventListener("click", () => {
  updateTimezoneWidget();
  const globeRect = globeButton.getBoundingClientRect();
  burstConfetti(globeRect.left + globeRect.width / 2, globeRect.top + globeRect.height / 2, 45);
  updateMeter(6);
});

document.querySelectorAll(".undersea-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const group = button.dataset.undersea;
    underseaFactEl.textContent = pick(underseaPrompts[group]);
    burstConfettiAtElement(button, 38);
    updateMeter(8);
  });
});

const robloxAvatarParts = {
  hats: ["Rainbow Crown", "Pirate Tricorn", "Neon Headband", "Wizard Hat", "Dino Hood", "Viking Helmet", "Astronaut Visor", "Bunny Ears"],
  faces: ["Super Smile", "Cool Shades", "Silly Tongue", "Robot Eyes", "Star Eyes", "Wink Face"],
  outfits: ["Galaxy Suit", "Lava Armor", "Pixel Tuxedo", "Ninja Robe", "Rainbow Hoodie", "Knight Plate", "Dino Onesie"],
  accessories: ["Jetpack", "Hoverboard", "Light Saber", "Magic Wings", "Boombox", "Grappling Hook", "Golden Skateboard"]
};

const robloxExperiences = [
  "Adopt Me! — hatch eggs and raise adorable pets!",
  "Brookhaven — live your dream life in a huge city!",
  "Tower of Hell — climb insane obstacle towers with no checkpoints!",
  "Blox Fruits — eat devil fruits and battle on the seas!",
  "Murder Mystery 2 — find the killer before it's too late!",
  "Pet Simulator X — collect and trade legendary pets!",
  "Bee Swarm Simulator — grow your bee army and make honey!",
  "Arsenal — fast-paced FPS action with tons of weapons!",
  "Natural Disaster Survival — survive earthquakes, floods, and more!",
  "Theme Park Tycoon 2 — build the ultimate amusement park!",
  "Jailbreak — escape prison or chase criminals as a cop!",
  "MeepCity — hang out, fish, and decorate your estate!",
  "Royale High — attend a magical school and dress up fancy!",
  "Piggy — escape creepy maps before Piggy catches you!",
  "Work at a Pizza Place — run a pizza restaurant with friends!",
  "Shindo Life — become a powerful ninja warrior!",
  "King Legacy — sail the seas and find powerful fruits!",
  "Build A Boat For Treasure — craft a boat and sail to riches!",
  "Doors — explore a terrifying hotel full of monsters!",
  "The Strongest Battlegrounds — epic anime-style fighting!"
];

const robloxBuildPrompts = [
  "Build a floating island with a lava waterfall!",
  "Create an underwater city for mermaids and sharks!",
  "Design a roller coaster that goes through a volcano!",
  "Build a space station shaped like a giant donut!",
  "Make a haunted castle with secret passages!",
  "Create a rainbow bridge connecting two mountains!",
  "Build a treehouse village in a mega jungle!",
  "Design a go-kart track on the moon!"
];

const robloxDeviceFacts = [
  "Roblox works on iOS, Android, PC, Mac, Xbox, PlayStation, and Meta Quest VR!",
  "You can play with friends across ANY device — phone vs. console vs. PC!",
  "Roblox on Meta Quest lets you step INSIDE your favorite games in VR!",
  "The Samsung Galaxy Store has its own Roblox version!",
  "Roblox on PlayStation launched with full cross-play support!",
  "You can play Roblox on Amazon Fire tablets too!"
];

let robloxPower = 0;
const robloxPowerBar = document.getElementById("roblox-power");
const robloxPowerText = document.getElementById("roblox-power-text");

function bumpRobloxPower(amount) {
  robloxPower = Math.min(100, robloxPower + amount);
  if (robloxPowerBar) robloxPowerBar.style.width = `${robloxPower}%`;
  if (robloxPowerText) robloxPowerText.textContent = `${robloxPower}%`;
  if (robloxPower >= 100) {
    burstConfetti(window.innerWidth / 2, window.innerHeight * 0.4, 160);
    robloxPower = 10;
    setTimeout(() => {
      if (robloxPowerBar) robloxPowerBar.style.width = `${robloxPower}%`;
      if (robloxPowerText) robloxPowerText.textContent = `${robloxPower}%`;
    }, 1200);
  }
}

function rollRobloxPower() {
  // Weighted so big numbers are rare — needs ~4-8 presses to fill
  const r = Math.random();
  if (r < 0.43)      return Math.floor(Math.random() * 5) + 1;   // 1-5   (43%)
  if (r < 0.73)      return Math.floor(Math.random() * 8) + 6;   // 6-13  (30%)
  if (r < 0.88)      return Math.floor(Math.random() * 12) + 14; // 14-25 (15%)
  if (r < 0.95)      return Math.floor(Math.random() * 25) + 26; // 26-50 (7%)
  return Math.floor(Math.random() * 50) + 51;                    // 51-100 (5%)
}

let robloxCooldown = false;
const robloxBtns = document.querySelectorAll(".roblox-btn");

function startRobloxCooldown() {
  robloxCooldown = true;
  robloxBtns.forEach((b) => b.classList.add("on-cooldown"));
  setTimeout(() => {
    robloxCooldown = false;
    robloxBtns.forEach((b) => b.classList.remove("on-cooldown"));
  }, 1000);
}

const avatarGen = document.getElementById("avatar-gen");
const avatarResult = document.getElementById("avatar-result");
if (avatarGen) {
  avatarGen.addEventListener("click", () => {
    if (robloxCooldown || meterGlobalCooldown) return;
    startRobloxCooldown();
    const hat = pick(robloxAvatarParts.hats);
    const face = pick(robloxAvatarParts.faces);
    const outfit = pick(robloxAvatarParts.outfits);
    const acc = pick(robloxAvatarParts.accessories);
    avatarResult.textContent = `${hat} + ${face} + ${outfit} + ${acc}`;
    burstConfettiAtElement(avatarGen, 44);
    bumpRobloxPower(rollRobloxPower());
    updateMeter(6);
  });
}

const expGen = document.getElementById("exp-gen");
const expResult = document.getElementById("exp-result");
if (expGen) {
  expGen.addEventListener("click", () => {
    if (robloxCooldown || meterGlobalCooldown) return;
    startRobloxCooldown();
    expResult.textContent = pick(robloxExperiences);
    burstConfettiAtElement(expGen, 38);
    bumpRobloxPower(rollRobloxPower());
    updateMeter(6);
  });
}

const buildGen = document.getElementById("build-gen");
const buildResult = document.getElementById("build-result");
if (buildGen) {
  buildGen.addEventListener("click", () => {
    if (robloxCooldown || meterGlobalCooldown) return;
    startRobloxCooldown();
    buildResult.textContent = pick(robloxBuildPrompts);
    burstConfettiAtElement(buildGen, 36);
    bumpRobloxPower(rollRobloxPower());
    updateMeter(7);
  });
}

const deviceFact = document.getElementById("device-fact");
const deviceResult = document.getElementById("device-result");
if (deviceFact) {
  deviceFact.addEventListener("click", () => {
    if (robloxCooldown || meterGlobalCooldown) return;
    startRobloxCooldown();
    deviceResult.textContent = pick(robloxDeviceFacts);
    burstConfettiAtElement(deviceFact, 32);
    bumpRobloxPower(rollRobloxPower());
    updateMeter(5);
  });
}

const starCanvas = document.getElementById("star-canvas");
const starCtx = starCanvas.getContext("2d");
let stars = [];
let starOffsetX = 0;
let starOffsetY = 0;
let starTargetX = 0;
let starTargetY = 0;

function initStars() {
  const hero = starCanvas.parentElement;
  starCanvas.width = hero.offsetWidth;
  starCanvas.height = hero.offsetHeight;
  stars = [];
  const count = Math.round((starCanvas.width * starCanvas.height) / 1800);
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * starCanvas.width,
      y: Math.random() * starCanvas.height,
      r: Math.random() * 1.6 + 0.4,
      baseAlpha: Math.random() * 0.5 + 0.5,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 1.2 + 0.4
    });
  }
}

function drawStars(time) {
  starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
  starOffsetX += (starTargetX - starOffsetX) * 0.06;
  starOffsetY += (starTargetY - starOffsetY) * 0.06;
  for (const s of stars) {
    const flicker = Math.sin(time * 0.001 * s.speed + s.phase) * 0.35 + 0.65;
    const alpha = s.baseAlpha * flicker;
    const sx = ((s.x + starOffsetX) % starCanvas.width + starCanvas.width) % starCanvas.width;
    const sy = ((s.y + starOffsetY) % starCanvas.height + starCanvas.height) % starCanvas.height;
    starCtx.beginPath();
    starCtx.arc(sx, sy, s.r, 0, Math.PI * 2);
    starCtx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    starCtx.fill();
    if (s.r > 1.2) {
      starCtx.beginPath();
      starCtx.arc(sx, sy, s.r * 2.5, 0, Math.PI * 2);
      starCtx.fillStyle = `rgba(200, 230, 255, ${alpha * 0.12})`;
      starCtx.fill();
    }
  }
  requestAnimationFrame(drawStars);
}

starCanvas.addEventListener("click", (e) => {
  const rect = starCanvas.getBoundingClientRect();
  const cx = rect.width / 2;
  const cy = rect.height / 2;
  const dx = (e.clientX - rect.left - cx) * 0.15;
  const dy = (e.clientY - rect.top - cy) * 0.15;
  starTargetX += dx;
  starTargetY += dy;
});

starCanvas.addEventListener("touchstart", (e) => {
  if (!e.touches.length) return;
  const rect = starCanvas.getBoundingClientRect();
  const cx = rect.width / 2;
  const cy = rect.height / 2;
  const dx = (e.touches[0].clientX - rect.left - cx) * 0.15;
  const dy = (e.touches[0].clientY - rect.top - cy) * 0.15;
  starTargetX += dx;
  starTargetY += dy;
}, { passive: true });

initStars();
requestAnimationFrame(drawStars);

window.addEventListener("resize", () => {
  resizeCanvas();
  initStars();
});

resizeCanvas();
animateConfetti();
setTheme("space");
startNoClickFun();
setupFlagQuiz();
updateTimezoneWidget();
setInterval(updateTimezoneWidget, 1000);
burstConfetti(window.innerWidth * 0.5, 120, 85);

setTimeout(() => {
  if (!underseaPanel) {
    return;
  }

  underseaPanel.classList.add("spotlight");
  const rect = underseaPanel.getBoundingClientRect();
  burstConfetti(rect.left + rect.width / 2, Math.max(140, rect.top + 120), 70);
  setTimeout(() => {
    underseaPanel.classList.remove("spotlight");
  }, 2600);
}, 900);
