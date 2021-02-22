# Phoenix "Akkordeon"

**JS Akkordeon-Komponente mittels Mithril.js.** Die Komponente stellt nur die Implementierung, die Styles kommen wie immer aus dem Design-System.

Die Komponente ist Teil des [Phoenix Reisen Design-Systems](https://design-system.phoenixreisen.net).

## Demo

https://phoenixreisen.github.io/accordion/

## Installation

[Mithril](https://mithril.js.org/) wird benötigt.

```bash
npm install --save @phoenixreisen/accordion
```

## Anwendung

#### Parameter / Props

```ts
type Attrs = {
    jumpMinus: number,

    items: Array<{
        fas: string,
        content: m.Component,
        headline: m.Component | string,
        type: 'primary'|'secondary',
    }>,
}
```

#### Props Beispiel

```ts
const Prime = {
    fas: 'ship',
    type: 'primary',
    headline: 'Hafen Bremen',
    content: {
        view() {
            return (<div>PRIMARY ITEM</div>);
        }
    }
}
const Secondary = {
    fas: 'ship',
    type: 'secondary',
    headline: 'Ausflug XYZ',
    content: {
        view() {
            return (<div>GRAY SECONDARY ITEM</div>);
        }
    }
}
const items = [ Prime, Secondary, Secondary, Secondary ];
```

#### Aufruf

```ts
import Accordion from '@phoenixreisen/accordion';

// JSX
<Accordion items={[0,1,2,1,3, 0,2,2,1,3, 0,1,2,3].map(current =>
    items[current]
)} />

// Hyperscript bzw. Javascript
m(Accordion, { items: [0,1,2,1,3, 0,2,2,1,3, 0,1,2,3].map(current =>
    items[current]
)});
```

## Test

```bash
npm install
npm run test
```

## Deployment

```bash
[npm install]                       # Abhängigkeiten installieren
npm version [major|minor|patch]     # increase version x.x.x => major.minor.patch
npm publish                         # upload to npm
git push
```

## Github Page

Demo kann manuell mittels Rollup gebaut werden.

```bash
[npm i]
npm run compile:example
```

Nach `git push` automatisch zu erreichen unter:
https://phoenixreisen.github.io/accordion/