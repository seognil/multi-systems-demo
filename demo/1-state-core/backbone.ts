import Backbone from 'backbone';

// * ---------------- 状态仓库

type BoneState = {
  boneNum?: number;
  boneStr?: string;
};

class MyModel extends Backbone.Model<BoneState> {}

const model = new MyModel();

// * ---------------- 业务部分

(() => {
  console.log('backbone init:', model.attributes);

  model.on('change', () => {
    console.log('backbone updated:', model.attributes);
  });

  model.set('boneNum', 666);
  model.set('boneStr', 'Hello');
  model.set('boneStr', 'Backbone');
})();
