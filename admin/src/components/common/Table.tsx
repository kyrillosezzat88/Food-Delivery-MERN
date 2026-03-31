import type { ReactNode } from "react";

type TableColumn<T> = {
  key: keyof T | string;
  header: string;
  className?: string;
  headerClassName?: string;
};

type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  renderRow: (item: T, index: number) => ReactNode;
  className?: string;
};

function Table<T>({ columns, data, renderRow, className }: TableProps<T>) {
  return (
    <div className="overflow-hidden border border-gray-100 shadow-sm rounded-2xl bg-white">
      <div className="overflow-x-auto">
        <table
          className={`min-w-full divide-y divide-gray-100 ${className ?? ""}`}
        >
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  scope="col"
                  className={
                    col.headerClassName ??
                    "py-3.5 px-4 text-xs font-semibold text-left tracking-wide text-gray-500 uppercase whitespace-nowrap"
                  }
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {data.map((item, index) => renderRow(item, index))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
