import React, {useState} from "react";
import "./headline.css";
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import FroalaEditorComponent from 'react-froala-wysiwyg';


type HeadlineComponentProps = {
    headline: string;
    handleHeadlineChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const HeadlineComponent = ({headline, handleHeadlineChange}: HeadlineComponentProps) => {
    const [titleChoices, setTitleChoices] = useState<string[]>([]);
    const [titleChoice, setTitleChoice] = useState<string>("");

    //@ts-ignore
    const handleTitleChoice = (event) => {
        event.preventDefault();

        const titlePromptRequest = new XMLHttpRequest();
        titlePromptRequest.open("POST", "http://localhost:3024/ai/text/gen");
        titlePromptRequest.setRequestHeader("Content-type", "application/json");
        titlePromptRequest.send(JSON.stringify({ prompt: titleChoice }));
    
    
        titlePromptRequest.onreadystatechange = function () {//Call a function when the state changes.
          if (titlePromptRequest.readyState === 4 && titlePromptRequest.status === 200) {
            let parsedTitle = JSON.parse(titlePromptRequest.response)
            setTitleChoices(parsedTitle.choices)
            console.log(titleChoices)

          }
        console.log(titleChoices)
        }
    }
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
                            const editor = this;
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
            <div className="suggest-headline-container">
                <div className="suggest-headline-header-container">
                    <p className="suggest-headline-header-text">or</p>
                    <h1 className="suggest-headline-header-title">Generate with AI </h1>
                </div>
                <div className="headline-prompt-generation-container">
                    <input 
                    type="text" 
                    placeholder="Add a title prompt" 
                    className="title-choice-input"
                    value={titleChoice}
                    onChange={(e) => setTitleChoice(e.target.value)}
                    />
                    <button
                    onClick={handleTitleChoice}
                    className="generate-headlines-button"
                    >
                        Generate Headlines
                    </button>
                </div>
                <div className="headline-suggestions-container">
                    {titleChoices.map((title, index) => (
                        <p key={index} className="headline-suggestion">{title}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HeadlineComponent;