export function decodedRouteHash(hash = window.location.hash): string {
  const raw = hash.replace(/^#\/?/, '');
  try {
    return decodeURIComponent(raw).trim();
  } catch {
    return '';
  }
}
