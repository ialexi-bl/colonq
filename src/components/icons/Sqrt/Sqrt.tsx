export type SqrtIconProps = HTMLProps.svg
export default function SqrtIcon({ children, ...props }: SqrtIconProps) {
  return (
    <svg viewBox={'0 0 96 96'} fill={'currentColor'} {...props}>
      <path
        d={
          'M4.5 54.5783L1 52.2609L10.0282 41.913L19 68.5L30 6H93.9379L96 15.6145L34.8559 12.6957L20.774 90L9.5 51.0361L4.5 54.5783Z'
        }
      />
      <path
        d={
          'M4 57L1 52.2609L10.0282 41.913L18.5 66.5L30 6H93.9379L96 15.6145L34.8559 12.6957L20.774 90L8.5 54.5783L4 57Z'
        }
      />

      <foreignObject
        x={'35'}
        y={'15'}
        width={'50'}
        height={'80'}
        fontSize={'65'}
        className={'text-center'}
        style={{ lineHeight: 1 }}
      >
        {children}
        <span></span>
      </foreignObject>
    </svg>
  )
}
