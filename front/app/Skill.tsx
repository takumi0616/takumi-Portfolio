import React, { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SkillCard from './SkillCard'; // SkillCard コンポーネントをインポート
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
} from 'react-icons/si'; // フロント
import { SiRubyonrails, SiPython } from 'react-icons/si'; // バック
import { SiGithub, SiFigma, SiGit } from 'react-icons/si'; // ツール

export default function Skill() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    function updateAnimations() {
      const skillSets = gsap.utils.toArray<Element>(
        '.skillset-front, .skillsets'
      );
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
              end: 'bottom top',
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
    <div className="mb-60">
      <div className="mb-20">
        <h2 className="text-center text-4xl">Skill</h2>
      </div>

      <div className="skillset-front w-3/5 mx-auto portrait:w-4/5">
        <div className="front w-3/5 mx-auto mb-12">
          <div className="mb-10 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <h3 className="text-center text-3xl mx-4">frontend</h3>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="flex justify-center space-x-8">
            <SkillCard Icon={SiJavascript} skillName="JavaScript" />
            <SkillCard Icon={SiTypescript} skillName="TypeScript" />
            <SkillCard Icon={SiReact} skillName="React" />
            <SkillCard Icon={SiNextdotjs} skillName="Next" />
            <SkillCard Icon={SiVuedotjs} skillName="Vue" />
          </div>
        </div>

        <div className="skillsets flex justify-center portrait:flex-col">
          <div className="back w-1/3 mx-auto portrait:mb-12">
            <div className="mb-10 flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <h3 className="text-center text-3xl mx-4">backend</h3>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <div className="flex justify-center space-x-8">
              <SkillCard Icon={SiRubyonrails} skillName="Ruby on Rails" />
              <SkillCard Icon={SiPython} skillName="Python" />
            </div>
          </div>

          <div className="tools w-2/5 mx-auto">
            <div className="mb-10 flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <h3 className="text-center text-3xl mx-4">tools</h3>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <div className="flex justify-center space-x-8">
              <SkillCard Icon={SiGithub} skillName="Github" />
              <SkillCard Icon={SiFigma} skillName="Figma" />
              <SkillCard Icon={SiGit} skillName="Git" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
