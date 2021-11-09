import Accordion, { getMaxHeight } from '../dist/accordion.m.js';
import contents from './accordion.contents.js';
import mq from "mithril-query";
import test from "ospec";

test.spec('Accordion', () => {
    const { Port1, Item1, Item2, Item3 } = contents;

    const openClass = '.acc-open-item';
    const View = mq(Accordion, { items: [ Port1, Item1, Item2, Item3, Port1, Item2, Item1 ] });

    test('should render correctly', () => {
        test(View.should.have('.accordion')).equals(true);
        //-----
        test(View.should.have(2, '.fa-ship')).equals(true);
        test(View.should.have(1, '.fa-train')).equals(true);
        test(View.should.have(7, '.acc-item')).equals(true);
        test(View.should.have(2, '.acc-primary')).equals(true);
        test(View.should.have(5, '.acc-secondary')).equals(true);
        test(View.should.have(5, '.acc-opener--grayed')).equals(true); // Secondarys
    });

    test('should toggle item on click', () => {
        test(View.should.not.have(openClass)).equals(true);
        View.click('#acc-item-0 > a');
        test(View.should.have(1, openClass)).equals(true);
        View.click('#acc-item-0 > a');
        test(View.should.not.have(openClass)).equals(true);
    });

    test('should differentiate Primarys and Secondarys', () => {
        test(View.should.not.have(openClass)).equals(true);
        View.click('#acc-item-4 > a'); // Primary
        View.click('#acc-item-2 > a'); // Secondary
        test(View.should.have(2, openClass)).equals(true);
        View.click('#acc-item-2 > a'); // Secondary
        test(View.should.have(1, openClass)).equals(true);
        View.click('#acc-item-4 > a'); // Primary
        test(View.should.have(0, openClass)).equals(true);
    });

    test('should close current when user clicked another', () => {
        test(View.should.not.have(openClass)).equals(true);
        View.click('#acc-item-2 > a'); // Secondary
        test(View.should.have(1, openClass)).equals(true);
        View.click('#acc-item-3 > a'); // Secondary
        test(View.should.have(1, openClass)).equals(true);
        View.click('#acc-item-0 > a'); // Primary
        test(View.should.have(2, openClass)).equals(true);
        View.click('#acc-item-4 > a'); // Primary
        test(View.should.have(2, openClass)).equals(true);
    });

    test('should calc max-height for content container correctly', () => {
        const $container = document.createElement('div');
        $container.style.height = '800px';
        $container.style.padding = '10px';  // x2 wg. top+bottom
        $container.style.margin = '10px';   // x2 wg. top+bottom
        test(getMaxHeight($container)).equals(840);
    });
});
