import React, { useEffect } from "react";
import { useHover } from "../hooks/useHover";

function KommuneName(checked: boolean) {
  const { currentlyHovered } = useHover(checked);
  console.log(checked.checked);

  useEffect(() => {
    if (checked) {
      return <div>Name: {currentlyHovered?.getProperties().navn[0].navn}</div>;
    } else if (!checked) return <div>Nothing hovered</div>;
  }, [checked]);
}

useEffect(() => {}, []);

export default KommuneName;
