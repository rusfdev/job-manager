export type Ok<T> = {
  readonly isOk: true;
  readonly value: T;
};

export type Err<E> = {
  readonly isOk: false;
  readonly error: E;
};

export type Result<T, E = never> = Ok<T> | Err<E>;

export function ok(): Ok<void>;
export function ok<T>(value: T): Ok<T>;
export function ok<T>(value?: T): Ok<T | void> {
  return { isOk: true, value };
}

export function err<E>(error: E): Err<E> {
  return { isOk: false, error };
}
