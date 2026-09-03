import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('src/data.json', 'utf8'));
const registrySource = fs.readFileSync('src/characterRegistry.ts', 'utf8');

const parseQuoted = (value = '') => [...value.matchAll(/'([^']+)'/g)].map((m) => m[1]);
const registry = [];
const entryPattern = /\{\s*key:\s*'([^']+)',\s*displayName:\s*'([^']+)',\s*colorKey:\s*'([^']+)',\s*aliases:\s*\[([^\]]*)\](?:,\s*speakerKeys:\s*\[([^\]]*)\])?(?:,\s*currentRank:\s*'([^']+)')?\s*\}/g;
for (const match of registrySource.matchAll(entryPattern)) registry.push({ key: match[1], displayName: match[2], aliases: parseQuoted(match[4]), speakerKeys: parseQuoted(match[5] || '') });

const TARGETS = new Set(['Ren Qiao','Jae Miri','Mareth Duskvein','Garran Duskvein','Eira Eirholt','Tor Veyrhald','Brynja Kharvorn','Oskar Solvane','Astrid Vardrenn','Jorek Norrvek','Freya Ysmark','Kellan Haldren']);
const seasonEntries = Object.entries(data).filter(([key]) => /^season\d+$/.test(key));
function cleanText(value='') { return value.replace(/\[\[[^\]]+\]\]/g,' ').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim(); }

for (const entry of registry.filter((r) => TARGETS.has(r.displayName))) {
  console.log(`CONTEXT_BEGIN ${entry.displayName}`);
  let count = 0;
  for (const [key, episodes] of seasonEntries) {
    const season = Number(key.slice(6));
    for (const ep of episodes || []) {
      const raw = `${ep.title || ''} ${ep.text || ''}`;
      for (const alias of entry.aliases) {
        let at = raw.indexOf(alias);
        while (at >= 0 && count < 4) {
          const start = Math.max(0, at - 500), end = Math.min(raw.length, at + alias.length + 700);
          console.log(`S${season} ${ep.ep || ''} ${ep.title || ''} :: ${cleanText(raw.slice(start,end))}`);
          count++;
          at = raw.indexOf(alias, at + alias.length);
        }
      }
      if (count >= 4) break;
    }
    if (count >= 4) break;
  }
  console.log(`CONTEXT_END ${entry.displayName}`);
}
