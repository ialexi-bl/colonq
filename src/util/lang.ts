export function decline(n: number, variants: [string, string, string]) {
  if (~~(n / 10) % 10 !== 1) {
    switch (n % 10) {
      case 1:
        return variants[0]
      case 2:
      case 3:
      case 4:
        return variants[1]
    }
  }
  return variants[2]
}
