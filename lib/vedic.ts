import { Body, GeoVector, Ecliptic, SunPosition } from 'astronomy-engine';

export type PlanetPosition = {
    name: string;
    longitude: number; // Sidereal longitude
    rashi: number;     // 0-11
    house: number;     // 1-12
    nakshatra: string;
};

const RASHI_NAMES = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const SANSKRIT_RASHI_NAMES = [
    'Mesha', 'Vrishabha', 'Mithuna', 'Karka', 'Simha', 'Kanya',
    'Tula', 'Vrischika', 'Dhanu', 'Makara', 'Kumbha', 'Meena'
];


export type NakshatraInfo = {
    name: string;
    vibe: string;
    animal: string;
    ruler: string;
};

const NAKSHATRA_DATA: Record<string, Omit<NakshatraInfo, 'name'>> = {
    'Ashwini': { vibe: 'Speed, healing, and "Main Character" energy.', animal: 'Horse 🐎', ruler: 'Ketu' },
    'Bharani': { vibe: 'Deep transformation. You are giving "Phoenix rising" vibes.', animal: 'Elephant 🐘', ruler: 'Venus' },
    'Krittika': { vibe: 'Sharp, protective, and absolutely "Fire".', animal: 'Sheep 🐑', ruler: 'Sun' },
    'Rohini': { vibe: 'Pure aesthetic, magnetic, and the ultimate "It Girl/Boy".', animal: 'Serpent 🐍', ruler: 'Moon' },
    'Mrigashira': { vibe: 'Curiosity, searching, and "Gentle Soul" energy.', animal: 'Serpent 🐍', ruler: 'Mars' },
    'Ardra': { vibe: 'Emotional depth, intensity, and "Storm Chaser" vibes.', animal: 'Dog 🐕', ruler: 'Rahu' },
    'Punarvasu': { vibe: 'The "Comeback King/Queen". Renewed hope.', animal: 'Cat 🐈', ruler: 'Jupiter' },
    'Pushya': { vibe: 'Nurturing, stable, and "The Caretaker" energy.', animal: 'Sheep 🐑', ruler: 'Saturn' },
    'Ashlesha': { vibe: 'Deeply intuitive, hypnotic, and "Mystery" vibes.', animal: 'Cat 🐈', ruler: 'Mercury' },
    'Magha': { vibe: 'Royal legacy, authority, and "CEO energy".', animal: 'Rat 🐀', ruler: 'Ketu' },
    'Purva Phalguni': { vibe: 'Luxury, relaxation, and "Quiet Luxury" vibes.', animal: 'Rat 🐀', ruler: 'Venus' },
    'Uttara Phalguni': { vibe: 'Philanthropy, kindness, and "Community Leader" energy.', animal: 'Cow 🐄', ruler: 'Sun' },
    'Hasta': { vibe: 'Skills, magic, and "Craftsman" energy.', animal: 'Buffalo 🐃', ruler: 'Moon' },
    'Chitra': { vibe: 'Brilliance, architecture, and "Creative Genius" vibes.', animal: 'Tiger 🐅', ruler: 'Mars' },
    'Swati': { vibe: 'Independence, balance, and "Solo Traveler" energy.', animal: 'Buffalo 🐃', ruler: 'Rahu' },
    'Vishakha': { vibe: 'Determination, target-focused, and "Goal Getter" vibes.', animal: 'Tiger 🐅', ruler: 'Jupiter' },
    'Anuradha': { vibe: 'Friendship, devotion, and "Loyal Bestie" energy.', animal: 'Deer 🦌', ruler: 'Saturn' },
    'Jyeshtha': { vibe: 'Eldership, secret power, and "Final Boss" vibes.', animal: 'Deer 🦌', ruler: 'Mercury' },
    'Mula': { vibe: 'Root-finding, radical honesty, and "Truth Seeker" energy.', animal: 'Dog 🐕', ruler: 'Ketu' },
    'Purva Ashadha': { vibe: 'Invincible, fluid, and "Main Character Energy".', animal: 'Monkey 🐒', ruler: 'Venus' },
    'Uttara Ashadha': { vibe: 'Ultimate victory, patience, and "Zen Master" vibes.', animal: 'Mongoose 🦦', ruler: 'Sun' },
    'Shravana': { vibe: 'Listening, wisdom, and "Main Story Quest" energy.', animal: 'Monkey 🐒', ruler: 'Moon' },
    'Dhanishta': { vibe: 'Rythym, wealth, and "Star Performer" vibes.', animal: 'Lion 🦁', ruler: 'Mars' },
    'Shatabhisha': { vibe: 'Healing, cosmic connection, and "Infinite" vibes.', animal: 'Horse 🐎', ruler: 'Rahu' },
    'Purva Bhadrapada': { vibe: 'Passionate, dual-natured, and "Intensity" energy.', animal: 'Lion 🦁', ruler: 'Jupiter' },
    'Uttara Bhadrapada': { vibe: 'Dream-worker, deep peace, and "Ethereal" vibes.', animal: 'Cow 🐄', ruler: 'Saturn' },
    'Revati': { vibe: 'Traveling, protection, and "Celestial Guide" energy.', animal: 'Elephant 🐘', ruler: 'Mercury' }
};

export function getAyanamsa(date: Date): number {
    const year = date.getUTCFullYear();
    const dayOfYear = Math.floor((date.getTime() - new Date(year, 0, 0).getTime()) / 86400000);
    const fracYear = year + dayOfYear / 365.25;
    return 23.25 + (fracYear - 1950) * (50.27 / 3600);
}

export type LifePathInfo = {
    number: number;
    title: string;
    vibe: string;
};

const LIFE_PATH_DATA: Record<number, Omit<LifePathInfo, 'number'>> = {
    1: { title: 'The Architect', vibe: 'Natural leader, ambitious, and focused on self-actualization. You create your own lane.' },
    2: { title: 'The Intuitive', vibe: 'Empathetic, diplomatic, and highly sensitive to energies. You are the ultimate balancer.' },
    3: { title: 'The Creator', vibe: 'Expressive, artistic, and the "Social Glue". Your voice is your power.' },
    4: { title: 'The Foundation', vibe: 'Structured, reliable, and deeply grounded. You build things that last.' },
    5: { title: 'The Alchemist', vibe: 'Adventure seeker, lover of freedom, and highly adaptable. Change is your oxygen.' },
    6: { title: 'The Guardian', vibe: 'Nurturing, responsible, and a natural healer. You create "home" wherever you go.' },
    7: { title: 'The Sage', vibe: 'Analytical, spiritual, and a seeker of truth. You see what others miss.' },
    8: { title: 'The Powerhouse', vibe: 'Manifestation master, business-minded, and authority. You are here to build empires.' },
    9: { title: 'The Old Soul', vibe: 'Compassionate, global-thinking, and wise beyond years. You are the ultimate humanitarian.' }
};

export function getLifePath(dob: string): LifePathInfo {
    // dob format: YYYY-MM-DD
    const digits = dob.replace(/-/g, '').split('').map(Number);
    let sum = digits.reduce((a, b) => a + b, 0);

    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
        sum = sum.toString().split('').map(Number).reduce((a, b) => a + b, 0);
    }

    // Treat master numbers as single digits for the vibes or keep them unique
    const finalNum = sum > 9 ? sum % 9 || 9 : sum;

    return {
        number: sum,
        ...LIFE_PATH_DATA[finalNum as number]
    };
}

export type LifestyleInfo = {
    color: string;
    colorHex: string;
    aesthetic: string;
    accessory: string;
    ritual: string;
};

const DAY_LIFESTYLE: Record<number, LifestyleInfo> = {
    0: { color: 'Ruby Red / Orange', colorHex: '#e11d48', aesthetic: 'Bold & Radiant', accessory: 'Gold watch or ring', ritual: 'Early morning sunlight exposure' }, // Sunday
    1: { color: 'Cream / Pearl White', colorHex: '#f8fafc', aesthetic: 'Fluid & Minimal', accessory: 'Silver or Moonstone', ritual: 'Moonlit walk or journaling' }, // Monday
    2: { color: 'Coral / Flame Red', colorHex: '#f43f5e', aesthetic: 'Athletic & Sharp', accessory: 'Red thread or Garnet', ritual: 'High-intensity workout' }, // Tuesday
    3: { color: 'Emerald / Mint Green', colorHex: '#10b981', aesthetic: 'Smart & Versatile', accessory: 'Green Jade or Pen', ritual: 'Reading or networking' }, // Wednesday
    4: { color: 'Gold / Saffron', colorHex: '#eab308', aesthetic: 'Regal & Conscious', accessory: 'Yellow Topaz or Book', ritual: 'Learning something new' }, // Thursday
    5: { color: 'Pink / Pastel Blue', colorHex: '#f472b6', aesthetic: 'Soft & Luxurious', accessory: 'Diamonds or Perfume', ritual: 'Self-care or art' }, // Friday
    6: { color: 'Black / Navy Blue', colorHex: '#1e1b4b', aesthetic: 'Statement & Edgy', accessory: 'Blue Sapphire or Iron', ritual: 'Deep cleaning or organizing' } // Saturday
};

export function getDailyLifestyle(): LifestyleInfo {
    const day = new Date().getDay();
    return DAY_LIFESTYLE[day];
}

export function calculateKundali(dob: Date, lat: number, lon: number, dobString?: string) {
    const ayanamsa = getAyanamsa(dob);
    // ... items as before
    const bodies = [
        { id: Body.Sun, name: 'Sun' },
        { id: Body.Moon, name: 'Moon' },
        { id: Body.Mars, name: 'Mars' },
        { id: Body.Mercury, name: 'Mercury' },
        { id: Body.Jupiter, name: 'Jupiter' },
        { id: Body.Venus, name: 'Venus' },
        { id: Body.Saturn, name: 'Saturn' }
    ];

    const positions: PlanetPosition[] = bodies.map(body => {
        let tropicalLong = 0;
        if (body.id === Body.Sun) {
            tropicalLong = SunPosition(dob).elon;
        } else {
            const vec = GeoVector(body.id, dob, true);
            tropicalLong = Ecliptic(vec).elon;
        }
        const siderealLong = (tropicalLong - ayanamsa + 360) % 360;
        const rashiIdx = Math.floor(siderealLong / 30);
        return {
            name: body.name,
            longitude: siderealLong,
            rashi: rashiIdx,
            house: 0,
            nakshatra: getNakshatra(siderealLong)
        };
    });

    const hours = dob.getUTCHours() + dob.getUTCMinutes() / 60 + lon / 15;
    const lagnLong = (SunPosition(dob).elon + (hours - 12) * 15 + 180 - ayanamsa + 360) % 360;
    const lagnRashi = Math.floor(lagnLong / 30);

    positions.forEach(p => {
        p.house = ((p.rashi - lagnRashi + 12) % 12) + 1;
    });

    const moonPos = positions.find(p => p.name === 'Moon');
    const moonNakshatra = moonPos ? getNakshatraInfo(moonPos.longitude) : null;
    const lifePath = dobString ? getLifePath(dobString) : null;
    const lifestyle = getDailyLifestyle();

    return {
        ayanamsa,
        lagnRashi,
        lagnLong,
        positions,
        rashiNames: RASHI_NAMES,
        sanskritRashiNames: SANSKRIT_RASHI_NAMES,
        moonNakshatra,
        lifePath,
        lifestyle
    };
}




export function getNakshatraInfo(long: number): NakshatraInfo {
    const nakshatras = Object.keys(NAKSHATRA_DATA);
    const idx = Math.floor(long / (360 / 27)) % 27;
    const name = nakshatras[idx];
    return {
        name,
        ...NAKSHATRA_DATA[name]
    };
}

function getNakshatra(long: number): string {
    const nakshatras = Object.keys(NAKSHATRA_DATA);
    const idx = Math.floor(long / (360 / 27));
    return nakshatras[idx % 27];
}
