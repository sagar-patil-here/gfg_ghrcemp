const API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY;
const FOLDER_ID = import.meta.env.VITE_GOOGLE_DRIVE_FOLDER_ID;

export interface DriveImage {
  id: string;
  name: string;
  thumbnailLink: string;
  webViewLink: string;
}

export const fetchDriveImages = async (): Promise<string[]> => {
  if (!API_KEY || !FOLDER_ID) {
    console.warn("Google Drive API credentials missing. Using local fallback.");
    return [];
  }

  try {
    const query = `'${FOLDER_ID}' in parents and trashed = false and mimeType contains 'image/'`;
    const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name,thumbnailLink,webViewLink)&key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.error("Google Drive API Error:", data.error);
      return [];
    }

    return data.files.map((file: any) => {
        return `https://lh3.googleusercontent.com/d/${file.id}`;
    });

  } catch (error) {
    console.error("Failed to fetch Drive images:", error);
    return [];
  }
};
