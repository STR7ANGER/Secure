import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const PythonScriptRunner = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file && file.name.endsWith('.py')) {
                setSelectedFile(file);
                setOutput('');
                setError('');
            } else {
                setError('Only Python (.py) files are allowed');
            }
        },
        accept: {
            'application/x-python-code': ['.py']
        },
        multiple: false
    });

    const runPythonScript = async () => {
        if (!selectedFile) {
            setError('Please upload a Python script');
            return;
        }

        setIsLoading(true);
        setOutput('');
        setError('');

        const formData = new FormData();
        formData.append('script', selectedFile);

        try {
            const response = await axios.post('http://localhost:5001/run-python-script', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setOutput(response.data.output);
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ padding: '16px' }}>
            <div
                {...getRootProps()}
                style={{
                    border: '2px dashed #ccc',
                    padding: '32px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    marginBottom: '16px'
                }}
            >
                <input {...getInputProps()} />
                <p>
                    {selectedFile
                        ? `Selected: ${selectedFile.name}`
                        : 'Drag & drop a Python script, or click to select'}
                </p>
            </div>

            {error && <div style={{ color: 'red', marginTop: '8px' }}>{error}</div>}

            <button
                onClick={runPythonScript}
                disabled={!selectedFile || isLoading}
                style={{
                    marginTop: '16px',
                    padding: '8px 16px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                {isLoading ? 'Running...' : 'Run Script'}
            </button>

            {output && (
                <div style={{ marginTop: '16px' }}>
                    <h3>Output:</h3>
                    <pre style={{ backgroundColor: '#f7f7f7', padding: '8px', borderRadius: '4px' }}>{output}</pre>
                </div>
            )}
        </div>
    );
};

export default PythonScriptRunner;