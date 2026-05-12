import { Product } from "../modules/product.js";

const DELIVERY_FEE = 2.99;

export async function calculateOrderTotal(
  products: { product: string; quantity: number }[],
): Promise<number> {
  const productDocs = await Product.find({
    _id: { $in: products.map((p) => p.product) },
  });

  const subtotal = products.reduce((sum, item) => {
    const doc = productDocs.find((p) => p._id.toString() === item.product);
    if (!doc) throw new Error(`Product ${item.product} not found`);
    return sum + doc.price * item.quantity;
  }, 0);

  return subtotal + DELIVERY_FEE;
}
