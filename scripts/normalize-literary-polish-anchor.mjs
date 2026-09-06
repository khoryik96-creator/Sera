import { readFile, writeFile } from 'node:fs/promises';
const path = 'docs/prose/FINAL_ARC_SEASON108_PROSE_DRAFT_2.md';
let text = (await readFile(path, 'utf8')).replace(/\r\n/g, '\n');
const oldText = `“How long?”\n\n---\n\n**End of Phase II.**\n\nChapter 441 begins with Lu’s answer:\n\n**“Six months.”**\n\nThen:\n\n**“Six months. And twelve days.”**`;
const normalized = `“How long?”\n\n---\n\n**End of Phase II.**\n\nChapter 441 begins with Lu’s answer:\n\n**“Six months. And twelve days.”**`;
const count = text.split(oldText).length - 1;
if (count !== 1) throw new Error(`Expected one Ch440 footer shape, found ${count}`);
await writeFile(path, text.replace(oldText, normalized));
