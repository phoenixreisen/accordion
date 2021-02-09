const contents = require('./accordion.contents');
const mq = require("mithril-query");
const m = require('mithril');
const test = require("ospec");

Object.assign(global, m);

test.spec('Accordion', () => {
    const { Port1, Item1, Item2, Item3 } = contents;

    const openClass = '.acc-open-item';
    const AccordionView = require('../dist/accordion.m.js').default;
    const Accordion = mq(m(AccordionView, { items: [ Port1, Item1, Item2, Item3, Port1, Item2, Item1 ] }, []));

    test('should render correctly', () => {
        test(Accordion.should.have('.accordion')).equals(true);
        //-----
        test(Accordion.should.have(2, '.fa-ship')).equals(true);
        test(Accordion.should.have(1, '.fa-train')).equals(true);
        test(Accordion.should.have(7, '.acc-item')).equals(true);
        test(Accordion.should.have(2, '.acc-primary')).equals(true);
        test(Accordion.should.have(5, '.acc-secondary')).equals(true);
        test(Accordion.should.have(5, '.acc-opener--grayed')).equals(true); // Secondarys
    });

    test('should toggle item on click', () => {
        test(Accordion.should.not.have(openClass)).equals(true);
        Accordion.click('#acc-item-0 > a');
        test(Accordion.should.have(1, openClass)).equals(true);
        Accordion.click('#acc-item-0 > a');
        test(Accordion.should.not.have(openClass)).equals(true);
    });

    test('should differantiate Primarys and Secondarys', () => {
        test(Accordion.should.not.have(openClass)).equals(true);
        Accordion.click('#acc-item-4 > a'); // Primary
        Accordion.click('#acc-item-2 > a'); // Secondary
        test(Accordion.should.have(2, openClass)).equals(true);
        Accordion.click('#acc-item-2 > a'); // Secondary
        test(Accordion.should.have(1, openClass)).equals(true);
        Accordion.click('#acc-item-4 > a'); // Primary
        test(Accordion.should.have(0, openClass)).equals(true);
    });

    test('should close current when user clicked another', () => {
        test(Accordion.should.not.have(openClass)).equals(true);
        Accordion.click('#acc-item-2 > a'); // Secondary
        test(Accordion.should.have(1, openClass)).equals(true);
        Accordion.click('#acc-item-3 > a'); // Secondary
        test(Accordion.should.have(1, openClass)).equals(true);
        Accordion.click('#acc-item-0 > a'); // Primary
        test(Accordion.should.have(2, openClass)).equals(true);
        Accordion.click('#acc-item-4 > a'); // Primary
        test(Accordion.should.have(2, openClass)).equals(true);
    });

    test('should calc max-height for content container correctly', () => {
        const getMaxHeight = require('../dist/accordion.m.js').getMaxHeight;
        const $container = document.createElement('div');
        $container.style.height = '800px';
        $container.style.padding = '10px';  // x2 wg. top+bottom
        $container.style.margin = '10px';   // x2 wg. top+bottom
        test(getMaxHeight($container)).equals(840);
    });
});
