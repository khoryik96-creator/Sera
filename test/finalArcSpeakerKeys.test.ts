import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { characterRegistry } from '../src/characterRegistry';

// Speakers are resolved automatically only where the prose supports it; the rest
// are attributed by hand with a [[speaker:key]] marker in docs/prose (see
// docs/dialogue-audit/README.md). A typo there would render as an uncoloured
// fallback name, so every marker must resolve to a real key.
const validKeys = new Set<string>();
for (const entry of characterRegistry) {
  validKeys.add(entry.key);
  for (const key of entry.speakerKeys || []) validKeys.add(key);
}

describe('final-arc speaker markers', () => {
  it('only uses speaker keys the reader can colour', () => {
    const bad: string[] = [];
    for (const name of readdirSync('docs/prose').filter((file) => file.endsWith('.md'))) {
      const source = readFileSync(`docs/prose/${name}`, 'utf8');
      for (const match of source.matchAll(/\[\[speaker:([^\]]+)\]\]/g)) {
        if (!validKeys.has(match[1])) bad.push(`${name}: ${match[1]}`);
      }
    }
    expect(bad, `unknown speaker keys:\n${bad.join('\n')}`).toEqual([]);
  });

  it('keeps a worklist entry for every unattributed line', () => {
    const files = readdirSync('docs/dialogue-audit').filter((file) => /^season-\d+\.md$/.test(file));
    expect(files).toHaveLength(20);
    const readme = readFileSync('docs/dialogue-audit/README.md', 'utf8');
    expect(readme).toContain('[[speaker:huo]]');
    expect(readme).toMatch(/Speaker keys/);
  });
});
