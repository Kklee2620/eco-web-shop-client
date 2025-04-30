
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  Plus, Search, Edit, Trash2, Filter, ArrowUpDown, 
  MoreHorizontal, Eye 
} from "lucide-react";
import { AdminProduct } from "@/types/admin";
import { formatPrice } from "@/utils/formatters";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Dữ liệu mẫu
const mockProducts: AdminProduct[] = [
  {
    id: "1",
    name: "Giày thể thao Nike Air Max 90",
    slug: "giay-the-thao-nike-air-max-90",
    description: "Giày thể thao Nike Air Max 90 với công nghệ đệm khí cao cấp",
    price: 2500000,
    discountPrice: 2250000,
    inventory: 45,
    images: ["/placeholder.svg"],
    categories: ["giày", "thể thao", "nike"],
    createdAt: "2025-02-15T10:30:00",
    updatedAt: "2025-04-25T15:45:00",
  },
  {
    id: "2",
    name: "Áo khoác Uniqlo Blocktech",
    slug: "ao-khoac-uniqlo-blocktech",
    description: "Áo khoác chống thấm nước công nghệ Blocktech của Uniqlo",
    price: 1800000,
    discountPrice: 1600000,
    inventory: 32,
    images: ["/placeholder.svg"],
    categories: ["áo khoác", "uniqlo"],
    createdAt: "2025-03-10T09:15:00",
    updatedAt: "2025-04-20T14:30:00",
  },
  {
    id: "3",
    name: "Túi xách thời trang Charles & Keith",
    slug: "tui-xach-charles-keith",
    description: "Túi xách nữ cao cấp thương hiệu Charles & Keith",
    price: 1200000,
    discountPrice: undefined,
    inventory: 18,
    images: ["/placeholder.svg"],
    categories: ["túi xách", "phụ kiện", "nữ"],
    createdAt: "2025-03-22T11:45:00",
    updatedAt: "2025-04-15T10:20:00",
  },
  {
    id: "4",
    name: "Quần jeans nam Levi's 511",
    slug: "quan-jeans-nam-levis-511",
    description: "Quần jeans nam slim fit Levi's 511 cao cấp",
    price: 1950000,
    discountPrice: 1750000,
    inventory: 27,
    images: ["/placeholder.svg"],
    categories: ["quần", "jeans", "nam"],
    createdAt: "2025-01-05T08:30:00",
    updatedAt: "2025-04-10T16:15:00",
  },
  {
    id: "5",
    name: "Đồng hồ Seiko 5 Sports",
    slug: "dong-ho-seiko-5-sports",
    description: "Đồng hồ cơ tự động Seiko 5 Sports dành cho nam",
    price: 5600000,
    discountPrice: 5100000,
    inventory: 12,
    images: ["/placeholder.svg"],
    categories: ["đồng hồ", "phụ kiện", "nam"],
    createdAt: "2025-02-28T13:20:00",
    updatedAt: "2025-04-05T11:10:00",
  }
];

const Products: React.FC = () => {
  const [products, setProducts] = useState<AdminProduct[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual search
    console.log("Searching for:", searchTerm);
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(p => p.id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedProducts.length === 0) return;
    
    const remainingProducts = products.filter(
      product => !selectedProducts.includes(product.id)
    );
    setProducts(remainingProducts);
    setSelectedProducts([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Quản lý sản phẩm</h1>
        <Button className="shrink-0">
          <Plus className="mr-2 h-4 w-4" />
          Thêm sản phẩm
        </Button>
      </div>

      <Card>
        <div className="p-6">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Lọc
              </Button>

              <Button variant="outline" size="sm">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Sắp xếp
              </Button>

              {selectedProducts.length > 0 && (
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={handleDeleteSelected}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Xóa ({selectedProducts.length})
                </Button>
              )}
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox 
                      checked={
                        products.length > 0 &&
                        selectedProducts.length === products.length
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Sản phẩm</TableHead>
                  <TableHead className="hidden md:table-cell">Danh mục</TableHead>
                  <TableHead className="hidden md:table-cell">Tồn kho</TableHead>
                  <TableHead>Giá</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={() => handleSelectProduct(product.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-gray-100">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-10 w-10 rounded-md object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium">{product.name}</span>
                          <span className="hidden text-xs text-gray-500 sm:inline-block">
                            {product.slug}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {product.categories.map((category, idx) => (
                          <span
                            key={idx}
                            className="rounded-full bg-gray-100 px-2 py-1 text-xs"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          product.inventory > 20
                            ? "bg-green-100 text-green-800"
                            : product.inventory > 5
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.inventory > 0 ? `${product.inventory}` : "Hết hàng"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        {product.discountPrice ? (
                          <>
                            <span className="font-medium text-primary">
                              {formatPrice(product.discountPrice)}
                            </span>
                            <span className="text-xs text-gray-500 line-through">
                              {formatPrice(product.price)}
                            </span>
                          </>
                        ) : (
                          <span className="font-medium">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Xem
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Hiển thị {products.length} / {products.length} sản phẩm
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled={true}>
                Trước
              </Button>
              <Button variant="outline" size="sm" disabled={true}>
                Tiếp
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Products;
