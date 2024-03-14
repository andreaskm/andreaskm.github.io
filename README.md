# Creating a new map in React using vite and OpenLayers

## 1. Init and install dependencies:

Initialize project and create `package.json`:

`npm init -y`

Dependencies:

```
npm i ol
npm i react
npm i react-dom
```

DevDependencies:

```
npm i -D @types/react
npm i -D @types/react-dom
npm i -D husky
npm i -D prettier
npm i -D typescript
npm i -D vite
```

## 2. Create barebones project

Create `index.html`

```html
<body>
  <div id="root"></div>
</body>
<script src="src/main.tsx" type="module"></script>
```

_*Not using the \<HTML>\</HTML> tags means the OL map will be rendering without needing a css file*_

I also like to add `<body style="margin: 0">` here, but this can also be added in the application.css file later

Create `src/main.tsx`

```typescript jsx
import React from "react";
import ReactDOM from "react-dom/client";
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<h1>Hello WORLD</h1>);
```

`ctrl` + `alt` + `insert`: Shortcut for creating files in IntelliJ/Webstorm

If your IDE gives you problems for `import react from "react";` and `import ReactDOM from "react-dom/client";`, try to add `import * as React from "react";` and `import * as ReactDOM from "react-dom/client";`.

## 3. Initialize typescript, husky and prettier:

```
npx tsc --init --jsx react
npx prettier --write .
npx husky init
```

## 4. Set up scripts

```
npm pkg set scripts.dev=vite
npm pkg set scripts.build="npm test && vite build"
npm pkg set scripts.test="prettier --check . && tsc --noEmit"
```

## 5. Run scripts and check if it all works.

`npm run dev`

---

Congrats, the basics are set up. Now to create a map that can be displayed in the web browser. Let's go through that.

## 1. Moving the application from main.tsx to application.tsx

Create `src/modules/application.tsx`

`ctrl` + `alt` + `insert`

And insert this:

```typescript jsx
import React from "react";

export function Application(){
    return <h1>Hello Application.tsx</h1>
}
```

In `src/main.tsx` write this:

```typescript jsx
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {Application} from "./modules/application";
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<Application />);
```

You should now see _Hello Application.tsx_ in your browser.

# 2. Adding OpenLayers to our map

In `src/modules/application.tsx`.

```typescript jsx
import React, {MutableRefObject, useEffect, useRef} from "react";
import {useGeographic} from "ol/proj";
import {Map, View} from "ol";
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";
import "ol/ol.css" //css file packaged with Openlayers so the buttons on the map position themselves correctly.

//Call useGeographic so the map view uses geographic coordinates.
useGeographic();

//Creating the map that will be referenced later in the application.
//Remember to import the correct Map from "ol".
//The map needs a couple of options to work. Layers are the way we view the map. In this case, I use OSM (OpenStreetMap) to display the map.
//The map also needs a view, the view takes two options; coordinates, so the application knows where to start, and zoom, where ex. 3 is far and 10 is closer
const map = new Map({
  layers: [new TileLayer({source: new OSM()})],
  view: new View({center: [10, 59], zoom: 11})
})

export function Application() {
  //So the map is created, but we need to see it in the browser. This is where useRef comes in.
  const mapRef = useRef() as MutableRefObject<HTMLDivElement>; //Ts stuff
  useEffect(() => {
    map.setTarget(mapRef.current)
  }, []);

  //Reference the div here to make it show up.
  return <div ref={mapRef}></div>;
}
```

# Other things

## Stadia maps

Layers:

```
Layer name. Valid values:
alidade_smooth,
alidade_smooth_dark,
outdoors,
stamen_terrain,
stamen_terrain_background,
stamen_terrain_labels,
stamen_terrain_lines,
stamen_toner_background,
stamen_toner,
stamen_toner_labels,
stamen_toner_lines,
stamen_toner_lite,
stamen_watercolor,
and osm_bright.
```
