import React, { useEffect } from "react";
import PageTitle from "../../components/PageTitle";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alertSlice";
import { Table, message } from "antd";
import { useNavigate } from "react-router-dom";
import { getPostedJobsByUserId, deleteJobById, getApplicationsByUserId } from "../../apis/jobs";

function AppliedJobs() {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await getApplicationsByUserId(user.id);
      if (response.success) {
        setData(response.data);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };


  const columns = [
    {
      title: "Job",
      dataIndex: "jobTitle",
    },
    {
      title: "Company",
      dataIndex: "company",
    },
    {
      title: "Applied On",
      dataIndex: "appliedOn",
    },
    
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <PageTitle title="Applied Jobs" />
        
      </div>

      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default AppliedJobs;
