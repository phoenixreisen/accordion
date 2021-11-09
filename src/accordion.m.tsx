import m from 'mithril';

//--- Types -----

type ItemType = 'primary'|'secondary';

type Item = {
    fas: string,
    type: ItemType,
    content: m.Component,
    headline: m.Component | string,
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

export function getMaxHeight($container: HTMLElement): number {
    if($container) {
        const style = window.getComputedStyle($container);
        const height = parseInt(style.height);
        const margin = parseInt(style.margin);
        const padding = parseInt(style.padding);
        return (height + (2*margin) + (2*padding));
    }
    return 0;
}

export function scrollTo($item: HTMLElement, isOpen: boolean, delay = 500, jumpMinus = 0): void {
    setTimeout(() => {  // scrollt nach der Animation zum angeklickten Element
        const html = document.documentElement;
        const body = document.body;
        if ($item && !isOpen) {
            $item.scrollIntoView(true);
            html.scrollTop -= jumpMinus;
            body.scrollTop -= jumpMinus;
        }
    }, delay);
}

function toggle(state: State, attrs: Attrs, itemnr: number, type: ItemType) {
    const {openPrimary, openSecondary} = state;
    const {jumpMinus} = attrs;

    const $item = (document.querySelector(`#acc-item-${itemnr}`) as HTMLElement) ?? null;
    const $section = ($item?.querySelector('.acc-section') as HTMLElement) ?? null;
    const $inner = ($section?.children.item(0) as HTMLElement) ?? null;

    const clicked = (type === 'primary'
        ? openPrimary
        : openSecondary
    );
    const isOpen = (clicked.itemnr === itemnr);
    clicked.itemnr = isOpen ? -1 : itemnr;
    clicked.maxheight = getMaxHeight($inner);
    scrollTo($item, isOpen, 500, jumpMinus || 0);
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
                {attrs.items?.map((item:Item, index:number) => {
                    const {headline, fas, content, type} = item;
                    const isOpen = (index === openPrimary.itemnr || index === openSecondary.itemnr);
                    const maxHeight = (type === 'primary' && openPrimary.maxheight)
                        || (type === 'secondary' && openSecondary.maxheight)
                        || 0;

                    return (
                        <article id={`acc-item-${index}`} class={`acc-item ${isOpen ? 'acc-open-item':''} acc-${type}`}>
                            <a href="javascript:" onclick={() => toggle(state, attrs, index, type)}
                                class={`acc-opener ${type === 'secondary' ? 'acc-opener--grayed':''}`}>
                                <span><i class={`fas fa-${fas} mr1`}></i> {headline}</span>
                                <i class={'fas fa-chevron-up ml1'}></i>
                            </a>
                            <div class={'acc-section'} style={`max-height: ${isOpen ? maxHeight : 0}px`}>
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