import { Container } from '@/components/layout/Container'
import SocialLinks from '@/components/home/SocialLinks'
import { headline, introduction } from '@/config/infoConfig'
import { GithubProjectCard } from '@/components/project/GithubProjectCard'
import { CustomIcon } from '@/components/shared/CustomIcon'
import IconCloud from "@/components/ui/icon-cloud";
import { techIcons } from '@/config/infoConfig'
import { ProjectItemType } from '@/config/infoConfig'
import { HomeBlogCard } from '@/components/home/HomeBlogCard'
import { BlogType } from '@/lib/blogs'
import dynamic from 'next/dynamic'

// 动态导入GitHub项目组件，避免TypeScript识别问题
const GitHubProjectsSection = dynamic(
  () => import('../components/home/GitHubProjectsSection'),
  { ssr: false, loading: () => <div className="text-center py-4">Loading GitHub projects...</div> }
)

// 获取博客数据（可以在服务器端安全获取）
async function getBlogs(): Promise<BlogType[]> {
  // 直接使用本地数据
  const { getAllBlogs } = await import('@/lib/blogs');
  return getAllBlogs();
}

export default async function Home() {
  const blogs = await getBlogs();
  
  return (
    <>
      <Container className="mt-9">
        {/* personal info */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-2">
          <div className='md:mt-20'>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl opacity-80">
              {headline}
            </h2>
            <p className="mt-6 text-base text-muted-foreground">
              {introduction}
            </p>
            <SocialLinks className='md:mt-24'/>
          </div>
          <div className="relative flex size-full items-center justify-center overflow-hidden w-full px-20 md:px-0 md:w-2/3 ml-auto md:mr-8">
            <IconCloud iconSlugs={techIcons} />
          </div>
        </div>
        
        {/* GitHub Projects - 使用客户端组件加载 */}
        <GitHubProjectsSection />
        
        {/* Blogs */}
        <div className="mx-auto flex flex-col max-w-xl gap-6 lg:max-w-none my-4 py-8 border-t border-muted">
          <h2 className="flex flex-row items-center justify-start gap-2 text-xl font-semibold tracking-tight md:text-3xl opacity-80 mb-4">
            <CustomIcon name='pencil' size={28}/>
            Blogs
          </h2>
          {blogs.length > 0 ? (
            <ul
              role="list"
              className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3"
            >
              {blogs.map((blog: BlogType) => (
                <li key={blog.slug}>
                  <HomeBlogCard blog={blog} titleAs='h3'/>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-muted-foreground">Loading blogs...</p>
          )}
        </div>
      </Container>
    </>
  )
}
