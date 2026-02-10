const { Body, EclipticLongitude, EclipticGeoMoon } = require('astronomy-engine');

try {
    const dob = new Date('2026-02-10T12:00:00Z');
    const lonMoon1 = EclipticLongitude(Body.Moon, dob);
    console.log('Moon Longitude (Generic):', lonMoon1);
} catch (e) {
    console.error('Moon Generic Error:', e.message);
}

try {
    const dob = new Date('2026-02-10T12:00:00Z');
    const lonMoon2 = EclipticGeoMoon(dob).elon;
    console.log('Moon Longitude (Spec):', lonMoon2);
} catch (e) {
    console.error('Moon Spec Error:', e.message);
}
