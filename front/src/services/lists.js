import { api } from 'boot/axios'

export function getAllLists () {
  return api.get('/lists')
}

export function getList (id) {
  return api.get(`/lists/${id}`)
}

export function createList (task) {
  return api.post('/lists', task)
}

export function updateList (list) {
  return api.put(`/lists/${list.id}`, list)
}

export function deleteList (id) {
  return api.delete(`/lists/${id}`)
}
