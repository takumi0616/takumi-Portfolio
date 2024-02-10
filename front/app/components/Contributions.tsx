import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const Contributions: React.FC = () => {
  const [imageUrl, setImageUrl] = useState(
    'https://github-contributions-api.deno.dev/takumi0616.svg?no-total=true&scheme=bluegrey'
  );
  const [isFallbackImage, setIsFallbackImage] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const loadImage = (url: string) => {
      const img = new Image();
      img.onload = () => {
        setIsFallbackImage(false);
      };
      img.onerror = () => {
        setImageUrl('/github.svg');
        setIsFallbackImage(true);
      };
      img.src = url;
    };

    loadImage(imageUrl);

    function updateAnimations() {
      const contributionsImage = gsap.utils.toArray<Element>('.contributions');
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
      <div className="contributions ">
        <img
          src={imageUrl}
          alt="GitHub Contributions"
          className={`inline-block ${
            isFallbackImage ? 'w-8 h-8' : 'w-full max-w-4xl'
          }`}
        />
        {isFallbackImage && (
          <p className="mt-4 text-sm text-black">
            現在、APIリクエスト制限により表示できません。
          </p>
        )}
      </div>
    </div>
  );
};

export default Contributions;
