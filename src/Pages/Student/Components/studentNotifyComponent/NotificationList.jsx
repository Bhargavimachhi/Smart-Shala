import React from "react";
import NotificationCard from "./NotificationCard";

const NotificationList = ({ notifications }) => {
  return (
    <div className="h-full overflow-y-auto">
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            title={notification.title}
            description={notification.description}
            time={notification.time}
          />
        ))
      ) : (
        <p className="text-gray-500">No notifications available.</p>
      )}
    </div>
  );
};

export default NotificationList;
