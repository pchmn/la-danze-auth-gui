import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import './App.scss';
import { withInitApp } from './core/initApp/withInitApp';
import { Auth } from './features/Auth/Auth';


function AppComponent() {
  return (
    <Switch>
      <Route path="/(signin|signup)" fullHeight={true}>
        <Auth />
      </Route>
      <Route exact path="/">
        <Redirect to="/signup/account-created" />
      </Route>
    </Switch>
  );
}


export default withInitApp(AppComponent) as React.ElementType;