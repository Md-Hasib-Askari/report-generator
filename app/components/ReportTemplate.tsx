import React, {useEffect} from "react";
import { Card, Table, Typography } from "antd";
import "tailwindcss/tailwind.css";

const { Title, Text } = Typography;

// Mock Data Example
const demoStudent = {
  name: "MD. HASIB ASKARI",
  _class: "9",
  roll: "138378",
  section: "A",
  group: "SCIENCE",
  gender: "Male",
  result: "GPA=5.00",
};
type IStudent = {
  name: string;
  _class: string;
  roll: string;
  section: string;
  result: string;
  group?: string;
  gender?: string;
}

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
  { title: "Marks", dataIndex: "marks", key: "marks", align: "center" },
  { title: "Grade", dataIndex: "grade", key: "grade", align: "center" },
];

const ReportCard: React.FC = ({row, selectedClass, key}: {row: any, selectedClass: string, key: number}) => {
  // @ts-ignore
  // @ts-ignore
  const [studentInfo, setStudentInfo] = React.useState(demoStudent);
  const [subjects, setSubjects] = React.useState([]);
  const [continuousAssessment, setContinuousAssessment] = React.useState(false);
  useEffect(() => {
    const student: IStudent = {
      name: row.studentName,
      _class: row._class,
      roll:row.roll,
      section:row.section,
      result: row.result,
    } ;
    setStudentInfo(student);
    
    const keysToRemove = ["roll", "section", "studentName", "undefined"];
    
    const filteredObject = Object.fromEntries(
        Object.entries(row).filter(([key]) => !keysToRemove.includes(key))
    );
    
    const convertedData = Object.entries(filteredObject)
        .filter(([key, value]) => typeof value === "number") // Keep only numeric fields
        .map(([key, value], index) => ({
          key: (index + 1).toString(),
          code: 'demoCodeGenerate', // Generate a sample code dynamically
          name: key.toUpperCase(), // Convert names to uppercase
          marks: value, // Add marks from the input object
          grade: value >= 25 ? "A+" : "A", // Set grade based on value (example logic)
        }));
    
    setSubjects(convertedData);
    console.log(subjects);
    
    
  }, []);
  
  return (
    <div className="w-[210mm] h-[297mm] m-auto p-6 bg-white border shadow-lg">
      {/* Student Information Summary */}
      <Card className="mb-6">
        <Title level={4} className="text-center mb-4 text-green-600">
          Student Information Summary
        </Title>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <Text>Name of Student: {studentInfo.name}</Text>
          <Text>Class: {selectedClass}</Text>
          <Text>Section: {studentInfo.section}</Text>
          <Text>Roll No: {studentInfo.roll}</Text>
          {studentInfo.group &&  <Text>Group: {studentInfo.group}</Text>}
          {studentInfo.gender && <Text>Gender: {studentInfo.gender}</Text>}
          <Text>Result: {studentInfo.result}</Text>
        </div>
      </Card>

      {/* Subject-wise Grade/Marks */}
      <Card className="mb-6">
        <Title level={4} className="text-center mb-4 text-green-600">
          Subject-wise Grade/Marks
        </Title>
        <Table
          dataSource={subjects}
          columns={columns}
          pagination={false}
          bordered
          size="small"
        />
      </Card>

      {/* Subject-Wise Grade/Marks for Continuous Assessment */}
      {continuousAssessment && <Card>
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
      </Card>}
    </div>
  );
};

export default ReportCard;
