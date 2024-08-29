import React, {useCallback} from "react";
import "./headline.css";
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import FroalaEditorComponent from 'react-froala-wysiwyg';


type HeadlineComponentProps = {
    headline: string;
    handleHeadlineChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const HeadlineComponent = ({headline, handleHeadlineChange}: HeadlineComponentProps) => {


    return (
        <div className="headline-container">
            <div className="headline-container-header">
                <h1 className="headline-container-title">Create A Headline</h1>
            </div>
            <div className="froala-container">
            <FroalaEditorComponent
                tag='textarea'
                onModelChange={handleHeadlineChange}
                model={headline}
                config={{
                    placeholderText: 'Card Title...',
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

export default HeadlineComponent;