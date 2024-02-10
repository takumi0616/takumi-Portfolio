import React, { useEffect, useRef, useState } from 'react';
import MainCube from '../components/cube/MainCube';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default function MainView() {
  const threeJsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [mainContainerHeight, setMainContainerHeight] = useState(0);

  const handleResize = (width: number, height: number) => {
    setCanvasSize({ width, height });
    updatePadding(height);
  };

  const updatePadding = (canvasHeight: number) => {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    let paddingTop = 45;
    if (windowHeight <= windowWidth) {
      paddingTop = Math.max(0, (windowHeight - canvasHeight) / 2);
    }

    if (threeJsRef.current) {
      threeJsRef.current.style.paddingTop = `${paddingTop}px`;
    }
  };

  const updateMainContainerHeight = () => {
    if (contentRef.current) {
      setMainContainerHeight(contentRef.current.clientHeight);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    function updateAnimations() {
      const sections = gsap.utils.toArray(
        '.content section:not(.no-animation)'
      );
      sections.forEach((section) => {
        const el = section as Element;
        gsap.fromTo(
          el,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top center',
              toggleActions: 'play none none none',
              invalidateOnRefresh: true,
            },
          }
        );
      });
    }

    updateAnimations();
    window.addEventListener('resize', updateAnimations);
    window.addEventListener('resize', updateMainContainerHeight);

    updateMainContainerHeight();

    return () => {
      window.removeEventListener('resize', updateAnimations);
      window.removeEventListener('resize', updateMainContainerHeight);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div>
      <div className="flex relative items-start max-w-full portrait:flex-col-reverse">
        <div
          className="w-1/2 portrait:mr-0 portrait:w-full portrait:mt-[-200px]"
          ref={contentRef}
        >
          <div className="content ml-[10vw] mr-[5vw] portrait:mt-0">
            <section className="no-animation opacity-100 mt-[45vh] mb-[55vh] portrait:mt-0">
              <h1 className="text-5xl">髙 須 賀 匠</h1>
            </section>

            <div className=" mt-[45vh] mb-[55vh]">
              <section className="opacity-0">
                <h2 className="text-5xl">髙 須 賀 匠</h2>
                <p className="leading-normal text-base my-4">
                  フロントエンジニア/データエンジニア/データサイエンティスト
                  <br />
                  長岡技術科学大学 工学部 情報経営システム工学課程 3年 在学
                  <br />
                  機械学習理論研究室所属
                </p>
              </section>
            </div>

            <div className=" mt-[45vh] mb-[55vh]">
              <section className="opacity-0">
                <p className="leading-normal text-base my-4">
                  大学の学祭の実行委員である情報局「NUTMEG」に所属し、
                  <br />
                  学祭をWebアプリでDXしています。
                  <br />
                  それらの経験を活かして、様々なハッカソンや他団体のLT会にも参加しています。
                  <br />
                  また、機械学習理論研究室では気象データを扱い、
                  <br />
                  気象予報コメントを生成するタスクの解決を行っています。
                </p>
              </section>
            </div>
          </div>
        </div>

        <div
          className="sticky top-0 right-0"
          style={{ height: `${mainContainerHeight / 2.2}px` }}
        >
          <div
            className="stickyThreeJsPadding"
            style={{ paddingTop: 'var(--stickyThreeJsPaddingTop)' }}
            ref={threeJsRef}
          >
            <MainCube onResize={handleResize} />
          </div>
        </div>
      </div>
    </div>
  );
}
