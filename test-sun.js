const { SunPosition } = require('astronomy-engine');

try {
    const dob = new Date('2026-02-10T12:00:00Z');
    const pos = SunPosition(dob);
    console.log('Sun Position:', pos);
} catch (e) {
    console.error('Error:', e);
}
