import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import './App.scss';
import { withInitApp } from './core/initApp/withInitApp';
import { Auth } from './features/Auth/Auth';
import Home from './features/Home/Home';
import { AnimatedRoute, AnimatedSwitch } from './shared/animation/RouteTransition';


function AppComponent() {
  const [key, setKey] = useState<string | number>();

  useEffect(() => {
    setKey(Math.random());
  }, [])

  return (
    <AnimatedSwitch switchKey={key}>
      <AnimatedRoute path="/(signin|signup)" fullHeight={true}>
        <Auth />
      </AnimatedRoute>
      <AnimatedRoute path="/(my-account|settings)" fullHeight={true}>
        <Home />
      </AnimatedRoute>
      <AnimatedRoute exact path="/">
        <Redirect to="/my-account" />
      </AnimatedRoute>
    </AnimatedSwitch>
  );
}


export default withInitApp(AppComponent) as React.ElementType;