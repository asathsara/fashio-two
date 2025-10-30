type SizeSelectorProps = {
  selectedSizes: string[],
  onSizeToggle: (size: string) => void,

}

const AVAILABLE_SIZES = ["S", "M", "L", "XL", "XXL"] as const

const SizeSelector = ({ selectedSizes, onSizeToggle }: SizeSelectorProps) => (
  <div className="flex space-x-4 mt-2">
    {AVAILABLE_SIZES.map((size) => (
      <div
        key={size}
        onClick={() => onSizeToggle(size)}
        className={`cursor-pointer w-12 h-12 flex items-center justify-center border-2 rounded-md ${
          selectedSizes.includes(size)
            ? "bg-gray-500 text-white"
            : "bg-white text-gray-700"
        }`}
      >
        {size}
      </div>
    ))}
  </div>
);

export default SizeSelector;
