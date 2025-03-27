import { githubUsername } from '@/config/infoConfig';
import { NextResponse } from 'next/server';

// 重试函数
async function fetchWithRetry(url: string, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, {
        next: { revalidate: 3600 }, // 1小时缓存
      });
      if (response.ok) return response;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw new Error('Max retries reached');
}

export async function GET() {
  try {
    const username = githubUsername;
    // 使用FastGithub镜像
    const githubApi = process.env.GITHUB_API_MIRROR || 'https://api.github.com';
    const response = await fetchWithRetry(`${githubApi}/users/${username}/repos?sort=updated&per_page=30`);
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch repos' }, { status: response.status });
    }
    
    const repos = await response.json();
    
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
    
    // Transform the data to match our ProjectItemType structure
    const formattedRepos = filteredRepos.map((repo: any) => ({
      name: repo.name,
      description: repo.description || '',
      link: { 
        href: `github.com/${username}/${repo.name}`, 
        label: repo.name 
      },
      gitStars: repo.stargazers_count,
      gitForks: repo.forks_count
    }));
    
    return NextResponse.json(formattedRepos);
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return NextResponse.json({ error: 'Failed to fetch repos' }, { status: 500 });
  }
}
