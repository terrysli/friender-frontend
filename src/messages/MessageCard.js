
/** Show information about a message.
 *
 * Props:
 *  - {id, text, timestamp, from_user, to_user}
 *
 * State:
 *
 * MessageList -> MessageCard
 */

function MessageCard({ id, text, timestamp, from_user, to_user }) {
  console.debug("MessageCard", id, text, timestamp, from_user, to_user);

  return (
    <div className="MessageCard card">
      {" "}
      <div className="card-body">
        <h2 className="card-title">Message #{id}</h2>
        <p>{text}</p>
        <p>Sent by {from_user} to {to_user} at {timestamp}</p>
      </div>
    </div>
  );
}


export default MessageCard;
