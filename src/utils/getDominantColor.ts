import { FastAverageColor } from "fast-average-color";

export async function getDominantColor(
  imageUrl: string
): Promise<string | null> {
  return new Promise((resolve) => {
    const fac = new FastAverageColor();
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;

    img.onload = () => {
      try {
        const color = fac.getColor(img);
        resolve(color.rgb);
      } catch (error) {
        console.error("Error getting color:", error);
        resolve(null);
      }
    };

    img.onerror = () => resolve(null);
  });
}
