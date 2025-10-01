import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    inputProps: {
      type,
      value,
      onChange,
    },
    reset,
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const getAll = async () => {
      const response = await axios.get(baseUrl)
      return setResources(response.data)
    }
    getAll()
  }, [])

  const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject)
    setResources(resources.concat(response.data))
    return response.data
  }

  const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    setResources(
      resources.map((r) => (r.id === id ? response.data : r)) // ✅ update state
    )
    return response.data
  }

  const service = {
    create,
    update,
  }

  return [resources, service]
}
