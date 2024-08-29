import React from "react";
import "./cta-component.css";
import FroalaEditorButton from "react-froala-wysiwyg/FroalaEditorButton";
import { Switch } from "evergreen-ui";
import FroalaEditorComponent from 'react-froala-wysiwyg';

type CTAComponentProps = {
    callToAction: string;
    addButton: boolean;
    toggleAddButton: (value: boolean) => void;
    handleCtaChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CTAComponent = ({ callToAction, addButton, toggleAddButton, handleCtaChange}: CTAComponentProps) => {
    return (
        <div className="cta-component-container">
            <div className="cta-component">
                <h1 className="cta-component-title">Include Call to Action</h1>
                <div className="cta-toggle-container">
                    <Switch
                    marginBottom={16}
                    checked={addButton}
                    onChange={() => toggleAddButton(!addButton)}
                    />
                    <p className="toggle-text">add/remove button</p>
                </div>
            </div>
            <div className="headline-container">
            {addButton ? (
                
            <div className="froala-container">
            <FroalaEditorComponent
                tag='textarea'
                onModelChange={handleCtaChange}
                model={callToAction}
                config={{
                    placeholderText: 'Call to Action...',
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
            ) : null}
        </div>
        </div>
    )
}

export default CTAComponent;