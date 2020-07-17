import Backbone from 'backbone';

// * ---------------- 状态仓库（Backbone）

type BoneState = {
  boneNum?: number;
  boneStr?: string;
};

class MyModel extends Backbone.Model<BoneState> {}

const boneModel = new MyModel();

// * ---------------- 业务部分（Backbone.on 监听）

console.log('backbone init:', boneModel.attributes);

boneModel.on('change', () => {
  console.log('backbone updated:', boneModel.attributes);
});

boneModel.set({ boneNum: 666 });
boneModel.set({ boneStr: 'Hello' });
boneModel.set({ boneStr: 'Backbone' });
