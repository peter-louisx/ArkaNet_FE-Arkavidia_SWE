import { Post } from "@/types/posts/types";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Loader2Icon, Edit, Trash2 } from "lucide-react";
import { convertDateFormatToMonthYear, countTimeAfterDate } from "@/lib/utils";
import Image from "next/image";
import { COMPANY_PICTURE, PROFILE_PICTURE } from "@/lib/image-placeholder";
import Link from "next/link";
import { Button } from "../ui/button";

export default function PostCard({
  post,
  allowEdit = false,
  openUpdatePost,
  deletePost,
}: {
  post: Post;
  allowEdit?: boolean;
  openUpdatePost?: (post: Post) => void;
  deletePost?: (id: string) => void;
}) {
  return (
    <Card className="pb-0">
      <CardHeader className="flex flex-row items-center justify-between px-0 ">
        <div className="w-full">
          <CardTitle className=" w-full">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-4 px-4 items-center max-md:items-start">
                <Link
                  href={
                    post.type == "company"
                      ? `/company/${post.slug}`
                      : `/seeker/${post.slug}`
                  }
                >
                  <Avatar className="w-12 h-12 max-md:w-6 max-md:h-6">
                    <AvatarImage
                      src={
                        post.profile_picture ||
                        (post.type == "company"
                          ? COMPANY_PICTURE
                          : PROFILE_PICTURE)
                      }
                      alt={post.name ? post.name : "User"}
                    />
                    <AvatarFallback>
                      {" "}
                      <Loader2Icon className="h-4 w-4 animate-spin" />{" "}
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <h3 className="max-md:text-sm">
                    {post.name ? post.name : "User"}
                  </h3>
                  <p className="text-sm max-md:text-xs font-medium">
                    {post.headline}
                  </p>
                  <div className="text-sm max-md:text-xs  font-medium">
                    {post.created_at}
                  </div>
                </div>
              </div>
              {allowEdit && (
                <div className="flex items-end px-2 max-md:px-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openUpdatePost && openUpdatePost(post)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => deletePost && deletePost(post.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <div className="px-4 mb-8">
          <p>{post.content}</p>
        </div>
        {post.asset && (
          <Image
            src={post.asset}
            width={500}
            height={500}
            alt={post.name}
            className="rounded-b-md mt-5 w-full"
          />
        )}
      </CardContent>
    </Card>
  );
}
