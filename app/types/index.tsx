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
  object?: Record<string, unknown>
}

export interface PublicationCardProps {
  image: string
  title: string
  authors_label: string
  authors: string
  abstract: string
  url?: string
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

export interface AwardsProps {
  lang: string
}

export interface AwardsItemProps {
  date: string
  event: string
  index: number
  image?: string
}

export interface ResearchProps {
  lang: string
}

export interface ResearchTheme {
  title: string
  description: string
}

export interface ResearchItem {
  title: string
  authors: string
  venue: string
  year?: string
  url?: string
}

export interface ResearchGroup {
  category: string
  items: ResearchItem[]
}
