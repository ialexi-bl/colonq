export type InfoItemProps = HTMLProps.div & {
  label: string
}

const InfoItem = ({ label, children, ...props }: InfoItemProps) => (
  <div {...props}>
    <div className={'text-lg text-disabled-100'}>{label}</div>
    <div className={'px-2 text-xl'}>{children}</div>
  </div>
)
export default InfoItem
