import React from "react";
import "./content-component.css";
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import FroalaEditorComponent from 'react-froala-wysiwyg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';


type ContentComponentProps = {
    content: string
    handleContentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContentComponent = ({content, handleContentChange}: ContentComponentProps) => {
    return (
        <div className="content-container">
            <div className="content-container-header">
                <h1 className="content-container-title">Add Content</h1>
            </div>
            <div className="froala-container">
            <FroalaEditorComponent
                tag='textarea'
                onModelChange={handleContentChange}
                model={content}
                config={{
                    placeholderText: 'Card Content...',
                    charCounterCount: false,
                    toolbarInline: false,
                    events: {
                        initialized: function() {
                            const editor = this; // 'this' refers to the Froala Editor instance

                            //@ts-ignore
                            editor.$el.css({
                                'font-family': 'Twilio-Regular',
                                'font-size': '1.4rem',
                                'color': '#0A1433',
                                'width': '60%',
                            });
                        }
                    },
                }}
            />
            </div>
        </div>
    )
}

export default ContentComponent;