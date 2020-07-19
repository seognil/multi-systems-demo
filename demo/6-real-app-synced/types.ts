export type ImgData = {
  id: string;
  type: 'img';
  src: string;
};

export type TextData = {
  id: string;
  type: 'text';
  content: string;
};

export type ItemData = ImgData | TextData;
