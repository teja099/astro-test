"use client";

import React from 'react';
import { PlanetPosition } from '@/lib/vedic';

interface KundaliChartProps {
    data: {
        lagnRashi: number;
        positions: PlanetPosition[];
    };
}

const KundaliChart: React.FC<KundaliChartProps> = ({ data }) => {
    const { lagnRashi, positions } = data;

    // House coordinates for text placement (relative 0-100)
    const housePoints = [
        { x: 50, y: 35, id: 1 },  // Top center
        { x: 25, y: 15, id: 2 },  // Top left corner
        { x: 15, y: 25, id: 3 },  // Left corner side
        { x: 35, y: 50, id: 4 },  // Left center
        { x: 15, y: 75, id: 5 },  // Bottom left side
        { x: 25, y: 85, id: 6 },  // Bottom left corner
        { x: 50, y: 65, id: 7 },  // Bottom center
        { x: 75, y: 85, id: 8 },  // Bottom right corner
        { x: 85, y: 75, id: 9 },  // Right side bottom
        { x: 65, y: 50, id: 10 }, // Right center
        { x: 85, y: 25, id: 11 }, // Right side top
        { x: 75, y: 15, id: 12 }, // Top right corner
    ];

    const getPlanetsInHouse = (houseNum: number) => {
        return positions.filter(p => p.house === houseNum);
    };

    const getRashiForHouse = (houseNum: number) => {
        return ((lagnRashi + houseNum - 1) % 12) + 1;
    };

    return (
        <div className="relative w-full aspect-square max-w-[400px] mx-auto p-4">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(110,89,255,0.2)]">
                {/* Background */}
                <rect x="2" y="2" width="96" height="96" fill="transparent" stroke="url(#goldGradient)" strokeWidth="0.5" rx="2" />

                {/* Lines */}
                <g stroke="url(#goldGradient)" strokeWidth="0.3" opacity="0.6">
                    {/* Diagonals */}
                    <line x1="2" y1="2" x2="98" y2="98" />
                    <line x1="98" y1="2" x2="2" y2="98" />

                    {/* Inscribed Diamond */}
                    <line x1="50" y1="2" x2="2" y2="50" />
                    <line x1="2" y1="50" x2="50" y2="98" />
                    <line x1="50" y1="98" x2="98" y2="50" />
                    <line x1="98" y1="50" x2="50" y2="2" />
                </g>

                {/* Gradients */}
                <defs>
                    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffd700" />
                        <stop offset="100%" stopColor="#b8860b" />
                    </linearGradient>
                </defs>

                {/* House Content */}
                {housePoints.map((point) => {
                    const planets = getPlanetsInHouse(point.id);
                    const rashi = getRashiForHouse(point.id);

                    return (
                        <g key={point.id}>
                            {/* Rashi Number */}
                            <text
                                x={point.x}
                                y={point.y - 4}
                                fontSize="3"
                                fill="#ffd700"
                                textAnchor="middle"
                                className="font-bold opacity-80"
                            >
                                {rashi}
                            </text>

                            {/* Planets */}
                            <g transform={`translate(${point.x}, ${point.y + 2})`}>
                                {planets.map((p, i) => (
                                    <text
                                        key={p.name}
                                        y={i * 3.5}
                                        fontSize="3"
                                        fill="white"
                                        textAnchor="middle"
                                        className="font-sans antialiased"
                                    >
                                        {p.name.substring(0, 2)}
                                    </text>
                                ))}
                            </g>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};

export default KundaliChart;
