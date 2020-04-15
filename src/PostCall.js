
import React, { Component } from 'react';

class PostCall extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedFile: null,
            file: []
        }
    }

    onFileChange = event => {
        let selected = event.target.files[0]
        let size = selected.size
        if (size < 10000000)
            this.setState({ selectedFile: selected });
        else
            alert("big file try another file")

    };
    onFileUpload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);
        let  files=this.state.file
        files.push(formData)
        this.setState({
            file : files
        })
        fetch('http://demo6661420.mockable.io/', {
            method: 'post',
            body: formData
        }).then(res => {
            if (res.ok) {
                console.log(res.data);
                alert("File uploaded successfully.")
            }
        });
    }
    fileData = () => {

        if (this.state.selectedFile) {

            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Type: {this.state.selectedFile.type}</p>
                </div>
            );
        }
    };

    render() {

        return (
            <div>
                <h1>
                    GeeksforGeeks
            </h1>
                <h3>
                    File Upload using React!
            </h3>
                <div>
                    <input type="file" onChange={this.onFileChange} id='file' />
                    <button onClick={this.onFileUpload}>
                        Upload!
                </button>
                </div>
                {this.fileData()}
            </div>
        );
    }
}

export default PostCall;