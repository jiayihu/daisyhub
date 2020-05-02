import { Selector, useSelector } from 'react-redux';
import { useEffect, DependencyList } from 'react';

export function useSubscription<TState, TSelected>(
  params: { selector: Selector<TState, TSelected>; subscribe: () => void; unsubscribe: () => void },
  deps: DependencyList,
) {
  const { selector, subscribe, unsubscribe } = params;
  const selected = useSelector(selector);

  useEffect(() => {
    subscribe();

    return unsubscribe;
  }, deps);

  return selected;
}
