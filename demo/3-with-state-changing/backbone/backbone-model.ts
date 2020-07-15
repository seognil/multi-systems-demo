import Backbone from 'backbone';

// * ---------------- 状态仓库

export type BoneState = {
  boneNum?: number;
  boneStr?: string;
};

export class MyModel extends Backbone.Model<BoneState> {
  defaults(): BoneState {
    return {
      boneNum: 0,
      boneStr: '',
    };
  }
}
