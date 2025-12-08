import type { ComponentType } from "react";

type DetailProps = {
  icon: ComponentType<{ className?: string }>,
  heading: string,
  subheading: string
}

const Detail = ({ icon: Icon, heading, subheading }: DetailProps) => {
  return (
    <div className="flex flex-col justify-center items-center text-center px-2">
      <Icon className="text-xl sm:text-2xl mb-1 sm:mb-2" />
      <h2 className="text-sm sm:text-lg font-bold">{heading}</h2>
      <p className="text-xs sm:text-sm text-gray-500">{subheading}</p>
    </div>
  );
};

export default Detail;
