import { ReactNode } from 'react'

export type TModesProps = {
  activeLanguage: string
  setActiveTime: (time: number) => void
  activeTime: number
}

export type TTabsProps = {
  tabs: string[]
  activeTabs: string[]
  onTabClick: (tab: string) => void
}

export type TTabProps = {
  children: ReactNode
  onClick: () => void
  isActive: boolean
}
