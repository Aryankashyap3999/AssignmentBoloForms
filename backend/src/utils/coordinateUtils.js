export const browserToPdfCoordinates = (browserCoords, viewport, pdfDims) => {
  const scaleX = pdfDims.width / viewport.width;
  const scaleY = pdfDims.height / viewport.height;
  
  return {
    x: browserCoords.x * scaleX,
    y: pdfDims.height - (browserCoords.y * scaleY),
    width: browserCoords.width * scaleX,
    height: browserCoords.height * scaleY
  };
};

export const pdfToBrowserCoordinates = (pdfCoords, pdfDims, viewport) => {
  const scaleX = viewport.width / pdfDims.width;
  const scaleY = viewport.height / pdfDims.height;
  
  return {
    x: pdfCoords.x * scaleX,
    y: (pdfDims.height - pdfCoords.y) * scaleY,
    width: pdfCoords.width * scaleX,
    height: pdfCoords.height * scaleY
  };
};

export const validateCoordinatesWithinBounds = (coords, pdfDims) => {
  const isValid = coords.x >= 0 && 
                  coords.x + coords.width <= pdfDims.width && 
                  coords.y >= 0 && 
                  coords.y + coords.height <= pdfDims.height && 
                  coords.width > 0 && 
                  coords.height > 0;
  
  return isValid;
};

export const fitImageInBox = (imgW, imgH, boxW, boxH) => {
  const imgRatio = imgW / imgH;
  const boxRatio = boxW / boxH;
  
  if (imgRatio > boxRatio) {
    const w = boxW;
    const h = w / imgRatio;
    return { width: w, height: h, x: 0, y: (boxH - h) / 2 };
  } else {
    const h = boxH;
    const w = h * imgRatio;
    return { width: w, height: h, x: (boxW - w) / 2, y: 0 };
  }
};
