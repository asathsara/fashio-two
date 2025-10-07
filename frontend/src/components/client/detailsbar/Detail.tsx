import type { ComponentType } from "react";

type DetailProps = {
  icon: ComponentType<{className? : string}>,
  heading: string,
  subheading: string
}

const Detail = ({ icon: Icon, heading, subheading }: DetailProps) => {
  return (
    <div className="flex flex-col justify-center items-center font-poppins">
      <Icon className="text-2xl mb-2" /> {/* Render the icon here */}
      <h2 className="text-lg font-bold">{heading}</h2>
      <p className="text-sm text-gray-500">{subheading}</p>
    </div>
  );
};

export default Detail;
