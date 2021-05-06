# Mobx loading state

Simple mobx extension for managing loading state of network requests. Helps managing loading state for same things multiple times

### Usage

```js
// store.js
import { makeAutoObservable } form 'mobx';

class Store {
  loading = new LoadingState();

  constructor() {
    makeAutoObservable(this)
  }
}

export default new Store()

// App.js
import React from 'react';
import store from './store';
import { observer } from 'mobx-react';

const fetchFn = async () => {
  try {
    store.loading.on();
    const res = await (await fetch('https://example.com')).json();
    return res;
  }
  catch(err) {
    console.error(err);
  }
  finally {
    store.loading.off();
  }
}

const App = () => {

  const fetchData = async () => {
    Promise.allSettled([fetchFn(), fetchFn()]);
  }

  return (
    <button onClick={fetchData}>Fetch Data</button>
    {store.loading.is() && <p>Loading...</p>}
  )
}

export default observer(App);
```