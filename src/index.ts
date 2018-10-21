import render from './render';
import createEnhancer from './createEnhancer';

export interface UniversalProps<Data> {
    children?: ((data: Data) => React.ReactNode) | React.ReactNode;
    render?: (data: Data) => React.ReactNode;
    comp?: React.ComponentType<Data & any>;
    component?: React.ComponentType<Data & any>;
}

export {
    render,
    createEnhancer,
};
