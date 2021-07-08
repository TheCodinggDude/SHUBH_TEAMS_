import React, {useState, useEffect} from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
 
import './ConversationList.css';
import { LocalSeeSharp } from '@material-ui/icons';
import {baseUrl} from '../../shared/basUrl'

export default function ConversationList(props) {
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    getConversations()
  },[])

 const getConversations = () => {
    const myHeader = new Headers();
    myHeader.append('Accept', 'application/json');
    myHeader.append('Content-Type', 'application/json');
    myHeader.append('Authorization', 'bearer '+ localStorage.getItem("token"));

    fetch(baseUrl+'groups', {
      method: 'GET',
      headers: myHeader
    })
    .then(response => response.json())
    .then(response => {
      console.log("RESPONSE",response);
        let newConversations = response.map(result => {
          console.log(result);
          return {
            name: `${result}`,
            text: "This is a long text and can be truncated"
          };
        });
        console.log(newConversations);
        setConversations([...conversations, ...newConversations])
    });
  }

    return (
      <div className="conversation-list">
        <Toolbar
          title="Messenger"
          leftItems={[
            <ToolbarButton key="cog" icon="ion-ios-cog" />
          ]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          ]}
        />
        <ConversationSearch />
        {
          conversations.map(conversation =>
            <ConversationListItem
              key={conversation.name}
              data={conversation}
            />
          )
        }
      </div>
    );
}