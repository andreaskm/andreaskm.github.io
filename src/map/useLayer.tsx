import { Layer } from "ol/layer";
import { useContext, useEffect } from "react";
import { MapContext } from "./mapcontext";

export function useLayer(layer: Layer, checked: boolean) {
  const { setLayers } = useContext(MapContext);
  useEffect(() => {
    if (checked) {
      setLayers((old) => [...old, layer]);
    }
    //Kjører før useEffect er ferdig for å fjerne kommune layer
    return () => {
      setLayers((old) => old.filter((l) => l !== layer));
    };
  }, [checked]);
}
