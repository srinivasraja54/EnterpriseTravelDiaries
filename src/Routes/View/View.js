import React from 'react';
import { useEffect, useState } from 'react'
import { BlobServiceClient } from '@azure/storage-blob';
import { Carousel } from "../../components/Carousel/Carousel";
import "./View.css";
import { AuthenticatedTemplate } from '@azure/msal-react';
import LoginMessage from '../../components/LoginMessage';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findTravelBlog } from '../../store/travelBlogSlice';

export default function View() {
  const dispatch = useDispatch();
  const { parameter } = useParams();
  const travelBlog = useSelector((state) => state.travelBlog);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const account = process.env.STORAGE_ACCOUNT  // get the storage account name from the .env file
  const sasToken = process.env.STORAGE_SAS  // get the SAS token from the .env file
  const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net/?${sasToken}`);  // create a blobServiceClient
  const containerClient = blobServiceClient.getContainerClient(parameter);  // create a containerClient


  const fetchImages = async () => {
    if (!account || !sasToken) {  // check if the credentials are set
      alert('Please make sure you have set the Azure Storage credentials in the .env file');
      return;
    }
    try {
      setLoading(true); // Turn on loading

      const blobItems = containerClient.listBlobsFlat();  // get all blobs in the container 
      const urls = [];
      for await (const blob of blobItems) {
        const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);  // get the blob url
        urls.push({ name: blob.name, url: tempBlockBlobClient.url });  // push the image name and url to the urls array
      }
      setImageUrls(urls);  // set the urls array to the imageUrls state
    } catch (error) {
      console.error(error);  // Handle error
    } finally {
      setLoading(false);  // Turn off loading
    }
  };

  let slides = []
  imageUrls && imageUrls.map(i => {
    slides.push({ 'src': i.url, 'alt': i.name })
  })

  useEffect(() => {
    fetchImages();
    const blogToFind = { id: parameter };
    dispatch(findTravelBlog(blogToFind));
  }, [dispatch])

  return (
    <div className="App">
      <AuthenticatedTemplate>
        {travelBlog && travelBlog.data && travelBlog.data['blogText'] && <div className="row title">
          {travelBlog.data['blogTitle']}
        </div>}
        <div className="row mt-5">
          {travelBlog && travelBlog.data && travelBlog.data['blogText'] && <div className="col">
            {/* {travelBlog.data['blogText']} */}
            <div dangerouslySetInnerHTML={{ __html: travelBlog.data['blogText'] }} />
          </div>}
          <div className="col">
            {slides.length !== 0 ?
              <Carousel data={slides} /> :
              <p>
                <>Images not uploaded for slideshow</>
              </p>}
          </div>
        </div>
      </AuthenticatedTemplate>
      <LoginMessage />
    </div>
  );
}