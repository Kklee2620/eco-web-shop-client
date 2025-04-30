import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Calendar, User, Tag, Facebook, Twitter, Linkedin, ChevronRight } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  authorAvatar?: string;
  publishDate: string;
  category: string;
  tags: string[];
  readTime?: number;
}

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  publishDate: string;
}

// Mock API function to get blog post by slug
const mockGetPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (slug === 'reduce-plastic-waste') {
    return {
      id: '1',
      title: '10 Cách Giảm Rác Thải Nhựa Trong Cuộc Sống Hàng Ngày',
      slug: 'reduce-plastic-waste',
      excerpt: 'Khám phá các cách đơn giản để giảm thiểu rác thải nhựa và bảo vệ môi trường từ những thói quen hàng ngày.',
      content: `
<p>Trong thời đại ngày nay, rác thải nhựa đã trở thành một vấn đề môi trường nghiêm trọng trên toàn cầu. Theo thống kê, mỗi năm có khoảng 8 triệu tấn rác thải nhựa bị thải ra đại dương, gây ảnh hưởng nghiêm trọng đến hệ sinh thái biển và sức khỏe con người. Tuy nhiên, chúng ta hoàn toàn có thể góp phần giảm thiểu vấn đề này thông qua những hành động đơn giản trong cuộc sống hàng ngày.</p>

<h2>1. Sử dụng bình nước tái sử dụng</h2>

<p>Bình nước dùng một lần là một trong những loại rác thải nhựa phổ biến nhất. Việc chuyển sang sử dụng bình nước tái sử dụng làm từ thép không gỉ hoặc thủy tinh không chỉ giúp giảm rác thải nhựa mà còn tiết kiệm chi phí về lâu dài. Một bình nước chất lượng tốt có thể sử dụng trong nhiều năm, thay thế hàng trăm chai nhựa dùng một lần.</p>

<h2>2. Mang túi vải khi đi mua sắm</h2>

<p>Túi nhựa dùng một lần chiếm một phần đáng kể trong tổng lượng rác thải nhựa. Bằng cách mang theo túi vải khi đi mua sắm, bạn có thể giảm đáng kể việc sử dụng túi nhựa. Túi vải không chỉ bền hơn mà còn thân thiện với môi trường hơn so với túi nhựa.</p>

<h2>3. Nói không với ống hút nhựa</h2>

<p>Ống hút nhựa là một trong những vật dụng gây ô nhiễm biển nghiêm trọng nhất. Thay vào đó, bạn có thể sử dụng ống hút làm từ tre, thép không gỉ, hoặc đơn giản là không sử dụng ống hút. Nhiều nhà hàng và quán cà phê hiện nay đã chuyển sang sử dụng ống hút thân thiện với môi trường hoặc không cung cấp ống hút trừ khi có yêu cầu.</p>

<h2>4. Sử dụng hộp đựng thực phẩm tái sử dụng</h2>

<p>Hộp đựng thức ăn dùng một lần góp phần đáng kể vào lượng rác thải nhựa. Thay vào đó, bạn có thể sử dụng hộp đựng thực phẩm tái sử dụng làm từ thủy tinh hoặc thép không gỉ. Chúng không chỉ thân thiện với môi trường mà còn an toàn hơn cho sức khỏe, vì nhiều loại nhựa có th�� tiết ra các hóa chất độc hại khi tiếp xúc với thực phẩm nóng.</p>

<h2>5. Chọn sản phẩm không đóng gói hoặc đóng gói tối giản</h2>

<p>Nhiều sản phẩm hiện nay được đóng gói quá mức cần thiết, góp phần tạo ra nhiều rác thải nhựa. Khi mua sắm, hãy ưu tiên các sản phẩm không đóng gói hoặc đóng gói tối giản. Ví dụ, mua trái cây và rau củ không đóng gói, hoặc chọn các sản phẩm đóng gói trong giấy hoặc các vật liệu tái chế.</p>

<h2>6. Sử dụng các sản phẩm vệ sinh cá nhân thân thiện với môi trường</h2>

<p>Nhiều sản phẩm vệ sinh cá nhân như bàn chải đánh răng, băng vệ sinh, hay tăm bông đều được làm từ nhựa. Ngày nay, có nhiều lựa chọn thay thế thân thiện với môi trường như bàn chải đánh răng làm từ tre, băng vệ sinh tái sử dụng, hoặc tăm bông làm từ tre và bông hữu cơ.</p>

<h2>7. Tham gia các hoạt động dọn rác</h2>

<p>Ngoài việc giảm thiểu sử dụng nhựa, tham gia các hoạt động dọn rác tại địa phương cũng là một cách hiệu quả để góp phần bảo vệ môi trường. Các hoạt động này không chỉ giúp làm sạch môi trường mà còn nâng cao nhận thức về vấn đề ô nhiễm nhựa.</p>

<h2>8. Ưu tiên mua sản phẩm tái chế</h2>

<p>Khi cần mua sắm các sản phẩm mới, hãy ưu tiên chọn những sản phẩm được làm từ vật liệu tái chế. Điều này không chỉ giúp giảm rác thải mà còn khuyến khích các doanh nghiệp sản xuất sản phẩm thân thiện với môi trường hơn.</p>

<h2>9. Tái sử dụng và tái chế đúng cách</h2>

<p>Trước khi vứt bỏ đồ vật, hãy xem xét liệu chúng có thể được tái sử dụng theo cách khác không. Nhiều đồ vật nhựa có thể được tái sử dụng nhiều lần trước khi trở thành rác thải. Khi không thể tái sử dụng nữa, hãy đảm bảo chúng được tái chế đúng cách.</p>

<h2>10. Nâng cao nhận thức và lan tỏa thông điệp</h2>

<p>Cuối cùng, hãy chia sẻ kiến thức và kinh nghiệm của bạn về việc giảm thiểu rác thải nhựa với gia đình, bạn bè và cộng đồng. Mỗi người đều có thể tạo ra sự thay đổi, và khi kết hợp lại, những nỗ lực nhỏ có thể dẫn đến những thay đổi lớn.</p>

<h2>Kết luận</h2>

<p>Giảm thiểu rác thải nhựa không phải là một nhiệm vụ dễ dàng, nhưng với những hành động nhỏ hàng ngày, chúng ta hoàn toàn có thể góp phần bảo vệ môi trường. Hãy nhớ rằng, mỗi lựa chọn nhỏ đều quan trọng và có thể tạo nên sự khác biệt lớn cho hành tinh của chúng ta.</p>
      `,
      imageUrl: 'https://images.unsplash.com/photo-1528190336454-13cd56b45b5a',
      author: 'Ngọc Anh',
      authorAvatar: 'https://i.pravatar.cc/150?img=32',
      publishDate: '2025-04-15',
      category: 'Lối Sống Xanh',
      tags: ['rác thải nhựa', 'môi trường', 'zero waste', 'lối sống xanh'],
      readTime: 6
    };
  }
  
  // Default return null for not found
  return null;
};

// Mock API function to get related posts
const mockGetRelatedPosts = async (postId: string): Promise<RelatedPost[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return [
    {
      id: '2',
      title: 'Hướng Dẫn Làm Vườn Hữu Cơ Tại Nhà',
      slug: 'home-organic-gardening',
      imageUrl: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2',
      publishDate: '2025-03-28'
    },
    {
      id: '3',
      title: 'Các Sản Phẩm Thay Thế Thân Thiện Với Môi Trường',
      slug: 'eco-friendly-alternatives',
      imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
      publishDate: '2025-03-10'
    },
    {
      id: '4',
      title: 'Hướng Dẫn Tái Chế Đúng Cách Tại Nhà',
      slug: 'home-recycling-guide',
      imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b',
      publishDate: '2025-02-22'
    }
  ];
};

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('vi-VN', options);
};

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!slug) return;
        
        const postData = await mockGetPostBySlug(slug);
        setPost(postData);
        
        if (postData) {
          const related = await mockGetRelatedPosts(postData.id);
          setRelatedPosts(related);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
    // Scroll to top when blog post changes
    window.scrollTo(0, 0);
  }, [slug]);
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container-custom py-12">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="w-10 h-10 border-4 border-eco-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!post) {
    return (
      <Layout>
        <div className="container-custom py-12">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Bài viết không tồn tại</h1>
            <p className="mb-6 text-gray-600">Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
            <Button asChild>
              <Link to="/blog">Quay lại Blog</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <article className="container-custom py-12">
        {/* Back to blog link */}
        <div className="mb-6">
          <Button 
            asChild 
            variant="ghost" 
            className="pl-2 gap-1 hover:bg-eco-light hover:text-eco-primary transition-colors"
          >
            <Link to="/blog" className="flex items-center text-gray-500 hover:text-eco-primary">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Quay lại Blog
            </Link>
          </Button>
        </div>
        
        {/* Blog post header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link 
              to={`/blog/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`} 
              className="bg-eco-light text-eco-primary px-3 py-1 rounded-full text-xs font-medium hover:bg-eco-primary hover:text-white transition-colors"
            >
              {post.category}
            </Link>
            <span>•</span>
            <div className="flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1" /> 
              {formatDate(post.publishDate)}
            </div>
            {post.readTime && (
              <>
                <span>•</span>
                <span>{post.readTime} phút đọc</span>
              </>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{post.excerpt}</p>
          
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={post.authorAvatar} />
              <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-gray-700">{post.author}</span>
          </div>
        </header>
        
        {/* Featured image */}
        <div className="mb-8">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full rounded-xl object-cover max-h-[500px]"
          />
        </div>
        
        {/* Blog content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Blog post content */}
            <div 
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, index) => (
                <Link 
                  key={index} 
                  to={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  <Tag className="h-3.5 w-3.5 mr-1 text-gray-500" /> {tag}
                </Link>
              ))}
            </div>
            
            {/* Share buttons */}
            <div className="border-t border-b py-4 mb-8">
              <p className="text-sm font-medium mb-3">Chia sẻ bài viết:</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Related posts */}
            <div className="bg-white rounded-lg border p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Bài viết liên quan</h3>
              <div className="space-y-4">
                {relatedPosts.map((relatedPost) => (
                  <Link 
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="flex gap-4 group"
                  >
                    <div className="w-20 h-16 flex-shrink-0 overflow-hidden rounded">
                      <img 
                        src={relatedPost.imageUrl} 
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium line-clamp-2 group-hover:text-eco-primary transition-colors">
                        {relatedPost.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(relatedPost.publishDate)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              
              <Separator className="my-6" />
              
              {/* Categories */}
              <h3 className="text-lg font-semibold mb-4">Danh mục</h3>
              <div className="space-y-2">
                {['Lối Sống Xanh', 'Làm Vườn', 'Sản Phẩm Xanh', 'Tái Chế', 'Sức Khỏe', 'Tiết Kiệm Năng Lượng'].map((category) => (
                  <Link 
                    key={category}
                    to={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex justify-between items-center py-2 border-b border-gray-100 text-gray-700 hover:text-eco-primary transition-colors"
                  >
                    <span>{category}</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ))}
              </div>
              
              {/* Newsletter subscription */}
              <div className="mt-6 bg-eco-light rounded-lg p-4">
                <h4 className="text-sm font-semibold mb-2">Đăng ký nhận bản tin</h4>
                <p className="text-xs text-gray-600 mb-3">
                  Nhận các bài viết mới nhất và mẹo hữu ích về lối sống bền vững.
                </p>
                <input 
                  type="email" 
                  placeholder="Email của bạn" 
                  className="w-full mb-2 px-3 py-2 text-sm border rounded"
                />
                <Button size="sm" className="w-full text-sm">Đăng ký</Button>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </Layout>
  );
};

export default BlogDetail;
