import { ImgData, TextData } from '../types';

const fakeAsyncGenId = () =>
  new Promise<string>((res) => {
    const id = `${Date.now()}`;
    setTimeout(() => {
      res(id);
    }, 50);
  });

const randOf = (n: number) => ~~(Math.random() * n);
const randStr = (n: number) => Math.random().toString(36).slice(-n);

export const createEmptyImg = async (): Promise<ImgData> => {
  const id = await fakeAsyncGenId();
  const data: ImgData = {
    id,
    type: 'img',
    src: `http://placekitten.com/120/${80 + randOf(5)}`,
  };
  return data;
};

export const createEmptyText = async (): Promise<TextData> => {
  const id = await fakeAsyncGenId();
  const data: TextData = {
    id,
    type: 'text',
    content: `文本_${randStr(6)}`,
  };
  return data;
};
