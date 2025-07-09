import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const filePath = `content/products/${id}.json`
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
    return { message: 'Product deleted' }
  } else {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }
})
