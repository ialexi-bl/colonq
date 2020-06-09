import { SocialLoginButton } from '.'
import React from 'react'

export default () => {
  return (
    <div
      style={{
        gridGap: '10px',
        display: 'grid',
        grid: 'repeat(3, auto) / 200px',
      }}
    >
      <SocialLoginButton provider={'vk'} />
      <SocialLoginButton provider={'google'} />
    </div>
  )
}
