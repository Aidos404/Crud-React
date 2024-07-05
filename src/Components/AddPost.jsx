import { useMutation, useQueryClient } from '@tanstack/react-query'
import { v4 as uuidv4 } from 'uuid'
import { createPost } from '../api/posts'
import PostForm from './PostForm'

function AddPost() {
	const queryQlient = useQueryClient()
	const createPostMutation = useMutation({
		mutationFn: createPost,
		onSuccess: () => {
			queryQlient.invalidateQueries({ queryKey: ['posts'] })
		},
	})
	const handleAddPost = (post) => {
		createPostMutation.mutate({
			id: uuidv4(),
			...post,
		})
	}
	return (
		<div>
			<h2>Add new post</h2>
			<PostForm onSubmit={handleAddPost} initialValue={{}} />
		</div>
	)
}

export default AddPost
