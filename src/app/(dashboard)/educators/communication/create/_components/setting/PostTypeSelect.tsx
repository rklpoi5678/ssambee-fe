import { Card, CardContent } from "@/components/ui/card";
import { PostType } from "@/types/communication.type";

type PostTypeSelectProps = {
  selectedPostType: PostType;
  togglePostType: (postType: PostType) => void;
};

export default function PostTypeSelect({
  selectedPostType,
  togglePostType,
}: PostTypeSelectProps) {
  return (
    <Card>
      <CardContent className="p-6 space-y-2">
        <h3 className="font-semibold text-lg">게시글 분류</h3>
        <p className="text-sm text-muted-foreground">
          이 게시글이 어떤 내용인지 선택하세요.
        </p>

        <div className="grid grid-cols-2 gap-2">
          <Card
            className={`cursor-pointer transition-all ${
              selectedPostType === "NOTICE"
                ? "bg-blue-50 border-blue-600 shadow-md"
                : "bg-white border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
            }`}
            onClick={() => togglePostType("NOTICE")}
          >
            <CardContent className="p-4 flex items-center justify-center">
              <span
                className={`text-sm font-medium ${
                  selectedPostType === "NOTICE"
                    ? "text-blue-700"
                    : "text-neutral-600"
                }`}
              >
                공지
              </span>
            </CardContent>
          </Card>

          <Card
            className={`cursor-pointer transition-all ${
              selectedPostType === "SHARE"
                ? "bg-green-50 border-green-600 shadow-md"
                : "bg-white border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
            }`}
            onClick={() => togglePostType("SHARE")}
          >
            <CardContent className="p-4 flex items-center justify-center">
              <span
                className={`text-sm font-medium ${
                  selectedPostType === "SHARE"
                    ? "text-green-700"
                    : "text-neutral-600"
                }`}
              >
                자료 공유
              </span>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
