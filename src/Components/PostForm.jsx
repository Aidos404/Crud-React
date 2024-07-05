import { useState } from 'react'

function PostForm({ onSubmit, initialValue }) {
	const [post, setPost] = useState({
		title: initialValue.title || '',
		body: initialValue.body || '',
	})
	const inputHandler = (e) => {
		setPost({
			...post,
			[e.target.name]: e.target.value,
		})
	}
	const handleSubmit = (event) => {
		event.preventDefault()
		onSubmit(post)
		setPost({
			title: '',
			body: '',
		})
	}
	const renderField = (label) => (
		<div>
			<label htmlFor=''>{label}</label>
			<input
				className='bg-transparent'
				type='text'
				onChange={inputHandler}
				name={label.toLowerCase()}
				value={post[label.toLowerCase()]}
			/>
		</div>
	)
	return (
		<form className='bg-red-700' action='' onSubmit={handleSubmit}>
			{renderField('Title')}
			{renderField('Body')}
			<button type='submit'>Submit</button>
		</form>
	)
}

export default PostForm
