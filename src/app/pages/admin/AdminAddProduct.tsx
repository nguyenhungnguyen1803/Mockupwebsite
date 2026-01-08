import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Switch } from '../../components/ui/switch';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { 
  Home, 
  Package, 
  Plus, 
  X, 
  Upload,
  Image as ImageIcon,
  ArrowUpDown
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  priceOverride?: number;
  salePriceOverride?: number;
  stockQuantity: number;
  isActive: boolean;
}

const AdminAddProduct: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    sku: '',
    brand: '',
    category: '',
    shortDescription: '',
    fullDescription: '',
    regularPrice: 0,
    salePrice: 0,
    stockQuantity: 0,
    minStockLevel: 0,
    weight: 0,
    dimensions: '',
    isActive: true,
    isFeatured: false,
  });

  // Images state
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Attributes state
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [customAttributes, setCustomAttributes] = useState<{name: string, value: string}[]>([]);

  // Variants state
  const [variants, setVariants] = useState<ProductVariant[]>([]);

  // Available options
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Pink', 'Orange', 'Gray'];
  const materials = ['Cotton', 'Polyester', 'Silk', 'Wool', 'Leather', 'Denim', 'Linen', 'Spandex'];

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('Price') || name.includes('Quantity') || name.includes('Level') || name.includes('weight') 
        ? parseFloat(value) || 0 
        : value
    }));

    // Auto-generate slug from name
    if (name === 'name') {
      const autoSlug = value.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
      setFormData(prev => ({
        ...prev,
        slug: autoSlug
      }));
    }
  };

  // Handle switch changes
  const handleSwitchChange = (field: keyof typeof formData) => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Handle image upload
  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMainImage(e.target.files[0]);
    }
  };

  const handleGalleryImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setGalleryImages(prev => [...prev, ...newFiles]);

      // Create previews for new images
      newFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Remove gallery image
  const removeGalleryImage = (index: number) => {
    const newGalleryImages = [...galleryImages];
    newGalleryImages.splice(index, 1);
    setGalleryImages(newGalleryImages);

    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  };

  // Toggle size selection
  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size) 
        : [...prev, size]
    );
  };

  // Toggle color selection
  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color) 
        : [...prev, color]
    );
  };

  // Toggle material selection
  const toggleMaterial = (material: string) => {
    setSelectedMaterials(prev => 
      prev.includes(material) 
        ? prev.filter(m => m !== material) 
        : [...prev, material]
    );
  };

  // Generate variants based on selected attributes
  const generateVariants = () => {
    const newVariants: ProductVariant[] = [];
    
    // Combine selected sizes, colors, and materials to create variants
    selectedSizes.forEach(size => {
      selectedColors.forEach(color => {
        const variantId = `${size}-${color}`;
        newVariants.push({
          id: variantId,
          name: `${size} - ${color}`,
          sku: `${formData.sku}-${size}-${color}`.toUpperCase(),
          stockQuantity: 0,
          isActive: true
        });
      });
    });

    setVariants(newVariants);
  };

  // Handle variant quantity change
  const handleVariantChange = (variantId: string, field: keyof ProductVariant, value: any) => {
    setVariants(prev => 
      prev.map(variant => 
        variant.id === variantId 
          ? { ...variant, [field]: value } 
          : variant
      )
    );
  };

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.sku || !formData.category || formData.regularPrice === 0) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc!');
      return;
    }

    // In a real app, you would send the data to your backend
    // For now, we'll simulate saving by adding to mock data
    try {
      // Create product object with form data
      const newProduct = {
        id: Date.now(), // Using timestamp as ID for mock purposes
        name: formData.name,
        price: formData.regularPrice,
        description: formData.fullDescription,
        shortDescription: formData.shortDescription,
        category: formData.category,
        imageUrl: 'https://via.placeholder.com/400x400', // Using placeholder for mock purposes
        stock: formData.stockQuantity,
        minStockLevel: formData.minStockLevel,
        brand: formData.brand,
        sku: formData.sku,
        slug: formData.slug,
        isActive: formData.isActive,
        isFeatured: formData.isFeatured,
        weight: formData.weight,
        dimensions: formData.dimensions,
        salePrice: formData.salePrice || undefined,
        sizes: selectedSizes.length > 0 ? selectedSizes : undefined,
        colors: selectedColors.length > 0 ? selectedColors : undefined,
        materials: selectedMaterials.length > 0 ? selectedMaterials : undefined,
        variants: variants.length > 0 ? variants : undefined
      };

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Product saved:', newProduct);

      toast.success('Sản phẩm đã được thêm thành công!');

      // Navigate back to product management
      navigate('/admin/products');
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Lỗi khi thêm sản phẩm!');
    }
  };

  return (
    <AdminLayout>
      <div className="pb-24 space-y-6">
        {/* Page Header */}
        <div>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Home className="h-4 w-4 mr-2" />
            <span>Dashboard</span>
            <span className="mx-2">/</span>
            <span>Products</span>
            <span className="mx-2">/</span>
            <span>Add</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Basic Product Information */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Basic Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder="Auto-generated from name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    placeholder="Enter unique product code"
                  />
                </div>
                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    placeholder="Enter brand name"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shirts">Shirts</SelectItem>
                    <SelectItem value="pants">Pants</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="shoes">Shoes</SelectItem>
                    <SelectItem value="dresses">Dresses</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="shortDescription">Short Description</Label>
                <Textarea
                  id="shortDescription"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                  placeholder="Brief product description"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="fullDescription">Full Description</Label>
                <Textarea
                  id="fullDescription"
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleInputChange}
                  placeholder="Detailed product description"
                  rows={5}
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Inventory */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Pricing & Inventory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="regularPrice">Regular Price *</Label>
                  <Input
                    id="regularPrice"
                    name="regularPrice"
                    type="number"
                    value={formData.regularPrice}
                    onChange={handleInputChange}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="salePrice">Sale Price (Optional)</Label>
                  <Input
                    id="salePrice"
                    name="salePrice"
                    type="number"
                    value={formData.salePrice}
                    onChange={handleInputChange}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="stockQuantity">Stock Quantity *</Label>
                  <Input
                    id="stockQuantity"
                    name="stockQuantity"
                    type="number"
                    value={formData.stockQuantity}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="minStockLevel">Minimum Stock Level</Label>
                  <Input
                    id="minStockLevel"
                    name="minStockLevel"
                    type="number"
                    value={formData.minStockLevel}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={() => handleSwitchChange('isActive')}
                  />
                  <Label htmlFor="isActive">Is Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onCheckedChange={() => handleSwitchChange('isFeatured')}
                  />
                  <Label htmlFor="isFeatured">Is Featured</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Images */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Main Product Image *</Label>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 w-48 h-48 flex items-center justify-center">
                    {mainImage ? (
                      <img 
                        src={URL.createObjectURL(mainImage)} 
                        alt="Main product" 
                        className="w-full h-full object-contain rounded"
                      />
                    ) : (
                      <div className="text-center">
                        <ImageIcon className="h-10 w-10 mx-auto text-gray-400" />
                        <p className="text-sm text-gray-500 mt-2">No image selected</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <Input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleMainImageUpload}
                      className="mb-2"
                    />
                    <p className="text-sm text-gray-500">Recommended: 800x800px, JPG/PNG</p>
                  </div>
                </div>
              </div>

              <div>
                <Label>Gallery Images</Label>
                <div className="mt-2">
                  <Input 
                    type="file" 
                    accept="image/*" 
                    multiple
                    onChange={handleGalleryImageUpload}
                    className="mb-2"
                  />
                  <div className="flex flex-wrap gap-2">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={preview} 
                          alt={`Gallery ${index}`} 
                          className="w-24 h-24 object-cover rounded border"
                        />
                        <button
                          type="button"
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeGalleryImage(index)}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Attributes & Variants */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Product Attributes & Variants</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Size Selection */}
              <div>
                <Label>Size</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      type="button"
                      className={`px-3 py-1.5 border rounded-md ${
                        selectedSizes.includes(size)
                          ? 'bg-blue-100 border-blue-500 text-blue-700'
                          : 'border-gray-300 hover:bg-gray-100'
                      }`}
                      onClick={() => toggleSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <Label>Color</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {colors.map(color => (
                    <button
                      key={color}
                      type="button"
                      className={`px-3 py-1.5 border rounded-md ${
                        selectedColors.includes(color)
                          ? 'bg-blue-100 border-blue-500 text-blue-700'
                          : 'border-gray-300 hover:bg-gray-100'
                      }`}
                      onClick={() => toggleColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material Selection */}
              <div>
                <Label>Material</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {materials.map(material => (
                    <button
                      key={material}
                      type="button"
                      className={`px-3 py-1.5 border rounded-md ${
                        selectedMaterials.includes(material)
                          ? 'bg-blue-100 border-blue-500 text-blue-700'
                          : 'border-gray-300 hover:bg-gray-100'
                      }`}
                      onClick={() => toggleMaterial(material)}
                    >
                      {material}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Variants Button */}
              <div>
                <Button 
                  type="button"
                  variant="secondary"
                  onClick={generateVariants}
                  disabled={selectedSizes.length === 0 || selectedColors.length === 0}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Generate Variants
                </Button>
              </div>

              {/* Variants Table */}
              {variants.length > 0 && (
                <div>
                  <Label>Generated Variants</Label>
                  <div className="border rounded-lg overflow-hidden mt-2">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Override</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sale Price Override</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {variants.map((variant) => (
                          <tr key={variant.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{variant.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{variant.sku}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Input
                                type="number"
                                value={variant.priceOverride || ''}
                                onChange={(e) => handleVariantChange(variant.id, 'priceOverride', parseFloat(e.target.value) || 0)}
                                placeholder="0.00"
                                className="w-24"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Input
                                type="number"
                                value={variant.salePriceOverride || ''}
                                onChange={(e) => handleVariantChange(variant.id, 'salePriceOverride', parseFloat(e.target.value) || 0)}
                                placeholder="0.00"
                                className="w-24"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Input
                                type="number"
                                value={variant.stockQuantity}
                                onChange={(e) => handleVariantChange(variant.id, 'stockQuantity', parseInt(e.target.value) || 0)}
                                className="w-20"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Switch
                                checked={variant.isActive}
                                onCheckedChange={(checked) => handleVariantChange(variant.id, 'isActive', checked)}
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setVariants(prev => prev.filter(v => v.id !== variant.id))}
                              >
                                <X size={16} />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    step="0.01"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="dimensions">Dimensions (L x W x H cm)</Label>
                  <Input
                    id="dimensions"
                    name="dimensions"
                    value={formData.dimensions}
                    onChange={handleInputChange}
                    placeholder="e.g., 30 x 20 x 10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8">
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Button variant="outline" type="button">
                Cancel
              </Button>
              <Button variant="secondary" type="button">
                Save & Add Another
              </Button>
              <Button type="submit">
                Save Product
              </Button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminAddProduct;