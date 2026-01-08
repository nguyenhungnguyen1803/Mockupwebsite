import { useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { products } from "../data/mockData";
import { Checkbox } from "../components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Slider } from "../components/ui/slider";
import { Label } from "../components/ui/label";

export function ProductsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [sortBy, setSortBy] = useState("default");

  let filteredProducts = [...products];

  // Filter by category
  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter(p =>
      selectedCategories.includes(p.category)
    );
  }

  // Filter by price
  filteredProducts = filteredProducts.filter(p =>
    p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  // Sort
  if (sortBy === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Tất Cả Sản Phẩm</h1>

        <div className="flex gap-8">
          {/* Left Sidebar - Filters */}
          <aside className="w-64 flex-shrink-0 hidden lg:block">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-4">Bộ Lọc</h3>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Danh Mục</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="shirts"
                      checked={selectedCategories.includes('shirts')}
                      onCheckedChange={() => toggleCategory('shirts')}
                    />
                    <Label htmlFor="shirts" className="cursor-pointer">Áo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pants"
                      checked={selectedCategories.includes('pants')}
                      onCheckedChange={() => toggleCategory('pants')}
                    />
                    <Label htmlFor="pants" className="cursor-pointer">Quần</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="accessories"
                      checked={selectedCategories.includes('accessories')}
                      onCheckedChange={() => toggleCategory('accessories')}
                    />
                    <Label htmlFor="accessories" className="cursor-pointer">Phụ Kiện</Label>
                  </div>
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-medium mb-3">Khoảng Giá</h4>
                <Slider
                  min={0}
                  max={2000000}
                  step={50000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{priceRange[0].toLocaleString()}đ</span>
                  <span>{priceRange[1].toLocaleString()}đ</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Dropdown */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Hiển thị {filteredProducts.length} sản phẩm
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Sắp xếp theo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Mặc định</SelectItem>
                  <SelectItem value="price-asc">Giá tăng dần</SelectItem>
                  <SelectItem value="price-desc">Giá giảm dần</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  imageUrl={product.imageUrl}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nào</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
