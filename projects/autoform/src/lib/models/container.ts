// Container est un class abstract pour venir attacher des styles
// a des elements.
export interface ContainerData {
  style?: any;
  class?: string[];
}
export interface Container {
  container?: ContainerData;
}
