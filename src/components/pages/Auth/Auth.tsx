import { Helmet } from 'react-helmet'
import { RouteComponentProps } from 'config/routes'
import { useEffect } from 'react'
import EmailPrompt from './EmailPrompt'
import NewPasswordPrompt from './NewPasswordPrompt'
import useAuthActionHandler from './use-auth-action-handler'

export default function Auth({ setProgress }: RouteComponentProps) {
  const action = useAuthActionHandler()

  useEffect(() => {
    if (action) setProgress(100)
  }, [action, setProgress])
  if (!action) return null

  switch (action.type) {
    case 'prompt-new-password':
    case 'prompt-reset-password':
      return <NewPasswordPrompt submit={action.submit} />
    case 'prompt-vk-email':
      return <EmailPrompt submit={action.submit} />
    default:
      return (
        <Helmet>
          <title>Авторизация</title>
        </Helmet>
      )
  }
}
