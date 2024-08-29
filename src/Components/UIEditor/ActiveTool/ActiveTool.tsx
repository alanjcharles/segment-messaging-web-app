import React, { useMemo } from 'react';
import HeadlineComponent from '../HeadlineComponent/HeadlineComponent';
import ContentComponent from '../ContentComponent/ContentComponent';
import ImageComponent from '../ImageComponent/ImageComponent';
import CTAComponent from '../CTAComponent/CTAComponent';
import { ToolType } from '../../../Containers/UIEditor/UIEditor';

//@ts-ignore
const ActiveTool = React.memo(({ activeTool, headline, handleHeadlineChange, content, handleContentChange, image, handleImageChange, callToAction, handleCtaChange, addButton, handleButtonToggle }) => {
  return useMemo(() => {
    switch (activeTool) {
      case ToolType.Headline:
        return <HeadlineComponent headline={headline} handleHeadlineChange={handleHeadlineChange} />;
      case ToolType.Content:
        return <ContentComponent  content={content} handleContentChange={handleContentChange} />;
      case ToolType.Image:
        return <ImageComponent image={image} handleImageChange={handleImageChange} />;
      case ToolType.CTA:
        return <CTAComponent  callToAction={callToAction} addButton={addButton} toggleAddButton={handleButtonToggle} handleCtaChange={handleCtaChange} />;
      default:
        return <HeadlineComponent headline={headline} handleHeadlineChange={handleHeadlineChange} />;
    }
  }, [activeTool, headline, handleHeadlineChange, content, handleContentChange, image, handleImageChange, callToAction, handleCtaChange, addButton, handleButtonToggle]);
});

export default ActiveTool;