import { AnimatePresence } from "framer-motion";
import React from "react";
import { Route, RouteProps, Switch, SwitchProps, useLocation } from "react-router-dom";
import { MountTransition } from "./MountTransition";

interface AnimatedRouteProps extends RouteProps {
  fullHeight?: boolean;
}

export function AnimatedRoute({ children, fullHeight, ...otherProps }: AnimatedRouteProps) {
  return (
    <Route {...otherProps}>
      <MountTransition fullHeight={fullHeight}>
        {children}
      </MountTransition>
    </Route>
  );
}

interface AnimatedSwitchProps extends SwitchProps {
  switchKey?: string | number;
}

export function AnimatedSwitch({ children, location, switchKey, ...otherProps }: AnimatedSwitchProps) {
  const originalLocation = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Switch location={location ? location : originalLocation} key={switchKey || originalLocation.pathname} {...otherProps}>
        {children}
      </Switch>
    </AnimatePresence>
  );
}