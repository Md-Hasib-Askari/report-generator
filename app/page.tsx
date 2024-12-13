"use client";

import React, {useEffect, useState} from 'react';
import { Upload, Button, Table, Select, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { calculateGPA, calculateFinalGPA } from '@/utils/gpaCalculator';
import {cols} from "@/public/columns";

const { Option } = Select;

type Column = {
    title: string;
    dataIndex: string;
    key: string;
}

const HomePage: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [cols6_8, setCols6_8] = useState<Column[]>(cols['class6_8']);
    const [cols9_10, setCols9_10] = useState<Column[]>([]);
    const [mappedFields, setMappedFields] = useState<Record<string, string>>({});
    const [selectedClass, setSelectedClass] = useState<string | undefined>(undefined);
    const [group, setGroup] = useState<"science" | "commerce" | "arts" | undefined>(undefined);

    useEffect(() => {
        if (selectedClass && group) {
            if (selectedClass === 'class9_10') {
                const commonCols = cols['class9_10']['common'];
                const scienceCols = cols['class9_10']['science'];
                const commerceCols = cols['class9_10']['commerce'];
                const artsCols = cols['class9_10']['arts'];
                const vocationalCols = cols['class9_10']['vocational'];
                const optionalCols = cols['class9_10']['optional'];
                switch (group) {
                    case 'science':
                        setCols9_10([...commonCols, ...scienceCols, ...vocationalCols, ...optionalCols]);
                        break;
                    case 'commerce':
                        setCols9_10([...commonCols, ...commerceCols, ...vocationalCols, ...optionalCols]);
                        break;
                    case 'arts':
                        setCols9_10([...commonCols, ...artsCols, ...vocationalCols, ...optionalCols]);
                        break;
                    default:
                        break;
                }
            }
        }
    }, [selectedClass, group]);

    const handleFileUpload = (file: File) => {
        console.log(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            const binaryStr = e.target?.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            const headers = parsedData[0];
            const rows = parsedData.slice(1).map((row: any[]) => {
                return headers.reduce((acc: any, header: string, index: number) => {
                    acc[header] = row[index] || '';
                    return acc;
                }, {});
            });

            // setColumns(headers);
            setData(rows);
        };
        reader.readAsBinaryString(file);
        return false;
    };

    const handleFieldMapping = (csvField: string, mappedField: string) => {
        setMappedFields((prev) => ({ ...prev, [csvField]: mappedField }));
    };

    const handleDownload = () => {
        if (!Object.values(mappedFields).includes('marks') || !Object.values(mappedFields).includes('subjects')) {
            message.error('Please map fields for marks and subjects.');
            return;
        }

        const processedData = data.map((row) => {
            const mappedRow: Record<string, any> = {};
            Object.entries(mappedFields).forEach(([csvField, mappedField]) => {
                mappedRow[mappedField] = row[csvField];
            });

            if (mappedRow.marks && mappedRow.subjects) {
                mappedRow.GPA = calculateGPA(mappedRow.marks);
            }

            return mappedRow;
        });

        const finalGPA = calculateFinalGPA(processedData);
        const finalData = [...processedData, { 'Final GPA': finalGPA }];

        const worksheet = XLSX.utils.json_to_sheet(finalData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Report Card');
        XLSX.writeFile(workbook, 'report_card.xlsx');
    };

    return (
        <div className="p-8 space-y-4">
            <h1 className="text-2xl font-bold text-center">Report Card Generator</h1>
            <div className="flex flex-row gap-4">
                <label className="block font-medium">Select Class</label>
                <Select allowClear className="w-[200px]" onSelect={
                    (value) => setSelectedClass(value as string)
                }>
                    <Option value="class6_8">Class 6-8</Option>
                    <Option value="class9_10">Class 9-10</Option>
                </Select>
                {
                    selectedClass === 'class9_10' && (
                        <>
                        <label className="block font-medium">Select Group</label>
                        <Select allowClear className="w-[200px]" onSelect={
                            (value) => setGroup(value as "science" | "commerce" | "arts")
                        }>
                            <Option value="science">Science</Option>
                            <Option value="commerce">Commerce</Option>
                            <Option value="arts">Arts</Option>
                        </Select>
                        </>
                    )
                }
                <Upload
                    beforeUpload={handleFileUpload}
                    accept=".csv,.xlsx,.xls"
                    showUploadList={false}
                >
                    <Button icon={<UploadOutlined />}>Upload CSV File</Button>
                </Upload>
            </div>

            {data.length > 0 && (
                <>
                    <div className="mt-4">
                        <Table
                            dataSource={data}
                            columns={columns.map((col) => ({
                                title: col,
                                dataIndex: col,
                                key: col,
                            }))}
                            pagination={false}
                            rowKey={(record, index) => index}
                        />
                    </div>

                    <div className="mt-4 space-y-2">
                        {columns.map((col) => (
                            <div key={col} className="flex items-center space-x-4">
                                <span className="w-1/4 font-medium">{col}</span>
                                <Select
                                    className="w-3/4"
                                    placeholder="Select a field to map"
                                    onChange={(value) => handleFieldMapping(col, value)}
                                >
                                    <Option value="studentName">Student Name</Option>
                                    <Option value="class">Class</Option>
                                    <Option value="section">Section</Option>
                                    <Option value="roll">Roll</Option>
                                    <Option value="subjects">Subjects</Option>
                                    <Option value="marks">Marks</Option>
                                </Select>
                            </div>
                        ))}
                    </div>

                    <Button type="primary" className="mt-4" onClick={handleDownload}>
                        Download Report Card
                    </Button>
                </>
            )}
        </div>
    );
};

export default HomePage;

