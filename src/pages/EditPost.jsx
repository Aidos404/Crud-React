// EditPost.js
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import PostForm from '../Components/PostForm'
import { fetchPost, updatePost } from '../api/posts'
function EditPost() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const { id } = useParams()
	const {
		isLoading,
		isError,
		data: post,
		error,
	} = useQuery({
		queryKey: ['posts', id],
		queryFn: () => fetchPost(id),
	})
	const updatedPostMutation = useMutation({
		mutationFn: updatePost,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['posts'] })
			navigate('/')
		},
	})

	if (isLoading) return 'loading...'
	if (isError) return `Error: ${error.message}`

	const handleSubmit = (updatedPost) => {
		updatedPostMutation.mutate({ id, ...updatedPost })
		console.log(updatePost)
	}
	return (
		<div>
			<PostForm onSubmit={handleSubmit} initialValue={post} />
		</div>
	)
}

export default EditPost
