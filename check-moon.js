const Astro = require('astronomy-engine');
const keys = Object.keys(Astro).filter(k => k.includes('Moon'));
console.log('Moon Keys:', keys);
