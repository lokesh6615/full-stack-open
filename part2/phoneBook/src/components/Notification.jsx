const Notification = ({ message }) => {
  if (Object.keys(message).length === 0) return null;
  else if (message.type == "success")
    return (
      <div>
        <h3 className="success">{message.message}</h3>
      </div>
    );
  else
    return (
      <div>
        <h3 className="fail">{message.message}</h3>
      </div>
    );
};

export default Notification;
