import React, { FC } from 'react'

type SkillCardProps = {
  Icon: React.ElementType
  skillName: string
}

const SkillCard: FC<SkillCardProps> = ({ Icon, skillName }) => {
  return (
    <div className="mx-3 mt-4 flex flex-col items-center">
      <Icon className="text-6xl" />
      <h4 className="mt-1">{skillName}</h4>
    </div>
  )
}

export default SkillCard