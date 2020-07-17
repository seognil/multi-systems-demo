import { DumbStore } from './dumb-store';
import $ from 'jquery';

export const render = (el: string, store: DumbStore) => {
  const { manNum, manStr } = store.state;

  $(el).html(`
    <div>manNum: ${manNum}</div>
    <div>manStr: ${manStr}</div>
    <button class="plus">+</button>
    <button class="minus">-</button>
  `);

  $(el)
    .off('click', '.plus')
    .on('click', '.plus', () => {
      store.update({ manNum: store.state.manNum + 1 });
      render(el, store);
    });

  $(el)
    .off('click', '.minus')
    .on('click', '.minus', () => {
      store.update({ manNum: store.state.manNum - 1 });
      render(el, store);
    });
};
