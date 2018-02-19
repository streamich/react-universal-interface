import {createElement as h} from 'react';
import renderChildren from '../renderChildren';
import {mount} from 'enzyme';

const Parent = (props) => renderChildren(props, {foo: 'bar'});

describe('renderChildren()', () => {
    it('exists', () => {
        expect(typeof renderChildren).toBe('function');
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

    it('supports componet prop interface', () => {
        const MyComp = jest.fn();

        MyComp.mockImplementation((state) => {
            return <div>{state.foo}</div>;
        });

        let wrapper = mount(<Parent component={MyComp} />);

        expect(MyComp).toHaveBeenCalledTimes(1);
        expect(MyComp).toHaveBeenCalledWith({foo: 'bar'});
        expect(wrapper.html()).toBe('<div>bar</div>');

        wrapper = mount(<Parent comp={MyComp} />);

        expect(MyComp).toHaveBeenCalledTimes(2);
        expect(MyComp).toHaveBeenCalledWith({foo: 'bar'});
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
});
