import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Table, message } from "antd";
import { useNavigate } from "react-router-dom";
import {
  changeJobStatusFromAdmin,
  deleteJobById,
  editJobDetails,
  getAllJobs,
} from "../../apis/jobs";
import { HideLoading, ShowLoading } from "../../redux/alertSlice";
import PageTitle from "../../components/PageTitle";

function AllJobs() {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllJobs();
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

  const changeStatus = async (jobData, status) => {
    try {
      dispatch(ShowLoading());
      const response = await changeJobStatusFromAdmin({
        ...jobData,
        status,
      });
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
        <div className="d-flex gap-2 align-items-center">
          <i
            class="ri-delete-bin-line"
            onClick={() => deleteJob(record.id)}
          ></i>
          {record.status === "approved" && (
            <span
              className="underline"
              onClick={() =>
                changeStatus(record, "rejected")
              }
              
            >
              Rejected
            </span>
          )}
          {(record.status === "pending" || record.status === "rejected") && (
            <span
              className="underline"
              onClick={() =>
                changeStatus(record, "approved")
            }
            >
              Approve
            </span>
          )}
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
        <PageTitle title="All Jobs" />
        <button
          className="primary-outline-btn"
          onClick={() => navigate("/posted-jobs/new")}
        >
          NEW JOB
        </button>
      </div>

      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default AllJobs;
