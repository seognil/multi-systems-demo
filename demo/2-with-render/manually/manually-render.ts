import $ from 'jquery';
import { store } from './manually-store';

export const render = (el: string) => {
  const { manNum, manStr } = store.state;

  $(el).html(`
    <div>manNum: ${manNum}</div>
    <div>manStr: ${manStr}</div>
  `);
};
