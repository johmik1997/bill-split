export default function FormAddFriend({onAddfriend}){
  const[name,setName]=useState()
  const[image,setImage]=useState("https://i.pravatar.cc/48")
  function handelSubmit(e){
    e.preventDefault()
    if(!name || !image) return;
    let id=crypto.randomUUID()
    const newobj={
      name,
      image:`${image}=${id}`,
      id,
      balance:0
    }
    onAddfriend(newobj)
    setName('')
    setImage("https://i.pravatar.cc/48")
  }
return <form className="form-add-friend" onSubmit={handelSubmit}>
  <label>🍤Friend name</label>
  <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
  <label>🍤 image-URL</label>
  <input type="text" value={image} onChange={(e)=>setImage(e.target.value)}/>
  <Button>Add</Button>
</form>
}