import {
  styled,
  Container,
  Typography,
  TextField,
  Button,
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

  const [selectedTitleIndex, setTitleIndex] = useState<number>();
  const [selectedContentIndex, setContentIndex] = useState<number>();
  const [selectedImageIndex, setImageIndex] = useState<number>();

  const sendJson = async (data: any, url: string) => {

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3023/notifications");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(data));
    return "hello"
  }


  const onSubmit = async (data: FormInput) => {
    let message: Message = {
      Title: data.Title,
      Content: data.Content,
      Image: data.Image
    }
    message.Id = Date.now();
    const stringifiedData = JSON.stringify(message);
    console.log('****ONSUBMIT STRINGIFIED DATA', stringifiedData);
    const setResponse = await sendJson(message, 'http://localhost:3023/notifications')
    setJson(stringifiedData);
    setStatus(setResponse);
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

    //make the request(s) to service
    //set data for each request
  }

  const selectTitle = (i: number) => {
    let selectedTitle = titleChoices[i]
    setTitleIndex(i)
    //@ts-ignore
    let cleanTitle = selectedTitle.replace(/"/g, '')
    console.log('TITLE INDEX', cleanTitle);
    //@ts-ignore
    setMessage({ ...message, Title: cleanTitle })
  }
  const selectContent = (i: number) => {
    let selectedContent = contentChoices[i]
    setContentIndex(i)
    //@ts-ignore
    let cleanContent = selectedContent.replace(/"/g, '')
    console.log('Content INDEX', cleanContent);
    //@ts-ignore
    setMessage({ ...message, Title: cleanContent })
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
          label="Title"
          fullWidth
          required
        />
        <TextField
          {...register("Content")}
          variant="outlined"
          margin="normal"
          label="Content"
          fullWidth
          required
        />
        <TextField
          {...register("Image")}
          variant="outlined"
          margin="normal"
          label="Image"
          fullWidth
          required
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={"submitButton"}
        >
          Start Campaign
        </Button>
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
          <>
            <div>
              <h2>
                Choose Title
              </h2>
              <ol>
                {titleChoices.map((title, i) => <li className={ (i === selectedTitleIndex ) ? 'selected' : ''} onClick={() => selectTitle(i)} key={i}> {title} </li>)}
              </ol>
            </div>
          </>
        )}

        {contentChoices.length > 0 && (
          <>
            <div>
              <h2>
                Choose Content
              </h2>
              <ol>
                {contentChoices.map((content, i) => <li className={ (i === selectedContentIndex ) ? 'selected' : ''} onClick={() => selectContent(i)} key={i}> {content} </li>)}
              </ol>
            </div>
          </>
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