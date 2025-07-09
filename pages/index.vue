<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Product Manager</h1>

    <form @submit.prevent="handleSubmit" class="grid gap-2 mb-6">
      <input v-model="form.p_id" type="text" placeholder="Product ID" class="border px-3 py-2 rounded" />
      <input v-model="form.p_name" type="text" placeholder="Product Name" class="border px-3 py-2 rounded" />
      <input v-model.number="form.p_price" type="number" placeholder="Price" class="border px-3 py-2 rounded" />
      <input v-model.number="form.p_quantity" type="number" placeholder="Quantity" class="border px-3 py-2 rounded" />
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
        {{ formMode === 'create' ? 'Add Product' : 'Update Product' }}
      </button>
    </form>

    <ul v-if="products.length" class="space-y-4">
      <li v-for="product in products" :key="product.p_id" class="p-4 border rounded flex justify-between items-center">
        <div>
          <p class="font-semibold">{{ product.p_name }}</p>
          <p class="text-sm text-gray-600">Price: ${{ product.p_price }} | Qty: {{ product.p_quantity }}</p>
        </div>
        <div class="space-x-2">
          <button @click="edit(product)" class="text-blue-500">Edit</button>
          <button @click="del(product.p_id)" class="text-red-500">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useProduct } from '@/composables/useProduct'

const { getAll, insert, update, remove } = useProduct()

const products = ref<any[]>([])
const form = ref({
  p_id: '',
  p_name: '',
  p_price: 0,
  p_quantity: 0,
  created_at: '',
  deleted_at: null
})
const formMode = ref<'create' | 'edit'>('create')

const fetchData = async () => {
  products.value = (await getAll() as any[]) || []
}

const handleSubmit = async () => {
  form.value.created_at = new Date().toISOString()

  if (formMode.value === 'create') {
    await insert(form.value)
  } else {
    await update(form.value)
  }

  form.value = { p_id: '', p_name: '', p_price: 0, p_quantity: 0, created_at: '', deleted_at: null }
  formMode.value = 'create'
  await fetchData()
}

const edit = (product: any) => {
  form.value = { ...product }
  formMode.value = 'edit'
}

const del = async (id: string) => {
  await remove(id)
  await fetchData()
}

onMounted(fetchData)
</script>
