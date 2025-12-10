export const convertBrowserToPdf = (browserCoords, pdfDimensions, containerDimensions) => {
  const { x, y, width, height } = browserCoords;
  const { pageWidth, pageHeight } = pdfDimensions;
  const { containerWidth, containerHeight } = containerDimensions;

  const scaleX = pageWidth / containerWidth;
  const scaleY = pageHeight / containerHeight;

  return {
    x: x * scaleX,
    y: pdfDimensions.pageHeight - (y * scaleY + height * scaleY),
    width: width * scaleX,
    height: height * scaleY,
  };
};

export const convertPdfToBrowser = (pdfCoords, pdfDimensions, containerDimensions) => {
  const { x, y, width, height } = pdfCoords;
  const { pageWidth, pageHeight } = pdfDimensions;
  const { containerWidth, containerHeight } = containerDimensions;

  const scaleX = containerWidth / pageWidth;
  const scaleY = containerHeight / pageHeight;

  return {
    x: x * scaleX,
    y: (pageHeight - y - height) * scaleY,
    width: width * scaleX,
    height: height * scaleY,
  };
};

export const fitImageInBox = (imageAspect, boxWidth, boxHeight) => {
  const boxAspect = boxWidth / boxHeight;

  if (imageAspect > boxAspect) {
    return { width: boxWidth, height: boxWidth / imageAspect };
  }
  return { width: boxHeight * imageAspect, height: boxHeight };
};

export const getResponsiveScale = () => {
  if (window.innerWidth < 768) {
    return 'mobile';
  }
  if (window.innerWidth < 1024) {
    return 'tablet';
  }
  return 'desktop';
};
