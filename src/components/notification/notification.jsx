import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeNotification } from '@/state/slices/notificationSlice';
import { toast } from 'sonner';

export const Notification = () => {
  const dispatch = useDispatch();
  const {notifications} = useSelector((state) => state.notification);

  useEffect(() => {
    notifications.forEach(({ id, type, message }) => {
      if (!toast[type]) return;
      
      toast[type](message, {
        id,
        onDismiss: () => dispatch(removeNotification(id)),
      });
    });
  }, [notifications]);

  return null;
}