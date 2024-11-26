
import { TeacherIcon } from "../Icons/NavIcon";

const StudentCardData = [
  {
    name: "Students",
    number: "5500",
    image: TeacherIcon,
  },
  {
    name: "Teacher",
    number: "550",
    image: TeacherIcon,
  },
];

const DataCard = () => {
  return (
    <div className="flex flex-wrap justify-between  ">
      {StudentCardData.map((item, index) => (
        <div
          key={index}
          className="w-64 h-18 bg-white rounded-lg shadow-lg flex items-center justify-between p-4"
        >
          <div>
            <p className="text-gray-500 font-medium">{item.name}</p>
            <p className="text-blue-600 text-3xl font-bold">{item.number}</p>
          </div>
          <div>
            <img
              src={item.image}
              alt={`${item.name} Icon`}
              className="h-12 w-12 text-blue-600"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataCard;
