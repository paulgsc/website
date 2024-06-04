import axios from "axios";

export async function checkKaribuStatus() {
  try {
    const response = await axios.get("https://karibu.maishatu.com");
    if (response.status !== 200) {
      // Handle non-200 status codes
      console.log("Karibu responded with status:", response.status);
      // Update your React component's state...
    } else {
      console.log("Karibu is currently online!");
      // Update your React component's state...
    }
  } catch (error) {
    console.error("Error fetching Karibu status:", error);
    // Update your React component's state...
  }
}
