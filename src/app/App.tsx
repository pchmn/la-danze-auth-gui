import React from 'react';
import { Redirect } from "react-router-dom";
import './App.scss';
import { withInitApp } from './core/initApp/withInitApp';
import { Auth } from './features/Auth/Auth';
import Home from './features/Home/Home';
import { AnimatedRoute, AnimatedSwitch } from './shared/animation/RouteTransition';


function AppComponent() {
  return (
    <AnimatedSwitch>
      <AnimatedRoute path="/(signin|signup)" fullHeight={true}>
        <Auth />
      </AnimatedRoute>
      <AnimatedRoute path="/my-account" fullHeight={true}>
        <Home />
      </AnimatedRoute>
      <AnimatedRoute exact path="/">
        <Redirect to="/my-account" />
      </AnimatedRoute>
    </AnimatedSwitch>
  );
}


export default withInitApp(AppComponent) as React.ElementType;