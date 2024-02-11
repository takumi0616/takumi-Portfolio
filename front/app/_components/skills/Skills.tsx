import React, { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SkillCard from './SkillCard';
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
} from 'react-icons/si';

export default function Skills() {
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
      <h2 className="text-center text-4xl mb-20">Skills</h2>

      <div className="skillset-front w-3/5 mx-auto portrait:w-4/5">
        <div className="front w-3/5 mx-auto mb-10">
          <div className="mb-8 flex items-center">
            <div className="flex-grow border-t border-black mt-2"></div>
            <h3 className="text-center text-3xl mx-4">frontend</h3>
            <div className="flex-grow border-t border-black mt-2"></div>
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
          <div className="back w-1/3 mx-auto portrait:mb-12 portrait:w-3/5">
            <div className="mb-8 flex items-center">
              <div className="flex-grow border-t border-black mt-2"></div>
              <h3 className="text-center text-3xl mx-4">backend</h3>
              <div className="flex-grow border-t border-black mt-2"></div>
            </div>
            <div className="flex flex-wrap justify-center">
              <SkillCard Icon={SiRubyonrails} skillName="Rails" />
              <SkillCard Icon={SiPython} skillName="Python" />
            </div>
          </div>

          <div className="tools w-2/5 mx-auto  portrait:w-3/5">
            <div className="mb-8 flex items-center">
              <div className="flex-grow border-t border-black mt-2"></div>
              <h3 className="text-center text-3xl mx-4">tools</h3>
              <div className="flex-grow border-t border-black mt-2"></div>
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
  );
}
