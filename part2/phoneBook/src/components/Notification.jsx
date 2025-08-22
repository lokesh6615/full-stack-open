const Notification = ({ message }) => {
  if (message === null) return null;
  return (
    <div>
      <h3 className="success">{message}</h3>
    </div>
  );
};

export default Notification;
