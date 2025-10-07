import { useNotificationValue } from './NotificationContext'
const Notification = () => {
  const notificationValue = useNotificationValue()
  if (!notificationValue) return null

  return <div>{notificationValue}</div>
}

export default Notification
