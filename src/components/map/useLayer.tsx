import React, { useContext, useEffect } from "react";
import { Layer } from "ol/layer";
import { MapContext } from "./mapContext";
import { kommuneLayer } from "../sidebar/checkboxes/kommuneCheckbox";

function useLayer(layer: Layer, checked: boolean) {
  const { setLayers } = useContext(MapContext);

  useEffect(() => {
    if (checked) {
      setLayers((old) => [...old, layer]);
      console.log("Toggled layer");
    }
    return () => {
      setLayers((old) => old.filter((l) => l !== layer));
      console.log("Untoggled layer");
    };
  }, [checked]);
}

export default useLayer;
