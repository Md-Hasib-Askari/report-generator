import React from "react";
import { Card, Table, Typography } from "antd";
import "tailwindcss/tailwind.css";

const { Title, Text } = Typography;

// Mock Data Example
const studentInfo = {
  name: "MD. HASIB ASKARI",
  _class: "9",
  roll: "138378",
  section: "A",
  group: "SCIENCE",
  gender: "Male",
  result: "GPA=5.00",
};

const subjectData = [
  { key: "1", code: "101", name: "BANGLA", grade: "A+" },
  { key: "2", code: "107", name: "ENGLISH", grade: "A+" },
  { key: "3", code: "109", name: "MATHEMATICS", grade: "A+" },
  { key: "4", code: "150", name: "BANGLADESH AND GLOBAL STUDIES", grade: "A+" },
  { key: "5", code: "111", name: "ISLAM AND MORAL EDUCATION", grade: "A+" },
  { key: "6", code: "136", name: "PHYSICS", grade: "A+" },
  { key: "7", code: "137", name: "CHEMISTRY", grade: "A+" },
  { key: "8", code: "126", name: "HIGHER MATHEMATICS", grade: "A+" },
  {
    key: "9",
    code: "154",
    name: "INFORMATION AND COMMUNICATION TECHNOLOGY",
    grade: "A+",
  },
  { key: "10", code: "138", name: "BIOLOGY", grade: "A+" },
];

const continuousData = [
  {
    key: "1",
    code: "147",
    name: "PHYSICAL EDUCATION, HEALTH AND SPORTS",
    grade: "A+",
  },
  { key: "2", code: "156", name: "CAREER EDUCATION", grade: "A+" },
];

const columns = [
  { title: "Subject Code", dataIndex: "code", key: "code", align: "center" },
  { title: "Subject Name", dataIndex: "name", key: "name" },
  { title: "Grade", dataIndex: "grade", key: "grade", align: "center" },
];

const ReportCard: React.FC = () => {
  return (
    <div className="w-[210mm] h-[297mm] m-auto p-6 bg-white border shadow-lg">
      {/* Student Information Summary */}
      <Card className="mb-6">
        <Title level={4} className="text-center mb-4 text-green-600">
          Student Information Summary
        </Title>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <Text>Name of Student: {studentInfo.name}</Text>
          <Text>Class: {studentInfo._class}</Text>
          <Text>Section: {studentInfo.section}</Text>
          <Text>Roll No: {studentInfo.roll}</Text>
          <Text>Group: {studentInfo.group}</Text>
          <Text>Gender: {studentInfo.gender}</Text>
          <Text>Result: {studentInfo.result}</Text>
        </div>
      </Card>

      {/* Subject-wise Grade/Marks */}
      <Card className="mb-6">
        <Title level={4} className="text-center mb-4 text-green-600">
          Subject-wise Grade/Marks
        </Title>
        <Table
          dataSource={subjectData}
          columns={columns}
          pagination={false}
          bordered
          size="small"
        />
      </Card>

      {/* Subject-Wise Grade/Marks for Continuous Assessment */}
      <Card>
        <Title level={4} className="text-center mb-4 text-green-600">
          Subject-Wise Grade/Marks for Continuous Assessment
        </Title>
        <Table
          dataSource={continuousData}
          columns={columns}
          pagination={false}
          bordered
          size="small"
        />
      </Card>
    </div>
  );
};

export default ReportCard;
