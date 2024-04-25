import React, { useEffect, useState } from "react";
import { map } from "../map/mapContext";
import { Draw } from "ol/interaction";
import { drawingSource } from "../application";
import { getLength } from "ol/sphere";
import { useGeographic } from "ol/proj";
import { LineString } from "ol/geom";
useGeographic();
const formatLength = function (line: LineString) {
  const length = getLength(line) * 100000;
  let output;
  if (length > 100) {
    output = Math.round((length / 1000) * 100) / 100 + " " + "km";
  } else {
    output = Math.round(length * 100) / 100 + " " + "m";
  }
  return output;
};

function UseDrawLineString(checked: boolean) {
  const [lengthOfString, setLengthOfString] = useState<string>();
  const draw = new Draw({ type: "LineString", source: drawingSource });
  let sketch;

  useEffect(() => {
    function handleDrawLineString() {
      map.addInteraction(draw);
      let listener;
      draw.on("drawstart", (e) => {
        sketch = e.feature;
        listener = sketch.getGeometry()!.on("change", (e) => {
          const geometry = e.target;
          let output;
          output = formatLength(geometry);
          setLengthOfString(output);
        });
      });
    }
    if (checked) {
      console.log(lengthOfString);
      handleDrawLineString();
    }

    return () => map.removeInteraction(draw);
  }, [checked]);

  return lengthOfString;
}

export default UseDrawLineString;
