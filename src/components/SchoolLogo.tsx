import React from 'react';

interface SchoolLogoProps {
  className?: string;
  size?: number | string;
}

export default function SchoolLogo({ className = '', size = 64 }: SchoolLogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 400 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} filter drop-shadow-md`}
    >
      {/* 1. Base Pentagon Shield (Curved/Standard Indonesian Shield) */}
      <path 
        d="M200 20 L350 130 L310 320 L200 370 L90 320 L50 130 Z" 
        fill="#26A4E5" 
        stroke="#000000" 
        strokeWidth="6"
        strokeLinejoin="round"
      />
      
      {/* 2. Golden Wings (Sayap Emas Kiri & Kanan) */}
      {/* Left Wing */}
      <path 
        d="M170 230 C120 230, 80 180, 80 120 C90 150, 110 180, 140 190 C110 150, 100 120, 110 90 C125 120, 145 150, 170 170 C150 130, 150 100, 160 70 C170 100, 180 140, 185 180" 
        fill="#FFD700" 
        stroke="#000000" 
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Right Wing */}
      <path 
        d="M230 230 C280 230, 320 180, 320 120 C310 150, 290 180, 260 190 C290 150, 300 120, 290 90 C275 120, 255 150, 230 170 C250 130, 250 100, 240 70 C230 100, 220 140, 215 180" 
        fill="#FFD700" 
        stroke="#000000" 
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Small Circles on Wings (Biji Bulat Kuning/Putih) */}
      <circle cx="110" cy="235" r="10" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
      <circle cx="290" cy="235" r="10" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />

      {/* 3. Open Book (Buku Terbuka di bagian bawah) */}
      <path 
        d="M200 285 C170 260, 135 245, 120 280 C135 255, 175 270, 200 288 C225 270, 265 255, 280 280 C265 245, 230 260, 200 285 Z" 
        fill="#FFFFFF" 
        stroke="#000000" 
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Book details/lines */}
      <path d="M142 270 C160 263, 175 268, 192 277" stroke="#000000" strokeWidth="2.5" />
      <path d="M258 270 C240 263, 225 268, 208 277" stroke="#000000" strokeWidth="2.5" />
      
      {/* 4. Central Pillar/Tugu (Obor/Pena Tegak) */}
      <path 
        d="M195 160 L205 160 L203 275 L197 275 Z" 
        fill="#000000" 
        stroke="#000000" 
        strokeWidth="2" 
      />
      <rect x="190" y="215" width="20" height="15" rx="3" fill="#D32F2F" stroke="#000000" strokeWidth="3" />
      <rect x="194" y="221" width="12" height="3" fill="#FFFFFF" />

      {/* 5. Glowing Red Star at the peak (Bintang Merah Segi Lima) */}
      <polygon 
        points="200,60 214,95 248,95 220,115 231,148 200,128 169,148 180,115 152,95 186,95" 
        fill="#FF0000" 
        stroke="#000000" 
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* 6. Arc Ribbon with Text "ABIWARA WIDYANATA BHAKTI" */}
      <path 
        id="textPathCurve"
        d="M100 195 C145 140, 255 140, 300 195" 
        fill="none" 
      />
      <text fill="#FFFFFF" fontSize="16" fontWeight="bold" fontFamily="system-ui, sans-serif">
        <textPath href="#textPathCurve" startOffset="50%" textAnchor="middle">
          ABIWARA WIDYANATA BHAKTI
        </textPath>
      </text>

      {/* Ring bindings attaching the lower ribbon */}
      <rect x="145" y="300" width="16" height="30" rx="6" fill="#A0A0A0" stroke="#000000" strokeWidth="3" />
      <rect x="239" y="300" width="16" height="30" rx="6" fill="#A0A0A0" stroke="#000000" strokeWidth="3" />

      {/* 7. Bottom Ribbon (Pita Merah Putih "SDN 1 ASEMBAGUS") */}
      {/* Ribbon Left/Right Red Folds */}
      <path d="M15 315 L80 295 L80 338 L15 363 Z" fill="#D32F2F" stroke="#000000" strokeWidth="4" strokeLinejoin="round" />
      <path d="M385 315 L320 295 L320 338 L385 363 Z" fill="#D32F2F" stroke="#000000" strokeWidth="4" strokeLinejoin="round" />
      
      {/* Ribbon Triangle cuts */}
      <polygon points="15,315 35,339 15,363" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />
      <polygon points="385,315 365,339 385,363" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />

      {/* Central Wide Ribbon Body */}
      {/* Top Half Red */}
      <path 
        d="M80 325 L320 325 L325 348 L75 348 Z" 
        fill="#D32F2F" 
        stroke="#000000" 
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      {/* Bottom Half White */}
      <path 
        d="M75 348 L325 348 L320 373 L80 373 Z" 
        fill="#FFFFFF" 
        stroke="#000000" 
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      
      {/* Ribbon Main text label "SDN 1 ASEMBAGUS" scaled and perfectly aligned */}
      <rect x="85" y="331" width="230" height="35" rx="4" fill="#FFFFFF" stroke="#000000" strokeWidth="3.5" />
      <text 
        x="200" 
        y="356" 
        fill="#000000" 
        fontSize="22" 
        fontWeight="900" 
        fontFamily="sans-serif, system-ui"
        letterSpacing="0.8"
        textAnchor="middle"
      >
        SDN 1 ASEMBAGUS
      </text>
    </svg>
  );
}
