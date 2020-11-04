import React from 'react'
import styles from './InfoItem.module.scss'

export type InfoItemProps = Childfree<HTMLProps.div> & {
  label: string
  value: string | null
}

// TODO: Maybe delete?
const InfoItem = ({ label, value, ...props }: InfoItemProps) => (
  <div {...props}>
    <div className={styles.Label}>{label}</div>
    <div className={'pl-2 text-xl'}>{value}</div>
  </div>
)
export default InfoItem
