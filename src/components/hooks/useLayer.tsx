import { useContext, useEffect } from "react";
import { Layer } from "ol/layer";
import { MapContext } from "../map/mapContext";

function useLayer(layer: Layer, checked: boolean) {
  const { setLayers } = useContext(MapContext);

  useEffect(() => {
    if (checked) {
      setLayers((old) => [...old, layer]);
    }
    return () => {
      setLayers((old) => old.filter((l) => l !== layer));
    };
  }, [checked]);
}

export default useLayer;
