import { Banner } from "../components/Banner";
import { CategoryCard } from "../components/CategoryCard";
import { ProductCard } from "../components/ProductCard";
import { Shirt, Package, Watch } from "lucide-react";
import { products } from "../data/mockData";

export function HomePage() {
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <Banner imageUrl="https://images.unsplash.com/photo-1483985988355-763728e1935b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" />

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Danh Mục Sản Phẩm
          </h2>
          <p className="text-gray-600 text-lg">
            Khám phá các danh mục thời trang phong phú
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CategoryCard
            title="Áo"
            imageUrl="https://images.unsplash.com/photo-1602810320073-1230c46d89d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            icon={Shirt}
          />
          <CategoryCard
            title="Quần"
            imageUrl="https://images.unsplash.com/photo-1714729382668-7bc3bb261662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            icon={Package}
          />
          <CategoryCard
            title="Phụ Kiện"
            imageUrl="https://images.unsplash.com/photo-1569388330292-79cc1ec67270?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            icon={Watch}
          />
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="products" className="container mx-auto px-4 py-16 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Sản Phẩm Nổi Bật
          </h2>
          <p className="text-gray-600 text-lg">
            Những sản phẩm được yêu thích nhất
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
