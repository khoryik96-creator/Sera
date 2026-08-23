// Portraits are auto-discovered from src/assets by filename, so adding images
// needs no code change — just drop files in following the convention:
//
//   <key>.jpg           main portrait for a character key   (e.g. kael.jpg)
//   <key>-extra-<n>.jpg gallery image, ordered by <n>       (e.g. sera-extra-1.jpg)
//
// A character with one or more `-extra-` images gets a scrollable gallery
// (main image first, then the extras in numeric order). `<key>` must match the
// character key used in the data (see DB.characters).
//
// Importing eagerly means the bundler still owns every file: hashed in the web
// build, inlined as data URIs in the single-file build.
const files = import.meta.glob<string>('./assets/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

const mainMap: Record<string, string> = {};
const extras: Record<string, { n: number; url: string }[]> = {};

for (const [path, url] of Object.entries(files)) {
  const base = path.substring(path.lastIndexOf('/') + 1).replace(/\.(jpe?g|png|webp)$/i, '');
  const m = base.match(/^(.+)-extra-(\d+)$/);
  if (m) {
    const key = m[1];
    (extras[key] ??= []).push({ n: Number(m[2]), url });
  } else {
    mainMap[base] = url;
  }
}

/** Main portrait per character key. */
export const characterImageMap: Record<string, string> = mainMap;

/** Gallery portraits per character key, in numeric order. Any character with
 *  entries here gets a scrollable portrait gallery (main image first). */
export const characterExtraImages: Record<string, string[]> = Object.fromEntries(
  Object.entries(extras).map(([key, list]) => [key, list.sort((a, b) => a.n - b.n).map((x) => x.url)]),
);
