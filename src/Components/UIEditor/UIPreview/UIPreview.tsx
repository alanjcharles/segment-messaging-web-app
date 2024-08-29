import React from "react";
import "./ui-preview.css";
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';


type UIPreviewProps = {
    campaignInfo: {
        headline: string;
        content: string;
        cta: string;
        image: ImageProps
        button: boolean;
    }
}

export type ImageProps = {
    src: string;
    class: string;
    style: string
}


const UIPreview = ({campaignInfo}: UIPreviewProps) => {
    console.log("CAMPAIGNINFOOOOO", campaignInfo);
    return (
        <div className="ui-preview-container">
            <div className="inner-preview-container">
                <div className="promo-preview-container">
                    <div className="headline-preview">
                        <FroalaEditorView model={campaignInfo.headline} />
                    </div>
                    <div className="image-preview-container">
                        <img src={campaignInfo.image.src} alt="campaign" className="preview-image"/>
                    </div>
                    <div className="content-preview">
                        <FroalaEditorView model={campaignInfo.content} />
                    </div>
                    {campaignInfo.button === true ? (
                        <div className="cta-button-container">
                            <button className="cta-button">{campaignInfo.cta}</button>
                        </div>
                    ): null}
                </div>
            </div>
        </div>
    )
}

export default UIPreview;