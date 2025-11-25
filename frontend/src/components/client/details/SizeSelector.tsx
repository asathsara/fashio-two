interface SizeSelectorProps {
    sizes: string[];
    selectedSize: string;
    onSizeSelect: (size: string) => void;
}

export const SizeSelector = ({ sizes, selectedSize, onSizeSelect }: SizeSelectorProps) => {
    if (!sizes || sizes.length === 0) return null;

    return (
        <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Select Size</label>
            <div className="flex flex-wrap gap-2">
                {sizes.map((size: string) => (
                    <button
                        key={size}
                        onClick={() => onSizeSelect(size)}
                        className={`px-4 py-2 border rounded-md font-medium transition-all ${selectedSize === size
                                ? 'bg-black text-white border-black'
                                : 'bg-white text-gray-900 border-gray-300 hover:border-gray-900'
                            }`}
                        aria-label={`Select size ${size}`}
                    >
                        {size}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SizeSelector;
