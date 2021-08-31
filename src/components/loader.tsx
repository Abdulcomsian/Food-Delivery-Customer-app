import React, {useEffect, useState} from 'react';
import {Modal} from 'react-native';
import AreaLoader from './areaLoader';

const Loader = ({visible}: {visible: boolean}) => {
  const [animateIt, setAnimateIt] = useState(false);
  useEffect(() => {
    visible
      ? setAnimateIt(true)
      : setTimeout(() => {
          setAnimateIt(false);
        }, 700);
  }, [visible]);
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={() => false}>
      <AreaLoader animateIt={animateIt} />
    </Modal>
  );
};
export default Loader;
