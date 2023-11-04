/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Col, DatePicker, Flex, Form, Input, Row, Select } from "antd";

import { fetchDataFromAPI } from "./data/filterapi";
import { useState } from "react";

type FilterProps = {
  setData: React.Dispatch<React.SetStateAction<any>>;
  enumText: { value: string; label: string }[];
};
function Filter({ setData, enumText }: FilterProps) {
  const [nivel, setNivel] = useState<any>("");
  const [startDate, setStartDate] = useState<any>("");
  const [endDate, setEndate] = useState<any>("");
  const [Relatorio, setRelatorio] = useState<any>("");

  const handleSeach = async () => {
    const response = await fetchDataFromAPI(
      nivel,
      startDate,
      endDate,
      Relatorio
    );
    const data = await response.json();

    setData([]);
    if (!data) {
      return;
    }
    setTimeout(() => {
      setData(data.data);
    }, 500);
  };
  return (
    <Form
      style={{
        display: "",

        padding: "40px",
        flexDirection: "column",

        gap: "20px",
      }}
      className="form-logs"
    >
      <Row gutter={20}>
        <Col span={10}>
          <Flex vertical={true}>
            <label htmlFor="">Data inicial</label>
            <DatePicker
              onChange={(_, dateString) => setStartDate(dateString)}
            />
          </Flex>
        </Col>
        <Col span={10}>
          <Flex vertical={true}>
            {" "}
            <label htmlFor="">Data Final</label>
            <DatePicker onChange={(_, dateString) => setEndate(dateString)} />
          </Flex>
        </Col>
        <Col className="mt-5 " span={10}>
          <div>
            <label htmlFor="">Nível</label>
            <Input onChange={(e: any) => setNivel(e.target.value)} />
          </div>
        </Col>
        <Col className="mt-5 " span={10}>
          <Flex vertical={true}>
            {" "}
            <label htmlFor="">Relatorio</label>
            <Select
              onChange={(_, value) => setRelatorio(value)}
              allowClear
              loading={enumText ? false : true}
              options={enumText}
            />{" "}
          </Flex>
        </Col>
      </Row>
      <Button className="form-input" onClick={handleSeach}>
        Pesquisar
      </Button>
    </Form>
  );
}
export default Filter;
