import { Input } from "@/components/ui/input";
import SelectBtn from "@/components/common/button/SelectBtn";
import {
  MATERIALS_TYPE_OPTIONS,
  SORT_OPTIONS,
} from "@/constants/materials.default";

export default function MaterialsFilter() {
  return (
    <div className="w-full border rounded-lg p-4 bg-white">
      <div className="flex flex-wrap gap-3 w-full items-center">
        <div className="w-full xl:flex-1 min-w-[300px]">
          <Input
            className="h-14 w-full p-4 text-base placeholder:text-base"
            placeholder="제목으로 검색해보세요"
          />
        </div>

        <div className="flex flex-wrap md:flex-nowrap gap-3 w-full xl:w-auto items-center">
          <div className="flex gap-2 w-full">
            <SelectBtn
              className="flex-1 w-full lg:w-[140px] h-14 text-base"
              optionSize="sm"
              value="ALL"
              placeholder="자료 유형"
              options={MATERIALS_TYPE_OPTIONS}
            />
            <SelectBtn
              className="flex-1 w-full lg:w-[140px] h-14 text-base"
              optionSize="sm"
              value="ALL"
              placeholder="최신 순"
              options={SORT_OPTIONS}
            />
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
