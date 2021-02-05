import Acc from './accordion.demo';
import m from 'mithril';

const Root: m.Component<{}> = {
    view() {
        return m(Acc);
    },
};

const container = document.querySelector('.example-app');
container && m.mount(container, Root);