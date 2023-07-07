'use client';
import { NextPage } from 'next';
import { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/system';

interface Props {
  dirs: string[];
}

const StyledContainer = styled(Container)({
  background: '#f5f5f5',
  borderRadius: '15px',
  boxShadow: '0 3px 5px 2px rgba(125, 125, 125, .3)',
  color: 'black',
  height: 'auto',
  padding: '20px 30px',
  marginTop: '50px',
});

const ServerResponse = styled('div')({
  background: '#f5f5f5',
  borderRadius: '15px',
  boxShadow: '0 3px 5px 2px rgba(125, 125, 125, .3)',
  color: 'black',
  padding: '20px 30px',
  marginTop: '20px',
});

const Home: NextPage<Props> = ({ dirs }) => {
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [serverData, setServerData] = useState<any>(null);

  const handleUpload = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setServerData(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <StyledContainer maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h3" color="text.secondary">
          Detect Fruits
        </Typography>
        {serverData && (
          <ServerResponse>
            <Typography variant="body1" color="text.primary">
              {serverData.confidence < .95 ? (
                "No fruit detected"
              ) : (
                <>
                  Type: {serverData.class}
                  <br />
                  Confidence: {serverData.confidence}
                </>
              )}
            </Typography>
          </ServerResponse>
        )}

        <Box component="form" noValidate sx={{ mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label>
            <input
              type="file"
              hidden
              onChange={({ target }) => {
                if (target.files) {
                  const file = target.files[0];
                  setSelectedImage(URL.createObjectURL(file));
                  setSelectedFile(file);
                }
              }}
            />
            <div className="w-60 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
              {selectedImage ? (
                <img src={selectedImage} alt="" className="rounded" />
              ) : (
                <Typography variant="h6" color="text.secondary">Select Image</Typography>
              )}
            </div>
          </label>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleUpload}
            disabled={uploading}
            style={{ opacity: uploading ? ".5" : "1" }}
            className="bg-red-600 p-3 w-40 text-center rounded text-white"
          >
            {uploading ? "Uploading.." : "Upload"}
          </Button>
        </Box>

      </Box>
    </StyledContainer>
  );
};

export default Home;
