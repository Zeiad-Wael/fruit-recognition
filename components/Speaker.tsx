import { Textarea } from '@mui/joy';
import {  Box,  Button, Stack } from '@mui/material'
import React, { useState } from 'react';
interface IProps {
    textToSay: string
  }
export default function Speaker({textToSay}:IProps) {
  const [text, setText] = useState(textToSay);
  const [booleans, setBooleans] = useState(
    {
      speaking: false, 
      paused: false, 
      resumed: false,
      ended: false
    }
  );
  
  const clickHandler = (value: any) => {
    switch(value)
    {
      case 'speaking':
          var msg = new SpeechSynthesisUtterance();
          msg.text = text;
          window.speechSynthesis.speak(msg)
        break; 
      case 'resumed':
          window.speechSynthesis.resume();
        break; 
      case 'paused':
          window.speechSynthesis.pause();
        break;
      case 'ended':
          window.speechSynthesis.cancel();
        break; 
    }

    setBooleans({...booleans, [value]: !booleans[value]});
  };

  return (

    <Box>

          <Box display={'flex'}> 
                <Textarea
                value={text}
                onChange={(event:any) => setText(event.target.value)}
                placeholder="Enter some text"
                size='lg'
              />
          </Box>

        <Stack >
          <Box>
            <Button  onClick={() => clickHandler('speaking')} >
              Speak
            </Button>
          </Box>
          <Box>
            <Button  onClick={() => clickHandler('paused')} >
              pause
            </Button>
          </Box>
          <Box>
            <Button onClick={() => clickHandler('resumed')} >
              resume
            </Button>
          </Box>
          <Box>
            <Button  onClick={() => clickHandler('ended')} >
              cancel
            </Button>
          </Box>
        </Stack>
    </Box>
  );
}