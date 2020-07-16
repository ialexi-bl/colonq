import React from 'react'
import SocialLoginButton from './SocialLoginButton'

export default () => {
  return (
    <div
      style={{
        gridGap: '10px',
        display: 'grid',
        grid: 'repeat(8, auto) / 300px',
      }}
    >
      <SocialLoginButton provider={'vk'} />
      <SocialLoginButton provider={'google'} />
      <h3>Disabled</h3>
      <SocialLoginButton disabled provider={'vk'} />
      <SocialLoginButton disabled provider={'google'} />
    </div>
  )
}
