import React, { useState, useEffect } from "react";
import FrienderApi from "../api";
import MessageCard from "../messages/MessageCard";

/** Show list of MessageCards.
 *
 * Props:
 *  - messages: [{id, text, timestamp, from_user, to_user}, ...]
 *
 * State: none
 *
 * [RoutesList, NavBar] -> MessageList -> MessageCard
 */

function MessageList() {
  const [messages, setFriends] = useState([]);
  console.debug("MessageList", messages);

  useEffect(function getMessagesOnMount() {
    async function getMessages() {
      const messagesResults = await FrienderApi.getMessagesOfUser("jdawg");
      console.log("friendsResults:", messagesResults);
      setFriends(messagesResults);
    }
    getMessages();
  }, [])

  return (
    <div className="MessageList col-md-8 offset-md-2">
      {messages.length
        ? (
          <div className="MessageList-list">
            {messages.map(m => (
              <MessageCard
                key={m.id}
                id={m.id}
                text={m.text}
                timestamp={m.timestamp}
                from_user={m.from_user}
                to_user={m.to_user}
              />
            ))}
          </div>
        ) : (
          <p className="lead">Sorry, no messages to list!</p>
        )}
    </div>
  );
}

export default MessageList;
