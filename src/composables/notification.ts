import { NotificationArgsProps, notification } from "antd";

export const useNotification = () => {
  const showNotification = (args: NotificationArgsProps) => {
    notification.open(args);
  };

  return { showNotification };
};
