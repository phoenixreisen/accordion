import {Port1, Item1, Item2, Item3} from './accordeon.contents';
import {Accordion} from '../src/accordion.m';
import m from 'mithril';

// Variablen

const items = [
    Port1, Item1, Item2, Item3
];

//--- Komponente -----

export const Demo = {
    view() {
        return (
            <div class="acc-demo">
                <Accordion items={[0,1,2,1,3, 0,2,2,1,3, 0,1,2,3].map(current =>
                    items[current]
                )} />
            </div>
        );
    }
};

export default Demo;