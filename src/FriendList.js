import Friend from "./Friend"
export default function FriendList({friend,onselection,selectedFriend}){
    return <ul>
      {friend.map(friend=><Friend friend={friend} 
      setSelected={onselection}
      selectedFriend={selectedFriend} />)}
    </ul>
    
  
  }