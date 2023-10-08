import { Box, Image, Layer } from 'grommet';
import { useState } from 'react';
import ajMinimalistic from '../../assets/images/aj/aj-minimalistic.png';

const AJChatBot = () => {
  const [showChat, setShowChat] = useState<boolean>(false);

  return (
    <>
      {showChat
        ? <Layer
          onEsc={() => setShowChat(false)}
          onClickOutside={() => {
            console.log('Test');
            setShowChat(false);
          }}
          style={{
            justifyContent: 'center',
            justifyItems: 'center',
            alignItems: 'center'
          }}
        >
          <Box
            margin={{top: '32px'}}
            alignSelf={'center'}
            align={'center'}
            width={'80vw'}
            height={'40vh'}
            justify={'center'}
            style={{alignSelf: 'center'}}
          >
            {/*TODO: Handle Iframe loading*/}
            <iframe
              title={'ajChatBot'}
              src={'https://www.chatbase.co/chatbot-iframe/TGQ6UD8srt56EBH3kyN4O'}
              width={'100%'}
              style={{minHeight: '700px', maxWidth: '700px'}}
            />
          </Box>
        </Layer>
        : <></>
      }
      <Box
        style={{
          position: 'fixed',
          bottom: '6vw',
          right: '6vw',
          zIndex: 9999,
        }}
        width={'fit-content'}
        round={'full'}
        border={{size: '4px', color: '#3A7AC4', style: 'solid'}}
        onClick={() => setShowChat(true)}
      >
        <Image height={'64px'} width={'64px'} src={ajMinimalistic}/>
      </Box>
    </>
  );
};

export default AJChatBot;