import React, { useState, useMemo, useCallback } from 'react';
import './ui-editor.css';
import ToolbarComponent from '../../Components/UIEditor/ToolbarComponent/ToolbarComponent';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import FroalaEditorComponent from 'react-froala-wysiwyg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import HeadlineComponent from '../../Components/UIEditor/HeadlineComponent/HeadlineComponent';
import ContentComponent from '../../Components/UIEditor/ContentComponent/ContentComponent';
import ImageComponent from '../../Components/UIEditor/ImageComponent/ImageComponent';
import CTAComponent from '../../Components/UIEditor/CTAComponent/CTAComponent';
import UIPreview from '../../Components/UIEditor/UIPreview/UIPreview';
import ActiveTool from '../../Components/UIEditor/ActiveTool/ActiveTool';
import ColorPickerPopout from '../../Components/UIEditor/ColorSelector/ColorPickerPopout';
import logoGif from "../../assets/logo.gif";

// Import all Froala Editor plugins;
// import 'froala-editor/js/plugins.pkgd.min.js';

// Import a single Froala Editor plugin.
// import 'froala-editor/js/plugins/align.min.js';

// Import a language file.
// import 'froala-editor/js/languages/de.js';

// Import a third-party plugin.
// import 'froala-editor/js/third_party/image_tui.min.js';
// import 'froala-editor/js/third_party/embedly.min.js';
// import 'froala-editor/js/third_party/spell_checker.min.js';

// Include font-awesome css if required.
// install using "npm install font-awesome --save"
// import 'font-awesome/css/font-awesome.css';
// import 'froala-editor/js/third_party/font_awesome.min.js';

// Include special components if required.
// import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
// import FroalaEditorA from 'react-froala-wysiwyg/FroalaEditorA';
// import FroalaEditorButton from 'react-froala-wysiwyg/FroalaEditorButton';
// import FroalaEditorImg from 'react-froala-wysiwyg/FroalaEditorImg';
// import FroalaEditorInput from 'react-froala-wysiwyg/FroalaEditorInput';

// Render Froala Editor component.
// ReactDOM.render(<FroalaEditorComponent tag='textarea'/>, document.getElementById('editor'));
export enum ToolType {
    Headline = "headline",
    Content = "content",
    Image = "image",
    CTA = "cta",
}


const UIEditor = () => {
    const [model, setModel] = useState("Example Set");
    const [headline, setHeadline] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState({
        src: "https://fakeimg.pl/350x200/?text=Click to add image",
        style: "",
        class: ""
    });
    const [cta, setCta] = useState("");
    const [color, setColor] = useState('#fff');
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [isButtonPickerVisible, setButtonPickerVisible] = useState(false);
    const [startCampaign, setStartCampaign] = useState(false);
    const [addButton, toggleAddButton] = useState(false);
    const [activeTool, setActiveTool] = useState(ToolType.Headline);
    const [campaignInfo, setCampaignInfo] = useState({
        headline: "",
        content: "",
        image: {
            src: "https://fakeimg.pl/350x200/?text=Click to add image",
            class: "",
            style: ""
        },
        cta: "",
        button: false,
        backgroundColor: "#d3d3d3",
        buttonColor: "#f5f5f5"
    });

    //@ts-ignore
    const ToolbarContext = React.createContext();

    const handleActiveTool = (tool: ToolType) => {
        setActiveTool(tool);
        console.log(activeTool);
    }

    //@ts-ignore
    const handleHeadlineChange = useCallback((e) => {
        setHeadline(e);
        setCampaignInfo({ ...campaignInfo, headline: e });
        console.log(e);
    }, [campaignInfo]);

    //@ts-ignore
    const handleContentChange = useCallback((e) => {
        setContent(e);
        setCampaignInfo({ ...campaignInfo, content: e });
        console.log(e);
    }, [campaignInfo]);


    function blobToBase64(blobUrl: string): Promise<string> {
        return new Promise((resolve, reject) => {
            fetch(blobUrl)
                .then(response => response.blob())
                .then(blob => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const base64data = reader.result as string;
                        resolve(base64data);
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                })
                .catch(reject);
        });
    }

    //@ts-ignore
    const handleImageChange = useCallback((e) => {
        setImage(e);
        if (e.src.startsWith("blob")) {
            blobToBase64(e.src)
                .then(base64String => {
                    setCampaignInfo({...campaignInfo, image: {src: base64String   , class: e.class, style: e.style}});
                })
                .catch(error => {
                    console.error('Error converting blob to base64:', error);
                });
        }

        console.log(e);
    }, [campaignInfo]);

    //@ts-ignore
    const handleButtonToggle = useCallback((e) => {
        toggleAddButton(!addButton);
        setCampaignInfo({ ...campaignInfo, button: !addButton });
    }, [campaignInfo, addButton]);

    //@ts-ignore
    const handleCtaChange = useCallback((e) => {
        const tempElement = document.createElement("div");
        tempElement.innerHTML = e;
        const textValue = tempElement.innerText || tempElement.textContent || "";
        setCampaignInfo({ ...campaignInfo, cta: textValue });
    }, [campaignInfo]);

    //@ts-ignore
    const handleButtonColor = useCallback((color) => {
        setColor(color.hex);
        setCampaignInfo({ ...campaignInfo, buttonColor: color.hex });
    }, [campaignInfo]);
    //@ts-ignore
    const MemoizedActiveTool = useMemo(() => (
        <ActiveTool
            //@ts-ignore
            activeTool={activeTool}
            headline={headline}
            handleHeadlineChange={handleHeadlineChange}
            content={content}
            handleContentChange={handleContentChange}
            image={image}
            handleImageChange={handleImageChange}
            callToAction={cta}
            handleCtaChange={handleCtaChange}
            addButton={addButton}
            handleButtonToggle={handleButtonToggle}
            handleButtonColor={handleButtonColor}
            color={color}
            isButtonPickerVisible={isButtonPickerVisible}
            setButtonPickerVisible={setButtonPickerVisible}
        />
    ), [activeTool, headline, handleHeadlineChange, content, handleContentChange, image, handleImageChange, cta, handleCtaChange, addButton, handleButtonToggle, color, isButtonPickerVisible, setButtonPickerVisible, handleButtonColor]);


    //@ts-ignore
    const handlebackgroundColor = (color) => {
        setColor(color.hex);
        setCampaignInfo({ ...campaignInfo, backgroundColor: color.hex });
    }

    const handleStartCampaign = () => { 
        setStartCampaign(true);   
     }

    return (
        <div className="ui-editor-container" id="editor">
            {startCampaign ? (
                <div className="start-campaign-container">
                    <h1 className="start-campaign-title">Campaign Started!</h1>
                    <img src={logoGif} alt="logo" className="start-campaign-gif" />
                </div>
                ) : (
            <><div className='editor-preview'>
                        <h1 className='ui-editor-title'>Campaign Preview</h1>
                        <div className='color-selector-preview-container'>
                            <ColorPickerPopout color={color} handleBackgroundColor={handlebackgroundColor} isPickerVisible={isPickerVisible} setPickerVisible={setPickerVisible} />
                        </div>
                        <UIPreview campaignInfo={campaignInfo} />
                        <div>
                            <button 
                            className='start-campaign-button'
                            onClick={handleStartCampaign}
                            >
                                Start Campaign
                            </button>
                        </div>
                    </div><div className='editor'>
                            <ToolbarContext.Provider value={{ headline, content, image, cta }}>
                                <ToolbarComponent setActiveTool={handleActiveTool} />
                            </ToolbarContext.Provider>
                            <div className='active-tool-container'>
                                {MemoizedActiveTool}
                            </div>
                        </div></>
            )}
        </div>
    );
}

export default UIEditor;