import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import AddPost from '../Components/AddPost'
import { deletePost, fetchPosts } from '../api/posts'

function PostLists() {
	const navigate = useNavigate()
	const quertyClient = useQueryClient()
	const deletePostMutation = useMutation({
		mutationFn: deletePost,
		onSuccess: () => {
			quertyClient.invalidateQueries({ queryKey: ['posts'] })
		},
	})
	const {
		isLoading,
		isError,
		data: posts,
		error,
	} = useQuery({
		queryKey: ['posts'],
		queryFn: fetchPosts,
	})
	if (isLoading) return 'Loading...'
	if (isError) return `Error ${error.message}`

	const handleDelete = (id) => {
		deletePostMutation.mutate(id)
	}

	return (
		<div>
			<AddPost />
			{posts.map((post) => (
				<div key={post.id} className='bg-red-700 max-w-60 p-10 m-10 '>
					<h4
						style={{ cursor: 'pointer' }}
						onClick={() => navigate(`/post/${post.id}`)}>
						{post.title}
					</h4>
					<p>{post.body}</p>
					<button
						onClick={() => navigate(`/post/${post.id}/edit`)}
						className='p-3 bg-blue-600 rounded-lg text-center mr-4'>
						Edit
					</button>
					<button
						onClick={() => handleDelete(post.id)}
						className='p-3 bg-blue-600 rounded-lg text-center'>
						Delete
					</button>
				</div>
			))}
		</div>
	)
}

export default PostLists
