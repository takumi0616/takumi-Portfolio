import React, { useEffect } from 'react';
import WorkCard from './WorkCardComponent';
import './Works.css';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default function Works() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    function updateAnimations() {
      const isLandscape = window.innerWidth < window.innerHeight;
      const startTrigger = isLandscape ? 'top top' : 'top bottom';

      const workCards = gsap.utils.toArray<Element>('.work-card');
      workCards.forEach((card) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 50 },
          {
            duration: 1,
            autoAlpha: 1,
            y: 0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: startTrigger,
              end: 'bottom top',
              toggleActions: 'play none none reverse',
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
    <div>
      <div className="works-title">
        <h2>Works</h2>
      </div>

      <div className="works-contents">
        <WorkCard
          image="NS.png"
          title="NUTMEG-Seeds"
          description="私が所属している団体「NUTMEG」内での技術の知見を共有しているWebアプリです。NUTMEGのイメージカラーであるオレンジをテーマカラーにしており、細部までデザインを凝っています。"
          myPart="フロント、PM"
          gitUrl="https://github.com/NUTFes/NUTMEG-Seeds"
        />
        <WorkCard
          image="GM2.png"
          title="Group-manager-2"
          description="長岡技術科学大学の学祭に登録する際にこのWebアプリを使います。PDF出力や統計データの表示など機能面に優れています。黒を基調としており、スタイリッシュなデザインです。"
          myPart="フロント、バック"
          gitUrl="https://github.com/NUTFes/group-manager-2"
        />
        <WorkCard
          image="SMF.png"
          title="Slack-message-finder"
          description="Slackのログをリアルタイムに取得して保存し、Slackライクなデザインのページで表示するWebアプリです。チャンネルの上下表示や、特定のユーザーの1週間の活動を知る機能があります。"
          myPart="フロント、バック"
          gitUrl="https://github.com/TMLlaboratory/slack-message-finder"
        />
        <WorkCard
          image="MMA.png"
          title="Menter-management-app"
          description="メンター制度をサポートするWebアプリです。メンターとメンティーを紐づけて、メンティーの学習記録を確認することができます。管理者が管理するシンプルなWebアプリです。"
          myPart="フロント、バック"
          gitUrl="https://github.com/takumi0616/Mentor-management-app"
        />
      </div>
    </div>
  );
}
