/* import {useContext, useEffect, useMemo, useState} from "react";
import {MapContext} from "./mapcontext";
import VectorLayer from "ol/layer/Vector";
import {Layer} from "ol/layer";

function useKommuneFeatures(currentVectorLayer: VectorLayer<VectorLayer<Layer>>) {
    const { map, layers } = useContext(MapContext);

    const currentLayer = layers.find(
        (layer) => layer.getClassName() === "kommuner",
    ) as CurrentVectorLayer;

    const [features, setFeatures] = useState<KommuneFeature[]>();
    const [viewExtent, setViewExtent] = useState(
        map.getView().getViewStateAndExtent().extent,
    );

    const visibleFeatures = useMemo(
        () =>
            features?.filter((feature) =>
                feature.getGeometry()?.intersectsExtent(viewExtent),
            ),
        [features, viewExtent],
    );

    function handleSourceChange() {
        setFeatures(kommuneLayer?.getSource()?.getFeatures());
    }

    function handleViewChange() {
        setViewExtent(map.getView().getViewStateAndExtent().extent);
    }

    useEffect(() => {
        kommuneLayer?.getSource()?.on("change", handleSourceChange);
        return () => kommuneLayer?.getSource()?.un("change", handleSourceChange);
    }, [kommuneLayer]);

    useEffect(() => {
        map.getView().on("change", handleViewChange);
        return () => map.getView().un("change", handleViewChange);
    }, [map]);

    return { kommuneLayer, features, visibleFeatures };
} */
