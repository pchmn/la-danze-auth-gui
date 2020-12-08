import { motion } from 'framer-motion';
import React from 'react';

interface MountTransitionProps {
  fullHeight?: boolean
}

export function MountTransition({ children, fullHeight }: React.PropsWithChildren<MountTransitionProps>) {
  return (
    <motion.div
      exit={{ opacity: 0, scale: 1 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ height: fullHeight ? '100%' : 'auto' }}
    >
      {children}
    </motion.div>
  )
}