
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Search, Calendar, User, ChevronRight, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  publishDate: string;
  category: string;
  tags: string[];
}

// Mock API function - will be replaced with real API call
const mockFetchBlogPosts = async (): Promise<BlogPost[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Example blog posts data
  const posts: BlogPost[] = [
    {
      id: '1',
      title: '10 Cách Giảm Rác Thải Nhựa Trong Cuộc Sống Hàng Ngày',
      slug: 'reduce-plastic-waste',
      excerpt: 'Khám phá các cách đơn giản để giảm thiểu rác thải nhựa và bảo vệ môi trường từ những thói quen hàng ngày.',
      content: '...',
      imageUrl: 'https://images.unsplash.com/photo-1528190336454-13cd56b45b5a',
      author: 'Ngọc Anh',
      publishDate: '2025-04-15',
      category: 'Lối Sống Xanh',
      tags: ['rác thải nhựa', 'môi trường', 'zero waste']
    },
    {
      id: '2',
      title: 'Hướng Dẫn Làm Vườn Hữu Cơ Tại Nhà',
      slug: 'home-organic-gardening',
      excerpt: 'Biến không gian nhỏ thành vườn rau hữu cơ của riêng bạn với những hướng dẫn chi tiết và dễ thực hiện.',
      content: '...',
      imageUrl: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2',
      author: 'Minh Tuấn',
      publishDate: '2025-03-28',
      category: 'Làm Vườn',
      tags: ['hữu cơ', 'làm vườn', 'rau sạch']
    },
    {
      id: '3',
      title: 'Các Sản Phẩm Thay Thế Thân Thiện Với Môi Trường',
      slug: 'eco-friendly-alternatives',
      excerpt: 'Khám phá những sản phẩm thay thế thân thiện với môi trường cho các vật dụng hàng ngày trong nhà bạn.',
      content: '...',
      imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
      author: 'Thu Hà',
      publishDate: '2025-03-10',
      category: 'Sản Phẩm Xanh',
      tags: ['thân thiện môi trường', 'sản phẩm xanh', 'tiêu dùng bền vững']
    },
    {
      id: '4',
      title: 'Hướng Dẫn Tái Chế Đúng Cách Tại Nhà',
      slug: 'home-recycling-guide',
      excerpt: 'Các bước cơ bản để tái chế hiệu quả tại nhà và tránh những sai lầm phổ biến trong quá trình tái chế.',
      content: '...',
      imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b',
      author: 'Đức Anh',
      publishDate: '2025-02-22',
      category: 'Tái Chế',
      tags: ['tái chế', 'zero waste', 'bền vững']
    },
    {
      id: '5',
      title: 'Những Lợi Ích Của Việc Sử Dụng Sản Phẩm Hữu Cơ',
      slug: 'benefits-of-organic-products',
      excerpt: 'Tìm hiểu về những lợi ích sức khỏe và môi trường khi bạn chọn sử dụng các sản phẩm hữu cơ.',
      content: '...',
      imageUrl: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf',
      author: 'Thanh Mai',
      publishDate: '2025-02-15',
      category: 'Sức Khỏe',
      tags: ['hữu cơ', 'sức khỏe', 'thực phẩm sạch']
    },
    {
      id: '6',
      title: 'Cách Giảm Tiêu Thụ Năng Lượng Trong Gia Đình',
      slug: 'reduce-home-energy-consumption',
      excerpt: 'Những mẹo đơn giản giúp giảm hóa đơn tiền điện và đóng góp vào việc bảo vệ môi trường.',
      content: '...',
      imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e',
      author: 'Hoàng Nam',
      publishDate: '2025-01-30',
      category: 'Tiết Kiệm Năng Lượng',
      tags: ['tiết kiệm năng lượng', 'bền vững', 'tiết kiệm chi phí']
    }
  ];
  
  return posts;
};

// Mock categories
const blogCategories = [
  { name: 'Tất cả', slug: 'all' },
  { name: 'Lối Sống Xanh', slug: 'green-living' },
  { name: 'Làm Vườn', slug: 'gardening' },
  { name: 'Sản Phẩm Xanh', slug: 'eco-products' },
  { name: 'Tái Chế', slug: 'recycling' },
  { name: 'Sức Khỏe', slug: 'health' },
  { name: 'Tiết Kiệm Năng Lượng', slug: 'energy-saving' }
];

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('vi-VN', options);
};

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBlogPosts = async () => {
      setIsLoading(true);
      try {
        const data = await mockFetchBlogPosts();
        
        // Set the first post as featured and remove it from the main list
        if (data.length > 0) {
          setFeaturedPost(data[0]);
          setPosts(data.slice(1));
        } else {
          setPosts(data);
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBlogPosts();
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger an API call with the search term
    console.log('Search term:', searchTerm);
  };
  
  return (
    <Layout>
      <div className="container-custom py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Blog</h1>
          
          <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-xs">
            <Input
              placeholder="Tìm kiếm bài viết..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
            <Button type="submit" variant="outline" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
        
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {blogCategories.map((category) => (
            <Button
              key={category.slug}
              variant={activeCategory === category.slug ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.slug)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-eco-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Featured post */}
            {featuredPost && (
              <div className="mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg overflow-hidden shadow-sm">
                  <div className="h-64 md:h-auto overflow-hidden">
                    <img 
                      src={featuredPost.imageUrl} 
                      alt={featuredPost.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-center">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span className="bg-eco-light text-eco-primary px-3 py-1 rounded-full text-xs font-medium">
                        {featuredPost.category}
                      </span>
                      <span className="mx-2">•</span>
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1" /> 
                        {formatDate(featuredPost.publishDate)}
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-3">
                      <Link to={`/blog/${featuredPost.slug}`} className="hover:text-eco-primary transition-colors">
                        {featuredPost.title}
                      </Link>
                    </h2>
                    
                    <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
                    
                    <div className="flex items-center mt-auto">
                      <div className="flex items-center text-sm">
                        <User className="h-3.5 w-3.5 mr-1 text-gray-500" /> 
                        <span className="text-gray-600">{featuredPost.author}</span>
                      </div>
                      
                      <Link to={`/blog/${featuredPost.slug}`} className="ml-auto text-eco-primary hover:underline flex items-center text-sm font-medium">
                        Đọc tiếp <ArrowRight className="h-3.5 w-3.5 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Blog post grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <Link to={`/blog/${post.slug}`} className="block h-48 overflow-hidden">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <div className="p-5">
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <span className="bg-eco-light text-eco-primary px-2 py-0.5 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                      <span className="mx-2">•</span>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" /> 
                        {formatDate(post.publishDate)}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                      <Link to={`/blog/${post.slug}`} className="hover:text-eco-primary transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                    
                    <div className="flex items-center mt-auto pt-2 border-t border-gray-100">
                      <div className="flex items-center text-xs">
                        <User className="h-3 w-3 mr-1 text-gray-500" /> 
                        <span className="text-gray-600">{post.author}</span>
                      </div>
                      
                      <Link to={`/blog/${post.slug}`} className="ml-auto text-eco-primary hover:underline flex items-center text-xs font-medium">
                        Đọc tiếp <ChevronRight className="h-3 w-3 ml-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  &laquo; Trước
                </Button>
                <Button variant="default" size="sm">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">
                  Sau &raquo;
                </Button>
              </div>
            </div>
          </>
        )}
        
        {/* Newsletter subscription */}
        <div className="mt-16 bg-eco-light rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Đăng ký nhận bản tin</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Nhận các bài viết mới nhất và mẹo hữu ích về lối sống bền vững trực tiếp vào hộp thư của bạn.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              placeholder="Email của bạn"
              type="email"
              className="w-full"
              required
            />
            <Button type="submit">
              Đăng ký
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;
