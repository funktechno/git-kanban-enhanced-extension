// import { DOMWindow } from 'jsdom';

export interface Global extends NodeJS.Global {
  browser?: any;
  // window: DOMWindow,
  document: Document;
  navigator: {
    userAgent: string;
  };
}

export const globalNode: Global = {
  ...global,
};

export interface VariablesI {
  repositoryDisplay: string;
  displayId: string;
}
