import { useCallback } from "react";

export const useUmami = () => {
  const track = useCallback(
    (eventName: string, eventData?: Record<string, unknown>) => {
      if (window.umami) {
        window.umami.track(eventName, eventData);
      } else {
        console.log("📊 [Umami Dev] Track:", eventName, eventData);
      }
    },
    []
  );

  return { track };
};
