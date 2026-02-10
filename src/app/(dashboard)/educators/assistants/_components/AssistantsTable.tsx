import {
  type Assistant,
  type AssistantsListView,
  type AssistantsPagination,
} from "@/app/(dashboard)/educators/assistants/_types/assistants";
import StatusLabel from "@/components/common/label/StatusLabel";
import { Pagination } from "@/components/common/pagination/Pagination";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type AssistantsTableProps = {
  listView: AssistantsListView;
  totalCount: number;
  assistants: Assistant[];
  statusColorMap: Record<Assistant["status"], "green" | "yellow" | "gray">;
  pagination: AssistantsPagination;
  onOpenAssistantDetail: (assistantId: string) => void;
  onPageChange: (page: number) => void;
};

export default function AssistantsTable({
  listView,
  totalCount,
  assistants,
  statusColorMap,
  pagination,
  onOpenAssistantDetail,
  onPageChange,
}: AssistantsTableProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>
            {listView === "active" ? "재직" : "퇴사"} 조교 {totalCount}명
          </span>
        </div>

        <div className="mt-4 rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox />
                </TableHead>
                <TableHead>조교명</TableHead>
                <TableHead>담당 과목</TableHead>
                <TableHead>연락처</TableHead>
                <TableHead>배정 클래스</TableHead>
                <TableHead>최근 업무</TableHead>
                <TableHead>상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assistants.map((assistant) => (
                <TableRow key={assistant.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>
                          {assistant.name.slice(0, 1)}
                        </AvatarFallback>
                      </Avatar>
                      <button
                        type="button"
                        className="font-medium text-primary underline-offset-2 hover:underline"
                        onClick={() => onOpenAssistantDetail(assistant.id)}
                      >
                        {assistant.name}
                      </button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                      {assistant.subject}
                    </span>
                  </TableCell>
                  <TableCell>{assistant.phone}</TableCell>
                  <TableCell>{assistant.className}</TableCell>
                  <TableCell>{assistant.task}</TableCell>
                  <TableCell>
                    <StatusLabel color={statusColorMap[assistant.status]}>
                      {assistant.status}
                    </StatusLabel>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Pagination pagination={pagination} onPageChange={onPageChange} />
      </CardContent>
    </Card>
  );
}
