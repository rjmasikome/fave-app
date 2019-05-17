import React from 'react';
import { Route } from 'react-router-dom';
import Search from '../Search/Search';

class App extends React.Component {

  public render() {
    return(
      <div>
        <main>
          <Route exact path='/' component={Search} />
        </main>
      </div>
    );
  }
}

export default App;
