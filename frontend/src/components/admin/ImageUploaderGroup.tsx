import ImageUploaderSolid from "./ImageUploaderSolid";

interface ExistingImage {
  index: number;
  url: string;
}

type ImageUploaderGroupProps = {
  existingImages?: ExistingImage[];
  newImages?: File[];
  onImageChange: (file: File) => void;
  onRemoveExisting?: (index: number) => void;
  onRemoveNew?: (index: number) => void;
  maxImages?: number;
};

const ImageUploaderGroup = ({
  existingImages = [],
  newImages = [],
  onImageChange,
  onRemoveExisting,
  onRemoveNew,
  maxImages = 4
}: ImageUploaderGroupProps) => {

  const totalImages = existingImages.length + newImages.length;
  const emptySlots = Math.max(0, maxImages - totalImages);

  // Create array for all slots
  type SlotType =
    | { type: 'existing'; data: ExistingImage }
    | { type: 'new'; data: { file: File; index: number } }
    | { type: 'empty'; data: null };

  const allSlots: SlotType[] = [];

  // Add existing images
  existingImages.forEach((img) => {
    allSlots.push({
      type: 'existing',
      data: img,
    });
  });

  // Add new images
  newImages.forEach((file, index) => {
    allSlots.push({
      type: 'new',
      data: { file, index },
    });
  });

  // Add empty slots
  for (let i = 0; i < emptySlots; i++) {
    allSlots.push({
      type: 'empty',
      data: null,
    });
  }

  const renderSlot = (slot: SlotType, slotIndex: number) => {
    if (slot.type === 'existing') {
      const img = slot.data as ExistingImage;
      return (
        <ImageUploaderSolid
          key={`existing-${img.index}`}
          initialImageUrl={img.url}
          imageType="existing"
          onImageChange={() => { }}
          onRemove={() => onRemoveExisting?.(img.index)}
        />
      );
    }

    if (slot.type === 'new') {
      const { file, index } = slot.data as { file: File; index: number };
      const previewUrl = URL.createObjectURL(file);
      return (
        <ImageUploaderSolid
          key={`new-${index}-${file.name}`}
          initialImageUrl={previewUrl}
          imageType="new"
          onImageChange={() => { }}
          onRemove={() => onRemoveNew?.(index)}
        />
      );
    }

    // Empty slot
    return (
      <ImageUploaderSolid
        key={`empty-${slotIndex}`}
        onImageChange={(file) => {
          if (file) onImageChange(file);
        }}
      />
    );
  };

  // First slot
  const firstSlot = allSlots[0];

  // Remaining slots (3 slots in a row)
  const remainingSlots = allSlots.slice(1, 4);

  return (
    <div className="flex flex-col mr-4">
      {/* First Image Uploader */}
      {firstSlot && renderSlot(firstSlot, 0)}

      {/* Row of Three Image Uploaders */}
      <div className="flex flex-row mt-4">
        {remainingSlots.map((slot, index) => (
          <div key={index} className={`flex-1 ${index > 0 ? "ml-4" : ""}`}>
            {renderSlot(slot, index + 1)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploaderGroup;
