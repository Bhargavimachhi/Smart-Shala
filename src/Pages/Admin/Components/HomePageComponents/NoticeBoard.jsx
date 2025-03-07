import React from "react";

const NoticeBoard = () => {
  const NoticeBoardData = [
    {
      Icon: "📢",
      Name: "Hackathon Registration Deadline",
      Description:
        "The last date for registration for the Smart India Hackathon (SIH) 2024 is 30th November. Make sure to complete all your submissions before the deadline.",
      Date: "2024-11-18",
    },
    {
      Icon: "📅",
      Name: "Team Meeting Schedule",
      Description:
        "Our next team meeting is scheduled for 20th November at 10:00 AM. We will be discussing our project milestones and next steps.",
      Date: "2024-11-19",
    },
    {
      Icon: "📝",
      Name: "Code Submission Reminder",
      Description:
        "All code submissions for the first phase of the project are due on 25th November. Ensure that everything is tested and working before submission.",
      Date: "2024-11-20",
    },
    {
      Icon: "🔔",
      Name: "Workshop on Machine Learning",
      Description:
        'A workshop on "Introduction to Machine Learning" will be held on 22nd November. It’s a great opportunity to learn about ML algorithms and their applications.',
      Date: "2024-11-22",
    },
    {
      Icon: "💡",
      Name: "Idea Pitching Session",
      Description:
        "We will be hosting an Idea Pitching session on 26th November for the SIH. Everyone is encouraged to present their innovative ideas.",
      Date: "2024-11-26",
    },
  ];

  const NoticeBoardCard = ({ Icon, Name, Description, Date }) => {
    const truncateText = (text, wordLimit) => {
      const words = text.split(" ");
      return words.length > wordLimit
        ? words.slice(0, wordLimit).join(" ") + "..."
        : text;
    };
    return (
      <div className="flex items-center justify-between w-full p-4 mb-2 bg-white border rounded-lg shadow-lg border-text">
        {/* Left Section: Icon and Title */}
        <div className="flex items-center">
          <div className="flex items-center justify-center w-12 h-12 text-white bg-blue-500 rounded-md">
            <span className="text-2xl">{Icon}</span>{" "}
            {/* Replace with an icon */}
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-bold text-black">{Name}</h2>
            <div className="h-5 overflow-hidden w-80">
              <p className="text-sm text-gray-500 truncate">{Description}</p>
            </div>
          </div>
        </div>

        {/* Right Section: Date and More Options */}
        <div className="flex items-center space-x-2">
          <div className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-md">
            {Date}
          </div>
          <div className="text-lg text-black">
            <span>•••</span> {/* More options icon */}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <h1 className="text-xl font-bold text-black">NoticeBoard</h1>
      <div
        className="w-full h-56 p-2 mt-2 overflow-y-auto text-black border rounded-lg shadow-md no-scrollbar border-btn"
        id="NoticeBoard-container"
      >
        {NoticeBoardData.map((notice, index) => (
          <NoticeBoardCard
            key={index}
            Icon={notice.Icon}
            Name={notice.Name}
            Description={notice.Description}
            Date={notice.Date}
          />
        ))}
      </div>
    </>
  );
};

export default NoticeBoard;
