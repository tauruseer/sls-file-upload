# SLS Pipeline Uploader

This GitHub Action uploads results from CycloneDX or Sarif files to SLS in your pipeline..

## Inputs

| Name            | Description                                                | Required | Default             |
|-----------------|------------------------------------------------------------|----------|---------------------|
| `scan-key`      | The asset identifier found in the asset details page       | Yes      |                     |
| `api-key`       | The users API key for the SLS public API                   | Yes      |                     |
| `file-path`     | The path to the file being uploaded                        | Yes      |                     |


## Example Usage

```yaml
# Name of this GitHub Actions workflow.
name: Start Left Security Pipeline Upload

on:
  # Scan on-demand through GitHub Actions interface:
  workflow_dispatch: {}
  # Scan mainline branches and report all findings:
  #push:
    #branches: ["master", "main"]
  # Schedule the CI job (this method uses cron syntax):
  #schedule:
    #- cron: '20 23 * * 1' # Sets schedule to scan every Monday at 23:20 UTC.
    # It is recommended to change the schedule to a random time.

jobs:
  run-sls-uploader:
    runs-on: ubuntu-latest

    # Skip any PR created by dependabot to avoid permission issues:
    if: (github.actor != 'dependabot[bot]')

    steps:
    - name: Checkout Code
      uses: actions/checkout@v4

    - name: Upload files to SLS
      uses: tauruseer/sls-file-upload@1.0.0
      with:
        scan-key: ${{ secrets.SLS_SCAN_KEY }}
        api-key: ${{ secrets.SLS_API_KEY }}
        file-path: ${{ file to be uploaded }}
