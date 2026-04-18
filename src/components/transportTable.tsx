type TableProps = {
  data: number[][];
  destinyQuantity: number[];
  disponibleQuantity: number[];
};

export default function TableData({
  data,
  destinyQuantity,
  disponibleQuantity,
}: TableProps) {
  return (
    <table className="table-fixed ">
      <tbody>
        <tr className="">
          <td></td>
          {destinyQuantity.map((el, index) => (
            <th key={index}>{index + 1}</th>
          ))}
        </tr>

        {data.map((l, index) => (
          <tr key={index} className=" p-2">
            <th className="p-2">{String.fromCharCode(65 + index)}</th>
            {l.map((c, index1) => (
              <th key={index1} className="border p-2">
                {c !== 0 && c}
              </th>
            ))}
            <th>{disponibleQuantity[index]}</th>
          </tr>
        ))}

        <tr>
          <th></th>
          {destinyQuantity.map((el, index) => (
            <th>{el}</th>
          ))}
        </tr>
      </tbody>
    </table>
  );
}
