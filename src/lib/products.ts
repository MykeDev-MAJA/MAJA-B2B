import path from "path";
import fs from "fs/promises";

export interface ColorOption {
  name: string;
  class: string;
  image: string;
  stock: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  categoria: string;
  agrupado: boolean;
  colors: ColorOption[];
  isNew: boolean;
}

export interface ProductsData {
  [category: string]: Product[];
  hombres: Product[];
  mujeres: Product[];
}

export async function getProducts(): Promise<ProductsData> {
  try {
    // Get the path to the JSON file
    const filePath = path.join(
      process.cwd(),
      "public",
      "api",
      "Productos.JSON"
    );

    // Read the file
    const fileContents = await fs.readFile(filePath, "utf8");

    // Parse the JSON data
    const data: ProductsData = JSON.parse(fileContents);

    return data;
  } catch (error) {
    console.error("Error loading products:", error);
    // Return empty data structure in case of error
    return { hombres: [], mujeres: [] };
  }
}
