import { motion, MotionProps } from 'framer-motion';
import React from 'react';

export interface MountTransitionProps extends MotionProps {
  fullHeight?: boolean;
  animationType?: 'scale' | 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight';
}

export function MountTransition({
  children,
  exit = 'out',
  initial = 'initial',
  animate = 'in',
  animationType = 'scale',
  variants,
  fullHeight,
  ...otherProps }: React.PropsWithChildren<MountTransitionProps>) {

  switch (animationType) {
    case 'scale': variants = scaleVariant; break;
    case 'fade': variants = baseVariant; break;
    case 'slideUp': variants = slideUpVariant; break;
    case 'slideDown': variants = slideDownVariant; break;
    case 'slideRight': variants = slideRightVariant; break;
    case 'slideLeft': variants = slideLeftVariant; break;
    default: variants = scaleVariant; break;
  }

  return (
    <motion.div
      exit={exit}
      initial={initial}
      animate={animate}
      variants={variants}
      transition={{ duration: 0.225 }}
      style={fullHeight ? { display: 'flex', flexDirection: 'column', flex: 1 } : {}}
      {...otherProps}
    >
      {children}
    </motion.div>
  )
}

const baseVariant = {
  initial: {
    opacity: 0,
  },

  in: {
    opacity: 1,
  },

  out: {
    opacity: 0,
  },
};

const scaleVariant = {
  initial: {
    ...baseVariant.initial,
    scale: 0.9,
  },

  in: {
    ...baseVariant.in,
    scale: 1,
  },

  out: {
    ...baseVariant.out,
    opacity: 0,
  },
};

const slideUpVariant = {
  initial: {
    ...scaleVariant.initial,
    y: '50%',
  },
  in: {
    ...scaleVariant.in,
    y: 0,
  },
  out: {
    ...scaleVariant.out,
    y: '-50%'
  },
};

const slideDownVariant = {
  initial: {
    ...scaleVariant.initial,
    y: '-50%',
  },
  in: {
    ...scaleVariant.in,
    y: 0,
  },
  out: {
    ...scaleVariant.out,
    y: '50%'
  },
};

const slideLeftVariant = {
  initial: {
    ...scaleVariant.initial,
    x: '-50%',
  },
  in: {
    ...scaleVariant.in,
    x: 0,
  },
  out: {
    ...scaleVariant.out,
    x: '50%'
  },
};

const slideRightVariant = {
  initial: {
    ...scaleVariant.initial,
    x: '50%',
  },
  in: {
    ...scaleVariant.in,
    x: 0,
  },
  out: {
    ...scaleVariant.out,
    x: '-50%'
  },
};
