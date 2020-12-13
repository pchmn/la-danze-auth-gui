import React from 'react';
import { BrowserRouter, Redirect } from "react-router-dom";
import './App.scss';
import { withInitApp } from './core/initApp/withInitApp';
import { Auth } from './features/Auth/Auth';
import { AnimatedRoute, AnimatedSwitch } from './shared/animation/RouteTransition';


function AppComponent() {
  return (
    <BrowserRouter>
      <AnimatedSwitch>
        <AnimatedRoute path="/(signin|signup)" fullHeight={true}>
          <Auth />
        </AnimatedRoute>
        <AnimatedRoute exact path="/">
          <Redirect to="/signup/account-created" />
        </AnimatedRoute>
      </AnimatedSwitch>
    </BrowserRouter>
  );
}


export default withInitApp(AppComponent) as React.ElementType;