import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import { Product } from "./modules/product.js";
import { Category } from "./modules/category.js";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGODB_URL || "YOUR_MONGO_URI";

function getRandomItem<T>(array: T[]): T {
  if (!array.length) {
    throw new Error("Cannot pick from empty array");
  }
  return array[Math.floor(Math.random() * array.length)];
}

async function seed(): Promise<void> {
  try {
    // 1. Connect DB
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    // 2. Clean DB (dev only)
    await Product.deleteMany();
    await Category.deleteMany();

    // 3. Create Categories
    const categories = Array.from({ length: 20 }).map(() => ({
      name: faker.commerce.department() + " " + faker.string.uuid().slice(0, 4),
      description: faker.commerce.productDescription(),
      image: faker.image.urlPicsumPhotos(),
    }));

    const createdCategories = await Category.insertMany(categories);

    if (!createdCategories || createdCategories.length === 0) {
      throw new Error("❌ Categories were not created");
    }

    console.log(`📦 Created ${createdCategories.length} categories`);

    // 4. Create Products (IMPORTANT FIX HERE)
    const products = Array.from({ length: 20 }).map(() => {
      const randomCategory = getRandomItem(createdCategories);

      return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: Number(faker.commerce.price({ min: 10, max: 2000 })),

        // 🔥 CORRECT RELATION
        category: randomCategory._id,

        mainImage: faker.image.urlPicsumPhotos(),

        gallery: [
          faker.image.urlPicsumPhotos(),
          faker.image.urlPicsumPhotos(),
          faker.image.urlPicsumPhotos(),
        ],

        count: faker.number.int({ min: 0, max: 100 }),
        active: true,
      };
    });

    await Product.insertMany(products);

    console.log(`🛒 Created ${products.length} products`);
    console.log("🚀 Seeding completed successfully");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
}

seed();
