import  { useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa";

const FloatingUpButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {isVisible && (
        <FaAngleUp
          className="fixed bottom-4 right-4 bg-gray-700 hover:bg-gray-800 text-white rounded-md w-12 h-12 flex items-center justify-center shadow-xl p-4 cursor-pointer"
          onClick={scrollToTop}
        />
      )}
    </div>
  );
};

export default FloatingUpButton;
