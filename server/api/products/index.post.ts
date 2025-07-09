import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const dir = 'content/products'
  const filePath = path.join(dir, `${body.p_id}.json`)

  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(filePath, JSON.stringify(body, null, 2))

  return { message: 'Product created' }
})
