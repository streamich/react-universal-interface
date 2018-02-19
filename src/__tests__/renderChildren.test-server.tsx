import {createElement as h} from 'react';
import {renderToString} from 'react-dom/server';
import {expect} from 'chai';
import renderChildren from '../renderChildren';

const Parent = (props) => renderChildren(props, {foo: 'bar'});

describe('renderChildren() SSR', () => {
    it('exists and does not crash', () => {
        expect(typeof renderChildren).to.equal('function');
    });

    it('exists and does not crash', () => {
        const html = renderToString(
            <Parent>
                <div>foobar</div>
            </Parent>
        );

        expect(html).to.equal('<div data-reactroot="">foobar</div>');
    });
});
