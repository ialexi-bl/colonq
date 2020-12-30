export type InfoItemProps = HTMLProps.div & {
  label: string
}

const InfoItem = ({ label, children, ...props }: InfoItemProps) => (
  <div {...props}>
    <h2 className={'text-lg text-disabled-100'}>{label}</h2>
    <div className={'px-2 text-xl'}>{children}</div>
  </div>
)
export default InfoItem
