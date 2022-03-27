import { ReactNode } from 'react';
import ReactModal from 'react-modal';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  children: ReactNode;
}

export function Modal({ isOpen, setIsOpen, children }: ModalProps) {
  return(
    <ReactModal
      isOpen={isOpen}
      onRequestClose={setIsOpen}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#fff',
          borderRadius: '4px',
          border: '1px solid #ddd',
          padding: '20px',
        },
      }}
    >
      {children}
    </ReactModal>
  );
}


// class Modal extends Component {
//   constructor(props) {
//     super(props);

//     const { isOpen } = this.props;
//     this.state = {
//       modalStatus: isOpen
//     }
//   }

//   componentDidUpdate(prevProps) {
//     const { isOpen } = this.props;

//     if (prevProps.isOpen !== isOpen) {
//       console.log(this.props)
//       this.setState({ modalStatus: isOpen })
//     }
//   }

//   render() {
//     const { children, setIsOpen } = this.props;
//     const { modalStatus } = this.state;

//     return (
//       <ReactModal
//         shouldCloseOnOverlayClick={!false}
//         onRequestClose={setIsOpen}
//         isOpen={modalStatus}
//         ariaHideApp={false}
//         style={{
//           content: {
//             top: '50%',
//             left: '50%',
//             right: 'auto',
//             bottom: 'auto',
//             marginRight: '-50%',
//             transform: 'translate(-50%, -50%)',
//             background: '#F0F0F5',
//             color: '#000000',
//             borderRadius: '8px',
//             width: '736px',
//             border: 'none',
//           },
//           overlay: {
//             backgroundColor: '#121214e6',
//           },
//         }}
//       >
//         {children}
//       </ReactModal>
//     );
//   }
// };




