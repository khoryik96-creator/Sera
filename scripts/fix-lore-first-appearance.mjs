import fs from 'node:fs';

const path = 'src/data.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));
let fixed = 0;
for (const figure of data.arcFigures || []) {
  if (!figure.firstSeason || !figure.firstEpisodeTitle) continue;
  const season = data[`season${figure.firstSeason}`] || [];
  const index = season.findIndex((episode) => episode.title === figure.firstEpisodeTitle);
  if (index < 0) throw new Error(`${figure.name}: firstEpisodeTitle not found in Season ${figure.firstSeason}: ${figure.firstEpisodeTitle}`);
  const expected = index + 1;
  if (figure.firstEpisode !== expected) {
    figure.firstEpisode = expected;
    fixed += 1;
  }
}
fs.writeFileSync(path, JSON.stringify(data));
console.log(`Normalized ${fixed} arc-figure first-appearance episode indices.`);
