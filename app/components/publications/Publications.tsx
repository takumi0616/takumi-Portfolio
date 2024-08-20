import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PublicationCard, { PublicationCardProps } from './PublicationCard'

export default function Publications() {
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
      <h2 className="mb-20 text-center text-4xl">Publications</h2>

      <div className="flex flex-col items-center justify-center">
        <div className="work-card mb-20 mt-10">
          <PublicationCard
            image="public1.png"
            title="Recognition Performance Validation of Weather Map Images by ChatGPT"
            authors="Yuki H. Takanob, Shotaro Watanabeb, Gendo Kumoia"
            abstract="Weather map recognition is a complex image recognition task that requires two cognitive processes: the interpretation of symbols
            and future predictions. Recent advancements in multimodal AI have shown the potential to solve such complex tasks. This study
            uses ChatGPT, a type of multimodal AI, to validate the recognition performance of weather map images and proposes prompt
            engineering for more accurate recognition. Weather map recognition is a problem that is also featured in the Common University
            Entrance Test. If weather maps can be recognized, automatic grading and question generation become possible, leading to learning
            support. Furthermore, it is expected that weather commentary text can be automatically generated from weather maps. Therefore,
            weather map image recognition is an important task, but it requires not only recognizing time-series changes in local weather data
            but also recognizing information on large-scale weather patterns such as pressure configurations and making future predictions.
            In this study, we use ChatGPT4-Vision, a multimodal AI, to validate the recognition performance of weather map images. We
            investigate whether it can answer questions about weather maps from university entrance exams and generate weather commentary
            text from weather map images. By conducting multiple experiments with varying tasks and information in the prompts, and evalu-
            ating the accuracy of the generated commentaries, we propose and validate improvements in reading performance through prompt
            engineering."
          />
        </div>
        <div className="work-card mb-20 mt-10">
          <PublicationCard
            image="public2.png"
            title="ChatGPTによる天気図画像からの天気コメント生成の検証"
            authors="高野雄紀，渡邊正太郎，雲居玄道"
            abstract="天気予報のテキスト（天気コメント）は、気象予報士が画像化された情報を解釈し、言語化することで作成される。天気コメントの自動生成に関する従来研究には、大規模な気象場の情報を含めることと、自然な文章を生成することという2つの課題がある。本研究では、マルチモーダルAIであるChatGPT4-Visionを用いて、地上天気図画像から天気コメントの自動生成を行う。プロンプトで示すタスクや与える情報量を変化させる実験を行い、出力されたコメントの精度を検証することで、マルチモーダルAIの天気コメント生成への応用可能性を探る。-Visionを用いて、地上天気図画像から天気コメントの自動生成を行う。プロンプトで示すタスクや与える情報量を変化させる実験を行い、出力されたコメントの精度を検証することで、マルチモーダルAIの天気コメント生成への応用可能性を探る。実験の結果、プロンプトを構造化し指示を明確化することや、段階的に実行するよう指示することが有効であることがわかった。また、Few-shot learningにより、ChatGPT4-Visionが新しい概念やパターンを理解し、一般化できることが示された。本研究の成果は、国民一人ひとりにカスタマイズされた天気予報の実現に寄与すると期待される。"
          />
        </div>
      </div>
    </div>
  )
}
