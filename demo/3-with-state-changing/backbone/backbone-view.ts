import Backbone from 'backbone';
import Handlebars from 'handlebars';
import { MyModel, BoneState } from './backbone-model';

export class MyView extends Backbone.View<MyModel> {
  model: MyModel;

  static template = Handlebars.compile(`
    <div>boneNum: {{boneNum}}</div>
    <div>boneStr: {{boneStr}}</div>
    <button class="plus">+</button>
    <button class="minus">-</button>
  `);

  initialize() {
    this.model = new MyModel();
    this.listenTo(this.model, 'change', this.render);
    this.render();
  }
  events() {
    return {
      'click .plus': 'plus',
      'click .minus': 'minus',
    };
  }
  plus() {
    this.model.set('boneNum', this.model.get('boneNum') + 1);
  }
  minus() {
    this.model.set('boneNum', this.model.get('boneNum') - 1);
  }
  render() {
    this.$el.html(MyView.template(this.model.attributes));
    return this;
  }
  change(payload: BoneState) {
    this.model.set(payload);
  }
}
