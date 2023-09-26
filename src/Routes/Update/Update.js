import React from 'react';
import { useEffect, useState, useRef } from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import './Update.css'
import { AiFillDelete } from 'react-icons/ai';
import { FaFileUpload } from 'react-icons/fa';
import Placeholder from '../../assets/placeholder.jpeg';
import { BlobServiceClient } from '@azure/storage-blob';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthenticatedTemplate } from '@azure/msal-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTravelBlog } from '../../store/travelBlogsSlice';
import { findTravelBlog } from '../../store/travelBlogSlice';
import LoginMessage from '../../components/LoginMessage';
import GetUserInfo from '../../components/GetUserInfo';
import Spinner from '../../components/Loading/Spinner';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Update = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { parameter } = useParams();
  const [file, setFile] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [titleValue, setTitleValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadDisabled, setUploadDisable] = useState();
  const travelBlogs = useSelector((state) => state.travelBlogs);
  const userData = useSelector((state) => state.user.userData);
  const { data, status } = useSelector((state) => state.travelBlog);

  //Storage account credentials
  const account = process.env.STORAGE_ACCOUNT  // get the storage account name from the .env file
  const sasToken = process.env.STORAGE_SAS  // get the SAS token from the .env file
  const fileLimit = process.env.FILE_LIMIT
  const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net/?${sasToken}`);  // create a blobServiceClient
  const containerClient = blobServiceClient.getContainerClient(parameter);  // create a containerClient



  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleTitleChange = (event) => {
    setTitleValue(event.target.value);
  }

  //fetch all images
  const statusCheck = async () => {
    if (!account || !sasToken) {  // check if the credentials are set
      alert('Please make sure you have set the Azure Storage credentials in the .env file');
      return;
    }
    try {
      let i = 1;
      let count = 0
      let iter = containerClient.listBlobsFlat();
      let blobItem = await iter.next();
      while (!blobItem.done) {
        // console.log(`Blob ${i++}: ${blobItem.value.name}`);
        blobItem = await iter.next();
        count += i
      }
      if (count >= fileLimit) {
        setUploadDisable(true) // disable submit button if more than 10 images are uploaded
      } else {
        setUploadDisable(false)
      }
      setFile(null)
    }
    catch { }
    finally {
    }
  }

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
      statusCheck()
    }
  };

  //save an Image
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {  // check if the file is selected
      alert('Please select an image to upload');
      return;
    }
    if (!account || !sasToken) {  // check if the credentials are set
      alert('Please make sure you have set the Azure Storage credentials in the .env file');
      return;
    }

    try {
      setLoading(true);
      // statusCheck()
      const blobName = `${new Date().getTime()}-${file.name}`; // Specify a default blob name if needed
      const blobClient = containerClient.getBlockBlobClient(blobName);  // get the blob client
      await blobClient.uploadData(file, { blobHTTPHeaders: { blobContentType: file.type } }); // upload the image
      await fetchImages();   // fetch all images again after the upload is completed
    } catch (error) {
      console.error(error);  // Handle error
    } finally {
      setLoading(false); // Turn off loading
    }
  };

  // delete an Image
  const handleDelete = async (blobName) => {
    if (!account || !sasToken) {  // check if the credentials are set
      alert('Please make sure you have set the Azure Storage credentials in the .env file'); return;
    }
    try {
      setLoading(true);  // Turn on loading
      // statusCheck()
      const blobClient = containerClient.getBlockBlobClient(blobName); // get the blob client
      await blobClient.delete(); // delete the blob
      fetchImages(); // fetch all images again after the delete is completed
    } catch (error) {
      console.log(error) // Handle error
    } finally {
      setLoading(false);  //
      statusCheck()
    }
  };


  const handleContentUpdate = async (event) => {
    event.preventDefault();
    // const blogentry = travelBlogs['data'].find((item) => item.id === parameter)
    const blogentry = data
    if (blogentry) {
      const updatedFields = {
        blogText: inputValue,
        lastUpdateTime: new Date().getTime(),
      };
      const payload = { ...blogentry, ...updatedFields }
      dispatch(updateTravelBlog(payload));
    }
  }

  const handleTitleUpdate = async (event) => {
    event.preventDefault();
    const blogentry = data
    if (blogentry) {
      const updatedFields = {
        blogText: titleValue,
        lastUpdateTime: new Date().getTime(),
      };
      const payload = { ...blogentry, ...updatedFields }
      dispatch(updateTravelBlog(payload));
    }
  }

  useEffect(() => {
    const blogentry = data && data
    if (blogentry && blogentry.blogText && blogentry.blogText !== null) {
      setInputValue(blogentry.blogText)
    }
    if (blogentry && blogentry.blogTitle && blogentry.blogTitle !== null) {
      setTitleValue(blogentry.blogTitle)
    }
  }, [data, parameter])

  useEffect(() => {
    fetchImages();
    const blogToFind = { id: parameter };
    dispatch(findTravelBlog(blogToFind));
  }, [dispatch, parameter])

  // Helper function to get the image name without extension
  const getImageNameWithoutExtension = (filename) => {
    const dotIndex = filename.lastIndexOf('.');
    return dotIndex !== -1 ? filename.slice(0, dotIndex) : filename;
  };

  return (
    <div className="Container mt-4">
      <GetUserInfo />
      <AuthenticatedTemplate>
        <>
          {status === 'loading' ? (
            <Spinner />
          ) : status === 'succeeded' && userData && userData.id === data.userId ? (
            <>
              <Form onSubmit={handleTitleUpdate}>
                <Form.Group controlId="inputField" className="mb-3 ml-5">
                  <Form.Label>Blog Title</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={1} // Specify the number of visible rows
                    type="text"
                    placeholder=""
                    value={titleValue}
                    onChange={handleTitleChange}
                  />
                </Form.Group>
                <Button className="mt-3 text-center" variant="primary" type="submit" disabled={titleValue === ''}>
                  Update Blog Title
                </Button>
              </Form>
              <Form onSubmit={handleContentUpdate}>
                <Form.Group controlId="inputField" className="mb-3 mt-3 ml-5">
                  <Form.Label>Blog Content</Form.Label>
                  <ReactQuill theme="snow" value={inputValue} modules={{
                    toolbar: {
                      container: [
                        ['bold', 'italic', 'underline', 'strike'], // Toggle buttons for formatting
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Lists
                        ['link'], // Link and image buttons
                        ['blockquote', 'code-block'],
                        [{ 'header': '1' }, { 'header': '2' }],
                        ['clean'],
                      ],
                    },
                  }}
                    formats={[
                      'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'link', 'blockquote', 'code-block', 'header', 'indent'
                    ]} onChange={setInputValue} />
                </Form.Group>
                <Button className="mt-3 text-center" variant="primary" type="submit" disabled={inputValue === ''}>
                  Update Blog Content
                </Button>
              </Form>
              <div className="row-form">

                <form className='upload-form'>
                  <div className='upload-form_display'>
                    {
                      file ? <img className="displayImg" src={URL.createObjectURL(file)} alt="no pic" />
                        : <img className="displayImg" src={Placeholder} alt="nopic" />
                    }
                  </div>

                  <div className='upload-form_inputs'>
                    <label htmlFor="fileInput"><FaFileUpload /></label>
                    <input type="file" style={{ display: "none" }} id="fileInput" onChange={(e) => { e.preventDefault(); setFile(e.target.files[0]) }} />
                    <Button className="mt-3" type="submit" onClick={handleSubmit} disabled={uploadDisabled} >Upload</Button>
                  </div>
                </form>
              </div>

              <div className="row-display">
                {imageUrls.length === 0 ? <h3>Images not uploaded yet</h3> : (
                  <h3> Click on Images to view Blog</h3> && (
                    imageUrls && imageUrls.map((blobItem, index) => {
                      return (
                        <div key={index} className="card" onClick={(e) => { e.preventDefault(); navigate(`/view/${parameter}`) }}>
                          <img src={blobItem.url} alt="no pic" />
                          <h3 style={{ width: "90%" }}>{getImageNameWithoutExtension(blobItem.name)}</h3>
                          <button className="del" onClick={() => handleDelete(blobItem.name)} > <AiFillDelete /> </button>
                        </div>
                      )
                    })
                  ))}
              </div>
            </>) : (<p>You are not authorized to update this blog</p>
          )}
        </>

      </AuthenticatedTemplate>
      <LoginMessage />
    </div>
  )
}

export default Update