const { Body, EclipticLongitude } = require('astronomy-engine');

try {
    const dob = new Date('2026-02-10T12:00:00Z');
    const lon = EclipticLongitude(Body.Sun, dob);
    console.log('Sun Longitude:', lon);
} catch (e) {
    console.error('Full Error:', e);
}
