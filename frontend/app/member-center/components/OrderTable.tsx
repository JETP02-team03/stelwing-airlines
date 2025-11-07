import type React from "react"

export interface Column {
  key: string;
  title: string;
  width?: number;
  align?: "left" | "center" | "right"
  render?: (value: any, row: any, index: number) => React.ReactNode
}

interface OrderTableProps {
  columns: Column[];
  data: any[];
}

export default function OrderTable({ columns, data }: OrderTableProps) {
  const getAlignClass = (align?: "left" | "center" | "right") => {
    switch (align) {
      case "center":
        return "text-center"
      case "right":
        return "text-right"
      default:
        return "text-left"
    }
  };

  return (
    <div className="border-2 border-[#DCBB87] rounded-lg overflow-hidden">
      <table className="w-full bg-white">
        <thead className="bg-[#1F2E3C] text-white">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`py-3 px-4 ${getAlignClass(column.align)}`}
                style={{ width: column.width }}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={row.id || rowIndex}
              className="border-b border-[#E5E5E5] last:border-b-0 hover:bg-gray-50 transition-colors"
            >
              {columns.map((column) => (
                <td key={column.key} className={`py-3 px-4 ${getAlignClass(column.align)}`}>
                  {column.render ? column.render(row[column.key], row, rowIndex) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

