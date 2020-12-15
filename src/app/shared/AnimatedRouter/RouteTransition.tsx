import { AnimatePresence } from "framer-motion";
import React from "react";
import { Route, RouteProps, Switch, SwitchProps, useLocation } from "react-router-dom";
import { MountTransition, MountTransitionProps } from "./MountTransition";

interface AnimatedRouteProps extends RouteProps, MountTransitionProps {
}

export function AnimatedRoute({
  children,
  exit,
  initial,
  animate,
  animationType,
  variants,
  fullHeight,
  ...otherProps }: AnimatedRouteProps) {
  return (
    <Route {...otherProps}>
      <MountTransition exit={exit} initial={initial} animate={animate} animationType={animationType} variants={variants} fullHeight={fullHeight}>
        {children}
      </MountTransition>
    </Route>
  );
}

interface AnimatedSwitchProps extends SwitchProps, MountTransitionProps {
  switchKey?: string | number;
}

export function AnimatedSwitch({
  children,
  location,
  switchKey,
  exit,
  initial,
  animate,
  animationType,
  variants,
  fullHeight,
  ...otherProps }: AnimatedSwitchProps) {
  const originalLocation = useLocation();

  function childrenWithProps() {
    return React.Children.map(children, child => {
      // checking isValidElement is the safe way and avoids a typescript error too
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          exit: child.props.exit || exit,
          initial: child.props.initial || initial,
          animate: child.props.animate || animate,
          animationType: child.props.animationType || animationType,
          variants: child.props.variants || variants,
          fullHeight: child.props.fullHeight || fullHeight
        });
      }
      return child;
    });
  }

  return (
    <AnimatePresence exitBeforeEnter>
      <Switch location={location ? location : originalLocation} key={switchKey || originalLocation.pathname} {...otherProps}>
        {childrenWithProps()}
      </Switch>
    </AnimatePresence>
  );
}