// Mock data for the e-commerce application

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  shortDescription?: string;
  category: 'shirts' | 'pants' | 'accessories' | 'shoes' | 'dresses';
  imageUrl: string;
  galleryImages?: string[];
  stock: number;
  minStockLevel?: number;
  brand?: string;
  sku?: string;
  slug?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  weight?: number;
  dimensions?: string;
  salePrice?: number;
  sizes?: string[];
  colors?: string[];
  materials?: string[];
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  priceOverride?: number;
  salePriceOverride?: number;
  stockQuantity: number;
  isActive: boolean;
}

export interface Review {
  id: number;
  productId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: {
    productId: number;
    quantity: number;
    price: number;
  }[];
  shippingInfo: {
    name: string;
    phone: string;
    address: string;
  };
  paymentMethod: 'cod' | 'bank_transfer';
}

export const products: Product[] = [
  {
    id: 1,
    name: "Áo Thun Premium Cotton",
    price: 299000,
    description: "Áo thun chất liệu cotton cao cấp, thoáng mát, thấm hút mồ hôi tốt. Thiết kế đơn giản, phù hợp cho mọi dịp.",
    shortDescription: "Áo thun cotton cao cấp",
    category: 'shirts',
    imageUrl: "https://images.unsplash.com/photo-1759572095329-1dcf9522762b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    stock: 50,
    brand: "FashionCo",
    sku: "ATPC-001",
    slug: "ao-thun-premium-cotton",
    isActive: true,
    isFeatured: true
  },
  {
    id: 2,
    name: "Quần Jeans Slim Fit",
    price: 599000,
    description: "Quần jeans form slim fit ôm vừa vặn, chất liệu denim co giãn nhẹ mang lại sự thoải mái khi mặc.",
    category: 'pants',
    imageUrl: "https://images.unsplash.com/photo-1714729382668-7bc3bb261662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    stock: 30
  },
  {
    id: 3,
    name: "Giày Sneakers Thể Thao",
    price: 850000,
    description: "Giày sneakers thể thao năng động, đế cao su êm ái, phù hợp cho hoạt động thể thao và đi chơi.",
    category: 'accessories',
    imageUrl: "https://images.unsplash.com/photo-1656944227480-98180d2a5155?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    stock: 25
  },
  {
    id: 4,
    name: "Áo Sơ Mi Casual",
    price: 450000,
    description: "Áo sơ mi phong cách casual, chất liệu vải mềm mại, dễ phối đồ cho công sở và dạo phố.",
    category: 'shirts',
    imageUrl: "https://images.unsplash.com/photo-1602810320073-1230c46d89d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    stock: 40
  },
  {
    id: 5,
    name: "Túi Xách Da Cao Cấp",
    price: 1200000,
    description: "Túi xách da thật cao cấp, thiết kế sang trọng, nhiều ngăn tiện dụng.",
    category: 'accessories',
    imageUrl: "https://images.unsplash.com/photo-1569388330292-79cc1ec67270?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    stock: 15
  },
  {
    id: 6,
    name: "Áo Hoodie Basic",
    price: 399000,
    description: "Áo hoodie basic form rộng thoải mái, chất liệu nỉ bông mềm mại, giữ ấm tốt.",
    category: 'shirts',
    imageUrl: "https://images.unsplash.com/photo-1759572095329-1dcf9522762b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    stock: 35
  },
  {
    id: 7,
    name: "Quần Short Thể Thao",
    price: 250000,
    description: "Quần short thể thao thoáng mát, thích hợp cho tập luyện và các hoạt động ngoài trời.",
    category: 'pants',
    imageUrl: "https://images.unsplash.com/photo-1714729382668-7bc3bb261662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    stock: 45
  },
  {
    id: 8,
    name: "Đồng Hồ Thời Trang",
    price: 950000,
    description: "Đồng hồ thời trang cao cấp, thiết kế hiện đại, dây da sang trọng.",
    category: 'accessories',
    imageUrl: "https://images.unsplash.com/photo-1762513461072-5008c7f6511d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    stock: 20
  },
  {
    id: 9,
    name: "Áo Khoác Jean",
    price: 699000,
    description: "Áo khoác jean phong cách vintage, chất liệu denim dày dặn, bền đẹp theo thời gian.",
    category: 'shirts',
    imageUrl: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    stock: 28
  },
  {
    id: 10,
    name: "Quần Kaki Slim",
    price: 425000,
    description: "Quần kaki slim fit thanh lịch, phù hợp cho môi trường công sở và dạo phố.",
    category: 'pants',
    imageUrl: "https://images.unsplash.com/photo-1714729382668-7bc3bb261662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    stock: 38
  },
  {
    id: 11,
    name: "Ba Lô Du Lịch",
    price: 650000,
    description: "Ba lô du lịch đa năng, nhiều ngăn tiện lợi, chất liệu chống nước.",
    category: 'accessories',
    imageUrl: "https://images.unsplash.com/photo-1680039211156-66c721b87625?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    stock: 22
  },
  {
    id: 12,
    name: "Váy Dạ Hội",
    price: 1500000,
    description: "Váy dạ hội sang trọng, thiết kế tinh tế, phù hợp cho các sự kiện quan trọng.",
    category: 'shirts',
    imageUrl: "https://images.unsplash.com/photo-1635447272615-a414b7ea1df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    stock: 10
  }
];

export const reviews: Review[] = [
  {
    id: 1,
    productId: 1,
    userName: "Nguyễn Văn A",
    rating: 5,
    comment: "Sản phẩm rất tốt, chất lượng vải mềm mại và thoáng mát. Rất hài lòng!",
    date: "2026-01-05"
  },
  {
    id: 2,
    productId: 1,
    userName: "Trần Thị B",
    rating: 4,
    comment: "Áo đẹp, giá hợp lý. Mình sẽ mua thêm.",
    date: "2026-01-03"
  },
  {
    id: 3,
    productId: 2,
    userName: "Lê Minh C",
    rating: 5,
    comment: "Quần jeans chất lượng tuyệt vời, form chuẩn!",
    date: "2026-01-04"
  },
  {
    id: 4,
    productId: 3,
    userName: "Phạm Thu D",
    rating: 4,
    comment: "Giày đẹp, đi rất êm. Tuy nhiên hơi nhỏ so với size thật.",
    date: "2026-01-02"
  }
];
