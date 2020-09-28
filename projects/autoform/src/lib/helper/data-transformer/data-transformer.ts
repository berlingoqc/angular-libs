/**
 * DataTransformerImpl interface pour fournir
 * une transformateur de donnée pour faire la conversion
 * entre les types
 */
export interface DataTransformerImpl<T, V> {
  transform: (t: T) => V;
  reconstruct: (v: V) => T;
}
