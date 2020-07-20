import { Subject, Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { mapObjIndexed } from 'ramda';

type MappedReceivers<T extends Object, D> = {
  [K in keyof T]: T[K] extends Subject<infer P> ? Observable<[P, D]> : never;
};

export const zipTriggersWithPass = <T, D>(
  triggers: T,
  pass$: Observable<D>,
): MappedReceivers<T, D> => {
  // * Just need the type notation, so ...
  // @ts-ignore
  return mapObjIndexed((v) => v.pipe(withLatestFrom(pass$)), triggers);
};
