import multer from 'multer';
import path from 'path';
import moment from 'moment';
import fs from 'fs/promises';


const multerFileServices = ({ folderName, fileName, array }) => {
    const storage = multer.diskStorage({
        destination: async (req, file, cb) => {
            const destinationPath = path.join(folderName);
            try {
                await fs.access(destinationPath);
            } catch {
                // Create the directory if it does not exist
                await fs.mkdir(destinationPath, { recursive: true });
            }
            cb(null, destinationPath);
        },

        filename: (req, file, cb) => {
            const formattedDate = moment().format('YYYYMMDDHHmmss');
            const trimmedFileName = file.originalname.trim().replace(/[^a-zA-Z0-9.]+/g, '-');
            const newFileName = `${formattedDate}_${trimmedFileName}`;
            cb(null, newFileName);
        },
    });

    return array ? multer({ storage }).array(fileName) : multer({ storage }).single(fileName);
};

// Create directory and copy file
const copyFileToNewLocation = async (originalFilePath, folderPath, newFileName) => {
    const newFilePath = path.join(folderPath, newFileName);

    // folder exists or create 
    try {
        await fs.access(folderPath);
    } catch {
        await fs.mkdir(folderPath, { recursive: true });
    }
    // Copy the file
    await fs.copyFile(originalFilePath, newFilePath);
};


// Remove all files in the backup folder
const removeAllFilesInFolder = async (folderPath) => {
    try {
        const folderExists = await fs.access(folderPath).then(() => true).catch(() => false);

        if (folderExists) {
            const files = await fs.readdir(folderPath);
            if (files.length > 0) {
                const deletePromises = files.map(file => fs.unlink(path.join(folderPath, file)));
                await Promise.all(deletePromises);
                console.log(`Removed all files in ${folderPath}`);
            } else {
                console.log(`The folder ${folderPath} is empty. No files to remove.`);
            }
        } else {
            console.log(`The folder ${folderPath} does not exist.`);
        }
    } catch (error) {
        console.error(`Error checking or removing files: ${error.message}`);
    }
};
// Rename the original file and make a copy
const renameFileBackup = async (originalBackUpFiles, journalName, articleNumber, destinationPath, folderName) => {
    const newFolderPath = path.join(destinationPath, folderName);
    const newFileName = `${journalName}_${articleNumber}${path.extname(originalBackUpFiles.originalname)}`;
    const newFilePath = path.join(newFolderPath, newFileName);

    try {
        // Check if the file already exists or not
        if (await fs.access(newFilePath).then(() => true).catch(() => false)) {
            const timestamp = moment().format('YYYY-MM-DD-HH-mm-ss');
            const revertFileName = `${journalName}${articleNumber}_revert_${timestamp}${path.extname(newFileName)}`;
            const renamedFilePath = path.join(newFolderPath, revertFileName);

            // Rename the existing file
            await fs.rename(newFilePath, renamedFilePath);
            console.log(`Renamed existing file to ${path.basename(renamedFilePath)}`);
        }

        await copyFileToNewLocation(originalBackUpFiles.path, newFolderPath, newFileName);
        console.log(`Successfully renamed and copied file to ${newFileName}`);
    } catch (error) {
        console.error(`Error copying file: ${error.message}`);
        throw error;
    }

    return newFileName;
};

export { multerFileServices, renameFileBackup, removeAllFilesInFolder };