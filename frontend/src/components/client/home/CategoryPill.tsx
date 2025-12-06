interface CategoryPillProps {
    label: string;
    active: boolean;
    onClick: () => void;
}

export const CategoryPill = ({ label, active, onClick }: CategoryPillProps) => (
    <button
        type="button"
        onClick={onClick}
        className={`text-sm sm:text-base font-semibold font-poppins border-2 px-4 sm:px-8 py-2 sm:py-3 rounded-full transition-colors duration-200 ${active
            ? "bg-navbar-gray text-white border-navbar-gray shadow-sm"
            : "text-navbar-gray border-navbar-gray/50 hover:border-navbar-gray"
            }`}
        aria-pressed={active}
    >
        {label}
    </button>
);
