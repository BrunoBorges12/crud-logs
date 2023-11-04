/* eslint-disable @typescript-eslint/no-explicit-any */
import { logs } from "../type/requestsLogs";

function enumData(data: logs) {
  const enumLog = data.map((log) => {
    if (log)
      return {
        value: log.text,
        label: log.text,
      };
  });
  const uniq = getUniqueListBy(enumLog, "value");
  return uniq;
}

function getUniqueListBy(
  arr: ({ value: string; label: string } | undefined)[],
  key: string
) {
  return [
    ...new Map(
      arr.map((item: { [x: string]: any }) => [item[key], item])
    ).values(),
  ];
}

export default enumData;
