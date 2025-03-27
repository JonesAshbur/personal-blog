'use client';

import { useEffect, useState } from 'react';
import { GithubProjectCard } from '@/components/project/GithubProjectCard';
import { CustomIcon } from '@/components/shared/CustomIcon';
import { ProjectItemType } from '@/config/infoConfig';

// 备用数据
const FALLBACK_REPOS: ProjectItemType[] = [
  {
    name: "react-personal-blog",
    description: "个人博客模板，基于React和Next.js开发",
    link: { 
      href: "https://github.com/jonesashbur/react-personal-blog", 
      label: "react-personal-blog" 
    },
    gitStars: 42,
    gitForks: 12
  },
  {
    name: "markdown-editor",
    description: "简洁的Markdown编辑器，支持实时预览和自定义主题",
    link: { 
      href: "https://github.com/jonesashbur/markdown-editor", 
      label: "markdown-editor" 
    },
    gitStars: 28,
    gitForks: 8
  },
  {
    name: "code-snippet-manager",
    description: "代码片段管理工具，帮助开发者整理和分享常用代码",
    link: { 
      href: "https://github.com/jonesashbur/code-snippet-manager", 
      label: "code-snippet-manager" 
    },
    gitStars: 18,
    gitForks: 4
  }
];

export default function GitHubProjectsSection() {
  const [repos, setRepos] = useState<ProjectItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        // 客户端使用相对路径，不会有问题
        const res = await fetch('/api/github-repos');
        
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (Array.isArray(data) && data.length > 0) {
          setRepos(data);
        } else {
          // 如果返回的数据不是数组或为空，使用备用数据
          setRepos(FALLBACK_REPOS);
        }
      } catch (err) {
        console.error('Error fetching repos:', err);
        setError('获取GitHub仓库失败，显示备用数据');
        // 出错时使用备用数据
        setRepos(FALLBACK_REPOS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <div className="mx-auto flex flex-col max-w-xl gap-6 lg:max-w-none my-4 py-8 border-t border-muted">
      <h2 className="flex flex-row items-center justify-start gap-2 text-xl font-semibold tracking-tight md:text-3xl opacity-80 mb-4">
        <CustomIcon name='github' size={28}/>
        Open Source
      </h2>
      
      {error && (
        <p className="text-center text-orange-500 mb-2">{error}</p>
      )}
      
      {isLoading ? (
        <p className="text-center text-muted-foreground">Loading GitHub repositories...</p>
      ) : repos.length > 0 ? (
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3"
        >
          {repos.map((project: ProjectItemType) => (
            <GithubProjectCard key={project.name} project={project} titleAs='h3'/>
          ))}
        </ul>
      ) : (
        <p className="text-center text-muted-foreground">No repositories found.</p>
      )}
    </div>
  );
}
