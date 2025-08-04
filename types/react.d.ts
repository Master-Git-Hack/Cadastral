declare module 'react' {
  import React from 'react';
  export = React;
  export as namespace React;
  
  export function useState<T>(initialState: T): [T, (state: T) => void];
  export function useState<T = undefined>(): [T | undefined, (state: T) => void];
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  
  export type ReactNode = 
    | React.ReactElement
    | string 
    | number 
    | boolean 
    | null 
    | undefined 
    | ReactNode[];
    
  export interface ChangeEvent<T = Element> {
    target: EventTarget & T;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    
    interface Element extends React.ReactElement<any, any> { }
    
    interface ElementClass extends React.Component<any> {
      render(): React.ReactNode
    }
    
    interface ElementAttributesProperty { props: {}; }
    interface ElementChildrenAttribute { children: {}; }
    
    interface IntrinsicAttributes extends React.Attributes { }
    interface IntrinsicClassAttributes<T> extends React.ClassAttributes<T> { }
  }
}
