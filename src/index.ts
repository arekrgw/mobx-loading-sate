import { createAtom } from "mobx";

export class LoadingState {
  private loadingMap = new Map<string, number>();
  private atom = createAtom("loadingState");
  private defaultKeyName: string;

  constructor(defaultKey?: string) {
    this.atom = createAtom("loadingState");
    this.defaultKeyName = defaultKey || "default";
    this.loadingMap.set(this.defaultKeyName, 0);
  }

  on = (key?: string) => {
    const loadingStateValue = this.loadingMap.get(key || this.defaultKeyName);

    this.loadingMap.set(
      key || this.defaultKeyName,
      loadingStateValue ? loadingStateValue + 1 : 1
    );
    this.atom.reportChanged();
  };

  is = (key?: string) => {
    this.atom.reportObserved();
    return !!this.loadingMap.get(key || this.defaultKeyName);
  };

  off = (key?: string) => {
    const loadingStateValue = this.loadingMap.get(key || this.defaultKeyName);

    this.loadingMap.set(
      key || this.defaultKeyName,
      loadingStateValue ? loadingStateValue - 1 : 0
    );
    this.atom.reportChanged();
  };

  reset = (key?: string) => {
    this.loadingMap.set(key || this.defaultKeyName, 0);
    this.atom.reportChanged();
  };
}
