import Backbone from 'backbone';
import Handlebars from 'handlebars';
import { MyModel, BoneState } from './backbone-model';

export class MyView extends Backbone.View<MyModel> {
  model: MyModel;

  static template = Handlebars.compile(`
    <div>boneNum: {{boneNum}}</div>
    <div>boneStr: {{boneStr}}</div>
  `);

  initialize() {
    this.model = new MyModel();
    this.listenTo(this.model, 'change', this.render);
    this.render();
  }
  render() {
    this.$el.html(MyView.template(this.model.attributes));
    return this;
  }
  change(payload: BoneState) {
    this.model.set(payload);
  }
}
