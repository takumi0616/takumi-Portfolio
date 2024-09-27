import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import WorkCard, { WorkCardProps } from './WorkCard'

type WorksProps = {
  onOpenModal: (work: Omit<WorkCardProps, 'onOpenModal'>) => void
}

const worksData: Omit<WorkCardProps, 'onOpenModal'>[] = [
  {
    image: 'gpt-logprobs.png',
    title: 'GPT-logprobs',
    description:
      '生成AIの出力に自信がない人に向けた、プロンプト作成のための指標や教育コンテンツを提供するWebアプリです。ユーザーは自由にパラメータを設定し、結果を確認しながらプロンプトのクオリティ向上のための体験ができます。',
    myPart: 'フロント、バック、デザイン、PM',
    gitHubUrl: 'https://github.com/takumi0616/gpt-logprobs',
  },
  {
    image: 'NS.png',
    title: 'NUTMEG-Seeds',
    description:
      '私が所属している団体「NUTMEG」内での技術の知見を共有しているWebアプリです。NUTMEGのイメージカラーであるオレンジをテーマカラーにしており、細部までデザインを凝っています。',
    myPart: 'フロント、PM',
    gitHubUrl: 'https://github.com/NUTFes/NUTMEG-Seeds',
  },
  {
    image: 'GM2.png',
    title: 'Group-manager-2',
    description:
      '長岡技術科学大学の学祭に登録する際にこのWebアプリを使います。PDF出力や統計データの表示など機能面に優れています。黒を基調としており、スタイリッシュなデザインです。',
    myPart: 'フロント、バック',
    gitHubUrl: 'https://github.com/NUTFes/group-manager-2',
  },
  {
    image: 'SMF.png',
    title: 'Slack-message-finder',
    description:
      'Slackのログをリアルタイムに取得して保存し、Slackライクなデザインのページで表示するWebアプリです。チャンネルの上下表示や、特定のユーザーの1週間の活動を知る機能があります。',
    myPart: 'フロント、バック',
    gitHubUrl: 'https://github.com/TMLlaboratory/slack-message-finder',
  },
  {
    image: 'MMA.png',
    title: 'Menter-management-app',
    description:
      'メンター制度をサポートするWebアプリです。メンターとメンティーを紐づけて、メンティーの学習記録を確認することができます。管理者が管理するシンプルなWebアプリです。',
    myPart: 'フロント、バック',
    gitHubUrl: 'https://github.com/takumi0616/Mentor-management-app',
  },
  {
    image: 'CAI.png',
    title: 'Communication-AI',
    description:
      '生成AIと会話できるWebアプリです。会話部分は単純なシステムですが、デザインやアクセシビリティに配慮しており、あらゆるユーザーが使うことを想定した機能や設計を考えています。',
    myPart: 'フロント、デザイン',
    gitHubUrl: 'https://github.com/takumi0616/communication-ai',
  },
]

export default function Works({ onOpenModal }: WorksProps) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    function updateAnimations() {
      const workCards = gsap.utils.toArray<Element>('.work-card')
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
          },
        )
      })
    }
    updateAnimations()
    window.addEventListener('resize', updateAnimations)

    return () => {
      window.removeEventListener('resize', updateAnimations)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="mb-40">
      <h2 className="mb-20 text-center text-4xl">Works</h2>

      <div className="flex flex-col items-center justify-center">
        {worksData.map((work, index) => (
          <div key={index} className="work-card mb-20 mt-10">
            <WorkCard {...work} onOpenModal={() => onOpenModal(work)} />
          </div>
        ))}
      </div>
    </div>
  )
}
