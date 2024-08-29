import React from "react";
import "./cta-component.css";
import FroalaEditorButton from "react-froala-wysiwyg/FroalaEditorButton";
import { Switch } from "evergreen-ui";
import FroalaEditorComponent from 'react-froala-wysiwyg';

type CTAComponentProps = {
    addButton: boolean;
    toggleAddButton: (value: boolean) => void;
    handleCtaChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CTAComponent = ({addButton, toggleAddButton, handleCtaChange}: CTAComponentProps) => {
    return (
        <div className="cta-component-container">
            <div className="cta-component">
                <h1>CTA Component</h1>
                <div>
                <Switch
                    marginBottom={16}
                    checked={addButton}
                    onChange={() => toggleAddButton(!addButton)}
                />
                </div>
            </div>
            <div className="headline-container">
            <h1>Call to Action</h1>
            <FroalaEditorComponent
                tag='textarea'
                onModelChange={handleCtaChange}
                config={{
                    placeholderText: 'Add Your Call to Action',
                    charCounterCount: true,
                    toolbarInline: true,
                    events: {
                        initialized: function() {
                            const editor = this; // 'this' refers to the Froala Editor instance

                            //@ts-ignore
                            editor.$el.css({
                                'font-family': 'Twilio-Regular',
                                'font-size': '1.4rem',
                                'color': '#0A1433',
                            });
                        }
                    },
                }}
            />
        </div>
        </div>
    )
}

export default CTAComponent;