import React, {useState} from 'react';
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
    const [model,setModel] = useState("Example Set");
    const [headline, setHeadline] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [cta, setCta] = useState("");
    const [addButton, toggleAddButton] = useState(false);
    const [activeTool, setActiveTool] = useState(ToolType.Headline);
    const [campaignInfo, setCampaignInfo] = useState({
        headline: "",
        content: "",
        image: {
            src: "https://fakeimg.pl/350x200/?text=Click to test",
            class: "",
            style: ""
        },
        cta: "",
        button: false
    });

    //@ts-ignore
    const ToolbarContext = React.createContext();

    const handleActiveTool = (tool: ToolType) => {
        setActiveTool(tool);
        console.log(activeTool);
    }

    //@ts-ignore
    const handleHeadlineChange = (event) => {
        const tempElement = document.createElement("div");
        tempElement.innerHTML = event;
        const textValue = tempElement.innerText || tempElement.textContent || "";
        console.log(textValue);

        setHeadline(event);
        setCampaignInfo({...campaignInfo, headline: event});
    }
    
    //@ts-ignore
    const handleContentChange = (event) => {
        const tempElement = document.createElement("div");
        tempElement.innerHTML = event;
        const textValue = tempElement.innerText || tempElement.textContent || "";
        console.log(textValue);
    
        setCampaignInfo({...campaignInfo, content: event});
    }

        //@ts-ignore
    const handleImageChange = (event) => {
        setCampaignInfo({...campaignInfo, image: event});
    }

    const handleButtonToggle = () => {
        console.log('BUTTON TOGGLE');
        toggleAddButton(!addButton);
        setCampaignInfo({...campaignInfo, button: !addButton}); 
    }

    //@ts-ignore
    const handleCtaChange = (event) => {
        const tempElement = document.createElement("div");
        tempElement.innerHTML = event;
        const textValue = tempElement.innerText || tempElement.textContent || "";
        setCampaignInfo({...campaignInfo, cta: textValue});
    }

    const ActiveTool = () => {
        switch (activeTool) {
            case ToolType.Headline:
                return <div><HeadlineComponent  headline={headline} handleHeadlineChange={handleHeadlineChange}/></div>;
            case ToolType.Content:
                return <div><ContentComponent handleContentChange={handleContentChange}/></div>;
            case ToolType.Image:
                return <div><ImageComponent handleImageChange={handleImageChange}/></div>;
            case ToolType.CTA:
                return <div><CTAComponent addButton={addButton} toggleAddButton={handleButtonToggle} handleCtaChange={handleCtaChange}/></div>;
            default:
                return <div><HeadlineComponent headline={headline}  handleHeadlineChange={handleHeadlineChange}/></div>;
        }
    }
    return (    
        <div className="ui-editor-container" id="editor">
            <div className='editor-preview'>
                <h1 className='ui-editor-title'>Campaign Preview</h1>
                <UIPreview  campaignInfo={campaignInfo}/>
            </div>
            <div className='editor'>
                <ToolbarContext.Provider value={{ headline, content, image, cta }}>
                <ToolbarComponent setActiveTool={handleActiveTool} />
                </ToolbarContext.Provider>
                <div className='active-tool-container'>
                <ActiveTool />
            </div>
            </div>

        </div>
    );
}

export default UIEditor;