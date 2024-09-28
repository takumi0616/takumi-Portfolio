export interface ActivityProps {
  lang: string
}

export interface ActivityItemProps {
  date: string
  event: string
}

export interface ContactCardProps {
  Icon: React.ElementType
  contactName: string
  link: string
}

export interface MainCubeProps {
  className?: string
  onResize: (width: number, height: number) => void
}

export interface BackProps {
  object: any
}

export interface PublicationCardProps {
  image: string
  title: string
  authors_label: string
  authors: string
  abstract: string
}

export interface PublicationsProps {
  lang: string
}

export interface SkillCardProps {
  Icon: React.ElementType
  skillName: string
}

export interface WorkCardProps {
  image: string
  title: string
  description: string
  myPart: string
  gitHubUrl: string
  onOpenModal: (work: Omit<WorkCardProps, 'onOpenModal'>) => void
}

export interface WorkModalProps {
  title: string
  image: string
  onClose: () => void
}

export interface WorksProps {
  lang: string
  onOpenModal: (work: Omit<WorkCardProps, 'onOpenModal'>) => void
}
