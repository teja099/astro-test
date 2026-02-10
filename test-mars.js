const { Body, GeoVector, Ecliptic } = require('astronomy-engine');

try {
    const dob = new Date('2026-02-10T12:00:00Z');
    // GeoVector(body, time, aberration)
    const vec = GeoVector(Body.Mars, dob, false);
    const eph = Ecliptic(vec);
    console.log('Mars Geocentric Ecliptic Longitude:', eph.elon);
} catch (e) {
    console.error('Error:', e);
}
