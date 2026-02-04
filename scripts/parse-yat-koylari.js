#!/usr/bin/env node
/**
 * Parse "Çanakkale'den Antalya'ya 238 Koy" text and output GeoJSON.
 * Coordinates are in DMS: DD MM SS N – DD MM SS E
 */

const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../docs/canakkale_antalyaya_238koy.txt');
const outputPath = path.join(__dirname, '../canakkale_antalyaya_238_koy.geojson');

function dmsToDecimal(d, m, s) {
  return Number(d) + Number(m) / 60 + Number(s) / 3600;
}

const text = fs.readFileSync(inputPath, 'utf8');

// Match: optional text, then lat_d lat_m lat_s N – lon_d lon_m lon_s E
// Coord pattern: 36 45 08 N – 27 28 40 E (allow optional space before N/E)
const coordRe = /(\d{1,2})\s+(\d{1,2})\s+(\d{1,2})\s*N\s*[–\-]\s*(\d{1,2})\s+(\d{1,2})\s+(\d{1,2})\s*E/g;

const features = [];
let match;
let lastEnd = 0;

while ((match = coordRe.exec(text)) !== null) {
  const latD = match[1], latM = match[2], latS = match[3];
  const lonD = match[4], lonM = match[5], lonS = match[6];
  const lat = dmsToDecimal(latD, latM, latS);
  const lon = dmsToDecimal(lonD, lonM, lonS);

  // Name: text between previous match end and start of this coord (same line preferred)
  const before = text.slice(lastEnd, match.index);
  const lines = before.split(/\n/);
  const lastLine = lines[lines.length - 1].trim();
  // Remove page markers and section headers
  const cleanLine = lastLine
    .replace(/\s*--\s*\d+\s+of\s+\d+\s*--\s*$/i, '')
    .replace(/\s*\d+\s*$/g, '') // trailing "17" etc
    .trim();
  // Everything before the coordinate numbers is "name area"; area is typically last word
  const namePart = cleanLine.replace(/\s*\d{1,2}\s+\d{1,2}\s+\d{1,2}\s*N.*$/, '').trim();
  const parts = namePart.split(/\s+/);
  const area = parts.length > 0 ? parts[parts.length - 1] : '';
  const koyAdi = parts.length > 1 ? parts.slice(0, -1).join(' ') : namePart;
  const tesisAdi = koyAdi || namePart;

  features.push({
    type: 'Feature',
    properties: {
      koy_adi: tesisAdi,
      bolge: area,
      tur: 'Yat Koyu',
      kaynak: "Çanakkale'den Antalya'ya 238 Koy"
    },
    geometry: {
      type: 'Point',
      coordinates: [lon, lat]
    }
  });

  lastEnd = match.index + match[0].length;
}

const geojson = {
  type: 'FeatureCollection',
  features
};

fs.writeFileSync(outputPath, JSON.stringify(geojson, null, 2), 'utf8');
console.log(`Wrote ${features.length} features to ${outputPath}`);
