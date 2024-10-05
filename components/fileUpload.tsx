import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      toast.success(result.message);
      setFile(null);
    } catch (error) {
      toast.error('Error uploading file');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Input type="file" onChange={handleFileChange} accept=".txt,.md,.json" />
      <Button onClick={handleUpload} disabled={!file}>
        Upload File
      </Button>
    </div>
  );
};

export default FileUpload;