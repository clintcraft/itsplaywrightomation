import path from 'path';
import AdmZip from 'adm-zip';
import fs from 'fs-extra';

/**
 * Global teardown function that runs once after all tests.
 * 
 * - Compresses the Playwright HTML test report into a .zip archive.
 * - Ensures the report folder exists before attempting to zip.
 * - Provides logging for visibility in CI pipelines or debugging.
 */
async function globalTeardown(): Promise<void> {
  try {
    const reportFolder = path.join(__dirname, 'html-report');
    const outputZip = path.join(__dirname, 'html-report.zip');

    // Check if report folder exists
    if (!fs.existsSync(reportFolder)) {
      console.warn(`⚠️ Report folder not found at: ${reportFolder}`);
      return;
    }

    // Create a new ZIP archive and add the report folder
    const zip = new AdmZip();
    zip.addLocalFolder(reportFolder, 'html-report');

    // Write the ZIP file to disk
    zip.writeZip(outputZip);

    console.log(`✅ HTML report zipped successfully: ${outputZip}`);
  } catch (error) {
    console.error(`❌ Error during global teardown: ${(error as Error).message}`);
    throw error;
  }
}

export default globalTeardown;
