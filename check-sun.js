const Astro = require('astronomy-engine');
const keys = Object.keys(Astro).filter(k => k.includes('Sun'));
console.log('Sun Keys:', keys);
