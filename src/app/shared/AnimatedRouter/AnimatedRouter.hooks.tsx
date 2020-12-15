import { useEffect, useState } from "react";

export function useAnimatedRouter() {
  const [switchKey, setSwitchKey] = useState<string | number>();

  useEffect(() => {
    setSwitchKey(Math.random());
  }, [])

  function updateSwitchKey() {
    setSwitchKey(Math.random());
  }

  return { switchKey, setSwitchKey, updateSwitchKey };
}
