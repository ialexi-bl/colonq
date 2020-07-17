import React from 'react'
import styles from './InfoItem.module.scss'

export type InfoItemProps = Childfree<HTMLProps.div> & {
  label: string
  value: string | null
}

const InfoItem = ({ label, value, ...props }: InfoItemProps) => (
  <div {...props}>
    <div className={styles.Label}>{label}</div>
    <div className={'font-2'}>{value}</div>
  </div>
)
export default InfoItem
