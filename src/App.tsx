import {
  styled,
  Container,
  Typography,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import './App.css';
interface FormInput {
  Title: string;
  Content: string;
  Image: string;
}

interface Message {
  Title: string;
  Content: string;
  Image: string;
  Id?: number;
}
function App() {

  const {
    register,
    handleSubmit,
    getValues,
  } = useForm<FormInput>();


  const [json, setJson] = useState<string>();
  const [status, setStatus] = useState<string>();
  const [titleChoices, setTitleChoices] = useState<string[]>([]);
  const [contentChoices, setContentChoices] = useState<string[]>([]);
  const [imageChoices, setImageChoices] = useState<string[]>([]);
  const [message, setMessage] = useState<Message>();

  const [selectedTitleIndex, setTitleIndex] = useState<number>(-1);
  const [selectedContentIndex, setContentIndex] = useState<number>(-1);
  const [selectedImageIndex, setImageIndex] = useState<number>(-1);

  const sendJson = async (data: any, url: string) => {

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3023/notifications");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(data));
    return "hello"
  }


  const onSubmit = async (data: FormInput) => {

    if (message && message.Title && message.Content && message.Image) {
      // Use the data from the Message object we've been building.
      let messageCopy = JSON.parse(JSON.stringify(message))
      messageCopy.Id = Date.now();
      const stringifiedData = JSON.stringify(messageCopy);
      console.log('****ONSUBMIT STRINGIFIED DATA', stringifiedData);
      const setResponse = await sendJson(message, 'http://localhost:3023/notifications')
      setJson(stringifiedData);
      setStatus(setResponse);
    } else {
      console.log("No message ready to be sent.")
    }
  };

  const generateContent = () => {
    let formInputs = getValues()
    console.log("generateContent()")
    //prompt for title

    const titlePromptRequest = new XMLHttpRequest();
    titlePromptRequest.open("POST", "http://localhost:3024/ai/text/gen");
    titlePromptRequest.setRequestHeader("Content-type", "application/json");
    titlePromptRequest.send(JSON.stringify({ prompt: formInputs.Title }));


    titlePromptRequest.onreadystatechange = function () {//Call a function when the state changes.
      if (titlePromptRequest.readyState === 4 && titlePromptRequest.status === 200) {
        let parsedTitle = JSON.parse(titlePromptRequest.response)
        setTitleChoices(parsedTitle.choices)
      }
    }

    //prompt for content
    const contentPromptRequest = new XMLHttpRequest();
    contentPromptRequest.open("POST", "http://localhost:3024/ai/text/gen");
    contentPromptRequest.setRequestHeader("Content-type", "application/json");
    contentPromptRequest.send(JSON.stringify({ prompt: formInputs.Content }));


    contentPromptRequest.onreadystatechange = function () {//Call a function when the state changes.
      if (contentPromptRequest.readyState === 4 && contentPromptRequest.status === 200) {
        let parsedContent = JSON.parse(contentPromptRequest.response)
        setContentChoices(parsedContent.choices)
      }
    }

    //prompt for image 
    const imagePromptRequest = new XMLHttpRequest();
    imagePromptRequest.open("POST", "http://localhost:3024/ai/image/gen");
    imagePromptRequest.setRequestHeader("Content-type", "application/json");
    imagePromptRequest.send(JSON.stringify({ prompt: formInputs.Image }));

    imagePromptRequest.onreadystatechange = function () {//Call a function when the state changes.
      if (imagePromptRequest.readyState === 4 && imagePromptRequest.status === 200) {
        let parsedContent = JSON.parse(imagePromptRequest.response)
        console.log("DIDIER: response: ", parsedContent)
        setImageChoices(parsedContent.urls)
      }
    }

    //make the request(s) to service
    //set data for each request
  }

  const selectTitle = (i: number) => {
    let selectedTitle = titleChoices[i]
    setTitleIndex(i)
    //@ts-ignore
    let cleanTitle = selectedTitle.replace(/"/g, '')
    console.log('TITLE INDEX', cleanTitle);

    if (selectedTitleIndex != i) {
      setTitleIndex(i)
    } else {
      setTitleIndex(-1)
      cleanTitle = ''
    }


    //@ts-ignore
    setMessage({ ...message, Title: cleanTitle })
  }
  const selectContent = (i: number) => {
    let selectedContent = contentChoices[i]

    let cleanContent = selectedContent.replace(/"/g, '')
    console.log('Content INDEX', cleanContent);

    if (selectedContentIndex != i) {
      setContentIndex(i)

    } else {
      setContentIndex(-1)
      cleanContent = ''
    }

    //@ts-ignore
    setMessage({ ...message, Content: cleanContent })
  }
  const selectImage = (i: number) => {
    let selectedImage = imageChoices[i]
    setImageIndex(i)
    //@ts-ignore
    let cleanImage = selectedImage.replace(/"/g, '')
    console.log('Image INDEX', cleanImage);


    if (selectedImageIndex != i) {
      setImageIndex(i)
    } else {
      setImageIndex(-1)
      cleanImage = ''
    }


    //@ts-ignore
    setMessage({ ...message, Image: cleanImage })
  }

  return (
    <Container maxWidth="md">
      <Typography className={"heading"} variant="h3">
        Create New Campaign
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          {...register("Title")}
          variant="outlined"
          margin="normal"
          label="Prompt for Title"
          fullWidth
          required
        />
        <TextField
          {...register("Content")}
          variant="outlined"
          margin="normal"
          label="Prompt for Content"
          fullWidth
          required
        />
        <TextField
          {...register("Image")}
          variant="outlined"
          margin="normal"
          label="Prompt for Image"
          fullWidth
          required
        />
        {true && (
          <Button
            disabled={!(message && message.Title && message.Content && message.Image)}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={"submitButton"}
          >
            Start Campaign
          </Button>
        )}

        <Button
          type="button"
          fullWidth
          variant="contained"
          color="secondary"
          className={"generateButton"}
          onClick={generateContent}
        >
          Generate
        </Button>

        {titleChoices.length > 0 && (
          <Accordion>
            <AccordionSummary>
              <h3>Choose Title  {selectedTitleIndex > -1 ? '✅' : '❓'} </h3>
            </AccordionSummary>
            <AccordionDetails>
              <ol>
                {titleChoices.map((title, i) => <li className={(i === selectedTitleIndex) ? 'selected' : ''} onClick={() => selectTitle(i)} key={i}> {title} </li>)}
              </ol>
            </AccordionDetails>
          </Accordion>
        )}

        {contentChoices.length > 0 && (
          <Accordion>
            <AccordionSummary>
              <h3>
                Choose Content {selectedContentIndex > -1 ? '✅' : '❓'}
              </h3>
            </AccordionSummary>
            <AccordionDetails>
              <ol>
                {contentChoices.map((content, i) => <li className={(i === selectedContentIndex) ? 'selected' : ''} onClick={() => selectContent(i)} key={i}> {content} </li>)}
              </ol>
            </AccordionDetails>
          </Accordion>
        )}


        {imageChoices.length > 0 && (
          <Accordion>
            <AccordionSummary>
              <h3>
                Choose Image {selectedImageIndex > -1 ? '✅' : '❓'}
              </h3>
            </AccordionSummary>
            <AccordionDetails>
              <section>
                {imageChoices.map((url, i) => <img className={(i === selectedImageIndex) ? 'selected' : ''} onClick={() => selectImage(i)} key={i} src={url} />)}
              </section>
            </AccordionDetails>
          </Accordion>
        )}

        {json && (
          <>
            <Typography variant="body1">
              Below is the JSON that would normally get passed to the server
              when a form gets submitted
            </Typography>
            <Typography variant="body2">{json}</Typography>
          </>
        )}
        {status && (
          <>
            <Typography variant="body1">
              Below is the status from the server
            </Typography>
            <Typography variant="body2">{json}</Typography>
          </>
        )}
      </form>
    </Container>
  );
}

export default App;