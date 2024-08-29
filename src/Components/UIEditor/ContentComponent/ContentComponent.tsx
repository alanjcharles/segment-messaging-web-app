import React from "react";
import "./content-component.css";
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import FroalaEditorComponent from 'react-froala-wysiwyg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';


type ContentComponentProps = {
    handleContentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContentComponent = ({handleContentChange}: ContentComponentProps) => {
    return (
        <div className="content-container">
            <h1>Add content</h1>
            <FroalaEditorComponent
                    tag='textarea'
                    onModelChange={handleContentChange}
                    config={{
                        placeholderText: 'Edit Your Content Here!',
                        charCounterCount: true,
                        toolbarInline: true,
                        events: {
                            initialized: function() {
                                const editor = this; // 'this' refers to the Froala Editor instance

                                // Apply your custom styles
                                //@ts-ignore
                                editor.$el.css({
                                  'font-family': 'Twilio-Regular',
                                  'font-size': '1.4rem',
                                  'color': '#0A1433',
                                });
                    
                                console.log('Editor initialized and styles applied');
                            }
                        },
                    }}
                />
        </div>
    )
}

export default ContentComponent;