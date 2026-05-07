export const addTask = async (newTask) => {
  const res = await fetch('http://127.0.0.1:3000/api/v1/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTask),
  })

  if (!res.ok) {
    throw new Error(`Failed to add task. Status: ${res.status}`)
  }

  const { data } = await res.json()
  return data
}

export const editTask = async (id, updates) => {
  const res = await fetch(`http://127.0.0.1:3000/api/v1/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  })

  if (!res.ok) {
    throw new Error(`Failed to update task. Status: ${res.status}`)
  }

  const { data } = await res.json()
  return data
}
