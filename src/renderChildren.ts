import {createElement as h, cloneElement} from 'react';

const isFn = fn => typeof fn === 'function';

const renderChildren = (props, state) => {
    if (process.env.NODE_ENV !== 'production') {
        if (typeof props !== 'object') {
            throw new TypeError('renderProp(props, data) first argument must be a prop object.');
        }

        const {children, render} = props;

        if (isFn(children) && isFn(render)) {
            console.warn(
                'Both "render" and "children" are specified for a render-prop component. ' +
                'Children will be used.'
            );
            console.trace();
        }
    }

    const {render, children = render, component, comp = component} = props;

    if (isFn(children)) {
        return children(state);
    }

    if (comp) {
        if (process.env.NODE_ENV !== 'production') {
            if (!isFn(comp)) {
                throw new TypeError(
                    'Universal children definition expected "comp" or "component" prop ' +
                    `to be a React component type, received typeof "${typeof comp}".`
                );
            }
        }

        return comp(state);
    }

    if (children instanceof Array) {
        return h('div', null, ...children);
    }

    if (children && (children instanceof Object)) {
        if (process.env.NODE_ENV !== 'production') {
            if (typeof children['$$typeof'] !== 'function') {
                console.warn(
                    'Universal children definition received object as child, ' +
                    'expected React component, but could not find `$$typeof` attribute.'
                );
                console.trace();
            }

            return cloneElement(children, Object.assign({}, children.props, state));
        } else {
            Object.assign(children.props, state);

            return children;
        }
    }

    return children;
};

export default renderChildren;
