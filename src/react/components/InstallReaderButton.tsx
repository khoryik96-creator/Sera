import { useEffect, useState } from 'react';
import { promptInstallReader, subscribeInstallAvailability } from '../../pwa';
import '../styles/parity-restoration.css';

export function InstallReaderButton() {
  const [available, setAvailable] = useState(false);

  useEffect(() => subscribeInstallAvailability(setAvailable), []);

  if (!available) return null;

  return (
    <button className="topbar__install" onClick={() => { void promptInstallReader(); }} type="button" aria-label="Install The Quiet Regular reader">
      <span aria-hidden="true">↓</span><strong>Install Reader</strong>
    </button>
  );
}
