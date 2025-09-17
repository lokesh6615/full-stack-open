import { useState } from 'react'
const BlobForm = ({ createNew }) => {
  const [formData, setFormData] = useState({})

  const handleFormSubmit = (e) => {
    e.preventDefault()
    createNew(formData, setFormData)
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>
            title:
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value })
              }}
              placeholder="enter title..."
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input
              type="text"
              value={formData.author || ''}
              onChange={(e) => {
                setFormData({ ...formData, author: e.target.value })
              }}
              placeholder="enter author name..."
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              type="text"
              value={formData.url || ''}
              onChange={(e) => {
                setFormData({ ...formData, url: e.target.value })
              }}
              placeholder="enter url..."
            />
          </label>
        </div>
        <br />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlobForm
