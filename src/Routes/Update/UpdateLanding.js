import React from 'react';
import { useEffect, useState } from 'react'
import './Update.css'
import { useNavigate } from 'react-router-dom';
import { AuthenticatedTemplate } from '@azure/msal-react';
import LoginMessage from '../../components/LoginMessage';
import { BlobServiceClient } from '@azure/storage-blob';
import { fetchTravelBlogs, deleteTravelBlog } from '../../store/travelBlogsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Create from '../Create/Create';
import Table from '../../components/TableComponent';
import Spinner from '../../components/Loading/Spinner';
import GetUserInfo from '../../components/GetUserInfo';

const UpdateLanding = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [refreshKey, setRefreshKey] = useState(0);
  const account = process.env.VITE_STORAGE_ACCOUNT  // get the storage account name from the .env file
  const sasToken = process.env.VITE_STORAGE_SAS  // get the SAS token from the .env file
  const userData = useSelector((state) => state.user.userData);
  const { status, data } = useSelector((state) => state.travelBlogs);

  const handleRowClick = (item) => {
    navigate(`/post/${item.id}`)
  };

  const handleColumnClick = async (item) => {
    dispatch(deleteTravelBlog(item))
    const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net/?${sasToken}`);  // create a blobServiceClient
    const containerClient = blobServiceClient.getContainerClient(item.id);
    await containerClient.delete();
    setRefreshKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    if (userData && userData.id) {
      dispatch(fetchTravelBlogs(userData.id));
    }
  }, [dispatch, userData, refreshKey]);

  return (
    <div className="App">
      <AuthenticatedTemplate>
        <GetUserInfo />
        <Create graphData={userData} />
        <br />
        <h6>Blogs Posted by you. Click on the Row to Edit</h6>
        {status === 'loading' ? (
          <Spinner />
        ) : status === 'succeeded' ? (
          <Table data={data} onRowClick={handleRowClick} onColumnClick={handleColumnClick} showDeleteColumn={true} />
        ) : <></>}
      </AuthenticatedTemplate>
      <LoginMessage />
    </div>
  )
}

export default UpdateLanding