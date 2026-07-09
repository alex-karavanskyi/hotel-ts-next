export const normalizeCategories = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) return value.filter(Boolean)
  if (value) return [value]

  return []
}
