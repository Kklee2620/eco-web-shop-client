
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
  Search, Filter, ArrowUpDown, Plus, 
  MoreHorizontal, Eye, Edit, Trash2, 
} from "lucide-react";
import { AdminBlogPost } from "@/types/admin";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/utils/formatters";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Dữ liệu mẫu
const mockBlogPosts: AdminBlogPost[] = [
  {
    id: "1",
    title: "Xu hướng thời trang mùa hè 2025",
    slug: "xu-huong-thoi-trang-mua-he-2025",
    excerpt: "Những xu hướng thời trang nổi bật nhất cho mùa hè năm 2025",
    content: "Nội dung chi tiết về các xu hướng thời trang mùa hè 2025...",
    coverImage: "/placeholder.svg",
    author: "Fashion Editor",
    status: "published",
    tags: ["thời trang", "mùa hè", "xu hướng"],
    createdAt: "2025-03-15T09:30:00",
    updatedAt: "2025-04-20T14:15:00",
    publishedAt: "2025-04-20T14:15:00",
    views: 1245
  },
  {
    id: "2",
    title: "Cách phối đồ cho nam giới công sở",
    slug: "cach-phoi-do-cho-nam-gioi-cong-so",
    excerpt: "Hướng dẫn cách phối đồ lịch sự và chuyên nghiệp cho nam giới nơi công sở",
    content: "Nội dung chi tiết về cách phối đồ cho nam giới công sở...",
    coverImage: "/placeholder.svg",
    author: "Men's Fashion Expert",
    status: "published",
    tags: ["thời trang nam", "công sở", "phối đồ"],
    createdAt: "2025-03-20T10:45:00",
    updatedAt: "2025-04-15T11:30:00",
    publishedAt: "2025-04-15T11:30:00",
    views: 982
  },
  {
    id: "3",
    title: "5 kiểu giày phải có trong tủ đồ của phái nữ",
    slug: "5-kieu-giay-phai-co-trong-tu-do-cua-phai-nu",
    excerpt: "Những mẫu giày cơ bản mà mỗi người phụ nữ nên sở hữu",
    content: "Nội dung chi tiết về 5 kiểu giày cần thiết cho phụ nữ...",
    coverImage: "/placeholder.svg",
    author: "Shoe Specialist",
    status: "published",
    tags: ["giày", "phụ nữ", "thời trang"],
    createdAt: "2025-03-25T14:20:00",
    updatedAt: "2025-04-10T09:45:00",
    publishedAt: "2025-04-10T09:45:00",
    views: 1567
  },
  {
    id: "4",
    title: "Bí quyết chăm sóc đồ da cao cấp",
    slug: "bi-quyet-cham-soc-do-da-cao-cap",
    excerpt: "Hướng dẫn chi tiết cách bảo quản và chăm sóc các sản phẩm làm từ da",
    content: "Nội dung chi tiết về cách chăm sóc đồ da cao cấp...",
    coverImage: "/placeholder.svg",
    author: "Leather Expert",
    status: "draft",
    tags: ["đồ da", "bảo quản", "mẹo"],
    createdAt: "2025-04-05T11:10:00",
    updatedAt: "2025-04-25T15:40:00",
    publishedAt: undefined,
    views: 0
  },
  {
    id: "5",
    title: "Trang phục dự tiệc mùa cưới cho nữ",
    slug: "trang-phuc-du-tiec-mua-cuoi-cho-nu",
    excerpt: "Gợi ý các trang phục phù hợp khi tham dự tiệc cưới vào mỗi mùa trong năm",
    content: "Nội dung chi tiết về trang phục dự tiệc cưới cho nữ...",
    coverImage: "/placeholder.svg",
    author: "Wedding Fashion Editor",
    status: "draft",
    tags: ["đám cưới", "tiệc tùng", "thời trang nữ"],
    createdAt: "2025-04-10T13:25:00",
    updatedAt: "2025-04-28T10:35:00",
    publishedAt: undefined,
    views: 0
  }
];

const Blog: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<AdminBlogPost[]>(mockBlogPosts);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual search
    console.log("Searching for:", searchTerm);
  };

  const handleStatusChange = (postId: string, newStatus: "draft" | "published") => {
    setBlogPosts(posts => posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            status: newStatus, 
            publishedAt: newStatus === "published" ? new Date().toISOString() : post.publishedAt 
          } 
        : post
    ));
  };

  const handleDeletePost = (postId: string) => {
    setBlogPosts(posts => posts.filter(post => post.id !== postId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-800";
      case "draft": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "published": return "Đã đăng";
      case "draft": return "Bản nháp";
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Quản lý bài viết</h1>
        <Button className="shrink-0">
          <Plus className="mr-2 h-4 w-4" />
          Tạo bài viết
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
                  placeholder="Tìm kiếm bài viết..."
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
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tiêu đề</TableHead>
                  <TableHead className="hidden md:table-cell">Tác giả</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="hidden lg:table-cell">Ngày tạo</TableHead>
                  <TableHead className="hidden md:table-cell">Ngày xuất bản</TableHead>
                  <TableHead className="hidden md:table-cell">Lượt xem</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-gray-100">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="h-10 w-10 rounded-md object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium">{post.title}</span>
                          <span className="hidden text-xs text-gray-500 sm:inline-block">
                            {post.slug}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {post.author}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(
                          post.status
                        )}`}
                      >
                        {getStatusText(post.status)}
                      </span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {formatDate(post.createdAt)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {post.publishedAt ? formatDate(post.publishedAt) : "Chưa xuất bản"}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {post.views || 0}
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
                          {post.status === "published" ? (
                            <DropdownMenuItem onClick={() => handleStatusChange(post.id, "draft")}>
                              <Eye className="mr-2 h-4 w-4" />
                              Chuyển thành nháp
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleStatusChange(post.id, "published")}>
                              <Eye className="mr-2 h-4 w-4" />
                              Xuất bản
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeletePost(post.id)}
                          >
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
              Hiển thị {blogPosts.length} bài viết
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

export default Blog;
