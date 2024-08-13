import { useState } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID =
  "453384159820-8c1jojgg34jiu6m5fv5029iu578ui2kv.apps.googleusercontent.com";
const API_KEY = "AIzaSyBSU2DpCkc621Y0j6iQOZ2gHQmWOpzYjeo";
const SCOPES = "https://www.googleapis.com/auth/drive.file";
const UPLOAD_URL =
  "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart";

const useGoogleDriveUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const authenticate = async () => {
    return new Promise((resolve, reject) => {
      gapi.load("client:auth2", () => {
        gapi.client
          .init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            scope: SCOPES,
          })
          .then(() => {
            const authInstance = gapi.auth2.getAuthInstance();
            if (authInstance.isSignedIn.get()) {
              resolve(
                authInstance.currentUser.get().getAuthResponse().access_token
              );
            } else {
              authInstance
                .signIn()
                .then(() => {
                  resolve(
                    authInstance.currentUser.get().getAuthResponse()
                      .access_token
                  );
                })
                .catch(reject);
            }
          })
          .catch(reject);
      });
    });
  };

  const upload = async (file) => {
    setLoading(true);
    setError(null);

    try {
      const accessToken = await authenticate();

      const metadata = {
        name: file.name,
        mimeType: file.type,
      };

      const formData = new FormData();
      formData.append(
        "metadata",
        new Blob([JSON.stringify(metadata)], { type: "application/json" })
      );
      formData.append("file", file);

      const response = await fetch(UPLOAD_URL, {
        method: "POST",
        headers: new Headers({
          Authorization: `Bearer ${accessToken}`,
        }),
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload file.");

      const result = await response.json();
      console.log("Upload result:", result);

      // Construct the file URL
      const fileId = result.id;
      const fileUrl = `https://drive.google.com/uc?id=${fileId}`;
      console.log("File URL:", fileUrl);

      return fileUrl;
    } catch (err) {
      setError(err.message);
      console.error("Upload error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return { upload, loading, error };
};

export default useGoogleDriveUpload;
