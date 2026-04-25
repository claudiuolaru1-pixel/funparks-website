const fs=require('fs');
const path=require('path');

// Create the publish API route
fs.mkdirSync('app/api/publish',{recursive:true});
const publishRoute=`import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { post } = await req.json();
    if (!post || !post.slug) return NextResponse.json({error:'Missing post data'},{status:400});

    const token = process.env.GITHUB_TOKEN;
    if (!token) return NextResponse.json({error:'GitHub token not configured'},{status:500});

    const owner = 'claudiuolaru1-pixel';
    const repo = 'funparks-website';
    const filePath = 'public/blog-posts.json';

    // 1. Get current file from GitHub
    const getRes = await fetch(\`https://api.github.com/repos/\${owner}/\${repo}/contents/\${filePath}\`, {
      headers: {
        Authorization: \`Bearer \${token}\`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'funparks-agent'
      }
    });

    if (!getRes.ok) {
      const err = await getRes.json();
      return NextResponse.json({error:'Failed to fetch file: '+err.message},{status:500});
    }

    const fileData = await getRes.json();
    const currentContent = Buffer.from(fileData.content, 'base64').toString('utf8');
    const posts = JSON.parse(currentContent);

    // 2. Check for duplicate
    if (posts.find(p => p.slug === post.slug)) {
      return NextResponse.json({error:'Post already exists'},{status:409});
    }

    // 3. Add new post at top
    posts.unshift(post);
    const newContent = JSON.stringify(posts, null, 2);
    const encoded = Buffer.from(newContent).toString('base64');

    // 4. Commit to GitHub
    const updateRes = await fetch(\`https://api.github.com/repos/\${owner}/\${repo}/contents/\${filePath}\`, {
      method: 'PUT',
      headers: {
        Authorization: \`Bearer \${token}\`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'funparks-agent',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: \`Add blog post: \${post.title}\`,
        content: encoded,
        sha: fileData.sha
      })
    });

    if (!updateRes.ok) {
      const err = await updateRes.json();
      return NextResponse.json({error:'Failed to commit: '+err.message},{status:500});
    }

    return NextResponse.json({success:true, slug:post.slug});
  } catch(e) {
    return NextResponse.json({error:e.message},{status:500});
  }
}
`;
fs.writeFileSync('app/api/publish/route.js',publishRoute,'utf8');
console.log('Created publish API route');