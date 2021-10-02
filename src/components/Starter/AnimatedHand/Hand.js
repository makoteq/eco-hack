import React, { useRef, useEffect } from "react";
import { ReactComponent as Scene } from "./reka.svg";
import gsap from "gsap";

function HoldingPlant() {
  const wrapper = useRef(null);

  useEffect(() => {
    const [elements] = wrapper.current.children;

    const plant = elements.getElementById("plant");
    const hand = elements.getElementById("hand");

    gsap.set([plant, hand], { autoAlpha: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

    tl.fromTo(hand, { x: "-=300" }, { duration: 1, x: "+=300", autoAlpha: 1 });
    tl.fromTo(plant, { y: "+=10" }, { duration: 1, y: "-=10", autoAlpha: 1 });
  });

  return (
    <div ref={wrapper} className="App">
      <Scene />
    </div>
  );
}

export default HoldingPlant;
