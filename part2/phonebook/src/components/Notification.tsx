const Notification = ({
  message,
  notificationStyle,
}: {
  message: string | null;
  notificationStyle: string;
}) => {
  if (message === null) {
    return null;
  }

  return <div className={notificationStyle}>{message}</div>;
};

export default Notification;
