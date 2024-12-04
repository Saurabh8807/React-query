
import { useState } from 'react'
import PostList from './components/PostLink'
function App() {
  // fetchPosts().then(res=>{console.log(res)})

  const [toggle,setToggle]=useState(true)

  // console.log(isLoading)
  // console.log(data)
  return (
    <>
      <div>
        <button onClick={()=>setToggle(!toggle)}>toggle</button>
        {toggle && <PostList/> }
      </div>
    </>
  )
}

export default App
