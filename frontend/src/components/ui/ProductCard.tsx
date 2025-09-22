// frontend/src/components/ui/ProductsCard.tsx

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import type { Product } from "../../lib/api";

type ProductsCardProps = {
  products: Product[];
  onAddToCart?: (product: Product) => void;
};

export default function ProductsCard({
  products,
  onAddToCart,
}: ProductsCardProps) {
  if (!products || products.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-6">
        No products available.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <Card
          key={product.id}
          className="flex flex-col overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-shadow"
        >
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-48 w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="h-48 w-full bg-muted flex items-center justify-center text-sm text-muted-foreground">
              No Image
            </div>
          )}

          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold truncate">
              {product.name}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col flex-1 justify-between">
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {product.description ?? "No description provided."}
            </p>

            <div className="mt-auto flex items-center justify-between">
              <span className="font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
              <Button
                size="sm"
                onClick={() => onAddToCart?.(product)}
                className="ml-2"
              >
                Add to Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
