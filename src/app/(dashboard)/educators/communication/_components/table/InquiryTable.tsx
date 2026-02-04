import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { INQUIRY_TABLE_COLUMNS, InquiryMock } from "./InquiryTableColumns";

export default function InquiryTable() {
  const router = useRouter();

  const handleRowClick = (inquiryId: string) => {
    router.push(`/educators/communication/${inquiryId}`);
  };

  return (
    <div className="border rounded-lg overflow-x-auto min-h-[550px]">
      <Table>
        <TableHeader>
          <TableRow>
            {INQUIRY_TABLE_COLUMNS.map((col) => (
              <TableHead
                key={col.key}
                className="whitespace-nowrap w-[50px] text-base px-4"
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {InquiryMock.length > 0 ? (
            InquiryMock.map((record, index) => (
              <TableRow
                key={`${record.date}-${index}`}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleRowClick(record.id)}
              >
                {INQUIRY_TABLE_COLUMNS.map((col) => (
                  <TableCell
                    key={col.key}
                    className="h-[50px] whitespace-nowrap text-base px-4"
                  >
                    {col.render(record)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={INQUIRY_TABLE_COLUMNS.length}
                className="text-center"
              >
                문의 기록이 없습니다.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
