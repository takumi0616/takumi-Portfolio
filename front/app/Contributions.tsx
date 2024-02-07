import React, { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const Contributions: React.FC = () => {
  const svgUrl =
    'https://github-contributions-api.deno.dev/takumi0616.svg?no-total=true&scheme=bluegrey';

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    function updateAnimations() {
      const contributionsImage = gsap.utils.toArray<Element>(
        '.contributions-image'
      );
      contributionsImage.forEach((image) => {
        gsap.fromTo(
          image,
          { autoAlpha: 0, y: 50 },
          {
            duration: 1,
            autoAlpha: 1,
            y: 0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: image,
              start: 'top bottom',
              toggleActions: 'play none none none',
              invalidateOnRefresh: true,
            },
          }
        );
      });
    }
    updateAnimations();
    window.addEventListener('resize', updateAnimations);

    return () => {
      window.removeEventListener('resize', updateAnimations);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="mb-40 text-center">
      <h2 className="text-center text-4xl mb-20">Contributions</h2>
      <img
        src={svgUrl}
        alt="GitHub Contributions"
        className="contributions-image inline-block w-full max-w-4xl"
      />
    </div>
  );
};

export default Contributions;
