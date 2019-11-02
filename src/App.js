import React from 'react';

import {Switch, Route} from 'react-router';
import Layout from './containers/Layout/Layout';
import MainPage from './containers/MainPage/MainPage';
import Auth from './containers/Auth/Auth';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path='/' exact component={Auth}/>
          <Route path='/main' component={MainPage}/>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
