

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    // const reducer = (sum, item) => { return sum + item }
    // console.log('Blogs right now: ', blogs)
    let sum = 0

    blogs.forEach(blog => {
        sum = sum + blog.likes
        // console.log('Sum right now: ', sum)
    })

    // console.log('Sum of likes: ', sum)
    return sum

    // const likes = blogs.likes
    // console.log(likes)

    // return likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    let favorite = {
        _id: '',
      title: '',
      author: '',
      url: '',
      likes: 0,
      __v: 0
    }

    blogs.forEach(blog => {
        if (blog.likes > favorite.likes) {
            favorite = blog
        }
    });
    const minified = {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
    console.log(minified)
    return minified
}

const mostBlogs = (blogs) => {
    let array = []
    let authorNames = []

    blogs.forEach(blog => {
        if (!authorNames.includes(blog.author)) {
            array.push({
                author: blog.author,
                blogs: 1
            })
            authorNames.push(blog.author)
        } else {
            objIndex = array.findIndex((obj => obj.author == blog.author))
            array[objIndex] = {
                author: blog.author,
                blogs: array[objIndex].blogs + 1
            }
        }
    })
    const x = Math.max.apply(Math, array.map(function(o) {return o.blogs}))
    const blogger = array.find(o => o.blogs === x)
    // console.log('Bloggaaja: ', blogger)
    return blogger
}

const mostLikes = (blogs) => {
    let array = []
    let authorNames = []

    blogs.forEach(blog => {
        if(!authorNames.includes(blog.author)) {
            array.push({
                author: blog.author,
                likes: blog.likes
            })
            authorNames.push(blog.author)
            } else {
                objIndex = array.findIndex((obj => obj.author == blog.author))
                array[objIndex] = {
                    author: blog.author,
                    likes: array[objIndex].likes + blog.likes
                }
            }
    })
    const x = Math.max.apply(Math, array.map(function(o) {return o.likes}))
    const blogger = array.find(o => o.likes === x)
    // console.log('Tykätyin bloggaaja: ', blogger)
    return blogger

}



module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}