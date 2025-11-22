# Item Image Management - How It Works

This document explains how the item image management system works for creating and updating items with images.

---

## Overview

The system handles two types of images:
- **Existing Images**: Images already stored in the database (only in edit mode)
- **New Images**: Newly uploaded images from the user

---

## Insert Mode (Creating New Items)

### How it works:
1. User uploads 1-4 images using the image uploader
2. All uploaded images are stored as `File` objects in the `newImages` state
3. Form validation requires at least 1 image
4. On submit:
   - All images are sent to the backend via `FormData`
   - Backend saves all images with the new item

### User Experience:
- ✅ Upload images by clicking or dragging
- ✅ Remove uploaded images before submitting
- ✅ Form won't submit without at least 1 image
- ✅ See preview of uploaded images with "NEW" badge

---

## Edit Mode (Updating Existing Items)

### How it works:

#### 1. **Loading Existing Images**
- When item loads, existing images are fetched from the database
- Images are displayed with URLs like: `/items/{itemId}/image/{index}`
- Each image has an index (0, 1, 2, 3)

#### 2. **State Management**
Three separate states track images:
```typescript
existingImages: [         // All existing images from DB
  { index: 0, url: "..." },
  { index: 2, url: "..." }
]

newImages: [File]         // Newly uploaded files

remainingExistingImages: [0, 2]  // Indexes of images to keep
```

#### 3. **Removing Existing Images**
- User clicks remove button on an existing image
- Image index is removed from `remainingExistingImages` array
- Image is filtered from display immediately
- Example: If user removes image at index 1:
  ```typescript
  remainingExistingImages: [0, 2, 3] → [0, 2, 3]  // 1 removed
  ```

#### 4. **Adding New Images**
- User uploads new images in empty slots
- New images are added to `newImages` array
- New images show "NEW" badge

#### 5. **Removing New Images**
- User clicks remove on a new image
- Image is removed from `newImages` array by index
- Slot becomes available for new upload

#### 6. **Validation**
- Total images = `remainingExistingImages.length + newImages.length`
- Must have at least 1 image total
- Update button is disabled if no images remain

#### 7. **Submitting Changes**
When user clicks "Update Item":
```typescript
FormData contains:
- images: [new File objects]           // Only new uploads
- remainingImages: "[0, 2]"            // JSON array of indexes to keep
- name, price, stock, etc.             // Other item fields
```

#### 8. **Backend Processing**
```javascript
1. Parse remainingImages: [0, 2]
2. Filter existing images:
   keptImages = item.images.filter((_, index) => [0, 2].includes(index))
3. Create new image objects from uploaded files
4. Merge: item.images = [...keptImages, ...newImageObjects]
5. Validate: throw error if no images
6. Save updated item
```

### User Experience:
- ✅ See all existing images with "EXISTING" badge
- ✅ Remove existing images (they disappear immediately)
- ✅ Upload new images in available slots with "NEW" badge
- ✅ Remove new images before submitting
- ✅ See total image count
- ✅ Warning if trying to remove all images
- ✅ Update button disabled if no images remain

---

## Example Flow (Edit Mode)

### Initial State:
```
Item has 3 existing images at indexes [0, 1, 2]
remainingExistingImages: [0, 1, 2]
newImages: []
Total: 3 images
```

### User removes image at index 1:
```
remainingExistingImages: [0, 2]  // removed 1
newImages: []
Total: 2 images
Display: Shows only images 0 and 2
```

### User uploads 1 new image:
```
remainingExistingImages: [0, 2]
newImages: [File('new-photo.jpg')]
Total: 3 images
Display: Shows images 0, 2, and new photo
```

### On submit, backend receives:
```javascript
{
  images: [File('new-photo.jpg')],      // Only new file
  remainingImages: "[0, 2]",             // Keep images 0 and 2
  // ...other fields
}
```

### Backend result:
```javascript
// Original: [img0, img1, img2]
// Kept: [img0, img2]
// New: [newImg]
// Final: [img0, img2, newImg]  ← Saved to database
```

---

## Key Features

### ✅ Smart Slot Management
- Maximum 4 images (1 large + 3 small)
- Dynamically shows: existing + new + empty slots
- Empty slots become available after removing images

### ✅ Visual Feedback
- **"EXISTING"** badge: Images already in database
- **"NEW"** badge: Newly uploaded images
- **Total counter**: Shows current image count
- **Red warning**: Appears if no images remain

### ✅ Form Validation
- **Insert mode**: Requires at least 1 image (checked by form schema)
- **Edit mode**: Images field is optional in schema, validation done separately
- Update button disabled when `totalImages < 1`

### ✅ No Data Loss
- Removing an image doesn't delete it until update is submitted
- Can cancel and navigate away without changes
- Only submitted changes affect the database

---

## File Structure

```
frontend/src/
├── hooks/admin/
│   └── useItemForm.ts              # Main form logic and state management
├── components/admin/
│   ├── ImageUploaderGroup.tsx      # Manages 4 image slots
│   └── ImageUploaderSolid.tsx      # Individual image uploader
├── pages/admin/
│   └── ItemInsertPage.tsx          # Item create/edit page
└── schemas/
    └── itemSchema.ts               # Form validation schema

backend/modules/item/
├── item.service.js                 # Image merging logic
├── item.controller.js              # API handlers
└── item.routes.js                  # API routes
```

---

## API Payload Examples

### Create Item (POST /items)
```
FormData:
- images: [File, File, File]
- name: "T-Shirt"
- price: "29.99"
- stock: "100"
- category: "categoryId"
- subCategory: "subCategoryId"
- sizes: "["S","M","L"]"
- description: "Description"
```

### Update Item (PUT /items/:id)
```
FormData:
- images: [File]                    // Only new uploads
- remainingImages: "[0,2]"          // Keep existing images at index 0 and 2
- name: "Updated T-Shirt"
- price: "34.99"
- stock: "150"
- category: "categoryId"
- subCategory: "subCategoryId"
- sizes: "["S","M","L","XL"]"
- description: "Updated description"
```

---

## Error Handling

### Client-side:
- ❌ Cannot submit insert without images
- ❌ Cannot submit update with 0 total images
- ❌ Form validation prevents submission

### Server-side:
- ❌ `"At least one image is required"` - if no images after merge
- ❌ Returns 400 status code for validation errors

---

## Benefits of This Approach

1. **Efficient**: Only uploads new images, not all images
2. **Flexible**: Keep some images, remove others, add new ones
3. **Clear**: Visual badges show image status
4. **Safe**: Validation prevents data integrity issues
5. **User-friendly**: Immediate visual feedback on all actions

---

**Last Updated**: November 22, 2025  
