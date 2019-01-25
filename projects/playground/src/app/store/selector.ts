export interface Selector<State> {
  name: string;
  factory: (state: State) => any;
}
