/* eslint-disable react-refresh/only-export-components */
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { useEffect, useRef, useState } from "react";
import { logs } from "./type/requestsLogs";
import Filter from "./components/Search";
import getLogs from "./data/getLogs";
import { ConfigProvider } from "antd/lib";
import ru_RU from "antd/lib/locale/ru_RU";
import enumData from "./utils/enumData";

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

const columns: ProColumns<logs>[] = [
  {
    title: "ID",

    dataIndex: "id",
    width: 48,
  },
  {
    title: "Nivel",
    dataIndex: "nivel",
    copyable: true,
    ellipsis: true,
    tip: "Relatorio dos logs",
  },
  {
    title: "Relatorio",
    dataIndex: "text",
    copyable: true,
    ellipsis: true,
    tip: "Relatorio dos logs",
  },
  {
    title: "Data",
    dataIndex: "date",
  },
];

export default function App() {
  const [data, setData] = useState<logs[]>([]);
  const [enumText, setEnumText] = useState<
    { value: string; label: string }[] | []
  >([]);

  const actionRef = useRef<ActionType>();
  useEffect(() => {
    const fetchData = async () => {
      const response = await getLogs();
      setData(response.data);

      setEnumText(enumData(response.data));
    };
    fetchData();
  }, []);
  return (
    <ConfigProvider locale={ru_RU}>
      <Filter setData={setData} enumText={enumText} />

      <ProTable
        columns={columns}
        actionRef={actionRef}
        loading={data.length > 0 ? false : true}
        dataSource={data}
        editable={{
          type: "multiple",
        }}
        columnsState={{
          persistenceKey: "pro-table-singe-demos",
          persistenceType: "localStorage",
          onChange(value) {
            console.log("value: ", value);
          },
        }}
        rowKey="id"
        search={false}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={false}
        dateFormatter="string"
        headerTitle="Logs"
      />
    </ConfigProvider>
  );
}
