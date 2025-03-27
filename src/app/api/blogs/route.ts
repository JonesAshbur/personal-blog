import { getAllBlogs } from '@/lib/blogs';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 获取所有博客
    const blogs = await getAllBlogs();
    
    // 只返回前6篇博客
    const limitedBlogs = blogs.slice(0, 6);
    
    return NextResponse.json(limitedBlogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}
