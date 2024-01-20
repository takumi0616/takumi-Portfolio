import React, { useEffect } from 'react';
import ThreeJsComponent from './ThreeJsComponent';
import './mainview.css'; 
import  gsap  from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default function mainview() {

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    function updateAnimations() {
      const isLandscape = window.innerWidth < window.innerHeight;
      const startTrigger = isLandscape ? "bottom bottom" : "center center";

      const sections = gsap.utils.toArray('.content section:not(.no-animation)');
      sections.forEach((section) => {
        const el = section as Element;
        gsap.fromTo(el, 
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: startTrigger,
              end: "center center",
              toggleActions: 'play none none reverse',
              invalidateOnRefresh: true 
            }
          }
        );
      });
    }

    updateAnimations();
    window.addEventListener('resize', updateAnimations);

    return () => {
      window.removeEventListener('resize', updateAnimations);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()); 
    };
  }, []);
  
  return (
      <div className="wrapper">

        <div className="scroll-indicator">

          <ThreeJsComponent className="threeJsBackground" />

        </div>

        <div className="content">

        <section className="no-animation">
          <h1>髙 須 賀 匠</h1>
        </section>
          
          <section>
            <h1>髙 須 賀 匠</h1>
            <p>フロントエンジニア/データエンジニア/データサイエンティスト</p>
            <p>長岡技術科学大学 工学部 情報経営システム工学課程 3年 在学</p>
            <p>機械学習理論研究室所属</p>
          </section>
          
          <section>
            <p>大学の学祭の実行委員である情報局「NUTMEG」に所属し、</p>
            <p>学祭をWebアプリでDXしています。</p>
            <p>それらの経験を活かして、様々なハッカソンや他団体のLT会にも参加しています。</p>
            <p>また、機械学習理論研究室では気象データを扱い、</p>
            <p>気象予報コメントを生成するタスクの解決を行っています。</p>
          </section>
          
        </div>
      </div>
  );
}
