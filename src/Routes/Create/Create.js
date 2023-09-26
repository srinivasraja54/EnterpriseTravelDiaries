import React from 'react';
import { useState, useEffect } from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { BlobServiceClient } from '@azure/storage-blob';

const Create = (props) => {
    let navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const account = process.env.STORAGE_ACCOUNT  // get the storage account name from the .env file
    const sasToken = process.env.STORAGE_SAS  // get the SAS token from the .env file
    
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    function generateUniqueID() {
        const timestamp = new Date().getTime(); // Get current timestamp in milliseconds
        const uniqueIdentifier = Math.random().toString(36).substring(2, 15); // Generate a random string

        // Combine timestamp and unique identifier to create a unique ID
        const uniqueID = timestamp.toString() + uniqueIdentifier;

        return uniqueID;
    }

    const handleCreate = async (event) => {
        event.preventDefault();
        const uniqueID = generateUniqueID();
        const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net/?${sasToken}`);  // create a blobServiceClient
        const containerClient = blobServiceClient.getContainerClient(uniqueID);
        await containerClient.create();
        props.graphData && props.graphData.id && console.log(props.graphData)

        let blogdoc = {
            "id": uniqueID,
            "blogTitle": inputValue,
            "userName": props.graphData.displayName,
            "userId":  props.graphData.id,
            "blogText": "",
            "imageDirectory": uniqueID,
            "createTime": new Date().getTime(),
            "lastUpdateTime": new Date().getTime(),
            "tags": '',
            "likes": ''
        }
        setInputValue('')
        blogdoc && api.create(blogdoc)
        navigate(`/post/${uniqueID}`)
    }

    return (
        <div >
            <Form onSubmit={handleCreate}>
                <Form.Group controlId="inputField" className="mb-3">
                    <Form.Label ><h6>Enter a Blog Title to start Blogging: </h6></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="My Solo Backpacking to Mars"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Button className="mt-1" variant="primary" type="submit" disabled={inputValue === ''}>
                    Post a New Blog
                </Button>
            </Form>
        </div>
    )
}

export default Create