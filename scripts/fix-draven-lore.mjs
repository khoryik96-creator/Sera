import fs from 'node:fs';

const path = 'src/data.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));
const figure = data.arcFigures.find((entry) => /Draven Sol/.test(entry.name || ''));
if (!figure) throw new Error('Draven Sol arc figure not found');
figure.strength = 'Crown III combatant — exact cultivation not formally rated';
// Avoid retaining a duplicate registry-key-only row if the generic patch added one.
data.arcFigures = data.arcFigures.filter((entry) => entry === figure || entry.key !== 'draven');
fs.writeFileSync(path, JSON.stringify(data));
console.log('Patched Draven Sol strength on the canonical arc figure.');
