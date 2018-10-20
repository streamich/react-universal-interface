import * as React from 'react';
import render from '../render';
import createEnhancer from '../createEnhancer';
import {mount} from 'enzyme';

const Parent = (props) => render(props, {foo: 'bar' + (props.extra || '')});
const withParent = createEnhancer(Parent, 'parent');

@withParent
class Decorator1 extends React.Component<any, any> {
    render () {
        return <div>{this.props.parent.foo}</div>;
    }
}

@withParent('custom')
class Decorator2 extends React.Component<any, any> {
    render () {
        return <div>{this.props.custom.foo}</div>;
    }
}


@withParent('', {extra: '.extra'})
class Decorator3 extends React.Component<any, any> {
    render () {
        return <div>{this.props.parent.foo}</div>;
    }
}

describe('createEnhancer()', () => {
    it('exists', () => {
        expect(typeof createEnhancer).toBe('function');
    });

    describe('HOC', () => {
        it('injects default prop', () => {
            const MyComp: any = jest.fn();

            MyComp.mockImplementation(({parent}) => <div>{parent.foo}</div>);

            const MyCompEnhanced = withParent(MyComp);
            const wrapper = mount(<MyCompEnhanced />);

            expect(MyComp).toHaveBeenCalledTimes(1);
            expect(MyComp.mock.calls[0][0]).toEqual({
                parent: {
                    foo: 'bar'
                }
            });
            expect(wrapper.html()).toBe('<div>bar</div>');
        });

        it('can customize prop name', () => {
            const MyComp: any = jest.fn();

            MyComp.mockImplementation(({custom}) => <div>{custom.foo}</div>);

            const MyCompEnhanced = withParent(MyComp, 'custom');
            const wrapper = mount(<MyCompEnhanced />);

            expect(MyComp).toHaveBeenCalledTimes(1);
            expect(MyComp.mock.calls[0][0]).toEqual({
                custom: {
                    foo: 'bar'
                }
            });
            expect(wrapper.html()).toBe('<div>bar</div>');
        });

        it('can customize prop name', () => {
            const MyComp: any = jest.fn();

            MyComp.mockImplementation(({custom}) => <div>{custom.foo}</div>);

            const MyCompEnhanced = withParent(MyComp, 'custom', {extra: '.bit'});
            const wrapper = mount(<MyCompEnhanced />);

            expect(MyComp).toHaveBeenCalledTimes(1);
            expect(MyComp.mock.calls[0][0]).toEqual({
                custom: {
                    foo: 'bar.bit'
                }
            });
            expect(wrapper.html()).toBe('<div>bar.bit</div>');
        });
    });

    describe('decorator', () => {
        it('creates a decorator', () => {
            const wrapper = mount(<Decorator1 />);

            expect(wrapper.html()).toBe('<div>bar</div>');
        });

        it('can change prop name in decorator', () => {
            const wrapper = mount(<Decorator2 />);

            expect(wrapper.html()).toBe('<div>bar</div>');
        });

        it('can set parent FaCC component props', () => {
            const wrapper = mount(<Decorator3 />);

            expect(wrapper.html()).toBe('<div>bar.extra</div>');
        });
    });
});
