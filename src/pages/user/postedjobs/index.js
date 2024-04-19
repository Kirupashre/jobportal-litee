import React, { useEffect } from "react";
import PageTitle from "../../../components/PageTitle";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/alertSlice";
import { Table, message } from "antd";
import { useNavigate } from "react-router-dom";
import { getPostedJobsByUserId, deleteJobById, getApplicationsByJobId } from "../../../apis/jobs";
import AppliedCandidates from "./AppliedCandidates";
import { app } from "../../../firebaseCongfig";

function PostedJobs() {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const dispatch = useDispatch();
  const [showAppliedCandidates , setShowAppliedCandidates] = React.useState(false);
  const [appliedCandidates , setAppliedCandidates] = React.useState([]);
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await getPostedJobsByUserId(user.id);
      if (response.success) {
        setData(response.data);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const deleteJob = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await deleteJobById(id);
      if (response.success) {
        setData(response.data);
        getData();
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const getAppliedCandidates= async (id) => {
    try{
      dispatch(ShowLoading());
      const response = await getApplicationsByJobId(id);
      if(response.success){
        setAppliedCandidates(response.data);
        if(!showAppliedCandidates)
        {
          setShowAppliedCandidates(true);
        }
      }
      dispatch(HideLoading());
    } catch(error){
      dispatch(HideLoading());
      message.error(error.message);
    }
  }
 

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Company",
      dataIndex: "company",
    },
    {
      title: "Posted On",
      dataIndex: "postedOn",
    },
    {
      title: "Last Date To Apply",
      dataIndex: "lastDateToApply",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="d-flex gap-3 align-items-center">
          <span className="underline"
          onClick={() => getAppliedCandidates(record.id)}
          >
            candidates
          </span>
          <i class="ri-delete-bin-line"
          onClick={() => deleteJob(record.id)}
          ></i>
          <i class="ri-pencil-line"
          onClick={() => navigate(`/posted-jobs/edit/${record.id}`)}
          ></i>
        </div>
      ),
    },
  ];

  

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <PageTitle title="Posted Jobs" />
        <button
          className="primary-outline-btn"
          onClick={() => navigate("/posted-jobs/new")}
        >
          NEW JOB
        </button>
      </div>

      <Table columns={columns} dataSource={data} />

      {showAppliedCandidates && <AppliedCandidates 
      showAppliedCandidates={showAppliedCandidates}
      setShowAppliedCandidates={setShowAppliedCandidates}
      appliedCandidates={appliedCandidates}
      reloadData={getAppliedCandidates}
      />}
    </div>
  );
}

export default PostedJobs;
