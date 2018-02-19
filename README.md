# react-universal-interface

[![][npm-badge]][npm-url] [![][travis-badge]][travis-url]

Given a `<MyData>` component, it is said to follow **universal component interface** if, and only if, it supports
all the below usage patterns:

```jsx
// FaCC
<MyData>{
    (data) => <Child {...data} />
}</MyData>

// Render prop
<MyData render={
    (data) => <Child {...data} />
} />

// Component prop
<MyData component={Child} />
<MyData comp={Child} />

// Prop injection
<MyData>
    <Child />
</MyData>

// Higher Order Component
const ChildWitData = withData(Child);

// Decorator
@withData
class ChildWithData extends {
    render () {
        return <Child {...this.props.data} />;
    }
}
```

This library allows you to create universal interface components using these two functions:

- `renderChildren(props, data)`
- `createEnhancer(Comp, propName)`

First, in your render method use `renderChildren`:

```js
class MyData extends Component {
    render () {
        return renderChildren(this.props, data);
    }
}
```

Second, create enhancer out of your component:

```js
const withData = createEnhancer(MyData, 'data');
```

Done!


## Installation

<pre>
npm i <a href="https://www.npmjs.com/package/react-universal-interface">react-universal-interface</a> --save
</pre>


## Usage

```js
import {renderChildren, createEnhancer} from 'react-universal-interface';
```


## License

[Unlicense](./LICENSE) &mdash; public domain.


[npm-url]: https://www.npmjs.com/package/react-universal-interface
[npm-badge]: https://img.shields.io/npm/v/react-universal-interface.svg
[travis-url]: https://travis-ci.org/streamich/react-universal-interface
[travis-badge]: https://travis-ci.org/streamich/react-universal-interface.svg?branch=master
