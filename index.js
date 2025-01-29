const core = require('@actions/core');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

const run = async () => {
  try {
    const apiEndpoint = 'https://api.startleft.security/api/v1/ScannerAction/upload-file';

    const apiKey = core.getInput('api-key');
    const scanKey = core.getInput('scan-key');
    const filePath = core.getInput('file-path');
    // const apiEndpoint = core.getInput('api-endpoint');


    const form = new FormData();
    form.append('scanKey', scanKey)
    form.append('scanJsonFile', fs.createReadStream(filePath));

    const response = await axios.post(apiEndpoint, form, {
      headers: {
        ...form.getHeaders(),
        'x-api-key': apiKey
      }
    });

    console.log('File uploaded successfully:', response.data);
  } catch (error) {
    core.setFailed(`Action failed with error: ${error.messaage}`);
  }
};

run();
