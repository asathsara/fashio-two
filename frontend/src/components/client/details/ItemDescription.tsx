interface ItemDescriptionProps {
    description?: string;
}

export const ItemDescription = ({ description }: ItemDescriptionProps) => {
    if (!description) return null;

    return (
        <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">Description</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
    );
};

export default ItemDescription;
