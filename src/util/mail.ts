type EmailProvider = {
  domain: RegExp
  name: string
  url: string
}
const knownDomains: EmailProvider[] = [
  { domain: /yandex/, name: 'Яндекс', url: 'https://mail.yandex.com/' },
  { domain: /mail\.ru/, name: 'Mail.ru', url: 'https://e.mail.ru/' },
  { domain: /yahoo|rocketmail/, name: 'Yahoo', url: 'https://mail.yahoo.com/' },
  {
    domain: /gmail/,
    name: 'Gmail',
    url: 'https://mail.google.com/',
  },
  {
    domain: /outlook|hotmail|live/,
    name: 'Outlook',
    url: 'https://outlook.live.com/',
  },
]

/**
 * Tries to infer email provider and return a link to its site
 * @param email
 */
export function getMailClientLink(
  email: string,
): { name: string; url: string } | null {
  const parts = email.trim().toLowerCase().split('@')
  const domain = parts[parts.length - 1]

  return knownDomains.find((x) => x.domain.test(domain)) || null
}
