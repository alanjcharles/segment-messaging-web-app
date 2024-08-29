import React, {useState} from "react";
import "./image-component.css";
import FroalaEditorImg from "react-froala-wysiwyg/FroalaEditorImg";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";

type ImageComponentProps = {
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageComponent = ({handleImageChange}: ImageComponentProps) => {

    const [imageModel, setImageModel] = useState({
        src: "https://fakeimg.pl/350x200/?text=Click to test"

    });

    const config = {

        imageEditButtons: [
            "imageReplace",
            "imageAlign",
            "imageCaption",
            "imageRemove",
            "|",
            "imageLink",
            "linkOpen",
            "linkEdit",
            "linkRemove",
            "-",
            "imageDisplay",
            "imageStyle",
            "imageAlt",
            "imageSize"
        ],
        events: {
            //@ts-ignore
            'froalaEditor.image.inserted': function (e, editor, $img, response) {
              // Set default width and alignment for the image
              $img.css('width', '30%'); // Set default width to 300px
              $img.css('height', '30%');
              $img.css('display', 'block'); // Block display
              $img.css('margin', '0 auto'); // Center the image
            }
          }
    };

    return (
        <div>
        <h2>Image Editor</h2>
        <FroalaEditorImg
          model={imageModel}
          onModelChange={handleImageChange}
          config={config}
        />
      </div>
    )
}

export default ImageComponent;