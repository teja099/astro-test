const Astro = require('astronomy-engine');
const keys = Object.keys(Astro).filter(k => k.includes('Ecliptic') || k.includes('Long'));
console.log('Matching Keys:', keys);
