import React from 'react';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTravelBlogs } from '../../store/travelBlogsSlice';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from '../../components/Loading/Loading'; 
import { searchTravelBlog } from '../../store/searchBlogSlice';
import Table from '../../components/TableComponent';

const Home = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const results = useSelector((state) => state.blogResults);
    const { status, data } = useSelector((state) => state.blogResults);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleSearch = async (event) => {
        event.preventDefault();
        setInputValue('')
        dispatch(searchTravelBlog(inputValue))
    }

    useEffect(() => {
        dispatch(fetchTravelBlogs());
    }, [dispatch]);

    const handleRowClick = (item) => {
        console.log('Row clicked:', item.id);
        navigate(`/view/${item.id}`)
    };


    return (
        <div className="Container">
            <Form onSubmit={handleSearch}>
                <Form.Group controlId="inputField" className="mb-3 ml-5">
                    <Form.Label>Enter Keyword to search Blogs by title, content, authors</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={1} // Specify the number of visible rows
                        type="text"
                        placeholder=""
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Button className="mb-3 mt-2 text-center" variant="primary" type="submit" disabled={inputValue === ''}>
                    Search Blogs
                </Button>
            </Form>
            {/* {results && Array.isArray(results.data) &&
                <Table
                    data={results['data']}
                    onRowClick={handleRowClick}
                    showDeleteColumn={false}
                />} */}
             {status === 'loading' ? (
                <Spinner />
            ) : status === 'succeeded' ? (
                <Table data={data} onRowClick={handleRowClick} showDeleteColumn={false} />
            ): <></>}
        </div>
    )
}

export default Home