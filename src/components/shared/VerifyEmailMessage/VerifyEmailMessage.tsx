import { LinkButton, LinkButtonExternal } from '../Button'
import { getMailClientLink } from 'util/mail'
import { index } from 'config/routes'

export type VerifyEmailMessageProps = {
  email: string
}
export default function VerifyEmailMessage({ email }: VerifyEmailMessageProps) {
  const mailProvider = getMailClientLink(email)

  return (
    <div className={'flex flex-col justify-center'}>
      <h2 className={'text-4xl mb-4'}>Подтвеждение почты</h2>
      <p className={'leading-6 mb-8'}>
        На адрес <strong>{email}</strong> должно прийти письмо с ссылкой для
        подтверждения почты. Перейди по ней, чтобы завершить регистрацию.
      </p>
      {mailProvider && (
        <LinkButtonExternal
          className={'max-w-sm min-w-64 mx-auto'}
          variant={2}
          target={'_blank'}
          href={mailProvider.url}
        >
          Открыть {mailProvider.name}
        </LinkButtonExternal>
      )}
      <LinkButton
        className={'max-w-sm min-w-64 mx-auto'}
        to={index()}
        secondary
      >
        На главную
      </LinkButton>
    </div>
  )
}
