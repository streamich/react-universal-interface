import {createElement as h} from 'react';
import render from '../render';
import {mount} from 'enzyme';

const Parent = (props) => render(props, {foo: 'bar'});

describe('render()', () => {
    it('exists', () => {
        expect(typeof render).toBe('function');
    });

    it('renders without crashing', () => {
        mount(<Parent>foobar</Parent>);
    });

    it('crashes when nothing to render', () => {
        expect(() => {
            mount(<Parent/>);
        }).toThrow();
    });

    it('supports render prop interface', () => {
        const wrapper = mount(<Parent render={(state) => {
            expect(state).toEqual({foo: 'bar'});

            return <div>{state.foo}</div>;
        }} />);

        expect(wrapper.html()).toBe('<div>bar</div>');
    });

    it('supports FaCC interface', () => {
        const wrapper = mount(
            <Parent>{(state) => {
                expect(state).toEqual({foo: 'bar'});

                return <div>{state.foo}</div>;
            }}</Parent>
        );

        expect(wrapper.html()).toBe('<div>bar</div>');
    });

    it('supports component prop interface', () => {
        const MyComp = jest.fn();

        MyComp.mockImplementation((state) => {
            return <div>{state.foo}</div>;
        });

        let wrapper = mount(<Parent component={MyComp} />);

        expect(MyComp).toHaveBeenCalledTimes(1);
        expect(MyComp.mock.calls[0][0]).toEqual({foo: 'bar'});
        expect(wrapper.html()).toBe('<div>bar</div>');

        wrapper = mount(<Parent comp={MyComp} />);

        expect(MyComp).toHaveBeenCalledTimes(2);
        expect(MyComp.mock.calls[1][0]).toEqual({foo: 'bar'});
        expect(wrapper.html()).toBe('<div>bar</div>');
    });

    it('supports prop injection interface', () => {
        const MyComp: any = jest.fn();

        MyComp.mockImplementation(({foo, baz}) => {
            return <div>{foo} and {baz}</div>;
        });

        const wrapper = mount(
            <Parent>
                <MyComp baz='bazooka' />
            </Parent>
        );

        expect(MyComp).toHaveBeenCalledTimes(1);
        expect(MyComp.mock.calls[0][0]).toEqual({
            foo: 'bar',
            baz: 'bazooka',
        });
        expect(wrapper.html()).toBe('<div>bar and bazooka</div>');
    });

    it('does not inject prop into DOM elements', () => {
        const wrapper = mount(
            <Parent>
                <div>foobar</div>
            </Parent>
        );

        expect(wrapper.html()).toBe('<div>foobar</div>');
    });

    it('renders array of children', () => {
        const wrapper = mount(
            <div>
                <Parent>
                    <div key='foo'>foo</div>
                    <div key='bar'>bar</div>
                </Parent>
            </div>
        );

        expect(wrapper.html()).toBe('<div><div>foo</div><div>bar</div></div>');
    });

    it('renders other types', () => {
        let wrapper = mount(
            <div>
                <Parent>{1}</Parent>
            </div>
        );

        expect(wrapper.html()).toBe('<div>1</div>');

        wrapper = mount(
            <div>
                <Parent>foobar</Parent>
            </div>
        );

        expect(wrapper.html()).toBe('<div>foobar</div>');
    });
});
