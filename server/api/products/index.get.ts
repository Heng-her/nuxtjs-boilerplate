import fs from 'fs'
import path from 'path'

export default defineEventHandler(() => {
  const dir = path.resolve('content/products')
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir)
  const products = files
    .filter(file => file.endsWith('.json'))
    .map(file => {
      const filePath = path.join(dir, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      return JSON.parse(content)
    })

  return products
})
