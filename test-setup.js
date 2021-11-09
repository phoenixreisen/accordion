import ignore from 'ignore-styles';
import jsdom from 'jsdom';
import ospec from 'ospec';

const dom = new jsdom.JSDOM('', {
    // für `requestAnimationFrame`
    pretendToBeVisual: true,
});

Object.assign(global, {
    window: dom.window,
    document: dom.window.document,
    requestAnimationFrame: dom.window.requestAnimationFrame,
});

ignore.default(['.css', '.sass', '.scss']);

ospec.after(function() {
    dom.window.close();
});