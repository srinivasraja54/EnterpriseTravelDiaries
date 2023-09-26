import React from 'react';
import { useEffect } from 'react'
import './View.css'
import { useNavigate } from 'react-router-dom';
import { AuthenticatedTemplate } from '@azure/msal-react';
import LoginMessage from '../../components/LoginMessage';
import { fetchTravelBlogs } from '../../store/travelBlogsSlice';
import { useDispatch, useSelector } from 'react-redux';
import GetUserInfo from '../../components/GetUserInfo';
import Table from '../../components/TableComponent';
import Spinner from '../../components/Loading/Spinner';

const UpdateLanding = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const { status, data } = useSelector((state) => state.travelBlogs);

  const handleRowClick = (item) => {
    navigate(`/view/${item.id}`)
  };

  useEffect(() => {
    if (userData && userData.id) {
      dispatch(fetchTravelBlogs(userData.id));
    }
  }, [dispatch, userData]);

  return (
    <div className="App">
      <AuthenticatedTemplate>
      <GetUserInfo />
        <h5>List of Blogs Posted by You. Click on the item to View</h5>
        <br />
        {status === 'loading' ? (
          <Spinner />
        ) : status === 'succeeded' ? (
          <Table data={data} onRowClick={handleRowClick} showDeleteColumn={false} />
        ) : <></>}
      </AuthenticatedTemplate>
      <LoginMessage />
    </div>
  )
}

export default UpdateLanding