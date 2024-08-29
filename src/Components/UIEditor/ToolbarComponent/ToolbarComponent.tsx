import React from "react";
import "./toolbar-component.css";
import { AppHeaderIcon, NewTextBoxIcon, ImageRotateLeftIcon, HandUpIcon} from "evergreen-ui";
import { ToolType } from "../../../Containers/UIEditor/UIEditor";

interface ToolbarComponentProps {
    setActiveTool: (tool: ToolType) => void;
}   

const ToolbarComponent = ({ setActiveTool }: ToolbarComponentProps) => {
    return (
       <div className="toolbar-container">
            <div 
            className="tool-selector title-toolbar-selector"
            onClick={() => setActiveTool(ToolType.Headline)}
            >
                <AppHeaderIcon size={40} color="#97D7BF" />
            </div>
            <div 
            className="tool-selector content-toolbar-selector"
            onClick={() => setActiveTool(ToolType.Content)}
            >
                <NewTextBoxIcon size={40} color="#97D7BF" />
            </div>
            <div 
            className="tool-selector image-toolbar-selector"
            onClick={() => setActiveTool(ToolType.Image)}
            >
                <ImageRotateLeftIcon size={40} color="#97D7BF"/>
            </div>
            <div 
            className="tool-selector cta-selector"
            onClick={() => setActiveTool(ToolType.CTA)}
            >
                <HandUpIcon size={40} color="#97D7BF" />
            </div>
        </div>
    )
};

export default ToolbarComponent;

