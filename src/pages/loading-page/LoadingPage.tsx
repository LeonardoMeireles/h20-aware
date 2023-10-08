import { Box, Image } from 'grommet';
import loader from '../../assets/gifs/loader.gif';

const LoadingPage = ({isLoading}: { isLoading: boolean }) => {
  return (
    <Box
      justify={'center'}
      align={'center'}
      height={'100vh'}
      width={'100vw'}
      style={{
        transition: '0.7s linear',
        opacity: isLoading ? 1 : 0,
        position: 'absolute',
        zIndex: isLoading ? 9999999 : -1,
        background: '#151515'
      }}
    >
      {isLoading ? <Image src={loader}/> : <></>}
    </Box>
  );
};

export default LoadingPage;