# Mobx loading state

Simple mobx extension for managing loading state of network requests. Helps managing loading state for same things multiple times

### Usage

```js
import { makeAutoObservable, runInAction } from "mobx";
import { LoadingState } from "mobx-loading-state";
import { observer } from "mobx-react";

class Store {
  loading = new LoadingState();

  requests = [];

  requests2 = [];

  constructor() {
    makeAutoObservable(this);
  }

  fetchFn = (title) => {
    this.loading.on();
    setTimeout(() => {
      runInAction(() => {
        this.requests = [...this.requests, title];
        this.loading.off();
      });
    }, Math.random() * 10 * 1000);
  };

  fetchFn2 = (title) => {
    this.loading.on("userData");
    setTimeout(() => {
      runInAction(() => {
        this.requests2 = [...this.requests2, title];
        this.loading.off("userData");
      });
    }, Math.random() * 10 * 1000);
  };
}

const store = new Store();

const App = () => {
  const fetchData = () => {
    const titles = ["req1", "req2", "req3", "req4"];
    titles.forEach((title) => store.fetchFn(title));
  };

  const fetchData2 = () => {
    const titles = ["data1", "data2", "data3", "data4"];
    titles.forEach((title) => store.fetchFn2(title));
  };

  return (
    <>
      {store.loading.is() && <p>Loading data 1...</p>}
      {store.loading.is("userData") && <p>Loading data 2...</p>}
      <button onClick={fetchData}>Start loading data 1</button>
      <button onClick={fetchData2}>Start loading data 2</button>
      {store.requests.map((req) => (
        <p key={req}>{req}</p>
      ))}
      {store.requests2.map((req) => (
        <p key={req}>{req}</p>
      ))}
    </>
  );
};

export default observer(App);

```

Try it on [CodeSandbox](https://codesandbox.io/s/mobx-loading-state-example-3chui?file=/src/App.js)