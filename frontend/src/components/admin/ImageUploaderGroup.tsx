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
  const canAddMore = totalImages < maxImages;

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

  // Add ONE empty slot at the end if we can add more images
  if (canAddMore) {
    allSlots.push({
      type: 'empty',
      data: null,
    });
  }

  const renderSlot = (slot: SlotType) => {
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

    // Empty slot - only one will exist at the end
    return (
      <ImageUploaderSolid
        key="empty-slot"
        onImageChange={(file) => {
          if (file) onImageChange(file);
        }}
      />
    );
  };

  // If we have at least one slot, show first one separately
  const hasFirstSlot = allSlots.length > 0;
  const firstSlot = hasFirstSlot ? allSlots[0] : null;
  const remainingSlots = allSlots.slice(1);

  return (
    <div className="flex flex-col mr-4">
      {/* First Image Uploader - always show if we have any slots */}
      {firstSlot && renderSlot(firstSlot)}

      {/* Row of remaining Image Uploaders - up to 3 */}
      {remainingSlots.length > 0 && (
        <div className="flex flex-row mt-4 gap-4">
          {remainingSlots.map((slot, index) => (
            <div key={index} className="flex-1">
              {renderSlot(slot)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploaderGroup;
