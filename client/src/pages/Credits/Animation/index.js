import React, { useRef, useEffect } from "react";
import { ReactComponent as Scene } from "./team.svg";
import gsap from "gsap";

function Team() {
  const wrapper = useRef(null);

  useEffect(() => {
    const [elements] = wrapper.current.children;

    const osoba1 = elements.getElementById("osoba1");
    const osoba2 = elements.getElementById("osoba2");
    const osoba3 = elements.getElementById("osoba3");

    gsap.set([osoba1, osoba2, osoba3], { autoAlpha: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

    tl.fromTo(
      osoba1,
      { y: "-=300" },
      { duration: 0.5, y: "+=300", autoAlpha: 1 }
    );
    tl.fromTo(
      osoba2,
      { y: "-=300" },
      { duration: 0.5, y: "+=300", autoAlpha: 1 }
    );
    tl.fromTo(
      osoba3,
      { y: "-=300" },
      { duration: 0.5, y: "+=300", autoAlpha: 1 }
    );
  });

  return (
    <div ref={wrapper} className="App">
      <Scene />
    </div>
  );
}

export default Team;
