import React, { useEffect } from 'react';
import WorkCard from './cards/WorkCard';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { WorkCardProps } from './cards/WorkCard';

type WorksProps = {
  onOpenModal: (work: WorkCardProps) => void;
};

export default function Works({ onOpenModal }: WorksProps) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    function updateAnimations() {
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
    <div className="mb-40">
      <div className="mb-20">
        <h2 className="text-center text-4xl">Works</h2>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="work-card mt-20 mb-20">
          <WorkCard
            image="NS.avif"
            title="NUTMEG-Seeds"
            description="私が所属している団体「NUTMEG」内での技術の知見を共有しているWebアプリです。NUTMEGのイメージカラーであるオレンジをテーマカラーにしており、細部までデザインを凝っています。"
            myPart="フロント、PM"
            gitHubUrl="https://github.com/NUTFes/NUTMEG-Seeds"
            onOpenModal={onOpenModal}
          />
        </div>
        <div className="work-card mt-20 mb-20">
          <WorkCard
            image="GM2.avif"
            title="Group-manager-2"
            description="長岡技術科学大学の学祭に登録する際にこのWebアプリを使います。PDF出力や統計データの表示など機能面に優れています。黒を基調としており、スタイリッシュなデザインです。"
            myPart="フロント、バック"
            gitHubUrl="https://github.com/NUTFes/group-manager-2"
            onOpenModal={onOpenModal}
          />
        </div>
        <div className="work-card mt-20 mb-20">
          <WorkCard
            image="SMF.avif"
            title="Slack-message-finder"
            description="Slackのログをリアルタイムに取得して保存し、Slackライクなデザインのページで表示するWebアプリです。チャンネルの上下表示や、特定のユーザーの1週間の活動を知る機能があります。"
            myPart="フロント、バック"
            gitHubUrl="https://github.com/TMLlaboratory/slack-message-finder"
            onOpenModal={onOpenModal}
          />
        </div>
        <div className="work-card mt-20 mb-20">
          <WorkCard
            image="MMA.avif"
            title="Menter-management-app"
            description="メンター制度をサポートするWebアプリです。メンターとメンティーを紐づけて、メンティーの学習記録を確認することができます。管理者が管理するシンプルなWebアプリです。"
            myPart="フロント、バック"
            gitHubUrl="https://github.com/takumi0616/Mentor-management-app"
            onOpenModal={onOpenModal}
          />
        </div>
      </div>
    </div>
  );
}
