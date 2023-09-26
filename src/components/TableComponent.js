import React from 'react';
import { Table as BootstrapTable, Button } from 'react-bootstrap';

const Table = ({ data, onRowClick, onColumnClick, showDeleteColumn }) => {
    return (
        <BootstrapTable striped bordered hover>

            <thead>
                <tr>
                    <th>Blog Title</th>
                    {!showDeleteColumn && <th>Author</th>}
                    <th>CreatedTimeStamp</th>
                    <th>LastUpdated</th>
                    {showDeleteColumn && <th>Action</th>}
                </tr>
            </thead>
            <tbody>
                {data.length === 0 ? ( // Check if data is empty
                    <tr>
                        <td colSpan={showDeleteColumn ? 5 : 4}>No records found</td>
                    </tr>
                ) : (
                    data.map((item) => (
                        <tr key={item.id} onClick={() => onRowClick(item)}>
                            <td>{item.blogTitle}</td>
                            {!showDeleteColumn && <td>{item.userName}</td>}
                            <td>{new Date(item.createTime).toLocaleString()}</td>
                            <td>{new Date(item.lastUpdateTime).toLocaleString()}</td>
                            {showDeleteColumn && (
                                <td>
                                    <Button
                                        variant="danger"
                                        onClick={(e) => { e.stopPropagation(); onColumnClick(item) }}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            )}
                        </tr>
                    ))
                )}
            </tbody>

        </BootstrapTable>
    );
}

export default Table;
