import m from 'mithril';

//--- Types -----

type Item = {
    fas: string,
    content: m.Component,
    headline: m.Component | string,
    type: 'primary'|'secondary',
}

type Attrs = {
    items: Array<Item>,
    jumpMinus: number,
}

type State = {
    openPrimary: {itemnr: number, maxheight: number},
    openSecondary: {itemnr: number, maxheight: number},
}

//--- Funktionen -----

function getMaxHeight(itemnr: number): number {
    const $item = document.querySelector(`#acc-item-${itemnr} .acc-section`) as HTMLElement;
    const $inner = $item.children.item(0) as HTMLElement;
    const style = window.getComputedStyle($inner);
    const margin = parseInt(style.margin, 10);
    const padding = parseInt(style.padding, 10);
    const height = $inner.offsetHeight;
    return (height + (2*margin) + (2*padding));
}

function scrollTo(itemnr: number, isOpen: boolean, duration = 500, jumpMinus = 0): void {
    setTimeout(() => {  // scrollt nach der Animation zum angeklickten Element
        const item = document.querySelector(`#acc-item-${itemnr}`);
        const html = document.documentElement;
        const body = document.body;
        if (item && !isOpen) {
            item.scrollIntoView(true);
            html.scrollTop -= jumpMinus;
            body.scrollTop -= jumpMinus;
        }
    }, duration);
}

function toggle(state: State, attrs: Attrs, itemnr: number, type: 'primary'|'secondary') {
    const {openPrimary, openSecondary} = state;
    const {jumpMinus} = attrs;

    if(type === 'primary') {
        const isOpen = (openPrimary.itemnr === itemnr);
        openPrimary.itemnr = isOpen ? -1 : itemnr;
        openPrimary.maxheight = getMaxHeight(itemnr);
        scrollTo(itemnr, isOpen, 500, jumpMinus || 0);
    } else {
        const isOpen = (openSecondary.itemnr === itemnr);
        openSecondary.itemnr = isOpen ? -1 : itemnr;
        openSecondary.maxheight = getMaxHeight(itemnr);
        scrollTo(itemnr, isOpen, 500, jumpMinus || 0);
    }
}

//--- Komponente -----

export const Accordion = {

    oninit({state}: m.Vnode<Attrs, State>) {
        state.openPrimary = { itemnr: -1, maxheight: 0 };
        state.openSecondary = { itemnr: -1, maxheight: 0 };
    },

    view({state, attrs}: m.Vnode<Attrs, State>) {
        const {openPrimary, openSecondary} = state;

        return (
            <section class={`accordion`}>
                {attrs.items?.map((item, index: number) => {
                    const {headline, fas, content, type} = item;
                    const isOpen = (index === openPrimary.itemnr || index === openSecondary.itemnr);
                    const maxHeight = (type === 'primary' && openPrimary.maxheight)
                                    || (type === 'secondary' && openSecondary.maxheight)
                                    || 0;

                    return (
                        <article id={`acc-item-${index}`} class={`acc-item acc-${type}`}>
                            <a href="javascript:" onclick={() => toggle(state, attrs, index, type)}
                                class={`acc-opener ${type === 'secondary' ? 'acc-opener--grayed':''}`}>
                                <span><i class={`fas fa-${fas} mr1`}></i> {headline}</span>
                                <i class={`fas fa-chevron-${isOpen ? 'down':'up'} ml1`}></i>
                            </a>
                            <div class={`acc-section ${isOpen ? 'acc-section--open': ''}`} style={`max-height: ${isOpen ? maxHeight : 0}px`}>
                                <div class="acc-inner">
                                    { m(content) }
                                </div>
                            </div>
                        </article>
                    );
                })}
            </section>
        );
    },
} as any;

export default Accordion;