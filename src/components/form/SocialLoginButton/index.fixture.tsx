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
      <SocialLoginButton provider={'vk'} type={'register'} />
      <SocialLoginButton provider={'google'} type={'register'} />
      <h3>Disabled</h3>
      <SocialLoginButton disabled provider={'vk'} type={'register'} />
      <SocialLoginButton disabled provider={'google'} type={'register'} />
    </div>
  )
}
