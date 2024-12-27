import {Dispatch, useEffect, useState} from "react";
import { Modal, Button } from "antd";
import Template from "./Template.tsx";


const ReportModal = ({
  reportModal,
  setReportModal,
  data,
  selectedClass,
}: {
  reportModal: boolean;
  setReportModal: Dispatch<boolean>;
  data: {
    [_key: string]: never;
  }[];
  selectedClass?: string;
}) => {
  const [currentData, setCurrentData] = useState<never | null>(null);
  const [q, setQ] = useState<{
    [key: string]: never;
  }[]>([]);

  useEffect(() => {
    setQ(data);
  }, [data]);

  const handlePrint = () => {
    if (!q.length) {
      alert("Done")
    }
    console.log("Starting Printing...");
    console.log(q.length)
    const data = q.shift();
    console.log(q.length);
    console.log(data);
    setCurrentData(data as never);
  }

  useEffect(() => {
    console.log("Current Data: ", currentData);
  }, [currentData]);

  return (
    <Modal
      width={1000}
      open={reportModal}
      // open={true}
      onCancel={() => setReportModal(false)}
      footer={null}
    >
      <div>
        <Button color="primary" onClick={handlePrint}>
            Download PDF
        </Button>
        {
          currentData && selectedClass &&
            <Template data={currentData} selectedClass={selectedClass} />
        }
      </div>
    </Modal>
  );
};

export default ReportModal;
