import React from "react";
import "./cta-component.css";
import FroalaEditorButton from "react-froala-wysiwyg/FroalaEditorButton";
import { Switch } from "evergreen-ui";
import ColorPicker from 'react-pick-color';
import FroalaEditorComponent from 'react-froala-wysiwyg';

type CTAComponentProps = {
    callToAction: string;
    addButton: boolean;
    toggleAddButton: (value: boolean) => void;
    handleCtaChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleButtonColor: (color: any) => void;
    color: string;
    isButtonPickerVisible: boolean;
    setButtonPickerVisible: (value: boolean) => void;
}

const CTAComponent = ({ callToAction, addButton, toggleAddButton, handleCtaChange, handleButtonColor, color, isButtonPickerVisible, setButtonPickerVisible}: CTAComponentProps) => {
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
                    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setButtonPickerVisible(!isButtonPickerVisible)}
        className='button-color-picker-button'
      >
        Change Button Color
      </button>

      {isButtonPickerVisible && (
        <div
          style={{
            position: 'absolute',
            top: '40px', // Adjust this value to move the picker relative to the button
            left: '0',
            zIndex: '1000',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <ColorPicker
            color={color}
            onChange={color => handleButtonColor(color)}
          />
        </div>
      )}
    </div>
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