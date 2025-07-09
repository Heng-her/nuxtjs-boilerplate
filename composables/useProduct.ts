import { useFetch } from '#app'
// import { queryContent } from '@nuxt/content'

export function useProduct() {
  // Fetch all products
  const getAll = async () => {
    const { data } = await useFetch('/api/products/')
    // log data
    console.log('Fetched products:', data.value);
    return data.value || []

  }

  const insert = async (product: any) => {
    await $fetch('/api/products', {
      method: 'POST',
      body: product
    })
  }

  const update = async (product: any) => {
    await $fetch('/api/products', {
      method: 'PUT',
      body: product
    })
  }

  const remove = async (id: string) => {
    await $fetch(`/api/products/${id}`, {
      method: 'DELETE'
    })
  }

  return { getAll, insert, update, remove }
}
