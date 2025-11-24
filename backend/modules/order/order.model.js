import { Schema, model } from 'mongoose';

const orderItemSchema = new Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true
    },
    selectedImageIndex: {
        type: Number,
        default: 0
    }
}, { _id: false });

const shippingAddressSchema = new Schema({
    phone: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String }
}, { _id: false });

export const ORDER_STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
export const PAYMENT_STATUSES = ['Pending', 'Paid', 'Refunded'];

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: {
        type: [orderItemSchema],
        required: true,
        validate: v => Array.isArray(v) && v.length > 0
    },
    shippingAddress: {
        type: shippingAddressSchema,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ORDER_STATUSES,
        default: 'Pending'
    },
    paymentStatus: {
        type: String,
        enum: PAYMENT_STATUSES,
        default: 'Pending'
    },
    paymentMethod: {
        type: String,
        default: 'Cash on Delivery'
    },
    notes: {
        type: String,
        maxlength: 500
    },
    placedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

orderSchema.virtual('itemCount').get(function () {
    return this.items.reduce((total, item) => total + item.quantity, 0);
});

orderSchema.set('toJSON', { virtuals: true });
orderSchema.set('toObject', { virtuals: true });

const Order = model('Order', orderSchema);

export default Order;
