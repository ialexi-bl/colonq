import Button from 'components/shared/Button'

const onClick = () => alert("I'm working")

export default () => (
  <div
    style={{
      display: 'grid',
      padding: '2rem',
      grid: 'repeat(6, auto) / 200px',
      gridGap: '1rem',
    }}
  >
    <Button variant={1} onClick={onClick}>
      Primary variant 1
    </Button>
    <Button variant={2} onClick={onClick}>
      Primary variant 2
    </Button>
    <Button variant={3} onClick={onClick}>
      Primary variant 3
    </Button>
    <Button variant={1} onClick={onClick} secondary>
      Secondary variant 1
    </Button>
    <Button variant={2} onClick={onClick} secondary>
      Secondary variant 2
    </Button>
    <Button variant={3} onClick={onClick} secondary>
      Secondary variant 3
    </Button>
  </div>
)
