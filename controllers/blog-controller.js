import Blog from "../model/Blog";
import mongoose from "mongoose";
import User from "../model/User";


export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch (err) {
    return console.log(err);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No Blogs Available !!" });
  }
  return res.status(200).json({ blogs });
};

export const addBlog = async (req, res, next) => {
  const { title, description, createdBy } = req.body;
  let existingUser;
  try{
existingUser=await User.findById(createdBy);
  }
  catch(err)
  {
    console.log(err);
  }

  if(!existingUser)
  {
    return res.status(400).json({message:"Unable to find user by this ID"});
  }
  const blog = new Blog({
    title,
    description,
    createdBy,
  });

  try {
   const session=await mongoose.startSession();
   session.startTransaction();
   await blog.save({session});
   existingUser.blogs.push(blog);
   await existingUser.save(session);
   await session.commitTransaction();

  } catch (err) {
    console.log(err);
    return res.status(500).json({message:err});
  }
  return res.status(200).json({ blog });
};

export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, { title, description });
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to update the blog" });
  }

  return res.status(200).json({ blog });
};

export const getById = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (err) {
    return console.log(err);
  }

  if (!blog) {
    return res.status(404).json({ message: "Blog of this id doesnt exist" });
  }

  return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res, next) => {
  const blogId = mongoose.Types.ObjectId(req.params.id.trim());

//   console.log(req.params.id);
  let blog;

  try {
    const blog = await Blog.findByIdAndRemove(blogId).populate('createdBy');
    await blog.createdBy.blogs.pull(blog);
    await blog.createdBy.save();
    if (!blog) {
      return res
        .status(400)
        .json({ message: "Given id blog doesnt exist in database" });
    }
    return res.status(200).json({ message: "Successfully deleted !!" });
  } catch (err) {
    return console.log(err);
  }
};

export const getByUserId=async(req,res,next)=>{
    const userId=req.params.id;
    let userBlogs;
    try{
        userBlogs=await User.findById(userId).populate("blogs");

    }
    catch(err)
    {
        console.log(err);
    }
     if(!userBlogs)
     {
        return res.status(404).json({message:"No blogs there"});
     }
     return res.status(200).json({blogs:userBlogs});
}