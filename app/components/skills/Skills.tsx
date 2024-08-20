import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiRubyonrails,
  SiPython,
  SiGithub,
  SiFigma,
  SiGit,
  SiPrisma,
} from 'react-icons/si'
import SkillCard from './SkillCard'

export default function Skills() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    function updateAnimations() {
      const skillSets = gsap.utils.toArray<Element>(
        '.skillset-front, .skillsets',
      )
      skillSets.forEach((set) => {
        gsap.fromTo(
          set,
          { autoAlpha: 0, y: 50 },
          {
            duration: 1,
            autoAlpha: 1,
            y: 0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: set,
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
    <div className="mb-60">
      <h2 className="mb-20 text-center text-4xl">Skills</h2>

      <div className="skillset-front mx-auto w-3/5 portrait:w-4/5">
        <div className="front mx-auto mb-10 w-3/5">
          <div className="mb-8 flex items-center">
            <div className="mt-2 grow border-t border-black"></div>
            <h3 className="mx-4 text-center text-3xl">frontend</h3>
            <div className="mt-2 grow border-t border-black"></div>
          </div>
          <div className="flex flex-wrap justify-center">
            <SkillCard Icon={SiJavascript} skillName="JavaScript" />
            <SkillCard Icon={SiTypescript} skillName="TypeScript" />
            <SkillCard Icon={SiReact} skillName="React" />
            <SkillCard Icon={SiNextdotjs} skillName="Next" />
            <SkillCard Icon={SiVuedotjs} skillName="Vue" />
          </div>
        </div>

        <div className="skillsets flex justify-center portrait:flex-col">
          <div className="back mx-auto w-1/3 portrait:mb-12 portrait:w-3/5">
            <div className="mb-8 flex items-center">
              <div className="mt-2 grow border-t border-black"></div>
              <h3 className="mx-4 text-center text-3xl">backend</h3>
              <div className="mt-2 grow border-t border-black"></div>
            </div>
            <div className="flex flex-wrap justify-center">
              <SkillCard Icon={SiRubyonrails} skillName="Rails" />
              <SkillCard Icon={SiPython} skillName="Python" />
              <SkillCard Icon={SiPrisma} skillName="Prisma" />
            </div>
          </div>

          <div className="tools mx-auto w-2/5  portrait:w-3/5">
            <div className="mb-8 flex items-center">
              <div className="mt-2 grow border-t border-black"></div>
              <h3 className="mx-4 text-center text-3xl">tools</h3>
              <div className="mt-2 grow border-t border-black"></div>
            </div>
            <div className="flex flex-wrap justify-center">
              <SkillCard Icon={SiGithub} skillName="Github" />
              <SkillCard Icon={SiFigma} skillName="Figma" />
              <SkillCard Icon={SiGit} skillName="Git" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
