import { useCallback, useState } from "react";

type Optional<T> = T | undefined;

/**
 * Returns a stateful value that's persisted to localStorage and a function to update it
 */
export function useLocalStorageState<T>(
  key: string,
  initialValue: T
): [T, (newState: T | ((prevState: T) => T)) => void];

/**
 * An overload function for when the second argument is provided
 */
export function useLocalStorageState<T = undefined>(
  key: string
): [
  Optional<T>,
  (newState: Optional<T> | ((prevState: Optional<T>) => Optional<T>)) => void
];

/**
 *
 * Implementation of useLocalStorageState function
 *
 * @param key localStorage key
 * @param initialValue initial value for state
 * @returns a stateful value that's persisted to localStorage and a function to update it.
 */
export function useLocalStorageState<T = undefined>(
  key: string,
  initialValue?: T
): [
  Optional<T>,
  (newState: Optional<T> | ((prevState: Optional<T>) => Optional<T>)) => void
] {
  const valueFromLocalStorage = localStorage.getItem(key);
  const [state, setState] = useState<T | undefined>(() =>
    valueFromLocalStorage
      ? (JSON.parse(valueFromLocalStorage) as T)
      : initialValue
  );

  const _setState = useCallback(
    (
      newState: T | undefined | ((prevState: T | undefined) => T | undefined)
    ) => {
      /**
       * If parameter type is a function we provide the previous state as an argument to callback function.
       */
      if (typeof newState === "function" && newState instanceof Function) {
        setState((prev) => {
          const value = newState(prev);

          localStorage.setItem(key, JSON.stringify(value));
          return value;
        });
        return;
      }

      /**
       * Otherwise just set the value provided into the local state and persist it to localStorage.
       */
      setState(newState);

      localStorage.setItem(key, JSON.stringify(newState));
    },
    [setState, key]
  );

  return [state, _setState];
}
