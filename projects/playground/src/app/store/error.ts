export class DoveError extends Error {
  constructor(name: DoveErrorMessage, args?: any) {
    super(parseDoveErrorMessage(name, args));
  }
}

export function parseDoveErrorMessage(name: DoveErrorMessage, args?: any) {
  switch (name) {
    case ('REDUCER_MISSING_SEGMENT'):
      return `Segment "${args.segment}" can't be found on State, but ${args.reducer} tries to call it.`;
    break;
  }
}

export type DoveErrorMessage =
'ACTION_MISSING_NAME' |
'REDUCER_MISSING_SEGMENT' |
'SELECTOR_MISSING_NAME' |
'SELECTOR_MISSING_FACTORY';

