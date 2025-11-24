import ImageUploader from "../../components/admin/ImageUploader";
import ImageCard from "../../components/admin/ImageCard";
import { useImages, useUploadImage, useDeleteImage } from "@/hooks/useImages";
import { Spinner } from "@/components/common/Spinner";

const ImageSliderManager = () => {
  const { data: images = [], error } = useImages();

  const uploadMutation = useUploadImage();
  const deleteMutation = useDeleteImage();

  const isLoading = uploadMutation.isPending || deleteMutation.isPending;

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    uploadMutation.mutate(formData)
  };

  const handleDelete = async (id: string) => {

    deleteMutation.mutate(id)
  };

  return (
    <div>
      <h1 className="font-poppins text-3xl font-semibold">Images for Slider</h1>
      <p className="text-gray-600">Manage your slider images by uploading new ones or deleting existing ones below.</p>
      <ImageUploader onUpload={handleUpload} />
      {error && <p className="text-red-500">{error.message}</p>}
      <div className="flex flex-wrap">
        {images.map((image) => (
          <ImageCard
            key={image._id}
            image={image}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Full-page Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <Spinner fullHeight />
        </div>
      )}
    </div>
  );
};

export default ImageSliderManager;
