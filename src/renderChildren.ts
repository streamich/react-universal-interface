import {createElement as h, cloneElement, version} from 'react';

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

        return h(comp, state);
    }

    if (children instanceof Array) {
        const isReact16 = version[1] === '6';

        return isReact16 ? children : h('div', null, ...children);
    }

    if (children && (children instanceof Object)) {
        if (process.env.NODE_ENV !== 'production') {
            if ((typeof children.type !== 'function') && (typeof children.type !== 'function')) {
                console.warn(
                    'Universal children definition received object as child, ' +
                    'expected React component, but could not find `type` attribute.'
                );
                console.trace();
            }

            if (typeof children.type === 'string') {
                return children;
            }

            return cloneElement(children, Object.assign({}, children.props, state));
        } else {
            if (typeof children.type === 'string') {
                return children;
            }

            Object.assign(children.props, state);

            return children;
        }
    }

    return children;
};

export default renderChildren;
