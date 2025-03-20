"use client";
import PostCard from "./post-card";
import { Post } from "@/types/posts/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Upload, Edit } from "lucide-react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { PostAPI } from "@/api/Post";
import { showErrorToast, showSuccessToast } from "@/lib/show-toast";
import { useRouter } from "next/navigation";

export default function PostSection({
  posts,
  allowEdit = false,
}: {
  posts: Post[];
  allowEdit?: boolean;
}) {
  const router = useRouter();
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [content, setContent] = useState<string>("");
  const [postToUpdate, setPostToUpdate] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const triggerFileInput = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
      setImageFile(file);
    };

    reader.readAsDataURL(file);
  };

  const savePost = async () => {
    await PostAPI.createPost({
      content,
      asset: imageFile,
    })
      .then((res) => {
        showSuccessToast("Post created successfully");
        router.refresh();
      })
      .catch((err) => {
        showErrorToast("Failed to create post");
      })
      .finally(() => {
        setIsEditingPost(false);
        setImagePreview(null);
        setContent("");
      });
  };

  const deletePost = async (id: string) => {
    await PostAPI.deletePost(id)
      .then((res) => {
        showSuccessToast("Post deleted successfully");
        router.refresh();
      })
      .catch((err) => {
        showErrorToast("Failed to delete post");
      });
  };

  const updatePost = async (id: string) => {
    await PostAPI.updatePost({
      id,
      content,
      asset: imageFile,
    })
      .then((res) => {
        showSuccessToast("Post updated successfully");
        router.refresh();
      })
      .catch((err) => {
        showErrorToast("Failed to update post");
      })
      .finally(() => {
        setIsEditingPost(false);
        setImagePreview(null);
        setContent("");
        setImageFile(null);
      });
  };

  const openUpdatePosts = async (post: Post) => {
    setContent(post.content);
    setImagePreview(post.asset);
    setIsEditingPost(true);
    setPostToUpdate(post.id);
    setImageFile(null);
  };

  const openEditPosts = () => {
    setIsEditingPost(true);
    setImageFile(null);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Posts</CardTitle>
          </div>
          {allowEdit && (
            <Button onClick={openEditPosts} variant="ghost" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          )}
        </CardHeader>
        <CardContent className="">
          {posts.length === 0 && (
            <div className="flex justify-center items-center h-32">
              <p>No posts found</p>
            </div>
          )}

          {posts.length > 0 && (
            <div className="px-9">
              <Carousel className="w-full px-2">
                <CarouselContent>
                  {posts.map((post, index) => (
                    <CarouselItem
                      key={index}
                      className="md:basis-1/2 lg:basis-1/1"
                    >
                      <PostCard
                        key={index}
                        post={post}
                        allowEdit={allowEdit}
                        openUpdatePost={openUpdatePosts}
                        deletePost={deletePost}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          )}
        </CardContent>
      </Card>

      {allowEdit && (
        <Dialog
          open={isEditingPost}
          onOpenChange={(open) => {
            if (!open) {
              setContent("");
              setImagePreview(null);
              setIsEditingPost(open);
              return;
            }

            setIsEditingPost(open);
          }}
        >
          <DialogContent className="sm:max-w-[500px] [&>button]:hidden max-h-[85vh] overflow-y-scroll">
            <DialogHeader>
              <DialogTitle>Upload Post</DialogTitle>
              <DialogDescription>
                Upload a post to your profile
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </div>
            <div className="grid gap-4 py-4">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />

              {imagePreview ? (
                <div className="flex flex-col items-center gap-4">
                  <div
                    className={`relative w-full h-80 rounded-md
                      overflow-hidden border-2 border-dashed border-muted-foreground/25`}
                  >
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <Button variant="outline" onClick={triggerFileInput}>
                    Choose Different Image
                  </Button>
                </div>
              ) : (
                <div
                  className={`flex flex-col items-center justify-center gap-4 cursor-pointer w-full  h-80 rounded-md
                     border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors`}
                  onClick={triggerFileInput}
                >
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground text-center">
                    Click to upload, or drag and drop
                    <br />
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditingPost(false);
                  setContent("");
                  setImagePreview(null);
                  setImageFile(null);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={
                  postToUpdate ? () => updatePost(postToUpdate) : savePost
                }
                disabled={!imagePreview}
              >
                {postToUpdate ? "Update Post" : "Post"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
