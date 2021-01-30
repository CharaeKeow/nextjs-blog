import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory) //get file names in /posts
  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '') //remove .md when creating id from file name

    //read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    //use gray-matter lib to parse the post metadata section (title, date) which is in YAML format
    const matterResult = matter(fileContents)

    return { //combine the id with the data
      id,
      ...matterResult.data
    }
  })

  return allPostsData.sort((a, b) => { //sort the posts by date
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  //return an array of objects withn params key and object with id key
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}