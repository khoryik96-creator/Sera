declare module 'https://esm.sh/react@19.0.0' {
  export type ReactNode = unknown;
  export interface Context<T> { Provider: any }
  export type SetStateAction<S> = S | ((previous: S) => S);
  export type Dispatch<A> = (value: A) => void;
  export function createContext<T>(defaultValue: T): Context<T>;
  export function useContext<T>(context: Context<T>): T;
  export function useState<S>(initial: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
  export function useEffect(effect: () => void | (() => void), deps?: readonly unknown[]): void;
  export function useMemo<T>(factory: () => T, deps: readonly unknown[]): T;
  export function useRef<T>(initial: T): { current: T };
  const React: {
    createElement: (...args: any[]) => any;
    Fragment: any;
  };
  export default React;
}

declare module 'https://esm.sh/react-dom@19.0.0/client' {
  export function createRoot(node: Element): { render(node: unknown): void };
}

declare namespace JSX {
  interface IntrinsicElements {
    [elementName: string]: any;
  }
}
