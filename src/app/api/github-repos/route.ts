import { githubUsername } from '@/config/infoConfig';
import { NextResponse } from 'next/server';

// GitHub API镜像列表
const GITHUB_API_MIRRORS = [
  'https://api.github.com',               // 官方API
];

// 模拟数据，当所有API访问都失败时使用
const FALLBACK_REPOS = [
  {
    name: "golang_Grpc",
    description: "grpc learning record",
    link: { href: `https://github.com/${githubUsername}/golang_Grpc`, label: "golang_Grpc" },
    gitStars: 0,
    gitForks: 0
  },
  {
    name: "golang_Gin",
    description: "gin learning record",
    link: { href: `https://github.com/${githubUsername}/golang_Gin`, label: "golang_Gin" },
    gitStars: 0,
    gitForks: 0
  },
  {
    name: "golang_DataStructure",
    description: "Data structures and algorithms, implemented in go language",
    link: { href: `https://github.com/${githubUsername}/golang_DataStructure`, label: "golang_DataStructure" },
    gitStars: 0,
    gitForks: 0
  },
  {
    name: "golang_Learning",
    description: "golang learning record",
    link: { href: `https://github.com/${githubUsername}/golang_Learning`, label: "golang_Learning" },
    gitStars: 0,
    gitForks: 0
  }
];

// 增强版重试函数，支持多个API端点
async function fetchWithFallbacks(username: string, maxRetries = 2, timeout = 10000) {
  // 为每个API镜像创建一个fetch Promise
  const fetchPromises = GITHUB_API_MIRRORS.map(async (baseUrl, index) => {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const controller = new AbortController();
        // 设置超时
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        
        console.log(`[Mirror ${index + 1}] 尝试获取GitHub数据，第${i + 1}次: ${baseUrl}/users/${username}/repos`);
        
        const response = await fetch(`${baseUrl}/users/${username}/repos?sort=updated&per_page=30`, {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'next-personal-blog'
          },
          signal: controller.signal,
          next: { revalidate: 450 }, // 1小时缓存
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          console.log(`[Mirror ${index + 1}] 成功获取数据`);
          return await response.json();
        }
        
        console.log(`[Mirror ${index + 1}] 尝试失败，状态码: ${response.status}`);
      } catch (error: any) {
        if (error.name === 'AbortError') {
          console.log(`[Mirror ${index + 1}] 请求超时`);
        } else {
          console.error(`[Mirror ${index + 1}] 第${i + 1}次尝试失败:`, error);
        }
        
        if (i === maxRetries - 1) {
          console.log(`[Mirror ${index + 1}] 达到最大重试次数`);
        } else {
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
      }
    }
    
    // 如果所有重试都失败，返回null
    return null;
  });
  
  // 使用Promise.race获取最快返回结果的镜像
  return Promise.race([
    Promise.any(fetchPromises).catch(e => {
      console.error('所有GitHub API镜像都失败:', e);
      return null;
    }),
    // 总超时保护
    new Promise(resolve => setTimeout(() => {
      console.log('总体请求超时，使用备用数据');
      resolve(null);
    }, timeout * 3))
  ]);
}

export async function GET() {
  try {
    const username = githubUsername;
    if (!username) {
      console.error('GitHub用户名未定义');
      return NextResponse.json(FALLBACK_REPOS);
    }
    
    console.log(`正在获取GitHub用户 ${username} 的仓库`);
    
    // 尝试从多个镜像获取数据
    const repos = await fetchWithFallbacks(username);
    
    // 如果所有API都失败，使用备用数据
    if (!repos) {
      console.log('使用备用数据');
      return NextResponse.json(FALLBACK_REPOS);
    }
    
    console.log(`成功获取到 ${repos.length} 个仓库`);
    
    // 需要过滤的仓库名称
    const excludeRepos = [
      'personal-blog', 
      '.github', 
      `${username}.github.io`, 
      'blog',
      'my-blog',
      'website',
      'portfolio'
    ];
    
    // 过滤掉特定仓库，并限制为10个
    const filteredRepos = repos
      .filter((repo: any) => {
        // 过滤掉fork的仓库、特定名称的仓库、空仓库和存档的仓库
        return !repo.fork && 
               !excludeRepos.includes(repo.name.toLowerCase()) && 
               !repo.name.toLowerCase().includes('blog') &&
               repo.description && 
               !repo.archived;
      })
      .slice(0, 10);
    
    console.log(`过滤后剩余 ${filteredRepos.length} 个仓库`);
    
    // 如果过滤后没有仓库，使用备用数据
    if (filteredRepos.length === 0) {
      console.log('过滤后没有仓库，使用备用数据');
      return NextResponse.json(FALLBACK_REPOS);
    }
    
    // Transform the data to match our ProjectItemType structure
    const formattedRepos = filteredRepos.map((repo: any) => ({
      name: repo.name,
      description: repo.description || '',
      link: { 
        href: `https://github.com/${username}/${repo.name}`, 
        label: repo.name 
      },
      gitStars: repo.stargazers_count,
      gitForks: repo.forks_count
    }));
    
    return NextResponse.json(formattedRepos);
  } catch (error: any) {
    console.error('Error fetching GitHub repos:', error);
    // 发生错误时返回备用数据，确保页面始终有内容显示
    return NextResponse.json(FALLBACK_REPOS);
  }
}
