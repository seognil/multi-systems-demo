import Handlebars from 'handlebars';
import { MyBoneModel } from './my-model';
import Backbone from 'backbone';

const imgTemp = Handlebars.compile(`<p><img data-id={{id}} src="{{src}}"/></p>`);
const textTemp = Handlebars.compile(`<p data-id={{id}}>{{content}}</p>`);

const headingTemp = Handlebars.compile(`
  <h1>{{title}}</h1>
  <div>
    <button class="addText">添加文字</button>
    <button class="addImg">添加图片</button>
    <button class="clearItems">清空</button>
  </div>
`);

export class MyBoneView extends Backbone.View<MyBoneModel> {
  model: MyBoneModel;

  initialize() {
    this.model = new MyBoneModel();
    this.listenTo(this.model, 'change', this.render);
    this.render();
  }
  events() {
    return {
      'click .addImg': 'addImg',
      'click .addText': 'addText',
      'click .clearItems': 'clearItems',
    };
  }
  addImg() {
    this.model.addItem('img');
  }
  addText() {
    this.model.addItem('text');
  }
  clearItems() {
    this.model.clearAll();
  }
  delImg() {
    // @ts-ignore
    this.model.delItem(window.selectedItemId);
  }
  render() {
    const heading = headingTemp({ title: this.model.get('title') });
    const items = this.model.get('items').map((e) => (e.type === 'img' ? imgTemp(e) : textTemp(e)));
    const app = `
      ${heading}
      <div id="canvas">
        ${items.join('')}
      </canvas>
    `;
    this.$el.html(app);
    return this;
  }
}
