import React, {useCallback} from "react";
import "./headline.css";
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import FroalaEditorComponent from 'react-froala-wysiwyg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';


type HeadlineComponentProps = {
    headline: string;
    handleHeadlineChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const HeadlineComponent = ({headline, handleHeadlineChange}: HeadlineComponentProps) => {

    //@ts-ignore
    const handleFroalaHeadlineChange = (event) => {
        console.log(event);
    }

    return (
        <div className="headline-container">
            <h1>Headline</h1>
            <FroalaEditorComponent
                tag='textarea'
                onModelChange={handleHeadlineChange}
                model={headline}
                config={{
                    placeholderText: 'Edit Your Content Here!',
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
    )
}

export default HeadlineComponent;