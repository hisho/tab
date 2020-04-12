# DOMを操作してtabを作る練習

## インストール

### install
```zsh
$ npm ci
```
### watch
```zsh
$ npm run start
```


## HTML
```html
<div id="test">
  <div role="tablist">
    <div role="presentation">
      <button type="button" role="tab">タブのボタン1</button>
    </div>
    <div role="presentation">
      <button type="button" role="tab">タブのボタン2</button>
    </div>
    <div role="presentation">
      <button type="button" role="tab">タブのボタン2</button>
    </div>
  </div>
  <div>
    <div role="tabpanel">
      role属性と構造さえあっていれば動くのでタグは適当に変えてください<br>
      今回はクラスを発行していないのでcssは[aria-selected="false"]と[aria-hidden="true"]でopen,closeを判定してください<br>
      button要素だとエンターキーでclickイベントが走るので、なるべく使ってほしいです。
    </div>
    <div role="tabpanel">タブの内容2</div>
    <div role="tabpanel">タブの内容3</div>
  </div>
</div>
```

## Scss
```scss
[role="tabpanel"] {
  &[aria-hidden="true"] {
    display: none;
  }
  &[aria-hidden="false"] {
    display: block;
  }
}
```

## Usage
```javascript
import Tab from 'tab';
new Tab('test');
```

## Options
- `id`(string):発行するID***(default: \`${tabContainerName}-tab\`)***
- `firstShowIndex`(number):最初に見せるタブの番号***(default: 0)***