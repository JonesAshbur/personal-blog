import { getAllBlogs, getAllTags } from '@/lib/blogs';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag') || 'all';
    const limit = parseInt(searchParams.get('limit') || '6');

    // 获取博客
    const blogs = await getAllBlogs(tag);

    // 限制返回数量
    const limitedBlogs = limit > 0 ? blogs.slice(0, limit) : blogs;

    return NextResponse.json(limitedBlogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

// 获取所有标签的API
export async function POST() {
  try {
    const tags = await getAllTags();
    return NextResponse.json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
  }
}
