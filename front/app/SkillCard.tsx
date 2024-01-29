import React, { FC } from 'react';

type SkillCardProps = {
  Icon: React.ElementType;
  skillName: string;
};

const SkillCard: FC<SkillCardProps> = ({ Icon, skillName }) => {
  return (
    <div className="flex flex-col items-center">
      <Icon className="text-6xl" />
      <span className="mt-2">{skillName}</span>
    </div>
  );
};

export default SkillCard;
