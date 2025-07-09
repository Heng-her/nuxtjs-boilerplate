import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const filePath = `content/products/${body.p_id}.json`
  if (!fs.existsSync(filePath)) throw createError({ statusCode: 404, statusMessage: 'Product not found' })

  fs.writeFileSync(filePath, JSON.stringify(body, null, 2))
  return { message: 'Product updated' }
})
