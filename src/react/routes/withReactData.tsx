import type { ComponentType } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { ensureReactData } from '../../db';
import type { ReactDataFeature } from '../../db';

type LoadState = 'loading' | 'ready' | 'error';

export function withReactData<Props extends object>(Component: ComponentType<Props>, features: ReactDataFeature[]): ComponentType<Props> {
  function ReactDataRoute(props: Props) {
    const [state, setState] = useState<LoadState>(__SINGLEFILE__ ? 'ready' : 'loading');

    const load = useCallback(() => {
      if (__SINGLEFILE__) {
        setState('ready');
        return;
      }
      setState('loading');
      ensureReactData(...features).then(() => setState('ready')).catch(() => setState('error'));
    }, []);

    useEffect(() => {
      load();
    }, [load]);

    if (state === 'loading') return <div className="route-loading" role="status"><span className="status-dot" /><span>Loading section lore…</span></div>;
    if (state === 'error') return <div className="route-loading route-loading--error" role="alert"><span>Section lore failed to load.</span><button className="text-button" onClick={load} type="button">Retry</button></div>;
    return <Component {...props} />;
  }

  ReactDataRoute.displayName = `WithReactData(${Component.displayName || Component.name || 'Route'})`;
  return ReactDataRoute;
}
