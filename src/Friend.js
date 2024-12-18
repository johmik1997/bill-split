export default function Friend({friend, setSelected,selectedFriend}){
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