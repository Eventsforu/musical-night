/* ============ EDIT THIS FILE ONLY ============ */
const SITE = {
  eventName: "Live Music Night",
  when: "Friday 04 December 2026 · from 6:30pm to 9:30pm",
  where: "Winchburgh Bowling Centre, Craigton Place, Winchburgh, EH52 6RW",
  about: "An evening of live music with great local artists. Time for Families to get togeter for little relaxation and fun.Live band by MusicVifs (Telugu, Tamil, Hindi) & Dance performance by Vbeatz creative.",
  contact: "Questions? Email raghava.bezwada@gmail.com",

  // Your Monzo.me link WITHOUT an amount, e.g. "https://monzo.me/musicnight"
  monzoBase: "https://monzo.me/yourname",

  // Where customers send their booking details after paying (so you know who to send the ticket to).
  // Email address, and/or WhatsApp number in international format with no + or spaces, e.g. "447700900123". Leave "" to hide.
  organiserEmail: "you@example.com",
  organiserWhatsApp: "",

  // Start of every booking reference, e.g. MN-F2-7K3Q
  refPrefix: "MN",

  // "code" is one letter used inside the reference (M = music only, F = food). Keep codes unique.
  tickets: [
    { code: "M", label: "Music only",   desc: "Entry to the live music show", price: 10, food: false },
    { code: "F", label: "Music + Food", desc: "Entry plus a meal",            price: 20, food: true  }
  ]
};
/* ============================================= */

const $ = id => document.getElementById(id);
const money = n => "£" + Number(n).toFixed(2);

/* Reference format: PREFIX-<ticket code><quantity>-<4 random characters>, e.g. MN-F2-7K3Q */
const REF_CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // no 0/O/1/I/L to avoid mix-ups
function makeRef(code, qty) {
  let r = "";
  const buf = new Uint32Array(4);
  (window.crypto || window.msCrypto).getRandomValues(buf);
  for (let i = 0; i < 4; i++) r += REF_CHARS[buf[i] % REF_CHARS.length];
  return SITE.refPrefix + "-" + code + qty + "-" + r;
}
function parseRef(text) {
  const m = String(text || "").toUpperCase().replace(/\s+/g, "")
    .match(new RegExp("^" + SITE.refPrefix + "-([A-Z])(\\d{1,2})-([A-Z0-9]{4})$"));
  if (!m) return null;
  const t = SITE.tickets.find(x => x.code === m[1]);
  if (!t) return null;
  return { ref: m[0], ticket: t, qty: parseInt(m[2], 10) };
}
