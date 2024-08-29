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
import "./assets/fonts/TwilioSansMono-Bold.ttf"
import "./assets/fonts/TwilioSansMono-BoldItl.ttf"
import "./assets/fonts/TwilioSansMono-Extrabold.ttf"
import "./assets/fonts/TwilioSansMono-ExtraboldItl.ttf"
import "./assets/fonts/TwilioSansMono-Light.ttf"
import "./assets/fonts/TwilioSansMono-LightItl.ttf"
import "./assets/fonts/TwilioSansMono-Medium.ttf"
import "./assets/fonts/TwilioSansMono-MediumItl.ttf"
import "./assets/fonts/TwilioSansMono-Regular.ttf"
import "./assets/fonts/TwilioSansMono-RegularItl.ttf"
import "./assets/fonts/TwilioSansMono-Semibold.ttf"
import "./assets/fonts/TwilioSansMono-SemiboldItl.ttf"
import "./assets/fonts/TwilioSansMono-Retina.ttf"
import "./assets/fonts/TwilioSansMono-RetinaItl.ttf"
import "./assets/fonts/TwilioSansMono-Heavy.ttf"
import "./assets/fonts/TwilioSansMono-HeavyItl.ttf"
import Home from './Containers/Home/Home';

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;