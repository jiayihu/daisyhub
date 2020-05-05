import { useEffect, useRef } from 'react';

export function useEventListener(
  element: EventTarget,
  eventName: string,
  handler: (event: Event) => void,
) {
  const savedHandler = useRef<typeof handler>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    element.addEventListener(eventName, handler);

    return () => {
      element.removeEventListener(eventName, handler);
    };
  }, [eventName, handler, element]);
}
