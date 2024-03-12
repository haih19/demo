import { Modal } from "antd";
import { ModalProps } from "antd/es/modal";

type Props = ModalProps & {
  children: React.ReactNode;
};

const PopUp = ({ children, centered = true, width = 960, ...rest }: Props) => {
  return (
    <Modal
      centered={centered}
      width={width}
      {...rest}>
      {children}
    </Modal>
  );
};

export default PopUp;
