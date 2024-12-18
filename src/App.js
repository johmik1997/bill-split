import { use, useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
function Button({children, onClick}){
  return <button className="button" onClick={onClick}>{children}</button>
}
export default function App() 
   {
  const[friends,setFriends]=useState(initialFriends)

  const[showAddForm,setShowAddForm]=useState(false)
  const[selectedFriend,setSelectedFriend]=useState(null)

  function handelshowAddForm(){
    setShowAddForm(show=>!show)
      }

  function handelSetfriend(friend){
    setFriends((friends)=>[...friends,friend])
     }

    function handelSelectedFriend(friend){
      setSelectedFriend((cur)=>(cur?.id===friend.id?null:friend))
      setShowAddForm(false)
    }

    function handeleSplitBill(value){
      
      setFriends((friend)=>friend.map(friend=>friend.id
        ===selectedFriend.id?
        {...friend,balance:friend.balance+value}:friend))
        setSelectedFriend(null)
    }
  
  return( <div className="app">
          <div className="sidebar">
            <FriendList friend={friends} 
            onselection={handelSelectedFriend}
            selectedFriend={selectedFriend}/>
            {showAddForm && <FormAddFriend onAddfriend={handelSetfriend}/>}
            <Button onClick={handelshowAddForm}>{showAddForm?'close':'Add-Friend'}</Button>
          </div>
          {selectedFriend  &&  <FormSplit friend={selectedFriend} onSplitBill={handeleSplitBill}/>}
      </div>);
}
function FriendList({friend,onselection,selectedFriend}){
  return <ul>
    {friend.map(friend=><Friend friend={friend} 
    setSelected={onselection}
    selectedFriend={selectedFriend} />)}
  </ul>
  

}
function Friend({friend, setSelected,selectedFriend}){
 const isSelected=selectedFriend?.id==friend.id
return <li className={isSelected?'selected':""}>
    <img src={friend.image} alt='photo'/>
    <h3>{friend.name}</h3>
    {friend.balance <0 && (<p className="red">you owe {friend.name} {friend.balance}</p>)}
    {friend.balance>0 &&(<p className="green">{friend.name} ows you {Math.abs(friend.balance)}</p>)}
    {friend.balance===0 &&(<p>you and your {friend.name} are even</p>)}
    <button className="button" onClick={()=>setSelected(friend)}>{isSelected?'close':'select'}</button>
  </li>
}
function FormAddFriend({onAddfriend}){
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
 
function FormSplit({friend,onSplitBill}){

const[bill,setBill]=useState('')
const[payedUser,setPaidUser]=useState('')
const paiedByfriend=bill? bill-payedUser:''
const[whoPay,setWhoPay]=useState("user")
function handelSubmit(e){
  e.preventDefault()
  if(!bill||!payedUser)return; 

onSplitBill(whoPay==='user'?paiedByfriend:-payedUser)

}
  return (<form className="form-split-bill " onSubmit={handelSubmit}>
    <h2>Split A Bill with {friend.name}</h2>

<label>💰 Bill Value</label>
<input
  type="text"
  value={bill}
  onChange={(e) => setBill(e.target.value)}
/>

<label>🫰 Your Expense</label>
<input
  type="text"
  value={payedUser}
  onChange={(e) => setPaidUser(Number(e.target.value)>bill?payedUser:e.target.value)}
/>

<label>🧛 {friend.name}'s Expense</label>
<input type="text" disabled value={paiedByfriend}/>

<label>😆 Who will pay the bill?</label>
<select value={whoPay} onChange={(e) => setWhoPay(e.target.value)}>
  <option value="user">You</option>
  <option value="friend">{friend.name}</option>
</select>

<Button type="submit">Split Bill</Button>
</form>
);
}
 