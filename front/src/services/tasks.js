import { api } from 'boot/axios'

export function getAllTasks () {
  return api.get('/tasks')
}

export function getTask (id) {
  return api.get(`/tasks/${id}`)
}

export function createTask (task) {
  return api.post('/tasks', task)
}

export function updateTask (task, id) {
  return api.put(`/tasks/${id}`, task)
}

export function deleteTask (id) {
  return api.delete(`/tasks/${id}`)
}
