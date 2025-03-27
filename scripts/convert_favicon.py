from PIL import Image
import os

src_path = os.path.join('src', 'images', 'photo.jpg')
dest_dir = 'public'

# 打开源图片
img = Image.open(src_path)

# 转换为PNG格式
img = img.convert('RGBA')

# 生成不同尺寸的图标
sizes = {
    'android-chrome-192x192.png': (192, 192),
    'android-chrome-512x512.png': (512, 512),
    'apple-touch-icon.png': (180, 180),
    'favicon-16x16.png': (16, 16),
    'favicon-32x32.png': (32, 32)
}

for filename, size in sizes.items():
    resized = img.resize(size, Image.Resampling.LANCZOS)
    resized.save(os.path.join(dest_dir, filename))

# 生成favicon.ico
ico_size = (32, 32)
ico = img.resize(ico_size, Image.Resampling.LANCZOS)
ico.save(os.path.join(dest_dir, 'favicon.ico'))