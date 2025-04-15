# 个人博客网站

## 项目概述

这是一个基于Next.js构建的现代化个人博客网站，使用TypeScript开发，采用Tailwind CSS进行样式设计。网站提供了博客展示、个人介绍、项目展示等功能，支持响应式设计，适配各种设备屏幕。

## 技术栈

- **前端框架**: [Next.js](https://nextjs.org/) (v14.2)
- **编程语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式解决方案**: [Tailwind CSS](https://tailwindcss.com/)
- **UI组件**: 
  - [Radix UI](https://www.radix-ui.com/)
  - [Headless UI](https://headlessui.com/)
- **内容管理**: MDX (Markdown + JSX)
- **图标**: 
  - [Phosphor Icons](https://phosphoricons.com/)
  - [Lucide React](https://lucide.dev/)
- **部署平台**: [Vercel](https://vercel.com/) (推荐)

## 主要功能

- **博客系统**：支持MDX格式的博客文章，包含标签分类功能
- **项目展示**：展示个人GitHub项目
- **个人简介**：关于页面展示个人信息和技能
- **技术栈展示**：动态展示技术栈图标云
- **响应式设计**：适配桌面端和移动端
- **深色/浅色模式**：支持主题切换
- **访问统计**：集成了多种分析工具

## 项目结构

```
personal-blog/
├── public/                 # 静态资源
│   ├── images/             # 图片资源
│   └── github-contribution-snake/ # GitHub贡献图
├── scripts/                # 脚本文件
├── src/                    # 源代码
│   ├── app/                # Next.js App Router
│   │   ├── about/          # 关于页面
│   │   ├── api/            # API路由
│   │   ├── blogs/          # 博客页面
│   │   └── page.tsx        # 首页
│   ├── components/         # 组件
│   │   ├── about/          # 关于页面组件
│   │   ├── analytics/      # 分析组件
│   │   ├── blog/           # 博客组件
│   │   ├── home/           # 首页组件
│   │   ├── layout/         # 布局组件
│   │   ├── project/        # 项目组件
│   │   ├── shared/         # 共享组件
│   │   └── ui/             # UI组件
│   ├── config/             # 配置文件
│   │   ├── career.ts       # 职业经历配置
│   │   ├── education.ts    # 教育经历配置
│   │   ├── infoConfig.ts   # 个人信息配置
│   │   ├── projects.ts     # 项目配置
│   │   └── siteConfig.ts   # 网站配置
│   ├── content/            # 内容
│   │   └── blog/           # 博客文章(MDX)
│   ├── lib/                # 工具库
│   │   ├── blogs.ts        # 博客处理函数
│   │   ├── formatDate.ts   # 日期格式化
│   │   ├── mdx.ts          # MDX处理
│   │   └── utils.ts        # 通用工具函数
│   └── styles/             # 样式文件
├── .env.example            # 环境变量示例
├── next.config.mjs         # Next.js配置
├── package.json            # 项目依赖
├── tailwind.config.ts      # Tailwind配置
└── tsconfig.json           # TypeScript配置
```

## 快速开始

### 环境要求

- Node.js 18.x 或更高版本
- npm 或 pnpm 包管理器

### 安装步骤

1. 克隆仓库
```bash
git clone <仓库地址>
cd personal-blog
```

2. 安装依赖
```bash
npm install
# 或
pnpm install
```

3. 创建环境变量文件
```bash
cp .env.example .env.local
```
然后编辑 `.env.local` 文件，填入必要的环境变量。

4. 启动开发服务器
```bash
npm run dev
# 或
pnpm dev
```

5. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 构建生产版本

```bash
npm run build
# 或
pnpm build
```

### 启动生产服务器

```bash
npm run start
# 或
pnpm start
```

## 自定义配置

### 个人信息

编辑 `src/config/infoConfig.ts` 文件，修改个人信息、社交链接等。

### 博客文章

在 `src/content/blog/` 目录下创建 `.mdx` 文件，按照以下格式添加文章元数据：

```mdx
---
title: '文章标题'
description: '文章描述，标签1, 标签2'
date: '2023-01-01'
---

文章内容...
```

### 项目展示

编辑 `src/config/projects.ts` 文件，添加或修改项目信息。

### 网站配置

编辑 `src/config/siteConfig.ts` 文件，修改导航菜单、页脚等配置。

## 部署

### Vercel部署（推荐）

1. 在 [Vercel](https://vercel.com/) 创建账号并导入GitHub仓库
2. 配置环境变量
3. 点击部署

### 其他部署方式

也可以部署到任何支持Node.js的服务器或平台，如Netlify、AWS、阿里云等。

## 贡献指南

欢迎提交问题和功能请求！如果您想贡献代码，请遵循以下步骤：

1. Fork 仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个 Pull Request

## 许可证

本项目采用 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件。
