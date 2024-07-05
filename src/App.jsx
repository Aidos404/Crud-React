import { Route, Routes } from 'react-router-dom'
import EditPost from './pages/EditPost'
import Post from './pages/Post'
import PostLists from './pages/PostLists'
function App() {
	return (
		<>
			<h1>CRUD operation</h1>
			<Routes>
				<Route path='/' Component={PostLists} />
				<Route path='/post/:id' Component={Post} />
				<Route path='/post/:id/edit' Component={EditPost} />
			</Routes>
		</>
	)
}

export default App
