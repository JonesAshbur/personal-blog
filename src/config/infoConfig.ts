export * from './projects'
// export * from './friends'
export * from './education'
export * from './career'
// export * from './activity'


// personal info
export const name = 'Kevin'
export const headline = 'Welcome to my website.'
export const introduction = 'I like coding, building interesting things and writing some tutorials that might be useful.'
export const email = 'jonesashbur@gmail.com'
export const githubUsername = 'jonesashbur'

// about page
export const aboutMeHeadline = "I'm Kevin, based in BeiJing, China."
export const aboutParagraphs = [
  "I love coding. I learned programming when I in college.",
  "I have a lot of hobbies, such as travelling, photography, reading, football, climb mountain and so on.",
  "I'm a big fan of AI and I'm trying to learn more about it.",
]


// blog
export const blogHeadLine = "What I've writing about."
export const blogIntro = "I've written something about AI, programming and life."


// social links
export type SocialLinkType = {
  name: string,
  ariaLabel?: string,
  icon: string,
  href: string
}

export const socialLinks: Array<SocialLinkType> = [
 
  {
    name: 'Github',
    icon: 'github',
    href: 'https://github.com/jonesashbur'
  },

]

// https://simpleicons.org/
export const techIcons = [
  "typescript",
  "javascript",
  "go",
  "cloudflare",
  // "java",
  // "oracle",
  "mysql",
  "react",
  "vercel",
  "docker",
  "git",
  "github",
  // "visualstudio",
  "ios",
  "apple",
  "wechat",
  "c",
  "rust",
  "html5",
  "css3",
  "kubernetes"
];
