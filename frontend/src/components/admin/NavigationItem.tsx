import type { NavItem } from "@/types/nav";


interface NavigationItemProps {
  item: NavItem;
  selected: boolean;
  onSelect: (itemId: string) => void;
}

const NavigationItem = ({ item, selected, onSelect }: NavigationItemProps) => {
  return (
    <li
      className={`px-10 py-3 cursor-pointer w-full rounded-full transition items-center text-left ${
        selected ? "bg-black rounded-full text-white" : "hover:bg-gray-200 text-gray-800"
      }`}
      onClick={() => onSelect(item.label  || "")}
    >
      {item.label}
    </li>
  );
};

export default NavigationItem;
