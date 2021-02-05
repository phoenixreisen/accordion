import m from 'mithril';

//--- Types -----

type Item = {
    fas: string,
    content: m.Component,
    headline: string | m.Component,
    type: 'primary'|'secondary',
}

type Attrs = {
    items: Array<Item>
}

type State = {
    openPrimary: number,
    openSecondary: number,
}

//--- Funktionen -----

function toggle(state: State, itemnr: number, type: 'primary'|'secondary') {
    const {openPrimary, openSecondary} = state;
    if(type === 'primary') {
        state.openPrimary = (openPrimary !== itemnr)
            ? itemnr
            : -1
    } else {
        state.openSecondary = (openSecondary !== itemnr)
            ? itemnr
            : -1;
    }
}

//--- Komponente -----

export const Accordion = {

    oninit({state}: m.Vnode<Attrs, State>) {
        state.openPrimary = -1;
        state.openSecondary = -1;
    },

    oncreate() {
        window.onload = () => {
            const items = document.querySelectorAll('.acc-section') as NodeListOf<HTMLElement>;
            items.forEach((item) => {
                const inner = item.children.item(0) as HTMLElement;
                const style = window.getComputedStyle(inner);
                const margin = parseInt(style.margin, 10);
                const padding = parseInt(style.padding, 10);
                const height = inner.offsetHeight;
                item.style.maxHeight = `${height + (2*margin) + (2*padding)}px`;
            });
        };
    },

    view({state, attrs}: m.Vnode<Attrs, State>) {
        const {openPrimary, openSecondary} = state;

        return (
            <section class={`accordion`}>
                {attrs.items?.map((item, index: number) => {
                    const {headline, fas, content, type} = item;
                    const isOpen = (index === openPrimary || index === openSecondary);

                    return (
                        <article id={`acc-item-${index}`} class={`acc-item acc-${type}`}>
                            <a href="javascript:" onclick={() => toggle(state, index, type)}
                                class={`acc-opener ${type === 'secondary' ? 'acc-opener--grayed':''}`}>
                                <span><i class={`fas fa-${fas} mr1`}></i> {headline}</span>
                                <i class={`fas fa-chevron-${isOpen ? 'down':'up'} ml1`}></i>
                            </a>
                            <div class={`acc-section acc-animated ${isOpen ? 'acc-section--open':''}`}>
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