declare module 'https://esm.sh/react@19.0.0' {
  export type ReactNode = unknown;
  export interface Context<T> { Provider: (props: { value: T; children?: unknown }) => unknown }
  export type SetStateAction<S> = S | ((previous: S) => S);
  export type Dispatch<A> = (value: A) => void;
  export function createContext<T>(defaultValue: T): Context<T>;
  export function useContext<T>(context: Context<T>): T;
  export function useState<S>(initial: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
  export function useEffect(effect: () => void | (() => void), deps?: readonly unknown[]): void;
  export function useMemo<T>(factory: () => T, deps: readonly unknown[]): T;
  export function useRef<T>(initial: T): { current: T };
  const React: {
    createElement: (...args: unknown[]) => unknown;
    Fragment: unknown;
  };
  export default React;
}

declare module 'https://esm.sh/react-dom@19.0.0/client' {
  export function createRoot(node: Element): { render(node: unknown): void };
}

declare namespace JSX {
  type Element = unknown;
  interface ElementChildrenAttribute { children: unknown }
  interface IntrinsicAttributes { key?: string | number }
  interface IntrinsicElements {
    [elementName: string]: Record<string, unknown>;
  }
}
