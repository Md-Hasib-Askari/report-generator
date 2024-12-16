"use client";

import React, { useEffect, useState } from "react";
import {Upload, Button, Table, Select, Modal} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import { calculateGPA, calculateFinalGPA } from "@/utils/gpaCalculator";
import { cols } from "@/public/columns";
import ReportTemplate from "@/app/components/ReportTemplate";
import ReportModal from "@/app/components/ReportModal";

const { Option } = Select;

type Column = {
  title: string;
  dataIndex: string;
  key: string;
  type?: "common" | "science" | "commerce" | "arts";
};

const HomePage: React.FC = () => {
  const [data, setData] = useState<never[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [uploadCols, setUploadCols] = useState<string[]>([]);
  const [uploadData, setUploadData] = useState<never[]>([]);
  const [mappedFields, setMappedFields] = useState<Record<string, string>>({});
  const [reportModal, setReportModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string | undefined>(
    undefined,
  );
  const [group, setGroup] = useState<
    "science" | "commerce" | "arts" | undefined
  >(undefined);

  useEffect(() => {
    if (selectedClass) {
      const col = [
        {
          title: "Student Name",
          dataIndex: "studentName",
          key: "studentName",
        },
        {
          title: "Section",
          dataIndex: "section",
          key: "section",
        },
        {
          title: "Roll",
          dataIndex: "roll",
          key: "roll",
        },
      ];
      switch (selectedClass) {
        case "class6":
        case "class7":
        case "class8":
          setColumns([...col, ...cols["class6_8"]]);
          break;
        case "class9":
        case "class10":
          setColumns([...col, ...cols["class9_10"]]);
          break;
        default:
          break;
      }
    }
  }, [selectedClass, group]);

  const handleFileUpload = (file: File) => {
    console.log(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target?.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const headers = parsedData[0] as unknown[] as string[];

      setUploadCols(headers as string[]);
      setUploadData(parsedData.slice(1) as never[]);
      // map fields using headers in lower case and includes() from columns
      const mappedFields = headers.reduce(
        (acc: Record<string, string>, header: string) => {
          const column = columns.find((col) => {
            return col.title.toLowerCase().includes(header.toLowerCase());
          });
          if (column) {
            acc[header] = column.dataIndex;
          }
          return acc;
        },
        {},
      );
      setMappedFields(mappedFields);
    };
    reader.readAsBinaryString(file);
    return false;
  };

  useEffect(() => {
    const rows = uploadData?.map((row) => {
      const obj: Record<string, never> = {};
      uploadCols?.forEach((header, index) => {
        obj[mappedFields[header]] = row[index];
      });
      return obj;
    });
    setData(rows as never[]);
  }, [mappedFields, uploadCols, uploadData]);

  const handleFieldMapping = (csvField: string, mappedField: string) => {
    setMappedFields((prev) => ({ ...prev, [csvField]: mappedField }));
  };

  const handleDownload = () => {
    
    setReportModal(true);
    console.log(data[0]);
  };

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold text-center">Report Card Generator</h1>
      <div className="flex flex-row gap-4 align-middle">
        <label className="block font-medium">Select Class</label>
        <Select
          allowClear
          className="w-[200px]"
          onSelect={(value) => setSelectedClass(value as string)}
        >
          <Option value="class6">Class 6</Option>
          <Option value="class7">Class 7</Option>
          <Option value="class8">Class 8</Option>
          <Option value="class9">Class 9</Option>
          <Option value="class10">Class 10</Option>
        </Select>
        {selectedClass === "class9_10" && (
          <>
            <label className="block font-medium">Select Group</label>
            <Select
              allowClear
              className="w-[200px]"
              onSelect={(value) =>
                setGroup(value as "science" | "commerce" | "arts")
              }
            >
              <Option value="science">Science</Option>
              <Option value="commerce">Commerce</Option>
              <Option value="arts">Arts</Option>
            </Select>
          </>
        )}
        <Upload
          beforeUpload={handleFileUpload}
          accept=".csv,.xlsx,.xls"
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Upload CSV File</Button>
        </Upload>
        <Button type="primary" onClick={handleDownload}>
          View Report Card
        </Button>
      </div>

      <div className="mt-4 w-full overflow-x-auto">
        <Table
          dataSource={data}
          columns={columns}
          // pagination={false}
        />
      </div>

      <div className="mt-4 space-y-2">
        {uploadCols.map((col) => (
          <div key={col} className="flex items-center space-x-4">
            <span className="w-1/4 font-medium">{col}</span>
            <Select
              className="w-3/4"
              placeholder="Select a field to map"
              onChange={(value) => handleFieldMapping(col, value)}
            >
              {columns.map((column) => (
                <Option key={column.dataIndex} value={column.dataIndex}>
                  {column.title}
                </Option>
              ))}
            </Select>
          </div>
        ))}
      </div>
      <ReportModal reportModal={reportModal} setReportModal={setReportModal} data={data} selectedClass={selectedClass}/>
    </div>
  );
};

export default HomePage;
